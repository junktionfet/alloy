"use strict";

exports.default = void 0;

var _composePersonalizationResultingObject = require("./utils/composePersonalizationResultingObject");

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
var _default = function _default(_ref) {
  var mergeDecisionsMeta = _ref.mergeDecisionsMeta,
      collect = _ref.collect,
      executeDecisions = _ref.executeDecisions,
      viewCache = _ref.viewCache;
  return function (_ref2) {
    var personalizationDetails = _ref2.personalizationDetails,
        event = _ref2.event,
        onResponse = _ref2.onResponse;
    var viewName = personalizationDetails.getViewName();
    return viewCache.getView(viewName).then(function (viewDecisions) {
      if (personalizationDetails.isRenderDecisions()) {
        return executeDecisions(viewDecisions).then(function (decisionsMeta) {
          // if there are decisions to be rendered we render them and attach the result in experience.decisions.propositions
          if ((0, _utils.isNonEmptyArray)(decisionsMeta)) {
            mergeDecisionsMeta(event, decisionsMeta);
            onResponse(function () {
              return (0, _composePersonalizationResultingObject.default)(viewDecisions, true);
            });
            return;
          } // if there are no decisions in cache for this view, we will send a empty notification


          onResponse(function () {
            collect({
              decisionsMeta: [],
              viewName: viewName
            });
            return (0, _composePersonalizationResultingObject.default)(viewDecisions, true);
          });
        });
      }

      onResponse(function () {
        return (0, _composePersonalizationResultingObject.default)(viewDecisions, false);
      });
      return {};
    });
  };
};

exports.default = _default;