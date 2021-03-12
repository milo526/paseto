"use strict";
exports.__esModule = true;
exports.assertPayload = void 0;
var errors_1 = require("../errors");
var ms_1 = require("./ms");
var assertPayload = function (_a, payload) {
    var ignoreExp = _a.ignoreExp, ignoreNbf = _a.ignoreNbf, ignoreIat = _a.ignoreIat, maxTokenAge = _a.maxTokenAge, subject = _a.subject, issuer = _a.issuer, clockTolerance = _a.clockTolerance, audience = _a.audience, _b = _a.now, now = _b === void 0 ? new Date() : _b;
    if (!(now instanceof Date) || !now.getTime()) {
        throw new TypeError('options.now must be a valid Date object');
    }
    var unix = now.getTime();
    // iss
    if ('iss' in payload && typeof payload.iss !== 'string') {
        throw new errors_1.PasetoClaimInvalid('payload.iss must be a string');
    }
    if (issuer !== undefined) {
        if (typeof issuer !== 'string') {
            throw new TypeError('options.issuer must be a string');
        }
        if (payload.iss !== issuer) {
            throw new errors_1.PasetoClaimInvalid('issuer mismatch');
        }
    }
    // sub
    if ('sub' in payload && typeof payload.sub !== 'string') {
        throw new errors_1.PasetoClaimInvalid('payload.sub must be a string');
    }
    if (subject !== undefined) {
        if (typeof subject !== 'string') {
            throw new TypeError('options.subject must be a string');
        }
        if (payload.sub !== subject) {
            throw new errors_1.PasetoClaimInvalid('subject mismatch');
        }
    }
    // aud
    if ('aud' in payload && typeof payload.aud !== 'string') {
        throw new errors_1.PasetoClaimInvalid('payload.aud must be a string');
    }
    if (audience !== undefined) {
        if (typeof audience !== 'string') {
            throw new TypeError('options.audience must be a string');
        }
        if (payload.aud !== audience) {
            throw new errors_1.PasetoClaimInvalid('audience mismatch');
        }
    }
    if (clockTolerance !== undefined && typeof clockTolerance !== 'string') {
        throw new TypeError('options.clockTolerance must be a string');
    }
    var tolerance = clockTolerance ? ms_1.ms(clockTolerance) : 0;
    // iat
    var iat;
    if ('iat' in payload) {
        if (typeof payload.iat !== 'string') {
            throw new errors_1.PasetoClaimInvalid('payload.iat must be a string');
        }
        iat = new Date(payload.iat).getTime();
        if (!iat) {
            throw new errors_1.PasetoClaimInvalid('payload.iat must be a valid ISO8601 string');
        }
        if (!ignoreIat) {
            if (iat > unix + tolerance) {
                throw new errors_1.PasetoClaimInvalid('token issued in the future');
            }
        }
    }
    // nbf
    if ('nbf' in payload) {
        if (typeof payload.nbf !== 'string') {
            throw new errors_1.PasetoClaimInvalid('payload.nbf must be a string');
        }
        var nbf = new Date(payload.nbf).getTime();
        if (!nbf) {
            throw new errors_1.PasetoClaimInvalid('payload.nbf must be a valid ISO8601 string');
        }
        if (!ignoreNbf) {
            if (nbf > unix + tolerance) {
                throw new errors_1.PasetoClaimInvalid('token is not active yet');
            }
        }
    }
    // exp
    if ('exp' in payload) {
        if (typeof payload.exp !== 'string') {
            throw new errors_1.PasetoClaimInvalid('payload.exp must be a string');
        }
        var exp = new Date(payload.exp).getTime();
        if (!exp) {
            throw new errors_1.PasetoClaimInvalid('payload.exp must be a valid ISO8601 string');
        }
        if (!ignoreExp) {
            if (exp <= unix - tolerance) {
                throw new errors_1.PasetoClaimInvalid('token is expired');
            }
        }
    }
    // maxTokenAge
    if (maxTokenAge !== undefined) {
        if (typeof maxTokenAge !== 'string') {
            throw new TypeError('options.maxTokenAge must be a string');
        }
        if (!('iat' in payload)) {
            throw new errors_1.PasetoClaimInvalid('missing iat claim');
        }
        if (iat + ms_1.ms(maxTokenAge) < unix + tolerance) {
            throw new errors_1.PasetoClaimInvalid('maxTokenAge exceeded');
        }
    }
};
exports.assertPayload = assertPayload;
