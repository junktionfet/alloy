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
// This file is used to rollup the code into an ES module version to be used by other npm projects
// like the launch extension. Everything that is exported here can be used independently by other
// npm projects.
import { createExecuteCommand } from "./core";
import createLogger from "./core/createLogger";
import createLogController from "./core/createLogController";
import { injectStorage } from "./utils";
import { arrayOf, objectOf, string } from "./utils/validation";

const createNamespacedStorage = injectStorage(window);
/* JSG - Added scope and console parameters */
export const createInstance = (options = {}, scope = undefined, console = window.console) => {
  const eventOptionsValidator = objectOf({
    name: string().default("alloy"),
    monitors: arrayOf(objectOf({})).default([])
  }).noUnknownFields();
  const {
    name,
    monitors
  } = eventOptionsValidator(options);

  /*
    JSG - References to window.__alloyMonitors below have been removed
    as they are not applicable to our implementation
  */
  // this is a function so that window.__alloyMonitors can be set or added to at any time
  // eslint-disable-next-line no-underscore-dangle
  const getMonitors = () => [].concat(monitors);

  const logController = createLogController({
    console,
    locationSearch: window.location.search,
    createLogger,
    instanceName: name,
    createNamespacedStorage,
    getMonitors
  });
  const instance = createExecuteCommand({
    instanceName: name,
    logController,
    scope  /* JSG - Added scope parameter */
  });
  logController.logger.logOnInstanceCreated({
    instance
  });
  return instance;
};
