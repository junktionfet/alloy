"use strict";

exports.default = void 0;

var _isNil = require("./isNil");

var _isObject = require("./isObject");

/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var deepAssignObject = function deepAssignObject(target, source) {
  Object.keys(source).forEach(function (key) {
    if ((0, _isObject.default)(target[key]) && (0, _isObject.default)(source[key])) {
      deepAssignObject(target[key], source[key]);
      return;
    }

    target[key] = source[key];
  });
};
/**
 * Recursively copy the values of all enumerable own properties from a source item to a target item if the both items are objects
 * @param {Object} target - a target object
 * @param {...Object} source - an array of source objects
 * @example
 * deepAssign({ a: 'a', b: 'b' }, { b: 'B', c: 'c' });
 * // { a: 'a', b: 'B', c: 'c' }
 */


var _default = function _default(target) {
  if ((0, _isNil.default)(target)) {
    throw new TypeError('deepAssign "target" cannot be null or undefined');
  }

  var result = Object(target);

  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    return deepAssignObject(result, Object(source));
  });
  return result;
};

exports.default = _default;