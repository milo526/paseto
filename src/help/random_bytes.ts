import { randomFill } from 'crypto'
import { promisify } from 'util'

const randomFillPromise = promisify<Buffer, Buffer>(randomFill)

export async function randomBytes (bytes: number): Promise<Buffer> {
  const buf = Buffer.allocUnsafe(bytes)
  return await randomFillPromise(buf)
}
