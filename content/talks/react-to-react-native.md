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

As a React consultant, I've been asked "how hard would it be to take our React app and build it in React Native?" more than a few times. The short answer is "harder than you might think," and this talk walks through the four big issues that come up when you take your React source and try to rewrite it in React Native.

## Challenge One: Syntax

The first obstacle is the very different API React Native uses to tap into native functionality across the huge range of phones out there. When you think of mobile development, you might think Android vs. iOS, which is certainly one of the biggest divides. But then consider all the flavors of Android, or the lifetime of iPhones still in people's pockets, with different screen sizes and physical capabilities. The volume button on an iPhone XR might be reachable with one command, but not on an iPhone 6s. React Native bridges these native bindings for you, but your existing React app hasn't had to think about these corner cases. Adding that coverage often takes more time than starting fresh would.

## Challenge Two: Styling

There's no DOM to handle your stylesheet. You're working with inline styles, and the wide variety of CSS-in-JS libraries can be daunting for a team with little experience (or preference) here. Each solution is differently opinionated, and rolling one out across a large team can be a headache.

## Challenge Three: Navigation

Without an in-browser router to lean on, navigation brings you right back to cross-platform functionality. Tab and drawer navigation are the two patterns thoroughly supported across devices, which can force a team into decisions they wouldn't otherwise care to make.

## Challenge Four: Environment

Handling secrets can be finicky, especially depending on where you deploy. People have been known to unpack a deployed app build to discover planned features or secrets hidden in plain sight. Not to mention app store compliance, which is notoriously tricky to both achieve and maintain.

## In Conclusion

With those four challenges in mind, I've found that clients usually don't need a native app at all. PWA techniques, or wrapping an existing web app in a native shell (Capacitor, for example), can be a better option for teams that don't rely on native phone features like biometrics or encryption. A bank should build a native app; an online shop doesn't necessarily need to.

## Looking Ahead

React Native is open source, so you can follow its public roadmap to see whether a bug you care about has been prioritized, or what features are coming. If you want to get started, I'd recommend [the docs](https://reactnative.dev/docs/getting-started): they're comprehensive and highlight the differences between the two frameworks well.

## Slides

- [Live slides](https://kale-stew.github.io/react-native-slides/)
- [Exported PDF](https://github.com/kale-stew/all-talks/blob/main/content/2019/react-to-react-native/final.pdf)
