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
var _default = function _default(executeCommand) {
  return function (args) {
    // Would use destructuring, but destructuring doesn't work on IE
    // without polyfilling Symbol.
    // https://github.com/babel/babel/issues/7597
    var resolve = args[0];
    var reject = args[1];
    var userProvidedArgs = args[2];
    var commandName = userProvidedArgs[0];
    var options = userProvidedArgs[1];
    executeCommand(commandName, options).then(resolve, reject);
  };
};

exports.default = _default;