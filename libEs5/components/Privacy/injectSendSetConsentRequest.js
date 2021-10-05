"use strict";

exports.default = void 0;

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
var _default = function _default(_ref) {
  var createConsentRequestPayload = _ref.createConsentRequestPayload,
      createConsentRequest = _ref.createConsentRequest,
      sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest;
  return function (_ref2) {
    var consentOptions = _ref2.consentOptions,
        identityMap = _ref2.identityMap;
    var payload = createConsentRequestPayload();
    payload.setConsent(consentOptions);

    if ((0, _utils.isObject)(identityMap)) {
      Object.keys(identityMap).forEach(function (key) {
        identityMap[key].forEach(function (identity) {
          payload.addIdentity(key, identity);
        });
      });
    }

    var request = createConsentRequest(payload);
    return sendEdgeNetworkRequest({
      request: request
    }).then(function () {// Don't let response data disseminate beyond this
      // point unless necessary.
    });
  };
};

exports.default = _default;