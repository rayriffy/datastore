import { Store } from '../@types/Store'

export class LocalStorageStore implements Store {
  constructor() {}

  async get<T = unknown>(key: string): Promise<T> {
    let item = window.localStorage.getItem(key)
    return item === null ? null : JSON.parse(item)
  }

  async set<T = unknown>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  async remove(key: string): Promise<void> {
    window.localStorage.removeItem(key)
  }
}
