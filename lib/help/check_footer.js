"use strict";
exports.__esModule = true;
exports.checkFooter = void 0;
var is_object_1 = require("./is_object");
var checkFooter = function (footer) {
    if (typeof footer === 'undefined') {
        return Buffer.from('');
    }
    if (Buffer.isBuffer(footer)) {
        return footer;
    }
    if (is_object_1.isObject(footer)) {
        return Buffer.from(JSON.stringify(footer), 'utf8');
    }
    if (typeof footer !== 'string') {
        throw new TypeError('options.footer must be a string, Buffer or a plain object');
    }
    return Buffer.from(footer, 'utf8');
};
exports.checkFooter = checkFooter;
