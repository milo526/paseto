const fromBase64 = (base64: string): string => {
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

const toBase64 = (base64url: string): string => {
  return base64url.replace(/-/g, '+').replace(/_/g, '/')
}

export const encode = (buf: Buffer): string => {
  return fromBase64(buf.toString('base64'))
}

export const decode = (input: string): Buffer => {
  return Buffer.from(toBase64(input), 'base64')
}
