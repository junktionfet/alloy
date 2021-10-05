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
import { appendNode } from "../../../utils/dom";
import { createFragment, getChildNodes } from "./dom";
import { loadImages } from "./images";
import addNonceToInlineStyleElements from "./addNonceToInlineStyleElements";
import { getInlineScripts, getRemoteScriptsUrls, executeInlineScripts, executeRemoteScripts } from "./scripts";
export default ((container, html) => {
  const fragment = createFragment(html);
  addNonceToInlineStyleElements(fragment);
  const elements = getChildNodes(fragment);
  const scripts = getInlineScripts(fragment);
  const scriptsUrls = getRemoteScriptsUrls(fragment);
  loadImages(fragment);
  elements.forEach(element => {
    appendNode(container, element);
  });
  executeInlineScripts(container, scripts, appendNode);
  return executeRemoteScripts(scriptsUrls);
});