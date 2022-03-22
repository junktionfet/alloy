"use strict";

exports.loadImages = exports.loadImage = exports.isImage = void 0;

var _dom = require("../../../utils/dom");

var _tagName = require("../../../constants/tagName");

var _elementAttribute = require("../../../constants/elementAttribute");

var _dom2 = require("./dom");

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
var isImage = function isImage(element) {
  return element.tagName === _tagName.IMG;
};

exports.isImage = isImage;

var loadImage = function loadImage(url) {
  return (0, _dom.createNode)(_tagName.IMG, {
    src: url
  });
};

exports.loadImage = loadImage;

var loadImages = function loadImages(fragment) {
  var images = (0, _dom.selectNodes)(_tagName.IMG, fragment);
  images.forEach(function (image) {
    var url = (0, _dom2.getAttribute)(image, _elementAttribute.SRC);

    if (url) {
      loadImage(url);
    }
  });
};

exports.loadImages = loadImages;