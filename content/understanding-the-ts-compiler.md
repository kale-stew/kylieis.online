---
title: 'Understanding the TypeScript Compiler'
date: '2020-02-19'
category: 'typescript'
description: 'Taking a closer look at how the TypeScript compiler works so I can better implement a testing corner case in an open source library.'
---

I've been trying to thoroughly test a library with TypeScript support and far too many users to reasonably contact about their use cases. Because I don't have a better way to understand what to test, I decided to level up my understanding of the TypeScript compiler itself — that's where this library is predominantly used.

The library is a single function with very simple types:

```ts
declare function isEqual<A = any, B = any>(a: A, b: B): boolean
declare namespace isEqual {}
export = isEqual
```

As a function that compares two elements and returns a boolean, the use cases range far and wide. Developers want to compare deeply-nested objects and get a proper result, and I can relate. This package is a fork that adds React-specific handlers so it can dive into React components and extract the correct value for comparison.

## The testing goal

I had three things I needed:

- Target a specific directory to test TypeScript usage in real-time, without affecting the entire project
- Run successfully both locally and in CI, across three different Node environments
- Catch any regressions introduced to the source or types themselves

## `tsc`

My tests lived in `test/typescript/`. I reached them with a script in the root `package.json`:

```js
"test-ts-usage": "tsc --jsx react --target ES6 --noImplicitAny --esModuleInterop typescript/index.tsx",
```

When I ran this, `tsc` compiled *every* package the library depends on, including testing libraries that weren't even being invoked. It was treating the whole project as a single entity. I needed a way to tell the compiler: this one file is its own project.

## The fix

Project references solved it.

Using a combination of [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) and a [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html), I could treat the mini test suite as an independent project without pulling in peer dependencies from the root.

According to [the docs](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference), I only needed two things:

1. Add a `references` key to the root `tsconfig.json`:

   ```js
   {
     "compilerOptions": {
       "noImplicitAny": true
     },
     "references": [{ "path": "test/typescript" }]
   }
   ```

2. Add a separate `tsconfig.json` in the test directory with the [`composite` flag](https://www.typescriptlang.org/docs/handbook/project-references.html#composite) enabled:

   ```js
   {
     "compilerOptions": {
       "composite": true,
       "esModuleInterop": true,
       "jsx": "react",
       "target": "ES6"
     }
   }
   ```

The `composite` flag ensures TypeScript can quickly find the outputs of the referenced project. Now the React-specific flags live only in the test directory, and the root compiler ignores them for the main build.

## A note on `tsconfig.json`

[The docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) say that a `tsconfig.json` in a directory marks it as the root of a TypeScript project. It specifies root files and compiler options.

Importantly: *"When input files are specified on the command line, tsconfig.json files are ignored."*

This means I could designate a project, point to a valid JSON config within a directory, and compile it independently. I had the option to extend the root config or override it completely.

## What I chose

For this library, extending the existing config was the simpler option. The project was small enough that a single source-of-truth approach worked; I didn't need a wide variety of `tsconfig`s to test against.

Project references solved the problem cleanly. One less thing to worry about.
