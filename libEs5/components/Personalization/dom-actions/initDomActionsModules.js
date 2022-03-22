"use strict";

exports.default = void 0;

var _dom = require("../../../utils/dom");

var _action = require("./action");

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
var _default = function _default(store) {
  return {
    setHtml: (0, _action.createAction)(_action.setHtml),
    customCode: (0, _action.createAction)(_action.prependHtml),
    setText: (0, _action.createAction)(_action.setText),
    setAttribute: (0, _action.createAction)(_action.setAttributes),
    setImageSource: (0, _action.createAction)(_action.swapImage),
    setStyle: (0, _action.createAction)(_action.setStyles),
    move: (0, _action.createAction)(_action.setStyles),
    resize: (0, _action.createAction)(_action.setStyles),
    rearrange: (0, _action.createAction)(_action.rearrangeChildren),
    remove: (0, _action.createAction)(_dom.removeNode),
    insertAfter: (0, _action.createAction)(_action.insertHtmlAfter),
    insertBefore: (0, _action.createAction)(_action.insertHtmlBefore),
    replaceHtml: (0, _action.createAction)(_action.replaceHtml),
    prependHtml: (0, _action.createAction)(_action.prependHtml),
    appendHtml: (0, _action.createAction)(_action.appendHtml),
    click: function click(settings) {
      return (0, _action.click)(settings, store);
    },
    defaultContent: function defaultContent(settings) {
      return Promise.resolve({
        meta: settings.meta
      });
    }
  };
};

exports.default = _default;