"use strict";

exports.default = void 0;

var _createRequestPayload = require("../../core/edgeNetwork/requests/createRequestPayload");

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
  var content = {};
  var payload = (0, _createRequestPayload.default)({
    content: content,
    addIdentity: function addIdentity(namespaceCode, identity) {
      content.identityMap = content.identityMap || {};
      content.identityMap[namespaceCode] = content.identityMap[namespaceCode] || [];
      content.identityMap[namespaceCode].push(identity);
    }
  });

  payload.setConsent = function (consent) {
    content.consent = consent;
  };

  return payload;
};

exports.default = _default;