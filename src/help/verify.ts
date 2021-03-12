import { crypto_worker_main } from './crypto_worker_main'
import { decode } from './base64url'
import { pae } from './pae'
import { parse } from './parse_paseto_payload'
import { PasetoInvalid, PasetoVerificationFailed } from '../errors'
import * as crypto from 'crypto'

export async function verifyPaseto (h: string, token: string, alg: string | undefined, sigLength: number, key: crypto.KeyLike) {
  if (typeof token !== 'string') {
    throw new TypeError('token must be a string')
  }

  if (token.substr(0, h.length) !== h) {
    throw new PasetoInvalid(`token is not a ${h.slice(0, -1)} token`)
  }

  const { 0: b64ms, 1: b64f, length } = token.substr(h.length).split('.')
  if (length !== 1 && length !== 2) {
    throw new PasetoInvalid('token value is not a PASETO formatted value')
  }

  let f
  let ms

  try {
    ms = decode(b64ms)
    f = decode(b64f || '')
  } catch (err) {
    throw new PasetoInvalid('token value is not a PASETO formatted value')
  }

  const m = ms.slice(0, -sigLength)
  const s = ms.slice(-sigLength)
  const m2 = pae(h, m, f)

  const valid = await crypto_worker_main.verify(alg, m2, key, s)

  if (!valid) {
    throw new PasetoVerificationFailed('invalid signature')
  }

  return {
    payload: parse(m),
    footer: f.length ? f : undefined
  }
}
