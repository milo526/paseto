import { timingSafeEqual as TSE } from 'crypto'

const paddedBuffer = (input: Buffer, length: number) => {
  if (input.length === length) {
    return input
  }

  const buffer = Buffer.alloc(length)
  input.copy(buffer)
  return buffer
}

export const timingSafeEqual = (a: Buffer, b: Buffer) => {
  const length = Math.max(a.length, b.length)
  return TSE(paddedBuffer(a, length), paddedBuffer(b, length))
}
