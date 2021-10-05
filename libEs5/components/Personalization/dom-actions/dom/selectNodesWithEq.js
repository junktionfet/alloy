"use strict";

exports.selectNodesWithEq = exports.parseSelector = exports.escapeIdentifiersInSelector = void 0;

var _css = require("css.escape");

var _dom = require("../../../../utils/dom");

var _helperForEq = require("./helperForEq");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Trying to match ID or CSS class
var CSS_IDENTIFIER_PATTERN = /(#|\.)(-?\w+)/g; // This is required to remove leading " > " from parsed pieces

var SIBLING_PATTERN = /^\s*>?\s*/;

var cleanUp = function cleanUp(str) {
  return str.replace(SIBLING_PATTERN, "").trim();
}; // Here we use CSS.escape() to make sure we get
// correct values for ID and CSS class
// Please check:  https://www.w3.org/TR/css-syntax-3/#escaping
// CSS.escape() polyfill can be found here: https://github.com/mathiasbynens/CSS.escape


var replaceIdentifier = function replaceIdentifier(_, $1, $2) {
  return "" + $1 + (0, _css.default)($2);
};

var escapeIdentifiersInSelector = function escapeIdentifiersInSelector(selector) {
  return selector.replace(CSS_IDENTIFIER_PATTERN, replaceIdentifier);
};

exports.escapeIdentifiersInSelector = escapeIdentifiersInSelector;

var parseSelector = function parseSelector(rawSelector) {
  var result = [];
  var selector = escapeIdentifiersInSelector(rawSelector.trim());
  var parts = (0, _helperForEq.splitWithEq)(selector);
  var length = parts.length;
  var i = 0;

  while (i < length) {
    var sel = cleanUp(parts[i]);
    var eq = parts[i + 1];

    if (eq) {
      result.push({
        sel: sel,
        eq: Number(eq)
      });
    } else {
      result.push({
        sel: sel
      });
    }

    i += 2;
  }

  return result;
};
/**
 * Returns an array of matched DOM nodes.
 * @param {String} selector that contains Sizzle "eq(...)" pseudo selector
 * @returns {Array} an array of DOM nodes
 */


exports.parseSelector = parseSelector;

var selectNodesWithEq = function selectNodesWithEq(selector) {
  var doc = document;

  if ((0, _helperForEq.isNotEqSelector)(selector)) {
    return (0, _dom.selectNodes)(selector, doc);
  }

  var parts = parseSelector(selector);
  var length = parts.length;
  var result = [];
  var context = doc;
  var i = 0;

  while (i < length) {
    var _parts$i = parts[i],
        sel = _parts$i.sel,
        eq = _parts$i.eq;
    var nodes = (0, _dom.selectNodes)(sel, context);
    var nodesCount = nodes.length;

    if (nodesCount === 0) {
      break;
    }

    if (eq != null && eq > nodesCount - 1) {
      break;
    }

    if (i < length - 1) {
      if (eq == null) {
        var _nodes = _slicedToArray(nodes, 1);

        context = _nodes[0];
      } else {
        context = nodes[eq];
      }
    }

    if (i === length - 1) {
      if (eq == null) {
        result = nodes;
      } else {
        result = [nodes[eq]];
      }
    }

    i += 1;
  }

  return result;
};

exports.selectNodesWithEq = selectNodesWithEq;