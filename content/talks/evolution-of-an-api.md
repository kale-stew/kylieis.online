---
title: 'Evolution of an API: A Case for GraphQL'
date: '2019-09-20'
category: 'graphql'
description: 'Following API development from the early 2000s to today, and making a case for GraphQL along the way.'
presentedAt:
  - eventDate: '2019-09-20'
    eventName: 'UtahJS'
    eventType: 'conference'
    eventUrl: 'https://conf.utahjs.com/'
    location: 'Salt Lake City, UT'
---

In this talk, I follow API development over the years, along with the fundamentals of GraphQL, all while making a case for using it.

## The History

APIs pre-date the web, and even personal computing. But the story I wanted to tell starts in 2000, when eBay launched its developer program, and moves through del.icio.us's dead-simple tag URLs (2003), the founding of ProgrammableWeb (2005), and the SOAP vs. REST years. Along the way, the APIs that succeeded (Amazon S3, Google Maps, Foursquare, Twilio) had two things in common: they scaled, and they delivered meaningful services.

### RPC (1980s-1990s)
Remote Procedure Calls - tightly coupled, language-specific protocols.

### SOAP (Late 1990s-2000s)
XML-based, verbose, but introduced standards for web services.

### REST (2000s-Present)
Resource-oriented, HTTP-native, simpler than SOAP but with its own challenges:
- Over-fetching and under-fetching
- Multiple round trips for related data
- Versioning headaches

## Now: GraphQL

The pros that matter most:

- The client specifies exactly what it needs
- It's easier to aggregate data from multiple sources
- Types define your data

From there, the talk introduces resolvers and walks through getting started with a [sample GraphQL server](https://github.com/kale-stew/sample-server).

For a clear guide to what's actually happening under the hood of a query, GraphQL's [documentation on execution](https://graphql.org/learn/execution/) is a great, thorough walkthrough.

## Slides

- [Exported PDF](https://github.com/kale-stew/all-talks/blob/main/content/2019/evolution-of-an-api/final.pdf)
