"use strict";

exports.default = void 0;

var _attachClickActivityCollector = require("./attachClickActivityCollector");

var _configValidators = require("./configValidators");

var _createLinkClick = require("./createLinkClick");

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
var createActivityCollector = function createActivityCollector(_ref) {
  var config = _ref.config,
      eventManager = _ref.eventManager,
      handleError = _ref.handleError;
  var linkClick = (0, _createLinkClick.default)(window, config);
  return {
    lifecycle: {
      onComponentsRegistered: function onComponentsRegistered(tools) {
        var lifecycle = tools.lifecycle;
        (0, _attachClickActivityCollector.default)({
          config: config,
          eventManager: eventManager,
          lifecycle: lifecycle,
          handleError: handleError
        }); // TODO: createScrollActivityCollector ...
      },
      onClick: function onClick(_ref2) {
        var event = _ref2.event,
            clickedElement = _ref2.clickedElement;
        linkClick(event, clickedElement);
      }
    }
  };
};

createActivityCollector.namespace = "ActivityCollector";
createActivityCollector.configValidators = _configValidators.default;
var _default = createActivityCollector;
exports.default = _default;