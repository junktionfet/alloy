"use strict";

exports.default = void 0;

var _dom = require("./dom");

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
var _default = function _default(container, _ref) {
  var from = _ref.from,
      to = _ref.to;
  var children = (0, _dom.getChildren)(container);
  var elementFrom = children[from];
  var elementTo = children[to];

  if (!elementFrom || !elementTo) {
    // TODO: We will need to add logging
    // to ease troubleshooting
    return;
  }

  if (from < to) {
    (0, _dom.insertAfter)(elementTo, elementFrom);
  } else {
    (0, _dom.insertBefore)(elementTo, elementFrom);
  }
};

exports.default = _default;