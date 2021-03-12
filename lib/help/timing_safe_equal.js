"use strict";
exports.__esModule = true;
exports.timingSafeEqual = void 0;
var crypto_1 = require("crypto");
var paddedBuffer = function (input, length) {
    if (input.length === length) {
        return input;
    }
    var buffer = Buffer.alloc(length);
    input.copy(buffer);
    return buffer;
};
var timingSafeEqual = function (a, b) {
    var length = Math.max(a.length, b.length);
    return crypto_1.timingSafeEqual(paddedBuffer(a, length), paddedBuffer(b, length));
};
exports.timingSafeEqual = timingSafeEqual;
