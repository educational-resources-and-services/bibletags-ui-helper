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
  getBibleBookName: true,
  getUsfmBibleBookAbbr: true,
  getBookIdFromUsfmBibleBookAbbr: true,
  getRefsFromUsfmRefStr: true,
  getUsfmRefStrFromLoc: true,
  getBibleBookAbbreviatedName: true,
  getNormalizedPOSCode: true,
  getPOSTerm: true,
  getMorphPartDisplayInfo: true,
  getMainWordPartIndex: true,
  getStrongs: true,
  getIsEntirelyPrefixAndSuffix: true,
  hash64: true,
  getWordsHash: true,
  getWordHashes: true,
  isValidEmail: true
};
exports.isValidEmail = exports.hash64 = exports.getWordsHash = exports.getWordHashes = exports.getVersionStr = exports.getUsfmRefStrFromLoc = exports.getUsfmBibleBookAbbr = exports.getStrongs = exports.getRefsInfo = exports.getRefsFromUsfmRefStr = exports.getPassageStr = exports.getPOSTerm = exports.getOrigLanguageText = exports.getOrigLangVersionIdFromRef = exports.getOrigLangAndLXXVersionInfo = exports.getNormalizedPOSCode = exports.getMorphPartDisplayInfo = exports.getMainWordPartIndex = exports.getIsEntirelyPrefixAndSuffix = exports.getBookIdFromUsfmBibleBookAbbr = exports.getBibleBookName = exports.getBibleBookAbbreviatedName = void 0;

var _md = _interopRequireDefault(require("md5"));

var _bibletagsVersification = require("@bibletags/bibletags-versification");

var _i18n = _interopRequireWildcard(require("./i18n.js"));

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

var _hebrewMorph = require("./hebrewMorph.js");

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

var _greekMorph = require("./greekMorph.js");

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

var _splitting = require("./splitting.js");

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  refs.forEach(function (ref) {
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

      if (wordRanges) {
        verseText = wordRanges[0].substr(0, 1) === '1' ? (0, _i18n["default"])("{{verse}}a", {
          verse: verse
        }) : (0, _i18n["default"])("{{verse}}b", {
          verse: verse
        });
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
  var info = getRefsInfo(params); // modify chapter and verse numeric representation

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
    info.verse = (0, _i18n.i18nNumber)({
      num: info.verse,
      type: 'verse'
    });
  }

  if (info.start_verse != null) {
    info.start_verse = info.start_verse === 0 ? (0, _i18n["default"])("[title]", "", "represents a psalm title") : (0, _i18n.i18nNumber)({
      num: info.start_verse,
      type: 'verse'
    });
  }

  if (info.end_verse != null) {
    info.end_verse = (0, _i18n.i18nNumber)({
      num: info.end_verse,
      type: 'verse'
    });
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

var getBibleBookName = function getBibleBookName(bookId) {
  return ["", (0, _i18n["default"])("Genesis", "", "book"), (0, _i18n["default"])("Exodus", "", "book"), (0, _i18n["default"])("Leviticus", "", "book"), (0, _i18n["default"])("Numbers", "", "book"), (0, _i18n["default"])("Deuteronomy", "", "book"), (0, _i18n["default"])("Joshua", "", "book"), (0, _i18n["default"])("Judges", "", "book"), (0, _i18n["default"])("Ruth", "", "book"), (0, _i18n["default"])("1 Samuel", "", "book"), (0, _i18n["default"])("2 Samuel", "", "book"), (0, _i18n["default"])("1 Kings", "", "book"), (0, _i18n["default"])("2 Kings", "", "book"), (0, _i18n["default"])("1 Chronicles", "", "book"), (0, _i18n["default"])("2 Chronicles", "", "book"), (0, _i18n["default"])("Ezra", "", "book"), (0, _i18n["default"])("Nehemiah", "", "book"), (0, _i18n["default"])("Esther", "", "book"), (0, _i18n["default"])("Job", "", "book"), (0, _i18n["default"])("Psalms", "", "book"), (0, _i18n["default"])("Proverbs", "", "book"), (0, _i18n["default"])("Ecclesiastes", "", "book"), (0, _i18n["default"])("Song of Songs", "", "book"), (0, _i18n["default"])("Isaiah", "", "book"), (0, _i18n["default"])("Jeremiah", "", "book"), (0, _i18n["default"])("Lamentations", "", "book"), (0, _i18n["default"])("Ezekiel", "", "book"), (0, _i18n["default"])("Daniel", "", "book"), (0, _i18n["default"])("Hosea", "", "book"), (0, _i18n["default"])("Joel", "", "book"), (0, _i18n["default"])("Amos", "", "book"), (0, _i18n["default"])("Obadiah", "", "book"), (0, _i18n["default"])("Jonah", "", "book"), (0, _i18n["default"])("Micah", "", "book"), (0, _i18n["default"])("Nahum", "", "book"), (0, _i18n["default"])("Habakkuk", "", "book"), (0, _i18n["default"])("Zephaniah", "", "book"), (0, _i18n["default"])("Haggai", "", "book"), (0, _i18n["default"])("Zechariah", "", "book"), (0, _i18n["default"])("Malachi", "", "book"), (0, _i18n["default"])("Matthew", "", "book"), (0, _i18n["default"])("Mark", "", "book"), (0, _i18n["default"])("Luke", "", "book"), (0, _i18n["default"])("John", "", "book"), (0, _i18n["default"])("Acts", "", "book"), (0, _i18n["default"])("Romans", "", "book"), (0, _i18n["default"])("1 Corinthians", "", "book"), (0, _i18n["default"])("2 Corinthians", "", "book"), (0, _i18n["default"])("Galatians", "", "book"), (0, _i18n["default"])("Ephesians", "", "book"), (0, _i18n["default"])("Philippians", "", "book"), (0, _i18n["default"])("Colossians", "", "book"), (0, _i18n["default"])("1 Thessalonians", "", "book"), (0, _i18n["default"])("2 Thessalonians", "", "book"), (0, _i18n["default"])("1 Timothy", "", "book"), (0, _i18n["default"])("2 Timothy", "", "book"), (0, _i18n["default"])("Titus", "", "book"), (0, _i18n["default"])("Philemon", "", "book"), (0, _i18n["default"])("Hebrews", "", "book"), (0, _i18n["default"])("James", "", "book"), (0, _i18n["default"])("1 Peter", "", "book"), (0, _i18n["default"])("2 Peter", "", "book"), (0, _i18n["default"])("1 John", "", "book"), (0, _i18n["default"])("2 John", "", "book"), (0, _i18n["default"])("3 John", "", "book"), (0, _i18n["default"])("Jude", "", "book"), (0, _i18n["default"])("Revelation", "", "book")][bookId];
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

  var refs = [(0, _bibletagsVersification.getRefFromLoc)("".concat("0".concat(getBookIdFromUsfmBibleBookAbbr(usfmBibleBookAbbr)).substr(-2)).concat("00".concat(startChapter).substr(-3)).concat("00".concat(startVerse === undefined ? 1 : startVerse).substr(-3)))];
  var endChapter, endVerse;

  if (endChapterAndVerse) {
    var endChapterAndVerseSplit = endChapterAndVerse.split(':');

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

var getBibleBookAbbreviatedName = function getBibleBookAbbreviatedName(bookId) {
  return ["", (0, _i18n["default"])("Gen", "Abbreviation for Genesis", "book"), (0, _i18n["default"])("Ex", "Abbreviation for Exodus", "book"), (0, _i18n["default"])("Lev", "Abbreviation for Leviticus", "book"), (0, _i18n["default"])("Num", "Abbreviation for Numbers", "book"), (0, _i18n["default"])("Dt", "Abbreviation for Deuteronomy", "book"), (0, _i18n["default"])("Jsh", "Abbreviation for Joshua", "book"), (0, _i18n["default"])("Jdg", "Abbreviation for Judges", "book"), (0, _i18n["default"])("Rth", "Abbreviation for Ruth", "book"), (0, _i18n["default"])("1Sa", "Abbreviation for 1 Samuel", "book"), (0, _i18n["default"])("2Sa", "Abbreviation for 2 Samuel", "book"), (0, _i18n["default"])("1Ki", "Abbreviation for 1 Kings", "book"), (0, _i18n["default"])("2Ki", "Abbreviation for 2 Kings", "book"), (0, _i18n["default"])("1Ch", "Abbreviation for 1 Chronicles", "book"), (0, _i18n["default"])("2Ch", "Abbreviation for 2 Chronicles", "book"), (0, _i18n["default"])("Ezr", "Abbreviation for Ezra", "book"), (0, _i18n["default"])("Neh", "Abbreviation for Nehemiah", "book"), (0, _i18n["default"])("Est", "Abbreviation for Esther", "book"), (0, _i18n["default"])("Job", "Abbreviation for Job", "book"), (0, _i18n["default"])("Ps", "Abbreviation for Psalms", "book"), (0, _i18n["default"])("Prv", "Abbreviation for Proverbs", "book"), (0, _i18n["default"])("Ecc", "Abbreviation for Ecclesiastes", "book"), (0, _i18n["default"])("Sng", "Abbreviation for Song", "book"), (0, _i18n["default"])("Is", "Abbreviation for Isaiah", "book"), (0, _i18n["default"])("Jer", "Abbreviation for Jeremiah", "book"), (0, _i18n["default"])("Lam", "Abbreviation for Lamentations", "book"), (0, _i18n["default"])("Ezk", "Abbreviation for Ezekiel", "book"), (0, _i18n["default"])("Dan", "Abbreviation for Daniel", "book"), (0, _i18n["default"])("Hos", "Abbreviation for Hosea", "book"), (0, _i18n["default"])("Jl", "Abbreviation for Joel", "book"), (0, _i18n["default"])("Amo", "Abbreviation for Amos", "book"), (0, _i18n["default"])("Ob", "Abbreviation for Obadiah", "book"), (0, _i18n["default"])("Jon", "Abbreviation for Jonah", "book"), (0, _i18n["default"])("Mic", "Abbreviation for Micah", "book"), (0, _i18n["default"])("Nah", "Abbreviation for Nahum", "book"), (0, _i18n["default"])("Hab", "Abbreviation for Habakkuk", "book"), (0, _i18n["default"])("Zph", "Abbreviation for Zephaniah", "book"), (0, _i18n["default"])("Hag", "Abbreviation for Haggai", "book"), (0, _i18n["default"])("Zch", "Abbreviation for Zechariah", "book"), (0, _i18n["default"])("Mal", "Abbreviation for Malachi", "book"), (0, _i18n["default"])("Mt", "Abbreviation for Matthew", "book"), (0, _i18n["default"])("Mrk", "Abbreviation for Mark", "book"), (0, _i18n["default"])("Lk", "Abbreviation for Luke", "book"), (0, _i18n["default"])("Jhn", "Abbreviation for John", "book"), (0, _i18n["default"])("Act", "Abbreviation for Acts", "book"), (0, _i18n["default"])("Rom", "Abbreviation for Romans", "book"), (0, _i18n["default"])("1Co", "Abbreviation for 1 Corinthians", "book"), (0, _i18n["default"])("2Co", "Abbreviation for 2 Corinthians", "book"), (0, _i18n["default"])("Gal", "Abbreviation for Galatians", "book"), (0, _i18n["default"])("Eph", "Abbreviation for Ephesians", "book"), (0, _i18n["default"])("Php", "Abbreviation for Philippians", "book"), (0, _i18n["default"])("Col", "Abbreviation for Colossians", "book"), (0, _i18n["default"])("1Th", "Abbreviation for 1 Thessalonians", "book"), (0, _i18n["default"])("2Th", "Abbreviation for 2 Thessalonians", "book"), (0, _i18n["default"])("1Ti", "Abbreviation for 1 Timothy", "book"), (0, _i18n["default"])("2Ti", "Abbreviation for 2 Timothy", "book"), (0, _i18n["default"])("Tts", "Abbreviation for Titus", "book"), (0, _i18n["default"])("Phm", "Abbreviation for Philemon", "book"), (0, _i18n["default"])("Heb", "Abbreviation for Hebrews", "book"), (0, _i18n["default"])("Jam", "Abbreviation for James", "book"), (0, _i18n["default"])("1Pe", "Abbreviation for 1 Peter", "book"), (0, _i18n["default"])("2Pe", "Abbreviation for 2 Peter", "book"), (0, _i18n["default"])("1Jn", "Abbreviation for 1 John", "book"), (0, _i18n["default"])("2Jn", "Abbreviation for 2 John", "book"), (0, _i18n["default"])("3Jn", "Abbreviation for 3 John", "book"), (0, _i18n["default"])("Jud", "Abbreviation for Jude", "book"), (0, _i18n["default"])("Rev", "Abbreviation for Revelation", "book")][bookId];
};

exports.getBibleBookAbbreviatedName = getBibleBookAbbreviatedName;

var getNormalizedPOSCode = function getNormalizedPOSCode(_ref3) {
  var morphLang = _ref3.morphLang,
      morphPos = _ref3.morphPos;
  return ['He', 'Ar'].includes(morphLang) ? morphPos : (0, _greekMorph.getNormalizedGreekPOSCode)(morphPos);
};

exports.getNormalizedPOSCode = getNormalizedPOSCode;

var getPOSTerm = function getPOSTerm(_ref4) {
  var languageId = _ref4.languageId,
      posCode = _ref4.posCode;
  return languageId === 'heb' ? (0, _hebrewMorph.getHebrewPOSTerm)(posCode) : (0, _greekMorph.getGreekPOSTerm)(posCode);
};

exports.getPOSTerm = getPOSTerm;

var getMorphPartDisplayInfo = function getMorphPartDisplayInfo(_ref5) {
  var morphLang = _ref5.morphLang,
      morphPart = _ref5.morphPart,
      isPrefixOrSuffix = _ref5.isPrefixOrSuffix,
      wordIsMultiPart = _ref5.wordIsMultiPart;
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

var hexToBase64 = function hexToBase64(hex) {
  return btoa(hex.match(/\w{2}/g).map(function (a) {
    return String.fromCharCode(parseInt(a, 16));
  }).join(""));
}; // FYI: maximum length of 32-digit base16 (hex) is 22-digits, though it is buffered to 24 digits with ='s


var hash64 = function hash64(str) {
  return hexToBase64((0, _md["default"])(str));
};

exports.hash64 = hash64;

var getWordsHash = function getWordsHash(_ref6) {
  var usfm = _ref6.usfm,
      wordDividerRegex = _ref6.wordDividerRegex;
  var words = (0, _splitting.splitVerseIntoWords)({
    usfm: usfm,
    wordDividerRegex: wordDividerRegex
  }); // The following line gets me a base64 2-digit hash for each word. This
  // leaves 4096 possible values for each word which makes the likelihood
  // of two different word sets with the same hash values very, very low.
  // Two different editions of a single text would need to have all the same
  // words except one, and that one word switch would only have a 1/4096
  // chance of getting an equivelant hash.

  return words.map(function (word) {
    return hash64(word).substr(0, 2);
  }).join('');
};

exports.getWordsHash = getWordsHash;

var getWordHashes = function getWordHashes(_ref7) {
  var usfm = _ref7.usfm,
      wordDividerRegex = _ref7.wordDividerRegex;
  var words = (0, _splitting.splitVerseIntoWords)({
    usfm: usfm,
    wordDividerRegex: wordDividerRegex
  });
  return words.map(function (word, index) {
    return {
      wordNumberInVerse: index + 1,
      hash: hash64(word),
      withBeforeHash: hash64(JSON.stringify(words.slice(index === 0 ? 0 : index - 1, index + 1))),
      withAfterHash: hash64(JSON.stringify(words.slice(index, index + 2))),
      withBeforeAndAfterHash: hash64(JSON.stringify(words.slice(index === 0 ? 0 : index - 1, index + 2)))
    };
  });
};

exports.getWordHashes = getWordHashes;

var isValidEmail = function isValidEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

exports.isValidEmail = isValidEmail;