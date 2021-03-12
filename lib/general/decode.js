"use strict";
exports.__esModule = true;
exports.decode = void 0;
var errors_1 = require("../errors");
var base64url_1 = require("../help/base64url");
var parse_paseto_payload_1 = require("../help/parse_paseto_payload");
var decode = function (token, /* second arg is private API */ _a) {
    var /* second arg is private API */ _b = _a === void 0 ? {} : _a, _c = _b.parse, parse = _c === void 0 ? true : _c;
    if (typeof token !== 'string') {
        throw new TypeError('token must be a string');
    }
    var _d = token.split('.'), version = _d[0], purpose = _d[1], payload = _d[2], footer = _d[3], length = _d.length;
    if (length !== 3 && length !== 4) {
        throw new errors_1.PasetoInvalid('token value is not a PASETO formatted value');
    }
    if (version !== 'v1' && version !== 'v2') {
        throw new errors_1.PasetoNotSupported('unsupported PASETO version');
    }
    if (purpose !== 'local' && purpose !== 'public') {
        throw new errors_1.PasetoNotSupported('unsupported PASETO purpose');
    }
    var result = { footer: footer ? base64url_1.decode(footer) : undefined, payload: undefined, version: version, purpose: purpose };
    if (purpose === 'local') {
        return result;
    }
    var sigLength = version === 'v1' ? 256 : 64;
    var raw;
    try {
        raw = base64url_1.decode(payload).slice(0, -sigLength);
    }
    catch (err) {
        throw new errors_1.PasetoInvalid('token value is not a PASETO formatted value');
    }
    if (!parse) {
        result.payload = raw;
    }
    else {
        result.payload = parse_paseto_payload_1.parse(raw);
    }
    return result;
};
exports.decode = decode;
