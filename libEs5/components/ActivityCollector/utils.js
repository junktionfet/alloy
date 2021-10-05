"use strict";

exports.isExitLink = exports.isDownloadLink = exports.isSupportedAnchorElement = exports.getAbsoluteUrlFromAnchorElement = exports.urlStartsWithScheme = void 0;

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
var urlStartsWithScheme = function urlStartsWithScheme(url) {
  return url && /^[a-z0-9]+:\/\//i.test(url);
};

exports.urlStartsWithScheme = urlStartsWithScheme;

var getAbsoluteUrlFromAnchorElement = function getAbsoluteUrlFromAnchorElement(window, element) {
  var loc = window.location;
  var url = element.href ? element.href : "";
  var protocol = element.protocol,
      host = element.host;

  if (!urlStartsWithScheme(url)) {
    if (!protocol) {
      protocol = loc.protocol ? loc.protocol : "";
    }

    protocol = protocol ? protocol + "//" : "";

    if (!host) {
      host = loc.host ? loc.host : "";
    }

    var path = "";

    if (url.substring(0, 1) !== "/") {
      var indx = loc.pathname.lastIndexOf("/");
      indx = indx < 0 ? 0 : indx;
      path = loc.pathname.substring(0, indx);
    }

    url = "" + protocol + host + path + "/" + url;
  }

  return url;
};

exports.getAbsoluteUrlFromAnchorElement = getAbsoluteUrlFromAnchorElement;

var isSupportedAnchorElement = function isSupportedAnchorElement(element) {
  if (element.href && (element.tagName === "A" || element.tagName === "AREA") && (!element.onclick || !element.protocol || element.protocol.toLowerCase().indexOf("javascript") < 0)) {
    return true;
  }

  return false;
};

exports.isSupportedAnchorElement = isSupportedAnchorElement;

var isDownloadLink = function isDownloadLink(downloadLinkQualifier, linkUrl, clickedObj) {
  var re = new RegExp(downloadLinkQualifier);
  return clickedObj.download ? true : re.test(linkUrl.toLowerCase());
};

exports.isDownloadLink = isDownloadLink;

var isExitLink = function isExitLink(window, linkUrl) {
  var currentHostname = window.location.hostname.toLowerCase();

  if (linkUrl.toLowerCase().indexOf(currentHostname) >= 0) {
    return false;
  }

  return true;
};

exports.isExitLink = isExitLink;