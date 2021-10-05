"use strict";

exports.default = void 0;

var _utils = require("../utils");

var _httpHeaderNames = require("../constants/httpHeaderNames");

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

/**
 * Creates a representation of a gateway response with the addition of
 * helper methods.
 * @returns Response
 */
var _default = function _default(_ref) {
  var extractEdgeInfo = _ref.extractEdgeInfo;
  return function (_ref2) {
    var _ref2$content = _ref2.content,
        content = _ref2$content === void 0 ? {} : _ref2$content,
        getHeader = _ref2.getHeader;
    var _content$handle = content.handle,
        handle = _content$handle === void 0 ? [] : _content$handle,
        _content$errors = content.errors,
        errors = _content$errors === void 0 ? [] : _content$errors,
        _content$warnings = content.warnings,
        warnings = _content$warnings === void 0 ? [] : _content$warnings;
    /**
     * Response object.
     * @typedef {Object} Response
     */

    return {
      /**
       * Returns matching fragments of the response by type.
       * @param {String} type A string with the current format: <namespace:action>
       *
       * @example
       * getPayloadsByType("identity:persist")
       */
      getPayloadsByType: function getPayloadsByType(type) {
        return (0, _utils.flatMap)(handle.filter(function (fragment) {
          return fragment.type === type;
        }), function (fragment) {
          return fragment.payload;
        });
      },

      /**
       * Returns all errors.
       */
      getErrors: function getErrors() {
        return errors;
      },

      /**
       * Returns all warnings.
       */
      getWarnings: function getWarnings() {
        return warnings;
      },

      /**
       * Returns an object containing the regionId from the x-adobe-edge header
       */
      getEdge: function getEdge() {
        return extractEdgeInfo(getHeader(_httpHeaderNames.ADOBE_EDGE));
      },
      toJSON: function toJSON() {
        return content;
      }
    };
  };
};

exports.default = _default;