import i18n from './i18n'

const getPosTerm = code => {
  switch(code) {
    case 'N': return i18n("noun", "", "original-languages")
    case 'A': return i18n("adjective", "", "original-languages")
    case 'NS': return i18n("adjective", "", "original-languages")  // better categorized as an adjective
    case 'NP': return i18n("adjective", "", "original-languages")  // better categorized as an adjective
    case 'E': return i18n("determiner", "", "original-languages")
    case 'R': return i18n("pronoun", "", "original-languages")
    case 'V': return i18n("verb", "", "original-languages")
    case 'I': return i18n("interjection", "", "original-languages")
    case 'P': return i18n("preposition", "", "original-languages")
    case 'D': return i18n("adverb", "", "original-languages")
    case 'PI': return i18n("adverb", "", "original-languages")  // better categorized as an adverb
    case 'C': return i18n("conjunction", "", "original-languages")
    case 'T': return i18n("particle", "", "original-languages")
    case 'TF': return i18n("foreign", "", "original-languages")  // better in its own category
  }
}

const getPosTypeTerm = code => {
  switch(code) {
    case 'NS': return i18n("substantive", "", "original-languages")
    case 'NP': return i18n("predicate", "", "original-languages")
    case 'AA': return i18n("ascriptive", "", "original-languages")
    case 'AR': return i18n("restrictive", "", "original-languages")
    case 'EA': return i18n("article", "", "original-languages")
    case 'ED': return i18n("demonstrative", "", "original-languages")
    case 'EF': return i18n("differential", "", "original-languages")
    case 'EP': return i18n("possessive", "", "original-languages")
    case 'EQ': return i18n("quantifier", "", "original-languages")
    case 'EN': return i18n("number", "", "original-languages")
    case 'EO': return i18n("ordinal", "", "original-languages")
    case 'ER': return i18n("relative", "", "original-languages")
    case 'ET': return i18n("interrogative", "", "original-languages")
    case 'RD': return i18n("demonstrative", "", "original-languages")
    case 'RP': return i18n("personal", "", "original-languages")
    case 'RE': return i18n("reflexive", "", "original-languages")
    case 'RC': return i18n("reciprocal", "", "original-languages")
    case 'RI': return i18n("indefinite", "", "original-languages")
    case 'RR': return i18n("relative", "", "original-languages")
    case 'RT': return i18n("interrogative", "", "original-languages")
    // case 'VT': return i18n("transitive", "", "original-languages")
    // case 'VI': return i18n("intransitive", "", "original-languages")
    // case 'VL': return i18n("linking", "", "original-languages")
    // case 'VM': return i18n("modal", "", "original-languages")
    // case 'VP': return i18n("periphrastic", "", "original-languages")
    case 'IE': return i18n("exclamation", "", "original-languages")
    case 'ID': return i18n("directive", "", "original-languages")
    case 'IR': return i18n("response", "", "original-languages")
    case 'PI': return i18n("improper-preposition", "", "original-languages")
    case 'DO': return i18n("correlative", "", "original-languages")
    case 'CC': return i18n("coordinating", "", "original-languages")
    case 'CS': return i18n("subordinating", "", "original-languages")
    case 'CO': return i18n("correlative", "", "original-languages")
  }
}

const getMorphTerms = () => ([
  { // mood
    I: i18n("indicative", "", "original-languages"),
    M: i18n("imperative", "", "original-languages"),
    S: i18n("subjunctive", "", "original-languages"),
    O: i18n("optative", "", "original-languages"),
    N: i18n("infinitive", "", "original-languages"),
    P: i18n("participle", "", "original-languages"),
  },
  { // aspect
    P: i18n("present", "", "original-languages"),
    I: i18n("imperfect", "", "original-languages"),
    F: i18n("future", "", "original-languages"),
    A: i18n("aorist", "", "original-languages"),
    E: i18n("perfect", "", "original-languages"),
    L: i18n("pluperfect", "", "original-languages"),
  },
  { // voice
    A: i18n("active", "", "original-languages"),
    M: i18n("middle", "", "original-languages"),
    P: i18n("passive", "", "original-languages"),
  },
  { // person
    1: i18n("1st", "", "original-languages"),
    2: i18n("2nd", "", "original-languages"),
    3: i18n("3rd", "", "original-languages"),
  },
  { // case
    N: i18n("nominative", "", "original-languages"),
    G: i18n("genitive", "", "original-languages"),
    D: i18n("dative", "", "original-languages"),
    A: i18n("accusative", "", "original-languages"),
    V: i18n("vocative", "", "original-languages"),
  },
  { // gender
    M: i18n("masculine", "", "original-languages"),
    F: i18n("feminine", "", "original-languages"),
    N: i18n("neuter", "", "original-languages"),
  },
  { // number
    S: i18n("singular", "", "original-languages"),
    P: i18n("plural", "", "original-languages"),
  },
  { // other
    C: i18n("comparative", "", "original-languages"),
    S: i18n("superlatives", "", "original-languages"),
    D: i18n("diminutive", "", "original-languages"),
    I: i18n("indeclinable", "", "original-languages"),
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
