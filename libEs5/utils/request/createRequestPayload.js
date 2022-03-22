"use strict";

exports.default = void 0;

var _ = require("..");

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
// This provides the base functionality that all types of
// request payloads share.
var _default = function _default(options) {
  var content = options.content,
      addIdentity = options.addIdentity;
  return {
    mergeState: (0, _.createMerger)(content, "meta.state"),
    mergeQuery: (0, _.createMerger)(content, "query"),
    addIdentity: addIdentity,
    toJSON: function toJSON() {
      return content;
    }
  };
};

exports.default = _default;