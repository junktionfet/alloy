"use strict";

exports.default = void 0;

var _addRenderAttemptedToDecisions = require("./utils/addRenderAttemptedToDecisions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(_ref) {
  var viewCache = _ref.viewCache,
      executeDecisions = _ref.executeDecisions,
      executeCachedViewDecisions = _ref.executeCachedViewDecisions,
      showContainers = _ref.showContainers;
  return function (_ref2) {
    var viewName = _ref2.viewName,
        pageWideScopeDecisions = _ref2.pageWideScopeDecisions,
        nonAutoRenderableDecisions = _ref2.nonAutoRenderableDecisions;

    if (viewName) {
      return viewCache.getView(viewName).then(function (currentViewDecisions) {
        executeDecisions(pageWideScopeDecisions);
        executeCachedViewDecisions({
          viewName: viewName,
          viewDecisions: currentViewDecisions
        });
        showContainers();
        return {
          decisions: _toConsumableArray(nonAutoRenderableDecisions),
          propositions: [].concat(_toConsumableArray((0, _addRenderAttemptedToDecisions.default)({
            decisions: [].concat(_toConsumableArray(pageWideScopeDecisions), _toConsumableArray(currentViewDecisions)),
            renderAttempted: true
          })), _toConsumableArray((0, _addRenderAttemptedToDecisions.default)({
            decisions: nonAutoRenderableDecisions,
            renderAttempted: false
          })))
        };
      });
    }

    executeDecisions(pageWideScopeDecisions);
    showContainers();
    return {
      decisions: _toConsumableArray(nonAutoRenderableDecisions),
      propositions: [].concat(_toConsumableArray((0, _addRenderAttemptedToDecisions.default)({
        decisions: pageWideScopeDecisions,
        renderAttempted: true
      })), _toConsumableArray((0, _addRenderAttemptedToDecisions.default)({
        decisions: nonAutoRenderableDecisions,
        renderAttempted: false
      })))
    };
  };
};

exports.default = _default;