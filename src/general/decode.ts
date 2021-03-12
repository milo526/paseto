import { PasetoInvalid, PasetoNotSupported } from '../errors'
import { decode as base64Decode } from '../help/base64url'
import { parse as parsePaseto } from '../help/parse_paseto_payload'

export const decode = (token: string, /* second arg is private API */{ parse = true } = {}) => {
  if (typeof token !== 'string') {
    throw new TypeError('token must be a string')
  }

  const {
    0: version,
    1: purpose,
    2: payload,
    3: footer,
    length
  } = token.split('.')

  if (length !== 3 && length !== 4) {
    throw new PasetoInvalid('token value is not a PASETO formatted value')
  }

  if (version !== 'v1' && version !== 'v2') {
    throw new PasetoNotSupported('unsupported PASETO version')
  }

  if (purpose !== 'local' && purpose !== 'public') {
    throw new PasetoNotSupported('unsupported PASETO purpose')
  }

  const result: {footer?: Buffer, payload?: Buffer | string, version: string, purpose: string} = { footer: footer ? base64Decode(footer) : undefined, payload: undefined, version, purpose }

  if (purpose === 'local') {
    return result
  }

  const sigLength = version === 'v1' ? 256 : 64

  let raw
  try {
    raw = base64Decode(payload).slice(0, -sigLength)
  } catch (err) {
    throw new PasetoInvalid('token value is not a PASETO formatted value')
  }

  if (!parse) {
    result.payload = raw
  } else {
    result.payload = parsePaseto(raw)
  }

  return result
}
