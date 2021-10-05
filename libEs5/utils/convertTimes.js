"use strict";

exports.default = exports.YEAR = exports.MONTH = exports.WEEK = exports.DAY = exports.HOUR = exports.MINUTE = exports.SECOND = exports.MILLISECOND = void 0;

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
var MILLISECOND = 1;
exports.MILLISECOND = MILLISECOND;
var SECOND = MILLISECOND * 1000;
exports.SECOND = SECOND;
var MINUTE = SECOND * 60;
exports.MINUTE = MINUTE;
var HOUR = MINUTE * 60;
exports.HOUR = HOUR;
var DAY = HOUR * 24;
exports.DAY = DAY;
var WEEK = DAY * 7;
exports.WEEK = WEEK;
var MONTH = DAY * 30;
exports.MONTH = MONTH;
var YEAR = DAY * 365;
exports.YEAR = YEAR;

var _default = function _default(fromUnit, toUnit, amount) {
  return fromUnit * amount / toUnit;
};

exports.default = _default;