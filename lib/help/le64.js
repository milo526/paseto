"use strict";
exports.__esModule = true;
exports.le64 = void 0;
var errors_1 = require("../errors");
var le64 = function (n) {
    /* c8 ignore next 3 */
    if (!Number.isSafeInteger(n)) {
        throw new errors_1.PasetoNotSupported('message is too long for Node.js to safely process');
    }
    var up = ~~(n / 0xFFFFFFFF);
    var dn = (n % 0xFFFFFFFF) - up;
    var buf = Buffer.allocUnsafe(8);
    buf.writeUInt32LE(up, 4);
    buf.writeUInt32LE(dn, 0);
    return buf;
};
exports.le64 = le64;
