---
title: 'Evolution of an API: A Case for GraphQL'
date: '2019-09-20'
category: 'graphql'
description: 'Looking at the history of best practices for API development and the timeline that got us to where we are today.'
presentedAt:
  - eventDate: '2019-09-20'
    eventName: 'UtahJS'
    eventType: 'conference'
    eventUrl: 'https://conf.utahjs.com/'
    location: 'Salt Lake City, UT'
---

APIs have evolved significantly over the decades. This talk traces that evolution and makes the case for why GraphQL represents the next step forward.

## A Brief History

### RPC (1980s-1990s)
Remote Procedure Calls - tightly coupled, language-specific protocols.

### SOAP (Late 1990s-2000s)
XML-based, verbose, but introduced standards for web services.

### REST (2000s-Present)
Resource-oriented, HTTP-native, simpler than SOAP but with its own challenges:
- Over-fetching and under-fetching
- Multiple round trips for related data
- Versioning headaches

### GraphQL (2015-Present)
- Client specifies exactly what data it needs
- Single endpoint, single request
- Strongly typed schema
- Introspection built-in

## Why GraphQL Now?

The shift to mobile and the proliferation of client types made REST's limitations more apparent:
- Mobile apps need minimal data transfer
- Different clients need different data shapes
- Real-time requirements are increasing

## Getting Started

The talk concludes with practical advice for adopting GraphQL incrementally alongside existing REST APIs.
