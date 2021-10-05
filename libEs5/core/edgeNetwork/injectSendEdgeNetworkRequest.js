"use strict";

exports.default = void 0;

var _domain = require("../../constants/domain");

var _apiVersion = require("../../constants/apiVersion");

var _utils = require("../../utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(_ref) {
  var config = _ref.config,
      lifecycle = _ref.lifecycle,
      cookieTransfer = _ref.cookieTransfer,
      sendNetworkRequest = _ref.sendNetworkRequest,
      createResponse = _ref.createResponse,
      processWarningsAndErrors = _ref.processWarningsAndErrors;
  var edgeDomain = config.edgeDomain,
      edgeBasePath = config.edgeBasePath,
      edgeConfigId = config.edgeConfigId;
  /**
   * Sends a network request that is aware of payload interfaces,
   * lifecycle methods, configured edge domains, response structures, etc.
   */

  return function (_ref2) {
    var request = _ref2.request,
        _ref2$runOnResponseCa = _ref2.runOnResponseCallbacks,
        runOnResponseCallbacks = _ref2$runOnResponseCa === void 0 ? _utils.noop : _ref2$runOnResponseCa,
        _ref2$runOnRequestFai = _ref2.runOnRequestFailureCallbacks,
        runOnRequestFailureCallbacks = _ref2$runOnRequestFai === void 0 ? _utils.noop : _ref2$runOnRequestFai;
    var onResponseCallbackAggregator = (0, _utils.createCallbackAggregator)();
    onResponseCallbackAggregator.add(lifecycle.onResponse);
    onResponseCallbackAggregator.add(runOnResponseCallbacks);
    var onRequestFailureCallbackAggregator = (0, _utils.createCallbackAggregator)();
    onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
    onRequestFailureCallbackAggregator.add(runOnRequestFailureCallbacks);
    return lifecycle.onBeforeRequest({
      request: request,
      onResponse: onResponseCallbackAggregator.add,
      onRequestFailure: onRequestFailureCallbackAggregator.add
    }).then(function () {
      var endpointDomain = request.getUseIdThirdPartyDomain() ? _domain.ID_THIRD_PARTY : edgeDomain;
      var url = "https://" + endpointDomain + "/" + edgeBasePath + "/" + _apiVersion.default + "/" + request.getAction() + "?configId=" + edgeConfigId + "&requestId=" + request.getId();
      cookieTransfer.cookiesToPayload(request.getPayload(), endpointDomain);
      return sendNetworkRequest({
        requestId: request.getId(),
        url: url,
        payload: request.getPayload(),
        useSendBeacon: request.getUseSendBeacon()
      });
    }).then(function (networkResponse) {
      processWarningsAndErrors(networkResponse);
      return networkResponse;
    }).catch(function (error) {
      // Regardless of whether the network call failed, an unexpected status
      // code was returned, or the response body was malformed, we want to call
      // the onRequestFailure callbacks, but still throw the exception.
      var throwError = function throwError() {
        throw error;
      };

      return onRequestFailureCallbackAggregator.call({
        error: error
      }).then(throwError, throwError);
    }).then(function (_ref3) {
      var parsedBody = _ref3.parsedBody,
          getHeader = _ref3.getHeader;
      // Note that networkResponse.parsedBody may be undefined if it was a
      // 204 No Content response. That's fine.
      var response = createResponse({
        content: parsedBody,
        getHeader: getHeader
      });
      cookieTransfer.responseToCookies(response); // Notice we're calling the onResponse lifecycle method even if there are errors
      // inside the response body. This is because the full request didn't actually fail--
      // only portions of it that are considered non-fatal (a specific, non-critical
      // Konductor plugin, for example).

      return onResponseCallbackAggregator.call({
        response: response
      }).then(function (returnValues) {
        // Merges all returned objects from all `onResponse` callbacks into
        // a single object that can later be returned to the customer.
        var lifecycleOnResponseReturnValues = returnValues.shift() || [];
        var consumerOnResponseReturnValues = returnValues.shift() || [];
        var lifecycleOnBeforeRequestReturnValues = returnValues;
        return _utils.assign.apply(void 0, [{}].concat(_toConsumableArray(lifecycleOnResponseReturnValues), _toConsumableArray(consumerOnResponseReturnValues), _toConsumableArray(lifecycleOnBeforeRequestReturnValues)));
      });
    });
  };
};

exports.default = _default;