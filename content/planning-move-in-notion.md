---
title: 'Planning a Multi-State Move in Notion'
date: '2024-03-15'
category: 'notion'
description: 'How I used Notion databases, timelines, and automations to coordinate a cross-country move without losing my mind.'
---

Moving is stressful. Moving across multiple states, coordinating two people's schedules, selling a house, and managing a dozen deadlines simultaneously? That's a project management problem. And I already had the perfect tool for it.

## The Master Database

I started with a single database called **Move Tasks** with these properties:

- **Task** - what needs to be done
- **Category** - Housing, Utilities, Logistics, Packing, Admin
- **Owner** - who's responsible
- **Due Date** - hard deadline
- **Status** - Not Started, In Progress, Blocked, Done
- **Dependencies** - relation to other tasks that must complete first
- **Notes** - context, phone numbers, confirmation codes

The key insight: almost everything in a move has dependencies. You can't schedule movers until you have a move-out date. You can't get a move-out date until your house sells. You can't sell your house until it's listed. Working backwards from "keys in hand at new place" revealed the critical path.

## Views That Actually Helped

**Timeline View** - Seeing all tasks on a Gantt chart made dependency conflicts obvious. When the inspection got pushed back, I could immediately see what else shifted.

**By Owner, Kanban** - My partner and I could each see our own swim lanes. No "I thought you were handling that" moments.

**This Week, Filtered** - Each Monday I'd review what was due in the next 7 days. If something was blocked, I'd deal with it before it became urgent.

**Blocked Items** - A filtered view showing only tasks with Status = Blocked. Reviewed daily until empty.

## Templates for Repeated Tasks

Some things needed to happen at both the old place and the new place:

- Cancel/setup utilities
- Update address with banks, subscriptions, etc.
- Forward mail

I created templates for these and duplicated them with location-specific details. Less mental overhead, fewer things forgotten.

## What I Tracked That Saved Me

**Confirmation numbers and contact info** in the Notes field. When the moving company called to confirm, I had the reference number in three seconds.

**Cost estimates** as a number property. Summing the column showed total expected spend. (Spoiler: moves are expensive.)

**Date completed** auto-filled with a formula when Status changed to Done. Useful for proving to the IRS when certain things happened.

## What I'd Do Differently

**Start earlier.** I set this up 6 weeks before the move. 3 months would have been better. Some tasks (like getting quotes from movers) have long lead times.

**Fewer categories.** I started with 8, consolidated to 5. Too granular means too much friction when creating tasks.

**Daily stand-up page.** I should have created a dashboard showing "overdue", "due today", and "blocked" counts. I did this mentally but a visual would have helped.

## The Result

We moved 1,800 miles with no major disasters. Nothing critical was forgotten. The stress was still there - moving is moving - but it was *managed* stress. Every time I felt overwhelmed, I could open Notion and see exactly what needed attention.

Would recommend.
