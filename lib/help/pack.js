"use strict";
exports.__esModule = true;
exports.pack = void 0;
var base64url_1 = require("./base64url");
var pack = function (header, payload, footer) {
    if (footer.length !== 0) {
        return "" + header + base64url_1.encode(Buffer.concat(payload)) + "." + base64url_1.encode(footer);
    }
    return "" + header + base64url_1.encode(Buffer.concat(payload));
};
exports.pack = pack;
