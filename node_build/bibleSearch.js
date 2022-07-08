"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bibleSearch = void 0;

require("regenerator-runtime/runtime.js");

var _constants = require("./constants");

var _utils = require("./utils");

var _bibleSearchUtils = require("./bibleSearchUtils");

var _index = require("./index");

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var WILD_CARD_LIMIT = 100;

var bibleSearch = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref) {
    var query, flags, hebrewOrdering, offset, limit, getVersions, getUnitWords, getUnitRanges, getVerses, getTagSetsByIds, _ref$maxNumVersion, maxNumVersion, _ref$doClocking, doClocking, versionIds, bookIds, includeVariants, originalVersionIds, isOriginalLanguageSearch, versions, _flags$same, same, preppedQuery, _getQueryArrayAndWord, queryArray, queryWords, stackedResultsByBookId, stackedResultsIdxByScopeKey, versionById, resultCountByVersionId, wordResultsByVersionId, hitsByBookId, _getWordDetails, wordDetailsArray, getWordNumbersMatchingAllWordDetails, allRows, rowCountByBookId, resultCountForSort, bookIdsInReturnRange, results, ids, resultNeedingOriginalLocById, versionIdsToGetUnitRangesFrom, resultsByVersionIdNeedingUsfm, tagSetIds, versionResultsNeedingUsfmByVersionIdAndLoc, tagSets;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = _ref.query, flags = _ref.flags, hebrewOrdering = _ref.hebrewOrdering, offset = _ref.offset, limit = _ref.limit, getVersions = _ref.getVersions, getUnitWords = _ref.getUnitWords, getUnitRanges = _ref.getUnitRanges, getVerses = _ref.getVerses, getTagSetsByIds = _ref.getTagSetsByIds, _ref$maxNumVersion = _ref.maxNumVersion, maxNumVersion = _ref$maxNumVersion === void 0 ? 5 : _ref$maxNumVersion, _ref$doClocking = _ref.doClocking, doClocking = _ref$doClocking === void 0 ? false : _ref$doClocking;
            doClocking && (0, _utils.clock)("Query prep"); // TODO: make sure the query does not exceed maximum complexity
            // get versionIds, bookIds, and includeVariants

            versionIds = [];
            bookIds = {};
            (flags["in"] || []).forEach(function (val) {
              if (_constants.bibleSearchScopes[val]) {
                _constants.bibleSearchScopes[val].forEach(function (bookId) {
                  bookIds[bookId] = true;
                });
              } else {
                versionIds.push(val);
              }
            });
            includeVariants = (flags.include || []).includes('variants');
            originalVersionIds = ['uhb', 'ugnt', 'lxx'];
            isOriginalLanguageSearch = versionIds.some(function (versionId) {
              return originalVersionIds.includes(versionId);
            });

            if (!(isOriginalLanguageSearch && !versionIds.every(function (versionId) {
              return originalVersionIds.includes(versionId);
            }))) {
              _context5.next = 10;
              break;
            }

            throw "in flag contains mixed original and translation versionIds";

          case 10:
            if (!(includeVariants && !isOriginalLanguageSearch)) {
              _context5.next = 12;
              break;
            }

            throw "include:variants only allowed for original language searches";

          case 12:
            if (!(versionIds.length > maxNumVersion)) {
              _context5.next = 14;
              break;
            }

            throw "exceeded maximum number of versions";

          case 14:
            _context5.next = 16;
            return getVersions(versionIds);

          case 16:
            versions = _context5.sent;

            if (!(versionIds.length !== versions.length)) {
              _context5.next = 19;
              break;
            }

            throw "one or more invalid versions";

          case 19:
            _flags$same = flags.same, same = _flags$same === void 0 ? "verse" : _flags$same;

            if (isOriginalLanguageSearch && same === "verse") {
              same = "verseNumber";
            }

            if (!(!isOriginalLanguageSearch && versionIds.length > 1 && same !== "verse")) {
              _context5.next = 23;
              break;
            }

            throw "forbidden to search multiple versions when not using same:verse for the range";

          case 23:
            preppedQuery = isOriginalLanguageSearch ? query : (0, _index.searchWordToLowerCase)(query);
            _getQueryArrayAndWord = (0, _utils.getQueryArrayAndWords)(preppedQuery), queryArray = _getQueryArrayAndWord.queryArray, queryWords = _getQueryArrayAndWord.queryWords;
            stackedResultsByBookId = Array(1 + 66).fill().map(function () {
              return [];
            });
            stackedResultsIdxByScopeKey = {};
            versionById = {};
            resultCountByVersionId = {};
            wordResultsByVersionId = {};
            hitsByBookId = Array(1 + 66).fill(0);
            doClocking && (0, _utils.clock)("Get words for all versions");
            _getWordDetails = (0, _utils.getWordDetails)({
              queryWords: queryWords,
              isOriginalLanguageSearch: isOriginalLanguageSearch
            }), wordDetailsArray = _getWordDetails.wordDetailsArray, getWordNumbersMatchingAllWordDetails = _getWordDetails.getWordNumbersMatchingAllWordDetails;
            allRows = [];
            _context5.next = 36;
            return Promise.all(versions.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(version) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        versionById[version.id] = version;
                        resultCountByVersionId[version.id] = 0; // get a row with scope map for each word

                        // get a row with scope map for each word
                        wordResultsByVersionId[version.id] = {};
                        _context2.next = 5;
                        return Promise.all(wordDetailsArray.map( /*#__PURE__*/function () {
                          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
                            var word, primaryDetail, isNot, unitWordRows;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    word = _ref4.word, primaryDetail = _ref4.primaryDetail, isNot = _ref4.isNot;
                                    _context.next = 3;
                                    return getUnitWords({
                                      versionId: version.id,
                                      id: primaryDetail instanceof Array ? primaryDetail.map(function (detail) {
                                        return "".concat(same, ":").concat(detail);
                                      }) : "".concat(same, ":").concat(primaryDetail),
                                      limit: WILD_CARD_LIMIT
                                    });

                                  case 3:
                                    unitWordRows = _context.sent;

                                    if (!(unitWordRows.length === WILD_CARD_LIMIT)) {
                                      _context.next = 6;
                                      break;
                                    }

                                    throw "Word with wildcard character (*) matches too many different words";

                                  case 6:
                                    unitWordRows.forEach(function (row) {
                                      row.scopeMap = JSON.parse(row.scopeMap);
                                      row.word = word;
                                      row.isNot = isNot;

                                      if (Object.values(bookIds).length > 0) {
                                        for (var scopeKey in row.scopeMap) {
                                          if (same === 'verse' && !bookIds[scopeKey.slice(0, 2).replace(/^0/, '')] || same !== 'verse' && !bookIds[scopeKey.split(':')[0]]) {
                                            delete row.scopeMap[scopeKey];
                                          }
                                        }
                                      }
                                    });
                                    wordResultsByVersionId[version.id][word] = unitWordRows;
                                    allRows.push.apply(allRows, _toConsumableArray(unitWordRows));

                                  case 9:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x3) {
                            return _ref5.apply(this, arguments);
                          };
                        }()));

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 36:
            if (!((0, _utils.getLengthOfAllScopeMaps)(allRows) > 100000)) {
              _context5.next = 38;
              break;
            }

            throw "Search exceeds maximum complexity";

          case 38:
            // for each version, in order
            versionIds.forEach(function (versionId) {
              var evaluateGroup = function evaluateGroup(group) {
                var isExactPhrase = group[0] === '"';
                var isOr = /^[0-9]+\+$/.test(group[0]);
                var minimumNumHits = isOr && parseInt(group[0].slice(0, -1), 10); // run subqueries

                var subqueryAndWordResults = group.slice(isExactPhrase || isOr ? 1 : 0).map(function (item) {
                  return item instanceof Array ? evaluateGroup(item) : wordResultsByVersionId[versionId][item] || item;
                });
                doClocking && (0, _utils.clock)("Get scopeKeys for eval of group: ".concat(group.map(function (i) {
                  return typeof i === 'string' ? i : '[]';
                }).join(" "), " (").concat(versionId, ")"));
                var scopeKeysToExamine;
                var noWordsHavePositiveDetails = subqueryAndWordResults.every(function (rowsOrResultObj) {
                  return (rowsOrResultObj[0] || {}).isNot;
                });
                var someWordsHaveNoPositiveDetails = subqueryAndWordResults.some(function (rowsOrResultObj) {
                  return (rowsOrResultObj[0] || {}).isNot;
                });

                if (noWordsHavePositiveDetails || isOr && someWordsHaveNoPositiveDetails) {
                  scopeKeysToExamine = _constants.allVerseNumberScopeKeysByBookId.filter(function (scopeKeys, bookId) {
                    return (Object.values(bookIds).length === 0 || bookIds.includes(bookId)) && (!versionById[versionId].partialScope || versionById[versionId].partialScope === 'ot' && bookId <= 39 || versionById[versionId].partialScope === 'nt' && bookId >= 40);
                  }).flat();
                } else if (isOr) {
                  scopeKeysToExamine = _utils.mergeAndUniquifyArraysOfScopeKeys.apply(void 0, _toConsumableArray(subqueryAndWordResults.map(function (rowsOrResultObj) {
                    return rowsOrResultObj.scopeKeys ? [rowsOrResultObj.scopeKeys] : rowsOrResultObj.map(function (_ref6) {
                      var scopeMap = _ref6.scopeMap;
                      return Object.keys(scopeMap);
                    });
                  }).flat()));
                } else {
                  // it is a normal AND or an exact phrase
                  var shortestSubqueryAndWordResult = subqueryAndWordResults.slice(1).reduce(function (a, b) {
                    return (0, _utils.getLengthOfAllScopeMaps)(a, true) < (0, _utils.getLengthOfAllScopeMaps)(b, true) ? a : b;
                  }, subqueryAndWordResults[0]);
                  scopeKeysToExamine = shortestSubqueryAndWordResult.scopeKeys || (shortestSubqueryAndWordResult.length <= 1 ? Object.keys((shortestSubqueryAndWordResult[0] || {}).scopeMap || []) : _utils.mergeAndUniquifyArraysOfScopeKeys.apply(void 0, _toConsumableArray(shortestSubqueryAndWordResult.map(function (_ref7) {
                    var scopeMap = _ref7.scopeMap;
                    return Object.keys(scopeMap);
                  }))));
                }

                doClocking && (0, _utils.clock)("Evaluate group: ".concat(group.map(function (i) {
                  return typeof i === 'string' ? i : '[]';
                }).join(" "), " (").concat(versionId, ")")); // loop through the scope keys of the shortest

                var scopeKeys = [];
                var hitsByScopeKey = {};
                var numHitsByScopeKey = {};
                scopeKeysToExamine.forEach(function (scopeKey) {
                  // find hits, noting result info
                  var hits = [];
                  var minPossibleHitsOfAnyWord = Infinity;
                  var exactPhrasePlaceholderSpotsToShift = 0;
                  var doExactPhraseFollowedBy = true;
                  var numWordsInGroup = subqueryAndWordResults.length;
                  subqueryAndWordResults.forEach(function (subqueryOrWordResult, idx) {
                    if (subqueryOrWordResult === '*') {
                      exactPhrasePlaceholderSpotsToShift++;
                      return;
                    }

                    if (subqueryOrWordResult === '...') {
                      doExactPhraseFollowedBy = true;
                      return;
                    }

                    var isFirstItemInGroup = idx === 0;
                    var updatedHits = [];
                    var numPossibleHitsForThisWord = 0;

                    if (isOr) {
                      var _updatedHits;

                      var remainingNumWordsInGroupAfterThisOne = numWordsInGroup - idx - 1;

                      (_updatedHits = updatedHits).push.apply(_updatedHits, _toConsumableArray(hits.filter(function (hit) {
                        return hit.length + remainingNumWordsInGroupAfterThisOne >= minimumNumHits;
                      })));
                    }

                    if (subqueryOrWordResult.hitsByScopeKey) {
                      if (subqueryOrWordResult.hitsByScopeKey[scopeKey]) {
                        if (isFirstItemInGroup) {
                          if (isOr) {
                            updatedHits = subqueryOrWordResult.hitsByScopeKey[scopeKey].map(function (subqueryHits) {
                              return [subqueryHits];
                            });
                          } else {
                            updatedHits = subqueryOrWordResult.hitsByScopeKey[scopeKey];
                            numPossibleHitsForThisWord += subqueryOrWordResult.numHitsByScopeKey[scopeKey];
                          }
                        } else {
                          subqueryOrWordResult.hitsByScopeKey[scopeKey].forEach(function (subqueryHit) {
                            var thisWordNumberIsPossibleHit = false;

                            if (isOr) {
                              var _updatedHits2;

                              (_updatedHits2 = updatedHits).push.apply(_updatedHits2, _toConsumableArray(hits.filter(function (hit) {
                                return hit.length < minimumNumHits;
                              }).map(function (hit) {
                                return [].concat(_toConsumableArray(hit), [subqueryHit]);
                              })));

                              if (numWordsInGroup - idx >= minimumNumHits) updatedHits.push([subqueryHit]);
                            } else if (isExactPhrase) {
                              hits.forEach(function (hit) {
                                if (subqueryHit[0] === hit[1] + 1 + exactPhrasePlaceholderSpotsToShift || doExactPhraseFollowedBy && subqueryHit[0] > hit[1]) {
                                  updatedHits.push([hit[0], subqueryHit[1]]);
                                  thisWordNumberIsPossibleHit = true;
                                }
                              });
                            } else {
                              hits.forEach(function (hit) {
                                updatedHits.push([Math.min(subqueryHit[0], hit[0]), Math.max(subqueryHit[1], hit[1])]);
                                thisWordNumberIsPossibleHit = true;
                              });
                            }

                            if (thisWordNumberIsPossibleHit) numPossibleHitsForThisWord++;
                          });
                        }
                      }
                    } else {
                      subqueryOrWordResult.forEach(function (_ref8) {
                        var scopeMap = _ref8.scopeMap,
                            word = _ref8.word,
                            isNot = _ref8.isNot;

                        if (isNot || scopeMap[scopeKey]) {
                          var wordNumbersMatchingAllWordDetails = scopeMap[scopeKey] ? getWordNumbersMatchingAllWordDetails({
                            word: word,
                            infoObjOrWordNumbers: scopeMap[scopeKey],
                            includeVariants: includeVariants
                          }) : [0] // this is a hit, but its wordNumber doesn't matter
                          ;

                          if (isFirstItemInGroup) {
                            if (isOr) {
                              var _updatedHits3;

                              (_updatedHits3 = updatedHits).push.apply(_updatedHits3, _toConsumableArray(wordNumbersMatchingAllWordDetails.map(function (wordNumber) {
                                return [wordNumber];
                              })));
                            } else {
                              var _updatedHits4;

                              (_updatedHits4 = updatedHits).push.apply(_updatedHits4, _toConsumableArray(wordNumbersMatchingAllWordDetails.map(function (wordNumber) {
                                return [wordNumber, wordNumber];
                              })));

                              numPossibleHitsForThisWord += wordNumbersMatchingAllWordDetails.length;
                            }
                          } else {
                            wordNumbersMatchingAllWordDetails.forEach(function (wordNumber) {
                              var thisWordNumberIsPossibleHit = false;

                              if (isOr) {
                                var _updatedHits5;

                                (_updatedHits5 = updatedHits).push.apply(_updatedHits5, _toConsumableArray(hits.filter(function (hit) {
                                  return hit.length < minimumNumHits;
                                }).map(function (hit) {
                                  return [].concat(_toConsumableArray(hit), [wordNumber]);
                                })));

                                if (numWordsInGroup - idx >= minimumNumHits) updatedHits.push([wordNumber]);
                              } else if (isExactPhrase) {
                                hits.forEach(function (hit) {
                                  var soughtWordNumber = hit[1] + 1 + exactPhrasePlaceholderSpotsToShift;

                                  if (wordNumber === 0 // i.e. is #not:__ hit
                                  || wordNumber === soughtWordNumber || doExactPhraseFollowedBy && wordNumber > hit[1]) {
                                    updatedHits.push([hit[0], wordNumber || soughtWordNumber]);
                                    thisWordNumberIsPossibleHit = true;
                                  }
                                });
                              } else {
                                hits.forEach(function (hit) {
                                  updatedHits.push([Math.min(wordNumber, hit[0]), Math.max(wordNumber, hit[1])]);
                                  thisWordNumberIsPossibleHit = true;
                                });
                              }

                              if (thisWordNumberIsPossibleHit) numPossibleHitsForThisWord++;
                            });
                          }
                        }
                      });
                    }

                    hits = updatedHits;
                    exactPhrasePlaceholderSpotsToShift = 0;
                    doExactPhraseFollowedBy = 0;
                    minPossibleHitsOfAnyWord = Math.min(minPossibleHitsOfAnyWord, numPossibleHitsForThisWord);
                  });

                  if (hits.length > 0) {
                    if (isOr) {
                      // transform hits into proper length-2 min/max wordNumber array
                      hits = hits.map(function (hit) {
                        if (hit.length !== minimumNumHits) throw "buggy 'OR' query; hit length (".concat(JSON.stringify(hit), ") !== min number of hits for the group (").concat(minimumNumHits, ")");
                        return [Math.min.apply(Math, _toConsumableArray(hit.flat())), Math.max.apply(Math, _toConsumableArray(hit.flat()))];
                      });
                    }

                    scopeKeys.push(scopeKey);
                    hitsByScopeKey[scopeKey] = hits;
                    numHitsByScopeKey[scopeKey] = isExactPhrase || group.length === 1 ? minPossibleHitsOfAnyWord : 1;
                  }
                });
                return {
                  scopeKeys: scopeKeys,
                  hitsByScopeKey: hitsByScopeKey,
                  numHitsByScopeKey: numHitsByScopeKey
                };
              };

              var _evaluateGroup = evaluateGroup(queryArray),
                  scopeKeys = _evaluateGroup.scopeKeys,
                  numHitsByScopeKey = _evaluateGroup.numHitsByScopeKey;

              doClocking && (0, _utils.clock)("Add results to stack (".concat(versionId, ")"));
              scopeKeys.forEach(function (scopeKey) {
                var bookId = same === 'verse' ? parseInt(scopeKey.split('-')[0].slice(0, -6), 10) : parseInt(scopeKey.split(':')[0], 10);
                hitsByBookId[bookId] += numHitsByScopeKey[scopeKey];
                resultCountByVersionId[versionId]++;

                if (resultCountByVersionId[versionId] > offset + limit || stackedResultsIdxByScopeKey[scopeKey] === true) {
                  // this block solely for performance reasons
                  if (stackedResultsIdxByScopeKey[scopeKey] === undefined) {
                    stackedResultsByBookId[bookId].push(true);
                    stackedResultsIdxByScopeKey[scopeKey] = true;
                  }
                } else {
                  if (stackedResultsIdxByScopeKey[scopeKey] !== undefined) {
                    stackedResultsByBookId[bookId][stackedResultsIdxByScopeKey[scopeKey]].versionResults.push({
                      versionId: versionId
                    });
                  } else {
                    var newStackedResultsRow = {
                      scopeKey: scopeKey,
                      versionResults: [{
                        versionId: versionId,
                        usfm: []
                      }] // first one gets usfm

                    };

                    if (same === 'verse') {
                      newStackedResultsRow.originalLoc = scopeKey.replace(/-$/, '');
                    }

                    stackedResultsByBookId[bookId].push(newStackedResultsRow);
                    stackedResultsIdxByScopeKey[scopeKey] = stackedResultsByBookId[bookId].length - 1;
                  }
                }
              });
            });

            if (!((versionIds.length === 1 // not stacked
            || isOriginalLanguageSearch) && (queryArray[0] === '"' // exact phrase at base level
            || queryArray.length === 1 // only one unit at base level
            ))) {
              hitsByBookId = null;
            }

            doClocking && (0, _utils.clock)("Get count and arrange ordering");
            rowCountByBookId = stackedResultsByBookId.map(function (a) {
              return a.length;
            });

            if (hebrewOrdering) {// TODO: reorder stackedResultsByBookId
            }

            doClocking && (0, _utils.clock)("Sort result for books within the return range");
            resultCountForSort = 0;
            bookIdsInReturnRange = stackedResultsByBookId.map(function (stackedResults, bookId) {
              resultCountForSort += stackedResults.length;
              if (resultCountForSort > offset && resultCountForSort - stackedResults.length < offset + limit && stackedResults.length > 0) return bookId;
            }).filter(Boolean);

            if (!isOriginalLanguageSearch && versionIds.length > 1) {
              bookIdsInReturnRange.forEach(function (bookId) {
                if (same === 'verse') {
                  // scopeKey is originalLoc
                  stackedResultsByBookId[bookId].sort(function (a, b) {
                    return (a.originalLoc || 'x') > (b.originalLoc || 'x') ? 1 : -1;
                  }); // the 'x' is greater than all originalLoc
                } else {
                  stackedResultsByBookId[bookId].sort(function (a, b) {
                    var unitNumberA = parseInt((a.scopeKey || "").split(':')[1], 10) || Infinity;
                    var unitNumberB = parseInt((b.scopeKey || "").split(':')[1], 10) || Infinity;
                    return unitNumberA > unitNumberB ? 1 : -1;
                  });
                }
              });
            }

            doClocking && (0, _utils.clock)("Get result subset to return");
            results = stackedResultsByBookId.flat().slice(offset, offset + limit);

            if (!(same !== 'verse')) {
              _context5.next = 57;
              break;
            }

            doClocking && (0, _utils.clock)("Get originalLoc for result being returned");
            ids = [];
            resultNeedingOriginalLocById = {};
            results.forEach(function (result) {
              var id = "".concat(same, ":").concat(result.scopeKey);
              ids.push(id);
              resultNeedingOriginalLocById[id] = result;
            });
            versionIdsToGetUnitRangesFrom = isOriginalLanguageSearch ? versionIds : versionIds.slice(0, 1);
            _context5.next = 57;
            return Promise.all(versionIdsToGetUnitRangesFrom.map( /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(versionId) {
                var unitRanges;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return getUnitRanges({
                          versionId: versionId,
                          ids: ids
                        });

                      case 2:
                        unitRanges = _context3.sent;
                        unitRanges.forEach(function (_ref10) {
                          var id = _ref10.id,
                              originalLoc = _ref10.originalLoc;
                          resultNeedingOriginalLocById[id].originalLoc = originalLoc;
                        });

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 57:
            doClocking && (0, _utils.clock)("Get usfm for result being returned");
            resultsByVersionIdNeedingUsfm = [];
            results.forEach(function (result) {
              // If the next line errors out, it might be that the scopeMap obj is out of order
              var versionId = result.versionResults[0].versionId;
              resultsByVersionIdNeedingUsfm[versionId] = resultsByVersionIdNeedingUsfm[versionId] || [];
              resultsByVersionIdNeedingUsfm[versionId].push(result);
            });
            tagSetIds = [];
            versionResultsNeedingUsfmByVersionIdAndLoc = {};
            _context5.next = 64;
            return Promise.all(Object.keys(resultsByVersionIdNeedingUsfm).map( /*#__PURE__*/function () {
              var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(versionId) {
                var resultsNeedingUsfm, _getInfoOnResultLocs, locs, versionResultsNeedingUsfmByLoc, verses;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        resultsNeedingUsfm = resultsByVersionIdNeedingUsfm[versionId];
                        _getInfoOnResultLocs = (0, _bibleSearchUtils.getInfoOnResultLocs)({
                          resultsNeedingUsfm: resultsNeedingUsfm,
                          lookupVersionInfo: versionById[versionId]
                        }), locs = _getInfoOnResultLocs.locs, versionResultsNeedingUsfmByLoc = _getInfoOnResultLocs.versionResultsNeedingUsfmByLoc;
                        versionResultsNeedingUsfmByVersionIdAndLoc[versionId] = versionResultsNeedingUsfmByLoc;
                        _context4.next = 5;
                        return getVerses({
                          versionId: versionId,
                          locs: locs
                        });

                      case 5:
                        verses = _context4.sent;
                        verses.forEach(function (_ref12) {
                          var loc = _ref12.loc,
                              usfm = _ref12.usfm;
                          versionResultsNeedingUsfmByLoc[loc][0].usfm.push(usfm);

                          if (!isOriginalLanguageSearch) {
                            tagSetIds.push("".concat(loc, "-").concat(versionId, "-").concat((0, _index.getWordsHash)({
                              usfm: usfm,
                              wordDividerRegex: versionById[versionId].wordDividerRegex
                            })));
                          }
                        });

                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref11.apply(this, arguments);
              };
            }()));

          case 64:
            results.forEach(function (result) {
              result.versionResults[0].usfm = result.versionResults[0].usfm.join("\n");
            });

            if (!(!isOriginalLanguageSearch && tagSetIds.length > 0)) {
              _context5.next = 71;
              break;
            }

            doClocking && (0, _utils.clock)("Get tagSets for result being returned");
            _context5.next = 69;
            return getTagSetsByIds(tagSetIds);

          case 69:
            tagSets = _context5.sent;
            tagSets.forEach(function (tagSet) {
              var _tagSet$id$split = tagSet.id.split('-'),
                  _tagSet$id$split2 = _slicedToArray(_tagSet$id$split, 2),
                  loc = _tagSet$id$split2[0],
                  versionId = _tagSet$id$split2[1];

              var resultObj = versionResultsNeedingUsfmByVersionIdAndLoc[versionId][loc][0];
              resultObj.tagSets = resultObj.tagSets || [];
              resultObj.tagSets.push(tagSet);
            });

          case 71:
            doClocking && (0, _utils.clock)(""); // if total count <= limit, get otherSuggestedQueries
            // for multi-word search without quotes... when few/no results, also do searches with one word left out of each, telling the user how many results would be available if they scratched that word
            // for multi-word search with quotes... when few/no results, also do non-quoted search, telling the user how many results would be available if they scratched that word
            // const otherSuggestedQueries = [{
            //   suggestedQuery,
            //   resultCount,
            // }]

            return _context5.abrupt("return", {
              results: results,
              rowCountByBookId: rowCountByBookId,
              hitsByBookId: hitsByBookId,
              otherSuggestedQueries: []
            });

          case 73:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function bibleSearch(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/*

  Example result rows:

    {
      originalLoc: `${fromLoc}-${toLoc}`,
      versionResults: [
        {
          versionId: "esv",
          usfm: "...",
          tagSets: [
            ...
          ],
        },
        {
          versionId: "nasb",
        },
        {
          versionId: "net",
        },
      ],
    }

    {
      originalLoc: `${fromLoc}-${toLoc}`,
      versionResults: [
        {
          versionId: "uhb",
          usfm: "...",
        },
        {
          versionId: "nasb",
          usfm: "...",
          tagSets: [
            ...
          ],
        },
      ],
    }

*/


exports.bibleSearch = bibleSearch;