"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxVerseNumberByBookId = exports.hebrewPrefixSuffixMap = exports.hebrewPrefixSearchHitMap = exports.hebrewHeyNunSearchHitRegexes = exports.grammaticalDetailMap = exports.defaultWordDividerRegex = exports.bibleSearchScopes = exports.bibleSearchScopeKeysByTestament = exports.bibleSearchFlagMap = exports.allVerseNumberScopeKeysByBookId = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var bibleSearchFlagMap = {
  "in": {
    multiValue: true
  },
  include: {
    multiValue: true
  },
  same: {
    possibleValues: ['verse', /verses:[0-9]+/, 'phrase', 'sentence', 'paragraph']
  }
};
exports.bibleSearchFlagMap = bibleSearchFlagMap;
var bibleSearchScopes = {
  // multi-book scopes
  ot: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  law: [1, 2, 3, 4, 5],
  prophets: [6, 7, 9, 10, 11, 12, 23, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  writings: [19, 20, 18, 22, 8, 25, 21, 17, 27, 15, 16, 13, 14],
  "former-prophets": [6, 7, 9, 10, 11, 12],
  "latter-prophets": [23, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  history: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  wisdom: [18, 19, 20, 21, 22],
  "major-prophets": [23, 24, 25, 26, 27],
  "minor-prophets": [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  nt: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66],
  gospels: [40, 41, 42, 43],
  epistles: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
  "pauls-writings": [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
  "pastoral-epistles": [54, 55, 56],
  "lukes-writings": [42, 44],
  "johns-writings": [43, 62, 63, 64, 66],
  "peters-writings": [60, 61],
  // single books
  "Gen": [1],
  "Ex": [2],
  "Lev": [3],
  "Num": [4],
  "Dt": [5],
  "Jsh": [6],
  "Jdg": [7],
  "Rth": [8],
  "1Sa": [9],
  "2Sa": [10],
  "1Ki": [11],
  "2Ki": [12],
  "1Ch": [13],
  "2Ch": [14],
  "Ezr": [15],
  "Neh": [16],
  "Est": [17],
  "Job": [18],
  "Ps": [19],
  "Prv": [20],
  "Ecc": [21],
  "Sng": [22],
  "Is": [23],
  "Jer": [24],
  "Lam": [25],
  "Ezk": [26],
  "Dan": [27],
  "Hos": [28],
  "Jl": [29],
  "Amo": [30],
  "Ob": [31],
  "Jon": [32],
  "Mic": [33],
  "Nah": [34],
  "Hab": [35],
  "Zph": [36],
  "Hag": [37],
  "Zch": [38],
  "Mal": [39],
  "Mt": [40],
  "Mrk": [41],
  "Lk": [42],
  "Jhn": [43],
  "Act": [44],
  "Rom": [45],
  "1Co": [46],
  "2Co": [47],
  "Gal": [48],
  "Eph": [49],
  "Php": [50],
  "Col": [51],
  "1Th": [52],
  "2Th": [53],
  "1Ti": [54],
  "2Ti": [55],
  "Tts": [56],
  "Phm": [57],
  "Heb": [58],
  "Jam": [59],
  "1Pe": [60],
  "2Pe": [61],
  "1Jn": [62],
  "2Jn": [63],
  "3Jn": [64],
  "Jud": [65],
  "Rev": [66]
};
exports.bibleSearchScopes = bibleSearchScopes;
var otBibleSearchScopeKeys = Object.keys(bibleSearchScopes).filter(function (key) {
  return bibleSearchScopes[key].some(function (bookId) {
    return bookId <= 39;
  });
});
var ntBibleSearchScopeKeys = Object.keys(bibleSearchScopes).filter(function (key) {
  return bibleSearchScopes[key].some(function (bookId) {
    return bookId >= 40;
  });
});
var bibleSearchScopeKeysByTestament = {
  ot: otBibleSearchScopeKeys,
  nt: ntBibleSearchScopeKeys,
  both: [].concat(_toConsumableArray(otBibleSearchScopeKeys), _toConsumableArray(ntBibleSearchScopeKeys))
};
exports.bibleSearchScopeKeysByTestament = bibleSearchScopeKeysByTestament;

var getHebrewPrefixSuffixMapValue = function getHebrewPrefixSuffixMapValue(dataTerm, avgRowSizeInKB) {
  var wordInfoChar = dataTerm.slice(-1);
  return {
    detail: "".concat(dataTerm, ":1"),
    matches: function matches(wordInfo) {
      return !!wordInfo[5] && wordInfo[5].includes(wordInfoChar);
    },
    avgRowSizeInKB: avgRowSizeInKB
  };
};

var hebrewPrefixSuffixMap = {
  b: getHebrewPrefixSuffixMapValue('b', 1034),
  l: getHebrewPrefixSuffixMapValue('l', 1293),
  k: getHebrewPrefixSuffixMapValue('k', 197),
  m: getHebrewPrefixSuffixMapValue('m', 426),
  sh: getHebrewPrefixSuffixMapValue('sh', 9),
  v: getHebrewPrefixSuffixMapValue('v', 3174),
  h: {
    // definite article, whether an explicit ה or indicated by the vowel of a #b or #l
    detail: ["h1:1", "h2:1"],
    matches: function matches(wordInfo) {
      return !!wordInfo[5] && /[12]/.test(wordInfo[5]);
    },
    avgRowSizeInKB: 1
  },
  "h!": getHebrewPrefixSuffixMapValue("h1", 1555),
  // explicit ה definite articles only
  "h'": getHebrewPrefixSuffixMapValue("h2", 429),
  // definite articles that are indicated by the vowel of a #b or #l only
  "h?": getHebrewPrefixSuffixMapValue("h3", 85),
  // interrogative ה
  "h->": getHebrewPrefixSuffixMapValue("h4", 73),
  // directional ה
  "h^": getHebrewPrefixSuffixMapValue("h5", 30),
  // paragogic ה
  "n^": getHebrewPrefixSuffixMapValue("n", 21) // paragogic ן or נה

};
exports.hebrewPrefixSuffixMap = hebrewPrefixSuffixMap;
var hebrewPrefixSearchHitMap = {
  b: 'b',
  l: 'l',
  k: 'k',
  m: 'm',
  sh: 's',
  v: 'c',
  "h?": 'i'
};
exports.hebrewPrefixSearchHitMap = hebrewPrefixSearchHitMap;
var hebrewHeyNunSearchHitRegexes = {
  "h": /^(?:He,|Ar,)(?:[^:]*:)*[TR]d/,
  "h!": /^(?:He,|Ar,)(?:[^:]*:)*Td/,
  "h'": /^(?:He,|Ar,)(?:[^:]*:)*Rd/,
  "h->": /^(?:He,|Ar,)(?:[^:]*:)*Sd/,
  "h^": /^(?:He,|Ar,)(?:[^:]*:)*Sh/,
  "n^": /^(?:He,|Ar,)(?:[^:]*:)*Sn/
};
exports.hebrewHeyNunSearchHitRegexes = hebrewHeyNunSearchHitRegexes;

var getGrammaticalDetailMapValue = function getGrammaticalDetailMapValue(type, typeIndex, requiredLanguageChar, value, avgRowSizeInKB) {
  var values = value instanceof Array ? value : [value];
  var valueLength = values[0].length;
  var hasVaryingValueLengths = values.some(function (val) {
    return val.length !== valueLength;
  });
  return {
    detail: values.map(function (val) {
      return "".concat(_typeof(type) === 'object' && type[val] || type, ":").concat(val);
    }),
    avgRowSizeInKB: avgRowSizeInKB,
    matches: function matches(wordInfo) {
      var typeIdx = typeIndex[wordInfo[4][0]] || typeIndex;

      var languageMatches = function languageMatches(detailVal) {
        return requiredLanguageChar === '' || wordInfo[4][0] === (requiredLanguageChar[detailVal] || requiredLanguageChar);
      };

      if (hasVaryingValueLengths) {
        return values.some(function (val) {
          var detailValue = wordInfo[4].slice(typeIdx, typeIdx + val.length);
          return val === detailValue && languageMatches(detailValue);
        });
      }

      var detailValue = wordInfo[4].slice(typeIdx, typeIdx + valueLength);
      return values.includes(detailValue) && languageMatches(detailValue);
    }
  };
};

var getPosMapValue = function getPosMapValue() {
  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['pos', 1, ''].concat(params));
};

var getHebrewStemMapValue = function getHebrewStemMapValue() {
  for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    params[_key2] = arguments[_key2];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['stem', 3, 'H'].concat(params));
};

var getAspectMapValue = function getAspectMapValue() {
  for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    params[_key3] = arguments[_key3];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['aspect', 5, ''].concat(params));
};

var getTypeMapValue = function getTypeMapValue() {
  for (var _len4 = arguments.length, params = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    params[_key4] = arguments[_key4];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['type', 1, ''].concat(params));
};

var getGreekMoodMapValue = function getGreekMoodMapValue() {
  for (var _len5 = arguments.length, params = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    params[_key5] = arguments[_key5];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['mood', 3, 'G'].concat(params));
};

var getGreekVoiceMapValue = function getGreekVoiceMapValue() {
  for (var _len6 = arguments.length, params = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    params[_key6] = arguments[_key6];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['voice', 4, 'G'].concat(params));
};

var getPersonMapValue = function getPersonMapValue() {
  for (var _len7 = arguments.length, params = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    params[_key7] = arguments[_key7];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['person', 6, ''].concat(params));
};

var getGenderMapValue = function getGenderMapValue() {
  for (var _len8 = arguments.length, params = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    params[_key8] = arguments[_key8];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['gender', 7, ''].concat(params));
};

var getNumberMapValue = function getNumberMapValue() {
  for (var _len9 = arguments.length, params = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    params[_key9] = arguments[_key9];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['number', 8, ''].concat(params));
};

var getHebrewStateMapValue = function getHebrewStateMapValue() {
  for (var _len10 = arguments.length, params = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    params[_key10] = arguments[_key10];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['state', 9, 'H'].concat(params));
};

var getGreekCaseMapValue = function getGreekCaseMapValue() {
  for (var _len11 = arguments.length, params = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    params[_key11] = arguments[_key11];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['case', 9, 'G'].concat(params));
};

var getGreekAttributeMapValue = function getGreekAttributeMapValue() {
  for (var _len12 = arguments.length, params = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    params[_key12] = arguments[_key12];
  }

  return getGrammaticalDetailMapValue.apply(void 0, ['attribute', 10, 'G'].concat(params));
};

var grammaticalDetailMap = {
  // pos - both
  "noun": getPosMapValue('N', 5045),
  "verb": getPosMapValue('V', 3013),
  "adjective": getPosMapValue('A', 600),
  "conjunction": getPosMapValue('C', 588),
  "adverb": getPosMapValue('D', 329),
  "preposition": getPosMapValue('R', 901),
  "pronoun": getPosMapValue('P', 722),
  "particle": getPosMapValue('T', 772),
  // pos - greek
  "determiner": getPosMapValue('E', 899),
  "foreign": getPosMapValue('F', 1),
  // gender - both
  "masculine": getGenderMapValue(['m', 'M'], 4858),
  "feminine": getGenderMapValue(['f', 'F'], 1492),
  // gender - hebrew
  "gender-both": getGenderMapValue('b', 1106),
  "common": getGenderMapValue('c', 681),
  // gender - greek
  "neuter": getGenderMapValue('N', 743),
  // number - both
  "singular": getNumberMapValue(['s', 'S'], 5688),
  "plural": getNumberMapValue(['p', 'P'], 2443),
  // number - hebrew
  "dual": getNumberMapValue('d', 192),
  // stem - hebrew
  "qal": getHebrewStemMapValue('Hq', 2919),
  //only one stem needs to be tested for result accuracy
  "niphal": getHebrewStemMapValue(['HN', 'AN'], 0),
  "piel": getHebrewStemMapValue('Hp', 0),
  "pual": getHebrewStemMapValue('HP', 0),
  "hiphil": getHebrewStemMapValue('Hh', 0),
  "hophal": getHebrewStemMapValue(['HH', 'AH'], 0),
  "hithpael": getHebrewStemMapValue('Ht', 0),
  "polel": getHebrewStemMapValue(['Ho', 'Ao'], 0),
  "polal": getHebrewStemMapValue('HO', 0),
  "hithpolel": getHebrewStemMapValue(['Hr', 'Ar'], 0),
  "poel": getHebrewStemMapValue(['Hm', 'Am'], 0),
  "poal": getHebrewStemMapValue('HM', 0),
  "palel": getHebrewStemMapValue('Hk', 0),
  "pulal": getHebrewStemMapValue('HK', 0),
  "qal-passive": getHebrewStemMapValue('HQ', 0),
  "pilpel": getHebrewStemMapValue('Hl', 0),
  "polpal": getHebrewStemMapValue('HL', 0),
  "hithpalpel": getHebrewStemMapValue(['Hf', 'Af'], 0),
  "nithpael": getHebrewStemMapValue('HD', 0),
  "pealal": getHebrewStemMapValue('Hj', 0),
  "pilel": getHebrewStemMapValue('Hi', 0),
  "hothpaal": getHebrewStemMapValue('Hu', 0),
  "tiphil": getHebrewStemMapValue('Hc', 0),
  "hishtaphel": getHebrewStemMapValue(['Hv', 'At'], 0),
  "nithpalel": getHebrewStemMapValue('Hw', 0),
  "nithpoel": getHebrewStemMapValue('Hy', 0),
  "hithpoel": getHebrewStemMapValue('Hz', 0),
  "peal": getHebrewStemMapValue('Aq', 0),
  "peil": getHebrewStemMapValue('AQ', 0),
  "hithpeel": getHebrewStemMapValue('Au', 0),
  "pael": getHebrewStemMapValue('Ap', 0),
  "ithpaal": getHebrewStemMapValue('AP', 0),
  "hithpaal": getHebrewStemMapValue('AM', 0),
  "aphel": getHebrewStemMapValue('Aa', 0),
  "haphel": getHebrewStemMapValue('Ah', 0),
  "saphel": getHebrewStemMapValue('As', 0),
  "shaphel": getHebrewStemMapValue('Ae', 0),
  "ithpeel": getHebrewStemMapValue('Ai', 0),
  "ishtaphel": getHebrewStemMapValue('Av', 0),
  "hithaphel": getHebrewStemMapValue('Aw', 0),
  "ithpoel": getHebrewStemMapValue('Az', 0),
  "hephal": getHebrewStemMapValue('Ab', 0),
  "tiphel": getHebrewStemMapValue('Ac', 0),
  "palpel": getHebrewStemMapValue('Al', 0),
  "ithpalpel": getHebrewStemMapValue('AL', 0),
  "ithpolel": getHebrewStemMapValue('AO', 0),
  "ittaphal": getHebrewStemMapValue('AG', 0),
  // aspect - both
  "perfect": getAspectMapValue(['p', 'E'], 998),
  "imperfect": getAspectMapValue(['I', 'i'], 953),
  // aspect - greek
  "present": getAspectMapValue('P', 735),
  "future": getAspectMapValue('F', 113),
  "aorist": getAspectMapValue('A', 781),
  "pluperfect": getAspectMapValue('L', 5),
  // aspect - hebrew
  "sequential-perfect": getAspectMapValue('q', 372),
  "sequential-imperfect": getAspectMapValue('w', 958),
  "cohortative": getAspectMapValue('h', 36),
  "jussive": getAspectMapValue('j', 68),
  "passive-participle": getAspectMapValue('s', 94),
  "infinitive-absolute": getAspectMapValue('a', 52),
  "infinitive-construct": getAspectMapValue('c', 442),
  // mood - greek
  "indicative": getGreekMoodMapValue('I', 987),
  "subjunctive": getGreekMoodMapValue('S', 124),
  "optative": getGreekMoodMapValue('O', 4),
  "infinitive": getGreekMoodMapValue('N', 159),
  // aspect - hebrew / mood - greek
  "imperative": getGrammaticalDetailMapValue({
    v: 'aspect',
    M: 'mood'
  }, {
    H: 5,
    G: 3
  }, {
    v: 'H',
    M: 'G'
  }, ['v', 'M'], 188),
  "participle": getGrammaticalDetailMapValue({
    r: 'aspect',
    P: 'mood'
  }, {
    H: 5,
    G: 3
  }, {
    r: 'H',
    P: 'G'
  }, ['r', 'P'], 487),
  // type - hebrew
  "cardinal-number": getTypeMapValue('Ac', 378),
  "ordinal-number": getTypeMapValue('Ao', 45),
  "gentilic": getTypeMapValue('Ng', 129),
  "proper-name": getTypeMapValue('Np', 2049),
  "affirmation": getTypeMapValue('Ta', 62),
  "exhortation": getTypeMapValue('Te', 18),
  "negative": getTypeMapValue('Tn', 363),
  "direct-object-marker": getTypeMapValue('To', 555),
  // type - hebrew / pos - greek
  "interjection": getGrammaticalDetailMapValue({
    Tj: 'type',
    I: 'pos'
  }, 1, {
    Tj: 'H',
    I: 'G'
  }, ['Tj', 'I'], 22),
  // type - greek
  "substantive": getTypeMapValue('AS', 189),
  "predicate": getTypeMapValue('AP', 64),
  "ascriptive": getTypeMapValue('AA', 80),
  "restrictive": getTypeMapValue('AR', 13),
  "article": getTypeMapValue('EA', 728),
  "differential": getTypeMapValue('EF', 15),
  "possessive": getTypeMapValue('EP', 21),
  "quantifier": getTypeMapValue('EQ', 69),
  "ordinal": getTypeMapValue('EO', 8),
  "reflexive": getTypeMapValue('PE', 35),
  "reciprocal": getTypeMapValue('PC', 7),
  // "transitive": getTypeMapValue('VT', 0),
  // "intransitive": getTypeMapValue('VI', 0),
  // "linking": getTypeMapValue('VL', 0),
  // "modal": getTypeMapValue('VM', 0),
  // "periphrastic": getTypeMapValue('VP', 0),
  "exclamation": getTypeMapValue('IE', 11),
  "directive": getTypeMapValue('ID', 14),
  "response": getTypeMapValue('IR', 1),
  "improper-preposition": getTypeMapValue('DI', 38),
  "correlative": getTypeMapValue(['DO', 'CO'], 72),
  "coordinating": getTypeMapValue('CC', 638),
  "subordinating": getTypeMapValue('CS', 196),
  // type - both
  "demonstrative": getTypeMapValue(['Pd', 'Tm', 'ED', 'PD'], 126),
  "indefinite": getTypeMapValue(['Pf', 'PI'], 53),
  "personal": getTypeMapValue(['Pp', 'PP'], 442),
  "interrogative": getTypeMapValue(['Pi', 'Ti', 'ET', 'PT'], 29),
  "relative": getTypeMapValue(['Pr', 'Tr', 'ER', 'PR'], 103),
  "number": getTypeMapValue(['Ac', 'Ao', 'EN'], 153),
  // voice - greek
  "active": getGreekVoiceMapValue('A', 1290),
  "middle": getGreekVoiceMapValue('M', 282),
  "passive": getGreekVoiceMapValue('P', 261),
  // person - both
  "1st": getPersonMapValue('1', 381),
  "2nd": getPersonMapValue('2', 522),
  "3rd": getPersonMapValue('3', 1688),
  // state - hebrew
  "absolute": getHebrewStateMapValue('a', 4286),
  "construct": getHebrewStateMapValue('c', 3684),
  "determined": getHebrewStateMapValue('d', 0),
  // case - greek
  "nominative": getGreekCaseMapValue('N', 1325),
  "genitive": getGreekCaseMapValue('G', 1241),
  "dative": getGreekCaseMapValue('D', 794),
  "accusative": getGreekCaseMapValue('A', 1433),
  "vocative": getGreekCaseMapValue('V', 55),
  // attribute - greek
  "comparative": getGreekAttributeMapValue('C', 25),
  "superlatives": getGreekAttributeMapValue('S', 8),
  "diminutive": getGreekAttributeMapValue('D', 12),
  "indeclinable": getGreekAttributeMapValue('I', 68)
};
exports.grammaticalDetailMap = grammaticalDetailMap;
var maxVerseNumberByBookId = [0, 1533, 1213, 859, 1289, 959, 658, 618, 85, 811, 695, 817, 719, 943, 822, 280, 405, 167, 1070, 2527, 915, 222, 117, 1291, 1364, 154, 1273, 357, 197, 73, 146, 21, 48, 105, 47, 56, 53, 38, 211, 55, 1071, 678, 1151, 879, 1007, 433, 437, 256, 149, 155, 104, 95, 89, 47, 113, 83, 46, 25, 303, 108, 105, 61, 105, 13, 15, 25, 405];
exports.maxVerseNumberByBookId = maxVerseNumberByBookId;
var allVerseNumberScopeKeysByBookId = maxVerseNumberByBookId.map(function (maxVerseNumber, bookId) {
  return Array(maxVerseNumber).fill().map(function (x, idx) {
    return "".concat(bookId, ":").concat(idx + 1);
  });
}); // Export of defaultWordDividerRegex previously based off of [\P{Letter}] encoded here (https://mothereff.in/regexpu).
// But that caused unwanted breaks. Thus, I went through the unicode charts at https://unicodeplus.com to come up with 
// the results below.

exports.allVerseNumberScopeKeysByBookId = allVerseNumberScopeKeysByBookId;
var defaultWordDividerUnicodeRanges = [// Control (https://unicodeplus.com/category/Cc)
[0x0000, 0x001F], [0x007F, 0x009F], // Format (https://unicodeplus.com/category/Cf)
[0x200B, 0x200C], [0x200E, 0x200F], [0x202A, 0x202E], 0x2061, [0x2066, 0x206F], [0xFFF9, 0xFFFB], [0x13432, 0x13438], 0xE0001, [0xE0020, 0xE002F], [0xE003A, 0xE0040], [0xE005B, 0xE005D], [0xE007B, 0xE007F], // Dash Punctuation (https://unicodeplus.com/category/Pd)
0x002D, 0x058A, 0x05BE, 0x1400, 0x1806, 0x2010, [0x2012, 0x2015], 0x2E17, 0x2E1A, [0x2E3A, 0x2E3B], 0x2E40, 0x2E5D, 0x301C, 0x3030, 0x30A0, [0xFE31, 0xFE32], 0xFE58, 0xFE63, 0xFF0D, 0x10EAD, // Close Punctuation (https://unicodeplus.com/category/Pe)
0x0029, 0x005D, 0x007D, 0x0F3B, 0x0F3D, 0x169C, 0x2046, 0x207E, 0x208E, 0x2309, 0x230B, 0x232A, 0x2769, 0x276B, 0x276D, 0x276F, 0x2771, 0x2773, 0x2775, 0x27C6, 0x27E7, 0x27E9, 0x27EB, 0x27ED, 0x27EF, 0x2984, 0x2986, 0x2988, 0x298A, 0x298C, 0x298E, 0x2990, 0x2992, 0x2994, 0x2996, 0x2998, 0x29D9, 0x29DB, 0x29FD, 0x2E23, 0x2E25, 0x2E27, 0x2E29, 0x2E56, 0x2E58, 0x2E5A, 0x2E5C, 0x3009, 0x300B, 0x300D, 0x300F, 0x3011, 0x3015, 0x3017, 0x3019, 0x301B, 0x301E, 0x301F, 0xFD3E, 0xFE18, 0xFE36, 0xFE38, 0xFE3A, 0xFE3C, 0xFE3E, 0xFE40, 0xFE42, 0xFE44, 0xFE48, 0xFE5A, 0xFE5C, 0xFE5E, 0xFF09, 0xFF3D, 0xFF5D, 0xFF60, 0xFF63, // Open Punctuation (https://unicodeplus.com/category/Ps)
0x0028, 0x005B, 0x007B, 0x0F3A, 0x0F3C, 0x169B, 0x201A, 0x201E, 0x2045, 0x207D, 0x208D, 0x2308, 0x230A, 0x2329, 0x2768, 0x276A, 0x276C, 0x276E, 0x2770, 0x2772, 0x2774, 0x27C5, 0x27E6, 0x27E8, 0x27EA, 0x27EC, 0x27EE, 0x2983, 0x2985, 0x2987, 0x2989, 0x298B, 0x298D, 0x298F, 0x2991, 0x2993, 0x2995, 0x2997, 0x29D8, 0x29DA, 0x29FC, 0x2E22, 0x2E24, 0x2E26, 0x2E28, 0x2E42, 0x2E55, 0x2E57, 0x2E59, 0x2E5B, 0x3008, 0x300A, 0x300C, 0x300E, 0x3010, 0x3014, 0x3016, 0x3018, 0x301A, 0x301D, 0xFD3F, 0xFE17, 0xFE35, 0xFE37, 0xFE39, 0xFE3B, 0xFE3D, 0xFE3F, 0xFE41, 0xFE43, 0xFE47, 0xFE59, 0xFE5B, 0xFE5D, 0xFF08, 0xFF3B, 0xFF5B, 0xFF5F, 0xFF62, // Final Punctuation (https://unicodeplus.com/category/Pf)
0x00BB, 0x2019, 0x201D, 0x203A, 0x2E03, 0x2E05, 0x2E0A, 0x2E0D, 0x2E1D, 0x2E21, // Initial Punctuation (https://unicodeplus.com/category/Pi)
0x00AB, 0x2018, 0x201B, 0x201C, 0x201F, 0x2039, 0x2E02, 0x2E04, 0x2E09, 0x2E0C, 0x2E1C, 0x2E20, // Other Punctuation (https://unicodeplus.com/category/Po)
[0x0021, 0x0023], [0x0025, 0x0027], 0x002A, 0x002C, 0x002E, 0x002F, 0x003A, 0x003B, 0x003F, 0x0040, 0x005C, 0x00A1, 0x00A7, 0x00B6, 0x00B7, 0x00BF, 0x037E, 0x0387, [0x055A, 0x055F], 0x0589, 0x05C0, 0x05C3, 0x05C6, 0x05F3, 0x05F4, 0x0609, 0x060A, 0x060C, 0x060D, 0x061B, [0x061D, 0x061F], [0x066A, 0x066D], 0x06D4, [0x0700, 0x070D], [0x07F7, 0x07F9], [0x0830, 0x083E], 0x085E, 0x0964, 0x0965, 0x0970, 0x09FD, 0x0A76, 0x0AF0, 0x0C77, 0x0C84, 0x0DF4, 0x0E4F, 0x0E5A, 0x0E5B, [0x0F04, 0x0F12], 0x0F14, 0x0F85, [0x0FD0, 0x0FD4], 0x0FD9, 0x0FDA, [0x104A, 0x104F], 0x10FB, [0x1360, 0x1368], 0x166E, 0x16EB, 0x16EC, 0x16ED, 0x1735, 0x1736, [0x17D4, 0x17D6], [0x17D8, 0x17DA], [0x1800, 0x1805], [0x1807, 0x180A], 0x1944, 0x1945, 0x1A1E, 0x1A1F, [0x1AA0, 0x1AA6], [0x1AA8, 0x1AAD], [0x1B5A, 0x1B60], 0x1B7D, 0x1B7E, [0x1BFC, 0x1BFF], [0x1C3B, 0x1C3F], 0x1C7E, 0x1C7F, [0x1CC0, 0x1CC7], 0x1CD3, 0x2016, 0x2017, [0x2020, 0x2027], [0x2030, 0x2038], [0x203B, 0x203E], [0x2041, 0x2043], [0x2047, 0x2051], 0x2053, [0x2055, 0x205E], [0x2CF9, 0x2CFC], 0x2CFE, 0x2CFF, 0x2D70, 0x2E00, 0x2E01, [0x2E06, 0x2E08], 0x2E0B, 0x2E0E, 0x2E0F, [0x2E10, 0x2E16], 0x2E18, 0x2E19, 0x2E1B, 0x2E1E, 0x2E1F, [0x2E2A, 0x2E2E], [0x2E30, 0x2E39], [0x2E3C, 0x2E3F], 0x2E41, [0x2E43, 0x2E4F], [0x2E52, 0x2E54], [0x3001, 0x3003], 0x303D, 0x30FB, 0xA4FE, 0xA4FF, [0xA60D, 0xA60F], 0xA673, 0xA67E, [0xA6F2, 0xA6F7], [0xA874, 0xA877], 0xA8CE, 0xA8CF, [0xA8F8, 0xA8FA], 0xA8FC, 0xA92E, 0xA92F, 0xA95F, [0xA9C1, 0xA9CD], 0xA9DE, 0xA9DF, [0xAA5C, 0xAA5F], 0xAADE, 0xAADF, 0xAAF0, 0xAAF1, 0xABEB, [0xFE10, 0xFE16], 0xFE19, 0xFE30, 0xFE45, 0xFE46, 0xFE49, [0xFE4A, 0xFE4C], [0xFE50, 0xFE52], [0xFE54, 0xFE57], [0xFE5F, 0xFE61], 0xFE68, 0xFE6A, 0xFE6B, [0xFF01, 0xFF03], [0xFF05, 0xFF07], 0xFF0A, 0xFF0C, 0xFF0E, 0xFF0F, 0xFF1A, 0xFF1B, 0xFF1F, 0xFF20, 0xFF3C, 0xFF61, 0xFF64, 0xFF65, [0x10100, 0x10102], 0x1039F, 0x103D0, 0x1056F, 0x10857, 0x1091F, 0x1093F, 0x10A50, [0x10A51, 0x10A58], 0x10A7F, 0x10AF0, [0x10AF1, 0x10AF6], 0x10B39, [0x10B3A, 0x10B3F], 0x10B99, [0x10B9A, 0x10B9C], [0x10F55, 0x10F59], [0x10F86, 0x10F89], [0x11047, 0x1104D], 0x110BB, 0x110BC, 0x110BE, 0x110BF, 0x110C0, 0x110C1, [0x11140, 0x11143], 0x11174, 0x11175, [0x111C5, 0x111C8], 0x111CD, 0x111DB, [0x111DD, 0x111DF], [0x11238, 0x1123D], 0x112A9, [0x1144B, 0x1144F], 0x1145A, 0x1145B, 0x1145D, 0x114C6, [0x115C1, 0x115D7], [0x11641, 0x11643], [0x11660, 0x1166C], 0x116B9, [0x1173C, 0x1173E], 0x1183B, [0x11944, 0x11946], 0x119E2, 0x11A3F, [0x11A40, 0x11A46], [0x11A9A, 0x11A9C], [0x11A9E, 0x11AA2], [0x11C41, 0x11C45], 0x11C70, 0x11C71, 0x11EF7, 0x11EF8, 0x11FFF, [0x12470, 0x12474], 0x12FF1, 0x12FF2, 0x16A6E, 0x16A6F, 0x16AF5, [0x16B37, 0x16B3B], 0x16B44, [0x16E97, 0x16E9A], 0x16FE2, 0x1BC9F, [0x1DA87, 0x1DA8B], 0x1E95E, 0x1E95F, // Line Separator  (https://unicodeplus.com/category/Zl)
0x2028, // Paragraph Separator  (https://unicodeplus.com/category/Zp)
0x2029, // Space Separator  (https://unicodeplus.com/category/Zs)
0x0020, 0x1680, 0x2000, [0x2001, 0x200A], 0x202F, 0x205F, 0x3000, // Math Symbol  (https://unicodeplus.com/category/Sm)
0x002B, [0x003C, 0x003E], 0x007C, 0x007E, 0x2044, 0x2212, [0x2215, 0x2219], 0x2223, 0x22C5, 0x29F5, 0x29F8, 0x29F9, 0xFE62, [0xFE64, 0xFE66], 0xFF0B, [0xFF1C, 0xFF1E], 0xFF5C, 0xFF5E];

var getUnicodeCharacters = function getUnicodeCharacters(hex) {
  var format = function format(_char) {
    return "\\u".concat("0000".concat(_char.toString(16).toUpperCase()).slice(-4));
  };

  if (hex >= 0 && hex <= 0xD7FF || hex >= 0xE000 && hex <= 0xFFFF) {
    return ["", format(hex)];
  } else if (hex >= 0x10000 && hex <= 0x10FFFF) {
    // we substract 0x10000 from hex to get a 20-bits number in the range 0..0xFFFF
    hex -= 0x10000; // we add 0xD800 to the number formed by the first 10 bits to give the first byte

    var first = ((0xffc00 & hex) >> 10) + 0xD800; // we add 0xDC00 to the number formed by the low 10 bits to give the second byte

    var second = (0x3ff & hex) + 0xDC00;
    return [format(first), format(second)];
  } else {
    throw new Error("Unexpected hex number: ".concat(hex));
  }
};

var unicodeSecondCharsByFirstChar = {};
defaultWordDividerUnicodeRanges.forEach(function (unicodeHexOrRange) {
  if (unicodeHexOrRange instanceof Array) {
    var _getUnicodeCharacters = getUnicodeCharacters(unicodeHexOrRange[0]),
        _getUnicodeCharacters2 = _slicedToArray(_getUnicodeCharacters, 2),
        firstCharOfStart = _getUnicodeCharacters2[0],
        secondCharOfStart = _getUnicodeCharacters2[1];

    var _getUnicodeCharacters3 = getUnicodeCharacters(unicodeHexOrRange[1]),
        _getUnicodeCharacters4 = _slicedToArray(_getUnicodeCharacters3, 2),
        firstCharOfEnd = _getUnicodeCharacters4[0],
        secondCharOfEnd = _getUnicodeCharacters4[1];

    if (firstCharOfStart === firstCharOfEnd) {
      unicodeSecondCharsByFirstChar[firstCharOfStart] = unicodeSecondCharsByFirstChar[firstCharOfStart] || [];
      unicodeSecondCharsByFirstChar[firstCharOfStart].push("".concat(secondCharOfStart, "-").concat(secondCharOfEnd));
    } else {
      throw new Error("Unexpected unicode range: [".concat(unicodeHexOrRange.map(function (hex) {
        return "0x".concat(hex.toString(16));
      }).join(','), "]"));
    }
  } else {
    var _getUnicodeCharacters5 = getUnicodeCharacters(unicodeHexOrRange),
        _getUnicodeCharacters6 = _slicedToArray(_getUnicodeCharacters5, 2),
        firstChar = _getUnicodeCharacters6[0],
        secondChar = _getUnicodeCharacters6[1];

    unicodeSecondCharsByFirstChar[firstChar] = unicodeSecondCharsByFirstChar[firstChar] || [];
    unicodeSecondCharsByFirstChar[firstChar].push(secondChar);
  }
});
var defaultWordDividerRegex = "(?:".concat(Object.keys(unicodeSecondCharsByFirstChar).map(function (firstChar) {
  return "".concat(firstChar, "[").concat(unicodeSecondCharsByFirstChar[firstChar].join(''), "]");
}).join('|'), ")");
exports.defaultWordDividerRegex = defaultWordDividerRegex;