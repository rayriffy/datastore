# datastore

Browser-level KV store, utilizing both IndexedDB and local storage.

This library will provide benefits of almost unlimited storage size of IndexedDB, with ease of use when interacting with interface like LocalStorage.

If browser does not have IndexedDB, this library will performs a fallback to LocalStorage by itself

## Install

All `@rayriffy` scope will be published in GitHub packages anyway because I don't want to pay NPM for a private scope. Add following config to root project's `.npmrc`

```bash
cat "@rayriffy:registry=https://npm.pkg.github.com" > .npmrc
```

Then, it's safe to install

```bash
pnpm add @rayriffy/datastore
```

## Usage

```ts
// initialize (initialize once, use everywhere)
const instance = createInstance('indexedDb-database-name')

// set (lib will JSON.stringify() for you in localStorage)
await instance.setItem('key1', {
  message: 'amogus',
})

// get (default to null) (lib will JSON.parse() for you in localStorage)
const val = await instance.getItem('key1')

// delete
await instance.removeItem('key1')

// clear
await instance.clear()
```

## Publishing

This repository has been configured to automatically publish NPM packages by [Changesets](https://github.com/changesets/changesets). Run `pnpm changeset` command to publishing your changes before commit.
