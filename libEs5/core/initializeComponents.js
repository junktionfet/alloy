"use strict";

exports.default = void 0;

var _utils = require("../utils");

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
var _default = function _default(_ref) {
  var componentCreators = _ref.componentCreators,
      lifecycle = _ref.lifecycle,
      componentRegistry = _ref.componentRegistry,
      getImmediatelyAvailableTools = _ref.getImmediatelyAvailableTools;
  componentCreators.forEach(function (createComponent) {
    var namespace = createComponent.namespace; // TO-DOCUMENT: Helpers that we inject into factories.

    var tools = getImmediatelyAvailableTools(namespace);
    var component;

    try {
      component = createComponent(tools);
    } catch (error) {
      throw (0, _utils.stackError)({
        error: error,
        message: "[" + namespace + "] An error occurred during component creation."
      });
    }

    componentRegistry.register(namespace, component);
  });
  return lifecycle.onComponentsRegistered({
    lifecycle: lifecycle
  }).then(function () {
    return componentRegistry;
  });
};

exports.default = _default;