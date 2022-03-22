"use strict";

exports.showElements = exports.showContainers = exports.hideElements = exports.hideContainers = void 0;

var _dom = require("../../../utils/dom");

var _tagName = require("../../../constants/tagName");

var _dom2 = require("../dom-actions/dom");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PREHIDING_ID = "alloy-prehiding";
var HIDING_STYLE_DEFINITION = "{ visibility: hidden }"; // Using global is OK since we have a single DOM
// so storing nodes even for multiple Alloy instances is fine

var styleNodes = {};

var hideElements = function hideElements(prehidingSelector) {
  // if we have different events with the same
  // prehiding selector we don't want to recreate
  // the style tag
  if (styleNodes[prehidingSelector]) {
    return;
  }

  var nonce = (0, _dom2.getNonce)();

  var attrs = _objectSpread({}, nonce && {
    nonce: nonce
  });

  var props = {
    textContent: prehidingSelector + " " + HIDING_STYLE_DEFINITION
  };
  var node = (0, _dom.createNode)(_tagName.STYLE, attrs, props);
  (0, _dom.appendNode)(document.head, node);
  styleNodes[prehidingSelector] = node;
};

exports.hideElements = hideElements;

var showElements = function showElements(prehidingSelector) {
  var node = styleNodes[prehidingSelector];

  if (node) {
    (0, _dom.removeNode)(node);
    delete styleNodes[prehidingSelector];
  }
};

exports.showElements = showElements;

var hideContainers = function hideContainers(prehidingStyle) {
  if (!prehidingStyle) {
    return;
  } // If containers prehiding style has been added
  // by customer's prehiding snippet we don't
  // want to add the same node


  var node = (0, _dom2.getElementById)(PREHIDING_ID);

  if (node) {
    return;
  }

  var nonce = (0, _dom2.getNonce)();

  var attrs = _objectSpread({
    id: PREHIDING_ID
  }, nonce && {
    nonce: nonce
  });

  var props = {
    textContent: prehidingStyle
  };
  var styleNode = (0, _dom.createNode)(_tagName.STYLE, attrs, props);
  (0, _dom.appendNode)(document.head, styleNode);
};

exports.hideContainers = hideContainers;

var showContainers = function showContainers() {
  // If containers prehiding style exists
  // we will remove it
  var node = (0, _dom2.getElementById)(PREHIDING_ID);

  if (!node) {
    return;
  }

  (0, _dom.removeNode)(node);
};

exports.showContainers = showContainers;