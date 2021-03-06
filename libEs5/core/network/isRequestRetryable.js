"use strict";

exports.default = void 0;

var _httpStatusCode = require("../../constants/httpStatusCode");

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
var MAX_RETRIES = 3;
var RETRYABLE_STATUS_CODES = [_httpStatusCode.TOO_MANY_REQUESTS, _httpStatusCode.SERVICE_UNAVAILABLE, _httpStatusCode.BAD_GATEWAY, _httpStatusCode.GATEWAY_TIMEOUT]; // These rules are in accordance with
// https://git.corp.adobe.com/pages/experience-edge/konductor/#/apis/errors?id=handling-4xx-and-5xx-responses

var _default = function _default(_ref) {
  var response = _ref.response,
      retriesAttempted = _ref.retriesAttempted;
  return retriesAttempted < MAX_RETRIES && (0, _utils.includes)(RETRYABLE_STATUS_CODES, response.statusCode);
};

exports.default = _default;