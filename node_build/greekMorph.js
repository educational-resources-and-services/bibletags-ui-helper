"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNormalizedGreekPOSCode = exports.getGreekPOSTypeTerm = exports.getGreekPOSTerm = exports.getGreekMorphPartDisplayInfo = void 0;

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getPosTerm = function getPosTerm(code) {
  switch (code) {
    case 'N':
      return (0, _i18n["default"])("noun", "", "original-languages");

    case 'A':
      return (0, _i18n["default"])("adjective", "", "original-languages");

    case 'NS':
      return (0, _i18n["default"])("adjective", "", "original-languages");
    // better categorized as an adjective

    case 'NP':
      return (0, _i18n["default"])("adjective", "", "original-languages");
    // better categorized as an adjective

    case 'E':
      return (0, _i18n["default"])("determiner", "", "original-languages");

    case 'R':
      return (0, _i18n["default"])("pronoun", "", "original-languages");

    case 'V':
      return (0, _i18n["default"])("verb", "", "original-languages");

    case 'I':
      return (0, _i18n["default"])("interjection", "", "original-languages");

    case 'P':
      return (0, _i18n["default"])("preposition", "", "original-languages");

    case 'D':
      return (0, _i18n["default"])("adverb", "", "original-languages");

    case 'PI':
      return (0, _i18n["default"])("adverb", "", "original-languages");
    // better categorized as an adverb

    case 'C':
      return (0, _i18n["default"])("conjunction", "", "original-languages");

    case 'T':
      return (0, _i18n["default"])("particle", "", "original-languages");

    case 'TF':
      return (0, _i18n["default"])("foreign", "", "original-languages");
    // better in its own category
  }
};

var getPosTypeTerm = function getPosTypeTerm(code) {
  switch (code) {
    case 'NS':
      return (0, _i18n["default"])("substantive", "", "original-languages");

    case 'NP':
      return (0, _i18n["default"])("predicate", "", "original-languages");

    case 'AA':
      return (0, _i18n["default"])("ascriptive", "", "original-languages");

    case 'AR':
      return (0, _i18n["default"])("restrictive", "", "original-languages");

    case 'EA':
      return (0, _i18n["default"])("article", "", "original-languages");

    case 'ED':
      return (0, _i18n["default"])("demonstrative", "", "original-languages");

    case 'EF':
      return (0, _i18n["default"])("differential", "", "original-languages");

    case 'EP':
      return (0, _i18n["default"])("possessive", "", "original-languages");

    case 'EQ':
      return (0, _i18n["default"])("quantifier", "", "original-languages");

    case 'EN':
      return (0, _i18n["default"])("number", "", "original-languages");

    case 'EO':
      return (0, _i18n["default"])("ordinal", "", "original-languages");

    case 'ER':
      return (0, _i18n["default"])("relative", "", "original-languages");

    case 'ET':
      return (0, _i18n["default"])("interrogative", "", "original-languages");

    case 'RD':
      return (0, _i18n["default"])("demonstrative", "", "original-languages");

    case 'RP':
      return (0, _i18n["default"])("personal", "", "original-languages");

    case 'RE':
      return (0, _i18n["default"])("reflexive", "", "original-languages");

    case 'RC':
      return (0, _i18n["default"])("reciprocal", "", "original-languages");

    case 'RI':
      return (0, _i18n["default"])("indefinite", "", "original-languages");

    case 'RR':
      return (0, _i18n["default"])("relative", "", "original-languages");

    case 'RT':
      return (0, _i18n["default"])("interrogative", "", "original-languages");
    // case 'VT': return i18n("transitive", "", "original-languages")
    // case 'VI': return i18n("intransitive", "", "original-languages")
    // case 'VL': return i18n("linking", "", "original-languages")
    // case 'VM': return i18n("modal", "", "original-languages")
    // case 'VP': return i18n("periphrastic", "", "original-languages")

    case 'IE':
      return (0, _i18n["default"])("exclamation", "", "original-languages");

    case 'ID':
      return (0, _i18n["default"])("directive", "", "original-languages");

    case 'IR':
      return (0, _i18n["default"])("response", "", "original-languages");

    case 'PI':
      return (0, _i18n["default"])("improper-preposition", "", "original-languages");

    case 'DO':
      return (0, _i18n["default"])("correlative", "", "original-languages");

    case 'CC':
      return (0, _i18n["default"])("coordinating", "", "original-languages");

    case 'CS':
      return (0, _i18n["default"])("subordinating", "", "original-languages");

    case 'CO':
      return (0, _i18n["default"])("correlative", "", "original-languages");
  }
};

var getMorphTerms = function getMorphTerms() {
  return [{
    // mood
    I: (0, _i18n["default"])("indicative", "", "original-languages"),
    M: (0, _i18n["default"])("imperative", "", "original-languages"),
    S: (0, _i18n["default"])("subjunctive", "", "original-languages"),
    O: (0, _i18n["default"])("optative", "", "original-languages"),
    N: (0, _i18n["default"])("infinitive", "", "original-languages"),
    P: (0, _i18n["default"])("participle", "", "original-languages")
  }, {
    // aspect
    P: (0, _i18n["default"])("present", "", "original-languages"),
    I: (0, _i18n["default"])("imperfect", "", "original-languages"),
    F: (0, _i18n["default"])("future", "", "original-languages"),
    A: (0, _i18n["default"])("aorist", "", "original-languages"),
    E: (0, _i18n["default"])("perfect", "", "original-languages"),
    L: (0, _i18n["default"])("pluperfect", "", "original-languages")
  }, {
    // voice
    A: (0, _i18n["default"])("active", "", "original-languages"),
    M: (0, _i18n["default"])("middle", "", "original-languages"),
    P: (0, _i18n["default"])("passive", "", "original-languages")
  }, {
    // person
    1: (0, _i18n["default"])("1st", "", "original-languages"),
    2: (0, _i18n["default"])("2nd", "", "original-languages"),
    3: (0, _i18n["default"])("3rd", "", "original-languages")
  }, {
    // case
    N: (0, _i18n["default"])("nominative", "", "original-languages"),
    G: (0, _i18n["default"])("genitive", "", "original-languages"),
    D: (0, _i18n["default"])("dative", "", "original-languages"),
    A: (0, _i18n["default"])("accusative", "", "original-languages"),
    V: (0, _i18n["default"])("vocative", "", "original-languages")
  }, {
    // gender
    M: (0, _i18n["default"])("masculine", "", "original-languages"),
    F: (0, _i18n["default"])("feminine", "", "original-languages"),
    N: (0, _i18n["default"])("neuter", "", "original-languages")
  }, {
    // number
    S: (0, _i18n["default"])("singular", "", "original-languages"),
    P: (0, _i18n["default"])("plural", "", "original-languages")
  }, {
    // other
    C: (0, _i18n["default"])("comparative", "", "original-languages"),
    S: (0, _i18n["default"])("superlatives", "", "original-languages"),
    D: (0, _i18n["default"])("diminutive", "", "original-languages"),
    I: (0, _i18n["default"])("indeclinable", "", "original-languages")
  }];
};

var getNormalizedGreekPOSCode = function getNormalizedGreekPOSCode(posCode) {
  return getPosTerm(posCode) !== undefined ? posCode : posCode.substr(0, 1);
};

exports.getNormalizedGreekPOSCode = getNormalizedGreekPOSCode;

var getGreekPOSTerm = function getGreekPOSTerm(posCode) {
  return getPosTerm(getNormalizedGreekPOSCode(posCode)) || "";
};

exports.getGreekPOSTerm = getGreekPOSTerm;

var getGreekPOSTypeTerm = function getGreekPOSTypeTerm(posCode) {
  return getPosTypeTerm(posCode) || "";
};

exports.getGreekPOSTypeTerm = getGreekPOSTypeTerm;

var getGreekMorphPartDisplayInfo = function getGreekMorphPartDisplayInfo(_ref) {
  var morphPart = _ref.morphPart;
  var posCode = morphPart.substr(0, 2);
  var morphCodes = morphPart.substr(2).split('');
  var parsingDisplayPieces = [// getGreekPOSTerm(posCode),  // Shown in the POS list; TODO: make present POS stand out in list
  getGreekPOSTypeTerm(posCode)].concat(_toConsumableArray(getMorphTerms().map(function (category, index) {
    return category[morphCodes[index]] || "";
  })));
  return {
    str: parsingDisplayPieces.filter(function (piece) {
      return !!piece;
    }).join((0, _i18n["default"])(" ", "word separator"))
  };
};

exports.getGreekMorphPartDisplayInfo = getGreekMorphPartDisplayInfo;