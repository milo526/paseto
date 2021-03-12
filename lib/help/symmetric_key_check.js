"use strict";
exports.__esModule = true;
exports.checkKey = void 0;
var crypto_1 = require("crypto");
function checkKey(header, key) {
    if (!(key instanceof crypto_1.KeyObject)) {
        key = crypto_1.createSecretKey(key);
    }
    if (key.type !== 'secret' || key.symmetricKeySize !== 32) {
        throw new TypeError(header + " secret key must be 32 bytes long symmetric key");
    }
    return key;
}
exports.checkKey = checkKey;
