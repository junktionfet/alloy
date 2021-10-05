"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _getIdentityOptionsValidator = require("./getIdentity/getIdentityOptionsValidator");

var _default = function _default(_ref) {
  var addEcidQueryToPayload = _ref.addEcidQueryToPayload,
      ensureSingleIdentity = _ref.ensureSingleIdentity,
      setLegacyEcid = _ref.setLegacyEcid,
      handleResponseForIdSyncs = _ref.handleResponseForIdSyncs,
      getEcidFromResponse = _ref.getEcidFromResponse,
      getIdentity = _ref.getIdentity,
      consent = _ref.consent;
  var ecid;
  var edge = {};
  return {
    lifecycle: {
      onBeforeRequest: function onBeforeRequest(_ref2) {
        var request = _ref2.request,
            onResponse = _ref2.onResponse,
            onRequestFailure = _ref2.onRequestFailure;
        // Querying the ECID on every request to be able to set the legacy cookie, and make it
        // available for the `getIdentity` command.
        addEcidQueryToPayload(request.getPayload());
        return ensureSingleIdentity({
          request: request,
          onResponse: onResponse,
          onRequestFailure: onRequestFailure
        });
      },
      onResponse: function onResponse(_ref3) {
        var response = _ref3.response;

        if (!ecid) {
          ecid = getEcidFromResponse(response); // Only data collection calls will have an ECID in the response.
          // https://jira.corp.adobe.com/browse/EXEG-1234

          if (ecid) {
            setLegacyEcid(ecid);
          }
        } // For sendBeacon requests, getEdge() will return {}, so we are using assign here
        // so that sendBeacon requests don't override the edge info from before.


        edge = (0, _utils.assign)(edge, response.getEdge());
        return handleResponseForIdSyncs(response);
      }
    },
    commands: {
      getIdentity: {
        optionsValidator: _getIdentityOptionsValidator.default,
        run: function run(options) {
          return consent.awaitConsent().then(function () {
            return ecid ? undefined : getIdentity(options.namespaces);
          }).then(function () {
            return {
              identity: {
                ECID: ecid
              },
              edge: edge
            };
          });
        }
      }
    }
  };
};

exports.default = _default;