---
title: "How Node's require() Works"
date: '2021-11-20'
category: 'node'
description: 'A look under the hood at Node.js module resolution and why understanding it matters for debugging import issues.'
---

I've been debugging module resolution issues at work and finally sat down to understand how `require()` actually works. Turns out it's more interesting than I expected.

## The Resolution Algorithm

When you call `require('foo')`, Node runs through this sequence:

1. **Is it a core module?** (like `fs`, `path`, `http`) - return it immediately
2. **Does it start with `/`, `./`, or `../`?** - treat it as a file path
3. **Otherwise** - search `node_modules` directories

## File Resolution

For relative paths, Node tries these extensions in order:

```
./foo       → ./foo.js → ./foo.json → ./foo.node
./foo/      → ./foo/index.js → ./foo/index.json → ./foo/index.node
```

If `foo` is a directory with a `package.json`, Node reads the `main` field to find the entry point.

## The node_modules Search

For bare specifiers like `require('lodash')`, Node walks up the directory tree:

```
/home/user/project/src/utils/node_modules/lodash
/home/user/project/src/node_modules/lodash
/home/user/project/node_modules/lodash
/home/user/node_modules/lodash
/home/node_modules/lodash
/node_modules/lodash
```

It stops at the first match. This is why you can have different versions of the same package at different levels of your project.

## The Module Cache

Every module is cached after first load:

```js
require('./foo') // loads and executes foo.js
require('./foo') // returns cached exports, doesn't re-execute
```

You can inspect the cache at `require.cache` and even delete entries to force a reload. Useful for hot reloading in dev.

## Circular Dependencies

Node handles circular requires by returning a *partial* export object:

```js
// a.js
exports.loaded = false
const b = require('./b')
exports.loaded = true

// b.js
const a = require('./a')
console.log(a.loaded) // false - a.js hasn't finished executing yet
```

This is a common source of bugs. If you're getting `undefined` from a require, check for cycles.

## ESM vs CommonJS

With ES modules (`import`/`export`), the algorithm is similar but stricter:

- File extensions are required (`.js`, `.mjs`)
- No automatic `index.js` resolution
- `package.json` uses `exports` field instead of `main`
- Top-level await is allowed
- No `__dirname` or `__filename` (use `import.meta.url` instead)

Understanding CommonJS resolution helps debug why ESM interop sometimes breaks in unexpected ways. The two systems have subtly different assumptions about how modules are located and loaded.
