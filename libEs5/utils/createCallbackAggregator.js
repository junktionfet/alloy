"use strict";

exports.default = void 0;

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Allows callbacks to be registered and then later called. When the
 * callbacks are called, their responses are combined into a single promise.
 */
var _default = function _default() {
  var callbacks = [];
  return {
    add: function add(callback) {
      callbacks.push(callback);
    },
    call: function call() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // While this utility doesn't necessarily need to be doing the
      // Promise.all, it's currently useful everywhere this is used and
      // reduces repetitive code. We can factor it out later if we want
      // to make this utility more "pure".
      return Promise.all(callbacks.map(function (callback) {
        return callback.apply(void 0, args);
      }));
    }
  };
};

exports.default = _default;