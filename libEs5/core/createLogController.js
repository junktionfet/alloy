"use strict";

exports.default = void 0;

var _utils = require("../utils");

var _debugQueryParam = require("../constants/debugQueryParam");

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
var _default = function _default(_ref) {
  var console = _ref.console,
      locationSearch = _ref.locationSearch,
      createLogger = _ref.createLogger,
      instanceName = _ref.instanceName,
      createNamespacedStorage = _ref.createNamespacedStorage,
      getMonitors = _ref.getMonitors;

  var parsedQueryString = _utils.queryString.parse(locationSearch);

  var storage = createNamespacedStorage("instance." + instanceName + ".");
  var debugSessionValue = storage.session.getItem("debug");
  var debugEnabled = debugSessionValue === "true";
  var debugEnabledWritableFromConfig = debugSessionValue === null;

  var getDebugEnabled = function getDebugEnabled() {
    return debugEnabled;
  };

  var setDebugEnabled = function setDebugEnabled(value, _ref2) {
    var fromConfig = _ref2.fromConfig;

    if (!fromConfig || debugEnabledWritableFromConfig) {
      debugEnabled = value;
    }

    if (!fromConfig) {
      // Web storage only allows strings, so we explicitly convert to string.
      storage.session.setItem("debug", value.toString());
      debugEnabledWritableFromConfig = false;
    }
  };

  if (parsedQueryString[_debugQueryParam.default] !== undefined) {
    setDebugEnabled((0, _utils.stringToBoolean)(parsedQueryString[_debugQueryParam.default]), {
      fromConfig: false
    });
  }

  return {
    setDebugEnabled: setDebugEnabled,
    logger: createLogger({
      getDebugEnabled: getDebugEnabled,
      context: {
        instanceName: instanceName
      },
      getMonitors: getMonitors,
      console: console
    }),
    createComponentLogger: function createComponentLogger(componentName) {
      return createLogger({
        getDebugEnabled: getDebugEnabled,
        context: {
          instanceName: instanceName,
          componentName: componentName
        },
        getMonitors: getMonitors,
        console: console
      });
    }
  };
};

exports.default = _default;