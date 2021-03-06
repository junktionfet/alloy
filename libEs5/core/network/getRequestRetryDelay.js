"use strict";

exports.default = void 0;

var _httpHeaderNames = require("../../constants/httpHeaderNames");

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
// The retry gets incrementally (but not exponentially) longer for each retry.
var FIRST_DELAY_MILLIS = 1000;
var INCREMENTAL_DELAY_MILLIS = 1000; // When the target delay is randomized, make it within the range of this percentage above or below the target delay.

var MAX_RANDOM_VARIANCE_PERCENTAGE = 0.3;

var calculateRetryDelay = function calculateRetryDelay(retriesAttempted) {
  var targetDelay = FIRST_DELAY_MILLIS + retriesAttempted * INCREMENTAL_DELAY_MILLIS;
  var maxVariance = targetDelay * MAX_RANDOM_VARIANCE_PERCENTAGE;
  var minDelay = targetDelay - maxVariance;
  var maxDelay = targetDelay + maxVariance;
  var randomizedDelayWithinRange = Math.round(minDelay + Math.random() * (maxDelay - minDelay));
  return randomizedDelayWithinRange;
};

var getDelayFromHeader = function getDelayFromHeader(response) {
  // According to the HTTP spec, if the header is defined, its value will be a string that
  // represents either:
  //  * An integer indicating the number of seconds to delay.
  //  * A date after which a retry may occur. The date would be in HTTP-date
  //    format (https://tools.ietf.org/html/rfc7231#section-7.1.1.1). When debugging, it can
  //    be helpful to know that this is the same format that a JavaScript date's
  //    toGMTString() returns.
  var headerValue = response.getHeader(_httpHeaderNames.RETRY_AFTER);
  var delayInMillis;

  if (headerValue) {
    var headerValueInt = parseInt(headerValue, 10);

    if ((0, _utils.isInteger)(headerValueInt)) {
      delayInMillis = headerValueInt * 1000;
    } else {
      delayInMillis = Math.max(0, new Date(headerValue).getTime() - new Date().getTime());
    }
  }

  return delayInMillis;
}; // These rules are in accordance with
// https://git.corp.adobe.com/pages/experience-edge/konductor/#/apis/errors?id=handling-4xx-and-5xx-responses
// For retry delays that don't come from a Retry-After response header, we try to stick with the following best
// practices outlined in https://docs.microsoft.com/en-us/azure/architecture/best-practices/transient-faults:
//  * Incremental retry
//  * Random interval


var _default = function _default(_ref) {
  var response = _ref.response,
      retriesAttempted = _ref.retriesAttempted;
  // Technically, only 429 or 503 responses should have a Retry-After header, but we'll respect the
  // header if we find it on any response.
  var delayInMillis = getDelayFromHeader(response); // Note that the value of delay may be 0 at this point, which would be a valid delay we want to use
  // and not override, which is why we don't do:
  // if (!delay) { ... }

  if (delayInMillis === undefined) {
    delayInMillis = calculateRetryDelay(retriesAttempted);
  }

  return delayInMillis;
};

exports.default = _default;