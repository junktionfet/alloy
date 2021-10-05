"use strict";

exports.default = void 0;

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
  var config = _ref.config,
      responseHandler = _ref.responseHandler,
      showContainers = _ref.showContainers,
      hideContainers = _ref.hideContainers,
      mergeQuery = _ref.mergeQuery;
  return function (_ref2) {
    var decisionsDeferred = _ref2.decisionsDeferred,
        personalizationDetails = _ref2.personalizationDetails,
        event = _ref2.event,
        onResponse = _ref2.onResponse,
        onRequestFailure = _ref2.onRequestFailure;
    var prehidingStyle = config.prehidingStyle;

    if (personalizationDetails.isRenderDecisions()) {
      hideContainers(prehidingStyle);
    }

    mergeQuery(event, personalizationDetails.createQueryDetails());
    onResponse(function (_ref3) {
      var response = _ref3.response;
      return responseHandler({
        decisionsDeferred: decisionsDeferred,
        personalizationDetails: personalizationDetails,
        response: response
      });
    });
    onRequestFailure(function () {
      decisionsDeferred.reject();
      showContainers();
    });
  };
};

exports.default = _default;