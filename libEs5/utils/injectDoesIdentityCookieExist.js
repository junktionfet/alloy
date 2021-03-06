"use strict";

exports.default = void 0;

var _cookieJar = require("./cookieJar");

var _getNamespacedCookieName = require("./getNamespacedCookieName");

var _cookieNameKey = require("../constants/cookieNameKey");

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
var _default = function _default(_ref) {
  var orgId = _ref.orgId;
  var identityCookieName = (0, _getNamespacedCookieName.default)(orgId, _cookieNameKey.IDENTITY);
  /**
   * Returns whether the identity cookie exists.
   */

  return function () {
    return Boolean(_cookieJar.default.get(identityCookieName));
  };
};

exports.default = _default;