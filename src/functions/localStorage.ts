import { compress, decompress } from 'lz-string'

import { AsyncStore } from '../@types/AsyncStore'

export class LocalStorageStore implements AsyncStore {
  constructor() {}

  public async getItem<T = unknown>(key: string): Promise<T | null> {
    let item = window.localStorage.getItem(key)
    return item === null ? null : JSON.parse(decompress(item))
  }

  public async setItem<T = unknown>(key: string, value: T) {
    window.localStorage.setItem(key, compress(JSON.stringify(value)))
  }

  public async removeItem(key: string) {
    window.localStorage.removeItem(key)
  }

  public async key(index: number) {
    return window.localStorage.key(index)
  }

  public async clear() {
    window.localStorage.clear()
  }
}
