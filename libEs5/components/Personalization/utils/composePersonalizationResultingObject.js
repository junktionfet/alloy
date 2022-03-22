"use strict";

exports.default = void 0;

var _addRenderAttemptedToDecisions = require("./addRenderAttemptedToDecisions");

var _default = function _default() {
  var decisions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var renderDecisions = arguments.length > 1 ? arguments[1] : undefined;
  var resultingObject = {
    propositions: (0, _addRenderAttemptedToDecisions.default)({
      decisions: decisions,
      renderAttempted: renderDecisions
    })
  };

  if (!renderDecisions) {
    resultingObject.decisions = decisions;
  }

  return resultingObject;
};

exports.default = _default;