import { applyOptions, Input, Output } from '../help/apply_options'
import { checkFooter } from '../help/check_footer'
import { checkKey as symKeyCheck } from '../help/symmetric_key_check'
import { checkPayload } from '../help/check_payload'
import { pack } from '../help/pack'
import { randomBytes } from '../help/random_bytes'
import { crypto_worker_main } from '../help/crypto_worker_main'
import { KeyObject } from 'crypto'
const checkKey = symKeyCheck.bind(undefined, 'v2.local')

export async function v2Encrypt (payload: Output, key: KeyObject, {
  footer,
  nonce,
  ...options
}: Record<string, unknown> = {}) {
  payload = checkPayload(payload)
  key = checkKey(key)
  const f = checkFooter(footer)
  payload = applyOptions(options as unknown as Input, payload)

  const m = Buffer.from(JSON.stringify(payload), 'utf8')
  const h = 'v2.local.'
  const k = key.export()

  if ((nonce && process.env.NODE_ENV !== 'test') || !nonce) {
    nonce = await randomBytes(32)
  }

  const d: {c: Uint8Array, n:Uint8Array} = await crypto_worker_main['xchacha20-poly1305-encrypt'](m, nonce, k, f) as unknown as {c: Uint8Array, n: Uint8Array}

  return pack(h, [d.n, d.c], f)
}
