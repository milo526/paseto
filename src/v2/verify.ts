import { createPublicKey, KeyObject, PublicKeyInput } from 'crypto'
import { assertPayload, Input } from '../help/assert_payload'
import { verifyPaseto as verify } from '../help/verify'

function checkKey (key: KeyObject | string | PublicKeyInput | Buffer) {
  if (!(key instanceof KeyObject) || key.type === 'private') {
    key = createPublicKey(key)
  }

  if (key.type !== 'public' || key.asymmetricKeyType !== 'ed25519') {
    throw new TypeError('v2.public verify key must be a public ed25519 key')
  }

  return key
}

export async function v2Verify (token: string, key: KeyObject, { complete = false, ...options }: Record<string, unknown> = {}) {
  key = checkKey(key)

  const { payload, footer } = await verify('v2.public.', token, undefined, 64, key)

  assertPayload(options as unknown as Input, payload as Record<string, unknown>)

  if (complete) {
    return { payload, footer, version: 'v2', purpose: 'public' }
  }

  return payload
}
