import * as crypto from 'crypto'
import { applyOptions } from '../help/apply_options'
import { checkFooter } from '../help/check_footer'
import { checkPayload } from '../help/check_payload'
import { signPaseto as sign } from '../help/sign'

const {
  constants: {
    RSA_PKCS1_PSS_PADDING: padding,
    RSA_PSS_SALTLEN_DIGEST: saltLength
  },
  createPrivateKey,
  KeyObject
} = crypto

function checkKey (key: string | crypto.KeyObject | crypto.PrivateKeyInput | Buffer) {
  if (!(key instanceof KeyObject)) {
    key = createPrivateKey(key)
  }

  if (key.type !== 'private' || key.asymmetricKeyType !== 'rsa') {
    throw new TypeError('v1.public signing key must be a private RSA key')
  }

  return key
}

export async function v1Sign (payload: unknown, key: string | Buffer | crypto.KeyObject | crypto.PrivateKeyInput, { footer = undefined, ...options } = {}) {
  payload = checkPayload(payload as any)
  const f = checkFooter(footer)
  payload = applyOptions(options as any, payload as any)
  key = checkKey(key) as any
  // @ts-expect-error
  return await sign('v1.public.', payload, f, 'sha384', { key, padding, saltLength }, 256)
}
