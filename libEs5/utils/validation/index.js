"use strict";

exports.string = exports.objectOf = exports.number = exports.mapOfValues = exports.literal = exports.enumOf = exports.callback = exports.boolean = exports.arrayOf = exports.anything = exports.anyOf = void 0;

var _chain = require("./chain");

var _nullSafeChain = require("./nullSafeChain");

var _booleanValidator = require("./booleanValidator");

var _callbackValidator = require("./callbackValidator");

var _createArrayOfValidator = require("./createArrayOfValidator");

var _createDefaultValidator = require("./createDefaultValidator");

var _createLiteralValidator = require("./createLiteralValidator");

var _createMapOfValuesValidator = require("./createMapOfValuesValidator");

var _createMinimumValidator = require("./createMinimumValidator");

var _createNoUnknownFieldsValidator = require("./createNoUnknownFieldsValidator");

var _createNonEmptyValidator = require("./createNonEmptyValidator");

var _createObjectOfValidator = require("./createObjectOfValidator");

var _createAnyOfValidator = require("./createAnyOfValidator");

var _createUniqueValidator = require("./createUniqueValidator");

var _domainValidator = require("./domainValidator");

var _integerValidator = require("./integerValidator");

var _numberValidator = require("./numberValidator");

var _regexpValidator = require("./regexpValidator");

var _requiredValidator = require("./requiredValidator");

var _stringValidator = require("./stringValidator");

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
// See comments on chain and nullSafeChain to understand what is going on here.
// The base validator does no validation and just returns the value unchanged
var base = function base(value) {
  return value;
}; // The 'default' and 'required' methods are available after any data-type method
// Don't use the nullSafeChain because they need to handle the null or undefined case


base.default = function _default(defaultValue) {
  return (0, _chain.default)(this, (0, _createDefaultValidator.default)(defaultValue));
};

base.required = function required() {
  return (0, _chain.default)(this, _requiredValidator.default);
}; // helper validators


var domain = function domain() {
  return (0, _nullSafeChain.default)(this, _domainValidator.default);
};

var minimumInteger = function minimumInteger(minValue) {
  return (0, _nullSafeChain.default)(this, (0, _createMinimumValidator.default)("an integer", minValue));
};

var minimumNumber = function minimumNumber(minValue) {
  return (0, _nullSafeChain.default)(this, (0, _createMinimumValidator.default)("a number", minValue));
};

var integer = function integer() {
  return (0, _nullSafeChain.default)(this, _integerValidator.default, {
    minimum: minimumInteger
  });
};

var nonEmptyString = function nonEmptyString() {
  return (0, _nullSafeChain.default)(this, (0, _createNonEmptyValidator.default)("a non-empty string"));
};

var nonEmptyArray = function nonEmptyArray() {
  return (0, _nullSafeChain.default)(this, (0, _createNonEmptyValidator.default)("a non-empty array"));
};

var nonEmptyObject = function nonEmptyObject() {
  return (0, _nullSafeChain.default)(this, (0, _createNonEmptyValidator.default)("a non-empty object"));
};

var regexp = function regexp() {
  return (0, _nullSafeChain.default)(this, _regexpValidator.default);
};

var unique = function createUnique() {
  return (0, _nullSafeChain.default)(this, (0, _createUniqueValidator.default)());
}; // top-level validators.  These are the first functions that are called to create a validator.


var anyOf = function anyOf(validators, message) {
  // use chain here because we don't want to accept null or undefined unless at least
  // one of the validators accept null or undefined.
  return (0, _chain.default)(this, (0, _createAnyOfValidator.default)(validators, message));
};

var anything = function anything() {
  return (0, _nullSafeChain.default)(this, base);
};

var arrayOf = function arrayOf(elementValidator) {
  return (0, _nullSafeChain.default)(this, (0, _createArrayOfValidator.default)(elementValidator), {
    nonEmpty: nonEmptyArray
  });
};

var boolean = function boolean() {
  return (0, _nullSafeChain.default)(this, _booleanValidator.default);
};

var callback = function callback() {
  return (0, _nullSafeChain.default)(this, _callbackValidator.default);
};

var literal = function literal(literalValue) {
  return (0, _nullSafeChain.default)(this, (0, _createLiteralValidator.default)(literalValue));
};

var number = function number() {
  return (0, _nullSafeChain.default)(this, _numberValidator.default, {
    minimum: minimumNumber,
    integer: integer,
    unique: unique
  });
};

var mapOfValues = function mapOfValues(valuesValidator) {
  return (0, _nullSafeChain.default)(this, (0, _createMapOfValuesValidator.default)(valuesValidator), {
    nonEmpty: nonEmptyObject
  });
};

var objectOf = function objectOf(schema) {
  var noUnknownFields = function noUnknownFields() {
    return (0, _nullSafeChain.default)(this, (0, _createNoUnknownFieldsValidator.default)(schema));
  };

  return (0, _nullSafeChain.default)(this, (0, _createObjectOfValidator.default)(schema), {
    noUnknownFields: noUnknownFields,
    nonEmpty: nonEmptyObject
  });
};

var string = function string() {
  return (0, _nullSafeChain.default)(this, _stringValidator.default, {
    regexp: regexp,
    domain: domain,
    nonEmpty: nonEmptyString,
    unique: unique
  });
};

var boundAnyOf = anyOf.bind(base);
exports.anyOf = boundAnyOf;
var boundAnything = anything.bind(base);
exports.anything = boundAnything;
var boundArrayOf = arrayOf.bind(base);
exports.arrayOf = boundArrayOf;
var boundBoolean = boolean.bind(base);
exports.boolean = boundBoolean;
var boundCallback = callback.bind(base);
exports.callback = boundCallback;
var boundLiteral = literal.bind(base);
exports.literal = boundLiteral;
var boundNumber = number.bind(base);
exports.number = boundNumber;
var boundMapOfValues = mapOfValues.bind(base);
exports.mapOfValues = boundMapOfValues;
var boundObjectOf = objectOf.bind(base);
exports.objectOf = boundObjectOf;
var boundString = string.bind(base); // compound validators

exports.string = boundString;

var boundEnumOf = function boundEnumOf() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return boundAnyOf(values.map(boundLiteral), "one of these values: [" + JSON.stringify(values) + "]");
};

exports.enumOf = boundEnumOf;