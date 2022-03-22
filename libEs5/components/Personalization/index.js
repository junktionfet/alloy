"use strict";

exports.default = void 0;

var _validation = require("../../utils/validation");

var _createComponent = require("./createComponent");

var _domActions = require("./dom-actions");

var _createCollect = require("./createCollect");

var _createExecuteDecisions = require("./createExecuteDecisions");

var _flicker = require("./flicker");

var _createFetchDataHandler = require("./createFetchDataHandler");

var _collectClicks = require("./dom-actions/clicks/collectClicks");

var _isAuthoringModeEnabled = require("./utils/isAuthoringModeEnabled");

var _event = require("./event");

var _createOnClickHandler = require("./createOnClickHandler");

var _createViewCacheManager = require("./createViewCacheManager");

var _createViewChangeHandler = require("./createViewChangeHandler");

var _groupDecisions = require("./groupDecisions");

var _createOnResponseHandler = require("./createOnResponseHandler");

var _createClickStorage2 = require("./createClickStorage");

var _createRedirectHandler = require("./createRedirectHandler");

var _createAutoRenderingHandler = require("./createAutoRenderingHandler");

var _createNonRenderingHandler = require("./createNonRenderingHandler");

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
var createPersonalization = function createPersonalization(_ref) {
  var config = _ref.config,
      logger = _ref.logger,
      eventManager = _ref.eventManager;
  var collect = (0, _createCollect.default)({
    eventManager: eventManager,
    mergeDecisionsMeta: _event.mergeDecisionsMeta
  });

  var _createClickStorage = (0, _createClickStorage2.default)(),
      getClickMetasBySelector = _createClickStorage.getClickMetasBySelector,
      getClickSelectors = _createClickStorage.getClickSelectors,
      storeClickMetrics = _createClickStorage.storeClickMetrics;

  var viewCache = (0, _createViewCacheManager.default)();
  var modules = (0, _domActions.initDomActionsModules)(storeClickMetrics);
  var executeDecisions = (0, _createExecuteDecisions.default)({
    modules: modules,
    logger: logger,
    executeActions: _domActions.executeActions
  });
  var handleRedirectDecisions = (0, _createRedirectHandler.default)({
    collect: collect,
    window: window,
    logger: logger,
    showContainers: _flicker.showContainers
  });
  var autoRenderingHandler = (0, _createAutoRenderingHandler.default)({
    viewCache: viewCache,
    executeDecisions: executeDecisions,
    showContainers: _flicker.showContainers,
    collect: collect
  });
  var nonRenderingHandler = (0, _createNonRenderingHandler.default)({
    viewCache: viewCache
  });
  var responseHandler = (0, _createOnResponseHandler.default)({
    autoRenderingHandler: autoRenderingHandler,
    nonRenderingHandler: nonRenderingHandler,
    groupDecisions: _groupDecisions.default,
    handleRedirectDecisions: handleRedirectDecisions,
    showContainers: _flicker.showContainers
  });
  var fetchDataHandler = (0, _createFetchDataHandler.default)({
    config: config,
    responseHandler: responseHandler,
    hideContainers: _flicker.hideContainers,
    mergeQuery: _event.mergeQuery
  });
  var onClickHandler = (0, _createOnClickHandler.default)({
    mergeDecisionsMeta: _event.mergeDecisionsMeta,
    collectClicks: _collectClicks.default,
    getClickSelectors: getClickSelectors,
    getClickMetasBySelector: getClickMetasBySelector
  });
  var viewChangeHandler = (0, _createViewChangeHandler.default)({
    mergeDecisionsMeta: _event.mergeDecisionsMeta,
    collect: collect,
    executeDecisions: executeDecisions,
    viewCache: viewCache
  });
  return (0, _createComponent.default)({
    logger: logger,
    fetchDataHandler: fetchDataHandler,
    viewChangeHandler: viewChangeHandler,
    onClickHandler: onClickHandler,
    isAuthoringModeEnabled: _isAuthoringModeEnabled.default,
    mergeQuery: _event.mergeQuery,
    viewCache: viewCache,
    showContainers: _flicker.showContainers
  });
};

createPersonalization.namespace = "Personalization";
createPersonalization.configValidators = {
  prehidingStyle: (0, _validation.string)().nonEmpty()
};
var _default = createPersonalization;
exports.default = _default;