---
title: "We don't need more chatbots"
date: '2026-11-12'
category: 'ai,agents'
description: 'Basic Q&A is solved. Useful agents help users act on the things they already have, and tools are how you get there.'
---

There are a lot of useless agents out there, both digital and physical. Everyone has a chatbot, but I personally only use the ones I'm forced to. I generally really do like my dentist's AI-powered receptionist... but maybe only because the human team is so quick to reply once my AI-summarized & AI-routed request hits their inbox?

For the past ~year, I've had the privilege of leading a team that turned a functional, generally helpful Q&A bot into a platform-capable harness. I get to experiment with measured prompt engineering, dig into eval systems, introduce new layers of monitoring and automated guardrails that keep our LLMs in line, and lots of other fun, new-to-me things.

In all of this R&D, I also get to test out a lot of other agents. Many of them appear to solve the same problem: information discovery for (thing). *Buying a new car? Chat with our agent about features available in the 2026 release lineup! Looking up a founder's net worth? Here's information about their most recent raise and where that founder was born!*

We don't need more of these.

## Defining "useful"

Basic questions are solved; Gemini has that under control (and its creator has for decades). If a user can Google something, why would they need to ask your chatbot about it? Imo, LLMs graduated from basic Q&A in 2024.

Users want to take action. Users want to do things that affect themselves directly. I have a theory that global ChatGPT spend spikes every time a new image remix trend goes viral on X (shoutout Studio Ghibli).

In practice, I've found that supporting prompts like these keeps more users on your platform and engaging with your agent:

- how could i incorporate x product into y thing i already have
- did this company release anything cool and new recently? any of those ships relevant to the thing/s that i already have?
- help me evaluate a path to adopting z new product into y thing i own

These prompts are personal, catered to something that already exists that the user cares about, and they even open the door for additional resource connection (i.e. "connect to your central knowledge management provider so i can post that summary").

More general prompts, i.e.:

- how does x product work
- where are the docs for x product
- who owns your company

are fine for newcomers, but not for seasoned veterans of your platform.

## Making it useful

You can cater to both veterans and first-timers if you focus on making a useful agent for your most common type of user: someone that knows the platform and uses it regularly. The general, first-touch user's needs are typically umbrella'd under those requirements.

This is where product-led growth fundamentals also shine. If you use your own product, you can probably tell me the top 5 things someone does on your platform. Your user data tells you the rest: the weird corner cases, where someone has repurposed your platform for something it wasn't originally designed to solve.

In this information lies another helpful indicator: what type of tools would a user benefit from enabling in your agent? These can be MCPs, external or internal to your product, a set of endpoints you've custom built for agentic use, or something else entirely like bash access or a remote computer. Not every agent is going to need an embedded browser, but yours might.

Build the thing that you yourself would want to use.

Tools are what empower your agent to actually be more useful. Give the PetSmart chatbot access to a read-only view of your personal calendar (through a safe proxy) and it can tell you which nearby store aligns with your schedule for same-day pickup.

Obviously there are limitations to the connections we should be sustaining, but that's on us (developers of these protocols and implementations) to figure out. MCPs should be read-only by default, provide a nice audit trail, and be contained to the service/s they provide. Honestly, my opinions on MCP safety would (will?) fill up a separate post.

## My pitch

- Stop building Q&A bots
- Watch what your users are trying to do, and learn from it
- Give your agent the tools to help them do it (your own MCP if you have one, someone else's if you don't)

A useful agent doesn't just know things about your product. It knows what your user already has, and it helps them do something with it. If your agent can only answer questions, it's competing with Google. Give it something to do.

(And if handing an agent those tools makes you a little nervous: same. More on that soon.)
