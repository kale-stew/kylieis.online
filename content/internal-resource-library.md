---
title: 'Using Notion to Build an Internal Resource Library'
date: '2022-03-06'
category: 'notion'
description: 'Using Notion to codify internal systems as a living knowledge base at scale.'
---

While Notion is already known to be handy for personal task management, it can be even more useful when leveraged as a documentation tool within a team. Organizations of all sizes benefit from documenting their more common-use systems for both current and future employees. These living documents become an asset to teams as they evolve over time, broadening the company's knowledge base with every contribution.

I have been asked by a few teams to codify their shared knowledge base in the form of an internal resource library, documented in Notion. The following is a closer look at one of those cases.

## Previous State

Before moving to Notion, this company had all of their documents in various locations. Google Drive, Evernote, Dropbox, and even some exported PDFs saved to their personal slack spaces all needed to be codified and organized in a way that would be navigable to new hires and the old guard alike.

Many of this team’s PDFs were constantly evolving, so we had to compare some versions against each other to ensure we were referring to the most recent version. One of the benefits of using Notion to document this moving forward was that these PDFs would no longer conflict. The team would now have a navigable history to refer to for every change made in any single document, dated and credited to an individual within the organization.

Another benefit to this new strategy would be company-wide accessibility. With the prior scattered approach of hosting documents in various clouds, individual proactivity was required to ensure each new hire had access to old documents. On occasion, someone would make a small change and save it to their own drive, and no other user of that document would have a way to know about it. Organization-wide information parity would improve if it all lived in Notion.

## New State

We built a comprehensive wiki: documenting every crumb of company-related information that had been found across those clouds into one central repository, now accessible to anyone with a company email address. The following are a few of the more important subsections of that information.

### Company Culture

A key subsection to this particular company’s internal wiki covered company culture. This included custom slack emojis, nicknames, a glossary of company-specific terms (essentially a dictionary of inside jokes), as well as employee handbook information. I was asked to document sometimes silly definitions alongside very serious legal jargon, but found this easily achieved through Notion’s flexible architecture.

Transitioning the employee handbook to Notion was straightforward. This document existed as a living PDF that was reassessed once a month, so moving to Notion where edits would be historically catalogued alongside an employee’s name just made sense. We coupled similar concerns: A definition of the At-Home Office Stipend would go with other remote work information, the bottomless Continuous Education budget was displayed alongside information about speaking at conferences or moving open-sourced software under the company umbrella, etc.

We found ourselves with 5 primary sub-sections for the Company Culture header: **Continuous Education** (named “Never Stop Learning”), **Remote Work Policies**, **Slack Etiquette**, **How to be [Company A]**, and **Culture FAQs**.

“Never Stop Learning” was an important page to define for this company in particular, as they had a strong emphasis on the continuing of education for developers in this space. Everything from identifying worthwhile conferences to attend, to sharing internal codes that would allow a fellow employee free access to an online education tool was documented. We wound up building a living database of events that the consultancy would be sponsoring or attending that the individuals at the company could contribute to any time. As an international company, this was a fairly large task: making sure the properties were cohesive across the board and that a user could filter by location, or even hemisphere, for events of interest.

#### Monitoring Document Access

Many of these company culture documents were to remain living and therefor editable by individuals of all levels within the company. It shouldn’t just be executives allowed to change these culture documents, new hires to mid-levels to engineering managers should all be able to make valuable changes as they see fit. This was an interesting challenge to confront, as most organizations prefer to make their content fixed and more difficult to modify. We ran the risk of allowing lesser-experienced users to accidentally move an important informational block just by scrolling through the page if they didn’t fully understand the software this was all documented within. We would end up unlocking the databases themselves but keeping the pages they were displayed in locked, so users could modify the tables but not move informative blocks around.

### Developer Strategies

As a developer-focused company with more than 97% of its staff being dedicated independent contributors, codifying the developer strategies was an important goal of this project. **Code Conventions**, **OSS Library Review**, and **Open Sourcing your Project** were three primary headers defined in this section.

The OSS (open-sourced software) library review was one of the most interesting databases to create for this company. This database served to give employees a place to honestly review an OSS library, whether they enjoyed working with it, or maybe found the release cycle to be a nuisance, etc. We opened this database up to employee contribution fairly early on for honest feedback of libraries these developers had worked on or were still building, so the information was always available when a dev needed to assess a new technology. Iterating over this database with the team in real-time was helpful, as we were able to address features they wanted or were not using early-on, and therefor improve them more quickly. Long-term, this turned into the database of technology recommendations, advising employees what to use and what to avoid entirely. The company would eventually refer to this database to monitor which technologies were increasing in popularity and which were in decline. As a forward-thinking consultancy that was always on the lookout for the latest and greatest tech, this was a valuable asset for the team to gain.

Other pages within this section were a little more standard to develop, as a Notion consultant: the document outlining how to open-source your project told a developer where to begin if they wanted to create a large-scale OSS, and how they might be able to transition it to the consultancy’s umbrella of software if they were interested in broader support. The code conventions guide also needed to be constantly evolving, and this company chose to circle back to it in a quarterly all-hands meeting to ensure they were also reconsidering their biases.

### Sales Strategies

Although there were only two sales-specific employees at this company, they sought to certify that no knowledge would be lost between them and any future addition to the intimate team. As sales strategies were established and then documented, some specific sub-sections began to arise. Sales-specific headers catalogued included **Approaching a Client**, **Sealing the Deal**, and **Long-Term Relationships**.

Each of these sub-sections would guide a new or existing sales team member through the process of that subset of client contact. If anyone ran into an issue, they would leave a comment within the document to be addressed at a future time. This ensured no concerns or questions that arose were neglected over time, and everyone had the chance to address or resolve their own comment after it had been made.

As some questions began to resurface, this team went back through their Sales page’s history and codified some of the Frequently Asked Questions in their own synced block. Now, each sub-section would have its related questions, which also linked back to a primary list of FAQs. We began to use this practice in other specified sections of the codebase, and found it to be very helpful. This eventually involved into one large FAQs list with toggle headers for each smaller, more focused section of questions and answers, which is now a practice I’ve implemented with more than three other clients’ large, living knowledge bases.

## In Summary

In my past year as a Solutions Engineer, building out internal systems in Notion and other cloud-based tools for larger teams, I've found that living wikis are best managed in one central repository. Be it Notion or another piece of software, organizations of all sizes can benefit from having their systems codified in one location.
