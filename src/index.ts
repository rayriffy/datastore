import { Store } from "./@types/Store";
import { IndexedDBStore } from "./functions/indexedDB";

export const createInstance = (dbName = 'riffy-datastore'): Store => {
  if ('indexedDB' in window) {
    return new IndexedDBStore(dbName)
  }

  throw new Error('no database layer supported')
}
