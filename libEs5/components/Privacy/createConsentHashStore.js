"use strict";

exports.default = void 0;

var _computeConsentHash = require("./computeConsentHash");

var _excluded = ["standard", "version"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getKey = function getKey(_ref) {
  var standard = _ref.standard,
      version = _ref.version;
  return standard + "." + version;
};

var _default = function _default(_ref2) {
  var storage = _ref2.storage;
  return {
    clear: function clear() {
      storage.clear();
    },
    lookup: function lookup(consentObjects) {
      var currentHashes = {};

      var getCurrentHash = function getCurrentHash(consentObject) {
        var key = getKey(consentObject);

        var standard = consentObject.standard,
            version = consentObject.version,
            rest = _objectWithoutProperties(consentObject, _excluded);

        if (!currentHashes[key]) {
          currentHashes[key] = (0, _computeConsentHash.default)(rest).toString();
        }

        return currentHashes[key];
      };

      return {
        isNew: function isNew() {
          return consentObjects.some(function (consentObject) {
            var key = getKey(consentObject);
            var previousHash = storage.getItem(key);
            return previousHash === null || previousHash !== getCurrentHash(consentObject);
          });
        },
        save: function save() {
          consentObjects.forEach(function (consentObject) {
            var key = getKey(consentObject);
            storage.setItem(key, getCurrentHash(consentObject));
          });
        }
      };
    }
  };
};

exports.default = _default;