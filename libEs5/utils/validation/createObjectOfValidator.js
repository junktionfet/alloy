"use strict";

exports.default = void 0;

var _isObject = require("../isObject");

var _assertValid = require("./assertValid");

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
var _default = function _default(schema) {
  return function (value, path) {
    (0, _assertValid.default)((0, _isObject.default)(value), value, path, "an object");
    var errors = [];
    var validatedObject = {};
    Object.keys(schema).forEach(function (subKey) {
      var subValue = value[subKey];
      var subSchema = schema[subKey];
      var subPath = path ? path + "." + subKey : subKey;

      try {
        var validatedValue = subSchema(subValue, subPath);

        if (validatedValue !== undefined) {
          validatedObject[subKey] = validatedValue;
        }
      } catch (e) {
        errors.push(e.message);
      }
    }); // copy over unknown properties

    Object.keys(value).forEach(function (subKey) {
      if (!Object.prototype.hasOwnProperty.call(validatedObject, subKey)) {
        validatedObject[subKey] = value[subKey];
      }
    });

    if (errors.length) {
      throw new Error(errors.join("\n"));
    }

    return validatedObject;
  };
};

exports.default = _default;