"use strict";

exports.default = void 0;

var _validation = require("../../utils/validation");

var _utils = require("../../utils");

var _domain = require("../../constants/domain");

var _edgeBasePath = require("../../constants/edgeBasePath");

var _consentStatus = require("../../constants/consentStatus");

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
var _default = function _default() {
  return {
    debugEnabled: (0, _validation.boolean)().default(false),
    defaultConsent: (0, _validation.enumOf)(_consentStatus.IN, _consentStatus.OUT, _consentStatus.PENDING).default(_consentStatus.IN),
    edgeConfigId: (0, _validation.string)().unique().required(),
    edgeDomain: (0, _validation.string)().domain().default(_domain.EDGE),
    edgeBasePath: (0, _validation.string)().nonEmpty().default(_edgeBasePath.default),
    orgId: (0, _validation.string)().unique().required(),
    onBeforeEventSend: (0, _validation.callback)().default(_utils.noop)
  };
};

exports.default = _default;