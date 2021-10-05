"use strict";

exports.default = void 0;

var _utils = require("../utils");

var _validation = require("../utils/validation");

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
var CONFIG_DOC_URI = "https://adobe.ly/2M4ErNE";

var buildSchema = function buildSchema(coreConfigValidators, componentCreators) {
  var schema = {};
  (0, _utils.assign)(schema, coreConfigValidators);
  componentCreators.forEach(function (createComponent) {
    var configValidators = createComponent.configValidators;
    (0, _utils.assign)(schema, configValidators);
  });
  return schema;
};

var transformOptions = function transformOptions(schema, options) {
  try {
    var validator = (0, _validation.objectOf)(schema).noUnknownFields().required();
    return validator(options);
  } catch (e) {
    throw new Error("Resolve these configuration problems:\n\t - " + e.message.split("\n").join("\n\t - ") + "\nFor configuration documentation see: " + CONFIG_DOC_URI);
  }
};

var _default = function _default(_ref) {
  var options = _ref.options,
      componentCreators = _ref.componentCreators,
      coreConfigValidators = _ref.coreConfigValidators,
      createConfig = _ref.createConfig,
      logger = _ref.logger,
      setDebugEnabled = _ref.setDebugEnabled;
  var schema = buildSchema(coreConfigValidators, componentCreators);
  var config = createConfig(transformOptions(schema, options));
  setDebugEnabled(config.debugEnabled, {
    fromConfig: true
  });
  logger.logOnInstanceConfigured({
    config: config
  });
  return config;
};

exports.default = _default;