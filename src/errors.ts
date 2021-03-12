const CODES = {
  PasetoNotSupported: 'ERR_PASETO_NOT_SUPPORTED',
  PasetoDecryptionFailed: 'ERR_PASETO_DECRYPTION_FAILED',
  PasetoInvalid: 'ERR_PASETO_INVALID',
  PasetoVerificationFailed: 'ERR_PASETO_VERIFICATION_FAILED',
  PasetoClaimInvalid: 'ERR_PASETO_CLAIM_INVALID'
} as const

class PasetoError extends Error {
  public code: typeof CODES[keyof typeof CODES]
  constructor (message: string | undefined, prototype: PasetoError) {
    super(message)
    Object.setPrototypeOf(this, prototype)
    this.code = CODES[this.constructor.name as keyof typeof CODES]

    Error.captureStackTrace(this, this.constructor)
  }
}

export class PasetoNotSupported extends PasetoError {
  constructor (message: string | undefined) {
    super(message, PasetoNotSupported.prototype)
  }
}
export class PasetoDecryptionFailed extends PasetoError {
  constructor (message: string | undefined) {
    super(message, PasetoDecryptionFailed.prototype)
  }
}
export class PasetoInvalid extends PasetoError {
  constructor (message: string | undefined) {
    super(message, PasetoInvalid.prototype)
  }
}
export class PasetoVerificationFailed extends PasetoError {
  constructor (message: string | undefined) {
    super(message, PasetoVerificationFailed.prototype)
  }
}
export class PasetoClaimInvalid extends PasetoError {
  constructor (message: string | undefined) {
    super(message, PasetoClaimInvalid.prototype)
  }
}
