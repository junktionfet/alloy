"use strict";

exports.default = void 0;

var _dom = require("../../../../utils/dom");

var _helperForEq = require("./helperForEq");

var _selectNodesWithEq = require("./selectNodesWithEq");

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
var _default = function _default(selector, element) {
  if ((0, _helperForEq.isNotEqSelector)(selector)) {
    return (0, _dom.matchesSelector)(selector, element);
  } // Using node selection vs matches selector, because of :eq()
  // Find all nodes using document as context


  var nodes = (0, _selectNodesWithEq.selectNodesWithEq)(selector);
  var result = false; // Iterate through all the identified elements
  // and reference compare with element

  for (var i = 0; i < nodes.length; i += 1) {
    if (nodes[i] === element) {
      result = true;
      break;
    }
  }

  return result;
};

exports.default = _default;