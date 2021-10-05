"use strict";

exports.default = void 0;

var _utils = require("../utils");

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
var EVENT_CANCELLATION_MESSAGE = "Event was canceled because the onBeforeEventSend callback returned false.";

var _default = function _default(_ref) {
  var config = _ref.config,
      logger = _ref.logger,
      lifecycle = _ref.lifecycle,
      consent = _ref.consent,
      createEvent = _ref.createEvent,
      createDataCollectionRequestPayload = _ref.createDataCollectionRequestPayload,
      createDataCollectionRequest = _ref.createDataCollectionRequest,
      sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest;
  var onBeforeEventSend = config.onBeforeEventSend;
  return {
    createEvent: createEvent,

    /**
     * Sends an event. This includes running the event and payload through
     * the appropriate lifecycle hooks, sending the request to the server,
     * and handling the response.
     * @param {Object} event This will be JSON stringified and used inside
     * the request payload.
     * @param {Object} [options]
     * @param {boolean} [options.renderDecisions=false]
     * @param {Array} [options.decisionScopes]
     * This will be passed to components
     * so they can take appropriate action.
     * @returns {*}
     */
    sendEvent: function sendEvent(event) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$renderDecisi = options.renderDecisions,
          renderDecisions = _options$renderDecisi === void 0 ? false : _options$renderDecisi,
          decisionScopes = options.decisionScopes;
      var payload = createDataCollectionRequestPayload();
      var request = createDataCollectionRequest(payload);
      var onResponseCallbackAggregator = (0, _utils.createCallbackAggregator)();
      var onRequestFailureCallbackAggregator = (0, _utils.createCallbackAggregator)();
      return lifecycle.onBeforeEvent({
        event: event,
        renderDecisions: renderDecisions,
        decisionScopes: decisionScopes,
        onResponse: onResponseCallbackAggregator.add,
        onRequestFailure: onRequestFailureCallbackAggregator.add
      }).then(function () {
        payload.addEvent(event);
        return consent.awaitConsent();
      }).then(function () {
        try {
          // NOTE: this calls onBeforeEventSend callback (if configured)
          event.finalize(onBeforeEventSend);
        } catch (error) {
          var throwError = function throwError() {
            throw error;
          };

          onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
          return onRequestFailureCallbackAggregator.call({
            error: error
          }).then(throwError, throwError);
        } // if the callback returns false, the event should not be sent


        if (!event.shouldSend()) {
          onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
          logger.info(EVENT_CANCELLATION_MESSAGE);
          var error = new Error(EVENT_CANCELLATION_MESSAGE);
          return onRequestFailureCallbackAggregator.call({
            error: error
          }).then(function () {// Ensure the promise gets resolved with undefined instead
            // of an array of return values from the callbacks.
          });
        }

        return sendEdgeNetworkRequest({
          request: request,
          runOnResponseCallbacks: onResponseCallbackAggregator.call,
          runOnRequestFailureCallbacks: onRequestFailureCallbackAggregator.call
        });
      });
    }
  };
};

exports.default = _default;