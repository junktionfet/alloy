"use strict";

exports.default = void 0;

var _utils = require("../../utils");

var _defer = require("../../utils/defer");

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default() {
  var viewStorage;
  var viewStorageDeferred = (0, _defer.default)();

  var storeViews = function storeViews(decisionsPromise) {
    decisionsPromise.then(function (decisions) {
      if (viewStorage === undefined) {
        viewStorage = {};
      }

      (0, _utils.assign)(viewStorage, decisions);
      viewStorageDeferred.resolve();
    }).catch(function () {
      if (viewStorage === undefined) {
        viewStorage = {};
      }

      viewStorageDeferred.resolve();
    });
  };

  var getView = function getView(viewName) {
    return viewStorageDeferred.promise.then(function () {
      return viewStorage[viewName] || [];
    });
  };

  var isInitialized = function isInitialized() {
    return !(viewStorage === undefined);
  };

  return {
    storeViews: storeViews,
    getView: getView,
    isInitialized: isInitialized
  };
};

exports.default = _default;