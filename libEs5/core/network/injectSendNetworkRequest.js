"use strict";

exports.default = void 0;

var _utils = require("../../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(_ref) {
  var logger = _ref.logger,
      sendFetchRequest = _ref.sendFetchRequest,
      sendBeaconRequest = _ref.sendBeaconRequest,
      isRequestRetryable = _ref.isRequestRetryable,
      getRequestRetryDelay = _ref.getRequestRetryDelay;

  /**
   * Send a network request and returns details about the response.
   */
  return function (_ref2) {
    var requestId = _ref2.requestId,
        url = _ref2.url,
        payload = _ref2.payload,
        useSendBeacon = _ref2.useSendBeacon;
    // We want to log raw payload and event data rather than
    // our fancy wrapper objects. Calling payload.toJSON() is
    // insufficient to get all the nested raw data, because it's
    // not recursive (it doesn't call toJSON() on the event objects).
    // Parsing the result of JSON.stringify(), however, gives the
    // fully recursive raw data.
    var stringifiedPayload = JSON.stringify(payload);
    var parsedPayload = JSON.parse(stringifiedPayload);
    logger.logOnBeforeNetworkRequest({
      url: url,
      requestId: requestId,
      payload: parsedPayload
    });

    var executeRequest = function executeRequest() {
      var retriesAttempted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var requestMethod = useSendBeacon ? sendBeaconRequest : sendFetchRequest;
      return requestMethod(url, stringifiedPayload).then(function (response) {
        var requestIsRetryable = isRequestRetryable({
          response: response,
          retriesAttempted: retriesAttempted
        });

        if (requestIsRetryable) {
          var requestRetryDelay = getRequestRetryDelay({
            response: response,
            retriesAttempted: retriesAttempted
          });
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve(executeRequest(retriesAttempted + 1));
            }, requestRetryDelay);
          });
        }

        var parsedBody;

        try {
          parsedBody = JSON.parse(response.body);
        } catch (e) {// Non-JSON. Something went wrong.
        }

        logger.logOnNetworkResponse(_objectSpread(_objectSpread({
          requestId: requestId,
          url: url,
          payload: parsedPayload
        }, response), {}, {
          parsedBody: parsedBody,
          retriesAttempted: retriesAttempted
        }));
        return {
          statusCode: response.statusCode,
          body: response.body,
          parsedBody: parsedBody,
          getHeader: response.getHeader
        };
      });
    };

    return executeRequest().catch(function (error) {
      logger.logOnNetworkError({
        requestId: requestId,
        url: url,
        payload: parsedPayload,
        error: error
      });
      throw (0, _utils.stackError)({
        error: error,
        message: "Network request failed."
      });
    });
  };
};

exports.default = _default;