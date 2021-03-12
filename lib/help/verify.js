"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.verifyPaseto = void 0;
var crypto_worker_main_1 = require("./crypto_worker_main");
var base64url_1 = require("./base64url");
var pae_1 = require("./pae");
var parse_paseto_payload_1 = require("./parse_paseto_payload");
var errors_1 = require("../errors");
function verifyPaseto(h, token, alg, sigLength, key) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, b64ms, b64f, length, f, ms, m, s, m2, valid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (typeof token !== 'string') {
                        throw new TypeError('token must be a string');
                    }
                    if (token.substr(0, h.length) !== h) {
                        throw new errors_1.PasetoInvalid("token is not a " + h.slice(0, -1) + " token");
                    }
                    _a = token.substr(h.length).split('.'), b64ms = _a[0], b64f = _a[1], length = _a.length;
                    if (length !== 1 && length !== 2) {
                        throw new errors_1.PasetoInvalid('token value is not a PASETO formatted value');
                    }
                    try {
                        ms = base64url_1.decode(b64ms);
                        f = base64url_1.decode(b64f || '');
                    }
                    catch (err) {
                        throw new errors_1.PasetoInvalid('token value is not a PASETO formatted value');
                    }
                    m = ms.slice(0, -sigLength);
                    s = ms.slice(-sigLength);
                    m2 = pae_1.pae(h, m, f);
                    return [4 /*yield*/, crypto_worker_main_1.crypto_worker_main.verify(alg, m2, key, s)];
                case 1:
                    valid = _b.sent();
                    if (!valid) {
                        throw new errors_1.PasetoVerificationFailed('invalid signature');
                    }
                    return [2 /*return*/, {
                            payload: parse_paseto_payload_1.parse(m),
                            footer: f.length ? f : undefined
                        }];
            }
        });
    });
}
exports.verifyPaseto = verifyPaseto;
