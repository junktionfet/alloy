"use strict";

exports.default = void 0;

var _validateUserEventOptions = require("./validateUserEventOptions");

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
var createDataCollector = function createDataCollector(_ref) {
  var eventManager = _ref.eventManager,
      logger = _ref.logger;
  return {
    commands: {
      sendEvent: {
        documentationUri: "https://adobe.ly/2r0uUjh",
        optionsValidator: function optionsValidator(options) {
          return (0, _validateUserEventOptions.default)({
            options: options,
            logger: logger
          });
        },
        run: function run(options) {
          var xdm = options.xdm,
              data = options.data,
              _options$documentUnlo = options.documentUnloading,
              documentUnloading = _options$documentUnlo === void 0 ? false : _options$documentUnlo,
              type = options.type,
              mergeId = options.mergeId,
              _options$renderDecisi = options.renderDecisions,
              renderDecisions = _options$renderDecisi === void 0 ? false : _options$renderDecisi,
              _options$decisionScop = options.decisionScopes,
              decisionScopes = _options$decisionScop === void 0 ? [] : _options$decisionScop,
              datasetId = options.datasetId;
          var event = eventManager.createEvent();

          if (documentUnloading) {
            event.documentMayUnload();
          }

          event.setUserXdm(xdm);
          event.setUserData(data);

          if (type) {
            event.mergeXdm({
              eventType: type
            });
          }

          if (mergeId) {
            event.mergeXdm({
              eventMergeId: mergeId
            });
          }

          if (datasetId) {
            event.mergeMeta({
              collect: {
                datasetId: datasetId
              }
            });
          }

          return eventManager.sendEvent(event, {
            renderDecisions: renderDecisions,
            decisionScopes: decisionScopes
          });
        }
      }
    }
  };
};

createDataCollector.namespace = "DataCollector";
createDataCollector.configValidators = {};
var _default = createDataCollector;
exports.default = _default;