---
title: 'Planning a Multi-State Move in Notion'
date: '2024-03-15'
category: 'notion'
description: 'How I used Notion databases, timelines, and automations to coordinate a cross-country move without losing my mind.'
---

Moving is stressful. Moving across multiple states, coordinating two people's schedules, selling a house, and managing a dozen deadlines simultaneously? That's a project management problem. And I already had the perfect tool for it.

## The catch-all database

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

The 'Week of' formula was clutch for the timeline. Notion doesn't natively group by week, so this let me create a rollup view organized by incremental work weeks.

## The critical path

Working backwards from move-in day, the milestones were:

1. **House listed** - 4 months out
2. **House under contract** - 3 months out
3. **Inspection & appraisal** - 2.5 months out
4. **Closing date set** - 2 months out
5. **Movers booked** - 6 weeks out
6. **Packing starts** - 4 weeks out
7. **Close on old house** - 2 weeks out
8. **Movers load truck** - 1 week out
9.  **Travel** - move day + 2 to get to California
10. **Utilities on at new place** - day of arrival
11. **Movers deliver** - 4-7 days after

Each milestone had 5-15 sub-tasks linked back to it via the Dependencies relation. When the closing date slipped by a week, I could see exactly which tasks shifted and by how much.

## Views that actually helped

**Timeline view** - Seeing all tasks on a Gantt chart made dependency conflicts obvious. When the inspection got pushed back, I could immediately see what else shifted.

**By owner, kanban** - My partner and I could each see our own swim lanes. No "I thought _you_ were handling that" moments.

**This week, filtered** - Each Monday I'd review what was due in the next 7 days. If something was marked _Blocked_, I'd deal with it before it became urgent.

**By category, sorted by due date** - A simple list grouped by Housing, Utilities, etc. This was the default view for adding new tasks. I didn't want to think about where something went, I just picked a category and let the view sort it.

**Blocked items** - A filtered view showing only tasks with Status = _Blocked_. Reviewed daily until empty. Some blocks were external (waiting on the buyer's lender), but the ones I could unblock were obvious at a glance.

## Automations that ran themselves

Notion's built-in automations handled the nagging:

- When a task's Due Date was tomorrow and Status wasn't Done, I got a notification at 9 AM
- When Status changed to _Done_, the Date Completed formula fired and the task moved to a _Completed_ view
- When a task was marked _Blocked_, it auto-tagged "review" so I'd see it in the 'Daily blocked' view

The notification automation was the most useful. I didn't need to check the database every day - Notion told me when something needed attention.

## Templates for repeated tasks

Some things needed to happen at both the old place and the new place:

- Cancel/setup utilities (gas, electric, internet, trash)
- Forward mail with USPS
- Transfer prescriptions to a new pharmacy
- Register with a new doctor, dentist, vet
- Update address with banks, subscriptions, payroll

I created templates for these and duplicated them with location-specific details. This made for less mental overhead and therefore fewer things forgotten... the vet registration was almost missed. 😅

## Budget tracking

I added a Costs database related to the Move Tasks. Each task could have multiple cost entries:

- **Moving truck** - $3,800 for the cross-country haul (we got quotes ranging from $2,500 to $7,000)
- **Moving supplies** - $380 for boxes, tape, wrap
- **Travel** - $750 for 2 nights in a hotel

A rollup on the Move Tasks database summed all related costs. A simple formula calculated the difference between estimated and actual. Spoiler: I underestimated packing supplies by ~$150.

## Day-of execution

The database didn't stop being useful once the move started. I had a "Move Week" view filtered to the final 7 days. Every morning I checked it:

- Day 1: Movers arrive. Check that the truck is confirmed
- Day 2: Final walkthrough of old house. Take photos.
- Day 3: Closing at the title company. Bring ID.
- Day 4-6: Drive to new city.
- Day 6: Movers deliver. Inspect for damage before they leave.
- Day 6-8: Unpack essentials. Set up bed, internet, kitchen.

The completion formula meant I could check off tasks as they happened and see what was left at a glance. When the pickup window changed, I adjusted the delivery window and the dependency graph showed me what else shifted.

## What I'd do differently

**Start earlier.** I set this up 6 weeks before the move. 3 months prior would have been better. Some tasks (like getting quotes from movers) have longer lead times than I was planning around.

**Fewer categories.** I started with 8, consolidated to 5. Too broad means additional friction when creating tasks, and too granular makes it even harder to see trends at-a-glance.

**Daily stand-up page.** I should have created a dashboard showing "overdue", "due today", and "blocked" counts. I did this mentally but a visual would have helped share the responsibility with my partner.

**Track everything by week, not day.** Daily tasks created anxiety. Weekly milestones with sub-tasks inside them are easier to manage. The week-level grouping was more useful than individual due dates.

## The result

We moved 1,800 miles with no major disasters and nothing critical was forgotten. The stress was still there - moving _is_ still moving - but it was *managed* stress. Every time I felt overwhelmed, I could open Notion and see exactly what needed attention. I absolutely recommend tracking your move in Notion.
