"use strict";

exports.default = void 0;

var _validation = require("../../utils/validation");

var _utils = require("../../utils");

var _default = (0, _validation.objectOf)({
  consent: (0, _validation.arrayOf)((0, _validation.anything)()).required().nonEmpty(),
  identityMap: _utils.validateIdentityMap
}).noUnknownFields().required();

exports.default = _default;