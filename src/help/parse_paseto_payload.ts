import { PasetoInvalid } from '../errors'
import { strict as assert } from 'assert'
import { isObject } from './is_object'

export const parse = (payload: Buffer) => {
  try {
    const parsed = JSON.parse(payload.toString())
    assert(isObject(parsed))
    return parsed
  } catch (err) {
    throw new PasetoInvalid('All PASETO payloads MUST be a JSON object')
  }
}
