"use strict";

exports.default = void 0;

var _remapHeadOffers = require("./remapHeadOffers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var logActionError = function logActionError(logger, action, error) {
  if (logger.enabled) {
    var details = JSON.stringify(action);
    var message = error.message,
        stack = error.stack;
    var errorMessage = "Failed to execute action " + details + ". " + message + " " + (stack ? "\n " + stack : "");
    logger.error(errorMessage);
  }
};

var logActionCompleted = function logActionCompleted(logger, action) {
  if (logger.enabled) {
    var details = JSON.stringify(action);
    logger.info("Action " + details + " executed.");
  }
};

var executeAction = function executeAction(logger, modules, type, args) {
  var execute = modules[type];

  if (!execute) {
    var error = new Error("DOM action \"" + type + "\" not found");
    logActionError(logger, args[0], error);
    throw error;
  }

  return execute.apply(void 0, _toConsumableArray(args));
};

var _default = function _default(actions, modules, logger) {
  var actionPromises = actions.map(function (action) {
    var processedAction = (0, _remapHeadOffers.default)(action);
    var type = processedAction.type;
    return executeAction(logger, modules, type, [processedAction]).then(function (result) {
      logActionCompleted(logger, processedAction);
      return result;
    }).catch(function (error) {
      logActionError(logger, processedAction, error);
      throw error;
    });
  });
  return Promise.all(actionPromises);
};

exports.default = _default;