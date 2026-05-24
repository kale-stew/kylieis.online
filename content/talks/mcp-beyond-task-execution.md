---
title: 'MCP: Going Beyond Task Execution'
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

Anthropic's [Model Context Protocol](https://modelcontextprotocol.io/) is having a moment. Launched in October 2024, it introduces a standard protocol for enabling LLMs to do more things on the internet.

## The MCP Model

The protocol introduces the concept of an MCP host, client, and server:

![The MCP host, client, and model](/images/mcp_model.png)

- **MCP host** - the session provider, containing the context and LLM connections on behalf of the agent system
- **MCP client** - created by the host, substantiates a connection to the MCP servers
- **MCP server** - provides access to a tool or collection of tools

Think of the MCP server as a set of toddler-friendly keys we provide the model. Instead of expecting the LLM to know how to navigate every publicly-available API, we're providing a framework with clear boundaries and capability.

## Remote Servers Changed Things

Until around April 2025, MCP servers were primarily focused on locally-enabled functionality. Then remote MCP servers hit - hosted, already-on servers that enable standard functionality.

On May 1, 2025, we at Cloudflare [launched thirteen new public, remote MCP servers](https://blog.cloudflare.com/thirteen-new-mcp-servers-from-cloudflare) for developer use.

## The Problem: Task Execution

A lot of "agentic" implementations I've seen rely on a near 1:1 mapping of server-client functionality. I call this model "task execution" - the next generation of API calls.

![Task execution model: One MCP server to one MCP client](/images/mcp_tasks.png)

Frankly, MCP servers are just an expensive `curl` when used this way.

## What True Agentic Workflows Look Like

We need client applications that support agent-to-agent orchestration. One MCP client can map to many MCP servers, creating a true "agent" capable of many functions.

![Agentic model: One MCP client can map to many MCP servers](/images/mcp_host_client_server_agent.png)

## Resources

- [Agents SDK](https://github.com/cloudflare/agents)
- [Cloudflare AI Playground](https://playground.ai.cloudflare.com)
- [Guide: Build a Remote MCP server](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)
