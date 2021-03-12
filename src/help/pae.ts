import { le64 } from './le64'

export const pae = (...pieces: Array<string | Buffer | Uint8Array>) => {
  let accumulator = le64(pieces.length)
  for (const piece of pieces) {
    const bufferedPiece: Buffer = Buffer.from(piece as unknown as string, 'utf8')
    const len = le64(Buffer.byteLength(bufferedPiece))
    accumulator = Buffer.concat([accumulator, len, bufferedPiece])
  }
  return accumulator
}
