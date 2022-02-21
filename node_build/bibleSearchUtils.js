"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripVocalOfAccents = exports.stripHebrewVowelsEtc = exports.stripGreekAccents = exports.isValidBibleSearch = exports.getQueryAndFlagInfo = exports.getInfoOnResultLocs = exports.getGrammarDetailsForAutoCompletionSuggestions = exports.getFlagSuggestions = exports.findAutoCompleteSuggestions = exports.escapeRegex = exports.containsHebrewChars = exports.containsGreekChars = exports.completeQueryGroupings = void 0;

require("regenerator-runtime/runtime.js");

var _bibletagsVersification = require("@bibletags/bibletags-versification");

var _index = require("./index");

var _constants = require("./constants");

var _utils = require("./utils");

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

var stripGreekAccents = function stripGreekAccents(str) {
  var mappings = {
    "α": /[ἀἁἂἃἄἅἆἇάὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ]/g,
    "Α": /[ἈἉἊἋἌἍἎἏΆᾈᾉᾊᾋᾌᾍᾎᾏᾸᾹᾺΆᾼ]/g,
    "ε": /[ἐἑἒἓἔἕέὲέ]/g,
    "Ε": /[ἘἙἚἛἜἝῈΈΈ]/g,
    "η": /[ἠἡἢἣἤἥἦἧὴήᾐᾑᾒᾓᾔᾕᾖᾗῂῃῄῆῇή]/g,
    "Η": /[ἨἩἪἫἬἭἮἯᾘᾙᾚᾛᾜᾝᾞᾟῊΉῌΉ]/g,
    "ι": /[ἰἱἲἳἴἵἶἷὶίῐῑῒΐῖῗΐίϊ]/g,
    "Ι": /[ἸἹἺἻἼἽἾἿῚΊῘῙΊΪ]/g,
    "ο": /[ὀὁὂὃὄὅὸόό]/g,
    "Ο": /[ὈὉὊὋὌὍῸΌΌ]/g,
    "υ": /[ὐὑὒὓὔὕὖὗὺύῠῡῢΰῦῧΰύϋ]/g,
    "Υ": /[ὙὛὝὟῨῩῪΎΎΫ]/g,
    "ω": /[ὠὡὢὣὤὥὦὧὼώᾠᾡᾢᾣᾤᾥᾦᾧῲῳῴῶῷώ]/g,
    "Ω": /[ὨὩὪὫὬὭὮὯᾨᾩᾪᾫᾬᾭᾮᾯῺΏῼΏ]/g,
    "ρ": /[ῤῥ]/g,
    "Ρ": /[Ῥ]/g,
    "": /[῞ʹ͵΄᾽᾿῍῎῏῝῞῟῭΅`΅´῾῀῁]/g
  };
  Object.keys(mappings).forEach(function (_char) {
    str = str.replace(mappings[_char], _char);
  });
  return str;
};

exports.stripGreekAccents = stripGreekAccents;

var stripHebrewVowelsEtc = function stripHebrewVowelsEtc(str) {
  return str.replace(/[\u05B0-\u05BC\u05C1\u05C2\u05C4]/g, '') // vowels
  .replace(/[\u0591-\u05AF\u05A5\u05BD\u05BF\u05C5\u05C7]/g, '') // cantilation
  .replace(/\u200D/g, '') // invalid character
  ;
};

exports.stripHebrewVowelsEtc = stripHebrewVowelsEtc;

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
  Object.keys(mappings).forEach(function (_char2) {
    str = str.replace(mappings[_char2], _char2);
  });
  return str;
};

exports.stripVocalOfAccents = stripVocalOfAccents;

var getInfoOnResultLocs = function getInfoOnResultLocs(_ref) {
  var resultsNeedingUsfm = _ref.resultsNeedingUsfm,
      lookupVersionInfo = _ref.lookupVersionInfo;
  var versionResultsNeedingUsfmByLoc = {};
  var locs = resultsNeedingUsfm.map(function (_ref2) {
    var originalLoc = _ref2.originalLoc,
        versionResults = _ref2.versionResults;

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

var getQueryAndFlagInfo = function getQueryAndFlagInfo(_ref3) {
  var query = _ref3.query,
      _ref3$FLAG_MAP = _ref3.FLAG_MAP,
      FLAG_MAP = _ref3$FLAG_MAP === void 0 ? {} : _ref3$FLAG_MAP;
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

var findAutoCompleteSuggestions = function findAutoCompleteSuggestions(_ref4) {
  var str = _ref4.str,
      suggestionOptions = _ref4.suggestionOptions,
      max = _ref4.max;
  var matchingSuggestions = [];
  var lowerCaseStr = str.toLowerCase();

  var _lowerCaseStr$match = lowerCaseStr.match(/^(.*?[#:]?)([^#:]*)$/),
      _lowerCaseStr$match2 = _slicedToArray(_lowerCaseStr$match, 3),
      x = _lowerCaseStr$match2[0],
      lowerCaseStrBase = _lowerCaseStr$match2[1],
      lowerCaseStrFinalDetail = _lowerCaseStr$match2[2];

  var lowerCaseStrFinalDetailWords = lowerCaseStrFinalDetail.split(/[-–— ]/g); // no mistakes, same order first

  var _iterator = _createForOfIteratorHelper(suggestionOptions),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var suggestionOption = _step.value;

      if (suggestionOption.suggestedQuery.toLowerCase().indexOf(lowerCaseStr) === 0) {
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
    var _iterator2 = _createForOfIteratorHelper(suggestionOptions),
        _step2;

    try {
      var _loop = function _loop() {
        var suggestionOption = _step2.value;

        var _suggestionOption$sug = suggestionOption.suggestedQuery.toLowerCase().match(/^(.*?[#:]?)([^#:]*)$/),
            _suggestionOption$sug2 = _slicedToArray(_suggestionOption$sug, 3),
            x = _suggestionOption$sug2[0],
            suggestionOptionBase = _suggestionOption$sug2[1],
            suggestionOptionFinalDetail = _suggestionOption$sug2[2];

        var suggestionOptionFinalDetailWords = suggestionOptionFinalDetail.split(/[-–— ]/g);

        if (lowerCaseStrBase === suggestionOptionBase && lowerCaseStrFinalDetailWords.every(function (strWord) {
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
    var _iterator3 = _createForOfIteratorHelper(suggestionOptions),
        _step3;

    try {
      var _loop2 = function _loop2() {
        var suggestionOption = _step3.value;

        var _suggestionOption$sug3 = suggestionOption.suggestedQuery.toLowerCase().match(/^(.*?[#:]?)([^#:]*)$/),
            _suggestionOption$sug4 = _slicedToArray(_suggestionOption$sug3, 3),
            x = _suggestionOption$sug4[0],
            suggestionOptionBase = _suggestionOption$sug4[1],
            suggestionOptionFinalDetail = _suggestionOption$sug4[2];

        var suggestionOptionFinalDetailWords = suggestionOptionFinalDetail.split(/[-–— ]/g);
        var finalWordInFinalDetail = lowerCaseStrFinalDetailWords[lowerCaseStrFinalDetailWords.length - 1];

        if (lowerCaseStrBase === suggestionOptionBase && lowerCaseStrFinalDetailWords.slice(0, -1).every(function (strWord) {
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

var isValidBibleSearch = function isValidBibleSearch(_ref5) {
  var query = _ref5.query;
  var queryWordsOrConnectors = query.split(/[ ()"]/g); // valid use of #

  if (queryWordsOrConnectors.some(function (wordOrConnector) {
    return /[^#=].*?[#=]|[#=].*?[#=]/.test(wordOrConnector);
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
  var searchTextWithoutCurrentWord = searchTextPieces.join(' ');
  normalizedSearchText = normalizedSearchText.trim();
  var type = currentPiece.split(':')[0];
  var suggestedQueryOptions = [];
  var containsHebrew = containsHebrewChars(searchTextInComposition) || /#H[0-9]{5}/.test(searchTextInComposition);
  var containsGreek = containsGreekChars(searchTextInComposition) || /#G[0-9]{5}/.test(searchTextInComposition);

  if (type === 'in') {
    // in:[range]/[versionId]
    var testament = containsHebrew && !containsGreek && 'ot' || !containsHebrew && containsGreek && 'nt' || 'both';
    suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray([].concat(_toConsumableArray(versionAbbrsForIn), _toConsumableArray(_index.bibleSearchScopeKeysByTestament[testament])).map(function (val) {
      return "".concat(searchTextWithoutCurrentWord, " in:").concat(val);
    })));
  } else if ('include'.indexOf(type) === 0) {
    // include:variants/[versionId]
    suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray(['variants'].concat(_toConsumableArray(versionAbbrsForInclude)).map(function (val) {
      return "".concat(searchTextWithoutCurrentWord, " include:").concat(val);
    })));
  } else if (!containsHebrew && !containsGreek) {
    // type === 'same'
    // same:[scope]
    suggestedQueryOptions.push.apply(suggestedQueryOptions, _toConsumableArray(['phrase', 'verse', 'sentence', 'paragraph'].map(function (val) {
      return "".concat(searchTextWithoutCurrentWord, " same:").concat(val);
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
  // eg. if it already has #noun in the word, then don't present aspect options
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