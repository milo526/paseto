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
var paseto = require("./index.d");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var key, token, a, key, token, a, key, token, a, key, token, a;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, paseto.V2.generateKey('public')];
            case 1:
                key = _a.sent();
                paseto.V2.sign({}, key);
                paseto.V2.sign({}, key, { footer: 'foo' });
                paseto.V2.sign({}, key, { footer: Buffer.from('foo') });
                paseto.V2.sign({}, key, { footer: { foo: 'bar' } });
                return [4 /*yield*/, paseto.V2.sign({}, key, {
                        audience: 'string',
                        expiresIn: '2h',
                        iat: false,
                        issuer: 'string',
                        jti: 'string',
                        kid: 'string',
                        notBefore: 'string',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 2:
                token = _a.sent();
                token.substring(0);
                return [4 /*yield*/, paseto.V2.verify(token, key)];
            case 3:
                _a.sent();
                return [4 /*yield*/, paseto.V2.verify(token, key, { complete: false })];
            case 4:
                _a.sent();
                return [4 /*yield*/, paseto.V2.verify(token, key, { complete: true })];
            case 5:
                a = _a.sent();
                if (a.footer) {
                    a.footer.byteLength;
                }
                a.payload;
                a.purpose;
                a.version;
                return [4 /*yield*/, paseto.V2.verify(token, key, {
                        audience: 'string',
                        clockTolerance: '60s',
                        ignoreExp: true,
                        ignoreIat: true,
                        ignoreNbf: true,
                        issuer: 'string',
                        maxTokenAge: '5m',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 6:
                _a.sent();
                return [4 /*yield*/, paseto.V2.generateKey('local')];
            case 7:
                key = _a.sent();
                paseto.V2.encrypt({}, key);
                paseto.V2.encrypt({}, key, { footer: 'foo' });
                paseto.V2.encrypt({}, key, { footer: Buffer.from('foo') });
                paseto.V2.encrypt({}, key, { footer: { foo: 'bar' } });
                return [4 /*yield*/, paseto.V2.encrypt({}, key, {
                        audience: 'string',
                        expiresIn: '2h',
                        iat: false,
                        issuer: 'string',
                        jti: 'string',
                        kid: 'string',
                        notBefore: 'string',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 8:
                token = _a.sent();
                token.substring(0);
                return [4 /*yield*/, paseto.V2.decrypt(token, key)];
            case 9:
                _a.sent();
                return [4 /*yield*/, paseto.V2.decrypt(token, key, { complete: false })];
            case 10:
                _a.sent();
                return [4 /*yield*/, paseto.V2.decrypt(token, key, { complete: true })];
            case 11:
                a = _a.sent();
                if (a.footer) {
                    a.footer.byteLength;
                }
                a.payload;
                a.purpose;
                a.version;
                return [4 /*yield*/, paseto.V2.decrypt(token, key, {
                        audience: 'string',
                        clockTolerance: '60s',
                        ignoreExp: true,
                        ignoreIat: true,
                        ignoreNbf: true,
                        issuer: 'string',
                        maxTokenAge: '5m',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 12:
                _a.sent();
                return [4 /*yield*/, paseto.V1.generateKey('public')];
            case 13:
                key = _a.sent();
                paseto.V1.sign({}, key);
                paseto.V1.sign({}, key, { footer: 'foo' });
                paseto.V1.sign({}, key, { footer: Buffer.from('foo') });
                paseto.V1.sign({}, key, { footer: { foo: 'bar' } });
                return [4 /*yield*/, paseto.V1.sign({}, key, {
                        audience: 'string',
                        expiresIn: '2h',
                        iat: false,
                        issuer: 'string',
                        jti: 'string',
                        kid: 'string',
                        notBefore: 'string',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 14:
                token = _a.sent();
                token.substring(0);
                return [4 /*yield*/, paseto.V1.verify(token, key)];
            case 15:
                _a.sent();
                return [4 /*yield*/, paseto.V1.verify(token, key, { complete: false })];
            case 16:
                _a.sent();
                return [4 /*yield*/, paseto.V1.verify(token, key, { complete: true })];
            case 17:
                a = _a.sent();
                if (a.footer) {
                    a.footer.byteLength;
                }
                a.payload;
                a.purpose;
                a.version;
                return [4 /*yield*/, paseto.V1.verify(token, key, {
                        audience: 'string',
                        clockTolerance: '60s',
                        ignoreExp: true,
                        ignoreIat: true,
                        ignoreNbf: true,
                        issuer: 'string',
                        maxTokenAge: '5m',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 18:
                _a.sent();
                return [4 /*yield*/, paseto.V1.generateKey('local')];
            case 19:
                key = _a.sent();
                paseto.V1.encrypt({}, key);
                paseto.V1.encrypt({}, key, { footer: 'foo' });
                paseto.V1.encrypt({}, key, { footer: Buffer.from('foo') });
                paseto.V1.encrypt({}, key, { footer: { foo: 'bar' } });
                return [4 /*yield*/, paseto.V1.encrypt({}, key, {
                        audience: 'string',
                        expiresIn: '2h',
                        iat: false,
                        issuer: 'string',
                        jti: 'string',
                        kid: 'string',
                        notBefore: 'string',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 20:
                token = _a.sent();
                token.substring(0);
                return [4 /*yield*/, paseto.V1.decrypt(token, key)];
            case 21:
                _a.sent();
                return [4 /*yield*/, paseto.V1.decrypt(token, key, { complete: false })];
            case 22:
                _a.sent();
                return [4 /*yield*/, paseto.V1.decrypt(token, key, { complete: true })];
            case 23:
                a = _a.sent();
                if (a.footer) {
                    a.footer.byteLength;
                }
                a.payload;
                a.purpose;
                a.version;
                return [4 /*yield*/, paseto.V1.decrypt(token, key, {
                        audience: 'string',
                        clockTolerance: '60s',
                        ignoreExp: true,
                        ignoreIat: true,
                        ignoreNbf: true,
                        issuer: 'string',
                        maxTokenAge: '5m',
                        now: new Date(),
                        subject: 'string'
                    })];
            case 24:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
