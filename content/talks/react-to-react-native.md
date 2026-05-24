---
title: 'React to React Native: How Hard Could It Be?'
date: '2019-11-15'
category: 'react'
description: "If I already know React, how hard could it be to learn React Native? This talk answers that question and helps you decide if you need a native app at all."
presentedAt:
  - eventDate: '2019-11-15'
    eventName: 'RVA.js'
    eventType: 'conference'
    location: 'Richmond, VA'
  - eventDate: '2019-05-28'
    eventName: 'DenverScript'
    eventType: 'meetup'
    eventUrl: 'https://www.code-talent.com/event-calendar/2019/5/28/denver-script'
    location: 'Denver, CO'
---

"If I already know React, how hard could it be to learn React Native?" is a question I've heard a lot as a React consultant. This talk aims to answer it honestly.

## What Transfers

The good news - a lot transfers:
- Component model and JSX
- State management (useState, useReducer, Redux, etc.)
- Hooks and lifecycle concepts
- Most of your JavaScript/TypeScript knowledge

## What's Different

The challenging parts:
- **No DOM** - div, span, p become View, Text
- **Styling** - Flexbox by default, no CSS cascade
- **Navigation** - React Navigation vs React Router
- **Platform differences** - iOS and Android have different conventions
- **Native modules** - Sometimes you need to bridge to native code

## Do You Even Need Native?

Before diving into React Native, consider:
- **PWA** - Progressive Web Apps cover many use cases
- **Capacitor/Ionic** - Web views with native capabilities
- **Expo** - Managed React Native without native code

## The Verdict

React Native is learnable for React developers, but it's not "just React." Budget time for:
- Learning the component primitives
- Understanding the build/deploy pipeline
- Platform-specific debugging
- Performance optimization (it's different from web)

The talk includes demos of common gotchas and how to solve them.
