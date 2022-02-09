"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAndUniquifyArraysOfScopeKeys = exports.getWordDetails = exports.getQueryArrayAndWords = exports.clock = void 0;

var _constants = require("./constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mergeAndUniquifyArraysOfScopeKeys = function mergeAndUniquifyArraysOfScopeKeys() {
  // NOTE: Built to be as fast as possible on large arrays
  var findSmallestScopeKey = function findSmallestScopeKey(scopeKeys) {
    if (scopeKeys.length === 0) return scopeKeys[0];
    var smallestScopeKey, smallestPart1, smallestPart2;
    scopeKeys.forEach(function (scopeKey) {
      var _scopeKey$split$map = scopeKey.split(/[-:]/g).map(function (part) {
        return parseInt(part, 10);
      }),
          _scopeKey$split$map2 = _slicedToArray(_scopeKey$split$map, 2),
          part1 = _scopeKey$split$map2[0],
          _scopeKey$split$map2$ = _scopeKey$split$map2[1],
          part2 = _scopeKey$split$map2$ === void 0 ? 0 : _scopeKey$split$map2$;

      if (!smallestScopeKey || part1 < smallestPart1 || part1 === smallestPart1 && part2 < smallestPart2) {
        smallestPart1 = part1;
        smallestPart2 = part2;
        smallestScopeKey = scopeKey;
      }
    });
    return smallestScopeKey;
  };

  var merged = [];

  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  var indexes = Array(arrays.length).fill(0);

  var _loop = function _loop() {
    var nextValue = findSmallestScopeKey(arrays.map(function (array, idx) {
      return indexes[idx] >= array.length ? '99999999' : array[indexes[idx]];
    }));
    if (nextValue === '99999999') return "break";
    merged.push(nextValue);
    arrays.forEach(function (array, idx) {
      while (array[indexes[idx]] === nextValue) {
        indexes[idx]++;
      }
    });
  };

  while (true) {
    var _ret = _loop();

    if (_ret === "break") break;
  }

  return merged;
};

exports.mergeAndUniquifyArraysOfScopeKeys = mergeAndUniquifyArraysOfScopeKeys;

var getQueryArrayAndWords = function getQueryArrayAndWords(query) {
  try {
    // Example
    // query: `a b (c / "d* ... e" / ("(f "g h") ... i * (2+ j k l)" m))`
    // queryWords: ["a","b","c","d*","e","f","g","h","i","j","k","l","m"]
    // queryArray:
    // [
    //   "a",
    //   "b",
    //   [
    //     "1+",
    //     "c",
    //     [
    //       "\"",
    //       "d*",
    //       "...",
    //       "e",
    //     ],
    //     [
    //       [
    //         "\"",
    //         [
    //           "f",
    //           [
    //             "\"",
    //             "g",
    //             "h",
    //           ]
    //         ],
    //         "...",
    //         "i",
    //         "*",
    //         [
    //           "2+",
    //           "j",
    //           "k",
    //           "l"
    //         ],
    //       ],
    //       "m"
    //     ]
    //   ]
    // ]
    if (/[\\\[]#=…]/.test(query)) throw "illegal character(s) in search query";
    if (query.replace(/ \.\.\. /g, '').indexOf('.') !== -1) throw "illegal period(s) in search query";
    var queryWords = [];
    var queryArray = JSON.parse("[".concat(query // next line: put space around chinese and japanese characters to treat them as separate words
    .replace(/([\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f])/g, ' $1 ').replace(/"/g, ',"\\"",').replace(/([^ ()",\\]+)/g, '"$1"').replace(/\(\)]/g, "").replace(/ +/g, ",").replace(/,,+/g, ",").replace(/\(/g, "[").replace(/\)/g, "]"), "]").replace(/\[,/g, "[").replace(/,]/g, "]"));

    var furtherParseQueryArray = function furtherParseQueryArray(array) {
      // handle parentheses
      array.forEach(function (item, idx) {
        while (item instanceof Array && item.filter(function (i) {
          return i !== '"';
        }).length === 1) {
          // remove meaningless parenthesis
          array[idx] = item = item.filter(function (i) {
            return i !== '"';
          })[0];
        }

        if (item instanceof Array) {
          furtherParseQueryArray(item);
        }

        if (typeof item === 'string' && /^[^".+*]+[*+~]?$/.test(item) && item !== '/' && !queryWords.includes(item)) {
          queryWords.push(item);
        }
      }); // handle quotes

      var quoteIndexes = array.reduce(function (a, e, i) {
        return [].concat(_toConsumableArray(a), _toConsumableArray(e === '"' ? [i] : []));
      }, []);

      if (quoteIndexes.length === 2) {
        if (quoteIndexes[1] - quoteIndexes[0] === 2) {
          // single word is quoted, which is meaningless; removing quotation marks
          array.splice(quoteIndexes[1], 1);
          array.splice(quoteIndexes[0], 1);
        } else if (quoteIndexes[0] === 0 && quoteIndexes[1] === array.length - 1) {
          // no need to put it is subarray; just remove last quotation mark
          array.pop();
        } else {
          // move to subarray
          var quotedSection = array.splice(quoteIndexes[0], quoteIndexes[1] - quoteIndexes[0] + 1);
          array.splice(quoteIndexes[0], 0, quotedSection.slice(0, -1));
        }
      } else if (quoteIndexes.length !== 0) {
        throw "unmatching quotation marks";
      } // handle slashes


      var hasProperSlashesForOr = array.length > 1 && array.length % 2 === 1 && array.every(function (item, idx) {
        return idx % 2 === 0 || item === '/';
      }) && array[0] !== '"';

      if (hasProperSlashesForOr) {
        array.splice.apply(array, [0, array.length, '1+'].concat(_toConsumableArray(array.filter(function (i) {
          return i !== '/';
        }))));
      } else if (array.indexOf("/") !== -1) {
        throw "invalid slashes";
      } // check 2+ syntax


      if (array.some(function (item, idx) {
        return typeof item === 'string' && /^[0-9]+\+$/.test(item) && !(idx === 0 && parseInt(item.slice(0, -1), 10) < array.length - 1);
      })) throw "misuse of 2+"; // check * syntax

      if (array.some(function (item) {
        return typeof item === 'string' && /\*/.test(item) && !/^[^*]*\*$/.test(item);
      })) throw "misuse of *"; // check ..., * placement (cannot be at beginning/end or back-to-back)

      var ellipsisAndAsteriskIndexes = array.reduce(function (a, e, i) {
        return [].concat(_toConsumableArray(a), _toConsumableArray(['...', '*'].includes(e) ? [i] : []));
      }, []);
      if (ellipsisAndAsteriskIndexes[0] === 0 || ellipsisAndAsteriskIndexes.pop() === array.length - 1 || ellipsisAndAsteriskIndexes.some(function (arrayIdx, idx) {
        return arrayIdx === ellipsisAndAsteriskIndexes[idx - 1] + 1;
      })) throw "misplacement of ... or *"; // check ..., * only with exact segment

      if (array.find(function (item) {
        return ['*', '...'].includes(item);
      }) && array[0] !== '"') throw "* and ... can only be used within quotation marks";
    };

    furtherParseQueryArray(queryArray);
    if (queryWords.length === 0) throw "invalid query: no searchable words";
    return {
      queryArray: queryArray,
      queryWords: queryWords
    };
  } catch (e) {
    throw typeof e === 'string' ? e : "invalid groupings";
  }
};

exports.getQueryArrayAndWords = getQueryArrayAndWords;
var lastClockTime = 0;
var descriptionOfCurrentClockTimeSection = "";

var clock = function clock(descriptionOfNextSection) {
  var newClockTime = Date.now();

  if (descriptionOfCurrentClockTimeSection) {
    console.log(descriptionOfCurrentClockTimeSection, "".concat(newClockTime - lastClockTime, "ms"));
  }

  lastClockTime = newClockTime;
  descriptionOfCurrentClockTimeSection = descriptionOfNextSection;
};

exports.clock = clock;

var getWordDetails = function getWordDetails(_ref) {
  var queryWords = _ref.queryWords,
      isOriginalLanguageSearch = _ref.isOriginalLanguageSearch;
  var wordDetailsArray = [];
  var getWordNumbersMatchingAllWordDetails;

  if (isOriginalLanguageSearch) {
    var matchesAddlDetailsByWord = {};
    queryWords.forEach(function (word) {
      if (word[0] === '#') {
        var wordDetails = word.slice(1).split('#').map(function (rawDetail) {
          // convert form of details
          if (/^[GH][0-9]{5}$/.test(rawDetail)) {
            return {
              detail: "definitionId:".concat(rawDetail),
              matches: function matches(wordInfo) {
                return rawDetail[0] === wordInfo[4][0] // matches H or G
                && wordInfo[2] === parseInt(rawDetail.slice(1), 10) // int form of strongs number matches
                ;
              },
              avgRowSizeInKB: 7
            };
          } // TODO: all the parsing values need to be converted (eg. #noun => #pos:N)
          // TODO: This is wrong due to the reality of the / operator
          // if(/^suffix:/.test(rawDetail)) {
          //   return (
          //     rawDetail
          //       .split(':')[1]
          //       .split("/")
          //       .map(suffixOption => (
          //         suffixOption
          //           .split("")
          //           .map(suffixDetail => {
          //             let suffixType = "Person"
          //             if(/[msbc]/.test(suffixDetail)) {
          //               suffixType = "Gender"
          //             }
          //             if(/[spd]/.test(suffixDetail)) {
          //               suffixType = "Number"
          //             }
          //             return `suffix${suffixType}:${suffixDetail}`
          //           })
          //       ))
          //   )
          // }


          if (/^lemma:/.test(rawDetail)) {
            var lemma = rawDetail.split(':')[1];
            return {
              detail: rawDetail,
              matches: function matches(wordInfo) {
                return wordInfo[3] === lemma;
              },
              avgRowSizeInKB: 7
            };
          }

          if (/^form:/.test(rawDetail)) {
            var form = rawDetail.split(':')[1];
            return {
              detail: rawDetail,
              matches: function matches(wordInfo) {
                return wordInfo[1] === form;
              },
              avgRowSizeInKB: 5
            };
          }

          if (_constants.hebrewPrefixSuffixMap[rawDetail]) {
            return _constants.hebrewPrefixSuffixMap[rawDetail];
          }

          if (_constants.grammaticalDetailMap[rawDetail]) {
            return _constants.grammaticalDetailMap[rawDetail];
          }

          return {
            detail: rawDetail,
            matches: function matches(wordInfo) {
              return true;
            },
            avgRowSizeInKB: 1
          };
          throw "unknown search token detail: ".concat(rawDetail);
        }) // .flat(2)
        ; // extract the wordDetail with the fewest likely hits; the rest should be used in getWordNumbersMatchingAllWordDetails

        wordDetails.sort(function (a, b) {
          return a.avgRowSizeInKB > b.avgRowSizeInKB ? 1 : -1;
        });
        wordDetailsArray.push({
          word: word,
          primaryDetail: wordDetails[0].detail
        });

        matchesAddlDetailsByWord[word] = function (wordInfo) {
          return wordDetails.slice(1).every(function (_ref2) {
            var matches = _ref2.matches;
            return matches(wordInfo);
          });
        };
      } else if (word[0] === '=') {
        // TODO
        throw "\"Words translated to...\" search not yet available";
      } else {
        throw "Invalid search word: ".concat(word);
      }
    });

    getWordNumbersMatchingAllWordDetails = function getWordNumbersMatchingAllWordDetails(_ref3) {
      var word = _ref3.word,
          infoObjOrWordNumbers = _ref3.infoObjOrWordNumbers;
      return infoObjOrWordNumbers.filter(function (wordInfo) {
        return matchesAddlDetailsByWord[word](wordInfo);
      }).map(function (wordInfo) {
        return wordInfo[0];
      });
    };
  } else {
    // translation search
    wordDetailsArray = queryWords.map(function (word) {
      return {
        word: word,
        primaryDetail: word
      };
    });

    getWordNumbersMatchingAllWordDetails = function getWordNumbersMatchingAllWordDetails(_ref4) {
      var infoObjOrWordNumbers = _ref4.infoObjOrWordNumbers;
      return infoObjOrWordNumbers;
    };
  }

  return {
    wordDetailsArray: wordDetailsArray,
    getWordNumbersMatchingAllWordDetails: getWordNumbersMatchingAllWordDetails
  };
};

exports.getWordDetails = getWordDetails;