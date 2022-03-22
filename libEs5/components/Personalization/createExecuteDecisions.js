"use strict";

exports.default = void 0;

var _utils = require("../../utils");

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
var DEFAULT_ACTION_TYPE = "defaultContent";

var identity = function identity(item) {
  return item;
};

var buildActions = function buildActions(decision) {
  var meta = {
    id: decision.id,
    scope: decision.scope,
    scopeDetails: decision.scopeDetails
  };
  return decision.items.map(function (item) {
    return (0, _utils.assign)({
      type: DEFAULT_ACTION_TYPE
    }, item.data, {
      meta: meta
    });
  });
};

var processMetas = function processMetas(logger, actionResults) {
  var results = (0, _utils.flatMap)(actionResults, identity);
  var finalMetas = [];
  var set = new Set();
  results.forEach(function (item) {
    // for click actions we don't return an item
    if (!item) {
      return;
    }

    if (item.error) {
      logger.warn(item);
      return;
    }

    var meta = item.meta;

    if (set.has(meta.id)) {
      return;
    }

    set.add(meta.id);
    finalMetas.push(meta);
  });
  return finalMetas;
};

var _default = function _default(_ref) {
  var modules = _ref.modules,
      logger = _ref.logger,
      executeActions = _ref.executeActions;
  return function (decisions) {
    var actionResultsPromises = decisions.map(function (decision) {
      var actions = buildActions(decision);
      return executeActions(actions, modules, logger);
    });
    return Promise.all(actionResultsPromises).then(function (results) {
      return processMetas(logger, results);
    }).catch(function (error) {
      logger.error(error);
    });
  };
};

exports.default = _default;