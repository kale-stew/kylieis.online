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

I also added a few formulas that paid off:

```
// Days until due
if(prop("Due Date"), dateBetween(prop("Due Date"), now(), "days"), null)

// Overdue flag (for the "due today" view)
if(and(prop("Status") != "Done", prop("Due Date") < now()), "🔴", "✅")

// Week of (for grouping)
dateAdd(prop("Due Date"), 1 - day(prop("Due Date")), "days")
```

The Week of formula was clutch for the timeline. Notion doesn't natively group by week, so this let me create a rollup view organized by work weeks.

## The Critical Path

Working backwards from move-in day, the milestones were:

1. **House listed** - 4 months out
2. **House under contract** - 3 months out
3. **Inspection & appraisal** - 2.5 months out
4. **Closing date set** - 2 months out
5. **Movers booked** - 6 weeks out
6. **Packing starts** - 4 weeks out
7. **Close on old house** - 2 weeks out
8. **Movers load truck** - 1 week out
9. **Travel** - move day
10. **Movers deliver** - 3-5 days after
11. **Utilities on at new place** - day of arrival

Each milestone had 5-15 sub-tasks linked back to it via the Dependencies relation. When the closing date slipped by a week, I could see exactly which tasks shifted and by how much.

## Views That Actually Helped

**Timeline View** - Seeing all tasks on a Gantt chart made dependency conflicts obvious. When the inspection got pushed back, I could immediately see what else shifted.

**By Owner, Kanban** - My partner and I could each see our own swim lanes. No "I thought you were handling that" moments.

**This Week, Filtered** - Each Monday I'd review what was due in the next 7 days. If something was blocked, I'd deal with it before it became urgent.

**By Category, Sorted by Due Date** - A simple list grouped by Housing, Utilities, etc. This was the default view for adding new tasks. I didn't want to think about where something went - I just picked the category and let the view sort it.

**Blocked Items** - A filtered view showing only tasks with Status = Blocked. Reviewed daily until empty. Some blocks were external (waiting on the buyer's lender), but the ones I could unblock were obvious at a glance.

## Automations That Ran Themselves

Notion's built-in automations handled the nagging:

- When a task's Due Date was tomorrow and Status wasn't Done, I got a notification at 9 AM
- When Status changed to Done, the Date Completed formula fired and the task moved to a "Completed" view
- When a task was marked Blocked, it auto-tagged "review" so I'd see it in the daily blocked view

The notification automation was the most useful. I didn't need to check the database every day - Notion told me when something needed attention.

## Templates for Repeated Tasks

Some things needed to happen at both the old place and the new place:

- Cancel/setup utilities (gas, electric, internet, trash)
- Forward mail with USPS
- Transfer prescriptions to a new pharmacy
- Register with a new doctor, dentist, vet
- Update address with banks, subscriptions, payroll

I created templates for these and duplicated them with location-specific details. Less mental overhead, fewer things forgotten. The vet registration was almost missed - renters often forget they need one.

## The Budget Tracking

I added a Costs database related to the Move Tasks. Each task could have multiple cost entries:

- **Moving truck** - $3,800 for the cross-country haul (we got quotes ranging from $2,500 to $7,000)
- **Moving supplies** - $380 for boxes, tape, wrap
- **Travel** - $600 for flights and one night in a hotel
- **House sale fees** - tracked for tax purposes

A rollup on the Move Tasks database summed all related costs. A simple formula calculated the difference between estimated and actual. Spoiler: I underestimated packing supplies by about $150.

## Day-of Execution

The database didn't stop being useful once the move started. I had a "Move Week" view filtered to the final 7 days. Every morning I checked it:

- Day 1: Movers arrive. Check that the truck is confirmed
- Day 2: Final walkthrough of old house. Take photos.
- Day 3: Closing at the title company. Bring ID.
- Day 4: Fly to new city.
- Day 5: Movers deliver. Inspect for damage before they leave.
- Day 6-7: Unpack essentials. Set up bed, internet, kitchen.

The completion formula meant I could check off tasks as they happened and see what was left at a glance. When the flight got delayed, I adjusted the mover delivery window and the dependency graph showed me what else shifted.

## What I'd Do Differently

**Start earlier.** I set this up 6 weeks before the move. 3 months would have been better. Some tasks (like getting quotes from movers) have long lead times.

**Fewer categories.** I started with 8, consolidated to 5. Too granular means too much friction when creating tasks.

**Daily stand-up page.** I should have created a dashboard showing "overdue", "due today", and "blocked" counts. I did this mentally but a visual would have helped.

**Track everything by week, not day.** Daily tasks created anxiety. Weekly milestones with sub-tasks inside them would have been easier to manage. The week-level grouping was more useful than individual due dates.

## The Result

We moved 1,800 miles with no major disasters. Nothing critical was forgotten. The stress was still there - moving is moving - but it was *managed* stress. Every time I felt overwhelmed, I could open Notion and see exactly what needed attention.

Would recommend.
