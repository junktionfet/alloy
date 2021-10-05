"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _injectProcessDestinations = require("./injectProcessDestinations");

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
var createAudiences = function createAudiences(_ref) {
  var logger = _ref.logger;
  var processDestinations = (0, _injectProcessDestinations.default)({
    fireReferrerHideableImage: _utils.fireReferrerHideableImage,
    logger: logger
  });

  var processDestinationsFromResponse = function processDestinationsFromResponse(_ref2) {
    var response = _ref2.response;
    var destinations = response.getPayloadsByType("activation:push");
    return processDestinations(destinations);
  };

  return {
    lifecycle: {
      onResponse: processDestinationsFromResponse
    },
    commands: {}
  };
};

createAudiences.namespace = "Audiences";
createAudiences.configValidators = {};
var _default = createAudiences;
exports.default = _default;