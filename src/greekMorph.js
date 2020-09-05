import i18n from './i18n.js'

// pos matches posMapping in bibletags-data/scripts/importUGNTFromUsfm.js
const getPosTerm = code => {
  switch(code) {
    case 'N': return i18n("noun", "", "grammar")
    case 'A': return i18n("adjective", "", "grammar")
    case 'NS': return i18n("adjective", "", "grammar")  // better categorized as an adjective
    case 'NP': return i18n("adjective", "", "grammar")  // better categorized as an adjective
    case 'E': return i18n("determiner", "", "grammar")
    case 'R': return i18n("pronoun", "", "grammar")
    case 'V': return i18n("verb", "", "grammar")
    case 'I': return i18n("interjection", "", "grammar")
    case 'P': return i18n("preposition", "", "grammar")
    case 'D': return i18n("adverb", "", "grammar")
    case 'PI': return i18n("adverb", "", "grammar")  // better categorized as an adverb
    case 'C': return i18n("conjunction", "", "grammar")
    case 'T': return i18n("particle", "", "grammar")
    case 'TF': return i18n("foreign", "", "grammar")  // better in its own category
  }
}

const getPosTypeTerm = code => {
  switch(code) {
    case 'NS': return i18n("substantive", "", "grammar")
    case 'NP': return i18n("predicate", "", "grammar")
    case 'AA': return i18n("ascriptive", "", "grammar")
    case 'AR': return i18n("restrictive", "", "grammar")
    case 'EA': return i18n("article", "", "grammar")
    case 'ED': return i18n("demonstrative", "", "grammar")
    case 'EF': return i18n("differential", "", "grammar")
    case 'EP': return i18n("possessive", "", "grammar")
    case 'EQ': return i18n("quantifier", "", "grammar")
    case 'EN': return i18n("number", "", "grammar")
    case 'EO': return i18n("ordinal", "", "grammar")
    case 'ER': return i18n("relative", "", "grammar")
    case 'ET': return i18n("interrogative", "", "grammar")
    case 'RD': return i18n("demonstrative", "", "grammar")
    case 'RP': return i18n("personal", "", "grammar")
    case 'RE': return i18n("reflexive", "", "grammar")
    case 'RC': return i18n("reciprocal", "", "grammar")
    case 'RI': return i18n("indefinite", "", "grammar")
    case 'RR': return i18n("relative", "", "grammar")
    case 'RT': return i18n("interrogative", "", "grammar")
    case 'VT': return i18n("transitive", "", "grammar")
    case 'VI': return i18n("intransitive", "", "grammar")
    case 'VL': return i18n("linking", "", "grammar")
    case 'VM': return i18n("modal", "", "grammar")
    case 'VP': return i18n("periphrastic", "", "grammar")
    case 'IE': return i18n("exclamation", "", "grammar")
    case 'ID': return i18n("directive", "", "grammar")
    case 'IR': return i18n("response", "", "grammar")
    case 'PI': return i18n("improper-preposition", "", "grammar")
    case 'DO': return i18n("correlative", "", "grammar")
    case 'CC': return i18n("coordinating", "", "grammar")
    case 'CS': return i18n("subordinating", "", "grammar")
    case 'CO': return i18n("correlative", "", "grammar")
  }
}

const getMorphTerms = () => ([
  { // mood
    I: i18n("indicative", "", "grammar"),
    M: i18n("imperative", "", "grammar"),
    S: i18n("subjunctive", "", "grammar"),
    O: i18n("optative", "", "grammar"),
    N: i18n("infinitive", "", "grammar"),
    P: i18n("participle", "", "grammar"),
  },
  { // aspect
    P: i18n("present", "", "grammar"),
    I: i18n("imperfect", "", "grammar"),
    F: i18n("future", "", "grammar"),
    A: i18n("aorist", "", "grammar"),
    E: i18n("perfect", "", "grammar"),
    L: i18n("pluperfect", "", "grammar"),
  },
  { // voice
    A: i18n("active", "", "grammar"),
    M: i18n("middle", "", "grammar"),
    P: i18n("passive", "", "grammar"),
  },
  { // person
    1: i18n("1st", "", "grammar"),
    2: i18n("2nd", "", "grammar"),
    3: i18n("3rd", "", "grammar"),
  },
  { // case
    N: i18n("nominative", "", "grammar"),
    G: i18n("genitive", "", "grammar"),
    D: i18n("dative", "", "grammar"),
    A: i18n("accusative", "", "grammar"),
    V: i18n("vocative", "", "grammar"),
  },
  { // gender
    M: i18n("masculine", "", "grammar"),
    F: i18n("feminine", "", "grammar"),
    N: i18n("neuter", "", "grammar"),
  },
  { // number
    S: i18n("singular", "", "grammar"),
    P: i18n("plural", "", "grammar"),
  },
  { // other
    C: i18n("comparative", "", "grammar"),
    S: i18n("superlatives", "", "grammar"),
    D: i18n("diminutive", "", "grammar"),
    I: i18n("indeclinable", "", "grammar"),
  },
])


export const getNormalizedGreekPOSCode = posCode => (getPosTerm(posCode) !== undefined ? posCode : posCode.substr(0,1))

export const getGreekPOSTerm = posCode => (getPosTerm(getNormalizedGreekPOSCode(posCode)) || "")

export const getGreekPOSTypeTerm = posCode => (getPosTypeTerm(posCode) || "")

export const getGreekMorphPartDisplayInfo = ({ morphPart }) => {
  const posCode = morphPart.substr(0,2)
  const morphCodes = morphPart.substr(2).split('')

  const parsingDisplayPieces = [
    // getGreekPOSTerm(posCode),  // Shown in the POS list; TODO: make present POS stand out in list
    getGreekPOSTypeTerm(posCode),
    ...getMorphTerms().map((category, index) => (category[morphCodes[index]] || "")),
  ]

  return {
    str: parsingDisplayPieces.filter(piece => !!piece).join(i18n(" ", "word separator")),
  }
}
