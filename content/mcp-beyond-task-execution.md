---
title: 'MCP: Going Beyond Task Execution'
date: '2025-05-14'
category: 'ai'
description: 'Why I think MCP servers are just expensive curl commands right now, and what true agentic workflows could look like.'
---

Anthropic's [Model Context Protocol](https://modelcontextprotocol.io/) is having a moment. Launched in October 2024, it introduces a standard protocol for enabling LLMs to do more things on the internet. I gave a talk about this at MCP Night recently, and wanted to capture some of those thoughts here.

## The MCP Model

The protocol introduces the concept of an MCP host, client, and server:

![The MCP host, client, and model](/images/mcp_model.png)

- **MCP host** - the session provider, containing the context and LLM connections on behalf of the agent system
- **MCP client** - created by the host, substantiates a connection to the MCP servers
- **MCP server** - provides access to a tool or collection of tools

Think of the MCP server as a set of toddler-friendly keys we provide the model. Instead of expecting the LLM to know how to navigate every publicly-available API, we're providing a framework with clear boundaries and capability.

## Remote Servers Changed Things

Until around April 2025, MCP servers were primarily focused on locally-enabled functionality. The guides relied on technical comprehension to get started since most local MCP configurations live in an MCP client application's dotfiles. Want to talk to your Notion database from Claude? Just follow these nine brief steps to enable the Notion Integration API for your downloaded instance of Claude AI. (/s)

Then remote MCP servers hit. Hosted, already-on servers that enable standard functionality - hot and ready for you to authenticate and use. This made MCP way easier to get started with.

On May 1, 2025, we at Cloudflare [launched thirteen new public, remote MCP servers](https://blog.cloudflare.com/thirteen-new-mcp-servers-from-cloudflare) for developer use. A few of my favorites:

- **[sandbox-container](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/sandbox-container)** - Provisions sandboxed dev environments once authenticated to your Cloudflare account
- **[workers-bindings](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/workers-bindings)** - A control plane for Workers. Create new resources or access existing ones
- **[workers-observability](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/workers-observability)** - Glean insight about Workers already in your account
- **[docs-vectorize](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/docs-vectorize)** - An autoRAG server indexed on Cloudflare developer docs. Useful for making sure your MCP-capable client knows how to leverage the Workers APIs it now has access to

## The Problem: Task Execution

While these MCP servers are great and did unlock necessary functionality... I think we still haven't gone far enough.

A lot of "agentic" implementations I've seen rely on a near 1:1 mapping of server-client functionality. I call this model "task execution" - the next generation of API calls. It's not very complex and doesn't bring anything special to developer tooling.

![Task execution model: One MCP server to one MCP client](/images/mcp_tasks.png)

Frankly, MCP servers are just an expensive `curl` when used this way.

## What True Agentic Workflows Look Like

We need to start thinking about client applications that support agent-to-agent orchestration. One MCP client can map to many MCP servers, creating a true "agent" capable of many functions with access to more than one set of tools.

![Agentic model: One MCP client can map to many MCP servers](/images/mcp_host_client_server_agent.png)

Even further, we'll need applications that introduce new agentic communication patterns: system-to-agent or agent-to-user protocols.

I'm looking forward to the next iteration. We have a lot to learn in the way of AuthZ/AuthN, IAM roles as they apply to LLM access, and session enforcement.

## Resources

To get started developing your own agent applications, check out the [Agents SDK](https://github.com/cloudflare/agents).

- [Cloudflare AI Playground](https://playground.ai.cloudflare.com)
- [Guide: Build a Remote MCP server](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)

---

*This post is based on a talk I gave at [MCP Night by WorkOS](https://lu.ma/quvg7kzs?tk=hC0BvS) on May 14th, 2025.*
