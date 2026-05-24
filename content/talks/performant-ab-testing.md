---
title: 'Performant Experimentation at Scale'
date: '2023-10-22'
category: 'react'
description: 'Developing data-driven experiments without introducing layout shift, using Next.js and Edge Middleware.'
presentedAt:
  - eventDate: '2023-10-22'
    eventName: 'Next.js Conf'
    eventType: 'conference'
    eventUrl: 'https://nextjs.org/conf'
    recordedPresentationUrl: 'https://www.youtube.com/watch?v=c_wYt7ur2yc'
    location: 'San Francisco, CA'
---

A/B testing is essential for data-driven product decisions, but traditional implementations often introduce layout shift and degrade user experience. This talk explores how to build performant experimentation infrastructure using Next.js Edge Middleware.

## The Problem with Traditional A/B Testing

Most A/B testing solutions work by:
1. Loading the page
2. Making a client-side request to determine the variant
3. Swapping content after the page has rendered

This causes visible layout shift and poor Core Web Vitals scores.

## Edge Middleware to the Rescue

With Next.js Edge Middleware, we can make variant decisions at the edge before the page even starts rendering:

1. Request hits the edge
2. Middleware determines variant based on cookie or random assignment
3. Response is personalized before reaching the client
4. Zero layout shift

## Key Techniques

- **Cookie-based persistence** - Users see consistent variants across sessions
- **Edge-side variant selection** - Decisions happen in milliseconds at the edge
- **Streaming-compatible** - Works with React Server Components and streaming

## Results at Vercel

We used this approach to run experiments across vercel.com, achieving:
- Zero layout shift from experiments
- Sub-millisecond variant assignment
- Statistically significant results faster due to better user experience
