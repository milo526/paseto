import { encode } from './base64url'

export const pack = (header: string, payload: Uint8Array[], footer: Buffer): string => {
  if (footer.length !== 0) {
    return `${header}${encode(Buffer.concat(payload))}.${encode(footer)}`
  }

  return `${header}${encode(Buffer.concat(payload))}`
}
