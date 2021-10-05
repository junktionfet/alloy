"use strict";

exports.default = void 0;

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
  var eventManager = _ref.eventManager,
      mergeDecisionsMeta = _ref.mergeDecisionsMeta;
  // Called when an offer for a specific SPA view is auto-rendered.
  return function (_ref2) {
    var decisionsMeta = _ref2.decisionsMeta,
        xdm = _ref2.xdm;
    var data = {
      eventType: "display"
    };
    var event = eventManager.createEvent();

    if ((0, _utils.isNonEmptyArray)(decisionsMeta)) {
      var viewName = decisionsMeta[0].scope;
      data.web = {
        webPageDetails: {
          viewName: viewName
        }
      };
      mergeDecisionsMeta(event, decisionsMeta);
    }

    event.mergeXdm(data);
    event.mergeXdm(xdm);
    return eventManager.sendEvent(event);
  };
};

exports.default = _default;