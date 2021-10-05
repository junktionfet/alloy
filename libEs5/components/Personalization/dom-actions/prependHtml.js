"use strict";

exports.default = void 0;

var _dom = require("../../../utils/dom");

var _dom2 = require("./dom");

var _images = require("./images");

var _addNonceToInlineStyleElements = require("./addNonceToInlineStyleElements");

var _scripts = require("./scripts");

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
var _default = function _default(container, html) {
  var fragment = (0, _dom2.createFragment)(html);
  (0, _addNonceToInlineStyleElements.default)(fragment);
  var elements = (0, _dom2.getChildNodes)(fragment);
  var scripts = (0, _scripts.getInlineScripts)(fragment);
  var scriptsUrls = (0, _scripts.getRemoteScriptsUrls)(fragment);
  var length = elements.length;
  var i = length - 1; // We have to proactively load images to avoid flicker

  (0, _images.loadImages)(fragment); // We are inserting elements in reverse order

  while (i >= 0) {
    var element = elements[i];
    var firstChild = (0, _dom2.getFirstChild)(container);

    if (firstChild) {
      (0, _dom2.insertBefore)(firstChild, element);
    } else {
      (0, _dom.appendNode)(container, element);
    }

    i -= 1;
  }

  (0, _scripts.executeInlineScripts)(container, scripts, _dom.appendNode);
  return (0, _scripts.executeRemoteScripts)(scriptsUrls);
};

exports.default = _default;