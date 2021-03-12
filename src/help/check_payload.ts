import { isObject } from './is_object'

const deepClone = <T>(payload: T): T => JSON.parse(JSON.stringify(payload))

export const checkPayload = <T extends Object>(payload: T): T => {
  if (!isObject(payload)) {
    throw new TypeError('payload must be a plain object')
  }
  return deepClone(payload)
}
