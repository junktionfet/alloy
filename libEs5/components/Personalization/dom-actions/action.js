"use strict";

Object.defineProperty(exports, "setText", {
  enumerable: true,
  get: function get() {
    return _setText.default;
  }
});
Object.defineProperty(exports, "setHtml", {
  enumerable: true,
  get: function get() {
    return _setHtml.default;
  }
});
Object.defineProperty(exports, "appendHtml", {
  enumerable: true,
  get: function get() {
    return _appendHtml.default;
  }
});
Object.defineProperty(exports, "prependHtml", {
  enumerable: true,
  get: function get() {
    return _prependHtml.default;
  }
});
Object.defineProperty(exports, "replaceHtml", {
  enumerable: true,
  get: function get() {
    return _replaceHtml.default;
  }
});
Object.defineProperty(exports, "insertHtmlBefore", {
  enumerable: true,
  get: function get() {
    return _insertHtmlBefore.default;
  }
});
Object.defineProperty(exports, "insertHtmlAfter", {
  enumerable: true,
  get: function get() {
    return _insertHtmlAfter.default;
  }
});
Object.defineProperty(exports, "setStyles", {
  enumerable: true,
  get: function get() {
    return _setStyles.default;
  }
});
Object.defineProperty(exports, "setAttributes", {
  enumerable: true,
  get: function get() {
    return _setAttributes.default;
  }
});
Object.defineProperty(exports, "swapImage", {
  enumerable: true,
  get: function get() {
    return _swapImage.default;
  }
});
Object.defineProperty(exports, "rearrangeChildren", {
  enumerable: true,
  get: function get() {
    return _rearrangeChildren.default;
  }
});
Object.defineProperty(exports, "click", {
  enumerable: true,
  get: function get() {
    return _click.default;
  }
});
exports.createAction = void 0;

var _dom = require("../../../utils/dom");

var _flicker = require("../flicker");

var _dom2 = require("./dom");

var _setText = require("./setText");

var _setHtml = require("./setHtml");

var _appendHtml = require("./appendHtml");

var _prependHtml = require("./prependHtml");

var _replaceHtml = require("./replaceHtml");

var _insertHtmlBefore = require("./insertHtmlBefore");

var _insertHtmlAfter = require("./insertHtmlAfter");

var _setStyles = require("./setStyles");

var _setAttributes = require("./setAttributes");

var _swapImage = require("./swapImage");

var _rearrangeChildren = require("./rearrangeChildren");

var _click = require("./click");

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
var renderContent = function renderContent(elements, content, renderFunc) {
  var executions = elements.map(function (element) {
    return renderFunc(element, content);
  });
  return Promise.all(executions);
};

var createAction = function createAction(renderFunc) {
  return function (settings) {
    var selector = settings.selector,
        prehidingSelector = settings.prehidingSelector,
        content = settings.content,
        meta = settings.meta;
    (0, _flicker.hideElements)(prehidingSelector);
    return (0, _dom.awaitSelector)(selector, _dom2.selectNodesWithEq).then(function (elements) {
      return renderContent(elements, content, renderFunc);
    }).then(function () {
      // if everything is OK, show elements
      (0, _flicker.showElements)(prehidingSelector);
      return {
        meta: meta
      };
    }, function (error) {
      // in case of awaiting timing or error, we need to remove the style tag
      // hence showing the pre-hidden elements
      (0, _flicker.showElements)(prehidingSelector);
      return {
        meta: meta,
        error: error
      };
    });
  };
};

exports.createAction = createAction;