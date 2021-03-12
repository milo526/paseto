import { verifyPaseto as verify } from '../help/verify'

import { assertPayload } from '../help/assert_payload'

import * as crypto from 'crypto'

const {
  constants: {
    RSA_PKCS1_PSS_PADDING: padding,
    RSA_PSS_SALTLEN_DIGEST: saltLength
  },
  createPublicKey,
  KeyObject
} = crypto

function checkKey (key: string | crypto.KeyObject | crypto.PublicKeyInput | Buffer) {
  if (!(key instanceof KeyObject) || key.type === 'private') {
    key = createPublicKey(key)
  }

  if (key.type !== 'public' || key.asymmetricKeyType !== 'rsa') {
    throw new TypeError('v1.public verify key must be a public RSA key')
  }

  return key
}

export async function v1Verify (token: string, key: string | crypto.KeyObject | crypto.PublicKeyInput | Buffer, { complete = false, ...options } = {}) {
  key = checkKey(key)

  // @ts-expect-error
  const { payload, footer } = await verify('v1.public.', token, 'sha384', 256, { key, padding, saltLength })

  assertPayload(options as any, payload)

  if (complete) {
    return { payload, footer, version: 'v1', purpose: 'public' }
  }

  return payload
}
