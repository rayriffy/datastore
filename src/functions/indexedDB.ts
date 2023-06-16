import idb, { IDBPDatabase } from 'idb'
import { Store } from '../@types/Store'

export class IndexedDBStore implements Store {
  databasePromise: Promise<IDBPDatabase>

  constructor(database: string) {
    this.databasePromise = idb.openDB(database, 1, {
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
    let store = tx.objectStore('kv')

    let val = await store.get(key)

    await tx.done

    return val
  }

  async set<T = unknown>(key: string, value: T) {
    let database = await this.databasePromise
    
    let tx = database.transaction('kv', 'readwrite')
    let store = tx.objectStore('kv')

    await Promise.all([
      store.put({ id: key, value }),
      tx.done
    ])
  }

  async remove(key: string): Promise<void> {
    let database = await this.databasePromise
    
    let tx = database.transaction('kv', 'readwrite')
    let store = tx.objectStore('kv')

    await Promise.all([
      store.delete(key),
      tx.done
    ])
  }
}
