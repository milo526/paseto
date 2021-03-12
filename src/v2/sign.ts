import { createPrivateKey, KeyObject, PrivateKeyInput } from 'crypto'
import { applyOptions, Input } from '../help/apply_options'
import { checkFooter } from '../help/check_footer'
import { checkPayload } from '../help/check_payload'
import { signPaseto } from '../help/sign'

function checkKey (key: KeyObject | string | PrivateKeyInput | Buffer) {
  if (!(key instanceof KeyObject)) {
    key = createPrivateKey(key)
  }

  if (key.type !== 'private' || key.asymmetricKeyType !== 'ed25519') {
    throw new TypeError('v2.public signing key must be a private ed25519 key')
  }

  return key
}

export async function v2Sign (payload: Object, key: string, { footer, ...options }: Record<string, unknown> = {}) {
  payload = checkPayload(payload)
  const f = checkFooter(footer)
  payload = applyOptions(options as unknown as Input, payload)
  return await signPaseto('v2.public.', payload, f, undefined, checkKey(key), 64)
}
