"use strict";

exports.default = void 0;

var _utils = require("../../utils");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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