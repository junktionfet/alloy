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
  (0, _images.loadImages)(fragment);
  elements.forEach(function (element) {
    (0, _dom.appendNode)(container, element);
  });
  (0, _scripts.executeInlineScripts)(container, scripts, _dom.appendNode);
  return (0, _scripts.executeRemoteScripts)(scriptsUrls);
};

exports.default = _default;