---
title: 'Understanding the TypeScript Compiler'
date: '2020-05-19'
category: 'javascript'
---

I am trying to thoroughly test a library that has TypeScript support, but too many use cases to accurately track without contacting hundreds of thousands of consumers of said library to ensure we thoroughly understand it's many, many use cases.

The library consists of a single function, and the types themselves are very simple:

```ts
declare function isEqual<A = any, B = any>(a: A, b: B): boolean
declare namespace isEqual {}
export = isEqual
```

As a single function that compares two elements and returns a boolean, you can imagine the use cases are fairly wide-ranging. Folks want to compare deeply-nested objects and get a proper result, and I can relate! This package is a fork of a package that does the same comparison, but this package adds handlers specific to React (and now Preact/compat!), allowing it to dive deeply into React components and pull out the correct value for comparison.

## TypeScript Usage Testing Goal

We want to target a specific directory to test our TypeScript in real-time, but without affecting the entire project ecosystem.

We want this script to successfully run both locally and in CI, in 3 different Node environments.

We want this test to identify any regressions introduced to the src or types themselves.

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

Currently, when we run our `test-ts-usage` script, it is compiling _every_ package we depend on, including testing libraries that aren't being invoked by our test file itself. This is because of the compiler. I am suspicious that it's viewing the project as a single entity, hence the all-encompassing compiling, so let's dive into the compiler to see what options we'll need to flag to get it to treat this single `tsx` file as an independently nested project.

To see the test `tsx` file I am running this usage script against, check out this [gist of typescript tests](@TODO).

### How can we fix this?

We can use a combination of [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) and a [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html) to achieve our testing goal here.

Using the project reference, we can direct `tsc` to view our mini suite as a project of its own, without installing peer dependencies from the root repository. But what is required to substantiate an entire project? How much boilerplate needs to be initialized?

According to [this blurb](https://www.typescriptlang.org/docs/handbook/project-references.html#what-is-a-project-reference) in the docs defining a project reference, we only need to

1. Add a top-level key of `references` to our root `tsconfig.json`, a small array of objects of projects to refer to.

   ```js
   /* react-fast-compare/tsconfig.json */
   {
    "compilerOptions": {
      "noImplicitAny": true
    },
    "references": [{ "path": "test/typescript" }]
   }
   ```

2. Add a `tsconfig,json` to the test directory we've pointed to as a separate project. All referenced projects need to have the [`composite` flag](https://www.typescriptlang.org/docs/handbook/project-references.html#composite) enabled "to ensure TypeScript can quickly determine where to find the outputs of the referenced project" (@TODO - annotation?). Now we can isolate our react-specific flags to the

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

The file is used to specify

- root files and their names
- compiler options required to compile the project
  - `tsc` is invoked with no input files, the compiler looks for a `tsconfig`
  - `tsx` is invoked with no input files but a `--project` is passed, specifying the path of a directory containing a tsconfig _or_ valid json file with configurations (so it **can** be renamed in a sub-directory!)

> When input files are specified on the command line, tsconfig.json files are ignored.

So, this means, we can designate a project, point to a valid .json within that directory, and compile it independently. We now know we have the option to _extend_ a root `tsconfig`, or override it completely. I think it'll be more worthwhile to extend our existing config because the project is tiny enough that our source-of-truth approach should suffice; we don't need a wide variety of `tsconfig`s to test against or anything.
