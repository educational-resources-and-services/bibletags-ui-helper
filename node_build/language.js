"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLanguageInfo = exports.findLanguage = void 0;

var _iso6393Info = _interopRequireDefault(require("./iso6393Info"));

var _bibleSearchUtils = require("./bibleSearchUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var findLanguage = function findLanguage(_ref) {
  var searchStr = _ref.searchStr,
      _ref$maxNumHits = _ref.maxNumHits,
      maxNumHits = _ref$maxNumHits === void 0 ? 10 : _ref$maxNumHits;
  var wordSplitRegex = / \(| |-/g;
  var normalizedSearchStrArray = (0, _bibleSearchUtils.normalizeSearchStr)({
    str: searchStr
  }).split(wordSplitRegex);
  var hits = [];

  for (var i = 0; i < _iso6393Info["default"].length;) {
    var foundIdx = _iso6393Info["default"].slice(i).findIndex(function (info) {
      var nameWords = [].concat(_toConsumableArray(info[0].split(wordSplitRegex)), _toConsumableArray((info[5] || '').split(wordSplitRegex))).filter(Boolean);
      return normalizedSearchStrArray.every(function (searchWord) {
        return nameWords.some(function (nameWord) {
          return (0, _bibleSearchUtils.normalizeSearchStr)({
            str: nameWord
          }).indexOf(searchWord) === 0;
        });
      });
    });

    if (foundIdx === -1) break;
    var foundInfo = _iso6393Info["default"][i + foundIdx];
    hits.push({
      englishName: foundInfo[0],
      iso6393: foundInfo[1],
      nativeName: foundInfo[5] || foundInfo[0]
    });
    if (hits.length >= maxNumHits) break;
    i += foundIdx + 1;
  }

  return hits;
};

exports.findLanguage = findLanguage;

var getLanguageInfo = function getLanguageInfo(iso6393) {
  var _ref2 = _iso6393Info["default"].find(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        englishName = _ref5[0],
        i3 = _ref5[1];

    return i3 === iso6393;
  }) || [],
      _ref3 = _slicedToArray(_ref2, 10),
      englishName = _ref3[0],
      x = _ref3[1],
      iso6392b = _ref3[2],
      iso6392t = _ref3[3],
      iso6391 = _ref3[4],
      nativeName = _ref3[5],
      _ref3$ = _ref3[6],
      definitionPreferencesForVerbs = _ref3$ === void 0 ? ["#infinitive-construct", "#infinitive", "#participle#1st#singular", "#present#1st#singular"] : _ref3$,
      _ref3$2 = _ref3[7],
      standardWordDivider = _ref3$2 === void 0 ? ' ' : _ref3$2,
      _ref3$3 = _ref3[8],
      phraseDividerRegex = _ref3$3 === void 0 ? "[\u2013,;\u2014:\\(\\)\\[\\]\\{\\}\\|\\\"\\'\u201C\u201D\u2018\u2019~\xAB\xBB]" : _ref3$3,
      _ref3$4 = _ref3[9],
      sentenceDividerRegex = _ref3$4 === void 0 ? "[\\.\\?\xBF!]" : _ref3$4;

  return {
    englishName: englishName,
    iso6393: iso6393,
    iso6392b: iso6392b,
    iso6392t: iso6392t,
    iso6391: iso6391,
    nativeName: nativeName || englishName,
    definitionPreferencesForVerbs: definitionPreferencesForVerbs,
    standardWordDivider: standardWordDivider,
    phraseDividerRegex: phraseDividerRegex,
    sentenceDividerRegex: sentenceDividerRegex
  };
};

exports.getLanguageInfo = getLanguageInfo;