"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHebrewPOSTerm = exports.getHebrewMorphPartDisplayInfo = exports.getGrammarColor = void 0;

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPosTerm = function getPosTerm(code) {
  switch (code) {
    case 'A':
      return (0, _i18n["default"])("adjective", "", "grammar");

    case 'C':
      return (0, _i18n["default"])("conjunction", "", "grammar");

    case 'D':
      return (0, _i18n["default"])("adverb", "", "grammar");

    case 'N':
      return (0, _i18n["default"])("noun", "", "grammar");

    case 'P':
      return (0, _i18n["default"])("pronoun", "", "grammar");

    case 'R':
      return (0, _i18n["default"])("preposition", "", "grammar");

    case 'T':
      return (0, _i18n["default"])("particle", "", "grammar");

    case 'V':
      return (0, _i18n["default"])("verb", "", "grammar");
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
        1: (0, _i18n["default"])("1st", "", "grammar"),
        2: (0, _i18n["default"])("2nd", "", "grammar"),
        3: (0, _i18n["default"])("3rd", "", "grammar")
      };

    case 'gender':
      return {
        m: (0, _i18n["default"])("masculine", "", "grammar"),
        f: (0, _i18n["default"])("feminine", "", "grammar"),
        b: (0, _i18n["default"])("gender-both", "", "grammar"),
        c: (0, _i18n["default"])("common", "", "grammar")
      };

    case 'number':
      return {
        s: (0, _i18n["default"])("singular", "", "grammar"),
        p: (0, _i18n["default"])("plural", "", "grammar"),
        d: (0, _i18n["default"])("dual", "", "grammar")
      };

    case 'state':
      return {
        a: (0, _i18n["default"])("absolute", "", "grammar"),
        c: (0, _i18n["default"])("construct", "", "grammar"),
        d: (0, _i18n["default"])("determined", "", "grammar")
      };

    case 'adjType':
      return {
        c: (0, _i18n["default"])("cardinal-number", "", "grammar"),
        o: (0, _i18n["default"])("ordinal-number", "", "grammar")
      };

    case 'nounType':
      return {
        g: (0, _i18n["default"])("gentilic", "", "grammar"),
        p: (0, _i18n["default"])("proper-name", "", "grammar")
      };

    case 'pronounType':
      return {
        d: (0, _i18n["default"])("demonstrative", "", "grammar"),
        f: (0, _i18n["default"])("indefinite", "", "grammar"),
        i: (0, _i18n["default"])("interrogative", "", "grammar"),
        p: (0, _i18n["default"])("personal", "", "grammar"),
        r: (0, _i18n["default"])("relative", "", "grammar")
      };

    case 'prepType':
      return {
        d: (0, _i18n["default"])("definite-article", "", "grammar")
      };

    case 'suffixType':
      return {
        d: (0, _i18n["default"])("directional", "", "grammar"),
        h: (0, _i18n["default"])("paragogic", "", "grammar"),
        n: (0, _i18n["default"])("paragogic", "", "grammar")
      };

    case 'particleType':
      return {
        a: (0, _i18n["default"])("affirmation", "", "grammar"),
        d: (0, _i18n["default"])("definite-article", "", "grammar"),
        e: (0, _i18n["default"])("exhortation", "", "grammar"),
        i: (0, _i18n["default"])("interrogative", "", "grammar"),
        j: (0, _i18n["default"])("interjection", "", "grammar"),
        m: (0, _i18n["default"])("demonstrative", "", "grammar"),
        n: (0, _i18n["default"])("negative", "", "grammar"),
        o: (0, _i18n["default"])("direct-object-marker", "", "grammar"),
        r: (0, _i18n["default"])("relative", "", "grammar")
      };

    case 'stemHe':
      return {
        q: (0, _i18n["default"])("qal", "", "grammar"),
        N: (0, _i18n["default"])("niphal", "", "grammar"),
        p: (0, _i18n["default"])("piel", "", "grammar"),
        P: (0, _i18n["default"])("pual", "", "grammar"),
        h: (0, _i18n["default"])("hiphil", "", "grammar"),
        H: (0, _i18n["default"])("hophal", "", "grammar"),
        t: (0, _i18n["default"])("hithpael", "", "grammar"),
        o: (0, _i18n["default"])("polel", "", "grammar"),
        O: (0, _i18n["default"])("polal", "", "grammar"),
        r: (0, _i18n["default"])("hithpolel", "", "grammar"),
        m: (0, _i18n["default"])("poel", "", "grammar"),
        M: (0, _i18n["default"])("poal", "", "grammar"),
        k: (0, _i18n["default"])("palel", "", "grammar"),
        K: (0, _i18n["default"])("pulal", "", "grammar"),
        Q: (0, _i18n["default"])("qal-passive", "", "grammar"),
        l: (0, _i18n["default"])("pilpel", "", "grammar"),
        L: (0, _i18n["default"])("polpal", "", "grammar"),
        f: (0, _i18n["default"])("hithpalpel", "", "grammar"),
        D: (0, _i18n["default"])("nithpael", "", "grammar"),
        j: (0, _i18n["default"])("pealal", "", "grammar"),
        i: (0, _i18n["default"])("pilel", "", "grammar"),
        u: (0, _i18n["default"])("hothpaal", "", "grammar"),
        c: (0, _i18n["default"])("tiphil", "", "grammar"),
        v: (0, _i18n["default"])("hishtaphel", "", "grammar"),
        w: (0, _i18n["default"])("nithpalel", "", "grammar"),
        y: (0, _i18n["default"])("nithpoel", "", "grammar"),
        z: (0, _i18n["default"])("hithpoel", "", "grammar")
      };

    case 'stemAr':
      return {
        q: (0, _i18n["default"])("peal", "", "grammar"),
        Q: (0, _i18n["default"])("peil", "", "grammar"),
        u: (0, _i18n["default"])("hithpeel", "", "grammar"),
        N: (0, _i18n["default"])("niphal", "", "grammar"),
        p: (0, _i18n["default"])("pael", "", "grammar"),
        P: (0, _i18n["default"])("ithpaal", "", "grammar"),
        M: (0, _i18n["default"])("hithpaal", "", "grammar"),
        a: (0, _i18n["default"])("aphel", "", "grammar"),
        h: (0, _i18n["default"])("haphel", "", "grammar"),
        s: (0, _i18n["default"])("saphel", "", "grammar"),
        e: (0, _i18n["default"])("shaphel", "", "grammar"),
        H: (0, _i18n["default"])("hophal", "", "grammar"),
        i: (0, _i18n["default"])("ithpeel", "", "grammar"),
        t: (0, _i18n["default"])("hishtaphel", "", "grammar"),
        v: (0, _i18n["default"])("ishtaphel", "", "grammar"),
        w: (0, _i18n["default"])("hithaphel", "", "grammar"),
        o: (0, _i18n["default"])("polel", "", "grammar"),
        z: (0, _i18n["default"])("ithpoel", "", "grammar"),
        r: (0, _i18n["default"])("hithpolel", "", "grammar"),
        f: (0, _i18n["default"])("hithpalpel", "", "grammar"),
        b: (0, _i18n["default"])("hephal", "", "grammar"),
        c: (0, _i18n["default"])("tiphel", "", "grammar"),
        m: (0, _i18n["default"])("poel", "", "grammar"),
        l: (0, _i18n["default"])("palpel", "", "grammar"),
        L: (0, _i18n["default"])("ithpalpel", "", "grammar"),
        O: (0, _i18n["default"])("ithpolel", "", "grammar"),
        G: (0, _i18n["default"])("ittaphal", "", "grammar")
      };

    case 'aspect':
      return {
        p: (0, _i18n["default"])("perfect", "", "grammar"),
        q: (0, _i18n["default"])("sequential-perfect", "", "grammar"),
        i: (0, _i18n["default"])("imperfect", "", "grammar"),
        w: (0, _i18n["default"])("sequential-imperfect", "", "grammar"),
        h: (0, _i18n["default"])("cohortative", "", "grammar"),
        j: (0, _i18n["default"])("jussive", "", "grammar"),
        v: (0, _i18n["default"])("imperative", "", "grammar"),
        r: (0, _i18n["default"])("participle", "", "grammar"),
        s: (0, _i18n["default"])("passive-participle", "", "grammar"),
        a: (0, _i18n["default"])("infinitive-absolute", "", "grammar"),
        c: (0, _i18n["default"])("infinitive-construct", "", "grammar")
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
          term: (0, _i18n["default"])("suffix", "", "grammar")
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