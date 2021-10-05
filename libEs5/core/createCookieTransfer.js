"use strict";

exports.default = void 0;

var _utils = require("../utils");

var _convertTimes = require("../utils/convertTimes");

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
var STATE_STORE_HANDLE_TYPE = "state:store";

var _default = function _default(_ref) {
  var cookieJar = _ref.cookieJar,
      orgId = _ref.orgId,
      apexDomain = _ref.apexDomain;
  return {
    /**
     * When sending to a third-party endpoint, the endpoint won't be able to
     * access first-party cookies, therefore we transfer cookies into
     * the request body so they can be read by the server.
     */
    cookiesToPayload: function cookiesToPayload(payload, endpointDomain) {
      var isEndpointFirstParty = (0, _utils.endsWith)(endpointDomain, apexDomain);
      var state = {
        domain: apexDomain,
        cookiesEnabled: true
      }; // If the endpoint is first-party, there's no need to transfer cookies
      // to the payload since they'll be automatically passed through cookie
      // headers.

      if (!isEndpointFirstParty) {
        var cookies = cookieJar.get();
        var entries = Object.keys(cookies).filter(function (name) {
          // We have a contract with the server that we will pass
          // all cookies whose names are namespaced according to the
          // logic in isNamespacedCookieName as well as any legacy
          // cookie names (so that the server can handle migrating
          // identities on websites previously using Visitor.js)
          return (0, _utils.isNamespacedCookieName)(orgId, name);
        }).map(function (qualifyingCookieName) {
          return {
            key: qualifyingCookieName,
            value: cookies[qualifyingCookieName]
          };
        });

        if (entries.length) {
          state.entries = entries;
        }
      }

      payload.mergeState(state);
    },

    /**
     * When receiving from a third-party endpoint, the endpoint won't be able to
     * write first-party cookies, therefore we write first-party cookies
     * as directed in the response body.
     */
    responseToCookies: function responseToCookies(response) {
      response.getPayloadsByType(STATE_STORE_HANDLE_TYPE).forEach(function (stateItem) {
        var options = {
          domain: apexDomain
        };

        if (stateItem.maxAge !== undefined) {
          // cookieJar expects "expires" in days
          options.expires = (0, _convertTimes.default)(_convertTimes.SECOND, _convertTimes.DAY, stateItem.maxAge);
        }

        cookieJar.set(stateItem.key, stateItem.value, options);
      });
    }
  };
};

exports.default = _default;