import i18n from './i18n'

const getPosTerm = code => {
  switch(code) {
    case 'A': return i18n("adjective", "", "original-languages")
    case 'C': return i18n("conjunction", "", "original-languages")
    case 'D': return i18n("adverb", "", "original-languages")
    case 'N': return i18n("noun", "", "original-languages")
    case 'P': return i18n("pronoun", "", "original-languages")
    case 'R': return i18n("preposition", "", "original-languages")
    case 'T': return i18n("particle", "", "original-languages")
    case 'V': return i18n("verb", "", "original-languages")
  }
}

export const getHebrewPOSTerm = posCode => (getPosTerm(posCode) || "")

const getGrammarTerms = code => {
  switch(code) {
    case 'pos': return {
      // These are the only pos's that I want to actually print
      // since others are shown in the Entry component
      C: getPosTerm('C'),
      R: getPosTerm('R'),
      D: getPosTerm('D'),
    }
    case 'person': return {
      1: i18n("1st", "", "original-languages"),
      2: i18n("2nd", "", "original-languages"),
      3: i18n("3rd", "", "original-languages"),
    }
    case 'gender': return {
      m: i18n("masculine", "", "original-languages"),
      f: i18n("feminine", "", "original-languages"),
      b: i18n("gender-both", "", "original-languages"),
      c: i18n("common", "", "original-languages"),
    }
    case 'number': return {
      s: i18n("singular", "", "original-languages"),
      p: i18n("plural", "", "original-languages"),
      d: i18n("dual", "", "original-languages"),
    }
    case 'state': return {
      a: i18n("absolute", "", "original-languages"),
      c: i18n("construct", "", "original-languages"),
      d: i18n("determined", "", "original-languages"),
    }
    case 'adjType': return {
      c: i18n("cardinal-number", "", "original-languages"),
      o: i18n("ordinal-number", "", "original-languages"),
    }
    case 'nounType': return {
      g: i18n("gentilic", "", "original-languages"),
      p: i18n("proper-name", "", "original-languages"),
    }
    case 'pronounType': return {
      d: i18n("demonstrative", "", "original-languages"),
      f: i18n("indefinite", "", "original-languages"),
      i: i18n("interrogative", "", "original-languages"),
      p: i18n("personal", "", "original-languages"),
      r: i18n("relative", "", "original-languages"),
    }
    case 'prepType': return {
      d: i18n("definite-article", "", "original-languages"),
    }
    case 'suffixType': return {
      d: i18n("directional", "", "original-languages"),
      h: i18n("paragogic", "", "original-languages"),
      n: i18n("paragogic", "", "original-languages"),
    }
    case 'particleType': return {
      a: i18n("affirmation", "", "original-languages"),
      d: i18n("definite-article", "", "original-languages"),
      e: i18n("exhortation", "", "original-languages"),
      i: i18n("interrogative", "", "original-languages"),
      j: i18n("interjection", "", "original-languages"),
      m: i18n("demonstrative", "", "original-languages"),
      n: i18n("negative", "", "original-languages"),
      o: i18n("direct-object-marker", "", "original-languages"),
      r: i18n("relative", "", "original-languages"),
    }
    case 'stemHe': return {
      q: i18n("qal", "", "original-languages"),
      N: i18n("niphal", "", "original-languages"),
      p: i18n("piel", "", "original-languages"),
      P: i18n("pual", "", "original-languages"),
      h: i18n("hiphil", "", "original-languages"),
      H: i18n("hophal", "", "original-languages"),
      t: i18n("hithpael", "", "original-languages"),
      o: i18n("polel", "", "original-languages"),
      O: i18n("polal", "", "original-languages"),
      r: i18n("hithpolel", "", "original-languages"),
      m: i18n("poel", "", "original-languages"),
      M: i18n("poal", "", "original-languages"),
      k: i18n("palel", "", "original-languages"),
      K: i18n("pulal", "", "original-languages"),
      Q: i18n("qal-passive", "", "original-languages"),
      l: i18n("pilpel", "", "original-languages"),
      L: i18n("polpal", "", "original-languages"),
      f: i18n("hithpalpel", "", "original-languages"),
      D: i18n("nithpael", "", "original-languages"),
      j: i18n("pealal", "", "original-languages"),
      i: i18n("pilel", "", "original-languages"),
      u: i18n("hothpaal", "", "original-languages"),
      c: i18n("tiphil", "", "original-languages"),
      v: i18n("hishtaphel", "", "original-languages"),
      w: i18n("nithpalel", "", "original-languages"),
      y: i18n("nithpoel", "", "original-languages"),
      z: i18n("hithpoel", "", "original-languages"),
    }
    case 'stemAr': return {
      q: i18n("peal", "", "original-languages"),
      Q: i18n("peil", "", "original-languages"),
      u: i18n("hithpeel", "", "original-languages"),
      N: i18n("niphal", "", "original-languages"),
      p: i18n("pael", "", "original-languages"),
      P: i18n("ithpaal", "", "original-languages"),
      M: i18n("hithpaal", "", "original-languages"),
      a: i18n("aphel", "", "original-languages"),
      h: i18n("haphel", "", "original-languages"),
      s: i18n("saphel", "", "original-languages"),
      e: i18n("shaphel", "", "original-languages"),
      H: i18n("hophal", "", "original-languages"),
      i: i18n("ithpeel", "", "original-languages"),
      t: i18n("hishtaphel", "", "original-languages"),
      v: i18n("ishtaphel", "", "original-languages"),
      w: i18n("hithaphel", "", "original-languages"),
      o: i18n("polel", "", "original-languages"),
      z: i18n("ithpoel", "", "original-languages"),
      r: i18n("hithpolel", "", "original-languages"),
      f: i18n("hithpalpel", "", "original-languages"),
      b: i18n("hephal", "", "original-languages"),
      c: i18n("tiphel", "", "original-languages"),
      m: i18n("poel", "", "original-languages"),
      l: i18n("palpel", "", "original-languages"),
      L: i18n("ithpalpel", "", "original-languages"),
      O: i18n("ithpolel", "", "original-languages"),
      G: i18n("ittaphal", "", "original-languages"),
    }
    case 'aspect': return {
      p: i18n("perfect", "", "original-languages"),
      q: i18n("sequential-perfect", "", "original-languages"),
      i: i18n("imperfect", "", "original-languages"),
      w: i18n("sequential-imperfect", "", "original-languages"),
      h: i18n("cohortative", "", "original-languages"),
      j: i18n("jussive", "", "original-languages"),
      v: i18n("imperative", "", "original-languages"),
      r: i18n("participle", "", "original-languages"),
      s: i18n("passive-participle", "", "original-languages"),
      a: i18n("infinitive-absolute", "", "original-languages"),
      c: i18n("infinitive-construct", "", "original-languages"),
    }
  }
}

export const grammarColors = {
  C: "#C95047",
  R: "#84A671",
  Sd: "#24ada8",
  Sh: "#77777A",
  Sn: "#77777A",
  Sp: "#BDAC59",
  Td: "#5C829A",
  Tr: "#b73ecc",
  Ti: "#D68945",
}

export const getGrammarColor = ({ isPrefixOrSuffix, morphPart="" }) => (
  (isPrefixOrSuffix && (grammarColors[morphPart.substr(0,2)] || grammarColors[morphPart.substr(0,1)])) || undefined
)

const pushTerm = ({ morphStrs, term }) => term && morphStrs.push(term)

const pushGenderNumberState = ({ morphStrs, morphPartLetters }) => {
  pushTerm({ morphStrs, term: getGrammarTerms('gender')[morphPartLetters[0]] })
  pushTerm({ morphStrs, term: getGrammarTerms('number')[morphPartLetters[1]] })
  pushTerm({ morphStrs, term: getGrammarTerms('state')[morphPartLetters[2]] })
}

const pushPersonGenderNumber = ({ morphStrs, morphPartLetters }) => {
  pushTerm({ morphStrs, term: getGrammarTerms('person')[morphPartLetters[0]] })
  pushTerm({ morphStrs, term: getGrammarTerms('gender')[morphPartLetters[1]] })
  pushTerm({ morphStrs, term: getGrammarTerms('number')[morphPartLetters[2]] })
}

export const getHebrewMorphPartDisplayInfo = ({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart }) => {

  const morphPartLetters = morphPart.split("")
  const morphStrs = []
  const color = getGrammarColor({ isPrefixOrSuffix, morphPart })

  // prevent empty parsing before or after +
  wordIsMultiPart && pushTerm({ morphStrs, term: getGrammarTerms('pos')[morphPartLetters[0]] })

  switch(morphPartLetters[0]) {
    case 'A':
      pushTerm({ morphStrs, term: getGrammarTerms('adjType')[morphPartLetters[1]] })
      pushGenderNumberState({ morphStrs, morphPartLetters: morphPartLetters.slice(2) })
      break

    case 'N':
      pushTerm({ morphStrs, term: getGrammarTerms('nounType')[morphPartLetters[1]] })
      pushGenderNumberState({ morphStrs, morphPartLetters: morphPartLetters.slice(2) })
      break

    case 'P':
      pushTerm({ morphStrs, term: getGrammarTerms('pronounType')[morphPartLetters[1]] })
      pushPersonGenderNumber({ morphStrs, morphPartLetters: morphPartLetters.slice(2) })
      break

    case 'R':
      pushTerm({ morphStrs, term: getGrammarTerms('prepType')[morphPartLetters[1]] })
      break

    case 'S':
      pushTerm({ morphStrs, term: getGrammarTerms('suffixType')[morphPartLetters[1]] })
      if(morphPartLetters[1] === 'p') {
        pushPersonGenderNumber({ morphStrs, morphPartLetters: morphPartLetters.slice(2,5) })
        pushTerm({ morphStrs, term: i18n("suffix", "", "original-languages") })
      }
      break

    case 'T':
      pushTerm({ morphStrs, term: getGrammarTerms('particleType')[morphPartLetters[1]] })
      break

    case 'V':
      pushTerm({ morphStrs, term: getGrammarTerms(`stem${morphLang}`)[morphPartLetters[1]] })
      if(['r','s'].includes(morphPartLetters[2])) {
        pushTerm({ morphStrs, term: getGrammarTerms('aspect')[morphPartLetters[2]] })
        pushGenderNumberState({ morphStrs, morphPartLetters: morphPartLetters.slice(3) })
      } else if(['a','c'].includes(morphPartLetters[2])) {
        pushTerm({ morphStrs, term: getGrammarTerms('aspect')[morphPartLetters[2]] })
      } else {
        pushTerm({ morphStrs, term: getGrammarTerms('aspect')[morphPartLetters[2]] })
        pushPersonGenderNumber({ morphStrs, morphPartLetters: morphPartLetters.slice(3) })
      }
      break
      
    default:
      break
  }

  return {
    str: morphStrs.join(i18n(" ", "word separator")),
    color,
  }
}
