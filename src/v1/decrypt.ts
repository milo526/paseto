import { parse } from '../help/parse_paseto_payload'
import { assertPayload } from '../help/assert_payload'
import { checkKey as symKeyCheck } from '../help/symmetric_key_check'
import { PasetoDecryptionFailed, PasetoInvalid } from '../errors'
import { crypto_worker_main } from '../help/crypto_worker_main'
import { decode } from '../help/base64url'
const checkKey = symKeyCheck.bind(undefined, 'v1.local')

const h = 'v1.local.'

export async function v1Decrypt (token: any, key: any, { complete = false, ...options } = {}): Promise<any> {
  if (typeof token !== 'string') {
    throw new TypeError(`token must be a string, got: ${typeof token}`)
  }

  key = checkKey(key)

  if (token.substr(0, h.length) !== h) {
    throw new PasetoInvalid('token is not a v1.local PASETO')
  }

  const { 0: b64, 1: b64f = '', length } = token.substr(h.length).split('.')
  if (length > 2) {
    throw new PasetoInvalid('token value is not a PASETO formatted value')
  }

  const f = decode(b64f)
  const raw = decode(b64)
  const k = key.export()

  let payload = await crypto_worker_main['aes-256-ctr-hmac-sha-384-decrypt'](raw, f, k)
  if (!payload) {
    throw new PasetoDecryptionFailed('decryption failed')
  }

  payload = parse(payload)

  assertPayload(options as any, payload as any)

  if (complete) {
    return { payload, footer: f.length ? f : undefined, version: 'v1', purpose: 'local' }
  }

  return payload
}
