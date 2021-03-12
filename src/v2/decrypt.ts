import { KeyObject } from 'crypto'
import { crypto_worker_main } from '../help/crypto_worker_main'
import { checkKey as symKeyCheck } from '../help/symmetric_key_check'
import { parse } from '../help/parse_paseto_payload'
import { pae } from '../help/pae'
import { assertPayload, Input } from '../help/assert_payload'
import { PasetoDecryptionFailed, PasetoInvalid } from '../errors'
import { decode } from '../help/base64url'
const checkKey = symKeyCheck.bind(undefined, 'v2.local')
const h = 'v2.local.'

export async function v2Decrypt (token: string, key: KeyObject | Buffer, { complete = false, ...options } = {}) {
  if (typeof token !== 'string') {
    throw new TypeError(`token must be a string, got: ${typeof token}`)
  }

  key = checkKey(key)

  if (token.substr(0, h.length) !== h) {
    throw new PasetoInvalid('token is not a v2.local PASETO')
  }

  const { 0: b64, 1: b64f = '', length } = token.substr(h.length).split('.')
  if (length > 2) {
    throw new PasetoInvalid('token value is not a PASETO formatted value')
  }

  const f = decode(b64f)
  const raw = decode(b64)
  const n = raw.slice(0, 24)
  const c = raw.slice(24)

  const k = key.export()
  const preAuth = pae(h, n, f)
  let payload = await crypto_worker_main['xchacha20-poly1305-decrypt'](c, n, k, preAuth)
  if (!payload) {
    throw new PasetoDecryptionFailed('decryption failed')
  }

  payload = parse(payload)

  assertPayload(options as Input, payload as unknown as Record<string, unknown>)

  if (complete) {
    return { payload, footer: f.length ? f : undefined, version: 'v2', purpose: 'local' }
  }

  return payload
}
