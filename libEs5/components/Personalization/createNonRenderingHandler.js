"use strict";

exports.default = void 0;

var _addRenderAttemptedToDecisions = require("./utils/addRenderAttemptedToDecisions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getViewPropositions = function getViewPropositions(_ref) {
  var viewCache = _ref.viewCache,
      viewName = _ref.viewName,
      propositions = _ref.propositions;

  if (!viewName) {
    return propositions;
  }

  return viewCache.getView(viewName).then(function (viewPropositions) {
    return [].concat(_toConsumableArray(viewPropositions), _toConsumableArray(propositions));
  });
};

var buildFinalResult = function buildFinalResult(_ref2) {
  var propositions = _ref2.propositions;
  return {
    decisions: propositions,
    propositions: (0, _addRenderAttemptedToDecisions.default)({
      decisions: propositions,
      renderAttempted: false
    })
  };
};

var _default = function _default(_ref3) {
  var viewCache = _ref3.viewCache;
  return function (_ref4) {
    var viewName = _ref4.viewName,
        redirectDecisions = _ref4.redirectDecisions,
        pageWideScopeDecisions = _ref4.pageWideScopeDecisions,
        nonAutoRenderableDecisions = _ref4.nonAutoRenderableDecisions;
    var propositions = [].concat(_toConsumableArray(redirectDecisions), _toConsumableArray(pageWideScopeDecisions), _toConsumableArray(nonAutoRenderableDecisions));
    return Promise.resolve(propositions).then(function (items) {
      return getViewPropositions({
        viewCache: viewCache,
        viewName: viewName,
        propositions: items
      });
    }).then(function (items) {
      return buildFinalResult({
        propositions: items
      });
    });
  };
};

exports.default = _default;