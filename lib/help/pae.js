"use strict";
exports.__esModule = true;
exports.pae = void 0;
var le64_1 = require("./le64");
var pae = function () {
    var pieces = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        pieces[_i] = arguments[_i];
    }
    var accumulator = le64_1.le64(pieces.length);
    for (var _a = 0, pieces_1 = pieces; _a < pieces_1.length; _a++) {
        var piece = pieces_1[_a];
        var bufferedPiece = Buffer.from(piece, 'utf8');
        var len = le64_1.le64(Buffer.byteLength(bufferedPiece));
        accumulator = Buffer.concat([accumulator, len, bufferedPiece]);
    }
    return accumulator;
};
exports.pae = pae;
