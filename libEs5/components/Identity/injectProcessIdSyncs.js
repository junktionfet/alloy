"use strict";

exports.default = void 0;

var _utils = require("../../utils");

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
var createResultLogMessage = function createResultLogMessage(idSync, success) {
  return "ID sync " + (success ? "succeeded" : "failed") + ": " + idSync.spec.url;
};

var _default = function _default(_ref) {
  var fireReferrerHideableImage = _ref.fireReferrerHideableImage,
      logger = _ref.logger;
  return function (idSyncs) {
    var urlIdSyncs = idSyncs.filter(function (idSync) {
      return idSync.type === "url";
    });

    if (!urlIdSyncs.length) {
      return Promise.resolve();
    }

    return Promise.all(urlIdSyncs.map(function (idSync) {
      return fireReferrerHideableImage(idSync.spec).then(function () {
        logger.info(createResultLogMessage(idSync, true));
      }).catch(function () {
        // We intentionally do not throw an error if id syncs fail. We
        // consider it a non-critical failure and therefore do not want it to
        // reject the promise handed back to the customer.
        logger.error(createResultLogMessage(idSync, false));
      });
    })).then(_utils.noop);
  };
};

exports.default = _default;