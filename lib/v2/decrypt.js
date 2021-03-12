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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.v2Decrypt = void 0;
var crypto_worker_main_1 = require("../help/crypto_worker_main");
var symmetric_key_check_1 = require("../help/symmetric_key_check");
var parse_paseto_payload_1 = require("../help/parse_paseto_payload");
var pae_1 = require("../help/pae");
var assert_payload_1 = require("../help/assert_payload");
var errors_1 = require("../errors");
var base64url_1 = require("../help/base64url");
var checkKey = symmetric_key_check_1.checkKey.bind(undefined, 'v2.local');
var h = 'v2.local.';
function v2Decrypt(token, key, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.complete, complete = _b === void 0 ? false : _b, options = __rest(_a, ["complete"]);
    return __awaiter(this, void 0, void 0, function () {
        var _c, b64, _d, b64f, length, f, raw, n, c, k, preAuth, payload;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (typeof token !== 'string') {
                        throw new TypeError("token must be a string, got: " + typeof token);
                    }
                    key = checkKey(key);
                    if (token.substr(0, h.length) !== h) {
                        throw new errors_1.PasetoInvalid('token is not a v2.local PASETO');
                    }
                    _c = token.substr(h.length).split('.'), b64 = _c[0], _d = _c[1], b64f = _d === void 0 ? '' : _d, length = _c.length;
                    if (length > 2) {
                        throw new errors_1.PasetoInvalid('token value is not a PASETO formatted value');
                    }
                    f = base64url_1.decode(b64f);
                    raw = base64url_1.decode(b64);
                    n = raw.slice(0, 24);
                    c = raw.slice(24);
                    k = key["export"]();
                    preAuth = pae_1.pae(h, n, f);
                    return [4 /*yield*/, crypto_worker_main_1.crypto_worker_main['xchacha20-poly1305-decrypt'](c, n, k, preAuth)];
                case 1:
                    payload = _e.sent();
                    if (!payload) {
                        throw new errors_1.PasetoDecryptionFailed('decryption failed');
                    }
                    payload = parse_paseto_payload_1.parse(payload);
                    assert_payload_1.assertPayload(options, payload);
                    if (complete) {
                        return [2 /*return*/, { payload: payload, footer: f.length ? f : undefined, version: 'v2', purpose: 'local' }];
                    }
                    return [2 /*return*/, payload];
            }
        });
    });
}
exports.v2Decrypt = v2Decrypt;
