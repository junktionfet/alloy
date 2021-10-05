"use strict";

exports.default = void 0;

var _consentPurpose = require("../../constants/consentPurpose");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(_ref) {
  var storedConsent = _ref.storedConsent,
      taskQueue = _ref.taskQueue,
      defaultConsent = _ref.defaultConsent,
      consent = _ref.consent,
      sendSetConsentRequest = _ref.sendSetConsentRequest,
      validateSetConsentOptions = _ref.validateSetConsentOptions,
      consentHashStore = _ref.consentHashStore,
      doesIdentityCookieExist = _ref.doesIdentityCookieExist;

  var defaultConsentByPurpose = _defineProperty({}, _consentPurpose.GENERAL, defaultConsent);

  var storedConsentByPurpose = storedConsent.read();
  var identityCookieExists = doesIdentityCookieExist();
  var consentCookieExists = storedConsentByPurpose[_consentPurpose.GENERAL] !== undefined;

  if (!identityCookieExists || !consentCookieExists) {
    consentHashStore.clear();
  } // If the identity cookie is gone, remove the consent cookie because the
  // consent info is tied to the identity.


  if (!identityCookieExists) {
    storedConsent.clear();
    storedConsentByPurpose = {};
  }

  consent.initializeConsent(defaultConsentByPurpose, storedConsentByPurpose);

  var readCookieIfQueueEmpty = function readCookieIfQueueEmpty() {
    if (taskQueue.length === 0) {
      var storedConsentObject = storedConsent.read(); // Only read cookies when there are no outstanding setConsent
      // requests. This helps with race conditions.

      if (storedConsentObject[_consentPurpose.GENERAL] !== undefined) {
        consent.setConsent(storedConsentObject);
      }
    }
  };

  return {
    commands: {
      setConsent: {
        optionsValidator: validateSetConsentOptions,
        run: function run(_ref2) {
          var consentOptions = _ref2.consent,
              identityMap = _ref2.identityMap;
          consent.suspend();
          var consentHashes = consentHashStore.lookup(consentOptions);
          return taskQueue.addTask(function () {
            if (consentHashes.isNew()) {
              return sendSetConsentRequest({
                consentOptions: consentOptions,
                identityMap: identityMap
              });
            }

            return Promise.resolve();
          }).then(function () {
            return consentHashes.save();
          }).finally(readCookieIfQueueEmpty);
        }
      }
    },
    lifecycle: {
      // Read the cookie here too because the consent cookie may change on any request
      onResponse: readCookieIfQueueEmpty,
      // Even when we get a failure HTTP status code, the consent cookie can
      // still get updated. This could happen, for example, if the user is
      // opted out in AudienceManager, but no consent cookie exists on the
      // client. The request will be sent and the server will respond with a
      // 403 Forbidden and a consent cookie.
      onRequestFailure: readCookieIfQueueEmpty
    }
  };
};

exports.default = _default;