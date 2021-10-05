"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _createComponent = require("./createComponent");

var _createConsentHashStore = require("./createConsentHashStore");

var _createConsentRequestPayload = require("./createConsentRequestPayload");

var _createConsentRequest = require("./createConsentRequest");

var _createStoredConsent = require("./createStoredConsent");

var _injectSendSetConsentRequest = require("./injectSendSetConsentRequest");

var _parseConsentCookie = require("./parseConsentCookie");

var _validateSetConsentOptions = require("./validateSetConsentOptions");

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
var createPrivacy = function createPrivacy(_ref) {
  var config = _ref.config,
      consent = _ref.consent,
      sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
      createNamespacedStorage = _ref.createNamespacedStorage;
  var orgId = config.orgId,
      defaultConsent = config.defaultConsent;
  var storedConsent = (0, _createStoredConsent.default)({
    parseConsentCookie: _parseConsentCookie.default,
    orgId: orgId,
    cookieJar: _utils.cookieJar
  });
  var taskQueue = (0, _utils.createTaskQueue)();
  var sendSetConsentRequest = (0, _injectSendSetConsentRequest.default)({
    createConsentRequestPayload: _createConsentRequestPayload.default,
    createConsentRequest: _createConsentRequest.default,
    sendEdgeNetworkRequest: sendEdgeNetworkRequest
  });
  var storage = createNamespacedStorage((0, _utils.sanitizeOrgIdForCookieName)(orgId) + ".consentHashes.");
  var consentHashStore = (0, _createConsentHashStore.default)({
    storage: storage.persistent
  });
  var doesIdentityCookieExist = (0, _utils.injectDoesIdentityCookieExist)({
    orgId: orgId
  });
  return (0, _createComponent.default)({
    storedConsent: storedConsent,
    taskQueue: taskQueue,
    defaultConsent: defaultConsent,
    consent: consent,
    sendSetConsentRequest: sendSetConsentRequest,
    validateSetConsentOptions: _validateSetConsentOptions.default,
    consentHashStore: consentHashStore,
    doesIdentityCookieExist: doesIdentityCookieExist
  });
};

createPrivacy.namespace = "Privacy";
var _default = createPrivacy;
exports.default = _default;