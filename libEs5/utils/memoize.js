"use strict";

exports.default = void 0;

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

/**
 * Creates a function that memoizes the result of `fn`. If `keyResolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key.
 *
 * @param {Function} fn The function to have its output memoized.
 * @param {Function} [keyResolver] The function to resolve the cache key.
 * @returns {Function} The new memoized function.
 */
var _default = function _default(fn, keyResolver) {
  var map = new Map();
  return function () {
    var key = keyResolver ? keyResolver.apply(void 0, arguments) : arguments.length <= 0 ? undefined : arguments[0];

    if (map.has(key)) {
      return map.get(key);
    }

    var result = fn.apply(void 0, arguments);
    map.set(key, result);
    return result;
  };
};

exports.default = _default;