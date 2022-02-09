"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hebrewPrefixSuffixMap = exports.grammaticalDetailMap = exports.defaultWordDividerRegex = exports.bibleSearchScopes = exports.bibleSearchFlagMap = void 0;
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

var getHebrewPrefixSuffixMapValue = function getHebrewPrefixSuffixMapValue(dataTerm, avgRowSizeInKB) {
  var wordInfoChar = dataTerm.slice(-1);
  return {
    detail: "".concat(dataTerm, ":1"),
    matches: function matches(wordInfo) {
      return wordInfo[5] && wordInfo[5].includes(wordInfoChar);
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
      return wordInfo[5] && /[12]/.test(wordInfo[5]);
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

var getGrammaticalDetailMapValue = function getGrammaticalDetailMapValue(type, typeIndex, requiredLanguageChar, value, avgRowSizeInKB) {
  var values = value instanceof Array ? value : [value];
  var valueLength = values[0].length;
  var hasVaryingValueLengths = values.some(function (val) {
    return val.length !== valueLength;
  });
  return {
    detail: values.map(function (val) {
      return "".concat(type[val] || type, ":").concat(val);
    }),
    avgRowSizeInKB: avgRowSizeInKB,
    matches: function matches(wordInfo) {
      var typeIdx = typeIndex[wordInfo[4][0]] || typeIndex;

      var languageMatches = function languageMatches(detailVal) {
        return requiredLanguageChar === '' || wordInfo[4][0] == (requiredLanguageChar[detailVal] || requiredLanguageChar);
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
  // pos - greek
  "determiner": getPosMapValue('E', 0),
  "foreign": getPosMapValue('F', 0),
  // pos - both
  "adjective": getPosMapValue('A', 0),
  "noun": getPosMapValue('N', 0),
  "conjunction": getPosMapValue('C', 0),
  "adverb": getPosMapValue('D', 0),
  "preposition": getPosMapValue('R', 0),
  "pronoun": getPosMapValue('P', 0),
  "particle": getPosMapValue('T', 0),
  "verb": getPosMapValue('V', 0),
  // stem - hebrew
  "qal": getHebrewStemMapValue('Hq', 0),
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
  // aspect - hebrew
  "sequential-perfect": getAspectMapValue('q', 0),
  "sequential-imperfect": getAspectMapValue('w', 0),
  "cohortative": getAspectMapValue('h', 0),
  "jussive": getAspectMapValue('j', 0),
  "passive-participle": getAspectMapValue('s', 0),
  "infinitive-absolute": getAspectMapValue('a', 0),
  "infinitive-construct": getAspectMapValue('c', 0),
  // aspect - greek
  "present": getAspectMapValue('P', 0),
  "future": getAspectMapValue('F', 0),
  "aorist": getAspectMapValue('A', 0),
  "pluperfect": getAspectMapValue('L', 0),
  // aspect - both
  "perfect": getAspectMapValue(['p', 'E'], 0),
  "imperfect": getAspectMapValue(['I', 'i'], 0),
  // mood - greek
  "indicative": getGreekMoodMapValue('I', 0),
  "subjunctive": getGreekMoodMapValue('S', 0),
  "optative": getGreekMoodMapValue('O', 0),
  "infinitive": getGreekMoodMapValue('N', 0),
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
  }, ['v', 'M'], 0),
  "participle": getGrammaticalDetailMapValue({
    r: 'aspect',
    P: 'mood'
  }, {
    H: 5,
    G: 3
  }, {
    r: 'H',
    P: 'G'
  }, ['r', 'P'], 0),
  // type - hebrew
  "cardinal-number": getTypeMapValue('Ac', 0),
  "ordinal-number": getTypeMapValue('Ao', 0),
  "gentilic": getTypeMapValue('Ng', 0),
  "proper-name": getTypeMapValue('Np', 0),
  "affirmation": getTypeMapValue('Ta', 0),
  "exhortation": getTypeMapValue('Te', 0),
  "negative": getTypeMapValue('Tn', 0),
  "direct-object-marker": getTypeMapValue('To', 0),
  // type - hebrew / pos - greek
  "interjection": getGrammaticalDetailMapValue({
    Tj: 'type',
    I: 'pos'
  }, 1, {
    Tj: 'H',
    I: 'G'
  }, ['Tj', 'I'], 0),
  // type - greek
  "substantive": getTypeMapValue('AS', 0),
  "predicate": getTypeMapValue('AP', 0),
  "ascriptive": getTypeMapValue('AA', 0),
  "restrictive": getTypeMapValue('AR', 0),
  "article": getTypeMapValue('EA', 0),
  "differential": getTypeMapValue('EF', 0),
  "possessive": getTypeMapValue('EP', 0),
  "quantifier": getTypeMapValue('EQ', 0),
  "ordinal": getTypeMapValue('EO', 0),
  "reflexive": getTypeMapValue('PE', 0),
  "reciprocal": getTypeMapValue('PC', 0),
  "transitive": getTypeMapValue('VT', 0),
  "intransitive": getTypeMapValue('VI', 0),
  "linking": getTypeMapValue('VL', 0),
  "modal": getTypeMapValue('VM', 0),
  "periphrastic": getTypeMapValue('VP', 0),
  "exclamation": getTypeMapValue('IE', 0),
  "directive": getTypeMapValue('ID', 0),
  "response": getTypeMapValue('IR', 0),
  "improper-preposition": getTypeMapValue('DI', 0),
  "correlative": getTypeMapValue(['DO', 'CO'], 0),
  "coordinating": getTypeMapValue('CC', 0),
  "subordinating": getTypeMapValue('CS', 0),
  // type - both
  "demonstrative": getTypeMapValue(['Pd', 'Tm', 'ED', 'PD'], 0),
  "indefinite": getTypeMapValue(['Pf', 'PI'], 0),
  "personal": getTypeMapValue(['Pp', 'PP'], 0),
  "interrogative": getTypeMapValue(['Pi', 'Ti', 'ET', 'PT'], 0),
  "relative": getTypeMapValue(['Pr', 'Tr', 'ER', 'PR'], 0),
  "number": getTypeMapValue(['Ac', 'Ao', 'EN'], 0),
  // voice - greek
  "active": getGreekVoiceMapValue('A', 0),
  "middle": getGreekVoiceMapValue('M', 0),
  "passive": getGreekVoiceMapValue('P', 0),
  // person - both
  "1st": getPersonMapValue('1', 0),
  "2nd": getPersonMapValue('2', 0),
  "3rd": getPersonMapValue('3', 0),
  // gender - hebrew
  "gender-both": getGenderMapValue('b', 0),
  "common": getGenderMapValue('c', 0),
  // gender - greek
  "neuter": getGenderMapValue('N', 0),
  // gender - both
  "masculine": getGenderMapValue(['m', 'M'], 0),
  "feminine": getGenderMapValue(['f', 'F'], 0),
  // number - hebrew
  "dual": getNumberMapValue('d', 0),
  // number - both
  "singular": getNumberMapValue(['s', 'S'], 0),
  "plural": getNumberMapValue(['p', 'P'], 0),
  // state - hebrew
  "absolute": getHebrewStateMapValue('a', 0),
  "construct": getHebrewStateMapValue('c', 0),
  "determined": getHebrewStateMapValue('d', 0),
  // case - greek
  "nominative": getGreekCaseMapValue('N', 0),
  "genitive": getGreekCaseMapValue('G', 0),
  "dative": getGreekCaseMapValue('D', 0),
  "accusative": getGreekCaseMapValue('A', 0),
  "vocative": getGreekCaseMapValue('V', 0),
  // attribute - greek
  "comparative": getGreekAttributeMapValue('C', 0),
  "superlatives": getGreekAttributeMapValue('S', 0),
  "diminutive": getGreekAttributeMapValue('D', 0),
  "indeclinable": getGreekAttributeMapValue('I', 0)
}; // based off of [\P{Letter}] encoded here: https://mothereff.in/regexpu

exports.grammaticalDetailMap = grammaticalDetailMap;
var defaultWordDividerRegex = "(?:[\\0-@\\[-`\\{-\\xA9\\xAB-\\xB4\\xB6-\\xB9\\xBB-\\xBF\\xD7\\xF7\\u02C2-\\u02C5\\u02D2-\\u02DF\\u02E5-\\u02EB\\u02ED\\u02EF-\\u036F\\u0375\\u0378\\u0379\\u037E\\u0380-\\u0385\\u0387\\u038B\\u038D\\u03A2\\u03F6\\u0482-\\u0489\\u0530\\u0557\\u0558\\u055A-\\u055F\\u0589-\\u0590\\u05BE\\u05C3\\u05C6\\u05C8-\\u05CF\\u05EB-\\u05EE\\u05F3-\\u061F\\u064B-\\u066D\\u0670\\u06D4\\u06D6-\\u06E4\\u06E7-\\u06ED\\u06F0-\\u06F9\\u06FD\\u06FE\\u0700-\\u070F\\u0711\\u0730-\\u074C\\u07A6-\\u07B0\\u07B2-\\u07C9\\u07EB-\\u07F3\\u07F6-\\u07F9\\u07FB-\\u07FF\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u083F\\u0859-\\u085F\\u086B-\\u089F\\u08B5\\u08BE-\\u0903\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962-\\u0970\\u0981-\\u0984\\u098D\\u098E\\u0991\\u0992\\u09A9\\u09B1\\u09B3-\\u09B5\\u09BA-\\u09BC\\u09BE-\\u09CD\\u09CF-\\u09DB\\u09DE\\u09E2-\\u09EF\\u09F2-\\u09FB\\u09FD-\\u0A04\\u0A0B-\\u0A0E\\u0A11\\u0A12\\u0A29\\u0A31\\u0A34-\\u0A37\\u0A3A-\\u0A58\\u0A5D\\u0A5F-\\u0A71\\u0A75-\\u0A84\\u0A8E\\u0A92\\u0AA9\\u0AB1\\u0AB4\\u0ABA-\\u0ABC\\u0ABE-\\u0ACF\\u0AD1-\\u0ADF\\u0AE2-\\u0AF8\\u0AFA-\\u0B04\\u0B0D\\u0B0E\\u0B11\\u0B12\\u0B29\\u0B31\\u0B34\\u0B3A-\\u0B3C\\u0B3E-\\u0B5B\\u0B5E\\u0B62-\\u0B70\\u0B72-\\u0B82\\u0B84\\u0B8B-\\u0B8D\\u0B91\\u0B96-\\u0B98\\u0B9B\\u0B9D\\u0BA0-\\u0BA2\\u0BA5-\\u0BA7\\u0BAB-\\u0BAD\\u0BBA-\\u0BCF\\u0BD1-\\u0C04\\u0C0D\\u0C11\\u0C29\\u0C3A-\\u0C3C\\u0C3E-\\u0C57\\u0C5B-\\u0C5F\\u0C62-\\u0C7F\\u0C81-\\u0C84\\u0C8D\\u0C91\\u0CA9\\u0CB4\\u0CBA-\\u0CBC\\u0CBE-\\u0CDD\\u0CDF\\u0CE2-\\u0CF0\\u0CF3-\\u0D04\\u0D0D\\u0D11\\u0D3B\\u0D3C\\u0D3E-\\u0D4D\\u0D4F-\\u0D53\\u0D57-\\u0D5E\\u0D62-\\u0D79\\u0D80-\\u0D84\\u0D97-\\u0D99\\u0DB2\\u0DBC\\u0DBE\\u0DBF\\u0DC7-\\u0E00\\u0E31-\\u0E3F\\u0E47-\\u0E80\\u0E83\\u0E85\\u0E8B\\u0EA4\\u0EA6\\u0EB1\\u0EB4-\\u0EBC\\u0EBE\\u0EBF\\u0EC5\\u0EC7-\\u0EDB\\u0EE0-\\u0EFF\\u0F01-\\u0F3F\\u0F48\\u0F6D-\\u0F87\\u0F8D-\\u0FFF\\u102B-\\u103E\\u1040-\\u104F\\u1056-\\u1059\\u105E-\\u1060\\u1062-\\u1064\\u1067-\\u106D\\u1071-\\u1074\\u1082-\\u108D\\u108F-\\u109F\\u10C6\\u10C8-\\u10CC\\u10CE\\u10CF\\u10FB\\u1249\\u124E\\u124F\\u1257\\u1259\\u125E\\u125F\\u1289\\u128E\\u128F\\u12B1\\u12B6\\u12B7\\u12BF\\u12C1\\u12C6\\u12C7\\u12D7\\u1311\\u1316\\u1317\\u135B-\\u137F\\u1390-\\u139F\\u13F6\\u13F7\\u13FE-\\u1400\\u166D\\u166E\\u1680\\u169B-\\u169F\\u16EB-\\u16F0\\u16F9-\\u16FF\\u170D\\u1712-\\u171F\\u1732-\\u173F\\u1752-\\u175F\\u176D\\u1771-\\u177F\\u17B4-\\u17D6\\u17D8-\\u17DB\\u17DD-\\u181F\\u1879-\\u187F\\u1885-\\u18A9\\u18AB-\\u18AF\\u18F6-\\u18FF\\u191F-\\u194F\\u196E\\u196F\\u1975-\\u197F\\u19AC-\\u19AF\\u19CA-\\u19FF\\u1A17-\\u1A1F\\u1A55-\\u1AA6\\u1AA8-\\u1B04\\u1B34-\\u1B44\\u1B4C-\\u1B82\\u1BA1-\\u1BAD\\u1BB0-\\u1BB9\\u1BE6-\\u1BFF\\u1C24-\\u1C4C\\u1C50-\\u1C59\\u1C7E\\u1C7F\\u1C89-\\u1C8F\\u1CBB\\u1CBC\\u1CC0-\\u1CE8\\u1CED\\u1CF4\\u1CF7-\\u1CF9\\u1CFB-\\u1CFF\\u1DC0-\\u1DFF\\u1F16\\u1F17\\u1F1E\\u1F1F\\u1F46\\u1F47\\u1F4E\\u1F4F\\u1F58\\u1F5A\\u1F5C\\u1F5E\\u1F7E\\u1F7F\\u1FB5\\u1FBD\\u1FBF-\\u1FC1\\u1FC5\\u1FCD-\\u1FCF\\u1FD4\\u1FD5\\u1FDC-\\u1FDF\\u1FED-\\u1FF1\\u1FF5\\u1FFD-\\u2059\\u2061-\\u2070\\u2072-\\u207E\\u2080-\\u208F\\u209D-\\u2101\\u2103-\\u2106\\u2108\\u2109\\u2114\\u2116-\\u2118\\u211E-\\u2123\\u2125\\u2127\\u2129\\u212E\\u213A\\u213B\\u2140-\\u2144\\u214A-\\u214D\\u214F-\\u2182\\u2185-\\u2BFF\\u2C2F\\u2C5F\\u2CE5-\\u2CEA\\u2CEF-\\u2CFF\\u2D26\\u2D28-\\u2D2C\\u2D2E\\u2D2F\\u2D68-\\u2D6E\\u2D70-\\u2D7F\\u2D97-\\u2D9F\\u2DA7\\u2DAF\\u2DB7\\u2DBF\\u2DC7\\u2DCF\\u2DD7\\u2DDF-\\u2E2E\\u2E30-\\u3004\\u3007-\\u3030\\u3036-\\u303A\\u303D-\\u3040\\u3097-\\u309C\\u30A0\\u30FB\\u3100-\\u3104\\u3130\\u318F-\\u319F\\u31BB-\\u31EF\\u3200-\\u33FF\\u4DB6-\\u4DFF\\u9FF0-\\u9FFF\\uA48D-\\uA4CF\\uA4FE\\uA4FF\\uA60D-\\uA60F\\uA620-\\uA629\\uA62C-\\uA63F\\uA66F-\\uA67E\\uA69E\\uA69F\\uA6E6-\\uA716\\uA720\\uA721\\uA789\\uA78A\\uA7C0\\uA7C1\\uA7C7-\\uA7F6\\uA802\\uA806\\uA80B\\uA823-\\uA83F\\uA874-\\uA881\\uA8B4-\\uA8F1\\uA8F8-\\uA8FA\\uA8FC\\uA8FF-\\uA909\\uA926-\\uA92F\\uA947-\\uA95F\\uA97D-\\uA983\\uA9B3-\\uA9CE\\uA9D0-\\uA9DF\\uA9E5\\uA9F0-\\uA9FF\\uAA29-\\uAA3F\\uAA43\\uAA4C-\\uAA5F\\uAA77-\\uAA79\\uAA7B-\\uAA7D\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAC3-\\uAADA\\uAADE\\uAADF\\uAAEB-\\uAAF1\\uAAF5-\\uAB00\\uAB07\\uAB08\\uAB0F\\uAB10\\uAB17-\\uAB1F\\uAB27\\uAB2F\\uAB5B\\uAB68-\\uAB6F\\uABE3-\\uABFF\\uD7A4-\\uD7AF\\uD7C7-\\uD7CA\\uD7FC-\\uD7FF\\uE000-\\uF8FF\\uFA6E\\uFA6F\\uFADA-\\uFAFF\\uFB07-\\uFB12\\uFB18-\\uFB1C\\uFB1E\\uFB29\\uFB37\\uFB3D\\uFB3F\\uFB42\\uFB45\\uFBB2-\\uFBD2\\uFD3E-\\uFD4F\\uFD90\\uFD91\\uFDC8-\\uFDEF\\uFDFC-\\uFE6F\\uFE75\\uFEFD-\\uFF20\\uFF3B-\\uFF40\\uFF5B-\\uFF65\\uFFBF-\\uFFC1\\uFFC8\\uFFC9\\uFFD0\\uFFD1\\uFFD8\\uFFD9\\uFFDD-\\uFFFF]|\\uD800[\\uDC0C\\uDC27\\uDC3B\\uDC3E\\uDC4E\\uDC4F\\uDC5E-\\uDE7F\\uDE9D-\\uDE9F\\uDED1-\\uDEFF\\uDF20-\\uDF2C\\uDF41\\uDF4A-\\uDF4F\\uDF76-\\uDF7F\\uDF9E\\uDF9F\\uDFC4-\\uDFC7\\uDFD0-\\uDFFF]|\\uD801[\\uDC9E-\\uDCAF\\uDCD4-\\uDCD7\\uDCFC-\\uDCFF\\uDD28-\\uDD2F\\uDD64-\\uDDFF\\uDF37-\\uDF3F\\uDF56-\\uDF5F\\uDF68-\\uDFFF]|\\uD802[\\uDC06\\uDC07\\uDC09\\uDC36\\uDC39-\\uDC3B\\uDC3D\\uDC3E\\uDC56-\\uDC5F\\uDC77-\\uDC7F\\uDC9F-\\uDCDF\\uDCF3\\uDCF6-\\uDCFF\\uDD16-\\uDD1F\\uDD3A-\\uDD7F\\uDDB8-\\uDDBD\\uDDC0-\\uDDFF\\uDE01-\\uDE0F\\uDE14\\uDE18\\uDE36-\\uDE5F\\uDE7D-\\uDE7F\\uDE9D-\\uDEBF\\uDEC8\\uDEE5-\\uDEFF\\uDF36-\\uDF3F\\uDF56-\\uDF5F\\uDF73-\\uDF7F\\uDF92-\\uDFFF]|\\uD803[\\uDC49-\\uDC7F\\uDCB3-\\uDCBF\\uDCF3-\\uDCFF\\uDD24-\\uDEFF\\uDF1D-\\uDF26\\uDF28-\\uDF2F\\uDF46-\\uDFDF\\uDFF7-\\uDFFF]|\\uD804[\\uDC00-\\uDC02\\uDC38-\\uDC82\\uDCB0-\\uDCCF\\uDCE9-\\uDD43\\uDD45-\\uDD4F\\uDD73-\\uDD75\\uDD77-\\uDD82\\uDDB3-\\uDDC0\\uDDC5-\\uDDD9\\uDDDB\\uDDDD-\\uDDFF\\uDE12\\uDE2C-\\uDE7F\\uDE87\\uDE89\\uDE8E\\uDE9E\\uDEA9-\\uDEAF\\uDEDF-\\uDF04\\uDF0D\\uDF0E\\uDF11\\uDF12\\uDF29\\uDF31\\uDF34\\uDF3A-\\uDF3C\\uDF3E-\\uDF4F\\uDF51-\\uDF5C\\uDF62-\\uDFFF]|\\uD805[\\uDC35-\\uDC46\\uDC4B-\\uDC5E\\uDC60-\\uDC7F\\uDCB0-\\uDCC3\\uDCC6\\uDCC8-\\uDD7F\\uDDAF-\\uDDD7\\uDDDC-\\uDDFF\\uDE30-\\uDE43\\uDE45-\\uDE7F\\uDEAB-\\uDEB7\\uDEB9-\\uDEFF\\uDF1B-\\uDFFF]|\\uD806[\\uDC2C-\\uDC9F\\uDCE0-\\uDCFE\\uDD00-\\uDD9F\\uDDA8\\uDDA9\\uDDD1-\\uDDE0\\uDDE2\\uDDE4-\\uDDFF\\uDE01-\\uDE0A\\uDE33-\\uDE39\\uDE3B-\\uDE4F\\uDE51-\\uDE5B\\uDE8A-\\uDE9C\\uDE9E-\\uDEBF\\uDEF9-\\uDFFF]|\\uD807[\\uDC09\\uDC2F-\\uDC3F\\uDC41-\\uDC71\\uDC90-\\uDCFF\\uDD07\\uDD0A\\uDD31-\\uDD45\\uDD47-\\uDD5F\\uDD66\\uDD69\\uDD8A-\\uDD97\\uDD99-\\uDEDF\\uDEF3-\\uDFFF]|\\uD808[\\uDF9A-\\uDFFF]|\\uD809[\\uDC00-\\uDC7F\\uDD44-\\uDFFF]|[\\uD80A\\uD80B\\uD80E-\\uD810\\uD812-\\uD819\\uD823-\\uD82B\\uD82D\\uD82E\\uD830-\\uD834\\uD836\\uD837\\uD839\\uD83C-\\uD83F\\uD87B-\\uD87D\\uD87F-\\uDBFF][\\uDC00-\\uDFFF]|\\uD80D[\\uDC2F-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF]|\\uD81A[\\uDE39-\\uDE3F\\uDE5F-\\uDECF\\uDEEE-\\uDF3F\\uDF44-\\uDF62\\uDF78-\\uDF7C\\uDF90-\\uDFFF]|\\uD81B[\\uDC00-\\uDE3F\\uDE80-\\uDEFF\\uDF4B-\\uDF4F\\uDF51-\\uDF92\\uDFA0-\\uDFDF\\uDFE2\\uDFE4-\\uDFFF]|\\uD821[\\uDFF8-\\uDFFF]|\\uD822[\\uDEF3-\\uDFFF]|\\uD82C[\\uDD1F-\\uDD4F\\uDD53-\\uDD63\\uDD68-\\uDD6F\\uDEFC-\\uDFFF]|\\uD82F[\\uDC6B-\\uDC6F\\uDC7D-\\uDC7F\\uDC89-\\uDC8F\\uDC9A-\\uDFFF]|\\uD835[\\uDC55\\uDC9D\\uDCA0\\uDCA1\\uDCA3\\uDCA4\\uDCA7\\uDCA8\\uDCAD\\uDCBA\\uDCBC\\uDCC4\\uDD06\\uDD0B\\uDD0C\\uDD15\\uDD1D\\uDD3A\\uDD3F\\uDD45\\uDD47-\\uDD49\\uDD51\\uDEA6\\uDEA7\\uDEC1\\uDEDB\\uDEFB\\uDF15\\uDF35\\uDF4F\\uDF6F\\uDF89\\uDFA9\\uDFC3\\uDFCC-\\uDFFF]|\\uD838[\\uDC00-\\uDCFF\\uDD2D-\\uDD36\\uDD3E-\\uDD4D\\uDD4F-\\uDEBF\\uDEEC-\\uDFFF]|\\uD83A[\\uDCC5-\\uDCFF\\uDD44-\\uDD4A\\uDD4C-\\uDFFF]|\\uD83B[\\uDC00-\\uDDFF\\uDE04-\\uDE20\\uDE23\\uDE25\\uDE26\\uDE28\\uDE33\\uDE38\\uDE3A\\uDE3C-\\uDE41\\uDE43-\\uDE46\\uDE48\\uDE4A\\uDE4C\\uDE50\\uDE53\\uDE55\\uDE56\\uDE58\\uDE5A\\uDE5C\\uDE5E\\uDE60\\uDE63\\uDE65\\uDE66\\uDE6B\\uDE73\\uDE78\\uDE7D\\uDE7F\\uDE8A\\uDE9C-\\uDEA0\\uDEA4\\uDEAA\\uDEBC-\\uDFFF]|\\uD869[\\uDED7-\\uDEFF]|\\uD86D[\\uDF35-\\uDF3F]|\\uD86E[\\uDC1E\\uDC1F]|\\uD873[\\uDEA2-\\uDEAF]|\\uD87A[\\uDFE1-\\uDFFF]|\\uD87E[\\uDE1E-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])";
exports.defaultWordDividerRegex = defaultWordDividerRegex;