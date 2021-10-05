"use strict";

exports.default = void 0;

var _isNonEmptyArray = require("../../utils/isNonEmptyArray");

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
var DECISIONS_HANDLE = "personalization:decisions";

var _default = function _default(_ref) {
  var autoRenderingHandler = _ref.autoRenderingHandler,
      nonRenderingHandler = _ref.nonRenderingHandler,
      groupDecisions = _ref.groupDecisions,
      handleRedirectDecisions = _ref.handleRedirectDecisions,
      showContainers = _ref.showContainers;
  return function (_ref2) {
    var decisionsDeferred = _ref2.decisionsDeferred,
        personalizationDetails = _ref2.personalizationDetails,
        response = _ref2.response;
    var unprocessedDecisions = response.getPayloadsByType(DECISIONS_HANDLE);
    var viewName = personalizationDetails.getViewName(); // if personalization payload is empty return empty decisions array

    if (unprocessedDecisions.length === 0) {
      showContainers();
      decisionsDeferred.resolve({});
      return {
        decisions: [],
        propositions: []
      };
    }

    var _groupDecisions = groupDecisions(unprocessedDecisions),
        redirectDecisions = _groupDecisions.redirectDecisions,
        pageWideScopeDecisions = _groupDecisions.pageWideScopeDecisions,
        viewDecisions = _groupDecisions.viewDecisions,
        nonAutoRenderableDecisions = _groupDecisions.nonAutoRenderableDecisions;

    if (personalizationDetails.isRenderDecisions() && (0, _isNonEmptyArray.default)(redirectDecisions)) {
      decisionsDeferred.resolve({});
      return handleRedirectDecisions(redirectDecisions);
    } // save decisions for views in local cache


    decisionsDeferred.resolve(viewDecisions);

    if (personalizationDetails.isRenderDecisions()) {
      return autoRenderingHandler({
        viewName: viewName,
        pageWideScopeDecisions: pageWideScopeDecisions,
        nonAutoRenderableDecisions: nonAutoRenderableDecisions
      });
    }

    return nonRenderingHandler({
      viewName: viewName,
      redirectDecisions: redirectDecisions,
      pageWideScopeDecisions: pageWideScopeDecisions,
      nonAutoRenderableDecisions: nonAutoRenderableDecisions
    });
  };
};

exports.default = _default;