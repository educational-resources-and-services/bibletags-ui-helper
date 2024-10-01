"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getOrigLangVersionIdFromRef: true,
  getOrigLangAndLXXVersionInfo: true,
  getOrigLanguageText: true,
  getVersionStr: true,
  getRefsInfo: true,
  getPassageStr: true,
  getBookSuggestionOptions: true,
  getPassageInfoArrayFromText: true,
  getRefsFromPassageStr: true,
  getBibleBookNames: true,
  getBibleBookName: true,
  getUsfmBibleBookAbbr: true,
  getBookIdFromUsfmBibleBookAbbr: true,
  getRefsFromUsfmRefStr: true,
  getUsfmRefStrFromLoc: true,
  getBibleBookAbbreviatedNames: true,
  getBibleBookAbbreviatedName: true,
  getNormalizedPOSCode: true,
  getPOSTerm: true,
  getMorphPartDisplayInfo: true,
  getMainWordPartIndex: true,
  getStrongs: true,
  getIsEntirelyPrefixAndSuffix: true,
  toBase64: true,
  hash64: true,
  getWordsHash: true,
  getWordHashes: true,
  isValidEmail: true,
  isOriginalLanguageSearch: true,
  getTextLanguageId: true,
  isRTLStr: true,
  isRTLText: true,
  getCopyVerseText: true,
  getMorphInfo: true,
  getColorWithOpacity: true
};
exports.toBase64 = exports.isValidEmail = exports.isRTLText = exports.isRTLStr = exports.isOriginalLanguageSearch = exports.hash64 = exports.getWordsHash = exports.getWordHashes = exports.getVersionStr = exports.getUsfmRefStrFromLoc = exports.getUsfmBibleBookAbbr = exports.getTextLanguageId = exports.getStrongs = exports.getRefsInfo = exports.getRefsFromUsfmRefStr = exports.getRefsFromPassageStr = exports.getPassageStr = exports.getPassageInfoArrayFromText = exports.getPOSTerm = exports.getOrigLanguageText = exports.getOrigLangVersionIdFromRef = exports.getOrigLangAndLXXVersionInfo = exports.getNormalizedPOSCode = exports.getMorphPartDisplayInfo = exports.getMorphInfo = exports.getMainWordPartIndex = exports.getIsEntirelyPrefixAndSuffix = exports.getCopyVerseText = exports.getColorWithOpacity = exports.getBookSuggestionOptions = exports.getBookIdFromUsfmBibleBookAbbr = exports.getBibleBookNames = exports.getBibleBookName = exports.getBibleBookAbbreviatedNames = exports.getBibleBookAbbreviatedName = void 0;

var _md = _interopRequireDefault(require("md5"));

var _bibletagsVersification = require("@bibletags/bibletags-versification");

var _buffer = require("buffer");

var _i18n = _interopRequireWildcard(require("./i18n"));

Object.keys(_i18n).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _i18n[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _i18n[key];
    }
  });
});

var _hebrewMorph = require("./hebrewMorph");

Object.keys(_hebrewMorph).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hebrewMorph[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hebrewMorph[key];
    }
  });
});

var _greekMorph = require("./greekMorph");

Object.keys(_greekMorph).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _greekMorph[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _greekMorph[key];
    }
  });
});

var _splitting = require("./splitting");

Object.keys(_splitting).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _splitting[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _splitting[key];
    }
  });
});

var _bibleSearchUtils = require("./bibleSearchUtils");

Object.keys(_bibleSearchUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bibleSearchUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _bibleSearchUtils[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _bibleSearch = require("./bibleSearch");

Object.keys(_bibleSearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bibleSearch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _bibleSearch[key];
    }
  });
});

var _originalWordConversion = require("./originalWordConversion");

Object.keys(_originalWordConversion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _originalWordConversion[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _originalWordConversion[key];
    }
  });
});

var _language = require("./language");

Object.keys(_language).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _language[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _language[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var getOrigLangVersionIdFromRef = function getOrigLangVersionIdFromRef(ref) {
  return ref.bookId <= 39 ? 'uhb' : 'ugnt';
};

exports.getOrigLangVersionIdFromRef = getOrigLangVersionIdFromRef;

var getOrigLangAndLXXVersionInfo = function getOrigLangAndLXXVersionInfo() {
  return {
    uhb: {
      id: 'uhb',
      name: 'unfoldingWord Hebrew Bible',
      languageId: 'heb',
      partialScope: 'ot',
      versificationModel: 'original',
      isOriginal: true
    },
    ugnt: {
      id: 'ugnt',
      name: 'unfoldingWord Greek New Testament',
      languageId: 'grc',
      partialScope: 'nt',
      versificationModel: 'original',
      isOriginal: true
    },
    lxx: {
      id: 'lxx',
      name: 'Rahlfs Septuagint',
      languageId: 'grc',
      partialScope: 'ot',
      versificationModel: 'lxx'
    }
  };
};

exports.getOrigLangAndLXXVersionInfo = getOrigLangAndLXXVersionInfo;

var getOrigLanguageText = function getOrigLanguageText(languageId) {
  return {
    heb: (0, _i18n["default"])("Hebrew"),
    grc: (0, _i18n["default"])("Greek")
  }[languageId];
};

exports.getOrigLanguageText = getOrigLanguageText;

var getVersionStr = function getVersionStr(versionId) {
  var origLangAndLXXVersionInfo = getOrigLangAndLXXVersionInfo();
  return origLangAndLXXVersionInfo[versionId] ? "".concat(getOrigLanguageText(origLangAndLXXVersionInfo[versionId].languageId), " (").concat(versionId.toUpperCase(), ")") : versionId.toUpperCase();
};

exports.getVersionStr = getVersionStr;

var getRefsInfo = function getRefsInfo(_ref) {
  var refs = _ref.refs,
      skipBookName = _ref.skipBookName,
      abbreviated = _ref.abbreviated,
      usfmBookAbbr = _ref.usfmBookAbbr;
  var info = {};

  var getBaseLoc = function getBaseLoc(ref) {
    return (ref.loc || (0, _bibletagsVersification.getLocFromRef)(ref)).split(':')[0];
  };

  var isStartAndEndWithSameBaseLoc = refs.length === 2 && getBaseLoc(refs[0]) === getBaseLoc(refs[1]);
  var fromRefHasWordRangeStartingFrom1 = ((refs[0].wordRanges || [])[0] || "").split('-')[0] === '1';
  refs.forEach(function (ref, idx) {
    var wordRanges = ref.wordRanges;

    var _ref2 = ref.loc ? (0, _bibletagsVersification.getRefFromLoc)(ref.loc) : ref,
        bookId = _ref2.bookId,
        chapter = _ref2.chapter,
        verse = _ref2.verse;

    if (info.book === undefined) {
      info.book = skipBookName ? "" : usfmBookAbbr ? getUsfmBibleBookAbbr(bookId) : abbreviated ? getBibleBookAbbreviatedName(bookId) : getBibleBookName(bookId);
    }

    if (chapter != null) {
      if (!info.chapter && !info.start_chapter) {
        info.chapter = chapter;
      } else if ((info.chapter || info.start_chapter) !== chapter) {
        info.start_chapter = info.start_chapter || info.chapter;
        info.end_chapter = chapter;
        delete info.chapter;
      }
    }

    if (verse != null) {
      var verseText;

      if (wordRanges || isStartAndEndWithSameBaseLoc) {
        if ( // fromRef and starts from 1
        idx === 0 && fromRefHasWordRangeStartingFrom1 // toRef and not isStartAndEndWithSameBaseLoc
        || idx === 1 && !isStartAndEndWithSameBaseLoc) {
          verseText = (0, _i18n["default"])("{{verse}}a", {
            verse: verse
          });
        } else if ( // fromRef and does not start from 1
        idx === 0 && !fromRefHasWordRangeStartingFrom1 // toRef and isStartAndEndWithSameBaseLoc and fromRef starts from 1
        || idx === 1 && isStartAndEndWithSameBaseLoc && fromRefHasWordRangeStartingFrom1) {
          verseText = (0, _i18n["default"])("{{verse}}b", {
            verse: verse
          });
        } else {
          // toRef and isStartAndEndWithSameBaseLoc and fromRef does not start from 1
          verseText = (0, _i18n["default"])("{{verse}}c", {
            verse: verse
          });
        }
      } else {
        verseText = verse;
      }

      if (info.verse == null && info.start_verse == null) {
        info.verse = verseText;
      } else {
        info.start_verse = info.start_verse != null ? info.start_verse : info.verse;
        info.end_verse = verseText;
        delete info.verse;
      }
    }
  });
  return info;
};

exports.getRefsInfo = getRefsInfo;

var getPassageStr = function getPassageStr(params) {
  var info = getRefsInfo(params);

  var getVerse = function getVerse(num) {
    return num === 0 ? params.abbreviated ? (0, _i18n["default"])("T", "", "abbreviated representation of a psalm title") : (0, _i18n["default"])("[title]", "", "represents a psalm title") : (0, _i18n.i18nNumber)({
      num: num,
      type: 'verse'
    });
  }; // modify chapter and verse numeric representation


  if (info.chapter) {
    info.chapter = (0, _i18n.i18nNumber)({
      num: info.chapter,
      type: 'chapter'
    });
  }

  if (info.start_chapter) {
    info.start_chapter = (0, _i18n.i18nNumber)({
      num: info.start_chapter,
      type: 'chapter'
    });
  }

  if (info.end_chapter) {
    info.end_chapter = (0, _i18n.i18nNumber)({
      num: info.end_chapter,
      type: 'chapter'
    });
  }

  if (info.verse != null) {
    info.verse = getVerse(info.verse);
  }

  if (info.start_verse != null) {
    info.start_verse = getVerse(info.start_verse);
  }

  if (info.end_verse != null) {
    info.end_verse = getVerse(info.end_verse);
  }

  if (info.start_chapter && info.start_verse != null) {
    return (0, _i18n["default"])("{{book}} {{start_chapter}}:{{start_verse}}–{{end_chapter}}:{{end_verse}}", info).trim();
  }

  if (info.chapter && info.start_verse != null) {
    return (0, _i18n["default"])("{{book}} {{chapter}}:{{start_verse}}–{{end_verse}}", info).trim();
  }

  if (info.start_chapter) {
    return (0, _i18n["default"])("{{book}} {{start_chapter}}–{{end_chapter}}", info).trim();
  }

  if (info.verse != null) {
    return (0, _i18n["default"])("{{book}} {{chapter}}:{{verse}}", info).trim();
  }

  if (info.chapter) {
    return (0, _i18n["default"])("{{book}} {{chapter}}", info).trim();
  }

  return info.book || "";
};

exports.getPassageStr = getPassageStr;

var getBookSuggestionOptions = function getBookSuggestionOptions() {
  var indicateBookId = function indicateBookId(book, bookId) {
    return {
      suggestedQuery: book,
      bookId: bookId
    };
  };

  var bookSuggestionOptions = [].concat(_toConsumableArray(getBibleBookNames().map(indicateBookId)), _toConsumableArray(getBibleBookAbbreviatedNames().map(indicateBookId))).filter(function (_ref3) {
    var suggestedQuery = _ref3.suggestedQuery;
    return suggestedQuery;
  });
  var digitWithSpaceAfterRegex = /^([1-4]) /;
  bookSuggestionOptions = [].concat(_toConsumableArray(bookSuggestionOptions), _toConsumableArray(bookSuggestionOptions.map(function (_ref4) {
    var suggestedQuery = _ref4.suggestedQuery,
        bookId = _ref4.bookId;
    return digitWithSpaceAfterRegex.test(suggestedQuery) ? {
      suggestedQuery: suggestedQuery.replace(digitWithSpaceAfterRegex, '$1'),
      bookId: bookId
    } : null;
  }).filter(Boolean)), [{
    suggestedQuery: (0, _i18n["default"])("Psalm", "", "book"),
    bookId: 19
  }, {
    suggestedQuery: (0, _i18n["default"])("Song of Solomon", "", "book"),
    bookId: 22
  }]);
  return bookSuggestionOptions;
};

exports.getBookSuggestionOptions = getBookSuggestionOptions;

var getPassageInfoArrayFromText = function getPassageInfoArrayFromText(_ref5) {
  var text = _ref5.text,
      contextRef = _ref5.contextRef,
      allowApproximateBookNames = _ref5.allowApproximateBookNames,
      mustIncludeEntirety = _ref5.mustIncludeEntirety;
  var infoArray = [];
  var bookSuggestionOptions = getBookSuggestionOptions();
  var chapterAndVersePartRegexStr = "([0-9]{1,3})(?:[:.]([0-9]{1,3}))?([a-c]|ff?)?(?:[-\u2013]([0-9]{1,3})(?:[:.]([0-9]{1,3}))?([a-c]|ff?)?)?(?!\\p{Letter}|[0-9-\u2013:_+&/%])";
  var matchArr;
  var bookPortionOfRegex = allowApproximateBookNames ? "((?:\\p{Letter}|[0-9-\u2013:_+&/%])+(?: (?:\\p{Letter}|[0-9-\u2013:_+&/%])+){0,3})" // assumes maximum of four-word book names
  : "(".concat(bookSuggestionOptions.map(function (_ref6) {
    var suggestedQuery = _ref6.suggestedQuery;
    return suggestedQuery;
  }).join('|'), ")");
  var searchRegex = new RegExp("".concat(mustIncludeEntirety ? "^" : "").concat(bookPortionOfRegex, " ").concat(chapterAndVersePartRegexStr), "giu");

  var _loop = function _loop() {
    if (matchArr.index > 0 && /(?:(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])|[%&\+\x2D\/-:_\u2013])/.test(text[matchArr.index - 1])) return "continue";

    var _matchArr = matchArr,
        _matchArr2 = _slicedToArray(_matchArr, 8),
        entirety = _matchArr2[0],
        book = _matchArr2[1],
        startChapter = _matchArr2[2],
        startVerse = _matchArr2[3],
        _matchArr2$ = _matchArr2[4],
        startIgnoreText = _matchArr2$ === void 0 ? "" : _matchArr2$,
        endChapter = _matchArr2[5],
        endVerse = _matchArr2[6],
        _matchArr2$2 = _matchArr2[7],
        endIgnoreText = _matchArr2$2 === void 0 ? "" : _matchArr2$2;

    var versionId = void 0;
    var refSets = [];
    var bookId = parseInt(((0, _bibleSearchUtils.findAutoCompleteSuggestions)({
      str: book,
      suggestionOptions: bookSuggestionOptions,
      max: 1
    })[0] || {}).bookId, 10);

    if (!bookId) {
      if (/ /.test(book) && allowApproximateBookNames && !mustIncludeEntirety) {
        // remove first word and see if it now is a passage ref
        searchRegex.lastIndex = matchArr.index + book.indexOf(' ');
      }

      return "continue";
    } // if ignore texts are uppercase at all, then this is not a match


    if (/[A-Z]/.test("".concat(startIgnoreText).concat(endIgnoreText))) return "continue"; // get comma add-ons if they exist; try all separately and increase lastIndex on regex

    var negativeLookaheadBookPortionOfRegex = bookPortionOfRegex.replace(/^\(/, '(?!');

    var _ref7 = text.slice(searchRegex.lastIndex).match(new RegExp("^(?:[,;] ?".concat(negativeLookaheadBookPortionOfRegex).concat(chapterAndVersePartRegexStr, ")+"), "u")) || [],
        _ref8 = _slicedToArray(_ref7, 1),
        _ref8$ = _ref8[0],
        commaAddOnStr = _ref8$ === void 0 ? "" : _ref8$;

    var commaAddOns = commaAddOnStr.match(/[,;] ?[^,;]+/g) || [];

    if (commaAddOns.length) {
      entirety += commaAddOnStr;
      searchRegex.lastIndex += commaAddOnStr.length;
    } // get version abbr add-ons if it exists; increase lastIndex on regex


    var _ref9 = text.slice(searchRegex.lastIndex).match(/^ (?:[0-9A-Z]{2,9}|\([0-9A-Z]{2,9}\)|\[[0-9A-Z]{2,9}\]|\{[0-9A-Z]{2,9}\})(?!(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])|[%&\+\x2D\/-:_\u2013])/) || [],
        _ref10 = _slicedToArray(_ref9, 1),
        _ref10$ = _ref10[0],
        versionAbbrPlus = _ref10$ === void 0 ? "" : _ref10$;

    if (versionAbbrPlus) {
      entirety += versionAbbrPlus;
      searchRegex.lastIndex += versionAbbrPlus.length;
      versionId = versionAbbrPlus.replace(/[[\](){} ]/g, '').toLowerCase();
    }

    if (mustIncludeEntirety && searchRegex.lastIndex !== entirety.length) return "break";

    var addRefIfValid = function addRefIfValid(_ref11) {
      var startChapter = _ref11.startChapter,
          startVerse = _ref11.startVerse,
          endChapter = _ref11.endChapter,
          endVerse = _ref11.endVerse;

      // 1 [ch OR vs (if single chapter book)]
      // 1-2 [ch-ch OR vs-vs (if single chapter book)]
      // 1:1 [ch:vs]
      // 1:1-2 [ch:vs-vs]
      // 1:1-2:2 [ch:vs-ch:vs]
      // 1-2:2 [ch-ch:vs]
      // if(!startVerse && endVerse) return  // i.e. 1-2:2 (invalid)
      if (!startVerse && endVerse) {
        // i.e. 1-2:2 [ch-ch:vs]
        startVerse = 1;
      }

      if (startChapter && startVerse && endChapter && !endVerse) {
        // i.e. 1:1-2
        endVerse = endChapter;
        endChapter = startChapter;
      }

      if (_bibletagsVersification.numberOfVersesPerChapterPerBook[bookId - 1].length === 1 && !startVerse) {
        // i.e 1 OR 1-2
        startVerse = startChapter;
        startChapter = "1";

        if (endChapter) {
          endVerse = endChapter;
          endChapter = "1";
        }
      }

      endChapter = endChapter || (endVerse ? startChapter : undefined);
      if (parseInt(endChapter || startChapter, 10) > (bookId === 39 ? 4 : _bibletagsVersification.numberOfVersesPerChapterPerBook[bookId - 1].length)) return;
      var refs = [_objectSpread({
        bookId: bookId,
        chapter: parseInt(startChapter, 10)
      }, !startVerse ? {} : {
        verse: parseInt(startVerse, 10)
      })];

      if (startVerse !== endVerse || startChapter !== endChapter) {
        refs.push(_objectSpread({
          bookId: bookId,
          chapter: parseInt(endChapter, 10)
        }, !endVerse ? {} : {
          verse: parseInt(endVerse, 10)
        }));
      }

      refs = refs.filter(function (_ref12) {
        var chapter = _ref12.chapter,
            verse = _ref12.verse;
        return chapter && verse !== NaN;
      });
      if (refs.length > 1 && (refs[0].chapter > refs[1].chapter || refs[0].chapter === refs[1].chapter && refs[0].verse !== undefined && refs[0].verse > (refs[1].verse || 0))) return; // from and to portions out of order

      if (refs.length > 0) {
        refSets.push(refs);
      }
    };

    addRefIfValid({
      startChapter: startChapter,
      startVerse: startVerse,
      endChapter: endChapter,
      endVerse: endVerse
    });

    if (refSets.length > 0) {
      commaAddOns.forEach(function (commaAddOn) {
        var _commaAddOn$match = commaAddOn.match(/^([,;]) ?([^,;]+)$/),
            _commaAddOn$match2 = _slicedToArray(_commaAddOn$match, 3),
            x = _commaAddOn$match2[0],
            connector = _commaAddOn$match2[1],
            addOn = _commaAddOn$match2[2];

        var _addOn$match = addOn.match(new RegExp(chapterAndVersePartRegexStr, 'u')),
            _addOn$match2 = _slicedToArray(_addOn$match, 7),
            entireAddOn = _addOn$match2[0],
            startChapter = _addOn$match2[1],
            startVerse = _addOn$match2[2],
            startIgnoreText = _addOn$match2[3],
            endChapter = _addOn$match2[4],
            endVerse = _addOn$match2[5],
            endIgnoreText = _addOn$match2[6];

        if (connector === "," && refSets.at(-1).at(-1).verse !== undefined && !startVerse) {
          startVerse = startChapter;
          startChapter = "".concat(refSets.at(-1).at(-1).chapter);
        }

        addRefIfValid({
          startChapter: startChapter,
          startVerse: startVerse,
          endChapter: endChapter,
          endVerse: endVerse
        });
      });
      infoArray.push({
        startCharacterIndex: matchArr.index,
        endCharacterIndex: matchArr.index + entirety.length,
        refSets: refSets,
        versionId: versionId
      });
    }
  };

  while ((matchArr = searchRegex.exec(text)) !== null) {
    var _ret = _loop();

    if (_ret === "continue") continue;
    if (_ret === "break") break;
  }

  return infoArray;
};

exports.getPassageInfoArrayFromText = getPassageInfoArrayFromText;

var getRefsFromPassageStr = function getRefsFromPassageStr(passageStr) {
  var normalizedPassageStr = passageStr.replace(/  +/g, ' ').trim();
  var info = getPassageInfoArrayFromText({
    text: normalizedPassageStr,
    allowApproximateBookNames: true,
    mustIncludeEntirety: true
  })[0];
  if (!info) return null;
  return {
    refs: info.refSets[0],
    versionId: info.versionId
  };
};

exports.getRefsFromPassageStr = getRefsFromPassageStr;

var getBibleBookNames = function getBibleBookNames() {
  return ["", (0, _i18n["default"])("Genesis", "", "book"), (0, _i18n["default"])("Exodus", "", "book"), (0, _i18n["default"])("Leviticus", "", "book"), (0, _i18n["default"])("Numbers", "", "book"), (0, _i18n["default"])("Deuteronomy", "", "book"), (0, _i18n["default"])("Joshua", "", "book"), (0, _i18n["default"])("Judges", "", "book"), (0, _i18n["default"])("Ruth", "", "book"), (0, _i18n["default"])("1 Samuel", "", "book"), (0, _i18n["default"])("2 Samuel", "", "book"), (0, _i18n["default"])("1 Kings", "", "book"), (0, _i18n["default"])("2 Kings", "", "book"), (0, _i18n["default"])("1 Chronicles", "", "book"), (0, _i18n["default"])("2 Chronicles", "", "book"), (0, _i18n["default"])("Ezra", "", "book"), (0, _i18n["default"])("Nehemiah", "", "book"), (0, _i18n["default"])("Esther", "", "book"), (0, _i18n["default"])("Job", "", "book"), (0, _i18n["default"])("Psalms", "", "book"), (0, _i18n["default"])("Proverbs", "", "book"), (0, _i18n["default"])("Ecclesiastes", "", "book"), (0, _i18n["default"])("Song of Songs", "", "book"), (0, _i18n["default"])("Isaiah", "", "book"), (0, _i18n["default"])("Jeremiah", "", "book"), (0, _i18n["default"])("Lamentations", "", "book"), (0, _i18n["default"])("Ezekiel", "", "book"), (0, _i18n["default"])("Daniel", "", "book"), (0, _i18n["default"])("Hosea", "", "book"), (0, _i18n["default"])("Joel", "", "book"), (0, _i18n["default"])("Amos", "", "book"), (0, _i18n["default"])("Obadiah", "", "book"), (0, _i18n["default"])("Jonah", "", "book"), (0, _i18n["default"])("Micah", "", "book"), (0, _i18n["default"])("Nahum", "", "book"), (0, _i18n["default"])("Habakkuk", "", "book"), (0, _i18n["default"])("Zephaniah", "", "book"), (0, _i18n["default"])("Haggai", "", "book"), (0, _i18n["default"])("Zechariah", "", "book"), (0, _i18n["default"])("Malachi", "", "book"), (0, _i18n["default"])("Matthew", "", "book"), (0, _i18n["default"])("Mark", "", "book"), (0, _i18n["default"])("Luke", "", "book"), (0, _i18n["default"])("John", "", "book"), (0, _i18n["default"])("Acts", "", "book"), (0, _i18n["default"])("Romans", "", "book"), (0, _i18n["default"])("1 Corinthians", "", "book"), (0, _i18n["default"])("2 Corinthians", "", "book"), (0, _i18n["default"])("Galatians", "", "book"), (0, _i18n["default"])("Ephesians", "", "book"), (0, _i18n["default"])("Philippians", "", "book"), (0, _i18n["default"])("Colossians", "", "book"), (0, _i18n["default"])("1 Thessalonians", "", "book"), (0, _i18n["default"])("2 Thessalonians", "", "book"), (0, _i18n["default"])("1 Timothy", "", "book"), (0, _i18n["default"])("2 Timothy", "", "book"), (0, _i18n["default"])("Titus", "", "book"), (0, _i18n["default"])("Philemon", "", "book"), (0, _i18n["default"])("Hebrews", "", "book"), (0, _i18n["default"])("James", "", "book"), (0, _i18n["default"])("1 Peter", "", "book"), (0, _i18n["default"])("2 Peter", "", "book"), (0, _i18n["default"])("1 John", "", "book"), (0, _i18n["default"])("2 John", "", "book"), (0, _i18n["default"])("3 John", "", "book"), (0, _i18n["default"])("Jude", "", "book"), (0, _i18n["default"])("Revelation", "", "book")];
};

exports.getBibleBookNames = getBibleBookNames;

var getBibleBookName = function getBibleBookName(bookId) {
  return getBibleBookNames()[bookId];
};

exports.getBibleBookName = getBibleBookName;
var usfmBookAbbr = ["", "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL", "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV"];

var getUsfmBibleBookAbbr = function getUsfmBibleBookAbbr(bookId) {
  return usfmBookAbbr[bookId];
};

exports.getUsfmBibleBookAbbr = getUsfmBibleBookAbbr;

var getBookIdFromUsfmBibleBookAbbr = function getBookIdFromUsfmBibleBookAbbr(abbr) {
  return usfmBookAbbr.indexOf(abbr);
};

exports.getBookIdFromUsfmBibleBookAbbr = getBookIdFromUsfmBibleBookAbbr;

var getRefsFromUsfmRefStr = function getRefsFromUsfmRefStr(usfmRefStr) {
  var _usfmRefStr$split = usfmRefStr.split(' '),
      _usfmRefStr$split2 = _slicedToArray(_usfmRefStr$split, 2),
      usfmBibleBookAbbr = _usfmRefStr$split2[0],
      chaptersAndVerses = _usfmRefStr$split2[1];

  var _chaptersAndVerses$sp = chaptersAndVerses.split('-'),
      _chaptersAndVerses$sp2 = _slicedToArray(_chaptersAndVerses$sp, 2),
      startChapterAndVerse = _chaptersAndVerses$sp2[0],
      endChapterAndVerse = _chaptersAndVerses$sp2[1];

  var _startChapterAndVerse = startChapterAndVerse.split(':'),
      _startChapterAndVerse2 = _slicedToArray(_startChapterAndVerse, 2),
      startChapter = _startChapterAndVerse2[0],
      startVerse = _startChapterAndVerse2[1];

  var bookId = getBookIdFromUsfmBibleBookAbbr(usfmBibleBookAbbr);
  var isSingleChapterBook = (0, _bibletagsVersification.getNumberOfChapters)({
    versionInfo: {
      versificationModel: 'original' // since single-chapter books are version specific, just use this

    },
    bookId: bookId
  }) === 1;

  if (isSingleChapterBook && startVerse === undefined) {
    startVerse = startChapter;
    startChapter = 1;
  }

  var refs = [(0, _bibletagsVersification.getRefFromLoc)("".concat("0".concat(bookId).substr(-2)).concat("00".concat(startChapter).substr(-3)).concat("00".concat(startVerse === undefined ? 1 : startVerse).substr(-3)))];
  var endChapter, endVerse;

  if (endChapterAndVerse) {
    var endChapterAndVerseSplit = endChapterAndVerse.split(':');

    if (isSingleChapterBook && endChapterAndVerseSplit.length === 1) {
      endChapterAndVerseSplit.unshift(1);
    }

    if (startVerse === undefined) {
      endChapter = endChapterAndVerseSplit[0];
      endVerse = 999;
    } else if (endChapterAndVerseSplit.length > 1) {
      endChapter = endChapterAndVerseSplit[0];
      endVerse = endChapterAndVerseSplit[1];
    } else {
      endChapter = startChapter;
      endVerse = endChapterAndVerseSplit[0];
    }
  } else if (startVerse === undefined) {
    endChapter = startChapter;
    endVerse = 999;
  }

  if (endChapter) {
    refs.push((0, _bibletagsVersification.getRefFromLoc)("".concat("0".concat(getBookIdFromUsfmBibleBookAbbr(usfmBibleBookAbbr)).substr(-2)).concat("00".concat(endChapter).substr(-3)).concat("00".concat(endVerse).substr(-3))));
  }

  return refs;
};

exports.getRefsFromUsfmRefStr = getRefsFromUsfmRefStr;

var getUsfmRefStrFromLoc = function getUsfmRefStrFromLoc(loc) {
  var refs = loc.split('-').map(function (l) {
    return (0, _bibletagsVersification.getRefFromLoc)(l);
  });

  var _getRefsInfo = getRefsInfo({
    refs: refs,
    usfmBookAbbr: true
  }),
      book = _getRefsInfo.book,
      chapter = _getRefsInfo.chapter,
      verse = _getRefsInfo.verse,
      start_chapter = _getRefsInfo.start_chapter,
      start_verse = _getRefsInfo.start_verse,
      end_chapter = _getRefsInfo.end_chapter,
      end_verse = _getRefsInfo.end_verse;

  if (start_chapter && start_verse) {
    return "".concat(book, " ").concat(start_chapter, ":").concat(start_verse, "\u2013").concat(end_chapter, ":").concat(end_verse);
  }

  if (chapter && start_verse) {
    return "".concat(book, " ").concat(chapter, ":").concat(start_verse, "\u2013").concat(end_verse);
  }

  if (start_chapter) {
    return "".concat(book, " ").concat(start_chapter, "\u2013").concat(end_chapter);
  }

  if (verse) {
    return "".concat(book, " ").concat(chapter, ":").concat(verse);
  }
};

exports.getUsfmRefStrFromLoc = getUsfmRefStrFromLoc;

var getBibleBookAbbreviatedNames = function getBibleBookAbbreviatedNames() {
  return ["", (0, _i18n["default"])("Gen", "Abbreviation for Genesis", "book"), (0, _i18n["default"])("Ex", "Abbreviation for Exodus", "book"), (0, _i18n["default"])("Lev", "Abbreviation for Leviticus", "book"), (0, _i18n["default"])("Num", "Abbreviation for Numbers", "book"), (0, _i18n["default"])("Dt", "Abbreviation for Deuteronomy", "book"), (0, _i18n["default"])("Jsh", "Abbreviation for Joshua", "book"), (0, _i18n["default"])("Jdg", "Abbreviation for Judges", "book"), (0, _i18n["default"])("Rth", "Abbreviation for Ruth", "book"), (0, _i18n["default"])("1Sa", "Abbreviation for 1 Samuel", "book"), (0, _i18n["default"])("2Sa", "Abbreviation for 2 Samuel", "book"), (0, _i18n["default"])("1Ki", "Abbreviation for 1 Kings", "book"), (0, _i18n["default"])("2Ki", "Abbreviation for 2 Kings", "book"), (0, _i18n["default"])("1Ch", "Abbreviation for 1 Chronicles", "book"), (0, _i18n["default"])("2Ch", "Abbreviation for 2 Chronicles", "book"), (0, _i18n["default"])("Ezr", "Abbreviation for Ezra", "book"), (0, _i18n["default"])("Neh", "Abbreviation for Nehemiah", "book"), (0, _i18n["default"])("Est", "Abbreviation for Esther", "book"), (0, _i18n["default"])("Job", "Abbreviation for Job", "book"), (0, _i18n["default"])("Ps", "Abbreviation for Psalms", "book"), (0, _i18n["default"])("Prv", "Abbreviation for Proverbs", "book"), (0, _i18n["default"])("Ecc", "Abbreviation for Ecclesiastes", "book"), (0, _i18n["default"])("Sng", "Abbreviation for Song", "book"), (0, _i18n["default"])("Is", "Abbreviation for Isaiah", "book"), (0, _i18n["default"])("Jer", "Abbreviation for Jeremiah", "book"), (0, _i18n["default"])("Lam", "Abbreviation for Lamentations", "book"), (0, _i18n["default"])("Ezk", "Abbreviation for Ezekiel", "book"), (0, _i18n["default"])("Dan", "Abbreviation for Daniel", "book"), (0, _i18n["default"])("Hos", "Abbreviation for Hosea", "book"), (0, _i18n["default"])("Jl", "Abbreviation for Joel", "book"), (0, _i18n["default"])("Amo", "Abbreviation for Amos", "book"), (0, _i18n["default"])("Ob", "Abbreviation for Obadiah", "book"), (0, _i18n["default"])("Jon", "Abbreviation for Jonah", "book"), (0, _i18n["default"])("Mic", "Abbreviation for Micah", "book"), (0, _i18n["default"])("Nah", "Abbreviation for Nahum", "book"), (0, _i18n["default"])("Hab", "Abbreviation for Habakkuk", "book"), (0, _i18n["default"])("Zph", "Abbreviation for Zephaniah", "book"), (0, _i18n["default"])("Hag", "Abbreviation for Haggai", "book"), (0, _i18n["default"])("Zch", "Abbreviation for Zechariah", "book"), (0, _i18n["default"])("Mal", "Abbreviation for Malachi", "book"), (0, _i18n["default"])("Mt", "Abbreviation for Matthew", "book"), (0, _i18n["default"])("Mrk", "Abbreviation for Mark", "book"), (0, _i18n["default"])("Lk", "Abbreviation for Luke", "book"), (0, _i18n["default"])("Jhn", "Abbreviation for John", "book"), (0, _i18n["default"])("Act", "Abbreviation for Acts", "book"), (0, _i18n["default"])("Rom", "Abbreviation for Romans", "book"), (0, _i18n["default"])("1Co", "Abbreviation for 1 Corinthians", "book"), (0, _i18n["default"])("2Co", "Abbreviation for 2 Corinthians", "book"), (0, _i18n["default"])("Gal", "Abbreviation for Galatians", "book"), (0, _i18n["default"])("Eph", "Abbreviation for Ephesians", "book"), (0, _i18n["default"])("Php", "Abbreviation for Philippians", "book"), (0, _i18n["default"])("Col", "Abbreviation for Colossians", "book"), (0, _i18n["default"])("1Th", "Abbreviation for 1 Thessalonians", "book"), (0, _i18n["default"])("2Th", "Abbreviation for 2 Thessalonians", "book"), (0, _i18n["default"])("1Ti", "Abbreviation for 1 Timothy", "book"), (0, _i18n["default"])("2Ti", "Abbreviation for 2 Timothy", "book"), (0, _i18n["default"])("Tts", "Abbreviation for Titus", "book"), (0, _i18n["default"])("Phm", "Abbreviation for Philemon", "book"), (0, _i18n["default"])("Heb", "Abbreviation for Hebrews", "book"), (0, _i18n["default"])("Jam", "Abbreviation for James", "book"), (0, _i18n["default"])("1Pe", "Abbreviation for 1 Peter", "book"), (0, _i18n["default"])("2Pe", "Abbreviation for 2 Peter", "book"), (0, _i18n["default"])("1Jn", "Abbreviation for 1 John", "book"), (0, _i18n["default"])("2Jn", "Abbreviation for 2 John", "book"), (0, _i18n["default"])("3Jn", "Abbreviation for 3 John", "book"), (0, _i18n["default"])("Jud", "Abbreviation for Jude", "book"), (0, _i18n["default"])("Rev", "Abbreviation for Revelation", "book")];
};

exports.getBibleBookAbbreviatedNames = getBibleBookAbbreviatedNames;

var getBibleBookAbbreviatedName = function getBibleBookAbbreviatedName(bookId) {
  return getBibleBookAbbreviatedNames()[bookId];
};

exports.getBibleBookAbbreviatedName = getBibleBookAbbreviatedName;

var getNormalizedPOSCode = function getNormalizedPOSCode(_ref13) {
  var morphLang = _ref13.morphLang,
      morphPos = _ref13.morphPos;
  return ['He', 'Ar'].includes(morphLang) ? morphPos : (0, _greekMorph.getNormalizedGreekPOSCode)(morphPos);
};

exports.getNormalizedPOSCode = getNormalizedPOSCode;

var getPOSTerm = function getPOSTerm(_ref14) {
  var languageId = _ref14.languageId,
      posCode = _ref14.posCode;
  return languageId === 'heb' ? (0, _hebrewMorph.getHebrewPOSTerm)(posCode) : (0, _greekMorph.getGreekPOSTerm)(posCode);
};

exports.getPOSTerm = getPOSTerm;

var getMorphPartDisplayInfo = function getMorphPartDisplayInfo(_ref15) {
  var morphLang = _ref15.morphLang,
      morphPart = _ref15.morphPart,
      isPrefixOrSuffix = _ref15.isPrefixOrSuffix,
      wordIsMultiPart = _ref15.wordIsMultiPart;
  return ['He', 'Ar'].includes(morphLang) ? (0, _hebrewMorph.getHebrewMorphPartDisplayInfo)({
    morphLang: morphLang,
    morphPart: morphPart,
    isPrefixOrSuffix: isPrefixOrSuffix,
    wordIsMultiPart: wordIsMultiPart
  }) : (0, _greekMorph.getGreekMorphPartDisplayInfo)({
    morphPart: morphPart
  });
}; // same as in bibletags-data/scripts/importUHBFromUsfm.js


exports.getMorphPartDisplayInfo = getMorphPartDisplayInfo;

var getMainWordPartIndex = function getMainWordPartIndex(wordParts) {
  if (!wordParts) return null;

  for (var idx = wordParts.length - 1; idx >= 0; idx--) {
    if (!wordParts[idx].match(/^S/)) {
      return idx;
    }
  }
};

exports.getMainWordPartIndex = getMainWordPartIndex;

var getStrongs = function getStrongs(wordInfo) {
  return wordInfo ? (wordInfo.strong || '').replace(/^[a-z]+:|\+$/, '') : '';
};

exports.getStrongs = getStrongs;

var getIsEntirelyPrefixAndSuffix = function getIsEntirelyPrefixAndSuffix(wordInfo) {
  return wordInfo && !getStrongs(wordInfo);
};

exports.getIsEntirelyPrefixAndSuffix = getIsEntirelyPrefixAndSuffix;
var toBase64 = typeof btoa === 'undefined' ? function (str) {
  return _buffer.Buffer.from(str, 'binary').toString('base64');
} : btoa;
exports.toBase64 = toBase64;

var hexToBase64 = function hexToBase64(hex) {
  return toBase64(hex.match(/\w{2}/g).map(function (a) {
    return String.fromCharCode(parseInt(a, 16));
  }).join(""));
}; // FYI: maximum length of 32-digit base16 (hex) is 22-digits, though it is buffered to 24 digits with ='s


var hash64 = function hash64(str) {
  return hexToBase64((0, _md["default"])(str));
};

exports.hash64 = hash64;

var getWordsHash = function getWordsHash(_ref16) {
  var usfm = _ref16.usfm,
      wordDividerRegex = _ref16.wordDividerRegex;
  var words = (0, _splitting.splitVerseIntoWords)({
    usfm: usfm,
    wordDividerRegex: wordDividerRegex
  }).map(function (_ref17) {
    var text = _ref17.text;
    return text.toLowerCase();
  }); // After importing the full ESV, I found only 1 redundancy in the 
  // wordHashesSubmission.hash with 4 characters (out of 13k distinct words).
  // Thus, it is inconcievable that a matching verse ref in the same designated
  // version would have the same 4-char hash if there was any difference.

  return hash64(JSON.stringify(words)).slice(0, 4);
};

exports.getWordsHash = getWordsHash;

var getWordHashes = function getWordHashes(_ref18) {
  var usfm = _ref18.usfm,
      wordDividerRegex = _ref18.wordDividerRegex;
  var words = (0, _splitting.splitVerseIntoWords)({
    usfm: usfm,
    wordDividerRegex: wordDividerRegex
  }).map(function (_ref19) {
    var text = _ref19.text;
    return text.toLowerCase();
  }); // After importing the full ESV, I found only 1 redundancy in the 
  // wordHashesSubmission.hash with 4 characters (out of 13k distinct words).
  // Thus, it is more than sufficient to use 6 chars for the hash (which we
  // do not want ANY invalid matches with) and 3 chars for the
  // secondary hashes (since those only are checked when the main
  // hash matches).

  return words.map(function (word, index) {
    return {
      wordNumberInVerse: index + 1,
      hash: hash64(word).slice(0, 6),
      withBeforeHash: hash64("".concat(words[index - 1], "\n").concat(words[index])).slice(0, 3),
      withAfterHash: hash64("".concat(words[index], "\n").concat(words[index + 1])).slice(0, 3),
      withBeforeAndAfterHash: hash64("".concat(words[index - 1], "\n").concat(words[index], "\n").concat(words[index + 1])).slice(0, 3)
    };
  });
};

exports.getWordHashes = getWordHashes;

var isValidEmail = function isValidEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

exports.isValidEmail = isValidEmail;

var isOriginalLanguageSearch = function isOriginalLanguageSearch(searchText) {
  return /^\(?"?[#=]/.test(searchText);
};

exports.isOriginalLanguageSearch = isOriginalLanguageSearch;

var getTextLanguageId = function getTextLanguageId(_ref20) {
  var languageId = _ref20.languageId,
      bookId = _ref20.bookId;
  return languageId === "heb+grc" ? bookId <= 39 ? 'heb' : 'grc' : languageId;
};

exports.getTextLanguageId = getTextLanguageId;

var isRTLStr = function isRTLStr(str) {
  var ltrChars = "A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF";
  var rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
  var rtlDirCheck = new RegExp("^[^".concat(ltrChars, "]*[").concat(rtlChars, "]"));
  return rtlDirCheck.test(str);
};

exports.isRTLStr = isRTLStr;

var getFirstWordFromPieces = function getFirstWordFromPieces(pieces) {
  var _iterator = _createForOfIteratorHelper(pieces),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var piece = _step.value;

      if (piece.type === "word") {
        return piece.text;
      } else if (piece.children instanceof Array) {
        var wordFromChildren = getFirstWordFromPieces(piece.children);

        if (wordFromChildren) {
          return wordFromChildren;
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var isRTLText = function isRTLText(_ref21) {
  var languageId = _ref21.languageId,
      bookId = _ref21.bookId,
      searchString = _ref21.searchString,
      pieces = _ref21.pieces;
  return !languageId ? isRTLStr(getFirstWordFromPieces(pieces || [])) : languageId === 'heb+grc' ? bookId ? bookId <= 39 ? true : false : /^[\u0590-\u05FF ]*$/g.test(searchString) : ['heb', 'hbo', 'yid', 'per', 'fas', 'urd', 'pus', 'syc', 'syr', 'sam', 'snd', 'prs', 'prd', 'gbz', 'ckb', 'kmr', 'kur', 'sdh', // Arabic + its dialects follow
  'ara', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'aeb', 'aec', 'afb', 'ajp', 'aju', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'jrb', 'jye', 'mxi', 'pga', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud'].includes(languageId);
};

exports.isRTLText = isRTLText;

var getCopyVerseText = function getCopyVerseText(_ref22) {
  var pieces = _ref22.pieces,
      ref = _ref22.ref,
      versionAbbr = _ref22.versionAbbr;
  var selectedTextContent = '';
  pieces.forEach(function (_ref23) {
    var tag = _ref23.tag,
        text = _ref23.text,
        nextChar = _ref23.nextChar;

    if (!text) {
      if (nextChar === ' ') {
        selectedTextContent += nextChar;
      }

      return;
    }

    selectedTextContent += ['nd', 'sc'].includes(tag) ? text.toUpperCase() : text;
  });
  return (0, _i18n["default"])("{{verse}} ({{passage_reference}} {{version}})", {
    verse: selectedTextContent.trim(),
    passage_reference: getPassageStr({
      refs: [ref]
    }),
    version: versionAbbr
  });
};

exports.getCopyVerseText = getCopyVerseText;

var getMorphInfo = function getMorphInfo(morph) {
  var morphLang = morph.substr(0, 2);
  var morphParts;
  var mainPartIdx;
  var morphPos;

  if (['He', 'Ar'].includes(morphLang)) {
    morphParts = morph.substr(3).split(':');
    mainPartIdx = getMainWordPartIndex(morphParts);
    morphPos = morphParts[mainPartIdx].substr(0, 1);
  } else {
    morphParts = [morph.substr(3)];
    mainPartIdx = 0;
    morphPos = getNormalizedPOSCode({
      morphLang: morphLang,
      morphPos: morph.substr(3, 2)
    });
  }

  return {
    morphLang: morphLang,
    morphParts: morphParts,
    mainPartIdx: mainPartIdx,
    morphPos: morphPos
  };
};

exports.getMorphInfo = getMorphInfo;

var getColorWithOpacity = function getColorWithOpacity() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgba(0,0,0,1)';
  var opacity = arguments.length > 1 ? arguments[1] : undefined;
  return color.replace(/^#([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }) // if it is short form hex E.g. #CCC
  .replace(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, function (x, r, g, b) {
    return "rgba(".concat(parseInt(r, 16), ",").concat(parseInt(g, 16), ",").concat(parseInt(b, 16), ",1)");
  }) // if it is hex
  .replace(/^rgb\( *([0-9]+) *, *([0-9]+) *, *([0-9]+) *\)$/i, "rgba($1,$2,$3,1)") // if it is rgb()
  .replace(/^rgba\( *([0-9]+) *, *([0-9]+) *, *([0-9]+) *, *[0-9]+ *\)$/i, "rgba($1,$2,$3,".concat(opacity, ")"));
};

exports.getColorWithOpacity = getColorWithOpacity;