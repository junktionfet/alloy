"use strict";

exports.default = exports.canUseRequestAnimationFrame = exports.canUseMutationObserver = exports.awaitUsingTimer = exports.awaitUsingRequestAnimation = exports.awaitUsingMutationObserver = void 0;

var _isFunction = require("../isFunction");

var _isNonEmptyArray = require("../isNonEmptyArray");

var _selectNodes = require("./selectNodes");

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
var MUTATION_OBSERVER = "MutationObserver";
var RAF = "requestAnimationFrame";
var MUTATION_OBSERVER_CONFIG = {
  childList: true,
  subtree: true
};
var VISIBILITY_STATE = "visibilityState";
var VISIBLE = "visible";
var DELAY = 100;
var MAX_POLLING_TIMEOUT = 5000;

var createError = function createError(selector) {
  return new Error("Could not find: " + selector);
};

var createPromise = function createPromise(executor) {
  return new Promise(executor);
};

var canUseMutationObserver = function canUseMutationObserver(win) {
  return (0, _isFunction.default)(win[MUTATION_OBSERVER]);
};

exports.canUseMutationObserver = canUseMutationObserver;

var awaitUsingMutationObserver = function awaitUsingMutationObserver(win, doc, selector, timeout, selectFunc) {
  return createPromise(function (resolve, reject) {
    var mutationObserver = new win[MUTATION_OBSERVER](function () {
      var nodes = selectFunc(selector);

      if ((0, _isNonEmptyArray.default)(nodes)) {
        mutationObserver.disconnect();
        resolve(nodes);
      }
    });
    setTimeout(function () {
      mutationObserver.disconnect();
      reject(createError(selector));
    }, timeout);
    mutationObserver.observe(doc, MUTATION_OBSERVER_CONFIG);
  });
};

exports.awaitUsingMutationObserver = awaitUsingMutationObserver;

var canUseRequestAnimationFrame = function canUseRequestAnimationFrame(doc) {
  return doc[VISIBILITY_STATE] === VISIBLE;
};

exports.canUseRequestAnimationFrame = canUseRequestAnimationFrame;

var awaitUsingRequestAnimation = function awaitUsingRequestAnimation(win, selector, timeout, selectFunc) {
  return createPromise(function (resolve, reject) {
    var execute = function execute() {
      var nodes = selectFunc(selector);

      if ((0, _isNonEmptyArray.default)(nodes)) {
        resolve(nodes);
        return;
      }

      win[RAF](execute);
    };

    execute();
    setTimeout(function () {
      reject(createError(selector));
    }, timeout);
  });
};

exports.awaitUsingRequestAnimation = awaitUsingRequestAnimation;

var awaitUsingTimer = function awaitUsingTimer(selector, timeout, selectFunc) {
  return createPromise(function (resolve, reject) {
    var execute = function execute() {
      var nodes = selectFunc(selector);

      if ((0, _isNonEmptyArray.default)(nodes)) {
        resolve(nodes);
        return;
      }

      setTimeout(execute, DELAY);
    };

    execute();
    setTimeout(function () {
      reject(createError(selector));
    }, timeout);
  });
};

exports.awaitUsingTimer = awaitUsingTimer;

var _default = function _default(selector) {
  var selectFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _selectNodes.default;
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MAX_POLLING_TIMEOUT;
  var win = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
  var doc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : document;
  var nodes = selectFunc(selector);

  if ((0, _isNonEmptyArray.default)(nodes)) {
    return Promise.resolve(nodes);
  }

  if (canUseMutationObserver(win)) {
    return awaitUsingMutationObserver(win, doc, selector, timeout, selectFunc);
  }

  if (canUseRequestAnimationFrame(doc)) {
    return awaitUsingRequestAnimation(win, selector, timeout, selectFunc);
  }

  return awaitUsingTimer(selector, timeout, selectFunc);
};

exports.default = _default;