"use strict";

exports.default = void 0;

var _utils = require("../utils");

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
  var getDebugEnabled = _ref.getDebugEnabled,
      console = _ref.console,
      getMonitors = _ref.getMonitors,
      context = _ref.context;
  var prefix = "[" + context.instanceName + "]";

  if (context.componentName) {
    prefix += " [" + context.componentName + "]";
  }

  var notifyMonitors = function notifyMonitors(method, data) {
    var monitors = getMonitors();

    if (monitors.length > 0) {
      var dataWithContext = (0, _utils.assign)({}, context, data);
      monitors.forEach(function (monitor) {
        if (monitor[method]) {
          monitor[method](dataWithContext);
        }
      });
    }
  };

  var log = function log(level) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    notifyMonitors("onBeforeLog", {
      level: level,
      arguments: rest
    });

    if (getDebugEnabled()) {
      console[level].apply(console, [prefix].concat(rest));
    }
  };

  return {
    get enabled() {
      return getMonitors().length > 0 || getDebugEnabled();
    },

    logOnInstanceCreated: function logOnInstanceCreated(data) {
      notifyMonitors("onInstanceCreated", data);
      log("info", "Instance initialized.");
    },
    logOnInstanceConfigured: function logOnInstanceConfigured(data) {
      notifyMonitors("onInstanceConfigured", data);
      log("info", "Instance configured. Computed configuration:", data.config);
    },
    logOnBeforeCommand: function logOnBeforeCommand(data) {
      notifyMonitors("onBeforeCommand", data);
      log("info", "Executing " + data.commandName + " command. Options:", data.options);
    },
    logOnCommandResolved: function logOnCommandResolved(data) {
      notifyMonitors("onCommandResolved", data);
      log("info", data.commandName + " command resolved. Result:", data.result);
    },
    logOnCommandRejected: function logOnCommandRejected(data) {
      notifyMonitors("onCommandRejected", data);
      log("error", data.commandName + " command was rejected. Error:", data.error);
    },
    logOnBeforeNetworkRequest: function logOnBeforeNetworkRequest(data) {
      notifyMonitors("onBeforeNetworkRequest", data);
      log("info", "Request " + data.requestId + ": Sending request.", data.payload);
    },
    logOnNetworkResponse: function logOnNetworkResponse(data) {
      notifyMonitors("onNetworkResponse", data);
      var messagesSuffix = data.parsedBody || data.body ? "response body:" : "no response body.";
      log("info", "Request " + data.requestId + ": Received response with status code " + data.statusCode + " and " + messagesSuffix, data.parsedBody || data.body);
    },
    logOnNetworkError: function logOnNetworkError(data) {
      notifyMonitors("onNetworkError", data);
      log("error", "Request " + data.requestId + ": Network request failed.", data.error);
    },

    /**
     * Outputs informational message to the web console. In some
     * browsers a small "i" icon is displayed next to these items
     * in the web console's log.
     * @param {...*} arg Any argument to be logged.
     */
    info: log.bind(null, "info"),

    /**
     * Outputs a warning message to the web console.
     * @param {...*} arg Any argument to be logged.
     */
    warn: log.bind(null, "warn"),

    /**
     * Outputs an error message to the web console.
     * @param {...*} arg Any argument to be logged.
     */
    error: log.bind(null, "error")
  };
};

exports.default = _default;