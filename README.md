datastore
===

Browser-level KV store, utilizing both IndexedDB and local storage.

This library will provide benefits of almost unlimited storage size of IndexedDB, with ease of use when interacting with interface like LocalStorage.

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
await instance.set('key1', {
  message: 'amogus'
})

// get (default to null)
const val = await instance.get('key1')

// delete
await instance.remove('key1')
```
