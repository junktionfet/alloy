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
var wrapForErrorHandling = function wrapForErrorHandling(fn, stackMessage) {
  return function () {
    var result;

    try {
      result = fn.apply(void 0, arguments);
    } catch (error) {
      throw (0, _utils.stackError)({
        error: error,
        message: stackMessage
      });
    }

    if (result instanceof Promise) {
      result = result.catch(function (error) {
        throw (0, _utils.stackError)({
          error: error,
          message: stackMessage
        });
      });
    }

    return result;
  };
}; // TO-DOCUMENT: All public commands and their signatures.


var _default = function _default() {
  var componentsByNamespace = {};
  var commandsByName = {};
  var lifecycleCallbacksByName = {};

  var registerComponentCommands = function registerComponentCommands(namespace) {
    var componentCommandsByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var conflictingCommandNames = (0, _utils.intersection)(Object.keys(commandsByName), Object.keys(componentCommandsByName));

    if (conflictingCommandNames.length) {
      throw new Error("[ComponentRegistry] Could not register " + namespace + " " + ("because it has existing command(s): " + conflictingCommandNames.join(",")));
    }

    Object.keys(componentCommandsByName).forEach(function (commandName) {
      var command = componentCommandsByName[commandName];
      command.commandName = commandName;
      command.run = wrapForErrorHandling(command.run, "[" + namespace + "] An error occurred while executing the " + commandName + " command.");
      commandsByName[commandName] = command;
    });
  };

  var registerLifecycleCallbacks = function registerLifecycleCallbacks(namespace) {
    var componentLifecycleCallbacksByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.keys(componentLifecycleCallbacksByName).forEach(function (hookName) {
      lifecycleCallbacksByName[hookName] = lifecycleCallbacksByName[hookName] || [];
      lifecycleCallbacksByName[hookName].push(wrapForErrorHandling(componentLifecycleCallbacksByName[hookName], "[" + namespace + "] An error occurred while executing the " + hookName + " lifecycle hook."));
    });
  };

  return {
    register: function register(namespace, component) {
      var commands = component.commands,
          lifecycle = component.lifecycle;
      registerComponentCommands(namespace, commands);
      registerLifecycleCallbacks(namespace, lifecycle);
      componentsByNamespace[namespace] = component;
    },
    getCommand: function getCommand(commandName) {
      return commandsByName[commandName];
    },
    getCommandNames: function getCommandNames() {
      return Object.keys(commandsByName);
    },
    getLifecycleCallbacks: function getLifecycleCallbacks(hookName) {
      return lifecycleCallbacksByName[hookName] || [];
    }
  };
};

exports.default = _default;