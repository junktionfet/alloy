"use strict";

exports.default = void 0;

var _padStart = require("./padStart");

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

/**
 * Formats the date into an ISO date-time string in the local timezone
 * @param {Date} date
 * @returns {string}
 */
var _default = function _default(date) {
  var YYYY = date.getFullYear();
  var MM = (0, _padStart.default)(date.getMonth() + 1, 2, "0");
  var DD = (0, _padStart.default)(date.getDate(), 2, "0");
  var hh = (0, _padStart.default)(date.getHours(), 2, "0");
  var mm = (0, _padStart.default)(date.getMinutes(), 2, "0");
  var ss = (0, _padStart.default)(date.getSeconds(), 2, "0");
  var mmm = (0, _padStart.default)(date.getMilliseconds(), 3, "0"); // The time-zone offset is the difference, in minutes, from local time to UTC. Note that this
  // means that the offset is positive if the local timezone is behind UTC and negative if it is
  // ahead. For example, for time zone UTC+10:00, -600 will be returned.

  var timezoneOffset = date.getTimezoneOffset();
  var ts = timezoneOffset > 0 ? "-" : "+";
  var th = (0, _padStart.default)(Math.floor(Math.abs(timezoneOffset) / 60), 2, "0");
  var tm = (0, _padStart.default)(Math.abs(timezoneOffset) % 60, 2, "0");
  return YYYY + "-" + MM + "-" + DD + "T" + hh + ":" + mm + ":" + ss + "." + mmm + ts + th + ":" + tm;
};

exports.default = _default;