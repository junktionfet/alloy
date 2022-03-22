"use strict";

exports.default = void 0;

var _validation = require("../../utils/validation");

var _utils = require("../../utils");

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Verifies user provided event options.
 * @param {*} options The user event options to validate
 * @returns {*} Validated options
 */
var _default = function _default(_ref) {
  var options = _ref.options;
  var eventOptionsValidator = (0, _validation.objectOf)({
    type: (0, _validation.string)(),
    xdm: (0, _validation.objectOf)({
      eventType: (0, _validation.string)(),
      identityMap: _utils.validateIdentityMap
    }),
    data: (0, _validation.objectOf)({}),
    renderDecisions: (0, _validation.boolean)(),
    decisionScopes: (0, _validation.arrayOf)((0, _validation.string)()),
    datasetId: (0, _validation.string)()
  }).required();
  return eventOptionsValidator(options);
};

exports.default = _default;