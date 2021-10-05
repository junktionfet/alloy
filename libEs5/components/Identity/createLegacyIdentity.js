"use strict";

exports.default = void 0;

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
// TODO: We are already retrieving the apex in core; find a way to reuse it.
// Maybe default the domain in the cookieJar to apex while allowing overrides.
var apexDomain = (0, _utils.getApexDomain)(window, _utils.cookieJar);
/**
 * Handles migration of ECID to and from Visitor.js.
 */

var _default = function _default(_ref) {
  var config = _ref.config,
      getEcidFromVisitor = _ref.getEcidFromVisitor;
  var idMigrationEnabled = config.idMigrationEnabled,
      orgId = config.orgId;
  var amcvCookieName = "AMCV_" + orgId;

  var getEcidFromLegacyCookies = function getEcidFromLegacyCookies() {
    var ecid = null;
    var secidCookieName = "s_ecid";

    var legacyEcidCookieValue = _utils.cookieJar.get(secidCookieName) || _utils.cookieJar.get(amcvCookieName);

    if (legacyEcidCookieValue) {
      var reg = /(^|\|)MCMID\|(\d+)($|\|)/;
      var matches = legacyEcidCookieValue.match(reg);

      if (matches) {
        // Destructuring arrays breaks in IE
        ecid = matches[2];
      }
    }

    return ecid;
  };

  return {
    getEcid: function getEcid() {
      if (idMigrationEnabled) {
        var ecid = getEcidFromLegacyCookies();

        if (ecid) {
          return Promise.resolve(ecid);
        }

        return getEcidFromVisitor();
      }

      return Promise.resolve();
    },
    setEcid: function setEcid(ecid) {
      if (idMigrationEnabled && !_utils.cookieJar.get(amcvCookieName)) {
        _utils.cookieJar.set(amcvCookieName, "MCMID|" + ecid, {
          domain: apexDomain,
          // Without `expires` this will be a session cookie.
          expires: 390 // days, or 13 months.

        });
      }
    }
  };
};

exports.default = _default;