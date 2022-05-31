"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordPartDividerRegex = exports.tagInList = exports.splitVerseIntoWords = exports.specialUsfmMarkers = exports.inlineUsfmMarkers = exports.headingBlockUsfmMarkers = exports.getPiecesFromUSFM = exports.getIsHebrew = exports.blockUsfmMarkers = void 0;

var _usfmJs = _interopRequireDefault(require("usfm-js"));

var _bibletagsVersification = require("@bibletags/bibletags-versification");

var _i18n = _interopRequireDefault(require("./i18n"));

var _constants = require("./constants");

var _index = require("./index");

var _bibleSearchUtils = require("./bibleSearchUtils");

var _utils = require("./utils");

var _originalWordConversion = require("./originalWordConversion");

var _excluded = ["text", "content"],
    _excluded2 = ["pieces"],
    _excluded3 = ["children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var wordPartDividerRegex = /\u2060/g;
exports.wordPartDividerRegex = wordPartDividerRegex;
var blockUsfmMarkers = [// see http://ubsicap.github.io/usfm/index.html
// // Identification
// "id",
// "usfm",
// "ide",
// "sts",
// "rem",
// "h",
// "toc#",
// "toca#",
// // Introductions
// "imt#",
// "is#",
// "ip",
// "ipi",
// "im",
// "imi",
// "ipq",
// "imq",
// "ipr",
// "iq#",
// "ib",
// "ili#",
// "iot",
// "io#",
// "iex",
// "imte#",
// "ie",
// Titles, Headings, and Labels
"mt#", "mte#", "ms#", "mr", "s#", "sr", "r", "d", "sp", "sd#", // Chapters and Verses
// "cl",
// "cd",
// Paragraphs
"p", "m", "po", "pr", "cls", "pmo", "pm", "pmc", "pmr", "pi#", "mi", "nb", "pc", "ph#", "b", // Poetry
"q#", "qr", "qc", "qa", "qm#", "qd", // Footnotes
"fp" // Lists
// "lh",
// "li#",
// "lf",
// "lim#",
// Tables
// "tr",
// Special Text
// "lit",
// Special Features
// "fig",
// Milestones
// "qt#-s",
// "qt#-e",
// "ts#-s",
// "ts#-e",
// Extended Study Content
// "esb",
// "esbe",
];
exports.blockUsfmMarkers = blockUsfmMarkers;
var headingBlockUsfmMarkers = ["mt#", "mte#", "ms#", "mr", "s#", "sr", "r", // "d",  - since this is actual translated content, it is not a heading block
"sp", "sd#", "qa"];
exports.headingBlockUsfmMarkers = headingBlockUsfmMarkers;
var inlineUsfmMarkers = [// see http://ubsicap.github.io/usfm/index.html
// // Introductions
// "ior",
// "iqt",
// Titles, Headings, and Labels
"rq", // Chapters and Verses
"v", // "va",
"vp", // Poetry
"qs", "qac", // Lists
// "litl",
// "lik",
// "liv#",
// Tables
// "th#",
// "thr#",
// "tc#",
// "tcr#",
// Footnotes
"f", "fe", // "fr",
"fq", "fqa", "fk", "fl", "fw", "fv", "ft", // "fdc",
// "fm",
"zFootnoteType", // Cross References
"x", // "xo",
"xk", "xq", "xt", "xta", // "xop",
// "xot",
// "xnt",
// "xdc",
"rq", // Apparatus
"zApparatusJson", // Special Text
"add", "bk", "dc", "k", "nd", "ord", "pn", "png", "addpn", "qt", "sig", "sls", "tl", "wj", // Character Styling
"em", "bd", "it", "bdit", "no", "sc", "sup", // Special Features
// "rb",
// "pro",
"wg", "wh", "wa", // Linking Attributes
"jmp" // Extended Study Content
// "ef",
// "ex",
// "cat",
];
exports.inlineUsfmMarkers = inlineUsfmMarkers;
var specialUsfmMarkers = [// see http://ubsicap.github.io/usfm/index.html
// Chapters and Verses
"c", // "ca",
"cp"];
exports.specialUsfmMarkers = specialUsfmMarkers;

var tagInList = function tagInList(_ref) {
  var tag = _ref.tag,
      list = _ref.list;
  return tag && (list.includes(tag.replace(/[0-9]+/, '#')) || list.includes("".concat(tag, "#")));
};

exports.tagInList = tagInList;

var getFilteredVerseObjects = function getFilteredVerseObjects(_ref2) {
  var unitObjs = _ref2.unitObjs,
      inlineMarkersOnly = _ref2.inlineMarkersOnly;
  var inHeadingBlock = false;
  return unitObjs.filter(function (unitObj) {
    var tag = unitObj.tag,
        text = unitObj.text,
        type = unitObj.type,
        children = unitObj.children; // It seems that usfmMarkersWithContentToDiscard is not needed, since usfm-js distinguishes between content and text,
    // and so if something is not in usfmMarkers and has no text, we just get rid of it.

    var isBlock = tagInList({
      tag: tag,
      list: blockUsfmMarkers
    });

    if (isBlock) {
      inHeadingBlock = tagInList({
        tag: tag,
        list: headingBlockUsfmMarkers
      });
    } // get rid of tags in heading block if inline markers only


    if (inlineMarkersOnly && inHeadingBlock) return false; // deal with blocks when getting inline markers only and filter out unsupported tags without content

    if (!tagInList({
      tag: tag,
      list: inlineUsfmMarkers
    }) && !tagInList({
      tag: tag,
      list: specialUsfmMarkers
    }) && !text && !children) {
      if (inlineMarkersOnly && isBlock) {
        unitObj.text = (0, _i18n["default"])(" ", "word separator");
      } else if (inlineMarkersOnly || !isBlock) {
        return false;
      }
    } // change all .text to .children


    if (text && children) {
      children.unshift({
        // type: "text",
        text: text
      });
      delete unitObj.text; // swap out special spacing strings
    } else if (text) {
      unitObj.text = text.replace(/~/g, "\xA0").replace(/ \/\/ /g, " ").replace(/\/\//g, "");
    } // make consistent with marker objects to be created


    if (type === 'text') {
      delete unitObj.type;
    }

    if (children) {
      unitObj.children = getFilteredVerseObjects({
        unitObjs: children,
        inlineMarkersOnly: inlineMarkersOnly
      });
    }

    return true;
  });
};

var wrapVerseObjects = function wrapVerseObjects(verseObjects) {
  // If there is content prior to a block marker, add in a paragraph marker just before the content.
  verseObjects.some(function (verseObj, idx) {
    var tag = verseObj.tag;

    if (tagInList({
      tag: tag,
      list: blockUsfmMarkers
    })) {
      return true; // all is well - a block marker was found; exit the loop
    } else if (tagInList({
      tag: tag,
      list: specialUsfmMarkers
    })) {// still okay, though we need to keep looking
    } else {
      // hitting content before a block marker; add a simple paragraph in here
      verseObjects = [].concat(_toConsumableArray(verseObjects.slice(0, idx)), [{
        tag: 'p'
      }], _toConsumableArray(verseObjects.slice(idx)));
      return true;
    }
  });
  var currentBlockMarkerObj, currentVerseContainerObj, inHeadingBlock, chapter, verse;
  return verseObjects.filter(function (verseObj) {
    var tag = verseObj.tag,
        text = verseObj.text,
        content = verseObj.content,
        children = verseObj.children;

    if (tag === "c") {
      chapter = parseInt(content);
      return false;
    } else if (tagInList({
      tag: tag,
      list: blockUsfmMarkers
    })) {
      currentBlockMarkerObj = verseObj;
      currentVerseContainerObj = undefined;
      inHeadingBlock = tagInList({
        tag: tag,
        list: headingBlockUsfmMarkers
      });

      if (tag === "d") {
        verse = 0;

        if ([undefined, NaN].includes(chapter)) {
          console.log("Unexpected \\d tag without chapter.", verseObj);
          return false;
        }

        currentVerseContainerObj = {
          type: "text",
          children: [],
          chapter: chapter,
          verse: verse
        };

        if (!currentBlockMarkerObj.children) {
          currentBlockMarkerObj.children = [];
        }

        currentBlockMarkerObj.children.push(currentVerseContainerObj);
      }

      return true;
    } else {
      if (!currentBlockMarkerObj) {
        if (tagInList({
          tag: tag,
          list: specialUsfmMarkers
        })) return true; // Should no longer get here, given the pre-loop at the start of this function.

        console.log("Missing block USFM marker.", currentBlockMarkerObj);
        return false;
      }

      if (currentBlockMarkerObj.text) {
        if (tagInList({
          tag: tag,
          list: specialUsfmMarkers
        })) return true; // Should no longer get here, given the loop near modifiedVerseObjects

        console.log("Unexpected block USFM marker with text.", currentBlockMarkerObj);
        return false;
      }

      if (currentBlockMarkerObj.content) {
        if (tagInList({
          tag: tag,
          list: specialUsfmMarkers
        })) return true; // Should no longer get here, given the loop near modifiedVerseObjects

        console.log("Unexpected block USFM marker with content.", currentBlockMarkerObj);
        return false;
      }

      if (!currentBlockMarkerObj.children) {
        currentBlockMarkerObj.children = [];
      }

      if (inHeadingBlock) {
        currentBlockMarkerObj.children.push(verseObj);
        return false;
      }

      if (tag === "v" || !currentVerseContainerObj) {
        if (tag === "v") {
          verse = parseInt(content);
        }

        if ([undefined, NaN].includes(verse)) {
          console.log("Unexpected USFM without verse.", verseObj);
          return false;
        }

        if ([undefined, NaN].includes(chapter)) {
          console.log("Unexpected USFM without chapter.", verseObj);
          return false;
        }

        currentVerseContainerObj = {
          type: "text",
          children: [],
          chapter: chapter,
          verse: verse
        };
        currentBlockMarkerObj.children.push(currentVerseContainerObj);
      }

      currentVerseContainerObj.children.push(verseObj);
      return false;
    }
  });
};

var splitOnWords = function splitOnWords(_ref3) {
  var text = _ref3.text,
      regexes = _ref3.regexes;
  return text // escape apostraphes
  .replace(/(\w)’(\w)/g, "$1ESCAPEDAPOSTRAPHE$2") // escape large numbers with commas
  .replace(/([0-9]),([0-9]{3}),([0-9]{3})/g, "$1ESCAPEDCOMMA$2ESCAPEDCOMMA$3").replace(/([0-9]),([0-9]{3})/g, "$1ESCAPEDCOMMA$2") // split to words
  .split(regexes.wordDividerInGroupGlobal) // unescape apostraphes and commas
  .map(function (word) {
    return word.replace(/ESCAPEDAPOSTRAPHE/g, "’");
  }).map(function (word) {
    return word.replace(/ESCAPEDCOMMA/g, ",");
  }) // filter out empties
  .filter(function (word) {
    return word !== "";
  });
};

var reduceLevels = function reduceLevels(unitObjs) {
  return unitObjs.map(function (unitObj) {
    if (unitObj.children) {
      unitObj.children = reduceLevels(unitObj.children);

      if (unitObj.children.length === 1) {
        var onlyChild = unitObj.children[0];

        if (Object.keys(unitObj).every(function (key) {
          return onlyChild[key] === unitObj[key] || typeof onlyChild[key] === 'undefined';
        })) {
          delete unitObj.children;
          return _objectSpread(_objectSpread({}, unitObj), onlyChild);
        }
      }
    }

    return unitObj;
  });
};

var filterOutEmptyObjects = function filterOutEmptyObjects(unitObjs) {
  return unitObjs.filter(function (unitObj) {
    var text = unitObj.text,
        children = unitObj.children,
        content = unitObj.content,
        apparatusJson = unitObj.apparatusJson;

    if (!text && (!children || !children.length) && !content && !apparatusJson) {
      return false;
    }

    if (children) {
      unitObj.children = filterOutEmptyObjects(children);
    }

    return true;
  });
};

var getNewTagObjWithUnlistedChildrenFilterOut = function getNewTagObjWithUnlistedChildrenFilterOut(_ref4) {
  var unitObj = _ref4.unitObj,
      list = _ref4.list;
  return _objectSpread(_objectSpread({}, unitObj), unitObj.children ? {
    children: unitObj.children.filter(function (child) {
      return list.includes(child);
    }).map(function (child) {
      return getNewTagObjWithUnlistedChildrenFilterOut({
        unitObj: child,
        list: list
      });
    })
  } : {});
};

var getGroupedVerseObjects = function getGroupedVerseObjects(_ref5) {
  var verseObjects = _ref5.verseObjects,
      regexes = _ref5.regexes;
  var includesEmptyWordDividers = regexes.wordDividerStartToEnd.test("");
  var splitWordFixesInfo = [];
  var wordNumberInVerse = 1;

  var getGroupedVerseObjectsRecursive = function getGroupedVerseObjectsRecursive(_ref6) {
    var unitObjs = _ref6.unitObjs,
        passedInAncestorLine = _ref6.ancestorLine,
        splitWordInfo = _ref6.splitWordInfo;
    unitObjs.forEach(function (unitObj, unitObjIndex) {
      var text = unitObj.text,
          children = unitObj.children,
          tag = unitObj.tag;
      var ancestorLine = [].concat(_toConsumableArray(passedInAncestorLine || []), [unitObjs, unitObj]);

      if (tag === "v") {
        wordNumberInVerse = 1;
      }

      if (text || tag === "w") {
        if (text) {
          var textSplitOnWords = splitOnWords({
            text: text,
            regexes: regexes
          });
          unitObj.children = textSplitOnWords.map(function (wordOrWordDivider, idx) {
            var doesNotHaveWord = regexes.wordDividerStartToEnd.test(wordOrWordDivider);
            return _objectSpread(_objectSpread({
              text: wordOrWordDivider
            }, doesNotHaveWord ? {} : {
              type: "word"
            }), doesNotHaveWord || splitWordInfo && idx === 0 ? {} : {
              wordNumberInVerse: wordNumberInVerse++
            });
          });
          delete unitObj.text;
        }

        if (splitWordInfo) {
          var firstChild = unitObj.children[0];

          if (firstChild.type === "word") {
            var _splitWordInfo = splitWordInfo,
                arrayWhichEndsWithWord = _splitWordInfo.arrayWhichEndsWithWord,
                ancestorLineWhichEndsWithWord = _splitWordInfo.ancestorLineWhichEndsWithWord,
                commonAncestorArray = _splitWordInfo.commonAncestorArray,
                indexOfChildOfCommonAncestor = _splitWordInfo.indexOfChildOfCommonAncestor;
            var word1Obj = arrayWhichEndsWithWord[arrayWhichEndsWithWord.length - 1];
            var word1PartInfo = {
              obj: word1Obj,
              arrayContainingObj: arrayWhichEndsWithWord,
              childOfCommonAncestor: commonAncestorArray[indexOfChildOfCommonAncestor]
            };
            var word2PartInfo = {
              obj: firstChild,
              arrayContainingObj: unitObj.children,
              childOfCommonAncestor: ancestorLine[ancestorLine.indexOf(commonAncestorArray) + 1]
            };
            var word2AncestorList = [].concat(_toConsumableArray(ancestorLine), [firstChild]);

            if (!splitWordFixesInfo.some(function (splitWordFixInfo) {
              if (splitWordFixInfo.wordPartsInfo.map(function (_ref7) {
                var obj = _ref7.obj;
                return obj;
              }).includes(word1Obj)) {
                // add in word2 info only
                splitWordFixInfo.wordPartsInfo.push(word2PartInfo);
                splitWordFixInfo.ancestorList = [].concat(_toConsumableArray(splitWordFixInfo.ancestorList), _toConsumableArray(word2AncestorList));

                if (splitWordFixInfo.commonAncestorArray !== commonAncestorArray) {
                  throw new Error("USFM with nested markers not presently supported.");
                }

                return true;
              }

              return false;
            })) {
              // add new entry with word1 and word2 info
              splitWordFixesInfo.push({
                wordPartsInfo: [word1PartInfo, word2PartInfo],
                ancestorList: [].concat(_toConsumableArray(ancestorLineWhichEndsWithWord), _toConsumableArray(word2AncestorList)),
                commonAncestorArray: commonAncestorArray
              });
            }
          }

          splitWordInfo = null;
        }

        var lastChild = unitObj.children[unitObj.children.length - 1];
        splitWordInfo = lastChild.type === "word" && !includesEmptyWordDividers && tagInList({
          tag: tag,
          list: inlineUsfmMarkers
        }) ? {
          arrayWhichEndsWithWord: unitObj.children,
          ancestorLineWhichEndsWithWord: [unitObj.children, lastChild],
          commonAncestorArray: unitObjs,
          indexOfChildOfCommonAncestor: unitObjIndex
        } : null;
      } else if (children) {
        var childrenInfo = getGroupedVerseObjectsRecursive({
          unitObjs: children,
          ancestorLine: ancestorLine,
          splitWordInfo: splitWordInfo
        });
        unitObj.children = childrenInfo.groupedVerseObjects;
        splitWordInfo = childrenInfo.splitWordInfo && !includesEmptyWordDividers && tagInList({
          tag: tag,
          list: inlineUsfmMarkers
        }) ? _objectSpread(_objectSpread({}, childrenInfo.splitWordInfo), {}, {
          ancestorLineWhichEndsWithWord: [].concat(_toConsumableArray(childrenInfo.splitWordInfo.ancestorLineWhichEndsWithWord), [childrenInfo.splitWordInfo.commonAncestorArray, childrenInfo.splitWordInfo.commonAncestorArray[childrenInfo.splitWordInfo.indexOfChildOfCommonAncestor]]),
          commonAncestorArray: unitObjs,
          indexOfChildOfCommonAncestor: unitObjIndex
        }) : null;
      } else if (tag) {
        splitWordInfo = null;
      }
    });
    return {
      groupedVerseObjects: unitObjs,
      splitWordInfo: splitWordInfo
    };
  };

  var _getGroupedVerseObjec = getGroupedVerseObjectsRecursive({
    unitObjs: verseObjects
  }),
      groupedVerseObjects = _getGroupedVerseObjec.groupedVerseObjects;

  splitWordFixesInfo.forEach(function (splitWordFixInfo) {
    var wordPartsInfo = splitWordFixInfo.wordPartsInfo,
        ancestorList = splitWordFixInfo.ancestorList,
        commonAncestorArray = splitWordFixInfo.commonAncestorArray;
    var wordNumberInVerse = wordPartsInfo[0].obj.wordNumberInVerse;
    delete wordPartsInfo[0].obj.wordNumberInVerse;
    wordPartsInfo.forEach(function (wordPartInfo) {
      return delete wordPartInfo.obj.type;
    });
    var newWordObj = {
      children: wordPartsInfo.map(function (_ref8) {
        var obj = _ref8.obj,
            arrayContainingObj = _ref8.arrayContainingObj,
            childOfCommonAncestor = _ref8.childOfCommonAncestor;
        var objIndex = arrayContainingObj.indexOf(obj);
        var newChild = getNewTagObjWithUnlistedChildrenFilterOut({
          unitObj: childOfCommonAncestor,
          list: ancestorList
        });
        arrayContainingObj.splice(objIndex, 1);
        return newChild;
      }),
      type: "word",
      wordNumberInVerse: wordNumberInVerse
    };
    var insertIndex = commonAncestorArray.indexOf(wordPartsInfo[0].childOfCommonAncestor) + 1;
    commonAncestorArray.splice(insertIndex, 0, newWordObj);
  });
  groupedVerseObjects = reduceLevels(groupedVerseObjects);
  groupedVerseObjects = filterOutEmptyObjects(groupedVerseObjects);
  return groupedVerseObjects;
};

var getFlattenedJsUsfm = function getFlattenedJsUsfm(jsUsfm) {
  var verseObjects = [];

  if (jsUsfm.headers) {
    verseObjects.push.apply(verseObjects, _toConsumableArray(jsUsfm.headers));
  }

  Object.keys(jsUsfm.chapters).forEach(function (chapterNum) {
    var chapter = jsUsfm.chapters[chapterNum];
    verseObjects.push({
      "content": chapterNum,
      "tag": "c"
    });

    if (chapter.front) {
      verseObjects.push.apply(verseObjects, _toConsumableArray(chapter.front.verseObjects));
    } // Ps 119 has 176 verses; I'm going to 180 in case there is a version which splits it differently


    for (var verseNum = 0; verseNum < 180; verseNum++) {
      if (chapter[verseNum]) {
        verseObjects.push({
          "content": verseNum,
          "tag": "v"
        });
        verseObjects.push.apply(verseObjects, _toConsumableArray(chapter[verseNum].verseObjects));
      }
    }
  });
  return verseObjects;
};

var removeInvalidNewlines = function removeInvalidNewlines(unitObjs) {
  unitObjs.forEach(function (unitObj) {
    if (typeof unitObj.text === 'string') {
      unitObj.text = unitObj.text.replace(/\n/g, '');
    }

    if (typeof unitObj.content === 'string') {
      unitObj.content = unitObj.content.replace(/\n/g, '');
    }

    if (unitObj.children) {
      removeInvalidNewlines(unitObj.children);
    }
  });
};

var getIsHebrew = function getIsHebrew(unitObjs) {
  var getHasHebrew = function getHasHebrew(unitObjs) {
    return unitObjs.some(function (unitObj) {
      var _unitObj$strong = unitObj.strong,
          strong = _unitObj$strong === void 0 ? "" : _unitObj$strong,
          children = unitObj.children;

      if (/(?:^|:)H/.test(strong)) {
        return true;
      } else if (children) {
        return getHasHebrew(children);
      }
    });
  };

  return getHasHebrew(unitObjs);
};

exports.getIsHebrew = getIsHebrew;

var getPiecesFromUSFM = function getPiecesFromUSFM(_ref9) {
  var _ref9$usfm = _ref9.usfm,
      usfm = _ref9$usfm === void 0 ? '' : _ref9$usfm,
      inlineMarkersOnly = _ref9.inlineMarkersOnly,
      wordDividerRegex = _ref9.wordDividerRegex,
      splitIntoWords = _ref9.splitIntoWords,
      searchText = _ref9.searchText,
      wordNumberInVerseOfHitsByLoc = _ref9.wordNumberInVerseOfHitsByLoc,
      startRef = _ref9.startRef;
  // Put the chapter tag before everything, or assume chapter 1 if there is not one
  var chapterTagSwapRegex = /^((?:[^\\]|\\[^v])+?)(\\c [0-9]+\n)/;
  var addedPseudoChapter = false;

  if (chapterTagSwapRegex.test(usfm)) {
    usfm = usfm.replace(/^((?:[^\\]|\\[^v])*?)(\\c [0-9]+ *\n)/, '$2$1');
  } else {
    usfm = "\\c 1\n".concat(usfm);
    addedPseudoChapter = true;
  }

  var verseObjects = getFlattenedJsUsfm(_usfmJs["default"].toJSON(usfm));

  if (addedPseudoChapter && verseObjects[0].tag === 'c') {
    verseObjects.shift();
  } // This is a fix due to a bug in usfm-js reported here: https://github.com/unfoldingWord/usfm-js/issues/103
  // The fix is not perfect as it breaks in the situation where the nextChar is supposed to be
  // repeated twice in the verseObject to follow, but only is presented once. If this turns out
  // to be a significant issue, I will need to fix usfm-js.


  verseObjects.forEach(function (verseObject, idx) {
    var nextVerseObject = verseObjects[idx + 1] || {};

    if (verseObject.nextChar && nextVerseObject.text && nextVerseObject.text.substring(0, 1) !== verseObject.nextChar) {
      nextVerseObject.text = "".concat(verseObject.nextChar).concat(nextVerseObject.text);
    }
  });
  removeInvalidNewlines(verseObjects);
  var filteredVerseObjects = getFilteredVerseObjects({
    unitObjs: verseObjects,
    inlineMarkersOnly: inlineMarkersOnly
  }); // For block markers which have content (like \s1 and \d), separate out that content

  var modifiedVerseObjects = [];
  filteredVerseObjects.forEach(function (verseObj) {
    var text = verseObj.text,
        content = verseObj.content,
        verseObjWithoutTextAndContent = _objectWithoutProperties(verseObj, _excluded);

    var tag = verseObjWithoutTextAndContent.tag;

    if (tagInList({
      tag: tag,
      list: blockUsfmMarkers
    }) && (text || content)) {
      modifiedVerseObjects.push(verseObjWithoutTextAndContent);
      var newVerseObj = {};
      text && (newVerseObj.text = text);
      content && (newVerseObj.content = content);
      modifiedVerseObjects.push(newVerseObj);
    } else {
      modifiedVerseObjects.push(verseObj);
    }
  }); // handle zApparatusJson and Hebrew verse parts

  var baseWords = [];
  modifiedVerseObjects.forEach(function (vsObj) {
    if (vsObj.type === "word") {
      baseWords.push(JSON.parse(JSON.stringify(vsObj)));
      var wordParts = (vsObj.text || "").split(wordPartDividerRegex);

      if (wordParts.length > 1 && vsObj.morph) {
        var morphLang = vsObj.morph.substr(0, 2);
        var morphParts = vsObj.morph.substr(3).split(':');
        var mainPartIdx = (0, _index.getMainWordPartIndex)(morphParts);
        var isEntirelyPrefixAndSuffix = (0, _index.getIsEntirelyPrefixAndSuffix)(vsObj);

        if (wordParts.length === morphParts.length) {
          vsObj.children = wordParts.map(function (text, idx) {
            var newObj = {
              text: text
            };
            var isPrefixOrSuffix = isEntirelyPrefixAndSuffix || idx !== mainPartIdx;
            var morphPart = morphParts[idx];

            if (isPrefixOrSuffix) {
              newObj.color = (0, _index.getMorphPartDisplayInfo)({
                morphLang: morphLang,
                morphPart: morphPart,
                isPrefixOrSuffix: isPrefixOrSuffix,
                wordIsMultiPart: true
              }).color;
            }

            return newObj;
          });
          delete vsObj.text;
        }
      }
    } else if (vsObj.tag === "zApparatusJson") {
      try {
        vsObj.apparatusJson = JSON.parse(vsObj.content);
        vsObj.baseWords = baseWords;
        delete vsObj.content;
      } catch (e) {}
    } else if (vsObj.tag === "v") {
      baseWords = [];
    }
  });

  if (!inlineMarkersOnly) {
    modifiedVerseObjects = wrapVerseObjects(modifiedVerseObjects);
  }

  if (splitIntoWords) {
    var regexes = {
      wordDividerInGroupGlobal: new RegExp("((?:".concat(wordDividerRegex || _constants.defaultWordDividerRegex, ")+)"), 'g'),
      wordDividerStartToEnd: new RegExp("^(?:".concat(wordDividerRegex || _constants.defaultWordDividerRegex, ")+$"))
    }; // previous attempts below (in case the above doesn't always pan out)
    // try {
    //   regexes = {
    //     wordDividerInGroupGlobal: new RegExp(`(${wordDividerRegex || '[\\P{Letter}]+'})`, 'gu'),
    //     wordDividerStartToEnd: new RegExp(`^${wordDividerRegex || '[\\P{Letter}]+'}$`, 'u'),
    //   }
    // } catch(e) {
    //   regexes = {
    //     wordDividerInGroupGlobal: new RegExp(rewritePattern(`(${wordDividerRegex || '[\\P{L}]+'})`, 'u', {
    //       unicodePropertyEscape: true,
    //     }), 'g'),
    //     wordDividerStartToEnd: new RegExp(rewritePattern(`^${wordDividerRegex || '[\\P{L}]+'}$`, 'u', {
    //       unicodePropertyEscape: true,
    //     })),
    //   }
    // }

    modifiedVerseObjects = getGroupedVerseObjects({
      verseObjects: modifiedVerseObjects,
      regexes: regexes
    });
  }

  if (searchText) {
    var _getQueryAndFlagInfo = (0, _bibleSearchUtils.getQueryAndFlagInfo)({
      query: searchText,
      FLAG_MAP: _constants.bibleSearchFlagMap
    }),
        query = _getQueryAndFlagInfo.query;

    var _getQueryArrayAndWord = (0, _utils.getQueryArrayAndWords)(query),
        queryWords = _getQueryArrayAndWord.queryWords;

    var markSearchWordHits = function markSearchWordHits(pieces) {
      var getWordText = function getWordText(unitObj) {
        var text = unitObj.text,
            children = unitObj.children;
        return text || children && children.map(function (child) {
          return getWordText(child);
        }).join("") || "";
      };

      pieces.forEach(function (unitObj) {
        var type = unitObj.type,
            children = unitObj.children,
            tag = unitObj.tag,
            lemma = unitObj.lemma,
            morph = unitObj.morph,
            strong = unitObj.strong;
        var text = getWordText(unitObj);

        if (tag === "w") {
          if (queryWords.some(function (queryWord) {
            if (queryWord[0] === '#') {
              return queryWord.slice(1).split('#').filter(function (rawDetails) {
                return !/^not:/.test(rawDetails);
              }).every(function (rawDetails) {
                var _ref10 = rawDetails.match(/^([^:]+):/) || [],
                    _ref11 = _slicedToArray(_ref10, 2),
                    x = _ref11[0],
                    colonDetailType = _ref11[1];

                return rawDetails.replace(/^[^:]+:/, '').split('/').some(function (rawDetail) {
                  if (colonDetailType === 'lemma') {
                    return rawDetail === lemma;
                  }

                  if (colonDetailType === 'form') {
                    return (0, _bibleSearchUtils.stripHebrewVowelsEtc)((0, _bibleSearchUtils.stripGreekAccents)(rawDetail).toLowerCase()) === (0, _bibleSearchUtils.stripHebrewVowelsEtc)((0, _bibleSearchUtils.stripGreekAccents)(text).toLowerCase());
                  }

                  if ((colonDetailType || rawDetail) === 'suffix') {
                    var morphSuffixes = morph.match(/:Sp.{3}$/g) || [];

                    if (rawDetail === 'suffix') {
                      return morphSuffixes.length > 0;
                    } else {
                      var suffixDetails = rawDetail.split("");
                      var indexAndDetailSets = [[3, suffixDetails.filter(function (detail) {
                        return "123".includes(detail);
                      })], [4, suffixDetails.filter(function (detail) {
                        return "mfbc".includes(detail);
                      })], [5, suffixDetails.filter(function (detail) {
                        return "spd".includes(detail);
                      })]];
                      return indexAndDetailSets.every(function (_ref12) {
                        var _ref13 = _slicedToArray(_ref12, 2),
                            morphSuffixIdx = _ref13[0],
                            details = _ref13[1];

                        return details.length === 0 || morphSuffixes.some(function (morphSuffix) {
                          return details.includes(morphSuffix[morphSuffixIdx]);
                        });
                      });
                    }
                  }

                  if (/^[GH][0-9]{5}$/.test(rawDetail)) {
                    return strong.split(':').includes(rawDetail);
                  }

                  if (_constants.hebrewPrefixSearchHitMap[rawDetail]) {
                    return strong.split(':').includes(_constants.hebrewPrefixSearchHitMap[rawDetail]);
                  }

                  if (_constants.hebrewHeyNunSearchHitRegexes[rawDetail]) {
                    return _constants.hebrewHeyNunSearchHitRegexes[rawDetail].test(morph);
                  }

                  if (_constants.grammaticalDetailMap[rawDetail]) {
                    var wordInfo = (0, _originalWordConversion.getWordInfoFromUsfmWord)(_objectSpread(_objectSpread({}, unitObj), {}, {
                      w: text,
                      id: unitObj["x-id"]
                    }));
                    return _constants.grammaticalDetailMap[rawDetail].matches(wordInfo);
                  }

                  return false; // shouldn't get here
                });
              });
            }
          })) {
            unitObj.isHit = true;
          }
        } else if (type === "word") {
          if (queryWords.some(function (queryWord) {
            var isHitRegex = new RegExp("^".concat((0, _bibleSearchUtils.escapeRegex)(queryWord).replace(/\\\*$/, '.*'), "$"), 'i');
            return isHitRegex.test(text);
          })) {
            unitObj.isHit = true;
          }
        } else if (children) {
          markSearchWordHits(children);
        }
      });
    };

    markSearchWordHits(modifiedVerseObjects);
  }

  if (Object.values(wordNumberInVerseOfHitsByLoc || {}).length > 0) {
    var currentRef = _objectSpread({}, startRef);

    var markCorrespondingHits = function markCorrespondingHits(pieces) {
      pieces.forEach(function (unitObj) {
        var content = unitObj.content,
            children = unitObj.children,
            tag = unitObj.tag,
            lemma = unitObj.lemma,
            morph = unitObj.morph,
            strong = unitObj.strong,
            wordNumberInVerse = unitObj.wordNumberInVerse;

        if (tag === 'c') {
          currentRef.chapter = parseInt(content, 10);
        } else if (tag === 'v') {
          currentRef.verse = parseInt(content, 10);
        }

        if ((wordNumberInVerseOfHitsByLoc[(0, _bibletagsVersification.getLocFromRef)(currentRef)] || []).includes(wordNumberInVerse)) {
          unitObj.isHit = true;
        } else if (children) {
          markCorrespondingHits(children);
        }
      });
    };

    markCorrespondingHits(modifiedVerseObjects);
  }

  return modifiedVerseObjects;
};

exports.getPiecesFromUSFM = getPiecesFromUSFM;

var splitVerseIntoWords = function splitVerseIntoWords() {
  var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      pieces = _ref14.pieces,
      otherParams = _objectWithoutProperties(_ref14, _excluded2);

  pieces = pieces || getPiecesFromUSFM(_objectSpread(_objectSpread({}, otherParams), {}, {
    inlineMarkersOnly: true,
    splitIntoWords: true
  }));

  var getWordsWithNumber = function getWordsWithNumber(pieces) {
    var words = [];

    var getWordText = function getWordText(unitObj) {
      var text = unitObj.text,
          children = unitObj.children;
      return text || children && children.map(function (child) {
        return getWordText(child);
      }).join("") || "";
    };

    pieces.forEach(function (unitObj) {
      var children = unitObj.children,
          unitObjWithoutChildren = _objectWithoutProperties(unitObj, _excluded3);

      var type = unitObj.type,
          wordNumberInVerse = unitObj.wordNumberInVerse,
          tag = unitObj.tag;

      if (type === "word" && wordNumberInVerse) {
        var text = getWordText(unitObj);

        if (['nd', 'sc'].includes(tag)) {
          text = text.toUpperCase();
        }

        words.push(_objectSpread(_objectSpread({}, unitObjWithoutChildren), {}, {
          text: text
        }));
      } else if (children) {
        words = [].concat(_toConsumableArray(words), _toConsumableArray(getWordsWithNumber(children)));
      }
    });
    return words;
  };

  var wordsWithNumber = getWordsWithNumber(pieces);

  if (wordsWithNumber.some(function (_ref15, idx) {
    var wordNumberInVerse = _ref15.wordNumberInVerse;
    return wordNumberInVerse !== idx + 1;
  })) {
    throw "error in splitVerseIntoWords: ".concat(JSON.stringify({
      otherParams: otherParams,
      pieces: pieces
    }));
  }

  return wordsWithNumber;
};

exports.splitVerseIntoWords = splitVerseIntoWords;