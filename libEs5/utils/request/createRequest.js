"use strict";

exports.default = void 0;

var _ = require("..");

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
// This provides the base functionality that all types of requests share.
var _default = function _default(options) {
  var payload = options.payload,
      _getAction = options.getAction,
      _getUseSendBeacon = options.getUseSendBeacon;
  var id = (0, _.uuid)();
  var shouldUseThirdPartyDomain = false;
  var isIdentityEstablished = false;
  return {
    getId: function getId() {
      return id;
    },
    getPayload: function getPayload() {
      return payload;
    },
    getAction: function getAction() {
      return _getAction({
        isIdentityEstablished: isIdentityEstablished
      });
    },
    getUseSendBeacon: function getUseSendBeacon() {
      return _getUseSendBeacon({
        isIdentityEstablished: isIdentityEstablished
      });
    },
    getUseIdThirdPartyDomain: function getUseIdThirdPartyDomain() {
      return shouldUseThirdPartyDomain;
    },
    setUseIdThirdPartyDomain: function setUseIdThirdPartyDomain() {
      shouldUseThirdPartyDomain = true;
    },
    setIsIdentityEstablished: function setIsIdentityEstablished() {
      isIdentityEstablished = true;
    }
  };
};

exports.default = _default;