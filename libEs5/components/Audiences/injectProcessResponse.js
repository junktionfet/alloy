"use strict";

exports.default = void 0;

/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var processDestinations = _ref.processDestinations;

  var processPushDestinations = function processPushDestinations(_ref2) {
    var response = _ref2.response;
    var destinations = response.getPayloadsByType("activation:push");
    return processDestinations(destinations);
  };

  var retrievePullDestinations = function retrievePullDestinations(_ref3) {
    var response = _ref3.response;
    return {
      destinations: response.getPayloadsByType("activation:pull")
    };
  };

  return function (_ref4) {
    var response = _ref4.response;
    return processPushDestinations({
      response: response
    }).then(function () {
      return retrievePullDestinations({
        response: response
      });
    });
  };
};

exports.default = _default;