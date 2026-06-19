---
title: 'Building an Internal Resource Library in Notion'
date: '2022-03-06'
category: 'notion'
description: 'Using Notion to codify internal systems as a living knowledge base at scale.'
---

A team I worked with had their docs scattered across Google Drive, Evernote, Dropbox, and even some PDFs saved to personal Slack spaces. New hires had no idea where anything lived, and when someone updated a document in their own drive, nobody else knew about it. It was a mess.

I was asked to consolidate everything into a single Notion workspace. Here's what I learned.

## Before

The company's documents were everywhere. Some teams preferred Google Drive, others used Evernote, and a few people had been dumping exported PDFs into Slack DMs for years. When a new hire started, someone had to manually grant access to five different services and then guess which version of a PDF was current.

Many of the PDFs were living documents, revised monthly. Comparing versions to find the latest one was a regular task. Moving to Notion meant every change would be tracked with a timestamp and a name. No more version guessing.

## After

We built a central wiki: one place for every piece of company knowledge, accessible to anyone with a company email. It had a few key sections.

### Company culture

This covered the full range: custom Slack emojis, nicknames, a glossary of inside jokes, and the employee handbook. Sometimes I was documenting a silly definition next to serious legal language. Notion's flexible structure handled both without issue.

The employee handbook was previously a PDF reassessed once a month. In Notion, edits are historically catalogued alongside an employee's name, so it just made sense to move it there. We grouped related topics together: the At-Home Office Stipend lived with other remote work info, and the Continuous Education budget sat next to conference speaking guidelines.

The culture section ended up with five main parts: **Never Stop Learning**, **Remote Work Policies**, **Slack Etiquette**, **How to be [Company A]**, and **Culture FAQs**.

"Never Stop Learning" was particularly important for this team. Everything from identifying worthwhile conferences to sharing internal codes for free online courses went there. We built a living database of events the company was sponsoring or attending, filterable by location and hemisphere. For an international team, that was a lot of data to keep consistent.

#### Locking things down

Most culture documents needed to stay editable by everyone, not just executives. But Notion can be confusing for new users — it's easy to accidentally drag a block while scrolling. We ended up unlocking the databases so people could edit tables, but keeping the surrounding pages locked so the structure stayed intact.

### Developer strategies

This company was almost entirely developers, so documenting how they worked was critical. The section had three main parts: **Code Conventions**, **OSS Library Review**, and **Open Sourcing your Project**.

The OSS review database was the most interesting. It gave developers a place to honestly review libraries they'd worked with — what they liked, what annoyed them, whether the release cycle was a pain. We opened it to contributions early, and it evolved into a technology recommendation list: what to use, what to avoid. The company eventually used it to track which technologies were trending up or down. For a team always looking for the latest tech, this became surprisingly valuable.

Other pages were more standard. The open-source guide walked developers through starting a large-scale project and moving it under the company umbrella if they wanted broader support. The code conventions guide was revisited quarterly in all-hands meetings to keep biases in check.

### Sales strategies

Only two people were in sales, but they wanted to make sure no knowledge disappeared if someone left. As they documented their process, three sections emerged: **Approaching a Client**, **Sealing the Deal**, and **Long-Term Relationships**.

When someone hit a snag, they'd leave a comment in the document. This meant no concern was forgotten, and everyone could resolve their own questions later. Some questions kept coming up, so the team mined their page history and built a FAQ list. Each sub-section linked to its related questions, which also linked back to a master FAQ. I liked this pattern so much I've used it with three other clients since.

## What I'd do differently

**Start with permissions.** We figured out the lock/unlock strategy after a few accidental edits. Setting page-level restrictions from the start would have saved some cleanup.

**Fewer categories in the FAQ.** The master FAQ eventually had toggle headers for every sub-section, which got unwieldy. A flatter structure with good search would have been easier to maintain.

**Document the migration process itself.** We focused on the destination but didn't write down how we got there. When a similar project came up six months later, I had to reconstruct the steps from memory.

## The result

The team stopped losing documents. New hires could find everything in one place. And when someone made an edit, everyone saw it.

Would recommend.
