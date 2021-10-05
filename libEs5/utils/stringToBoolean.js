"use strict";

exports.default = void 0;

var _isString = require("./isString");

var _default = function _default(str) {
  return (0, _isString.default)(str) && str.toLowerCase() === "true";
};

exports.default = _default;