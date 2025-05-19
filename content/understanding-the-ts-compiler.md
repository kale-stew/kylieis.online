---
title: 'Understanding the TypeScript Compiler'
date: '2020-02-19'
category: 'typescript'
description: 'Taking a closer look at how the TypeScript compiler works so I can better implement a testing corner case in an open source library.'
---

I am trying to thoroughly test a library that has TypeScript support and far too many users to reasonably contact in order to understand it's many, many use cases. Because I don't have a better way to understand the applied use cases most worth testing, I will need to first level up my understanding of the TypeScript compiler as that is where this library is predominently used.

The library consists of a single function, and the types themselves are very simple:

```ts
declare function isEqual<A = any, B = any>(a: A, b: B): boolean
declare namespace isEqual {}
export = isEqual
```

As a single function that compares two elements and returns a boolean, you can imagine the use cases range very far and wide. Developers want to compare deeply-nested objects and get a proper result, and I can relate! This package is a fork of a package that does the same comparison, but also adds handlers specific to React (and now Preact/compat) that give it the ability it to dive deeply into React components and extract the correct value for comparison.

## TypeScript Usage Testing Goal

We have three primary goals in incorporating these tests:

- We need to target a specific directory to test our TypeScript in real-time _without_ affecting the entire project ecosystem.
- We need this script to successfully run both locally and in CI, across 3 different Node environments.
- We need this test to identify any regressions introduced to the src or types themselves.

## `tsc`

So, we have a set of tests living inside of a `test/typescript` dir. We are reaching these tests with a script that is run from the root's `package.json`:

```js
// The script we are focused on testing right now
"test-ts-usage": "tsc --jsx react --target ES6 --noImplicitAny --esModuleInterop typescript/index.tsx",

// This script existed before this test addition
// It runs the existing index and makes sure there are no immediate errs
"test-ts-defs": "tsc --target ES5 --noImplicitAny index.d.ts",
```

### What is it doing right now?

When we run our `test-ts-usage` script right now, it is compiling _every_ package this library depends on, including testing libraries that aren't being invoked by our test file itself. This is because of the compiler. I am suspicious that it's viewing the project as a single entity, hence the all-encompassing compiling, so we will need to dive into the compiler to see what flag options we have that will get the compiler to treat this single `tsx` file as an independently nested project.

### How can we fix this?

We can use a combination of [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) and a [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html) to achieve our testing goal here.

Using the project reference, we can direct `tsc` to view our mini suite as a project of its own _without_ installing peer dependencies from the root repository. But what is required to substantiate an entire project? How much boilerplate needs to be initialized?

According to [this blurb](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference) in the docs defining a project reference, we only need to:

1. Add a top-level key of `references` to our root `tsconfig.json`, a small array of objects of projects to refer to:

   ```js
   /* react-fast-compare/tsconfig.json */
   {
    "compilerOptions": {
      "noImplicitAny": true
    },
    "references": [{ "path": "test/typescript" }]
   }
   ```

2. Add a `tsconfig,json` to the test directory we've pointed to as a separate project. All referenced projects need to have the [`composite` flag](https://www.typescriptlang.org/docs/handbook/project-references.html#composite) enabled "to ensure TypeScript can quickly determine where to find the outputs of the referenced project". Now we can isolate our react-specific flags to the following:

   ```js
   /* react-fast-compare/test/typescript/tsconfig.json */
   {
    "compilerOptions": {
      "composite": true,
      "esModuleInterop": true,
      "jsx": "react",
      "target": "ES6"
    }
   }
   ```

### More about `tsconfig`s

Looking at [the docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), we know that the presence of a `tsconfig.json` in a directory indicates that the directory is the _root_ of a TypeScript project.

The file is used to specify:

- root files and their names
- compiler options required to compile the project
  - `tsc` is invoked with no input files, the compiler looks for a `tsconfig`
  - `tsx` is invoked with no input files but a `--project` is passed, specifying the path of a directory containing a tsconfig _or_ valid json file with configurations (so it **can** be renamed in a sub-directory!)

The docs also state: _"When input files are specified on the command line, tsconfig.json files are ignored."_

This means we can designate a project, point to a valid .json within that directory, and compile it independently. We now know we have the option to _extend_ a root `tsconfig`, or override it completely.

## Conclusion

For our use case in testing this open source library, I think it'll be more worthwhile to extend our existing config. Because the project is small enough, our source-of-truth approach should suffice; we don't need a wide variety of `tsconfig`s to test against.
