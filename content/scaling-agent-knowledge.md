---
title: 'Why Our 43KB Skill Files Are Rotting'
date: '2026-04-22'
category: 'ai,agents'
description: 'Why structured skill files are breaking down at scale, and what I think we should do about it.'
---

I'm on a small team building Cloudflare Agent, the platform's agentic harness. We have a problem: the 43KB skill files that power our best agent responses are slowly rotting, and nobody has bandwidth to maintain them.

The approach we landed on early (structured skills and recipes contributed by product teams) seemed right. Each product team owns their domain knowledge: they write the troubleshooting guides, update in response to quirks and edge cases. In theory, this scales horizontally as the company grows. In practice, it really doesn't.

## The Current Setup

Skills are structured Markdown files that are co-located with the agent, contributed by product teams.

Here's one example:

```markdown
<about> Cloudflare DNS is an authoritative DNS service... </about>
<rules>
- ALWAYS use `domainTools` for domain registration checks
- ALWAYS ask the user for the domain name
</rules>
<sitemap> [Dashboard URLs with parameter substitution] </sitemap>
<recipes>
## DNS Record Propagation, Error 1014, & "Updates Not Showing"
[Step-by-step troubleshooting guides]
</recipes>
```

Our DNS skill is ~10KB. The Registrar skill is ~43KB - 4.3x larger with complex multi-step recipes. And this skill contains exactly the kind of knowledge that makes the agent useful:

> "Unlike most other registrars, Cloudflare requires users to add the domain to their Cloudflare account and update nameservers BEFORE they can enter an authorization/EPP code. If a user asks where to enter their auth code, explain this difference..."

This is knowledge that doesn't belong in public docs, but is crucial for correct agent behavior. Support learned this through ticket mitigation; it's the kind of thing that turns a confused user into a successful one. The problem is keeping it current.

## Why It's Breaking Down

Three things broke.

### The Evals Requirement

Teams are expected to validate skill changes before shipping: understand the product _and_ potential agent failure modes, write test cases in [Braintrust](https://braintrust.dev/) that verify correct behavior, actively maintain these as products evolve. Most teams don't have experience writing evals, and the tooling has a steep learning curve. This requirement becomes a barrier to entry.

Our [R2](https://developers.cloudflare.com/r2/) skill contains 39 distinct troubleshooting recipes. Each requires understanding of both S3 API standards _and_ Cloudflare-specific quirks. Maintaining test coverage for edge cases like "presigned URLs cannot be used with custom domains" requires deep product expertise that team bandwidth rarely allows.

### The Maintenance Burden

Skills reflect point-in-time product state. Without clear, ongoing ownership, a product's refund policies could change. Edge cases accumulate, skills silently become outdated. Larger skills require more frequent updates and deeper expertise, but being co-located with the agent means changes go through our release process. Product teams don't control that cadence. They can't iterate independently.

### The Categorization Problem

Where does knowledge belong?

| Type | Example | Where It Should Live |
| --- | --- | --- |
| **Dashboard-specific states** | "If Inactive: The tunnel was created but cloudflared never connected. Instruct the user to run the installation command with the token." | Skill files |
| **Permission models** | "Account API tokens (tied to account, only Super Admins can create) vs User API tokens (tied to your user, inherit your permissions)" | Skill files |
| **Support-discovered quirks** | "When creating the CNAME record for wildcard hosts, the record should be placed at `_acme-challenge.example.com` (without the `*.` prefix)" | Skill files |
| **Technical limitations** | "[Workers KV](https://developers.cloudflare.com/kv/) is not a good fit when you need to write to the same key more frequently than once per second" | Developer docs |
| **API specifications** | "Part size requirements: Minimum 5MiB per part (except last part), Maximum 5GiB per part" | Developer docs |

When uncertain, teams typically default to adding everything into skill files, which leads to bloat with mixed content types. And honestly, I don't blame them - the categorization is genuinely hard.

## What I Think We Should Do

### Vectorize + Artifacts

Build retrieval infrastructure teams can update without touching agent code. Per-product knowledge artifacts, independently maintained, versioned separately from the agent harness, deployed on their own cadence.

This plays to Cloudflare's platform strengths: [Workers AI](https://developers.cloudflare.com/workers-ai/) for embeddings, [Vectorize](https://developers.cloudflare.com/vectorize/) for semantic retrieval, and [Artifacts](https://developers.cloudflare.com/artifacts/) for versioned storage.

Artifacts is built for the era of agents: Git-compatible storage, tens of millions of repos, fork from any remote, hand off a URL to any Git client. It's a recent Cloudflare ship I'm particularly excited about for exactly this use case. Agents already know Git, so they can interact with Artifacts using the CLI they're already comfortable with. For our use case, teams get version history, branching, and rollback without building any of that infrastructure. A product team could fork the baseline skill, make updates, and submit changes through a familiar PR workflow. If a skill change causes agent regressions, roll back to the previous version. The same primitives that make Artifacts useful for agent workspaces make it useful for agent knowledge.

The key insight: decouple contribution from deployment. A product team shouldn't need to understand our release process to fix an outdated troubleshooting guide or react to a negative user experience. Eventually, these artifacts could ship to user-facing MCPs that directly benefit developer workflows - the same knowledge that powers internal support could power external tooling.

### What About Sub-Agents?

We're likely to add sub-agents for dedicated product domains - specialized agents owning their domain, with focused context, contained tools, potentially different models for different complexity levels. But sub-agents alone don't solve knowledge maintenance. Each sub-agent still needs maintained knowledge; the contribution bottleneck moves rather than disappearing. Sub-agents combine well with a Vectorize-backed knowledge layer, but they're solving different problems: isolation, model selection, tool scoping. Not "how do we keep 43KB of Registrar knowledge current."

### What I Considered and Rejected

**AutoRAG for internal content.** Extend our developer docs RAG pattern to internal skills and runbooks. The problem: current skills use structured XML-like tags, and chunking could break semantic relationships - splitting sequential recipe steps, separating rules from their context. The structure matters.

**Tiered contribution model.** Schema-validated Markdown at level 1, basic test coverage at level 2, full evals and monitoring at level 3. This lowers barriers for initial contribution while maintaining quality where critical. Worth doing, but it's a process fix, not an architecture fix.

**Expand developer docs scope.** Include non-sensitive operational guidance in public docs, forcing explicit categorization. Doesn't solve truly internal knowledge (Salesforce workflows requiring support employee involvement), and it's still subject to the same maintenance bottlenecks developer docs already suffer from.

## What I'd Do Differently

If we were starting from scratch, I'd push to separate the knowledge layer from day one. Skills as code made sense when we had five of them. With 30+, the coupling is the problem.

I'd also invest earlier in making contribution easy. The evals requirement is correct, but the tooling should meet teams where they are, not where we wish they were.

## tl;dr

Skill files work at small scale. If you find yourself growing beyond 5-10, you should consider a refactor: independent knowledge artifacts, retrieval at runtime, no touching agent code to update a troubleshooting guide.
