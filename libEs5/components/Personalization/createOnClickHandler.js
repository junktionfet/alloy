"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _eventType = require("./constants/eventType");

var _scope = require("./constants/scope");

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
      collectClicks = _ref.collectClicks,
      getClickSelectors = _ref.getClickSelectors,
      getClickMetasBySelector = _ref.getClickMetasBySelector;
  // Called when an element qualifying for conversion within an offer is clicked.
  return function (_ref2) {
    var event = _ref2.event,
        clickedElement = _ref2.clickedElement;
    var selectors = getClickSelectors();

    if ((0, _utils.isNonEmptyArray)(selectors)) {
      var decisionsMeta = collectClicks(clickedElement, selectors, getClickMetasBySelector);

      if ((0, _utils.isNonEmptyArray)(decisionsMeta)) {
        var xdm = {
          eventType: _eventType.INTERACT
        };
        var scope = decisionsMeta[0].scope;

        if (scope !== _scope.default) {
          xdm.web = {
            webPageDetails: {
              viewName: scope
            }
          };
        }

        event.mergeXdm(xdm);
        mergeDecisionsMeta(event, decisionsMeta);
      }
    }
  };
};

exports.default = _default;