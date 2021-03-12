import { Worker } from 'worker_threads'
import { KeyObject } from 'crypto'
import { supportsKeyObjectInPostMessage } from './crypto_worker'
import * as path from 'path'

const tasks = new Map()
const exportArgs = {
  public: [{ format: 'der', type: 'spki' }],
  private: [{ format: 'der', type: 'pkcs8' }]
}

let worker: Worker
let taskId = 0

const spawn = () => {
  worker = new Worker(path.join(__dirname, 'crypto_worker.js'))
  worker.on('message', function ({ id, value }) {
    const task = tasks.get(id)
    tasks.delete(id)
    if (tasks.size === 0) {
      worker.unref()
    }
    if (value instanceof Uint8Array) {
      value = Buffer.from(value)
    }
    task(value)
  })
}

const a = async (method: string, ...args: unknown[]) => await new Promise<Buffer>((resolve) => {
  const id = taskId++
  tasks.set(id, resolve)

  if (worker === undefined) {
    spawn()
  }

  if (!supportsKeyObjectInPostMessage) {
    let key: Buffer | { key: Buffer }

    const keyObject: KeyObject | Buffer = args[2] as KeyObject | Buffer

    if (keyObject instanceof KeyObject) {
      key = {
        key: keyObject.export.apply(keyObject, exportArgs[keyObject.type as 'public' | 'private'] as unknown as [undefined]),
        ...exportArgs[keyObject.type as 'public' | 'private'][0]
      }
    } else if (Buffer.isBuffer(keyObject)) {
      key = keyObject
    } else {
      const localKeyObject: KeyObject = (keyObject as {key: KeyObject}).key
      key = keyObject as {key: Buffer}
      key.key = localKeyObject.export.apply(keyObject, exportArgs[localKeyObject.type as 'public' | 'private'] as unknown as [undefined])
      Object.assign(key, exportArgs[localKeyObject.type as 'public' | 'private'][0])
    }

    args[2] = key
  }
  worker.ref()
  worker.postMessage({ id, method, args })
})

export const crypto_worker_main = {
  sign: a.bind(undefined, 'sign'),
  verify: a.bind(undefined, 'verify'),
  'aes-256-ctr-hmac-sha-384-encrypt': a.bind(undefined, 'aes-256-ctr-hmac-sha-384-encrypt'),
  'aes-256-ctr-hmac-sha-384-decrypt': a.bind(undefined, 'aes-256-ctr-hmac-sha-384-decrypt'),
  'xchacha20-poly1305-encrypt': a.bind(undefined, 'xchacha20-poly1305-encrypt'),
  'xchacha20-poly1305-decrypt': a.bind(undefined, 'xchacha20-poly1305-decrypt')
}
