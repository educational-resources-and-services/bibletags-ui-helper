"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passOverI18nNumber = exports.passOverI18n = exports.i18nNumber = exports["default"] = void 0;

var passedOverI18n = function passedOverI18n() {
  return "You must call passOverI18n before using this bibletags-ui-helper.";
};

var passedOverI18nNumber = function passedOverI18nNumber() {
  return "You must call passOverI18nNumber before using i18nNumber.";
};

var passOverI18n = function passOverI18n(i18nFunc) {
  return passedOverI18n = i18nFunc;
};

exports.passOverI18n = passOverI18n;

var passOverI18nNumber = function passOverI18nNumber(i18nNumberFunc) {
  return passedOverI18nNumber = i18nNumberFunc;
};

exports.passOverI18nNumber = passOverI18nNumber;

var i18n = function i18n() {
  return passedOverI18n.apply(void 0, arguments);
};

var i18nNumber = function i18nNumber() {
  return passedOverI18nNumber.apply(void 0, arguments);
};

exports.i18nNumber = i18nNumber;
var _default = i18n;
exports["default"] = _default;