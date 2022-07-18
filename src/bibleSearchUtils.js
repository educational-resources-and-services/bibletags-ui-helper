import "regenerator-runtime/runtime.js"  // needed to build-for-node given async functions
import { getOriginalLocsFromRange, getCorrespondingRefs, getRefFromLoc, getLocFromRef } from '@bibletags/bibletags-versification'

import { bibleSearchScopeKeysByTestament } from './index'
import { grammaticalDetailMap, bibleSearchFlagMap } from './constants'
import { getQueryArrayAndWords } from './utils'

export const containsHebrewChars = text => /[\u0590-\u05FF]/.test(text)
export const containsGreekChars = text => /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text)

export const removeCantillation = usfm => usfm.replace(/[\u0591-\u05AF\u05A5\u05BD\u05BF\u05C0\u05C5\u05C7]/g,'')

export const stripHebrewVowelsEtc = str => (
  removeCantillation(
    str
      .replace(/[\u05B0-\u05BC\u05C1\u05C2\u05C4]/g,'')  // vowels
      .replace(/(?:שׁ|שׂ|שׁ|שׂ)/g, 'ש')  // sin an shin
      .replace(/\u200D/g,'')  // invalid character
  )
)

export const normalizeSearchStr = ({ str="", languageId }) => {
  // languageId should NOT be set when (1) this is an original language search, or (2) this is a non-version-specific search (e.g. common queries, projects, etc)

  // see the "Languages with letters containing diacritics" heading here: https://en.wikipedia.org/wiki/Diacritic
  // see also https://www.liquisearch.com/diacritic/languages_with_letters_containing_diacritics
  // see also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  // IMPORTANT: when making changes to this, be sure to only use composed characters by running each array through ary.map(a => a.normalize('NFC'))
  const distinctCharsByLanguageId = {
    lav: [ 'ā', 'ē', 'ī', 'ū', 'č', 'ģ', 'ķ', 'ļ', 'ņ', 'š', 'ž' ],
    lit: [ 'č', 'š', 'ž', 'ą', 'ę', 'į', 'ų', 'ū', 'ė' ],
  }

  const distinctChars = distinctCharsByLanguageId[languageId] || []

  return (

    stripHebrewVowelsEtc(str)

      // normalize
      .normalize('NFC')

      // split in order to remove all diacritics expect those in distinctChar, then rejoin
      .split(distinctChars.length === 0 ? /(.*)/g : new RegExp(`(${distinctChars.join('|')})`, 'gi'))
      .map(partialStr => (
        distinctChars.includes(partialStr)
          ? partialStr
          : partialStr.normalize('NFD').replace(/[\u0300-\u036f]/g, "").normalize('NFC')  // remove diacritics
      ))
      .join('')

      // Next line uses toLocaleLowerCase (and not toLowerCase) for languages with two i letters--one dotted and one undotted (https://en.wikipedia.org/wiki/%C4%B0)
      .toLocaleLowerCase(languageId)

      // clean up
      .replace(/  +/g, ' ')
      .trim()

  )
}

export const stripVocalOfAccents = str => {
  const mappings = {
    "a": /[âăáà]/g,
    "e": /[êᵉĕḗēé]/g,
    "i": /[îḯíïì]/g,
    "o": /[óôŏṓō]/g,
    "u": /[ûú]/g,
    "s": /[ˢç]/g,
    "t": /[ṭ]/g,
    "y": /[ýÿŷ]/g,
    "": /[ʻʼʻ]/g,
  }

  str = str.toLowerCase()

  Object.keys(mappings).forEach(char => {
    str = str.replace(mappings[char], char)
  })

  return str
}

export const getInfoOnResultLocs = ({ resultsNeedingUsfm, lookupVersionInfo }) => {

  const versionResultsNeedingUsfmByLoc = {}
  const locs = resultsNeedingUsfm
    .map(({ originalLoc, versionResults }) => {
      let [ originalFromLoc, originalToLoc ] = originalLoc.split('-')

      const originalLocsForThisResult = (
        (!originalToLoc || originalFromLoc === originalToLoc)
          ? [ originalFromLoc ]
          : getOriginalLocsFromRange(originalFromLoc, originalToLoc)
      )

      const locsForThisResult = (
        originalLocsForThisResult
          .map(originalLoc => {

            const refs = getCorrespondingRefs({
              baseVersion: {
                info: {
                  versificationModel: 'original',
                },
                ref: getRefFromLoc(originalLoc),
              },
              lookupVersionInfo,
            })

            if(!refs) return []

            const locs = refs.map(ref => getLocFromRef(ref).split(':')[0])

            locs.forEach(loc => {
              versionResultsNeedingUsfmByLoc[loc] = versionResults
            })

            return locs
          })
          .flat()
      )

      return locsForThisResult
    })
    .flat()

  return {
    locs,
    versionResultsNeedingUsfmByLoc,
  }
}

export const getQueryAndFlagInfo = ({ query, FLAG_MAP={} }) => {

  // extract special query flags
  const flags = {}
  const flagRegex = /(\s|^)([-a-z]+:(?:[:-\w,/]+))(?=\s|$)/i

  query = (query || "")
    .split(flagRegex)
    .filter(piece => {

      if(flagRegex.test(piece)) {
        let [ flag, ...flagValuePieces ] = piece.split(':')
        let flagValue = flagValuePieces.join(':')

        if(FLAG_MAP[flag]) {
          const { multiValue, possibleValues } = FLAG_MAP[flag]
          const flagValues = flagValue.split(/[\/,]/g)

          if(
            !possibleValues
            || flagValues.every(val => (
              val instanceof RegExp
                ? val.test(val)
                : val.includes(val)
            ))
          ) {
            if(flags[flag] && multiValue) {
              flags[flag].push(...flagValues)
            } else {
              flags[flag] = multiValue ? flagValues : flagValue
            }
            return false
          }
        }
      }

      return true

    })
    .join('')
    .replace(/  +/g, ' ')
    .trim()

  return { query, flags }
}

export const findAutoCompleteSuggestions = ({ str, suggestionOptions, max }) => {

  const matchingSuggestions = []
  const normalizedStr = normalizeSearchStr({ str })
  const [ x, normalizedStrBase, normalizedStrFinalDetail ] = normalizedStr.match(/^(.*?[#:]?)([^#:]*)$/)
  const normalizedStrFinalDetailWords = normalizedStrFinalDetail.split(/[-–— ]/g)

  // no mistakes, same order first
  for(let suggestionOption of suggestionOptions) {
    if(normalizeSearchStr({ str: suggestionOption.suggestedQuery }).indexOf(normalizedStr) === 0) {
      matchingSuggestions.push(suggestionOption)
    }
    if(matchingSuggestions.length >= max) break
  }

  // all words exist in full or in part (matching from the beginnings)
  if(matchingSuggestions.length < max) {
    const remainingSuggestionOptions = suggestionOptions.filter(suggestionOption => !matchingSuggestions.includes(suggestionOption))
    for(let suggestionOption of remainingSuggestionOptions) {
      const [ x, suggestionOptionBase, suggestionOptionFinalDetail ] = normalizeSearchStr({ str: suggestionOption.suggestedQuery }).match(/^(.*?[#:]?)([^#:]*)$/)
      const suggestionOptionFinalDetailWords = suggestionOptionFinalDetail.split(/[-–— ]/g)
      if(
        normalizedStrBase === suggestionOptionBase
        && normalizedStrFinalDetailWords.every(strWord => suggestionOptionFinalDetailWords.some(optWord => optWord.indexOf(strWord) === 0))
      ) {
        matchingSuggestions.push(suggestionOption)
      }
      if(matchingSuggestions.length >= max) break
    }
  }

  // look for hits with correct first letter in last word + up to one mistake (missing/added/alt char)
  if(matchingSuggestions.length < max) {
    const remainingSuggestionOptions = suggestionOptions.filter(suggestionOption => !matchingSuggestions.includes(suggestionOption))
    for(let suggestionOption of remainingSuggestionOptions) {
      const [ x, suggestionOptionBase, suggestionOptionFinalDetail ] = normalizeSearchStr({ str: suggestionOption.suggestedQuery }).match(/^(.*?[#:]?)([^#:]*)$/)
      const suggestionOptionFinalDetailWords = suggestionOptionFinalDetail.split(/[-–— ]/g)
      const finalWordInFinalDetail = normalizedStrFinalDetailWords[normalizedStrFinalDetailWords.length - 1]
      if(
        normalizedStrBase === suggestionOptionBase
        && normalizedStrFinalDetailWords.slice(0,-1).every(strWord => suggestionOptionFinalDetailWords.some(optWord => optWord.indexOf(strWord) === 0))
        && suggestionOptionFinalDetailWords.some(optWord => {
          if(optWord[0] !== finalWordInFinalDetail[0]) return false
          let i1 = 1
          let i2 = 1
          let foundDifference = false
          while(finalWordInFinalDetail[i1]) {
            if(finalWordInFinalDetail[i1] !== optWord[i2]) {
              if(foundDifference) return false  // two differences means it is not a match
              foundDifference = true
              if(finalWordInFinalDetail[i1 + 1] === optWord[i2]) {
                i1++
              } else if(finalWordInFinalDetail[i1] === optWord[i2 + 1]) {
                i2++
              }
            }
            i1++
            i2++
          }
          return true
        })
      ) {
        matchingSuggestions.push(suggestionOption)
      }
      if(matchingSuggestions.length >= max) break
    }
  }

  return matchingSuggestions
}

export const isValidBibleSearch = params => {  // should be object with `query` key

  const { query } = getQueryAndFlagInfo({ ...params, FLAG_MAP: bibleSearchFlagMap })  // get rid of the flags
  const queryWordsOrConnectors = query.split(/[ ()"]/g)

  // valid use of #
  if(queryWordsOrConnectors.some(wordOrConnector => /(?:[#=]{2}|#.*?=|=.*?#|[#=]$)/.test(wordOrConnector))) return false
  if(queryWordsOrConnectors.includes('#')) return false

  // validate strongs
  if((query.match(/#[HG][0-9]/g) || []).length !== (query.match(/#[HG][0-9]{5}(?=[# ")]|$)/g) || []).length) return false
  if(queryWordsOrConnectors.some(wordOrConnector => (wordOrConnector.match(/#[HG][0-9]{5}(?=[# ")]|$)/g) || []).length >= 2)) return false  // no double-strongs in one word like #H12345#H23456

  // validate flags
  // TODO

  // validate groupings+
  try {
    getQueryArrayAndWords(query)
  } catch(err) {
    return false
  }

  return true

}

export const completeQueryGroupings = query => {

  if((query.match(/"/g) || []).length % 2 === 1) {
    query += '"'
  }
  query = query.replace(/""$/, '')

  const numLeftParens = (query.match(/\(/g) || []).length
  const numRightParens = (query.match(/\)/g) || []).length
  if(numLeftParens > numRightParens) {
    query += Array(numLeftParens - numRightParens).fill(')').join('')
  }
  while(/\(\)/.test(query)) {
    query = query.replace(/\(\)/g, '')
  }

  return query

}

export const getFlagSuggestions = ({ searchTextInComposition, versionAbbrsForIn=[], versionAbbrsForInclude=[], max=3 }) => {

  let normalizedSearchText = (
    searchTextInComposition
      .replace(/  +/g, ' ')
      .replace(/^ /g, '')
  )
  const searchTextPieces = normalizedSearchText.split(' ')
  const currentPiece = searchTextPieces.pop()
  const searchTextWithoutCurrentPiece = searchTextPieces.join(' ')
  normalizedSearchText = normalizedSearchText.trim()

  const [ type, currentValue='' ] = currentPiece.split(':')
  const currentValueUpToLastComma = currentValue.replace(/^((?:.*,)?)[^,]*$/, '$1')
  const valuesAlreadyUsed = currentValueUpToLastComma.split(',').filter(Boolean)
  let suggestedQueryOptions = []
  const containsHebrew = containsHebrewChars(searchTextInComposition) || /#H[0-9]{5}/.test(searchTextInComposition)
  const containsGreek = containsGreekChars(searchTextInComposition) || /#G[0-9]{5}/.test(searchTextInComposition)

  if(type === 'in') {

    // in:[range]/[versionId]
    const testament = (
      (containsHebrew && !containsGreek && 'ot')
      || (!containsHebrew && containsGreek && 'nt')
      || 'both'
    )
    if(valuesAlreadyUsed.length > 0) {
      const arrayToUse = versionAbbrsForIn.includes(valuesAlreadyUsed[0]) ? versionAbbrsForIn : bibleSearchScopeKeysByTestament[testament]
      suggestedQueryOptions.push( ...arrayToUse.filter(val => !valuesAlreadyUsed.includes(val)).map(val => `${searchTextWithoutCurrentPiece} in:${currentValueUpToLastComma}${val}`) )
    } else {
      suggestedQueryOptions.push( ...[ ...versionAbbrsForIn, ...bibleSearchScopeKeysByTestament[testament] ].map(val => `${searchTextWithoutCurrentPiece} in:${val}`) )
    }

  } else if('include'.indexOf(type) === 0) {
    // include:variants/[versionId]
    const includeArray = [ 'variants' ]
    if(valuesAlreadyUsed.length > 0) {
      const arrayToUse = versionAbbrsForInclude.includes(valuesAlreadyUsed[0]) ? versionAbbrsForInclude : includeArray
      suggestedQueryOptions.push( ...arrayToUse.filter(val => !valuesAlreadyUsed.includes(val)).map(val => `${searchTextWithoutCurrentPiece} include:${currentValueUpToLastComma}${val}`) )
    } else {
      suggestedQueryOptions.push( ...[ ...includeArray, ...versionAbbrsForInclude ].filter(val => !valuesAlreadyUsed.includes(val)).map(val => `${searchTextWithoutCurrentPiece} include:${val}`) )
    }

  } else if(!containsHebrew && !containsGreek) {  // type === 'same'
    // same:[scope]
    suggestedQueryOptions.push( ...[ 'phrase', 'verse', 'sentence', 'paragraph' ].map(val => `${searchTextWithoutCurrentPiece} same:${val}`) )
  }

  return findAutoCompleteSuggestions({
    str: normalizedSearchText,
    suggestionOptions: suggestedQueryOptions.map(suggestedQuery => ({
      from: "search-flag",
      suggestedQuery,
    })),
    max,
  })

}

export const getGrammarDetailsForAutoCompletionSuggestions = ({ currentWord, normalizedSearchText }) => {

  // TODO: set up with i18n for grammatical details

  // TODO: use currentWord to weed out items that are not really options
    // e.g. if it already has #noun in the word, then don't present aspect options

  // TODO: use searchTextInComposition to see if we should only do Hebrew grammar or only do Greek grammar

  let details = Object.keys(grammaticalDetailMap)

  details.push(
    `#sh`,
    `#h`,
    `#h!`,
    `#h'`,
    `#h?`,
    `#h->`,
    `#h^`,
    `#n^`,
  )

  details = details.filter(detail => !new RegExp(`#${escapeRegex(detail)}(?:[# ")]|$)`).test(currentWord))

  details = [
    ...details,
    ...details.map(detail => `not:${detail}`),
  ]

  return details

}

export const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')