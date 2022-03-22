"use strict";

exports.default = exports.createExecuteCommand = void 0;

var _createInstanceFunction = require("./createInstanceFunction");

var _utils = require("../utils");

var _createLogController = require("./createLogController");

var _createLifecycle = require("./createLifecycle");

var _createComponentRegistry = require("./createComponentRegistry");

var _injectSendNetworkRequest = require("./network/injectSendNetworkRequest");

var _injectExtractEdgeInfo = require("./edgeNetwork/injectExtractEdgeInfo");

var _createConsent = require("./consent/createConsent");

var _createConsentStateMachine = require("./consent/createConsentStateMachine");

var _createEvent = require("./createEvent");

var _injectCreateResponse = require("./injectCreateResponse");

var _injectExecuteCommand = require("./injectExecuteCommand");

var _validateCommandOptions = require("./validateCommandOptions");

var _componentCreators = require("./componentCreators");

var _buildAndValidateConfig = require("./buildAndValidateConfig");

var _initializeComponents = require("./initializeComponents");

var _createConfig = require("./config/createConfig");

var _createCoreConfigs = require("./config/createCoreConfigs");

var _injectHandleError = require("./injectHandleError");

var _injectSendFetchRequest = require("./network/requestMethods/injectSendFetchRequest");

var _injectSendXhrRequest = require("./network/requestMethods/injectSendXhrRequest");

var _injectSendBeaconRequest = require("./network/requestMethods/injectSendBeaconRequest");

var _createLogger = require("./createLogger");

var _createEventManager = require("./createEventManager");

var _createCookieTransfer = require("./createCookieTransfer");

var _request = require("../utils/request");

var _injectSendEdgeNetworkRequest = require("./edgeNetwork/injectSendEdgeNetworkRequest");

var _injectProcessWarningsAndErrors = require("./edgeNetwork/injectProcessWarningsAndErrors");

var _isRequestRetryable = require("./network/isRequestRetryable");

var _getRequestRetryDelay = require("./network/getRequestRetryDelay");

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
var createNamespacedStorage = (0, _utils.injectStorage)(window);
var _window = window,
    console = _window.console,
    fetch = _window.fetch,
    navigator = _window.navigator,
    XMLHttpRequest = _window.XMLHttpRequest; // set this up as a function so that monitors can be added at anytime
// eslint-disable-next-line no-underscore-dangle

var getMonitors = function getMonitors() {
  return window.__alloyMonitors || [];
};

var coreConfigValidators = (0, _createCoreConfigs.default)();
var apexDomain = (0, _utils.getApexDomain)(window, _utils.cookieJar);
var sendFetchRequest = (0, _utils.isFunction)(fetch) ? (0, _injectSendFetchRequest.default)({
  fetch: fetch
}) : (0, _injectSendXhrRequest.default)({
  XMLHttpRequest: XMLHttpRequest
});

var createExecuteCommand = function createExecuteCommand(_ref) {
  var instanceName = _ref.instanceName,
      _ref$logController = _ref.logController,
      setDebugEnabled = _ref$logController.setDebugEnabled,
      logger = _ref$logController.logger,
      createComponentLogger = _ref$logController.createComponentLogger;
  var componentRegistry = (0, _createComponentRegistry.default)();
  var lifecycle = (0, _createLifecycle.default)(componentRegistry);

  var setDebugCommand = function setDebugCommand(options) {
    setDebugEnabled(options.enabled, {
      fromConfig: false
    });
  };

  var configureCommand = function configureCommand(options) {
    var config = (0, _buildAndValidateConfig.default)({
      options: options,
      componentCreators: _componentCreators.default,
      coreConfigValidators: coreConfigValidators,
      createConfig: _createConfig.default,
      logger: logger,
      setDebugEnabled: setDebugEnabled
    });
    var cookieTransfer = (0, _createCookieTransfer.default)({
      cookieJar: _utils.cookieJar,
      orgId: config.orgId,
      apexDomain: apexDomain
    });
    var sendBeaconRequest = (0, _utils.isFunction)(navigator.sendBeacon) ? (0, _injectSendBeaconRequest.default)({
      // Without the bind(), the browser will complain about an
      // illegal invocation.
      sendBeacon: navigator.sendBeacon.bind(navigator),
      sendFetchRequest: sendFetchRequest,
      logger: logger
    }) : sendFetchRequest;
    var sendNetworkRequest = (0, _injectSendNetworkRequest.default)({
      logger: logger,
      sendFetchRequest: sendFetchRequest,
      sendBeaconRequest: sendBeaconRequest,
      isRequestRetryable: _isRequestRetryable.default,
      getRequestRetryDelay: _getRequestRetryDelay.default
    });
    var processWarningsAndErrors = (0, _injectProcessWarningsAndErrors.default)({
      logger: logger
    });
    var extractEdgeInfo = (0, _injectExtractEdgeInfo.default)({
      logger: logger
    });
    var createResponse = (0, _injectCreateResponse.default)({
      extractEdgeInfo: extractEdgeInfo
    });
    var sendEdgeNetworkRequest = (0, _injectSendEdgeNetworkRequest.default)({
      config: config,
      lifecycle: lifecycle,
      cookieTransfer: cookieTransfer,
      sendNetworkRequest: sendNetworkRequest,
      createResponse: createResponse,
      processWarningsAndErrors: processWarningsAndErrors
    });
    var generalConsentState = (0, _createConsentStateMachine.default)({
      logger: logger
    });
    var consent = (0, _createConsent.default)({
      generalConsentState: generalConsentState,
      logger: logger
    });
    var eventManager = (0, _createEventManager.default)({
      config: config,
      logger: logger,
      lifecycle: lifecycle,
      consent: consent,
      createEvent: _createEvent.default,
      createDataCollectionRequestPayload: _request.createDataCollectionRequestPayload,
      createDataCollectionRequest: _request.createDataCollectionRequest,
      sendEdgeNetworkRequest: sendEdgeNetworkRequest
    });
    return (0, _initializeComponents.default)({
      componentCreators: _componentCreators.default,
      lifecycle: lifecycle,
      componentRegistry: componentRegistry,
      getImmediatelyAvailableTools: function getImmediatelyAvailableTools(componentName) {
        var componentLogger = createComponentLogger(componentName);
        return {
          config: config,
          consent: consent,
          eventManager: eventManager,
          logger: componentLogger,
          lifecycle: lifecycle,
          sendEdgeNetworkRequest: sendEdgeNetworkRequest,
          handleError: (0, _injectHandleError.default)({
            errorPrefix: "[" + instanceName + "] [" + componentName + "]",
            logger: componentLogger
          }),
          createNamespacedStorage: createNamespacedStorage
        };
      }
    });
  };

  var handleError = (0, _injectHandleError.default)({
    errorPrefix: "[" + instanceName + "]",
    logger: logger
  });
  var executeCommand = (0, _injectExecuteCommand.default)({
    logger: logger,
    configureCommand: configureCommand,
    setDebugCommand: setDebugCommand,
    handleError: handleError,
    validateCommandOptions: _validateCommandOptions.default
  });
  return executeCommand;
};

exports.createExecuteCommand = createExecuteCommand;

var _default = function _default() {
  // eslint-disable-next-line no-underscore-dangle
  var instanceNames = window.__alloyNS;

  if (instanceNames) {
    instanceNames.forEach(function (instanceName) {
      var logController = (0, _createLogController.default)({
        console: console,
        locationSearch: window.location.search,
        createLogger: _createLogger.default,
        instanceName: instanceName,
        createNamespacedStorage: createNamespacedStorage,
        getMonitors: getMonitors
      });
      var executeCommand = createExecuteCommand({
        instanceName: instanceName,
        logController: logController
      });
      var instance = (0, _createInstanceFunction.default)(executeCommand);
      var queue = window[instanceName].q;
      queue.push = instance;
      logController.logger.logOnInstanceCreated({
        instance: instance
      });
      queue.forEach(instance);
    });
  }
};

exports.default = _default;