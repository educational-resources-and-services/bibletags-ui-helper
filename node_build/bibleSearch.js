"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bibleSearch = exports.BIBLE_SEARCH_FLAG_MAP = void 0;

require("regenerator-runtime/runtime.js");

var _bibletagsVersification = require("@bibletags/bibletags-versification");

var _constants = require("./constants.js");

var _utils = require("./utils");

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

var BIBLE_SEARCH_FLAG_MAP = {
  "in": {
    multiValue: true
  },
  include: {
    multiValue: true
  },
  same: {
    possibleValues: ['verse', 'phrase', 'sentence', 'paragraph']
  }
};
exports.BIBLE_SEARCH_FLAG_MAP = BIBLE_SEARCH_FLAG_MAP;
var WILD_CARD_LIMIT = 100;

var getLengthOfAllScopeMaps = function getLengthOfAllScopeMaps(wordAlts) {
  return ['*', '...'].includes(wordAlts) ? Infinity : wordAlts.scopeKeys ? wordAlts.scopeKeys.length : wordAlts.reduce(function (total, _ref) {
    var scopeMap = _ref.scopeMap;
    return total + Object.values(scopeMap).length;
  }, 0);
};

var bibleSearch = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref2) {
    var queryWithFlags, hebrewOrdering, offset, limit, getVersions, getWords, getUnitRanges, getVerses, _ref2$maxNumVersion, maxNumVersion, _ref2$doClocking, doClocking, _getQueryAndFlagInfo, query, flags, isOriginalLanguageSearch, versionIds, bookIds, includeVariants, versions, _flags$same, same, _getQueryArrayAndWord, queryArray, queryWords, stackedResultsByBookId, stackedResultsIdxByScopeKey, versionById, resultCountByVersionId, wordResultsByVersionId, totalHits, allRows, countByBookId, resultCountForSort, bookIdsInReturnRange, results, ids, resultNeedingOriginalLocById, unitRanges, resultsByVersionIdNeedingUsfm;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            queryWithFlags = _ref2.query, hebrewOrdering = _ref2.hebrewOrdering, offset = _ref2.offset, limit = _ref2.limit, getVersions = _ref2.getVersions, getWords = _ref2.getWords, getUnitRanges = _ref2.getUnitRanges, getVerses = _ref2.getVerses, _ref2$maxNumVersion = _ref2.maxNumVersion, maxNumVersion = _ref2$maxNumVersion === void 0 ? 5 : _ref2$maxNumVersion, _ref2$doClocking = _ref2.doClocking, doClocking = _ref2$doClocking === void 0 ? false : _ref2$doClocking;
            _getQueryAndFlagInfo = (0, _utils.getQueryAndFlagInfo)({
              query: queryWithFlags,
              FLAG_MAP: BIBLE_SEARCH_FLAG_MAP
            }), query = _getQueryAndFlagInfo.query, flags = _getQueryAndFlagInfo.flags;
            isOriginalLanguageSearch = /^\(?"?[#=]/.test(query);
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

            if (isOriginalLanguageSearch) {
              versionIds = (flags.include || []).map(function (versionId) {
                return versionId !== 'variants';
              });
            }

            includeVariants = (flags.include || []).includes('variants');

            if (!(versionIds.length > maxNumVersion)) {
              _context4.next = 11;
              break;
            }

            throw "exceeded maximum number of versions";

          case 11:
            _context4.next = 13;
            return getVersions(versionIds);

          case 13:
            versions = _context4.sent;

            if (!(versionIds.length !== versions.length)) {
              _context4.next = 16;
              break;
            }

            throw "one or more invalid versions";

          case 16:
            _flags$same = flags.same, same = _flags$same === void 0 ? "verse" : _flags$same;

            if (!(!isOriginalLanguageSearch && versionIds.length > 1 && same !== "verse")) {
              _context4.next = 19;
              break;
            }

            throw "forbidden to search multiple versions when not using same:verse for the range";

          case 19:
            _getQueryArrayAndWord = (0, _utils.getQueryArrayAndWords)(query), queryArray = _getQueryArrayAndWord.queryArray, queryWords = _getQueryArrayAndWord.queryWords;
            stackedResultsByBookId = Array(1 + 66).fill().map(function () {
              return [];
            });
            stackedResultsIdxByScopeKey = {};
            versionById = {};
            resultCountByVersionId = {};
            wordResultsByVersionId = {};
            totalHits = null;
            doClocking && (0, _utils.clock)("Get words for all versions");
            allRows = [];
            _context4.next = 30;
            return Promise.all(versions.map( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(version) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        versionById[version.id] = version;
                        resultCountByVersionId[version.id] = 0; // get a row with scope map for each word

                        // get a row with scope map for each word
                        wordResultsByVersionId[version.id] = {};
                        _context2.next = 5;
                        return Promise.all(queryWords.map( /*#__PURE__*/function () {
                          var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(word) {
                            var wordRows;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return getWords({
                                      versionId: version.id,
                                      id: "".concat(same, ":").concat(word),
                                      limit: WILD_CARD_LIMIT
                                    });

                                  case 2:
                                    wordRows = _context.sent;

                                    if (!(wordRows.length === WILD_CARD_LIMIT)) {
                                      _context.next = 5;
                                      break;
                                    }

                                    throw "Word with wildcard character (*) matches too many different words";

                                  case 5:
                                    wordRows.forEach(function (row) {
                                      row.scopeMap = JSON.parse(row.scopeMap);

                                      if (Object.values(bookIds).length > 0) {
                                        for (var scopeKey in row.scopeMap) {
                                          if (same === 'verse' && !bookIds[scopeKey.slice(0, 2).replace(/^0/, '')] || same !== 'verse' && !bookIds[scopeKey.split(':')[0]]) {
                                            delete row.scopeMap[scopeKey];
                                          }
                                        }
                                      }
                                    });
                                    wordResultsByVersionId[version.id][word] = wordRows;
                                    allRows.push.apply(allRows, _toConsumableArray(wordRows));

                                  case 8:
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
                return _ref4.apply(this, arguments);
              };
            }()));

          case 30:
            if (!(getLengthOfAllScopeMaps(allRows) > 100000)) {
              _context4.next = 32;
              break;
            }

            throw "Search exceeds maximum complexity";

          case 32:
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

                if (isOr) {
                  scopeKeysToExamine = _utils.mergeAndUniquifyArraysOfScopeKeys.apply(void 0, _toConsumableArray(subqueryAndWordResults.map(function (rowsOrResultObj) {
                    return rowsOrResultObj.scopeKeys ? [rowsOrResultObj.scopeKeys] : rowsOrResultObj.map(function (_ref6) {
                      var scopeMap = _ref6.scopeMap;
                      return Object.keys(scopeMap);
                    });
                  }).flat()));
                } else {
                  // it is a normal AND or an exact phrase
                  var shortestSubqueryAndWordResult = subqueryAndWordResults.slice(1).reduce(function (a, b) {
                    return getLengthOfAllScopeMaps(a) < getLengthOfAllScopeMaps(b) ? a : b;
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
                        var scopeMap = _ref8.scopeMap;

                        if (scopeMap[scopeKey]) {
                          if (isFirstItemInGroup) {
                            if (isOr) {
                              var _updatedHits3;

                              (_updatedHits3 = updatedHits).push.apply(_updatedHits3, _toConsumableArray(scopeMap[scopeKey].map(function (wordNumber) {
                                return [wordNumber];
                              })));
                            } else {
                              var _updatedHits4;

                              (_updatedHits4 = updatedHits).push.apply(_updatedHits4, _toConsumableArray(scopeMap[scopeKey].map(function (wordNumber) {
                                return [wordNumber, wordNumber];
                              })));

                              numPossibleHitsForThisWord += scopeMap[scopeKey].length;
                            }
                          } else {
                            scopeMap[scopeKey].forEach(function (wordNumber) {
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
                                  if (wordNumber === hit[1] + 1 + exactPhrasePlaceholderSpotsToShift || doExactPhraseFollowedBy && wordNumber > hit[1]) {
                                    updatedHits.push([hit[0], wordNumber]);
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

              if (versionIds.length === 1 // not stacked
              && (queryArray[0] === '"' // exact phrase at base level
              || queryArray.length === 1 // only one unit at base level
              )) {
                totalHits = Object.values(numHitsByScopeKey).reduce(function (a, b) {
                  return a + b;
                }, 0);
              }
            });
            doClocking && (0, _utils.clock)("Get count and arrange ordering");
            countByBookId = stackedResultsByBookId.map(function (a) {
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
            doClocking && (0, _utils.clock)("Get result subset to return");
            results = stackedResultsByBookId.flat().slice(offset, offset + limit);

            if (!(same !== 'verse')) {
              _context4.next = 51;
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
            _context4.next = 49;
            return getUnitRanges({
              versionId: versionIds[0],
              ids: ids
            });

          case 49:
            unitRanges = _context4.sent;
            unitRanges.forEach(function (_ref9) {
              var id = _ref9.id,
                  originalLoc = _ref9.originalLoc;
              resultNeedingOriginalLocById[id].originalLoc = originalLoc;
            });

          case 51:
            doClocking && (0, _utils.clock)("Get usfm for result being returned");
            resultsByVersionIdNeedingUsfm = [];
            results.forEach(function (result) {
              var versionId = result.versionResults[0].versionId;
              resultsByVersionIdNeedingUsfm[versionId] = resultsByVersionIdNeedingUsfm[versionId] || [];
              resultsByVersionIdNeedingUsfm[versionId].push(result);
            });
            _context4.next = 56;
            return Promise.all(Object.keys(resultsByVersionIdNeedingUsfm).map( /*#__PURE__*/function () {
              var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(versionId) {
                var resultsNeedingUsfm, versionResultNeedingUsfmByLoc, locs, verses;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        resultsNeedingUsfm = resultsByVersionIdNeedingUsfm[versionId];
                        versionResultNeedingUsfmByLoc = {};
                        locs = resultsNeedingUsfm.map(function (_ref11) {
                          var originalLoc = _ref11.originalLoc,
                              versionResults = _ref11.versionResults;

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
                              lookupVersionInfo: versionById[versionId]
                            });
                            var locs = refs.map(function (ref) {
                              return (0, _bibletagsVersification.getLocFromRef)(ref).split(':')[0];
                            });
                            locs.forEach(function (loc) {
                              versionResultNeedingUsfmByLoc[loc] = versionResults[0];
                            });
                            return locs;
                          }).flat();
                          return locsForThisResult;
                        }).flat();
                        _context3.next = 5;
                        return getVerses({
                          versionId: versionId,
                          locs: locs
                        });

                      case 5:
                        verses = _context3.sent;
                        verses.forEach(function (_ref12) {
                          var loc = _ref12.loc,
                              usfm = _ref12.usfm;
                          versionResultNeedingUsfmByLoc[loc].usfm.push(usfm);
                        });

                      case 7:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref10.apply(this, arguments);
              };
            }()));

          case 56:
            results.forEach(function (result) {
              result.versionResults[0].usfm = result.versionResults[0].usfm.join("\n");
            });
            doClocking && (0, _utils.clock)(""); // if total count <= limit, get otherSuggestedQueries
            // for multi-word search without quotes... when few/no results, also do searches with one word left out of each, telling the user how many results would be available if they scratched that word
            // for multi-word search with quotes... when few/no results, also do non-quoted search, telling the user how many results would be available if they scratched that word
            // const otherSuggestedQueries = [{
            //   suggestedQuery,
            //   resultCount,
            // }]

            return _context4.abrupt("return", {
              results: results,
              countByBookId: countByBookId,
              totalHits: totalHits,
              otherSuggestedQueries: []
            });

          case 59:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function bibleSearch(_x) {
    return _ref3.apply(this, arguments);
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