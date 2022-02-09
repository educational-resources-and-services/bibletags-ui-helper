"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNormalizedGreekPOSCode = exports.getGreekPOSTypeTerm = exports.getGreekPOSTerm = exports.getGreekMorphPartDisplayInfo = void 0;

var _i18n = _interopRequireDefault(require("./i18n.js"));

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
      return (0, _i18n["default"])("noun", "", "grammar");

    case 'A':
      return (0, _i18n["default"])("adjective", "", "grammar");

    case 'NS':
      return (0, _i18n["default"])("adjective", "", "grammar");
    // better categorized as an adjective

    case 'NP':
      return (0, _i18n["default"])("adjective", "", "grammar");
    // better categorized as an adjective

    case 'E':
      return (0, _i18n["default"])("determiner", "", "grammar");

    case 'R':
      return (0, _i18n["default"])("pronoun", "", "grammar");

    case 'V':
      return (0, _i18n["default"])("verb", "", "grammar");

    case 'I':
      return (0, _i18n["default"])("interjection", "", "grammar");

    case 'P':
      return (0, _i18n["default"])("preposition", "", "grammar");

    case 'D':
      return (0, _i18n["default"])("adverb", "", "grammar");

    case 'PI':
      return (0, _i18n["default"])("adverb", "", "grammar");
    // better categorized as an adverb

    case 'C':
      return (0, _i18n["default"])("conjunction", "", "grammar");

    case 'T':
      return (0, _i18n["default"])("particle", "", "grammar");

    case 'TF':
      return (0, _i18n["default"])("foreign", "", "grammar");
    // better in its own category
  }
};

var getPosTypeTerm = function getPosTypeTerm(code) {
  switch (code) {
    case 'NS':
      return (0, _i18n["default"])("substantive", "", "grammar");

    case 'NP':
      return (0, _i18n["default"])("predicate", "", "grammar");

    case 'AA':
      return (0, _i18n["default"])("ascriptive", "", "grammar");

    case 'AR':
      return (0, _i18n["default"])("restrictive", "", "grammar");

    case 'EA':
      return (0, _i18n["default"])("article", "", "grammar");

    case 'ED':
      return (0, _i18n["default"])("demonstrative", "", "grammar");

    case 'EF':
      return (0, _i18n["default"])("differential", "", "grammar");

    case 'EP':
      return (0, _i18n["default"])("possessive", "", "grammar");

    case 'EQ':
      return (0, _i18n["default"])("quantifier", "", "grammar");

    case 'EN':
      return (0, _i18n["default"])("number", "", "grammar");

    case 'EO':
      return (0, _i18n["default"])("ordinal", "", "grammar");

    case 'ER':
      return (0, _i18n["default"])("relative", "", "grammar");

    case 'ET':
      return (0, _i18n["default"])("interrogative", "", "grammar");

    case 'RD':
      return (0, _i18n["default"])("demonstrative", "", "grammar");

    case 'RP':
      return (0, _i18n["default"])("personal", "", "grammar");

    case 'RE':
      return (0, _i18n["default"])("reflexive", "", "grammar");

    case 'RC':
      return (0, _i18n["default"])("reciprocal", "", "grammar");

    case 'RI':
      return (0, _i18n["default"])("indefinite", "", "grammar");

    case 'RR':
      return (0, _i18n["default"])("relative", "", "grammar");

    case 'RT':
      return (0, _i18n["default"])("interrogative", "", "grammar");

    case 'VT':
      return (0, _i18n["default"])("transitive", "", "grammar");

    case 'VI':
      return (0, _i18n["default"])("intransitive", "", "grammar");

    case 'VL':
      return (0, _i18n["default"])("linking", "", "grammar");

    case 'VM':
      return (0, _i18n["default"])("modal", "", "grammar");

    case 'VP':
      return (0, _i18n["default"])("periphrastic", "", "grammar");

    case 'IE':
      return (0, _i18n["default"])("exclamation", "", "grammar");

    case 'ID':
      return (0, _i18n["default"])("directive", "", "grammar");

    case 'IR':
      return (0, _i18n["default"])("response", "", "grammar");

    case 'PI':
      return (0, _i18n["default"])("improper-preposition", "", "grammar");

    case 'DO':
      return (0, _i18n["default"])("correlative", "", "grammar");

    case 'CC':
      return (0, _i18n["default"])("coordinating", "", "grammar");

    case 'CS':
      return (0, _i18n["default"])("subordinating", "", "grammar");

    case 'CO':
      return (0, _i18n["default"])("correlative", "", "grammar");
  }
};

var getMorphTerms = function getMorphTerms() {
  return [{
    // mood
    I: (0, _i18n["default"])("indicative", "", "grammar"),
    M: (0, _i18n["default"])("imperative", "", "grammar"),
    S: (0, _i18n["default"])("subjunctive", "", "grammar"),
    O: (0, _i18n["default"])("optative", "", "grammar"),
    N: (0, _i18n["default"])("infinitive", "", "grammar"),
    P: (0, _i18n["default"])("participle", "", "grammar")
  }, {
    // aspect
    P: (0, _i18n["default"])("present", "", "grammar"),
    I: (0, _i18n["default"])("imperfect", "", "grammar"),
    F: (0, _i18n["default"])("future", "", "grammar"),
    A: (0, _i18n["default"])("aorist", "", "grammar"),
    E: (0, _i18n["default"])("perfect", "", "grammar"),
    L: (0, _i18n["default"])("pluperfect", "", "grammar")
  }, {
    // voice
    A: (0, _i18n["default"])("active", "", "grammar"),
    M: (0, _i18n["default"])("middle", "", "grammar"),
    P: (0, _i18n["default"])("passive", "", "grammar")
  }, {
    // person
    1: (0, _i18n["default"])("1st", "", "grammar"),
    2: (0, _i18n["default"])("2nd", "", "grammar"),
    3: (0, _i18n["default"])("3rd", "", "grammar")
  }, {
    // case
    N: (0, _i18n["default"])("nominative", "", "grammar"),
    G: (0, _i18n["default"])("genitive", "", "grammar"),
    D: (0, _i18n["default"])("dative", "", "grammar"),
    A: (0, _i18n["default"])("accusative", "", "grammar"),
    V: (0, _i18n["default"])("vocative", "", "grammar")
  }, {
    // gender
    M: (0, _i18n["default"])("masculine", "", "grammar"),
    F: (0, _i18n["default"])("feminine", "", "grammar"),
    N: (0, _i18n["default"])("neuter", "", "grammar")
  }, {
    // number
    S: (0, _i18n["default"])("singular", "", "grammar"),
    P: (0, _i18n["default"])("plural", "", "grammar")
  }, {
    // other
    C: (0, _i18n["default"])("comparative", "", "grammar"),
    S: (0, _i18n["default"])("superlatives", "", "grammar"),
    D: (0, _i18n["default"])("diminutive", "", "grammar"),
    I: (0, _i18n["default"])("indeclinable", "", "grammar")
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