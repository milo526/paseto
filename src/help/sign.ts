import { pae } from './pae'
import { pack } from './pack'
import { crypto_worker_main } from './crypto_worker_main'
import { KeyObject } from 'crypto'

export async function signPaseto (h: string, payload: unknown, f: Buffer, alg: string | undefined, key: KeyObject, expectedSigLength: number) {
  const m = Buffer.from(JSON.stringify(payload), 'utf8')
  const m2 = pae(h, m, f)
  const sig = await crypto_worker_main.sign(alg, m2, key)

  if (sig.length !== expectedSigLength) {
    throw new TypeError(`invalid ${h.slice(0, -1)} signing key bit length`)
  }

  return pack(h, [m, sig], f)
}
