import { openDB, IDBPDatabase } from 'idb'
import { Store } from '../@types/Store'

export class IndexedDBStore implements Store {
  databasePromise: Promise<IDBPDatabase>

  constructor(database: string) {
    this.databasePromise = openDB(database, 1, {
      upgrade(database) {
        // create table and index if not exists
        if (!database.objectStoreNames.contains('kv')) {
          const objectStore = database.createObjectStore('kv', {keyPath: 'id'})

          objectStore.createIndex('keyIndexes', 'id', { unique: true })
        }
      },
    })
  }

  // init() {}

  async get<T = unknown>(key: string): Promise<T> {
    let database = await this.databasePromise
    let tx = database.transaction('kv', 'readonly')
    let val = await tx.objectStore('kv').get(key)
    await tx.done
    return val?.value ?? null
  }

  async set<T = unknown>(key: string, value: T) {
    let database = await this.databasePromise
    
    let tx = database.transaction('kv', 'readwrite')
    await Promise.all([
      tx.objectStore('kv').put({ id: key, value }),
      tx.done
    ])
  }

  async remove(key: string): Promise<void> {
    let database = await this.databasePromise
    
    let tx = database.transaction('kv', 'readwrite')
    await Promise.all([
      tx.objectStore('kv').delete(key),
      tx.done
    ])
  }
}
