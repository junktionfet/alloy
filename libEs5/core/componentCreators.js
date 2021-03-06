"use strict";

exports.default = void 0;

var _DataCollector = require("../components/DataCollector");

var _ActivityCollector = require("../components/ActivityCollector");

var _Identity = require("../components/Identity");

var _Audiences = require("../components/Audiences");

var _Personalization = require("../components/Personalization");

var _Context = require("../components/Context");

var _Privacy = require("../components/Privacy");

var _EventMerge = require("../components/EventMerge");

var _LibraryInfo = require("../components/LibraryInfo");

var _MachineLearning = require("../components/MachineLearning");

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
// TODO: Register the Components here statically for now. They might be registered differently.
// TODO: Figure out how sub-components will be made available/registered
var _default = [_DataCollector.default, _ActivityCollector.default, _Identity.default, _Audiences.default, _Personalization.default, _Context.default, _Privacy.default, _EventMerge.default, _LibraryInfo.default, _MachineLearning.default];
exports.default = _default;