"use strict";

exports.default = void 0;

var _eventType = require("./constants/eventType");

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
  // Called when a decision is auto-rendered for the __view__ scope or a SPA view(display and empty display notification)
  return function (_ref2) {
    var _ref2$decisionsMeta = _ref2.decisionsMeta,
        decisionsMeta = _ref2$decisionsMeta === void 0 ? [] : _ref2$decisionsMeta,
        _ref2$documentMayUnlo = _ref2.documentMayUnload,
        documentMayUnload = _ref2$documentMayUnlo === void 0 ? false : _ref2$documentMayUnlo,
        viewName = _ref2.viewName;
    var event = eventManager.createEvent();
    var data = {
      eventType: _eventType.DISPLAY
    };

    if (viewName) {
      data.web = {
        webPageDetails: {
          viewName: viewName
        }
      };
    }

    if ((0, _utils.isNonEmptyArray)(decisionsMeta)) {
      mergeDecisionsMeta(event, decisionsMeta);
    }

    event.mergeXdm(data);

    if (documentMayUnload) {
      event.documentMayUnload();
    }

    return eventManager.sendEvent(event);
  };
};

exports.default = _default;