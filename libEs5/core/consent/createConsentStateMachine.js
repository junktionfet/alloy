"use strict";

exports.default = exports.DECLINED_CONSENT_ERROR_CODE = exports.DECLINED_CONSENT = exports.CONSENT_SOURCE_NEW = exports.CONSENT_SOURCE_INITIAL = exports.CONSENT_SOURCE_DEFAULT = void 0;

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
var DECLINED_CONSENT = "The user declined consent.";
exports.DECLINED_CONSENT = DECLINED_CONSENT;
var DECLINED_CONSENT_ERROR_CODE = "declinedConsent";
exports.DECLINED_CONSENT_ERROR_CODE = DECLINED_CONSENT_ERROR_CODE;
var CONSENT_SOURCE_DEFAULT = "default";
exports.CONSENT_SOURCE_DEFAULT = CONSENT_SOURCE_DEFAULT;
var CONSENT_SOURCE_INITIAL = "initial";
exports.CONSENT_SOURCE_INITIAL = CONSENT_SOURCE_INITIAL;
var CONSENT_SOURCE_NEW = "new";
exports.CONSENT_SOURCE_NEW = CONSENT_SOURCE_NEW;

var createDeclinedConsentError = function createDeclinedConsentError(errorMessage) {
  var error = new Error(errorMessage);
  error.code = DECLINED_CONSENT_ERROR_CODE;
  error.message = errorMessage;
  return error;
};

var _default = function _default(_ref) {
  var logger = _ref.logger;
  var deferreds = [];

  var runAll = function runAll() {
    while (deferreds.length) {
      deferreds.shift().resolve();
    }
  };

  var discardAll = function discardAll() {
    while (deferreds.length) {
      deferreds.shift().reject(createDeclinedConsentError("The user declined consent."));
    }
  };

  var awaitInitial = function awaitInitial() {
    return Promise.reject(new Error("Consent has not been initialized."));
  };

  var awaitInDefault = function awaitInDefault() {
    return Promise.resolve();
  };

  var awaitIn = function awaitIn() {
    return Promise.resolve();
  };

  var awaitOutDefault = function awaitOutDefault() {
    return Promise.reject(createDeclinedConsentError("No consent preferences have been set."));
  };

  var awaitOut = function awaitOut() {
    return Promise.reject(createDeclinedConsentError("The user declined consent."));
  };

  var awaitPending = function awaitPending() {
    var deferred = (0, _utils.defer)();
    deferreds.push(deferred);
    return deferred.promise;
  };

  return {
    in: function _in(source) {
      if (source === CONSENT_SOURCE_DEFAULT) {
        this.awaitConsent = awaitInDefault;
      } else {
        if (source === CONSENT_SOURCE_INITIAL) {
          logger.info("Loaded user consent preferences. The user previously consented.");
        } else if (source === CONSENT_SOURCE_NEW && this.awaitConsent !== awaitIn) {
          logger.info("User consented.");
        }

        runAll();
        this.awaitConsent = awaitIn;
      }
    },
    out: function out(source) {
      if (source === CONSENT_SOURCE_DEFAULT) {
        logger.warn("User consent preferences not found. Default consent of out will be used.");
        this.awaitConsent = awaitOutDefault;
      } else {
        if (source === CONSENT_SOURCE_INITIAL) {
          logger.warn("Loaded user consent preferences. The user previously declined consent.");
        } else if (source === CONSENT_SOURCE_NEW && this.awaitConsent !== awaitOut) {
          logger.warn("User declined consent.");
        }

        discardAll();
        this.awaitConsent = awaitOut;
      }
    },
    pending: function pending(source) {
      if (source === CONSENT_SOURCE_DEFAULT) {
        logger.info("User consent preferences not found. Default consent of pending will be used. Some commands may be delayed.");
      }

      this.awaitConsent = awaitPending;
    },
    awaitConsent: awaitInitial
  };
};

exports.default = _default;