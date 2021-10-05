"use strict";

exports.createInstance = void 0;

var _core = require("./core");

var _createLogger = require("./core/createLogger");

var _createLogController = require("./core/createLogController");

var _utils = require("./utils");

var _validation = require("./utils/validation");

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
// This file is used to rollup the code into an ES module version to be used by other npm projects
// like the launch extension. Everything that is exported here can be used independently by other
// npm projects.
var _window = window,
    console = _window.console;
var createNamespacedStorage = (0, _utils.injectStorage)(window);

var createInstance = function createInstance() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var eventOptionsValidator = (0, _validation.objectOf)({
    name: (0, _validation.string)().default("alloy"),
    monitors: (0, _validation.arrayOf)((0, _validation.objectOf)({})).default([])
  }).noUnknownFields();

  var _eventOptionsValidato = eventOptionsValidator(options),
      name = _eventOptionsValidato.name,
      monitors = _eventOptionsValidato.monitors; // this is a function so that window.__alloyMonitors can be set or added to at any time
  // eslint-disable-next-line no-underscore-dangle


  var getMonitors = function getMonitors() {
    return (window.__alloyMonitors || []).concat(monitors);
  };

  var logController = (0, _createLogController.default)({
    console: console,
    locationSearch: window.location.search,
    createLogger: _createLogger.default,
    instanceName: name,
    createNamespacedStorage: createNamespacedStorage,
    getMonitors: getMonitors
  });
  var instance = (0, _core.createExecuteCommand)({
    instanceName: name,
    logController: logController
  });
  logController.logger.logOnInstanceCreated({
    instance: instance
  });
  return instance;
};

exports.createInstance = createInstance;