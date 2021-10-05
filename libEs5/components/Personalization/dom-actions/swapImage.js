"use strict";

exports.default = void 0;

var _tagName = require("../../../constants/tagName");

var _dom = require("./dom");

var _images = require("./images");

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
var _default = function _default(container, url) {
  if (!(0, _images.isImage)(container)) {
    return;
  } // Start downloading the image


  (0, _images.loadImage)(url); // Remove "src" so there is no flicker

  (0, _dom.removeAttribute)(container, _tagName.SRC); // Replace the image "src"

  (0, _dom.setAttribute)(container, _tagName.SRC, url);
};

exports.default = _default;