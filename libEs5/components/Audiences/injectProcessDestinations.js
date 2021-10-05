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
var createResultLogMessage = function createResultLogMessage(urlDestination, success) {
  return "URL destination " + (success ? "succeeded" : "failed") + ": " + urlDestination.spec.url;
};

var processUrls = function processUrls(fireReferrerHideableImage, logger, destinations) {
  var urlDestinations = destinations.filter(function (dest) {
    return dest.type === "url";
  });
  return Promise.all(urlDestinations.map(function (urlDestination) {
    return fireReferrerHideableImage(urlDestination.spec).then(function () {
      logger.info(createResultLogMessage(urlDestination, true));
    }).catch(function () {
      // We intentionally do not throw an error if destinations fail. We
      // consider it a non-critical failure and therefore do not want it to
      // reject the promise handed back to the customer.
      logger.error(createResultLogMessage(urlDestination, false));
    });
  })).then(_utils.noop);
};

var processCookies = function processCookies(destinations) {
  var cookieDestinations = destinations.filter(function (dest) {
    return dest.type === "cookie";
  });
  cookieDestinations.forEach(function (dest) {
    var _dest$spec = dest.spec,
        name = _dest$spec.name,
        value = _dest$spec.value,
        domain = _dest$spec.domain,
        ttlDays = _dest$spec.ttlDays;

    _utils.cookieJar.set(name, value || "", {
      domain: domain || "",
      expires: ttlDays || 10 // days

    });
  });
};

var _default = function _default(_ref) {
  var fireReferrerHideableImage = _ref.fireReferrerHideableImage,
      logger = _ref.logger;
  return function (destinations) {
    processCookies(destinations);
    return processUrls(fireReferrerHideableImage, logger, destinations);
  };
};

exports.default = _default;