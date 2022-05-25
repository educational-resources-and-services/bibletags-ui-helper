import "regenerator-runtime/runtime.js"  // needed to build-for-node given async functions

import { stripGreekAccents, stripHebrewVowelsEtc } from './bibleSearchUtils'
import { getMainWordPartIndex } from './index'

const posMapping = {
  N: "N",
  A: "A",
  NS: "A",  // better categorized as an adjective
  NP: "A",  // better categorized as an adjective
  E: "E",
  R: "P",  // flipped to match UHB
  V: "V",
  I: "I",
  P: "R",  // flipped to match UHB
  D: "D",
  PI: "D",  // better categorized as an adverb
  C: "C",
  T: "T",
  TF: "F",  // better in its own category
}

export const getPartialUHBWordRowFromUsfmWord = ({ w, id, lemma, strong, morph }) => {

  const definitionId = (strong.match(/H[0-9]{5}/) || [])[0]
  const prefixParts = (strong.match(/[^"H]*/) || [])[0].split(':').filter(Boolean)
  const form = stripHebrewVowelsEtc(w)
  const isAramaic = /^Ar,/.test(morph) ? 1 : 0

  if(!id || !morph || !form || (!!definitionId !== !!lemma)) {
    console.log('word with missing info', wordUsfm)
    return {}
  }

  const morphParts = morph.slice(3).split(':')
  const mainPartIdx = getMainWordPartIndex(morphParts)
  const mainPartMorph = morphParts[mainPartIdx]
  const pos = mainPartMorph[0]
  const [ suffixMorph ] = morph.match(/:Sp([^:]*)/g) || []

  const wordRow = {
    id,
    form,
    lemma,
    fullParsing: morph,
    isAramaic,
    b: prefixParts.includes("b") ? 1 : 0,
    l: prefixParts.includes("l") ? 1 : 0,
    k: prefixParts.includes("k") ? 1 : 0,
    m: prefixParts.includes("m") ? 1 : 0,
    sh: prefixParts.includes("s") ? 1 : 0,
    v: prefixParts.includes("c") ? 1 : 0,
    h1: /^(?:He,|Ar,)(?:[^:]*:)*Td/.test(morph) ? 1 : 0,
    h2: /^(?:He,|Ar,)(?:[^:]*:)*Rd/.test(morph) ? 1 : 0,
    h3: prefixParts.includes("i") ? 1 : 0,
    pos,
    h4: /^(?:He,|Ar,)(?:[^:]*:)*Sd/.test(morph) ? 1 : 0,
    h5: /^(?:He,|Ar,)(?:[^:]*:)*Sh/.test(morph) ? 1 : 0,
    n: /^(?:He,|Ar,)(?:[^:]*:)*Sn/.test(morph) ? 1 : 0,
  }

  switch(pos) {
    case 'A':
    case 'N':
      if(mainPartMorph.length > 2) {
        if(mainPartMorph.slice(1,4) !== 'xxx') {
          wordRow.gender = mainPartMorph[2]
          wordRow.number = mainPartMorph[3]
        }
        wordRow.state = mainPartMorph[4]
      }
      
    case 'R':
    case 'T':
      const type = pos + mainPartMorph[1]
      if(
        mainPartMorph[1]
        && mainPartMorph.slice(1,4) !== 'xxx'
        && !['Aa','Nc'].includes(type)
      ) {
        wordRow.type = type
      }
      break

    case 'P':
      wordRow.type = pos + mainPartMorph[1]
      if(mainPartMorph[1] === 'f' && mainPartMorph.length > 2) {
        const person = mainPartMorph[2]
        if(!['x'].includes(person)) {
          wordRow.person = person
        }
        wordRow.gender = mainPartMorph[3]
        wordRow.number = mainPartMorph[4]
      }
      break

    case 'V':
      wordRow.stem = (isAramaic ? 'A' : 'H') + mainPartMorph[1]
      wordRow.aspect = mainPartMorph[2]
      if(['r','s'].includes(mainPartMorph[2])) {
        wordRow.gender = mainPartMorph[3]
        wordRow.number = mainPartMorph[4]
        wordRow.state = mainPartMorph[5]
      } else if(['a','c'].includes(mainPartMorph[2])) {
        // nothing more to do
      } else {
        wordRow.person = mainPartMorph[3]
        wordRow.gender = mainPartMorph[4]
        wordRow.number = mainPartMorph[5]
      }
      break
  }

  if(wordRow.number === 'x') {
    wordRow.number = 's'  // see 1 Kings 12:12
  }

  // if(![ undefined, 'p', 'q', 'i', 'w', 'h', 'j', 'v', 'r', 's', 'a', 'c' ].includes(wordRow.aspect)) console.log('>>>', morph)
  // if(![ undefined, 's', 'p', 'd' ].includes(wordRow.number)) console.log('>>>', morph)
  // if(![ undefined, 'Ac', 'Ao', 'Ng', 'Np', 'Pd', 'Pf', 'Pi', 'Pp', 'Pr', 'Rd', 'Ta', 'Td', 'Te', 'Ti', 'Tj', 'Tm', 'Tn', 'To', 'Tr' ].includes(wordRow.type)) console.log('>>>', morph)

  if(suffixMorph) {
    wordRow.suffixPerson = suffixMorph.slice(3,4)
    wordRow.suffixGender = suffixMorph.slice(4,5)
    wordRow.suffixNumber = suffixMorph.slice(5,6)
  }

  if(definitionId) {
    wordRow.definitionId = definitionId
  }

  return wordRow
}

export const getPartialUGNTWordRowFromUsfmWord = ({ w, id, lemma, strong, morph }) => {

  const definitionId = (strong.match(/G[0-9]{5}/) || [])[0]
  const form = stripGreekAccents(w).toLowerCase()

  if(!id || !lemma || !definitionId || !morph || !form) {
    console.log('word with missing info', wordUsfm)
    return {}
  }

  const pos = posMapping[morph.slice(3,5)] || posMapping[morph.slice(3,4)]

  if(!pos) {
    console.log('invalid morph - pos not in mapping', wordUsfm)
    return {}
  }

  const wordRow = {
    id,
    form,
    lemma,
    fullParsing: morph,
    pos,
    morphPos: morph.slice(3,4),
    definitionId,
  }

  if(morph.slice(4,5) !== ',') {
    wordRow.type = `${pos}${morph.slice(4,5)}`
  }

  [
    "mood",
    "aspect",
    "voice",
    "person",
    "case",
    "gender",
    "number",
    "attribute",
  ].forEach((col, idx) => {
    const morphDetail = morph.slice(idx+5,idx+6)
    if(morphDetail !== ',') {
      wordRow[col] = morphDetail
    }
  })

  return wordRow
}

export const getPartialWordRowFromUsfmWord = usfmWord => (
  parseInt(usfmWord.id.slice(0,2), 10) <= 39
    ? getPartialUHBWordRowFromUsfmWord(usfmWord)
    : getPartialUGNTWordRowFromUsfmWord(usfmWord)
)

export const getUHBWordInfoFromWordRow = word => {

  const info = [
    word.wordNumber,
    word.form,
    word.definitionId ? parseInt(word.definitionId.slice(1), 10) : 0,
    word.lemma || 0,
    `H${word.type || `${word.pos}_`}${word.stem || '__'}${word.aspect || '_'}${word.person || '_'}${word.gender || '_'}${word.number || '_'}${word.state || '_'}`,
  ]

  const booleanColInfo = (
    ['isAramaic','b','l','k','m','sh','v','h1','h2','h3','h4','h5','n']
      .map(col => (
        word[col]
          ? col.slice(-1)
          : ''
      ))
      .join('')
  )
  const suffixInfo = (
    word.suffixPerson
      ? `${word.suffixPerson}${word.suffixGender}${word.suffixNumber}`
      : ''
  )

  if(booleanColInfo || suffixInfo) {
    info.push(booleanColInfo)
    if(suffixInfo) {
      info.push(suffixInfo)
    }
  }

  return info
}

export const getUGNTWordInfoFromWordRow = word => {

  const info = [
    word.wordNumber,  // will be null if this function is not called on UHB/UGNT import (and that is okay)
    word.form,
    word.definitionId ? parseInt(word.definitionId.slice(1), 10) : 0,
    word.lemma,
    `G${word.type || `${word.pos}_`}${word.mood || '_'}${word.voice || '_'}${word.aspect || '_'}${word.person || '_'}${word.gender || '_'}${word.number || '_'}${word.case || '_'}${word.attribute || '_'}`,
  ]

  return info
}

export const getWordInfoFromWordRow = word => (
  parseInt(word.id.slice(0,2), 10) <= 39
    ? getUHBWordInfoFromWordRow(word)
    : getUGNTWordInfoFromWordRow(word)
)

export const getWordInfoFromUsfmWord = usfmWord => (
  getWordInfoFromWordRow(
    getPartialWordRowFromUsfmWord(
      usfmWord
    )
  )
)