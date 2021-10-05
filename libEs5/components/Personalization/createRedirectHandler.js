"use strict";

exports.default = void 0;

var _loggerMessage = require("./constants/loggerMessage");

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
var getRedirectDetails = function getRedirectDetails(redirectDecisions) {
  var decision = redirectDecisions[0];
  var items = decision.items,
      id = decision.id,
      scope = decision.scope,
      scopeDetails = decision.scopeDetails;
  var content = items[0].data.content;
  return {
    content: content,
    decisions: [{
      id: id,
      scope: scope,
      scopeDetails: scopeDetails
    }]
  };
};

var _default = function _default(_ref) {
  var collect = _ref.collect,
      window = _ref.window,
      logger = _ref.logger,
      showContainers = _ref.showContainers;
  return function (redirectDecisions) {
    var _getRedirectDetails = getRedirectDetails(redirectDecisions),
        content = _getRedirectDetails.content,
        decisions = _getRedirectDetails.decisions;

    var documentMayUnload = true;
    return collect({
      decisionsMeta: decisions,
      documentMayUnload: documentMayUnload
    }).then(function () {
      window.location.replace(content);
    }).catch(function () {
      showContainers();
      logger.warn(_loggerMessage.REDIRECT_EXECUTION_ERROR);
    });
  };
};

exports.default = _default;