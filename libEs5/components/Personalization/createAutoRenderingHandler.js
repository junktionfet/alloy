"use strict";

exports.default = void 0;

var _addRenderAttemptedToDecisions = require("./utils/addRenderAttemptedToDecisions");

var _isNonEmptyArray = require("../../utils/isNonEmptyArray");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getPropositions = function getPropositions(_ref) {
  var viewCache = _ref.viewCache,
      viewName = _ref.viewName,
      pageWideScopeDecisions = _ref.pageWideScopeDecisions;

  if (!viewName) {
    return {
      pageWideScopeDecisions: pageWideScopeDecisions,
      viewPropositions: []
    };
  }

  return viewCache.getView(viewName).then(function (viewPropositions) {
    return {
      pageWideScopeDecisions: pageWideScopeDecisions,
      viewPropositions: viewPropositions
    };
  });
};

var _default = function _default(_ref2) {
  var viewCache = _ref2.viewCache,
      executeDecisions = _ref2.executeDecisions,
      showContainers = _ref2.showContainers,
      collect = _ref2.collect;
  return function (_ref3) {
    var viewName = _ref3.viewName,
        pageWideScopeDecisions = _ref3.pageWideScopeDecisions,
        nonAutoRenderableDecisions = _ref3.nonAutoRenderableDecisions;
    return Promise.resolve(pageWideScopeDecisions).then(function (propositions) {
      return getPropositions({
        viewCache: viewCache,
        viewName: viewName,
        executeDecisions: executeDecisions,
        pageWideScopeDecisions: propositions
      });
    }).then(function (propositions) {
      executeDecisions(propositions.pageWideScopeDecisions).then(function (decisionsMeta) {
        if ((0, _isNonEmptyArray.default)(decisionsMeta)) {
          collect({
            decisionsMeta: decisionsMeta
          });
        }
      });

      if (viewName) {
        executeDecisions(propositions.viewPropositions).then(function (decisionsMeta) {
          collect({
            decisionsMeta: decisionsMeta,
            viewName: viewName
          });
        });
      }

      showContainers();
      return [].concat(_toConsumableArray(propositions.pageWideScopeDecisions), _toConsumableArray(propositions.viewPropositions));
    }).then(function (renderablePropositions) {
      return {
        decisions: _toConsumableArray(nonAutoRenderableDecisions),
        propositions: [].concat(_toConsumableArray((0, _addRenderAttemptedToDecisions.default)({
          decisions: renderablePropositions,
          renderAttempted: true
        })), _toConsumableArray((0, _addRenderAttemptedToDecisions.default)({
          decisions: nonAutoRenderableDecisions,
          renderAttempted: false
        })))
      };
    });
  };
};

exports.default = _default;