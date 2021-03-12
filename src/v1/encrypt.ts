import { Output, applyOptions } from '../help/apply_options'
import { checkFooter } from '../help/check_footer'
import { checkPayload } from '../help/check_payload'
import { randomBytes } from '../help/random_bytes'
import { checkKey as symKeyCheck } from '../help/symmetric_key_check'
import { crypto_worker_main } from '../help/crypto_worker_main'
import { KeyObject } from 'crypto'

const checkKey = symKeyCheck.bind(undefined, 'v1.local')

export async function v1Encrypt (payload: Partial<Output>, key: KeyObject | Buffer, {
  footer = undefined,
  nonce = undefined,
  ...options
} = {}) {
  payload = checkPayload(payload)
  key = checkKey(key)
  const f = checkFooter(footer)
  payload = applyOptions(options as any, payload)

  const m = Buffer.from(JSON.stringify(payload), 'utf8')
  const k = key.export()

  if ((nonce && process.env.NODE_ENV !== 'test') || !nonce) {
    nonce = await randomBytes(32) as any
  }

  return await crypto_worker_main['aes-256-ctr-hmac-sha-384-encrypt'](m, f, k, nonce)
}
