import { PasetoNotSupported } from '../errors'
import * as crypto from 'crypto'
import { promisify } from 'util'
import { randomBytes } from '../help/random_bytes'

const generateKeyPair = promisify(crypto.generateKeyPair)

const LOCAL_KEY_LENGTH = 32

export async function generateKey (purpose: any) {
  switch (purpose) {
    case 'local':
      return crypto.createSecretKey(await randomBytes(LOCAL_KEY_LENGTH))
    case 'public': {
      const { privateKey } = await generateKeyPair('rsa', { modulusLength: 2048 })
      return privateKey
    }
    default:
      throw new PasetoNotSupported('unsupported v1 purpose')
  }
}
