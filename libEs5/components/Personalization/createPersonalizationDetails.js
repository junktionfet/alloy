"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _scope = require("./constants/scope");

var _schema = require("./constants/schema");

var _isNonEmptyString = require("../../utils/isNonEmptyString");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(_ref) {
  var renderDecisions = _ref.renderDecisions,
      decisionScopes = _ref.decisionScopes,
      event = _ref.event,
      viewCache = _ref.viewCache;
  var viewName = event.getViewName();
  return {
    isRenderDecisions: function isRenderDecisions() {
      return renderDecisions;
    },
    getViewName: function getViewName() {
      return viewName;
    },
    hasScopes: function hasScopes() {
      return decisionScopes.length > 0;
    },
    hasViewName: function hasViewName() {
      return (0, _isNonEmptyString.default)(viewName);
    },
    createQueryDetails: function createQueryDetails() {
      var scopes = _toConsumableArray(decisionScopes);

      if (!this.isCacheInitialized() && !(0, _utils.includes)(scopes, _scope.default)) {
        scopes.push(_scope.default);
      }

      var schemas = [_schema.DEFAULT_CONTENT_ITEM, _schema.HTML_CONTENT_ITEM, _schema.JSON_CONTENT_ITEM, _schema.REDIRECT_ITEM];

      if ((0, _utils.includes)(scopes, _scope.default)) {
        schemas.push(_schema.DOM_ACTION);
      }

      return {
        schemas: schemas,
        decisionScopes: scopes
      };
    },
    isCacheInitialized: function isCacheInitialized() {
      return viewCache.isInitialized();
    },
    shouldFetchData: function shouldFetchData() {
      return this.hasScopes() || !this.isCacheInitialized();
    },
    shouldUseCachedData: function shouldUseCachedData() {
      return this.hasViewName() && this.isCacheInitialized();
    }
  };
};

exports.default = _default;