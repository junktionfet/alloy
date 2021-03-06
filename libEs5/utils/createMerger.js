"use strict";

exports.default = void 0;

var _deepAssign = require("./deepAssign");

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
 * Creates a function that, when passed an object of updates, will merge
 * the updates onto the current value of a payload property.
 * @param {Object} content The base object to modify
 * @param {String } key The property to merge updates into. This
 * can be a dot-notation property path.
 * @returns {Function}
 */
var _default = function _default(content, key) {
  return function (updates) {
    var propertyPath = key.split(".");
    var hostObjectForUpdates = propertyPath.reduce(function (obj, propertyName) {
      obj[propertyName] = obj[propertyName] || {};
      return obj[propertyName];
    }, content);
    (0, _deepAssign.default)(hostObjectForUpdates, updates);
  };
};

exports.default = _default;