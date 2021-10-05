"use strict";

exports.default = void 0;

var _injectWeb = require("./injectWeb");

var _injectDevice = require("./injectDevice");

var _injectEnvironment = require("./injectEnvironment");

var _injectPlaceContext = require("./injectPlaceContext");

var _injectTimestamp = require("./injectTimestamp");

var _implementationDetails = require("./implementationDetails");

var _createComponent = require("./createComponent");

var _validation = require("../../utils/validation");

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
var web = (0, _injectWeb.default)(window);
var device = (0, _injectDevice.default)(window);
var environment = (0, _injectEnvironment.default)(window);
var placeContext = (0, _injectPlaceContext.default)(function () {
  return new Date();
});
var timestamp = (0, _injectTimestamp.default)(function () {
  return new Date();
});
var optionalContexts = {
  web: web,
  device: device,
  environment: environment,
  placeContext: placeContext
};
var requiredContexts = [timestamp, _implementationDetails.default];

var createContext = function createContext(_ref) {
  var config = _ref.config,
      logger = _ref.logger;
  return (0, _createComponent.default)(config, logger, optionalContexts, requiredContexts);
};

createContext.namespace = "Context";
createContext.configValidators = {
  context: (0, _validation.arrayOf)((0, _validation.string)()).default(Object.keys(optionalContexts))
};
var _default = createContext;
exports.default = _default;