"use strict";
exports.__esModule = true;
exports.checkPayload = void 0;
var is_object_1 = require("./is_object");
var deepClone = function (payload) { return JSON.parse(JSON.stringify(payload)); };
var checkPayload = function (payload) {
    if (!is_object_1.isObject(payload)) {
        throw new TypeError('payload must be a plain object');
    }
    return deepClone(payload);
};
exports.checkPayload = checkPayload;
