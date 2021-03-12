"use strict";
exports.__esModule = true;
exports.applyOptions = void 0;
var ms_1 = require("./ms");
var applyOptions = function (_a, payload) {
    var audience = _a.audience, expiresIn = _a.expiresIn, _b = _a.iat, iat = _b === void 0 ? true : _b, issuer = _a.issuer, jti = _a.jti, kid = _a.kid, notBefore = _a.notBefore, _c = _a.now, now = _c === void 0 ? new Date() : _c, subject = _a.subject;
    if (!(now instanceof Date) || !now.getTime()) {
        throw new TypeError('options.now must be a valid Date object');
    }
    var unix = now.getTime();
    if (iat !== undefined) {
        if (typeof iat !== 'boolean') {
            throw new TypeError('options.iat must be a boolean');
        }
        if (iat) {
            payload.iat = new Date(unix);
        }
    }
    if (expiresIn !== undefined) {
        if (typeof expiresIn !== 'string') {
            throw new TypeError('options.expiresIn must be a string');
        }
        payload.exp = new Date(unix + ms_1.ms(expiresIn));
    }
    if (notBefore !== undefined) {
        if (typeof notBefore !== 'string') {
            throw new TypeError('options.notBefore must be a string');
        }
        payload.nbf = new Date(unix + ms_1.ms(notBefore));
    }
    if (audience !== undefined) {
        if (typeof audience !== 'string') {
            throw new TypeError('options.audience must be a string');
        }
        payload.aud = audience;
    }
    if (issuer !== undefined) {
        if (typeof issuer !== 'string') {
            throw new TypeError('options.issuer must be a string');
        }
        payload.iss = issuer;
    }
    if (subject !== undefined) {
        if (typeof subject !== 'string') {
            throw new TypeError('options.subject must be a string');
        }
        payload.sub = subject;
    }
    if (kid !== undefined) {
        if (typeof kid !== 'string') {
            throw new TypeError('options.kid must be a string');
        }
        payload.kid = kid;
    }
    if (jti !== undefined) {
        if (typeof jti !== 'string') {
            throw new TypeError('options.jti must be a string');
        }
        payload.jti = jti;
    }
    return payload;
};
exports.applyOptions = applyOptions;
