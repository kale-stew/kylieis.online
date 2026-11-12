---
title: 'MCP: going beyond task execution'
date: '2025-05-14'
category: 'ai'
description: 'Embracing agentic workflows as the next iteration of the MCP client-server model.'
presentedAt:
  - eventDate: '2025-05-14'
    eventName: 'MCP Night'
    eventType: 'meetup'
    eventUrl: 'https://lu.ma/quvg7kzs?tk=hC0BvS'
    location: 'San Francisco, CA'
---

Anthropic's [Model Context Protocol](https://modelcontextprotocol.io/) is having a moment right now. Launched in November 2024, it introduces a standard protocol for enabling LLMs to do more things on the internet.

The protocol also introduces the concept of an MCP host, client, and server:

![The MCP host, client, and model](/images/mcp_model.png)

- The **MCP host** is the session provider, ideally containing the context and LLM connections on behalf of the agent system.
- The **MCP client** is created by the host and establishes a connection to the MCP servers (a.k.a. resources).
- The **MCP server** provides access to a tool or collection of tools.

## Remote Servers

MCP servers introduced a new layer that can sit over an existing API, exposing its functionality to an LLM that wants to use it. Put simply, consider the MCP server a set of toddler-friendly keys we give the model to unlock a predetermined set of APIs. Instead of expecting the LLM to know how to navigate every publicly available API, we provide a framework with clear boundaries and capabilities.

Plenty of companies have been introducing MCP servers, but until ~April 2025 they were mostly focused on local functionality. Getting started relied on a reader's technical comprehension, since most local MCP configurations live in an MCP client application's dotfiles. (_Want to talk to your Notion database from Claude? Just follow these nine brief steps to enable the Notion Integration API for your downloaded instance of Claude!_ /s)

Then the natural next step hit: remote MCP servers. Hosted, already-on servers that enable standard functionality, hot and ready for you to authenticate against your account and use. That made MCP servers even easier to start with, and their use expanded even further.

Right around this time (on May 1, 2025), we at Cloudflare [launched thirteen new public, remote MCP servers](https://blog.cloudflare.com/thirteen-new-mcp-servers-from-cloudflare) for developer use. These servers enable core Workers functionality, including:

- [sandbox-container](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/sandbox-container): provisions sandboxed developer environments once authenticated to your Cloudflare account
- [workers-bindings](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/workers-bindings): a control plane for Workers in your account, for creating new resources or accessing and modifying existing ones
- [workers-observability](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/workers-observability): insight into Workers already in your account
- [docs-vectorize](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/docs-vectorize): an AutoRAG server that has indexed the Cloudflare developer docs, which is particularly useful for making sure your MCP client knows how to use the Workers APIs it now has access to

Any of these remote servers can be used from the usual suspects: Cloudflare's in-browser [AI Playground](https://playground.ai.cloudflare.com), a downloaded client like Claude, or directly in your own agentic development.

## Agentic Workflows

These MCP servers are great, and they unlocked functionality we needed to get to the next stage of agentic development... but I fear we still haven't gone quite far enough.

A lot of "agentic" implementations I've seen recently rely on a near 1:1 mapping of server-client functionality. I call this model "task execution," a.k.a. the next generation of API calls. It's not very complex, and I don't personally feel it brings anything special to developer tooling. Frankly, MCP servers are just an expensive `curl` when used this way.

A visual of that 1:1 mapping:

![Task execution model: One MCP server to one MCP client](/images/mcp_tasks.png)

We need to start thinking about _true_ agentic experiences: client applications that support agent-to-agent orchestration and can create effective, functional agent workflows where one agent triggers actions from another. One MCP client can map to many MCP servers, creating a true "agent" that's capable of many functions and has access to more than one set of tools. Even further, we'll soon need applications that introduce new agentic communication patterns, like system-to-agent or agent-to-user protocols.

I like this model a lot better:

![Agentic model: One MCP client can map to many MCP servers](/images/mcp_host_client_server_agent.png)

I'm looking forward to the next iteration of agent implementation. We have a lot to learn about AuthZ/AuthN, IAM roles as they apply to LLM access, and session enforcement.

## Resources

To start building your own agent applications, use the [Agents SDK](https://github.com/cloudflare/agents).

- [Cloudflare AI Playground](https://playground.ai.cloudflare.com)
- [Guide: Build a Remote MCP server](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)
