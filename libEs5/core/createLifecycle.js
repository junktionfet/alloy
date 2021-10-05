"use strict";

exports.default = void 0;

/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// TO-DOCUMENT: Lifecycle hooks and their params.
var hookNames = [// Called after all components have been registered.
"onComponentsRegistered", // Called before an event is sent on a data collection request
"onBeforeEvent", // Called before each request is made to the edge.
"onBeforeRequest", // Called after each response is returned from the edge with a successful
// status code
"onResponse", // Called after a network request to the edge fails. Either the request
// didn't make it to the edge, didn't make it to Konductor, or Konductor
// failed to return a regularly-structured response. (In this case { error }
// is passed as the parameter)
// Also called when the respone returns a 400 or 500 error. (In this case
// { response } is passed as the parameter)
"onRequestFailure", // A user clicked on an element.
"onClick"];

var createHook = function createHook(componentRegistry, hookName) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return Promise.all(componentRegistry.getLifecycleCallbacks(hookName).map(function (callback) {
      return new Promise(function (resolve) {
        resolve(callback.apply(void 0, args));
      });
    }));
  };
};
/**
 * This ensures that if a component's lifecycle method X
 * attempts to execute lifecycle method Y, that all X methods on all components
 * will have been called before any of their Y methods are called. It does
 * this by kicking the call to the Y method to the next JavaScript tick.
 * @returns {function}
 */


var guardHook = function guardHook(fn) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return Promise.resolve().then(function () {
      return fn.apply(void 0, args);
    });
  };
};

var _default = function _default(componentRegistry) {
  return hookNames.reduce(function (memo, hookName) {
    memo[hookName] = guardHook(createHook(componentRegistry, hookName));
    return memo;
  }, {});
};

exports.default = _default;