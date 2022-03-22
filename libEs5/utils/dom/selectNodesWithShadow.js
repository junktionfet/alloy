"use strict";

exports.default = void 0;

var _querySelectorAll = require("./querySelectorAll");

var _startsWith = require("../startsWith");

var _shadowSeparator = require("../../constants/shadowSeparator");

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
var splitWithShadow = function splitWithShadow(selector) {
  return selector.split(_shadowSeparator.default);
};

var transformPrefix = function transformPrefix(parent, selector) {
  var result = selector.trim();
  var hasChildCombinatorPrefix = (0, _startsWith.default)(result, ">");

  if (!hasChildCombinatorPrefix) {
    return result;
  } // IE doesn't support :scope


  if (window.document.documentMode) {
    return result.substring(1).trim();
  }

  var prefix = parent instanceof Element || parent instanceof HTMLDocument ? ":scope" : ":host"; // see https://bugs.webkit.org/show_bug.cgi?id=233380

  return prefix + " " + result;
};

var _default = function _default(context, selector) {
  // Shadow DOM should be supported
  if (!window.document.documentElement.attachShadow) {
    return (0, _querySelectorAll.default)(context, selector.replace(_shadowSeparator.default, ""));
  }

  var parts = splitWithShadow(selector);

  if (parts.length < 2) {
    return (0, _querySelectorAll.default)(context, selector);
  } // split the selector into parts separated by :shadow pseudo-selectors
  // find each subselector element based on the previously selected node's shadowRoot


  var parent = context;

  for (var i = 0; i < parts.length; i += 1) {
    var part = transformPrefix(parent, parts[i]);
    var partNode = (0, _querySelectorAll.default)(parent, part);

    if (partNode.length === 0 || !partNode[0] || !partNode[0].shadowRoot) {
      return partNode;
    }

    parent = partNode[0].shadowRoot;
  }

  return undefined;
};

exports.default = _default;