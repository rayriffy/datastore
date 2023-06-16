import { Store } from "./@types/Store";
import { IndexedDBStore } from "./functions/indexedDB";
import { LocalStorageStore } from "./functions/localStorage";

export const createInstance = (dbName = 'riffy-datastore'): Store => {
  if ('indexedDB' in window) {
    return new IndexedDBStore(dbName)
  } else if ('localStorage' in window) {
    return new LocalStorageStore()
  }

  throw new Error('no database layer supported')
}
