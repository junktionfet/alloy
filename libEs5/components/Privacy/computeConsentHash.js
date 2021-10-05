"use strict";

exports.default = void 0;

var _utils = require("../../utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// serialize an object with a consistent ordering
var serialize = function serialize(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (i) {
      return serialize(i);
    });
  }

  if (_typeof(obj) === "object" && obj !== null) {
    return Object.keys(obj).sort().reduce(function (memo, key) {
      memo[key] = serialize(obj[key]);
      return memo;
    }, {});
  }

  return obj;
};

var _default = function _default(obj) {
  return (0, _utils.crc32)(JSON.stringify(serialize(obj)));
};

exports.default = _default;