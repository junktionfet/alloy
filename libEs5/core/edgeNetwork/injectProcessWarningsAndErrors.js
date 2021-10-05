"use strict";

exports.default = void 0;

var _httpStatusCode = require("../../constants/httpStatusCode");

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
var MESSAGE_PREFIX = "The server responded with a";

var _default = function _default(_ref) {
  var logger = _ref.logger;
  return function (networkResponse) {
    var statusCode = networkResponse.statusCode,
        body = networkResponse.body,
        parsedBody = networkResponse.parsedBody;

    if (statusCode < 200 || statusCode >= 300 || !parsedBody && statusCode !== _httpStatusCode.NO_CONTENT || parsedBody && !Array.isArray(parsedBody.handle)) {
      var bodyToLog = parsedBody ? JSON.stringify(parsedBody, null, 2) : body;
      var messageSuffix = bodyToLog ? "response body:\n" + bodyToLog : "no response body.";
      throw new Error(MESSAGE_PREFIX + " status code " + statusCode + " and " + messageSuffix);
    }

    if (parsedBody) {
      var _parsedBody$warnings = parsedBody.warnings,
          warnings = _parsedBody$warnings === void 0 ? [] : _parsedBody$warnings,
          _parsedBody$errors = parsedBody.errors,
          errors = _parsedBody$errors === void 0 ? [] : _parsedBody$errors;
      warnings.forEach(function (warning) {
        logger.warn(MESSAGE_PREFIX + " warning:", warning);
      });
      errors.forEach(function (error) {
        logger.error(MESSAGE_PREFIX + " non-fatal error:", error);
      });
    }
  };
};

exports.default = _default;