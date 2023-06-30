datastore
===

Browser-level KV store, utilizing both IndexedDB and local storage.

This library will provide benefits of almost unlimited storage size of IndexedDB, with ease of use when interacting with interface like LocalStorage.

If browser does not have IndexedDB, this library will performs a fallback to LocalStorage by itself

Install
---

```
pnpm add @rayriffy/datastore
```

Usage
---

```ts
// initialize
const instance = createInstance('indexedDb-database-name')

// set
await instance.setItem('key1', {
  message: 'amogus'
})

// get (default to null)
const val = await instance.getItem('key1')

// delete
await instance.removeItem('key1')

// clear
await instance.clear()
```
