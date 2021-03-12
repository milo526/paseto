"use strict";
exports.__esModule = true;
exports.isObject = void 0;
var isObject = function (input) {
    return typeof input === 'object' && !!input && input.constructor === Object;
};
exports.isObject = isObject;
