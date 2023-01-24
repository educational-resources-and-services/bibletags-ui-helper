"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripVocalOfAccents = exports.stripHebrewVowelsEtc = exports.removeCantillation = exports.normalizeSearchStr = exports.isValidBibleSearch = exports.getSuggestedInflectedSearch = exports.getQueryAndFlagInfo = exports.getInfoOnResultLocs = exports.getGrammarDetailsForAutoCompletionSuggestions = exports.getFlagSuggestions = exports.getConcentricCircleScopes = exports.findAutoCompleteSuggestions = exports.escapeRegex = exports.containsHebrewChars = exports.containsGreekChars = exports.completeQueryGroupings = void 0;

require("regenerator-runtime/runtime.js");

var _bibletagsVersification = require("@bibletags/bibletags-versification");

var _i18n = _interopRequireDefault(require("./i18n"));

var _index = require("./index");

var _constants = require("./constants");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var containsHebrewChars = function containsHebrewChars(text) {
  return /[\u0590-\u05FF]/.test(text);
};

exports.containsHebrewChars = containsHebrewChars;

var containsGreekChars = function containsGreekChars(text) {
  return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
};

exports.containsGreekChars = containsGreekChars;

var removeCantillation = function removeCantillation(usfm) {
  return usfm.replace(/[\u0591-\u05AF\u05A5\u05BD\u05BF\u05C0\u05C5\u05C7]/g, '');
};

exports.removeCantillation = removeCantillation;

var stripHebrewVowelsEtc = function stripHebrewVowelsEtc(str) {
  return removeCantillation(str.replace(/[\u05B0-\u05BC\u05C1\u05C2\u05C4]/g, '') // vowels
  .replace(/(?:שׁ|שׂ|שׁ|שׂ)/g, 'ש') // sin an shin
  .replace(/\u200D/g, '') // invalid character
  );
};

exports.stripHebrewVowelsEtc = stripHebrewVowelsEtc;

var normalizeSearchStr = function normalizeSearchStr(_ref) {
  var _ref$str = _ref.str,
      str = _ref$str === void 0 ? "" : _ref$str,
      languageId = _ref.languageId;
  // languageId should NOT be set when (1) this is an original language search, or (2) this is a non-version-specific search (e.g. common queries, projects, etc)
  // see the "Languages with letters containing diacritics" heading here: https://en.wikipedia.org/wiki/Diacritic
  // see also https://www.liquisearch.com/diacritic/languages_with_letters_containing_diacritics
  // see also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  // IMPORTANT: when making changes to this, be sure to only use composed characters by running each array through ary.map(a => a.normalize('NFC'))
  var distinctCharsByLanguageId = {
    lav: ['ā', 'ē', 'ī', 'ū', 'č', 'ģ', 'ķ', 'ļ', 'ņ', 'š', 'ž'],
    lit: ['č', 'š', 'ž', 'ą', 'ę', 'į', 'ų', 'ū', 'ė']
  };
  var distinctChars = distinctCharsByLanguageId[languageId] || [];
  return stripHebrewVowelsEtc(str) // normalize
  .normalize('NFC') // split in order to remove all diacritics expect those in distinctChar, then rejoin
  .split(distinctChars.length === 0 ? /(.*)/g : new RegExp("(".concat(distinctChars.join('|'), ")"), 'gi')).map(function (partialStr) {
    return distinctChars.includes(partialStr) ? partialStr : partialStr.normalize('NFD').replace(/[\u0300-\u036f]/g, "").normalize('NFC') // remove diacritics
    ;
  }).join('') // Next line uses toLocaleLowerCase (and not toLowerCase) for languages with two i letters--one dotted and one undotted (https://en.wikipedia.org/wiki/%C4%B0)
  .toLocaleLowerCase(languageId) // clean up
  .replace(/  +/g, ' ').trim();
};

exports.normalizeSearchStr = normalizeSearchStr;

var stripVocalOfAccents = function stripVocalOfAccents(str) {
  var mappings = {
    "a": /[âăáà]/g,
    "e": /[êᵉĕḗēé]/g,
    "i": /[îḯíïì]/g,
    "o": /[óôŏṓō]/g,
    "u": /[ûú]/g,
    "s": /[ˢç]/g,
    "t": /[ṭ]/g,
    "y": /[ýÿŷ]/g,
    "": /[ʻʼʻ]/g
  };
  str = str.toLowerCase();
  Object.keys(mappings).forEach(function (_char) {
    str = str.replace(mappings[_char], _char);
  });
  return str;
};

exports.stripVocalOfAccents = stripVocalOfAccents;

var getInfoOnResultLocs = function getInfoOnResultLocs(_ref2) {
  var resultsNeedingUsfm = _ref2.resultsNeedingUsfm,
      lookupVersionInfo = _ref2.lookupVersionInfo;
  var versionResultsNeedingUsfmByLoc = {};
  var locs = resultsNeedingUsfm.map(function (_ref3) {
    var originalLoc = _ref3.originalLoc,
        versionResults = _ref3.versionResults;

    var _originalLoc$split = originalLoc.split('-'),
        _originalLoc$split2 = _slicedToArray(_originalLoc$split, 2),
        originalFromLoc = _originalLoc$split2[0],
        originalToLoc = _originalLoc$split2[1];

    var originalLocsForThisResult = !originalToLoc || originalFromLoc === originalToLoc ? [originalFromLoc] : (0, _bibletagsVersification.getOriginalLocsFromRange)(originalFromLoc, originalToLoc);
    var locsForThisResult = originalLocsForThisResult.map(function (originalLoc) {
      var refs = (0, _bibletagsVersification.getCorrespondingRefs)({
        baseVersion: {
          info: {
            versificationModel: 'original'
          },
          ref: (0, _bibletagsVersification.getRefFromLoc)(originalLoc)
        },
        lookupVersionInfo: lookupVersionInfo
      });
      if (!refs) return [];
      var locs = refs.map(function (ref) {
        return (0, _bibletagsVersification.getLocFromRef)(ref).split(':')[0];
      });
      locs.forEach(function (loc) {
        versionResultsNeedingUsfmByLoc[loc] = versionResults;
      });
      return locs;
    }).flat();
    return locsForThisResult;
  }).flat();
  return {
    locs: locs,
    versionResultsNeedingUsfmByLoc: versionResultsNeedingUsfmByLoc
  };
};

exports.getInfoOnResultLocs = getInfoOnResultLocs;

var getQueryAndFlagInfo = function getQueryAndFlagInfo(_ref4) {
  var query = _ref4.query,
      _ref4$FLAG_MAP = _ref4.FLAG_MAP,
      FLAG_MAP = _ref4$FLAG_MAP === void 0 ? {} : _ref4$FLAG_MAP;
  // extract special query flags
  var flags = {};
  var flagRegex = /(\s|^)([-a-z]+:(?:[:-\w,/]+))(?=\s|$)/i;
  query = (query || "").split(flagRegex).filter(function (piece) {
    if (flagRegex.test(piece)) {
      var _piece$split = piece.split(':'),
          _piece$split2 = _toArray(_piece$split),
          flag = _piece$split2[0],
          flagValuePieces = _piece$split2.slice(1);

      var flagValue = flagValuePieces.join(':');

      if (FLAG_MAP[flag]) {
        var _FLAG_MAP$flag = FLAG_MAP[flag],
            multiValue = _FLAG_MAP$flag.multiValue,
            possibleValues = _FLAG_MAP$flag.possibleValues;
        var flagValues = flagValue.split(/[\/,]/g);

        if (!possibleValues || flagValues.every(function (val) {
          return val instanceof RegExp ? val.test(val) : val.includes(val);
        })) {
          if (flags[flag] && multiValue) {
            var _flags$flag;

            (_flags$flag = flags[flag]).push.apply(_flags$flag, _toConsumableArray(flagValues));
          } else {
            flags[flag] = multiValue ? flagValues : flagValue;
          }

          return false;
        }
      }
    }

    return true;
  }).join('').replace(/  +/g, ' ').trim();
  return {
    query: query,
    flags: flags
  };
};

exports.getQueryAndFlagInfo = getQueryAndFlagInfo;

var findAutoCompleteSuggestions = function findAutoCompleteSuggestions(_ref5) {
  var str = _ref5.str,
      suggestionOptions = _ref5.suggestionOptions,
      max = _ref5.max;
  var matchingSuggestions = [];
  var normalizedStr = normalizeSearchStr({
    str: str
  });

  var _normalizedStr$match = normalizedStr.match(/^(.*?[#:]?)([^#:]*)$/),
      _normalizedStr$match2 = _slicedToArray(_normalizedStr$match, 3),
      x = _normalizedStr$match2[0],
      normalizedStrBase = _normalizedStr$match2[1],
      normalizedStrFinalDetail = _normalizedStr$match2[2];

  var normalizedStrFinalDetailWords = normalizedStrFinalDetail.split(/[-–— ]/g); // no mistakes, same order first

  var _iterator = _createForOfIteratorHelper(suggestionOptions),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var suggestionOption = _step.value;

      if (normalizeSearchStr({
        str: suggestionOption.suggestedQuery
      }).indexOf(normalizedStr) === 0) {
        matchingSuggestions.push(suggestionOption);
      }

      if (matchingSuggestions.length >= max) break;
    } // all words exist in full or in part (matching from the beginnings)

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (matchingSuggestions.length < max) {
    var remainingSuggestionOptions = suggestionOptions.filter(function (suggestionOption) {
      return !matchingSuggestions.includes(suggestionOption);
    });

    var _iterator2 = _createForOfIteratorHelper(remainingSuggestionOptions),
        _step2;

    try {
      var _loop = function _loop() {
        var suggestionOption = _step2.value;

        var _normalizeSearchStr$m = normalizeSearchStr({
          str: suggestionOption.suggestedQuery
        }).match(/^(.*?[#:]?)([^#:]*)$/),
            _normalizeSearchStr$m2 = _slicedToArray(_normalizeSearchStr$m, 3),
            x = _normalizeSearchStr$m2[0],
            suggestionOptionBase = _normalizeSearchStr$m2[1],
            suggestionOptionFinalDetail = _normalizeSearchStr$m2[2];

        var suggestionOptionFinalDetailWords = suggestionOptionFinalDetail.split(/[-–— ]/g);

        if (normalizedStrBase === suggestionOptionBase && normalizedStrFinalDetailWords.every(function (strWord) {
          return suggestionOptionFinalDetailWords.some(function (optWord) {
            return optWord.indexOf(strWord) === 0;
          });
        })) {
          matchingSuggestions.push(suggestionOption);
        }

        if (matchingSuggestions.length >= max) return "break";
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _ret = _loop();

        if (_ret === "break") break;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } // look for hits with correct first letter in last word + up to one mistake (missing/added/alt char)


  if (matchingSuggestions.length < max) {
    var _remainingSuggestionOptions = suggestionOptions.filter(function (suggestionOption) {
      return !matchingSuggestions.includes(suggestionOption);
    });

    var _iterator3 = _createForOfIteratorHelper(_remainingSuggestionOptions),
        _step3;

    try {
      var _loop2 = function _loop2() {
        var suggestionOption = _step3.value;

        var _normalizeSearchStr$m3 = normalizeSearchStr({
          str: suggestionOption.suggestedQuery
        }).match(/^(.*?[#:]?)([^#:]*)$/),
            _normalizeSearchStr$m4 = _slicedToArray(_normalizeSearchStr$m3, 3),
            x = _normalizeSearchStr$m4[0],
            suggestionOptionBase = _normalizeSearchStr$m4[1],
            suggestionOptionFinalDetail = _normalizeSearchStr$m4[2];

        var suggestionOptionFinalDetailWords = suggestionOptionFinalDetail.split(/[-–— ]/g);
        var finalWordInFinalDetail = normalizedStrFinalDetailWords[normalizedStrFinalDetailWords.length - 1];

        if (normalizedStrBase === suggestionOptionBase && normalizedStrFinalDetailWords.slice(0, -1).every(function (strWord) {
          return suggestionOptionFinalDetailWords.some(function (optWord) {
            return optWord.indexOf(strWord) === 0;
          });
        }) && suggestionOptionFinalDetailWords.some(function (optWord) {
          if (optWord[0] !== finalWordInFinalDetail[0]) return false;
          var i1 = 1;
          var i2 = 1;
          var foundDifference = false;

          while (finalWordInFinalDetail[i1]) {
            if (finalWordInFinalDetail[i1] !== optWord[i2]) {
              if (foundDifference) return false; // two differences means it is not a match

              foundDifference = true;

              if (finalWordInFinalDetail[i1 + 1] === optWord[i2]) {
                i1++;
              } else if (finalWordInFinalDetail[i1] === optWord[i2 + 1]) {
                i2++;
              }
            }

            i1++;
            i2++;
          }

          return true;
        })) {
          matchingSuggestions.push(suggestionOption);
        }

        if (matchingSuggestions.length >= max) return "break";
      };

      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _ret2 = _loop2();

        if (_ret2 === "break") break;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  return matchingSuggestions;
};

exports.findAutoCompleteSuggestions = findAutoCompleteSuggestions;

var isValidBibleSearch = function isValidBibleSearch(params) {
  // should be object with `query` key
  var _getQueryAndFlagInfo = getQueryAndFlagInfo(_objectSpread(_objectSpread({}, params), {}, {
    FLAG_MAP: _constants.bibleSearchFlagMap
  })),
      query = _getQueryAndFlagInfo.query; // get rid of the flags


  var queryWordsOrConnectors = query.split(/[ ()"]/g); // valid use of #

  if (queryWordsOrConnectors.some(function (wordOrConnector) {
    return /(?:[#=]{2}|#.*?=|=.*?#|[#=]$)/.test(wordOrConnector);
  })) return false;
  if (queryWordsOrConnectors.includes('#')) return false; // validate strongs

  if ((query.match(/#[HG][0-9]/g) || []).length !== (query.match(/#[HG][0-9]{5}(?=[# ")]|$)/g) || []).length) return false;
  if (queryWordsOrConnectors.some(function (wordOrConnector) {
    return (wordOrConnector.match(/#[HG][0-9]{5}(?=[# ")]|$)/g) || []).length >= 2;
  })) return false; // no double-strongs in one word like #H12345#H23456
  // validate flags
  // TODO
  // validate groupings+

  try {
    (0, _utils.getQueryArrayAndWords)(query);
  } catch (err) {
    return false;
  }

  return true;
};

exports.isValidBibleSearch = isValidBibleSearch;

var completeQueryGroupings = function completeQueryGroupings(query) {
  if ((query.match(/"/g) || []).length % 2 === 1) {
    query += '"';
  }

  query = query.replace(/""$/, '');
  var numLeftParens = (query.match(/\(/g) || []).length;
  var numRightParens = (query.match(/\)/g) || []).length;

  if (numLeftParens > numRightParens) {
    query += Array(numLeftParens - numRightParens).fill(')').join('');
  }

  while (/\(\)/.test(query)) {
    query = query.replace(/\(\)/g, '');
  }

  return query;
};

exports.completeQueryGroupings = completeQueryGroupings;

var getFlagSuggestions = function getFlagSuggestions(_ref6) {
  var searchTextInComposition = _ref6.searchTextInComposition,
      _ref6$versionAbbrsFor = _ref6.versionAbbrsForIn,
      versionAbbrsForIn = _ref6$versionAbbrsFor === void 0 ? [] : _ref6$versionAbbrsFor,
      _ref6$versionAbbrsFor2 = _ref6.versionAbbrsForInclude,
      versionAbbrsForInclude = _ref6$versionAbbrsFor2 === void 0 ? [] : _ref6$versionAbbrsFor2,
      _ref6$max = _ref6.max,
      max = _ref6$max === void 0 ? 3 : _ref6$max;
  var normalizedSearchText = searchTextInComposition.replace(/  +/g, ' ').replace(/^ /g, '');
  var searchTextPieces = normalizedSearchText.split(' ');
  var currentPiece = searchTextPieces.pop();
  var searchTextWithoutCurrentPiece = searchTextPieces.join(' ');
  normalizedSearchText = normalizedSearchText.trim();

  var _currentPiece$split = currentPiece.split(':'),
      _currentPiece$split2 = _slicedToArray(_currentPiece$split, 2),
      type = _currentPiece$split2[0],
      _currentPiece$split2$ = _currentPiece$split2[1],
      currentValue = _currentPiece$split2$ === void 0 ? '' : _currentPiece$split2$;

  var currentValueUpToLastComma = currentValue.replace(/^((?:.*,)?)[^,]*$/, '$1');
  var valuesAlreadyUsed = currentValueUpToLastComma.split(',').filter(Boolean);
  var suggestedQueryOptions = [];
  var containsHebrew = containsHebrewChars(searchTextInComposition) || /#H[0-9]{5}/.test(searchTextInComposition);
  var containsGreek = containsGreekChars(searchTextInComposition) || /#G[0-9]{5}/.test(searchTextInComposition);

  if (type === 'in') {
    // in:[range]/[versionId]
    var testament = containsHebrew && !containsGreek && 'ot' || !containsHebrew && containsGreek && 'nt' || 'both';

    if (valuesAlreadyUsed.length > 0) {
      var arrayToUse = versionAbbrsForIn.includes(valuesAlreadyUsed[0]) ? versionAbbrsForIn : _index.bibleSearchScopeKeysByTestament[testament];
      suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray(arrayToUse.filter(function (val) {
        return !valuesAlreadyUsed.includes(val);
      }).map(function (val) {
        return "".concat(searchTextWithoutCurrentPiece, " in:").concat(currentValueUpToLastComma).concat(val);
      })));
    } else {
      suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray([].concat(_toConsumableArray(versionAbbrsForIn), _toConsumableArray(_index.bibleSearchScopeKeysByTestament[testament])).map(function (val) {
        return "".concat(searchTextWithoutCurrentPiece, " in:").concat(val);
      })));
    }
  } else if ('include'.indexOf(type) === 0) {
    // include:variants/[versionId]
    var includeArray = ['variants'];

    if (valuesAlreadyUsed.length > 0) {
      var _arrayToUse = versionAbbrsForInclude.includes(valuesAlreadyUsed[0]) ? versionAbbrsForInclude : includeArray;

      suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray(_arrayToUse.filter(function (val) {
        return !valuesAlreadyUsed.includes(val);
      }).map(function (val) {
        return "".concat(searchTextWithoutCurrentPiece, " include:").concat(currentValueUpToLastComma).concat(val);
      })));
    } else {
      suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray([].concat(includeArray, _toConsumableArray(versionAbbrsForInclude)).filter(function (val) {
        return !valuesAlreadyUsed.includes(val);
      }).map(function (val) {
        return "".concat(searchTextWithoutCurrentPiece, " include:").concat(val);
      })));
    }
  } else if (!containsHebrew && !containsGreek) {
    // type === 'same'
    // same:[scope]
    suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray(['phrase', 'verse', 'sentence', 'paragraph'].map(function (val) {
      return "".concat(searchTextWithoutCurrentPiece, " same:").concat(val);
    })));
  }

  return findAutoCompleteSuggestions({
    str: normalizedSearchText,
    suggestionOptions: suggestedQueryOptions.map(function (suggestedQuery) {
      return {
        from: "search-flag",
        suggestedQuery: suggestedQuery
      };
    }),
    max: max
  });
};

exports.getFlagSuggestions = getFlagSuggestions;

var getGrammarDetailsForAutoCompletionSuggestions = function getGrammarDetailsForAutoCompletionSuggestions(_ref7) {
  var currentWord = _ref7.currentWord,
      normalizedSearchText = _ref7.normalizedSearchText;
  // TODO: set up with i18n for grammatical details
  // TODO: use currentWord to weed out items that are not really options
  // e.g. if it already has #noun in the word, then don't present aspect options
  // TODO: use searchTextInComposition to see if we should only do Hebrew grammar or only do Greek grammar
  var details = Object.keys(_constants.grammaticalDetailMap);
  details.push("#sh", "#h", "#h!", "#h'", "#h?", "#h->", "#h^", "#n^");
  details = details.filter(function (detail) {
    return !new RegExp("#".concat(escapeRegex(detail), "(?:[# \")]|$)")).test(currentWord);
  });
  details = [].concat(_toConsumableArray(details), _toConsumableArray(details.map(function (detail) {
    return "not:".concat(detail);
  })));
  return details;
};

exports.getGrammarDetailsForAutoCompletionSuggestions = getGrammarDetailsForAutoCompletionSuggestions;

var escapeRegex = function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

exports.escapeRegex = escapeRegex;

var getConcentricCircleScopes = function getConcentricCircleScopes(bookId) {
  var scopeLabels = {
    ot: (0, _i18n["default"])("Old Testament"),
    "ot-narrative": (0, _i18n["default"])("OT Narrative Books"),
    "ot-poetic": (0, _i18n["default"])("OT Poetic Books"),
    "ot-prophetic": (0, _i18n["default"])("OT Prophetic Books"),
    law: (0, _i18n["default"])("Pentateuch"),
    history: (0, _i18n["default"])("Joshua–Esther"),
    nt: (0, _i18n["default"])("New Testament"),
    "nt-narrative": (0, _i18n["default"])("NT Narrative Books"),
    "lukes-writings": (0, _i18n["default"])("Luke’s Writings"),
    "johns-writings": (0, _i18n["default"])("John’s Writings"),
    "pauls-writings": (0, _i18n["default"])("Paul’s Writings"),
    gospels: (0, _i18n["default"])("Gospels"),
    epistles: (0, _i18n["default"])("Epistles")
  };
  var scopeSets = [{
    bookIds: ["1-5"],
    scopes: ["law", "ot-narrative", "ot"]
  }, {
    bookIds: ["6-17"],
    scopes: ["history", "ot-narrative", "ot"]
  }, {
    bookIds: ["18-22", 25],
    scopes: ["ot-poetic", "ot"]
  }, {
    bookIds: [23, 24],
    scopes: ["ot-prophetic", "ot"]
  }, {
    bookIds: ["26-39"],
    scopes: ["ot-prophetic", "ot"]
  }, {
    bookIds: [40, 41],
    scopes: ["gospels", "nt-narrative", "nt"]
  }, {
    bookIds: [42],
    scopes: ["lukes-writings", "gospels", "nt-narrative", "nt"]
  }, {
    bookIds: [43],
    scopes: ["johns-writings", "gospels", "nt-narrative", "nt"]
  }, {
    bookIds: [44],
    scopes: ["lukes-writings", "nt-narrative", "nt"]
  }, {
    bookIds: ["45-58"],
    scopes: ["pauls-writings", "epistles", "nt"]
  }, {
    bookIds: [59],
    scopes: ["epistles", "nt"]
  }, {
    bookIds: [60, 61],
    scopes: ["peters-writings", "epistles", "nt"]
  }, {
    bookIds: ["62-65"],
    scopes: ["johns-writings", "epistles", "nt"]
  }, {
    bookIds: [66],
    scopes: ["johns-writings", "nt"]
  }];
  var scopesWithLabels = [];
  scopeSets.some(function (_ref8) {
    var bookIds = _ref8.bookIds,
        scopes = _ref8.scopes;
    bookIds = bookIds.map(function (strOrInt) {
      if (typeof strOrInt === "string") {
        var _strOrInt$split$map = strOrInt.split('-').map(function (num) {
          return parseInt(num, 10);
        }),
            _strOrInt$split$map2 = _slicedToArray(_strOrInt$split$map, 2),
            from = _strOrInt$split$map2[0],
            to = _strOrInt$split$map2[1];

        return Array(to - from + 1).fill().map(function () {
          return from++;
        });
      }

      return strOrInt;
    }).flat();

    if (bookIds.includes(bookId)) {
      scopesWithLabels = scopes.map(function (scope) {
        return {
          label: scopeLabels[scope],
          scope: scope
        };
      });
      return true;
    }
  });
  return scopesWithLabels;
};

exports.getConcentricCircleScopes = getConcentricCircleScopes;

var getSuggestedInflectedSearch = function getSuggestedInflectedSearch(_ref9) {
  var morph = _ref9.morph,
      form = _ref9.form,
      lex = _ref9.lex,
      nakedStrongs = _ref9.nakedStrongs;
  if (!morph) return null;
  var grammaticalDetailKeyByMorphCode = {};

  var _loop3 = function _loop3(key) {
    ;
    (_constants.grammaticalDetailMap[key].detail || []).forEach(function (morphCode) {
      grammaticalDetailKeyByMorphCode[morphCode] = key;
    });
  };

  for (var key in _constants.grammaticalDetailMap) {
    _loop3(key);
  }

  var grammarDetailKeys = [];
  var label;
  morph.slice(3).split(':').some(function (partOfMorph, wordPartIdx) {
    if (/^(?:He|Ar)/.test(morph)) {
      if (/^(?:N[cg]|A[aco])[^:]{2}/.test(partOfMorph)) {
        if (/^A/.test(partOfMorph)) {
          grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["gender:".concat(partOfMorph[2])]);
        }

        grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["number:".concat(partOfMorph[3])]);
        return true;
      } else if (["H19310", "H08593"].includes(nakedStrongs)) {
        grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["gender:".concat(partOfMorph[3])]);
        return true;
      } else if (/^V[^:]{2}/.test(partOfMorph)) {
        grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["stem:".concat(morph[0]).concat(partOfMorph[1])]);
        return true;
      }
    } else {
      // Greek
      if (/^[NAPR].{5}[^,]/.test(partOfMorph)) {
        grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["person:".concat(partOfMorph[5])]);
        grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["case:".concat(partOfMorph[6])]);
        grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["gender:".concat(partOfMorph[7])]);
        grammarDetailKeys.push(grammaticalDetailKeyByMorphCode["number:".concat(partOfMorph[8])]);
        label = /^P/.test(partOfMorph) ? (0, _i18n["default"])("Search {{word}} with the {{case}}", {
          word: lex,
          "case": grammarDetailKeys[1]
        }) : (0, _i18n["default"])("Search inflected: {{form}}", {
          form: form
        });
        return true;
      }
    }
  });
  var searchAddOn = grammarDetailKeys.filter(Boolean).map(function (key) {
    return "#".concat(key);
  }).join('');
  if (!searchAddOn) return null;
  return {
    searchText: "#".concat(nakedStrongs).concat(searchAddOn),
    label: label || (0, _i18n["default"])("Search {{grammatical_details}} of {{word}}", {
      grammatical_details: _utils.combineItems.apply(void 0, _toConsumableArray(searchAddOn.slice(1).split('#'))),
      word: lex
    })
  };
};

exports.getSuggestedInflectedSearch = getSuggestedInflectedSearch;