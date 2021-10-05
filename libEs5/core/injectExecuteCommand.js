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
var coreCommands = {
  CONFIGURE: "configure",
  SET_DEBUG: "setDebug"
};

var _default = function _default(_ref) {
  var logger = _ref.logger,
      configureCommand = _ref.configureCommand,
      setDebugCommand = _ref.setDebugCommand,
      handleError = _ref.handleError,
      validateCommandOptions = _ref.validateCommandOptions;
  var configurePromise;

  var getExecutor = function getExecutor(commandName, options) {
    var executor;

    if (commandName === coreCommands.CONFIGURE) {
      if (configurePromise) {
        throw new Error("The library has already been configured and may only be configured once.");
      }

      executor = function executor() {
        configurePromise = configureCommand(options);
        return configurePromise.then(function () {// Don't expose internals to the user.
        });
      };
    } else {
      if (!configurePromise) {
        throw new Error("The library must be configured first. Please do so by executing the configure command.");
      }

      if (commandName === coreCommands.SET_DEBUG) {
        executor = function executor() {
          return setDebugCommand(options);
        };
      } else {
        executor = function executor() {
          return configurePromise.then(function (componentRegistry) {
            var command = componentRegistry.getCommand(commandName);

            if (!command || !(0, _utils.isFunction)(command.run)) {
              var commandNames = (0, _utils.values)(coreCommands).concat(componentRegistry.getCommandNames()).join(", ");
              throw new Error("The " + commandName + " command does not exist. List of available commands: " + commandNames + ".");
            }

            var validatedOptions = validateCommandOptions({
              command: command,
              options: options
            });
            return command.run(validatedOptions);
          }, function () {
            logger.warn("An error during configuration is preventing the " + commandName + " command from executing."); // If configuration failed, we prevent the configuration
            // error from bubbling here because we don't want the
            // configuration error to be reported in the console every
            // time any command is executed. Only having it bubble
            // once when the configure command runs is sufficient.
            // Instead, for this command, we'll just return a promise
            // that never gets resolved.

            return new Promise(function () {});
          });
        };
      }
    }

    return executor;
  };

  return function (commandName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve) {
      // We have to wrap the getExecutor() call in the promise so the promise
      // will be rejected if getExecutor() throws errors.
      var executor = getExecutor(commandName, options);
      logger.logOnBeforeCommand({
        commandName: commandName,
        options: options
      });
      resolve(executor());
    }).catch(function (error) {
      return handleError(error, commandName + " command");
    }).catch(function (error) {
      logger.logOnCommandRejected({
        commandName: commandName,
        options: options,
        error: error
      });
      throw error;
    }).then(function (rawResult) {
      // We should always be returning an object from every command.
      var result = (0, _utils.isObject)(rawResult) ? rawResult : {};
      logger.logOnCommandResolved({
        commandName: commandName,
        options: options,
        result: result
      });
      return result;
    });
  };
};

exports.default = _default;