---
title: 'Demystifying urql Using the Dev Tools'
date: '2020-05-26'
category: 'graphql'
description: 'Taking a closer look at the urql browser dev tools and using them to better understand urql as a GraphQL client.'
presentedAt:
  - eventDate: '2020-05-26'
    eventName: 'GraphQL Denver'
    eventType: 'meetup'
    eventUrl: 'https://www.meetup.com/GraphQLDenver/events/267717269/'
    location: 'virtual'
  - eventDate: '2020-07-16'
    eventName: 'RESTLess London'
    eventType: 'meetup'
    location: 'virtual'
---

In this talk, I give a high-level overview of urql's features before diving into how to explore those features using the urql DevTools browser extension. (Full disclosure: urql is built by Formidable, where I worked at the time.)

## What Is urql?

urql (Universal React Query Language) is a lightweight GraphQL client for the frontend. Why I like it:

- It's extremely customizable
- It has a simple default cache
- It's small (around 6.5kb min+gzip at the time)
- Exchanges!

## The DevTools

The [urql DevTools](https://github.com/urql-graphql/urql-devtools) extension gives you:

- 🔎 Cache exploration
- 🚀 A way to trigger requests directly from the client
- 🌐 A place to test your queries in the browser

Setup is two steps. Install the package:

```sh
yarn add @urql/devtools
```

Then add the exchange to your urql client:

```js
import { createClient, defaultExchanges } from 'urql'
import { devtoolsExchange } from '@urql/devtools'

const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [devtoolsExchange, ...defaultExchanges],
})
```

## Further Reading

- [How to GraphQL: React + urql](https://www.howtographql.com/react-urql/1-getting-started/), a step-by-step tutorial by two of urql's lead developers
- The [urql docs](https://formidable.com/open-source/urql/docs), with an FAQ, API reference, and overview of the basic concepts
- [Exploring urql from an Apollo perspective](https://blog.logrocket.com/exploring-urql-from-an-apollo-perspective/) by Peter Nycander
