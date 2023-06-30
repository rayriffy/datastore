import { openDB, IDBPDatabase } from 'idb'
import { AsyncStore } from '../@types/AsyncStore'

export class IndexedDBStore implements AsyncStore {
  databasePromise: Promise<IDBPDatabase>

  constructor(database: string) {
    this.databasePromise = openDB(database, 1, {
      upgrade(database) {
        // create table and index if not exists
        if (!database.objectStoreNames.contains('kv')) {
          const objectStore = database.createObjectStore('kv', {
            keyPath: 'id',
          })

          objectStore.createIndex('keyIndexes', 'id', { unique: true })
        }
      },
    })
  }

  async getItem<T = unknown>(key: string): Promise<T | null> {
    const database = await this.databasePromise
    const tx = database.transaction('kv', 'readonly')
    const val = await tx.objectStore('kv').get(key)
    await tx.done

    return val?.value ?? null
  }

  async setItem<T = unknown>(key: string, value: T) {
    const database = await this.databasePromise
    const tx = database.transaction('kv', 'readwrite')

    await Promise.all([tx.objectStore('kv').put({ id: key, value }), tx.done])
  }

  async removeItem(key: string) {
    const database = await this.databasePromise
    const tx = database.transaction('kv', 'readwrite')

    await Promise.all([tx.objectStore('kv').delete(key), tx.done])
  }

  public async key(index: number) {
    const database = await this.databasePromise
    const tx = database.transaction('kv', 'readonly')
    const keys = await tx.objectStore('kv').getAllKeys()
    await tx.done

    return keys[index]?.toString() ?? null
  }

  public async clear(): Promise<void> {
    let database = await this.databasePromise
    let tx = database.transaction('kv', 'readwrite')

    await Promise.all([tx.objectStore('kv').clear(), tx.done])
  }
}
