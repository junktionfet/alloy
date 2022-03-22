"use strict";

exports.default = void 0;

var _isNil = require("./isNil");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * Returns whether the value is an object.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return !(0, _isNil.default)(value) && !Array.isArray(value) && _typeof(value) === "object";
};

exports.default = _default;