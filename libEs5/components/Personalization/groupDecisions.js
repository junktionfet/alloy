"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _schema = require("./constants/schema");

var _scopeType = require("./constants/scopeType");

var _scope = require("./constants/scope");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var splitItems = function splitItems(items, schemas) {
  var matched = [];
  var nonMatched = [];
  items.forEach(function (item) {
    if ((0, _utils.includes)(schemas, item.schema)) {
      matched.push(item);
    } else {
      nonMatched.push(item);
    }
  });
  return [matched, nonMatched];
};

var createDecision = function createDecision(decision, items) {
  return {
    id: decision.id,
    scope: decision.scope,
    items: items,
    scopeDetails: decision.scopeDetails
  };
};

var splitDecisions = function splitDecisions(decisions) {
  for (var _len = arguments.length, schemas = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    schemas[_key - 1] = arguments[_key];
  }

  var matchedDecisions = [];
  var unmatchedDecisions = [];
  decisions.forEach(function (decision) {
    var _decision$items = decision.items,
        items = _decision$items === void 0 ? [] : _decision$items;

    var _splitItems = splitItems(items, schemas),
        _splitItems2 = _slicedToArray(_splitItems, 2),
        matchedItems = _splitItems2[0],
        nonMatchedItems = _splitItems2[1];

    if ((0, _utils.isNonEmptyArray)(matchedItems)) {
      matchedDecisions.push(createDecision(decision, matchedItems));
    }

    if ((0, _utils.isNonEmptyArray)(nonMatchedItems)) {
      unmatchedDecisions.push(createDecision(decision, nonMatchedItems));
    }
  });
  return {
    matchedDecisions: matchedDecisions,
    unmatchedDecisions: unmatchedDecisions
  };
};

var appendScopeDecision = function appendScopeDecision(scopeDecisions, decision) {
  if (!scopeDecisions[decision.scope]) {
    scopeDecisions[decision.scope] = [];
  }

  scopeDecisions[decision.scope].push(decision);
};

var isViewScope = function isViewScope(scopeDetails) {
  return scopeDetails.characteristics && scopeDetails.characteristics.scopeType && scopeDetails.characteristics.scopeType === _scopeType.VIEW_SCOPE_TYPE;
};

var extractDecisionsByScope = function extractDecisionsByScope(decisions) {
  var pageWideScopeDecisions = [];
  var nonPageWideScopeDecisions = [];
  var viewScopeDecisions = {};

  if ((0, _utils.isNonEmptyArray)(decisions)) {
    decisions.forEach(function (decision) {
      if (decision.scope === _scope.default) {
        pageWideScopeDecisions.push(decision);
      } else if (isViewScope(decision.scopeDetails)) {
        appendScopeDecision(viewScopeDecisions, decision);
      } else {
        nonPageWideScopeDecisions.push(decision);
      }
    });
  }

  return {
    pageWideScopeDecisions: pageWideScopeDecisions,
    nonPageWideScopeDecisions: nonPageWideScopeDecisions,
    viewScopeDecisions: viewScopeDecisions
  };
};

var groupDecisions = function groupDecisions(unprocessedDecisions) {
  var decisionsGroupedByRedirectItemSchema = splitDecisions(unprocessedDecisions, _schema.REDIRECT_ITEM);
  var decisionsGroupedByRenderableSchemas = splitDecisions(decisionsGroupedByRedirectItemSchema.unmatchedDecisions, _schema.DOM_ACTION, _schema.DEFAULT_CONTENT_ITEM);

  var _extractDecisionsBySc = extractDecisionsByScope(decisionsGroupedByRenderableSchemas.matchedDecisions),
      pageWideScopeDecisions = _extractDecisionsBySc.pageWideScopeDecisions,
      nonPageWideScopeDecisions = _extractDecisionsBySc.nonPageWideScopeDecisions,
      viewScopeDecisions = _extractDecisionsBySc.viewScopeDecisions;

  return {
    redirectDecisions: decisionsGroupedByRedirectItemSchema.matchedDecisions,
    pageWideScopeDecisions: pageWideScopeDecisions,
    viewDecisions: viewScopeDecisions,
    nonAutoRenderableDecisions: decisionsGroupedByRenderableSchemas.unmatchedDecisions.concat(nonPageWideScopeDecisions)
  };
};

var _default = groupDecisions;
exports.default = _default;