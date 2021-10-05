"use strict";

exports.default = void 0;

var _fireImage = require("./fireImage");

var _dom = require("./dom");

var _tagName = require("../constants/tagName");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fireOnPage = _fireImage.default;
var IFRAME_ATTRS = {
  name: "Adobe Alloy"
};
var IFRAME_PROPS = {
  style: {
    display: "none",
    width: 0,
    height: 0
  }
};

var _default = function _default(request) {
  var createIframe = function createIframe() {
    return (0, _dom.awaitSelector)(_tagName.BODY).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          body = _ref2[0];

      var iframe = (0, _dom.createNode)(_tagName.IFRAME, IFRAME_ATTRS, IFRAME_PROPS);
      return (0, _dom.appendNode)(body, iframe);
    });
  };

  var fireInIframe = function fireInIframe(_ref3) {
    var src = _ref3.src;
    return createIframe().then(function (iframe) {
      var currentDocument = iframe.contentWindow.document;
      return (0, _fireImage.default)({
        src: src,
        currentDocument: currentDocument
      }).then(function () {
        (0, _dom.removeNode)(iframe);
      });
    });
  };

  var hideReferrer = request.hideReferrer,
      url = request.url;
  return hideReferrer ? fireInIframe({
    src: url
  }) : fireOnPage({
    src: url
  });
};

exports.default = _default;