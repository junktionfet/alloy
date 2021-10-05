"use strict";

exports.default = void 0;

var _dom = require("../../../utils/dom");

var _scripts = require("./scripts");

var _dom2 = require("./dom");

var _utils = require("../../../utils");

var _isBlankString = require("../../../utils/isBlankString");

var _tagName = require("../../../constants/tagName");

/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/*
 * Preprocess actions before rendering, so that offers are remapped to appendHtml when these are
 * to be applied to page HEAD, to align with the way it works in at.js.
 * Offer content should also be filtered, so that only tags allowed in HEAD are preserved.
 */
var APPEND_HTML = "appendHtml";
var HEAD_TAGS_SELECTOR = "SCRIPT,LINK,STYLE";

var filterHeadContent = function filterHeadContent(content) {
  var container = (0, _dom2.createFragment)(content);
  var headNodes = (0, _dom.selectNodes)(HEAD_TAGS_SELECTOR, container);
  return headNodes.map(function (node) {
    return node.outerHTML;
  }).join("");
};

var _default = function _default(action) {
  var result = (0, _utils.assign)({}, action);
  var content = result.content,
      selector = result.selector;

  if ((0, _isBlankString.default)(content)) {
    return result;
  }

  var container = (0, _dom2.selectNodesWithEq)(selector);

  if (!(0, _scripts.is)(container[0], _tagName.HEAD)) {
    return result;
  }

  result.type = APPEND_HTML;
  result.content = filterHeadContent(content);
  return result;
};

exports.default = _default;