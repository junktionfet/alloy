"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _createPersonalizationDetails = require("./createPersonalizationDetails");

var _loggerMessage = require("./constants/loggerMessage");

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
  var logger = _ref.logger,
      fetchDataHandler = _ref.fetchDataHandler,
      viewChangeHandler = _ref.viewChangeHandler,
      onClickHandler = _ref.onClickHandler,
      isAuthoringModeEnabled = _ref.isAuthoringModeEnabled,
      mergeQuery = _ref.mergeQuery,
      viewCache = _ref.viewCache,
      showContainers = _ref.showContainers;
  return {
    lifecycle: {
      onBeforeEvent: function onBeforeEvent(_ref2) {
        var event = _ref2.event,
            renderDecisions = _ref2.renderDecisions,
            _ref2$decisionScopes = _ref2.decisionScopes,
            decisionScopes = _ref2$decisionScopes === void 0 ? [] : _ref2$decisionScopes,
            _ref2$onResponse = _ref2.onResponse,
            onResponse = _ref2$onResponse === void 0 ? _utils.noop : _ref2$onResponse,
            _ref2$onRequestFailur = _ref2.onRequestFailure,
            onRequestFailure = _ref2$onRequestFailur === void 0 ? _utils.noop : _ref2$onRequestFailur;
        // Include propositions on all responses, overridden with data as needed
        onResponse(function () {
          return {
            propositions: []
          };
        });
        onRequestFailure(function () {
          return showContainers();
        });

        if (isAuthoringModeEnabled()) {
          logger.warn(_loggerMessage.AUTHORING_ENABLED); // If we are in authoring mode we disable personalization

          mergeQuery(event, {
            enabled: false
          });
          return;
        }

        var personalizationDetails = (0, _createPersonalizationDetails.default)({
          renderDecisions: renderDecisions,
          decisionScopes: decisionScopes,
          event: event,
          viewCache: viewCache
        });

        if (personalizationDetails.shouldFetchData()) {
          var decisionsDeferred = (0, _utils.defer)();
          viewCache.storeViews(decisionsDeferred.promise);
          onRequestFailure(function () {
            return decisionsDeferred.reject();
          });
          fetchDataHandler({
            decisionsDeferred: decisionsDeferred,
            personalizationDetails: personalizationDetails,
            event: event,
            onResponse: onResponse
          });
          return;
        }

        if (personalizationDetails.shouldUseCachedData()) {
          // eslint-disable-next-line consistent-return
          return viewChangeHandler({
            personalizationDetails: personalizationDetails,
            event: event,
            onResponse: onResponse,
            onRequestFailure: onRequestFailure
          });
        }
      },
      onClick: function onClick(_ref3) {
        var event = _ref3.event,
            clickedElement = _ref3.clickedElement;
        onClickHandler({
          event: event,
          clickedElement: clickedElement
        });
      }
    }
  };
};

exports.default = _default;