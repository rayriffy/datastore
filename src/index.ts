import { IndexedDBStore } from './functions/indexedDB'
import { LocalStorageStore } from './functions/localStorage'

import type { AsyncStore } from './@types/AsyncStore'

export const createInstance = (dbName = 'riffy-datastore'): AsyncStore => {
  if ('indexedDB' in window) {
    return new IndexedDBStore(dbName)
  } else if ('localStorage' in window) {
    return new LocalStorageStore()
  }

  throw new Error('no database layer supported')
}
