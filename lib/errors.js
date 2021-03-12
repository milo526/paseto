"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PasetoClaimInvalid = exports.PasetoVerificationFailed = exports.PasetoInvalid = exports.PasetoDecryptionFailed = exports.PasetoNotSupported = void 0;
var CODES = {
    PasetoNotSupported: 'ERR_PASETO_NOT_SUPPORTED',
    PasetoDecryptionFailed: 'ERR_PASETO_DECRYPTION_FAILED',
    PasetoInvalid: 'ERR_PASETO_INVALID',
    PasetoVerificationFailed: 'ERR_PASETO_VERIFICATION_FAILED',
    PasetoClaimInvalid: 'ERR_PASETO_CLAIM_INVALID'
};
var PasetoError = /** @class */ (function (_super) {
    __extends(PasetoError, _super);
    function PasetoError(message, prototype) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, prototype);
        _this.code = CODES[_this.constructor.name];
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return PasetoError;
}(Error));
var PasetoNotSupported = /** @class */ (function (_super) {
    __extends(PasetoNotSupported, _super);
    function PasetoNotSupported(message) {
        return _super.call(this, message, PasetoNotSupported.prototype) || this;
    }
    return PasetoNotSupported;
}(PasetoError));
exports.PasetoNotSupported = PasetoNotSupported;
var PasetoDecryptionFailed = /** @class */ (function (_super) {
    __extends(PasetoDecryptionFailed, _super);
    function PasetoDecryptionFailed(message) {
        return _super.call(this, message, PasetoDecryptionFailed.prototype) || this;
    }
    return PasetoDecryptionFailed;
}(PasetoError));
exports.PasetoDecryptionFailed = PasetoDecryptionFailed;
var PasetoInvalid = /** @class */ (function (_super) {
    __extends(PasetoInvalid, _super);
    function PasetoInvalid(message) {
        return _super.call(this, message, PasetoInvalid.prototype) || this;
    }
    return PasetoInvalid;
}(PasetoError));
exports.PasetoInvalid = PasetoInvalid;
var PasetoVerificationFailed = /** @class */ (function (_super) {
    __extends(PasetoVerificationFailed, _super);
    function PasetoVerificationFailed(message) {
        return _super.call(this, message, PasetoVerificationFailed.prototype) || this;
    }
    return PasetoVerificationFailed;
}(PasetoError));
exports.PasetoVerificationFailed = PasetoVerificationFailed;
var PasetoClaimInvalid = /** @class */ (function (_super) {
    __extends(PasetoClaimInvalid, _super);
    function PasetoClaimInvalid(message) {
        return _super.call(this, message, PasetoClaimInvalid.prototype) || this;
    }
    return PasetoClaimInvalid;
}(PasetoError));
exports.PasetoClaimInvalid = PasetoClaimInvalid;
