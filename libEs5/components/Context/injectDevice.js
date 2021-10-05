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
var getScreenOrientationViaProperty = function getScreenOrientationViaProperty(window) {
  var orientation = window.screen.orientation;

  if (orientation == null || orientation.type == null) {
    return null;
  }

  var parts = orientation.type.split("-");

  if (parts.length === 0) {
    return null;
  }

  if (parts[0] !== "portrait" && parts[0] !== "landscape") {
    return null;
  }

  return parts[0];
};

var getScreenOrientationViaMediaQuery = function getScreenOrientationViaMediaQuery(window) {
  if (window.matchMedia("(orientation: portrait)").matches) {
    return "portrait";
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    return "landscape";
  }

  return null;
};

var _default = function _default(window) {
  return function (xdm) {
    var _window$screen = window.screen,
        width = _window$screen.width,
        height = _window$screen.height;
    var device = {
      screenHeight: height,
      screenWidth: width
    };
    var orientation = getScreenOrientationViaProperty(window) || getScreenOrientationViaMediaQuery(window);

    if (orientation) {
      device.screenOrientation = orientation;
    }

    (0, _utils.deepAssign)(xdm, {
      device: device
    });
  };
};

exports.default = _default;