import { parentPort } from 'worker_threads'
import * as crypto from 'crypto'
import * as sodium from 'libsodium-wrappers'
import { pae } from './pae'
import { pack } from './pack'
import { timingSafeEqual } from './timing_safe_equal'

const [major, minor] = process.version.substr(1).split('.').map((x) => parseInt(x, 10))
export const supportsKeyObjectInPostMessage = major > 14 || (major === 14 && minor >= 5) || (major === 12 && minor >= 19)
const hkdf = (key: crypto.BinaryLike, length: number, salt: crypto.CipherKey, info: string) => {
  const prk = methods.hmac('sha384', key, salt)

  const u = Buffer.from(info)

  let t = Buffer.from('')
  let lb = Buffer.from('')
  let i: number

  for (let bi = 1; Buffer.byteLength(t) < length; ++i) {
    i = Buffer.from(String.fromCharCode(bi)) as unknown as number
    const inp = Buffer.concat([lb, u, i as unknown as Uint8Array])

    lb = methods.hmac('sha384', inp, prk)
    t = Buffer.concat([t, lb])
  }

  return Buffer.from(t).slice(0, length)
}
const methods = {
  'aes-256-ctr-hmac-sha-384-encrypt' (m: crypto.BinaryLike, f: Buffer, k: crypto.BinaryLike, nonce: crypto.CipherKey) {
    let n = methods.hmac('sha384', m, nonce)
    n = n.slice(0, 32)
    f = Buffer.from(f)

    const salt = n.slice(0, 16)
    const ek = hkdf(k, 32, salt, 'paseto-encryption-key')
    const ak = hkdf(k, 32, salt, 'paseto-auth-key-for-aead')

    const c = methods.encrypt('aes-256-ctr', m, ek, n.slice(16))
    const preAuth = pae('v1.local.', n, c, f)
    const t = methods.hmac('sha384', preAuth, ak)

    return pack('v1.local.', [n, c, t], f)
  },
  'aes-256-ctr-hmac-sha-384-decrypt' (raw: Buffer, f: string | Buffer, k: crypto.BinaryLike) {
    const n = raw.slice(0, 32)
    const t = raw.slice(-48)
    const c = raw.slice(32, -48)

    const salt = n.slice(0, 16)
    const ek = hkdf(k, 32, salt, 'paseto-encryption-key')
    const ak = hkdf(k, 32, salt, 'paseto-auth-key-for-aead')

    const preAuth = pae('v1.local.', n, c, f)

    const t2 = methods.hmac('sha384', preAuth, ak)
    const payload = methods.decrypt('aes-256-ctr', c, ek, n.slice(16))

    if (!timingSafeEqual(t, t2) || !payload) {
      return false
    }

    return payload
  },
  hmac (alg: string, payload: crypto.BinaryLike, key: crypto.CipherKey) {
    const hmac = crypto.createHmac(alg, key)
    hmac.update(payload)
    return hmac.digest()
  },
  verify (alg: string, payload: NodeJS.ArrayBufferView, key: {key: Buffer}, signature: NodeJS.ArrayBufferView) {
    if (!supportsKeyObjectInPostMessage) {
      key.key = Buffer.from(key.key)
    }
    return crypto.verify(alg, payload, key, signature)
  },
  sign (alg: string, payload: NodeJS.ArrayBufferView, key: {key: Buffer}) {
    if (!supportsKeyObjectInPostMessage) {
      key.key = Buffer.from(key.key)
    }
    return crypto.sign(alg, payload, key)
  },
  encrypt (cipher: crypto.CipherGCMTypes | crypto.CipherCCMTypes | string, cleartext: crypto.BinaryLike, key: crypto.CipherKey, iv: crypto.BinaryLike | null) {
    const encryptor = crypto.createCipheriv(cipher, key, iv)
    return Buffer.concat([encryptor.update(cleartext), encryptor.final()])
  },
  decrypt (cipher: crypto.CipherGCMTypes | crypto.CipherCCMTypes | string, ciphertext: NodeJS.ArrayBufferView, key: crypto.CipherKey, iv: string | NodeJS.ArrayBufferView) {
    try {
      const decryptor = crypto.createDecipheriv(cipher, key, iv)
      return Buffer.concat([decryptor.update(ciphertext), decryptor.final()])
    } catch (err) {
      return false
    }
  },
  'xchacha20-poly1305-encrypt' (cleartext: string | Uint8Array, nonce: string, key: Uint8Array, footer: string | Buffer | Uint8Array) {
    const n = sodium.crypto_generichash(24, cleartext, nonce)
    const preAuth = pae('v2.local.', n, footer)

    return {
      n,
      c: sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(cleartext, preAuth, null, n, key)
    }
  },
  'xchacha20-poly1305-decrypt' (ciphertext: string | Uint8Array, nonce: Uint8Array, key: Uint8Array, preAuth: string | Uint8Array | null) {
    try {
      return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext, preAuth, nonce, key)
    } catch (err) {
      return false
    }
  }
}

sodium.ready.then(() => {
  parentPort?.on('message', function ({ id, method, args }: {id: unknown, method: keyof typeof methods, args: unknown[]}) {
    // @ts-expect-error
    const value = methods[method](...args)
    parentPort?.postMessage({ id, value })
  })
})
