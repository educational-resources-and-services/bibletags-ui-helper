"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripVocalOfAccents = exports.stripHebrewVowelsEtc = exports.stripGreekAccents = exports.getQueryAndFlagInfo = exports.getInfoOnResultLocs = exports.containsHebrewChars = exports.containsGreekChars = void 0;

require("regenerator-runtime/runtime.js");

var _bibletagsVersification = require("@bibletags/bibletags-versification");

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