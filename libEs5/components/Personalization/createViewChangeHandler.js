"use strict";

exports.default = void 0;

var _addRenderAttemptedToDecisions = require("./utils/addRenderAttemptedToDecisions");

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
  var executeCachedViewDecisions = _ref.executeCachedViewDecisions,
      viewCache = _ref.viewCache,
      showContainers = _ref.showContainers;
  return function (_ref2) {
    var personalizationDetails = _ref2.personalizationDetails,
        onResponse = _ref2.onResponse,
        onRequestFailure = _ref2.onRequestFailure;
    var viewName = personalizationDetails.getViewName();
    return viewCache.getView(viewName).then(function (currentViewDecisions) {
      if (personalizationDetails.isRenderDecisions()) {
        executeCachedViewDecisions({
          viewName: viewName,
          viewDecisions: currentViewDecisions
        });
      }

      onResponse(function () {
        return personalizationDetails.isRenderDecisions() ? {
          propositions: (0, _addRenderAttemptedToDecisions.default)({
            decisions: currentViewDecisions,
            renderAttempted: true
          })
        } : {
          decisions: currentViewDecisions,
          propositions: (0, _addRenderAttemptedToDecisions.default)({
            decisions: currentViewDecisions,
            renderAttempted: false
          })
        };
      });
      onRequestFailure(function () {
        showContainers();
      });
    });
  };
};

exports.default = _default;