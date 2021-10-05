"use strict";

exports.default = void 0;

var _consentStatus = require("../../constants/consentStatus");

var _consentPurpose = require("../../constants/consentPurpose");

var _createConsentStateMachine = require("./createConsentStateMachine");

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
  var generalConsentState = _ref.generalConsentState,
      logger = _ref.logger;

  var _setConsent = function setConsent(consentByPurpose, source) {
    switch (consentByPurpose[_consentPurpose.GENERAL]) {
      case _consentStatus.IN:
        generalConsentState.in(source);
        break;

      case _consentStatus.OUT:
        generalConsentState.out(source);
        break;

      case _consentStatus.PENDING:
        generalConsentState.pending(source);
        break;

      default:
        logger.warn("Unknown consent value: " + consentByPurpose[_consentPurpose.GENERAL]);
        break;
    }
  };

  return {
    initializeConsent: function initializeConsent(defaultConsentByPurpose, storedConsentByPurpose) {
      if (storedConsentByPurpose[_consentPurpose.GENERAL]) {
        _setConsent(storedConsentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_INITIAL);
      } else {
        _setConsent(defaultConsentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_DEFAULT);
      }
    },
    setConsent: function setConsent(consentByPurpose) {
      _setConsent(consentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_NEW);
    },
    suspend: function suspend() {
      generalConsentState.pending();
    },
    awaitConsent: function awaitConsent() {
      return generalConsentState.awaitConsent();
    }
  };
};

exports.default = _default;