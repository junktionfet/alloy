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
import isNonEmptyArray from "../../utils/isNonEmptyArray";
export default (({
  executeViewDecisions,
  collect
}) => {
  return ({
    viewName,
    viewDecisions
  }) => {
    // if there are viewDecisions for current view we will execute them and then send the collect call
    if (isNonEmptyArray(viewDecisions)) {
      executeViewDecisions(viewDecisions);
      return; // return here is to avoid the following code to be executed, that one is meant for the condition when viewDecisions is empty
    } // if there are no viewDecisions for current view we will send a collect call


    const xdm = {
      web: {
        webPageDetails: {
          viewName
        }
      }
    }; // This collect function is not from createCollect. It's the function from createViewCollect.

    collect({
      decisionsMeta: [],
      xdm
    });
  };
});