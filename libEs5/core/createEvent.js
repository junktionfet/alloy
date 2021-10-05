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
var _default = function _default() {
  var content = {};
  var userXdm;
  var userData;
  var _documentMayUnload = false;
  var isFinalized = false;
  var shouldSendEvent = true;

  var throwIfEventFinalized = function throwIfEventFinalized(methodName) {
    if (isFinalized) {
      throw new Error(methodName + " cannot be called after event is finalized.");
    }
  };

  var event = {
    setUserXdm: function setUserXdm(value) {
      throwIfEventFinalized("setUserXdm");
      userXdm = value;
    },
    setUserData: function setUserData(value) {
      throwIfEventFinalized("setUserData");
      userData = value;
    },
    mergeXdm: function mergeXdm(xdm) {
      throwIfEventFinalized("mergeXdm");

      if (xdm) {
        (0, _utils.deepAssign)(content, {
          xdm: xdm
        });
      }
    },
    mergeMeta: function mergeMeta(meta) {
      throwIfEventFinalized("mergeMeta");

      if (meta) {
        (0, _utils.deepAssign)(content, {
          meta: meta
        });
      }
    },
    mergeQuery: function mergeQuery(query) {
      throwIfEventFinalized("mergeQuery");

      if (query) {
        (0, _utils.deepAssign)(content, {
          query: query
        });
      }
    },
    documentMayUnload: function documentMayUnload() {
      _documentMayUnload = true;
    },
    finalize: function finalize(onBeforeEventSend) {
      if (isFinalized) {
        return;
      }

      if (userXdm) {
        event.mergeXdm(userXdm);
      }

      if (userData) {
        content.data = userData;
      } // the event should already be considered finalized in case onBeforeEventSend throws an error


      isFinalized = true;

      if (onBeforeEventSend) {
        // assume that the onBeforeEventSend callback will fail (in-case of an error)
        shouldSendEvent = false; // this allows the user to replace the xdm and data properties
        // on the object passed to the callback

        var tempContent = {
          xdm: content.xdm || {},
          data: content.data || {}
        };
        var result = onBeforeEventSend(tempContent);
        shouldSendEvent = result !== false;
        content.xdm = tempContent.xdm || {};
        content.data = tempContent.data || {};

        if ((0, _utils.isEmptyObject)(content.xdm)) {
          delete content.xdm;
        }

        if ((0, _utils.isEmptyObject)(content.data)) {
          delete content.data;
        }
      }
    },
    getDocumentMayUnload: function getDocumentMayUnload() {
      return _documentMayUnload;
    },
    isEmpty: function isEmpty() {
      return (0, _utils.isEmptyObject)(content) && (!userXdm || (0, _utils.isEmptyObject)(userXdm)) && (!userData || (0, _utils.isEmptyObject)(userData));
    },
    shouldSend: function shouldSend() {
      return shouldSendEvent;
    },
    getViewName: function getViewName() {
      if (!userXdm || !userXdm.web || !userXdm.web.webPageDetails) {
        return undefined;
      }

      return userXdm.web.webPageDetails.viewName;
    },
    toJSON: function toJSON() {
      if (!isFinalized) {
        throw new Error("toJSON called before finalize");
      }

      return content;
    }
  };
  return event;
};

exports.default = _default;