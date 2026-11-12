---
title: 'Performant experimentation at scale'
date: '2022-10-25'
category: 'next.js'
description: 'Developing data-driven experiments without introducing layout shift, using Next.js and Edge Middleware.'
presentedAt:
  - eventDate: '2022-10-25'
    eventName: 'Next.js Conf'
    eventType: 'conference'
    eventUrl: 'https://nextjs.org/conf'
    recordedPresentationUrl: 'https://www.youtube.com/watch?v=c_wYt7ur2yc'
    location: 'San Francisco, CA'
---

A preview of performant experimentation using Next.js and Edge Middleware, plus a look at why you might consider a data-driven experimentation strategy in the first place.

## The Idea

Most A/B testing tools decide which variant to show in the browser, after the page has already loaded. That swap is what causes layout shift. Moving the decision to the edge (in Middleware, before the page renders) means the user gets the right variant on the first paint, with nothing jumping around.

The full talk is in the recording linked above. For a deeper write-up of this approach in production, see Vercel's [How to build zero-CLS A/B tests with Next.js and Vercel Edge Config](https://vercel.com/blog/zero-cls-experiments-nextjs-edge-config).
