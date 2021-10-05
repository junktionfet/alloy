"use strict";

exports.default = void 0;

var _utils = require("../../utils");

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
var createClickHandler = function createClickHandler(_ref) {
  var eventManager = _ref.eventManager,
      lifecycle = _ref.lifecycle,
      handleError = _ref.handleError;
  return function (clickEvent) {
    // TODO: Consider safeguarding from the same object being clicked multiple times in rapid succession?
    var clickedElement = clickEvent.target;
    var event = eventManager.createEvent();
    return lifecycle.onClick({
      event: event,
      clickedElement: clickedElement
    }).then(function () {
      if (event.isEmpty()) {
        return Promise.resolve();
      }

      return eventManager.sendEvent(event);
    }) // eventManager.sendEvent() will return a promise resolved to an
    // object and we want to avoid returning any value to the customer
    .then(_utils.noop).catch(function (error) {
      handleError(error, "click collection");
    });
  };
};

var _default = function _default(_ref2) {
  var config = _ref2.config,
      eventManager = _ref2.eventManager,
      lifecycle = _ref2.lifecycle,
      handleError = _ref2.handleError;
  var enabled = config.clickCollectionEnabled;

  if (!enabled) {
    return;
  }

  var clickHandler = createClickHandler({
    eventManager: eventManager,
    lifecycle: lifecycle,
    handleError: handleError
  });
  document.addEventListener("click", clickHandler, true);
};

exports.default = _default;