"use strict";

exports.default = void 0;

var _toArray = require("../toArray");

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
 * Returns an array of matched DOM nodes.
 * @param {String} selector
 * @param {Node} [context=document] defaults to document
 * @returns {Array} an array of DOM nodes
 */
var _default = function _default(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return (0, _toArray.default)(context.querySelectorAll(selector));
};

exports.default = _default;