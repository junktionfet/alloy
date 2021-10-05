"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _injectProcessIdSyncs = require("./injectProcessIdSyncs");

var _configValidators = require("./configValidators");

var _createComponent = require("./createComponent");

var _createLegacyIdentity = require("./createLegacyIdentity");

var _awaitVisitorOptIn = require("./visitorService/awaitVisitorOptIn");

var _injectGetEcidFromVisitor = require("./visitorService/injectGetEcidFromVisitor");

var _injectHandleResponseForIdSyncs = require("./injectHandleResponseForIdSyncs");

var _injectEnsureSingleIdentity = require("./injectEnsureSingleIdentity");

var _addEcidQueryToPayload = require("./addEcidQueryToPayload");

var _injectSetDomainForInitialIdentityPayload = require("./injectSetDomainForInitialIdentityPayload");

var _injectAddLegacyEcidToPayload = require("./injectAddLegacyEcidToPayload");

var _addEcidToPayload = require("./addEcidToPayload");

var _injectAwaitIdentityCookie = require("./injectAwaitIdentityCookie");

var _getEcidFromResponse = require("./getEcidFromResponse");

var _createGetIdentity = require("./getIdentity/createGetIdentity");

var _createIdentityRequest = require("./getIdentity/createIdentityRequest");

var _createIdentityRequestPayload = require("./getIdentity/createIdentityRequestPayload");

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
var createIdentity = function createIdentity(_ref) {
  var config = _ref.config,
      logger = _ref.logger,
      consent = _ref.consent,
      sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest;
  var orgId = config.orgId,
      thirdPartyCookiesEnabled = config.thirdPartyCookiesEnabled;
  var getEcidFromVisitor = (0, _injectGetEcidFromVisitor.default)({
    logger: logger,
    orgId: orgId,
    awaitVisitorOptIn: _awaitVisitorOptIn.default
  });
  var legacyIdentity = (0, _createLegacyIdentity.default)({
    config: config,
    getEcidFromVisitor: getEcidFromVisitor
  });
  var doesIdentityCookieExist = (0, _utils.injectDoesIdentityCookieExist)({
    orgId: orgId
  });
  var getIdentity = (0, _createGetIdentity.default)({
    sendEdgeNetworkRequest: sendEdgeNetworkRequest,
    createIdentityRequestPayload: _createIdentityRequestPayload.default,
    createIdentityRequest: _createIdentityRequest.default
  });
  var setDomainForInitialIdentityPayload = (0, _injectSetDomainForInitialIdentityPayload.default)({
    thirdPartyCookiesEnabled: thirdPartyCookiesEnabled,
    areThirdPartyCookiesSupportedByDefault: _utils.areThirdPartyCookiesSupportedByDefault
  });
  var addLegacyEcidToPayload = (0, _injectAddLegacyEcidToPayload.default)({
    getLegacyEcid: legacyIdentity.getEcid,
    addEcidToPayload: _addEcidToPayload.default
  });
  var awaitIdentityCookie = (0, _injectAwaitIdentityCookie.default)({
    orgId: orgId,
    doesIdentityCookieExist: doesIdentityCookieExist
  });
  var ensureSingleIdentity = (0, _injectEnsureSingleIdentity.default)({
    doesIdentityCookieExist: doesIdentityCookieExist,
    setDomainForInitialIdentityPayload: setDomainForInitialIdentityPayload,
    addLegacyEcidToPayload: addLegacyEcidToPayload,
    awaitIdentityCookie: awaitIdentityCookie,
    logger: logger
  });
  var processIdSyncs = (0, _injectProcessIdSyncs.default)({
    fireReferrerHideableImage: _utils.fireReferrerHideableImage,
    logger: logger
  });
  var handleResponseForIdSyncs = (0, _injectHandleResponseForIdSyncs.default)({
    processIdSyncs: processIdSyncs
  });
  return (0, _createComponent.default)({
    ensureSingleIdentity: ensureSingleIdentity,
    addEcidQueryToPayload: _addEcidQueryToPayload.default,
    setLegacyEcid: legacyIdentity.setEcid,
    handleResponseForIdSyncs: handleResponseForIdSyncs,
    getEcidFromResponse: _getEcidFromResponse.default,
    getIdentity: getIdentity,
    consent: consent
  });
};

createIdentity.namespace = "Identity";
createIdentity.configValidators = _configValidators.default;
var _default = createIdentity;
exports.default = _default;