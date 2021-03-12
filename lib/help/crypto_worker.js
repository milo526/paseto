"use strict";
exports.__esModule = true;
exports.supportsKeyObjectInPostMessage = void 0;
var worker_threads_1 = require("worker_threads");
var crypto = require("crypto");
var sodium = require("libsodium-wrappers");
var pae_1 = require("./pae");
var pack_1 = require("./pack");
var timing_safe_equal_1 = require("./timing_safe_equal");
var _a = process.version.substr(1).split('.').map(function (x) { return parseInt(x, 10); }), major = _a[0], minor = _a[1];
exports.supportsKeyObjectInPostMessage = major > 14 || (major === 14 && minor >= 5) || (major === 12 && minor >= 19);
var hkdf = function (key, length, salt, info) {
    var prk = methods.hmac('sha384', key, salt);
    var u = Buffer.from(info);
    var t = Buffer.from('');
    var lb = Buffer.from('');
    var i;
    for (var bi = 1; Buffer.byteLength(t) < length; ++i) {
        i = Buffer.from(String.fromCharCode(bi));
        var inp = Buffer.concat([lb, u, i]);
        lb = methods.hmac('sha384', inp, prk);
        t = Buffer.concat([t, lb]);
    }
    return Buffer.from(t).slice(0, length);
};
var methods = {
    'aes-256-ctr-hmac-sha-384-encrypt': function (m, f, k, nonce) {
        var n = methods.hmac('sha384', m, nonce);
        n = n.slice(0, 32);
        f = Buffer.from(f);
        var salt = n.slice(0, 16);
        var ek = hkdf(k, 32, salt, 'paseto-encryption-key');
        var ak = hkdf(k, 32, salt, 'paseto-auth-key-for-aead');
        var c = methods.encrypt('aes-256-ctr', m, ek, n.slice(16));
        var preAuth = pae_1.pae('v1.local.', n, c, f);
        var t = methods.hmac('sha384', preAuth, ak);
        return pack_1.pack('v1.local.', [n, c, t], f);
    },
    'aes-256-ctr-hmac-sha-384-decrypt': function (raw, f, k) {
        var n = raw.slice(0, 32);
        var t = raw.slice(-48);
        var c = raw.slice(32, -48);
        var salt = n.slice(0, 16);
        var ek = hkdf(k, 32, salt, 'paseto-encryption-key');
        var ak = hkdf(k, 32, salt, 'paseto-auth-key-for-aead');
        var preAuth = pae_1.pae('v1.local.', n, c, f);
        var t2 = methods.hmac('sha384', preAuth, ak);
        var payload = methods.decrypt('aes-256-ctr', c, ek, n.slice(16));
        if (!timing_safe_equal_1.timingSafeEqual(t, t2) || !payload) {
            return false;
        }
        return payload;
    },
    hmac: function (alg, payload, key) {
        var hmac = crypto.createHmac(alg, key);
        hmac.update(payload);
        return hmac.digest();
    },
    verify: function (alg, payload, key, signature) {
        if (!exports.supportsKeyObjectInPostMessage) {
            key.key = Buffer.from(key.key);
        }
        return crypto.verify(alg, payload, key, signature);
    },
    sign: function (alg, payload, key) {
        if (!exports.supportsKeyObjectInPostMessage) {
            key.key = Buffer.from(key.key);
        }
        return crypto.sign(alg, payload, key);
    },
    encrypt: function (cipher, cleartext, key, iv) {
        var encryptor = crypto.createCipheriv(cipher, key, iv);
        return Buffer.concat([encryptor.update(cleartext), encryptor.final()]);
    },
    decrypt: function (cipher, ciphertext, key, iv) {
        try {
            var decryptor = crypto.createDecipheriv(cipher, key, iv);
            return Buffer.concat([decryptor.update(ciphertext), decryptor.final()]);
        }
        catch (err) {
            return false;
        }
    },
    'xchacha20-poly1305-encrypt': function (cleartext, nonce, key, footer) {
        var n = sodium.crypto_generichash(24, cleartext, nonce);
        var preAuth = pae_1.pae('v2.local.', n, footer);
        return {
            n: n,
            c: sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(cleartext, preAuth, null, n, key)
        };
    },
    'xchacha20-poly1305-decrypt': function (ciphertext, nonce, key, preAuth) {
        try {
            return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext, preAuth, nonce, key);
        }
        catch (err) {
            return false;
        }
    }
};
sodium.ready.then(function () {
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', function (_a) {
        var id = _a.id, method = _a.method, args = _a.args;
        // @ts-expect-error
        var value = methods[method].apply(methods, args);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ id: id, value: value });
    });
});
