"use strict";

exports.default = void 0;

var _dom = require("../../../utils/dom");

var _tagName = require("../../../constants/tagName");

var _elementAttribute = require("../../../constants/elementAttribute");

var _dom2 = require("./dom");

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
var is = function is(element, tagName) {
  return element.tagName === tagName;
};

var isInlineStyleElement = function isInlineStyleElement(element) {
  return is(element, _tagName.STYLE) && !(0, _dom2.getAttribute)(element, _elementAttribute.SRC);
};

var _default = function _default(fragment) {
  var styleNodes = (0, _dom.selectNodes)(_tagName.STYLE, fragment);
  var length = styleNodes.length;
  var nonce = (0, _dom2.getNonce)();

  if (!nonce) {
    return;
  }
  /* eslint-disable no-continue */


  for (var i = 0; i < length; i += 1) {
    var element = styleNodes[i];

    if (!isInlineStyleElement(element)) {
      continue;
    }

    element.nonce = nonce;
  }
};

exports.default = _default;