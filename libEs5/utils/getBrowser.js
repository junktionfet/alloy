"use strict";

exports.default = void 0;

var _memoize = require("./memoize");

var _browser = require("../constants/browser");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var matchUserAgent = function matchUserAgent(regexs) {
  return function (userAgent) {
    var keys = Object.keys(regexs);

    for (var i = 0; i < keys.length; i += 1) {
      var key = keys[i];
      var regex = regexs[key];

      if (regex.test(userAgent)) {
        return key;
      }
    }

    return _browser.UNKNOWN;
  };
};

var _default = (0, _memoize.default)(function (window) {
  var _matchUserAgent;

  return matchUserAgent((_matchUserAgent = {}, _defineProperty(_matchUserAgent, _browser.EDGE, /Edge\/([0-9\._]+)/), _defineProperty(_matchUserAgent, _browser.EDGE_CHROMIUM, /Edg\/([0-9\.]+)/), _defineProperty(_matchUserAgent, _browser.CHROME, /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/), _defineProperty(_matchUserAgent, _browser.FIREFOX, /Firefox\/([0-9\.]+)(?:\s|$)/), _defineProperty(_matchUserAgent, _browser.IE, /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/), _defineProperty(_matchUserAgent, _browser.SAFARI, /Version\/([0-9\._]+).*Safari/), _matchUserAgent))(window.navigator.userAgent);
});

exports.default = _default;