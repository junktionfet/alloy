"use strict";

exports.executeRemoteScripts = exports.executeInlineScripts = exports.getRemoteScriptsUrls = exports.getInlineScripts = exports.is = void 0;

var _reactorLoadScript = require("@adobe/reactor-load-script");

var _dom = require("../../../utils/dom");

var _tagName = require("../../../constants/tagName");

var _dom2 = require("./dom");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var is = function is(element, tagName) {
  return !!element && element.tagName === tagName;
};

exports.is = is;

var isInlineScript = function isInlineScript(element) {
  return is(element, _tagName.SCRIPT) && !(0, _dom2.getAttribute)(element, _tagName.SRC);
};

var isRemoteScript = function isRemoteScript(element) {
  return is(element, _tagName.SCRIPT) && (0, _dom2.getAttribute)(element, _tagName.SRC);
};

var getInlineScripts = function getInlineScripts(fragment) {
  var scripts = (0, _dom.selectNodes)(_tagName.SCRIPT, fragment);
  var result = [];
  var length = scripts.length;
  var nonce = (0, _dom2.getNonce)();

  var attributes = _objectSpread({}, nonce && {
    nonce: nonce
  });
  /* eslint-disable no-continue */


  for (var i = 0; i < length; i += 1) {
    var element = scripts[i];

    if (!isInlineScript(element)) {
      continue;
    }

    var textContent = element.textContent;

    if (!textContent) {
      continue;
    }

    result.push((0, _dom.createNode)(_tagName.SCRIPT, attributes, {
      textContent: textContent
    }));
  }
  /* eslint-enable no-continue */


  return result;
};

exports.getInlineScripts = getInlineScripts;

var getRemoteScriptsUrls = function getRemoteScriptsUrls(fragment) {
  var scripts = (0, _dom.selectNodes)(_tagName.SCRIPT, fragment);
  var result = [];
  var length = scripts.length;
  /* eslint-disable no-continue */

  for (var i = 0; i < length; i += 1) {
    var element = scripts[i];

    if (!isRemoteScript(element)) {
      continue;
    }

    var url = (0, _dom2.getAttribute)(element, _tagName.SRC);

    if (!url) {
      continue;
    }

    result.push(url);
  }
  /* eslint-enable no-continue */


  return result;
};

exports.getRemoteScriptsUrls = getRemoteScriptsUrls;

var executeInlineScripts = function executeInlineScripts(container, scripts, func) {
  scripts.forEach(function (script) {
    return func(container, script);
  });
};

exports.executeInlineScripts = executeInlineScripts;

var executeRemoteScripts = function executeRemoteScripts(urls) {
  return Promise.all(urls.map(_reactorLoadScript.default));
};

exports.executeRemoteScripts = executeRemoteScripts;