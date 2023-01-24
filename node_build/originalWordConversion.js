"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWordInfoFromWordRow = exports.getWordInfoFromUsfmWord = exports.getUHBWordInfoFromWordRow = exports.getUGNTWordInfoFromWordRow = exports.getPartialWordRowFromUsfmWord = exports.getPartialUHBWordRowFromUsfmWord = exports.getPartialUGNTWordRowFromUsfmWord = void 0;

require("regenerator-runtime/runtime.js");

var _bibleSearchUtils = require("./bibleSearchUtils");

var _index = require("./index");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var posMapping = {
  N: "N",
  A: "A",
  NS: "A",
  // better categorized as an adjective
  NP: "A",
  // better categorized as an adjective
  E: "E",
  R: "P",
  // flipped to match UHB
  V: "V",
  I: "I",
  P: "R",
  // flipped to match UHB
  D: "D",
  PI: "D",
  // better categorized as an adverb
  C: "C",
  T: "T",
  TF: "F" // better in its own category

};

var getPartialUHBWordRowFromUsfmWord = function getPartialUHBWordRowFromUsfmWord(_ref) {
  var w = _ref.w,
      id = _ref.id,
      lemma = _ref.lemma,
      strong = _ref.strong,
      morph = _ref.morph;
  var definitionId = (strong.match(/H[0-9]{5}/) || [])[0];
  var prefixParts = (strong.match(/[^"H]*/) || [])[0].split(':').filter(Boolean);
  var form = (0, _bibleSearchUtils.normalizeSearchStr)({
    str: w
  });
  var isAramaic = /^Ar,/.test(morph) ? 1 : 0;

  if (!id || !morph || !form || !!definitionId !== !!lemma) {
    console.log('word with missing info', wordUsfm);
    return {};
  }

  var morphParts = morph.slice(3).split(':');
  var mainPartIdx = (0, _index.getMainWordPartIndex)(morphParts);
  var mainPartMorph = morphParts[mainPartIdx];
  var pos = mainPartMorph[0];

  var _ref2 = morph.match(/:Sp([^:]*)/g) || [],
      _ref3 = _slicedToArray(_ref2, 1),
      suffixMorph = _ref3[0];

  var wordRow = {
    id: id,
    form: form,
    lemma: lemma,
    fullParsing: morph,
    isAramaic: isAramaic,
    b: prefixParts.includes("b") ? 1 : 0,
    l: prefixParts.includes("l") ? 1 : 0,
    k: prefixParts.includes("k") ? 1 : 0,
    m: prefixParts.includes("m") ? 1 : 0,
    sh: prefixParts.includes("s") ? 1 : 0,
    v: prefixParts.includes("c") ? 1 : 0,
    h1: /^(?:He,|Ar,)(?:[^:]*:)*Td/.test(morph) ? 1 : 0,
    h2: /^(?:He,|Ar,)(?:[^:]*:)*Rd/.test(morph) ? 1 : 0,
    h3: prefixParts.includes("i") ? 1 : 0,
    pos: pos,
    h4: /^(?:He,|Ar,)(?:[^:]*:)*Sd/.test(morph) ? 1 : 0,
    h5: /^(?:He,|Ar,)(?:[^:]*:)*Sh/.test(morph) ? 1 : 0,
    n: /^(?:He,|Ar,)(?:[^:]*:)*Sn/.test(morph) ? 1 : 0
  };

  switch (pos) {
    case 'A':
    case 'N':
      if (mainPartMorph.length > 2) {
        if (mainPartMorph.slice(1, 4) !== 'xxx') {
          wordRow.gender = mainPartMorph[2];
          wordRow.number = mainPartMorph[3];
        }

        wordRow.state = mainPartMorph[4];
      }

    case 'R':
    case 'T':
      var type = pos + mainPartMorph[1];

      if (mainPartMorph[1] && mainPartMorph.slice(1, 4) !== 'xxx' && !['Aa', 'Nc'].includes(type)) {
        wordRow.type = type;
      }

      break;

    case 'P':
      wordRow.type = pos + mainPartMorph[1];

      if (mainPartMorph.length > 2) {
        var person = mainPartMorph[2];

        if (!['x'].includes(person)) {
          wordRow.person = person;
        }

        wordRow.gender = mainPartMorph[3];
        wordRow.number = mainPartMorph[4];
      }

      break;

    case 'V':
      wordRow.stem = (isAramaic ? 'A' : 'H') + mainPartMorph[1];
      wordRow.aspect = mainPartMorph[2];

      if (['r', 's'].includes(mainPartMorph[2])) {
        wordRow.gender = mainPartMorph[3];
        wordRow.number = mainPartMorph[4];
        wordRow.state = mainPartMorph[5];
      } else if (['a', 'c'].includes(mainPartMorph[2])) {// nothing more to do
      } else {
        wordRow.person = mainPartMorph[3];
        wordRow.gender = mainPartMorph[4];
        wordRow.number = mainPartMorph[5];
      }

      break;
  }

  if (wordRow.number === 'x') {
    wordRow.number = 's'; // see 1 Kings 12:12
  } // if(![ undefined, 'p', 'q', 'i', 'w', 'h', 'j', 'v', 'r', 's', 'a', 'c' ].includes(wordRow.aspect)) console.log('>>>', morph)
  // if(![ undefined, 's', 'p', 'd' ].includes(wordRow.number)) console.log('>>>', morph)
  // if(![ undefined, 'Ac', 'Ao', 'Ng', 'Np', 'Pd', 'Pf', 'Pi', 'Pp', 'Pr', 'Rd', 'Ta', 'Td', 'Te', 'Ti', 'Tj', 'Tm', 'Tn', 'To', 'Tr' ].includes(wordRow.type)) console.log('>>>', morph)


  if (suffixMorph) {
    wordRow.suffixPerson = suffixMorph.slice(3, 4);
    wordRow.suffixGender = suffixMorph.slice(4, 5);
    wordRow.suffixNumber = suffixMorph.slice(5, 6);
  }

  if (definitionId) {
    wordRow.definitionId = definitionId;
  }

  return wordRow;
};

exports.getPartialUHBWordRowFromUsfmWord = getPartialUHBWordRowFromUsfmWord;

var getPartialUGNTWordRowFromUsfmWord = function getPartialUGNTWordRowFromUsfmWord(_ref4) {
  var w = _ref4.w,
      id = _ref4.id,
      lemma = _ref4.lemma,
      strong = _ref4.strong,
      morph = _ref4.morph;
  var definitionId = (strong.match(/G[0-9]{5}/) || [])[0];
  var form = (0, _bibleSearchUtils.normalizeSearchStr)({
    str: w
  });

  if (!lemma || !definitionId || !morph || !form) {
    console.log('word with missing info', wordUsfm);
    return {};
  }

  var pos = posMapping[morph.slice(3, 5)] || posMapping[morph.slice(3, 4)];

  if (!pos) {
    console.log('invalid morph - pos not in mapping', wordUsfm);
    return {};
  }

  var wordRow = {
    id: id,
    form: form,
    lemma: lemma,
    fullParsing: morph,
    pos: pos,
    morphPos: morph.slice(3, 4),
    definitionId: definitionId
  };

  if (morph.slice(4, 5) !== ',') {
    wordRow.type = "".concat(pos).concat(morph.slice(4, 5));
  }

  ["mood", "aspect", "voice", "person", "case", "gender", "number", "attribute"].forEach(function (col, idx) {
    var morphDetail = morph.slice(idx + 5, idx + 6);

    if (morphDetail !== ',') {
      wordRow[col] = morphDetail;
    }
  });
  return wordRow;
};

exports.getPartialUGNTWordRowFromUsfmWord = getPartialUGNTWordRowFromUsfmWord;

var getPartialWordRowFromUsfmWord = function getPartialWordRowFromUsfmWord(usfmWord) {
  return usfmWord.id && parseInt(usfmWord.id.slice(0, 2), 10) <= 39 // no usfmWord.id means it is the LXX and so should be treated like the GNT
  ? getPartialUHBWordRowFromUsfmWord(usfmWord) : getPartialUGNTWordRowFromUsfmWord(usfmWord);
};

exports.getPartialWordRowFromUsfmWord = getPartialWordRowFromUsfmWord;

var getUHBWordInfoFromWordRow = function getUHBWordInfoFromWordRow(word) {
  var info = [word.wordNumber, word.form, word.definitionId ? parseInt(word.definitionId.slice(1), 10) : 0, word.lemma || 0, "H".concat(word.type || "".concat(word.pos, "_")).concat(word.stem || '__').concat(word.aspect || '_').concat(word.person || '_').concat(word.gender || '_').concat(word.number || '_').concat(word.state || '_')];
  var booleanColInfo = ['isAramaic', 'b', 'l', 'k', 'm', 'sh', 'v', 'h1', 'h2', 'h3', 'h4', 'h5', 'n'].map(function (col) {
    return word[col] ? col.slice(-1) : '';
  }).join('');
  var suffixInfo = word.suffixPerson ? "".concat(word.suffixPerson).concat(word.suffixGender).concat(word.suffixNumber) : '';

  if (booleanColInfo || suffixInfo) {
    info.push(booleanColInfo);

    if (suffixInfo) {
      info.push(suffixInfo);
    }
  }

  return info;
};

exports.getUHBWordInfoFromWordRow = getUHBWordInfoFromWordRow;

var getUGNTWordInfoFromWordRow = function getUGNTWordInfoFromWordRow(word) {
  var info = [word.wordNumber, // will be null if this function is not called on UHB/UGNT import (and that is okay)
  word.form, word.definitionId ? parseInt(word.definitionId.slice(1), 10) : 0, word.lemma, "G".concat(word.type || "".concat(word.pos, "_")).concat(word.mood || '_').concat(word.voice || '_').concat(word.aspect || '_').concat(word.person || '_').concat(word.gender || '_').concat(word.number || '_').concat(word["case"] || '_').concat(word.attribute || '_')];
  return info;
};

exports.getUGNTWordInfoFromWordRow = getUGNTWordInfoFromWordRow;

var getWordInfoFromWordRow = function getWordInfoFromWordRow(word) {
  return word.id && parseInt(word.id.slice(0, 2), 10) <= 39 // no word.id means it is the LXX and so should be treated like the GNT
  ? getUHBWordInfoFromWordRow(word) : getUGNTWordInfoFromWordRow(word);
};

exports.getWordInfoFromWordRow = getWordInfoFromWordRow;

var getWordInfoFromUsfmWord = function getWordInfoFromUsfmWord(usfmWord) {
  return getWordInfoFromWordRow(getPartialWordRowFromUsfmWord(usfmWord));
};

exports.getWordInfoFromUsfmWord = getWordInfoFromUsfmWord;