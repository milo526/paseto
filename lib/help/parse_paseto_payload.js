"use strict";
exports.__esModule = true;
exports.parse = void 0;
var errors_1 = require("../errors");
var assert_1 = require("assert");
var is_object_1 = require("./is_object");
var parse = function (payload) {
    try {
        var parsed = JSON.parse(payload.toString());
        assert_1.strict(is_object_1.isObject(parsed));
        return parsed;
    }
    catch (err) {
        throw new errors_1.PasetoInvalid('All PASETO payloads MUST be a JSON object');
    }
};
exports.parse = parse;
