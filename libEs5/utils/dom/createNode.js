"use strict";

exports.default = void 0;

var _appendNode = require("./appendNode");

var _isObject = require("../isObject");

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
var populateElementProperties = function populateElementProperties(element, props) {
  Object.keys(props).forEach(function (key) {
    // The following is to support setting style properties to avoid CSP errors.
    if (key === "style" && (0, _isObject.default)(props[key])) {
      var styleProps = props[key];
      Object.keys(styleProps).forEach(function (styleKey) {
        element.style[styleKey] = styleProps[styleKey];
      });
    } else {
      element[key] = props[key];
    }
  });
};

var _default = function _default(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var doc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : document;
  var result = doc.createElement(tag);
  Object.keys(attrs).forEach(function (key) {
    // TODO: To highlight CSP problems consider throwing a descriptive error
    //       if nonce is available and key is style.
    result.setAttribute(key, attrs[key]);
  });
  populateElementProperties(result, props);
  children.forEach(function (child) {
    return (0, _appendNode.default)(result, child);
  });
  return result;
};

exports.default = _default;