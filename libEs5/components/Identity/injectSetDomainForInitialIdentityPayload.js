"use strict";

exports.default = void 0;

var _getBrowser = require("../../utils/getBrowser");

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
  var thirdPartyCookiesEnabled = _ref.thirdPartyCookiesEnabled,
      areThirdPartyCookiesSupportedByDefault = _ref.areThirdPartyCookiesSupportedByDefault;
  return function (request) {
    if (thirdPartyCookiesEnabled && areThirdPartyCookiesSupportedByDefault((0, _getBrowser.default)(window))) {
      // If third-party cookies are enabled by the customer and
      // supported by the browser, we will send the request to a
      // a third-party identification domain that allows for more accurate
      // identification of the user through use of a third-party cookie.
      // If we have an identity to migrate, we still want to hit the
      // third-party identification domain because the third-party identification
      // domain will use our ECID to set the third-party cookie if the third-party
      // cookie isn't already set, which provides for better cross-domain
      // identification for future requests.
      request.setUseIdThirdPartyDomain();
    }
  };
};

exports.default = _default;