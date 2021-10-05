"use strict";

exports.default = void 0;

var _utils = require("../../utils");

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
var _default = function _default(window) {
  return function (xdm) {
    var _window$document$docu = window.document.documentElement;
    _window$document$docu = _window$document$docu === void 0 ? {} : _window$document$docu;
    var clientWidth = _window$document$docu.clientWidth,
        clientHeight = _window$document$docu.clientHeight;
    var environment = {
      type: "browser"
    };

    if ((0, _utils.isNumber)(clientWidth) && clientWidth >= 0 && (0, _utils.isNumber)(clientHeight) && clientHeight >= 0) {
      environment.browserDetails = {
        viewportWidth: Math.round(clientWidth),
        viewportHeight: Math.round(clientHeight)
      };
    }

    (0, _utils.deepAssign)(xdm, {
      environment: environment
    });
  };
};

exports.default = _default;