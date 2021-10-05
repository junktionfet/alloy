"use strict";

exports.default = void 0;

var _isNil = require("./isNil");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns whether the value is an object.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return !(0, _isNil.default)(value) && !Array.isArray(value) && _typeof(value) === "object";
};

exports.default = _default;