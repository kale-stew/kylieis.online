---
title: 'Demystifying urql Using the Dev Tools'
date: '2020-07-16'
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

urql is a highly customizable and versatile GraphQL client. This talk explores how to use the urql dev tools to better understand what's happening under the hood.

## Why urql?

urql offers a balance between simplicity and power:
- Smaller bundle size than Apollo Client
- Highly extensible exchange system
- First-class React hooks support
- Normalized caching (optional)

## The Dev Tools

The urql dev tools browser extension gives you visibility into:
- **Operations** - See every query, mutation, and subscription
- **Cache** - Inspect the normalized cache state
- **Exchanges** - Understand how data flows through the exchange pipeline
- **Timeline** - Debug the sequence of events

## Key Insights

Using the dev tools, you can:
1. Debug why a query isn't updating
2. Understand cache invalidation
3. Optimize your exchange pipeline
4. Identify unnecessary network requests

## Demo

The talk includes a live demo walking through common debugging scenarios using the dev tools.
