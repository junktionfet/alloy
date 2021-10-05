"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _cookieNameKey = require("../../constants/cookieNameKey");

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
  var parseConsentCookie = _ref.parseConsentCookie,
      orgId = _ref.orgId,
      cookieJar = _ref.cookieJar;
  var consentCookieName = (0, _utils.getNamespacedCookieName)(orgId, _cookieNameKey.CONSENT);
  return {
    read: function read() {
      var cookieValue = cookieJar.get(consentCookieName);
      return cookieValue ? parseConsentCookie(cookieValue) : {};
    },
    clear: function clear() {
      cookieJar.remove(consentCookieName);
    }
  };
};

exports.default = _default;