"use strict";

exports.default = void 0;

var _utils = require("./utils");

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
var determineLinkType = function determineLinkType(window, config, linkUrl, clickedObj) {
  var linkType = "other";

  if ((0, _utils.isDownloadLink)(config.downloadLinkQualifier, linkUrl, clickedObj)) {
    linkType = "download";
  } else if ((0, _utils.isExitLink)(window, linkUrl)) {
    linkType = "exit";
  }

  return linkType;
};

var findSupportedAnchorElement = function findSupportedAnchorElement(targetElement) {
  var node = targetElement;

  while (node) {
    if ((0, _utils.isSupportedAnchorElement)(node)) {
      return node;
    }

    node = node.parentNode;
  }

  return null;
};

var _default = function _default(window, config) {
  return function (event, targetElement) {
    // Search parent elements for an anchor element
    // TODO: Replace with generic DOM tool that can fetch configured properties
    var anchorElement = findSupportedAnchorElement(targetElement);

    if (!anchorElement) {
      return;
    }

    var linkUrl = (0, _utils.getAbsoluteUrlFromAnchorElement)(window, anchorElement);

    if (!linkUrl) {
      return;
    }

    var linkType = determineLinkType(window, config, linkUrl, anchorElement); // TODO: Update link name from the clicked element context

    var linkName = "Link Click";
    event.documentMayUnload();
    event.mergeXdm({
      eventType: "web.webinteraction.linkClicks",
      web: {
        webInteraction: {
          name: linkName,
          type: linkType,
          URL: linkUrl,
          linkClicks: {
            value: 1
          }
        }
      }
    });
  };
};

exports.default = _default;