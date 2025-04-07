"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grammarColors = exports.getHebrewPOSTerm = exports.getHebrewMorphPartDisplayInfo = exports.getGrammarColor = void 0;

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPosTerm = function getPosTerm(code) {
  switch (code) {
    case 'A':
      return (0, _i18n["default"])("adjective", "", "original-languages");

    case 'C':
      return (0, _i18n["default"])("conjunction", "", "original-languages");

    case 'D':
      return (0, _i18n["default"])("adverb", "", "original-languages");

    case 'N':
      return (0, _i18n["default"])("noun", "", "original-languages");

    case 'P':
      return (0, _i18n["default"])("pronoun", "", "original-languages");

    case 'R':
      return (0, _i18n["default"])("preposition", "", "original-languages");

    case 'T':
      return (0, _i18n["default"])("particle", "", "original-languages");

    case 'V':
      return (0, _i18n["default"])("verb", "", "original-languages");
  }
};

var getHebrewPOSTerm = function getHebrewPOSTerm(posCode) {
  return getPosTerm(posCode) || "";
};

exports.getHebrewPOSTerm = getHebrewPOSTerm;

var getGrammarTerms = function getGrammarTerms(code) {
  switch (code) {
    case 'pos':
      return {
        // These are the only pos's that I want to actually print
        // since others are shown in the Entry component
        C: getPosTerm('C'),
        R: getPosTerm('R'),
        D: getPosTerm('D')
      };

    case 'person':
      return {
        1: (0, _i18n["default"])("1st", "", "original-languages"),
        2: (0, _i18n["default"])("2nd", "", "original-languages"),
        3: (0, _i18n["default"])("3rd", "", "original-languages")
      };

    case 'gender':
      return {
        m: (0, _i18n["default"])("masculine", "", "original-languages"),
        f: (0, _i18n["default"])("feminine", "", "original-languages"),
        b: (0, _i18n["default"])("gender-both", "", "original-languages"),
        c: (0, _i18n["default"])("common", "", "original-languages")
      };

    case 'number':
      return {
        s: (0, _i18n["default"])("singular", "", "original-languages"),
        p: (0, _i18n["default"])("plural", "", "original-languages"),
        d: (0, _i18n["default"])("dual", "", "original-languages")
      };

    case 'state':
      return {
        a: (0, _i18n["default"])("absolute", "", "original-languages"),
        c: (0, _i18n["default"])("construct", "", "original-languages"),
        d: (0, _i18n["default"])("determined", "", "original-languages")
      };

    case 'adjType':
      return {
        c: (0, _i18n["default"])("cardinal-number", "", "original-languages"),
        o: (0, _i18n["default"])("ordinal-number", "", "original-languages")
      };

    case 'nounType':
      return {
        g: (0, _i18n["default"])("gentilic", "", "original-languages"),
        p: (0, _i18n["default"])("proper-name", "", "original-languages")
      };

    case 'pronounType':
      return {
        d: (0, _i18n["default"])("demonstrative", "", "original-languages"),
        f: (0, _i18n["default"])("indefinite", "", "original-languages"),
        i: (0, _i18n["default"])("interrogative", "", "original-languages"),
        p: (0, _i18n["default"])("personal", "", "original-languages"),
        r: (0, _i18n["default"])("relative", "", "original-languages")
      };

    case 'prepType':
      return {
        d: (0, _i18n["default"])("definite-article", "", "original-languages")
      };

    case 'suffixType':
      return {
        d: (0, _i18n["default"])("directional", "", "original-languages"),
        h: (0, _i18n["default"])("paragogic", "", "original-languages"),
        n: (0, _i18n["default"])("paragogic", "", "original-languages")
      };

    case 'particleType':
      return {
        a: (0, _i18n["default"])("affirmation", "", "original-languages"),
        d: (0, _i18n["default"])("definite-article", "", "original-languages"),
        e: (0, _i18n["default"])("exhortation", "", "original-languages"),
        i: (0, _i18n["default"])("interrogative", "", "original-languages"),
        j: (0, _i18n["default"])("interjection", "", "original-languages"),
        m: (0, _i18n["default"])("demonstrative", "", "original-languages"),
        n: (0, _i18n["default"])("negative", "", "original-languages"),
        o: (0, _i18n["default"])("direct-object-marker", "", "original-languages"),
        r: (0, _i18n["default"])("relative", "", "original-languages")
      };

    case 'stemHe':
      return {
        q: (0, _i18n["default"])("qal", "", "original-languages"),
        N: (0, _i18n["default"])("niphal", "", "original-languages"),
        p: (0, _i18n["default"])("piel", "", "original-languages"),
        P: (0, _i18n["default"])("pual", "", "original-languages"),
        h: (0, _i18n["default"])("hiphil", "", "original-languages"),
        H: (0, _i18n["default"])("hophal", "", "original-languages"),
        t: (0, _i18n["default"])("hithpael", "", "original-languages"),
        o: (0, _i18n["default"])("polel", "", "original-languages"),
        O: (0, _i18n["default"])("polal", "", "original-languages"),
        r: (0, _i18n["default"])("hithpolel", "", "original-languages"),
        m: (0, _i18n["default"])("poel", "", "original-languages"),
        M: (0, _i18n["default"])("poal", "", "original-languages"),
        k: (0, _i18n["default"])("palel", "", "original-languages"),
        K: (0, _i18n["default"])("pulal", "", "original-languages"),
        Q: (0, _i18n["default"])("qal-passive", "", "original-languages"),
        l: (0, _i18n["default"])("pilpel", "", "original-languages"),
        L: (0, _i18n["default"])("polpal", "", "original-languages"),
        f: (0, _i18n["default"])("hithpalpel", "", "original-languages"),
        D: (0, _i18n["default"])("nithpael", "", "original-languages"),
        j: (0, _i18n["default"])("pealal", "", "original-languages"),
        i: (0, _i18n["default"])("pilel", "", "original-languages"),
        u: (0, _i18n["default"])("hothpaal", "", "original-languages"),
        c: (0, _i18n["default"])("tiphil", "", "original-languages"),
        v: (0, _i18n["default"])("hishtaphel", "", "original-languages"),
        w: (0, _i18n["default"])("nithpalel", "", "original-languages"),
        y: (0, _i18n["default"])("nithpoel", "", "original-languages"),
        z: (0, _i18n["default"])("hithpoel", "", "original-languages")
      };

    case 'stemAr':
      return {
        q: (0, _i18n["default"])("peal", "", "original-languages"),
        Q: (0, _i18n["default"])("peil", "", "original-languages"),
        u: (0, _i18n["default"])("hithpeel", "", "original-languages"),
        N: (0, _i18n["default"])("niphal", "", "original-languages"),
        p: (0, _i18n["default"])("pael", "", "original-languages"),
        P: (0, _i18n["default"])("ithpaal", "", "original-languages"),
        M: (0, _i18n["default"])("hithpaal", "", "original-languages"),
        a: (0, _i18n["default"])("aphel", "", "original-languages"),
        h: (0, _i18n["default"])("haphel", "", "original-languages"),
        s: (0, _i18n["default"])("saphel", "", "original-languages"),
        e: (0, _i18n["default"])("shaphel", "", "original-languages"),
        H: (0, _i18n["default"])("hophal", "", "original-languages"),
        i: (0, _i18n["default"])("ithpeel", "", "original-languages"),
        t: (0, _i18n["default"])("hishtaphel", "", "original-languages"),
        v: (0, _i18n["default"])("ishtaphel", "", "original-languages"),
        w: (0, _i18n["default"])("hithaphel", "", "original-languages"),
        o: (0, _i18n["default"])("polel", "", "original-languages"),
        z: (0, _i18n["default"])("ithpoel", "", "original-languages"),
        r: (0, _i18n["default"])("hithpolel", "", "original-languages"),
        f: (0, _i18n["default"])("hithpalpel", "", "original-languages"),
        b: (0, _i18n["default"])("hephal", "", "original-languages"),
        c: (0, _i18n["default"])("tiphel", "", "original-languages"),
        m: (0, _i18n["default"])("poel", "", "original-languages"),
        l: (0, _i18n["default"])("palpel", "", "original-languages"),
        L: (0, _i18n["default"])("ithpalpel", "", "original-languages"),
        O: (0, _i18n["default"])("ithpolel", "", "original-languages"),
        G: (0, _i18n["default"])("ittaphal", "", "original-languages")
      };

    case 'aspect':
      return {
        p: (0, _i18n["default"])("perfect", "", "original-languages"),
        q: (0, _i18n["default"])("sequential-perfect", "", "original-languages"),
        i: (0, _i18n["default"])("imperfect", "", "original-languages"),
        w: (0, _i18n["default"])("sequential-imperfect", "", "original-languages"),
        h: (0, _i18n["default"])("cohortative", "", "original-languages"),
        j: (0, _i18n["default"])("jussive", "", "original-languages"),
        v: (0, _i18n["default"])("imperative", "", "original-languages"),
        r: (0, _i18n["default"])("participle", "", "original-languages"),
        s: (0, _i18n["default"])("passive-participle", "", "original-languages"),
        a: (0, _i18n["default"])("infinitive-absolute", "", "original-languages"),
        c: (0, _i18n["default"])("infinitive-construct", "", "original-languages")
      };
  }
};

var grammarColors = {
  C: "#C95047",
  R: "#84A671",
  Sd: "#24ada8",
  Sh: "#77777A",
  Sn: "#77777A",
  Sp: "#BDAC59",
  Td: "#5C829A",
  Tr: "#b73ecc",
  Ti: "#D68945"
};
exports.grammarColors = grammarColors;

var getGrammarColor = function getGrammarColor(_ref) {
  var isPrefixOrSuffix = _ref.isPrefixOrSuffix,
      _ref$morphPart = _ref.morphPart,
      morphPart = _ref$morphPart === void 0 ? "" : _ref$morphPart;
  return isPrefixOrSuffix && (grammarColors[morphPart.substr(0, 2)] || grammarColors[morphPart.substr(0, 1)]) || undefined;
};

exports.getGrammarColor = getGrammarColor;

var pushTerm = function pushTerm(_ref2) {
  var morphStrs = _ref2.morphStrs,
      term = _ref2.term;
  return term && morphStrs.push(term);
};

var pushGenderNumberState = function pushGenderNumberState(_ref3) {
  var morphStrs = _ref3.morphStrs,
      morphPartLetters = _ref3.morphPartLetters;
  pushTerm({
    morphStrs: morphStrs,
    term: getGrammarTerms('gender')[morphPartLetters[0]]
  });
  pushTerm({
    morphStrs: morphStrs,
    term: getGrammarTerms('number')[morphPartLetters[1]]
  });
  pushTerm({
    morphStrs: morphStrs,
    term: getGrammarTerms('state')[morphPartLetters[2]]
  });
};

var pushPersonGenderNumber = function pushPersonGenderNumber(_ref4) {
  var morphStrs = _ref4.morphStrs,
      morphPartLetters = _ref4.morphPartLetters;
  pushTerm({
    morphStrs: morphStrs,
    term: getGrammarTerms('person')[morphPartLetters[0]]
  });
  pushTerm({
    morphStrs: morphStrs,
    term: getGrammarTerms('gender')[morphPartLetters[1]]
  });
  pushTerm({
    morphStrs: morphStrs,
    term: getGrammarTerms('number')[morphPartLetters[2]]
  });
};

var getHebrewMorphPartDisplayInfo = function getHebrewMorphPartDisplayInfo(_ref5) {
  var morphLang = _ref5.morphLang,
      morphPart = _ref5.morphPart,
      isPrefixOrSuffix = _ref5.isPrefixOrSuffix,
      wordIsMultiPart = _ref5.wordIsMultiPart;
  var morphPartLetters = morphPart.split("");
  var morphStrs = [];
  var color = getGrammarColor({
    isPrefixOrSuffix: isPrefixOrSuffix,
    morphPart: morphPart
  }); // prevent empty parsing before or after +

  wordIsMultiPart && pushTerm({
    morphStrs: morphStrs,
    term: getGrammarTerms('pos')[morphPartLetters[0]]
  });

  switch (morphPartLetters[0]) {
    case 'A':
      pushTerm({
        morphStrs: morphStrs,
        term: getGrammarTerms('adjType')[morphPartLetters[1]]
      });
      pushGenderNumberState({
        morphStrs: morphStrs,
        morphPartLetters: morphPartLetters.slice(2)
      });
      break;

    case 'N':
      pushTerm({
        morphStrs: morphStrs,
        term: getGrammarTerms('nounType')[morphPartLetters[1]]
      });
      pushGenderNumberState({
        morphStrs: morphStrs,
        morphPartLetters: morphPartLetters.slice(2)
      });
      break;

    case 'P':
      pushTerm({
        morphStrs: morphStrs,
        term: getGrammarTerms('pronounType')[morphPartLetters[1]]
      });
      pushPersonGenderNumber({
        morphStrs: morphStrs,
        morphPartLetters: morphPartLetters.slice(2)
      });
      break;

    case 'R':
      pushTerm({
        morphStrs: morphStrs,
        term: getGrammarTerms('prepType')[morphPartLetters[1]]
      });
      break;

    case 'S':
      pushTerm({
        morphStrs: morphStrs,
        term: getGrammarTerms('suffixType')[morphPartLetters[1]]
      });

      if (morphPartLetters[1] === 'p') {
        pushPersonGenderNumber({
          morphStrs: morphStrs,
          morphPartLetters: morphPartLetters.slice(2, 5)
        });
        pushTerm({
          morphStrs: morphStrs,
          term: (0, _i18n["default"])("suffix", "", "original-languages")
        });
      }

      break;

    case 'T':
      pushTerm({
        morphStrs: morphStrs,
        term: getGrammarTerms('particleType')[morphPartLetters[1]]
      });
      break;

    case 'V':
      pushTerm({
        morphStrs: morphStrs,
        term: getGrammarTerms("stem".concat(morphLang))[morphPartLetters[1]]
      });

      if (['r', 's'].includes(morphPartLetters[2])) {
        pushTerm({
          morphStrs: morphStrs,
          term: getGrammarTerms('aspect')[morphPartLetters[2]]
        });
        pushGenderNumberState({
          morphStrs: morphStrs,
          morphPartLetters: morphPartLetters.slice(3)
        });
      } else if (['a', 'c'].includes(morphPartLetters[2])) {
        pushTerm({
          morphStrs: morphStrs,
          term: getGrammarTerms('aspect')[morphPartLetters[2]]
        });
      } else {
        pushTerm({
          morphStrs: morphStrs,
          term: getGrammarTerms('aspect')[morphPartLetters[2]]
        });
        pushPersonGenderNumber({
          morphStrs: morphStrs,
          morphPartLetters: morphPartLetters.slice(3)
        });
      }

      break;

    default:
      break;
  }

  return {
    str: morphStrs.join((0, _i18n["default"])(" ", "word separator")),
    color: color
  };
};

exports.getHebrewMorphPartDisplayInfo = getHebrewMorphPartDisplayInfo;