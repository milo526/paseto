"use strict";
exports.__esModule = true;
exports.decode = exports.encode = void 0;
var fromBase64 = function (base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};
var toBase64 = function (base64url) {
    return base64url.replace(/-/g, '+').replace(/_/g, '/');
};
var encode = function (buf) {
    return fromBase64(buf.toString('base64'));
};
exports.encode = encode;
var decode = function (input) {
    return Buffer.from(toBase64(input), 'base64');
};
exports.decode = decode;
