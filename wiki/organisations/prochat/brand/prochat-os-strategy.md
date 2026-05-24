# ProChat OS Strategy

**Status:** canonical strategy  
**Owner:** Steve Westhoek  
**Last updated:** 2026-05-24  
**Source history:** `prochat-os-strategy-draft.md`

## Strategic decision

ProChat OS is the flagship product of ProChat.

ProChat is no longer primarily positioned around fixed SaaS kits, WaaSKit, or a narrow non-technical-founder SaaS education path. Those products remain real, but they are now legacy products and no longer define the company direction.

The company direction is now:

```text
Agentic workflows.
Modular automation.
Private workflow runtimes.
Managed ProChat OS installations.
```

## Category

ProChat OS operates in the category:

```text
Agentic Workflow OS
```

Plain-language explanation:

```text
ProChat OS is the middle layer between messy business inputs and the tools a business already uses.
```

## What ProChat OS is

ProChat OS is an installable Agentic Workflow OS that gives businesses, solo builders, and workflow-driven operators a private agentic employee for memory, automation, local apps, content, operations, and execution.

It connects messy inputs to business tools through configurable workflows, memory, model routing, agents, approvals, logs, connectors, and a control console.

Core description:

```text
ProChat OS turns messy information from emails, files, forms, notes, APIs, and folders into structured outputs, tasks, reports, drafts, updates, and actions.
```

## What ProChat OS is not

ProChat OS is not:

- a chatbot
- a dashboard only
- a generic AI wrapper
- a single SaaS tool
- a fixed SaaS kit
- MikeOSS
- the model router alone
- the memory store alone
- the Brain Console alone

Those can be components, modules, or wedges. ProChat OS is the runtime system that coordinates them.

## Core product promise

```text
Agentic workflows that work for you 24/7.
```

Supporting promise:

```text
You keep working the way you work. ProChat OS sits in the middle and structures the mess.
```

## Main problem

Modern AI tools are powerful, but most work still happens manually around them.

The customer still has to:

- copy information into chat windows
- write prompts repeatedly
- move outputs to other tools
- reformat information
- create tasks manually
- update CRM or business systems manually
- remember context manually
- restart the process for every task

This is not scalable.

## Enemy

The enemy is:

```text
manual AI glue work
```

Manual AI glue work means using AI as an isolated assistant instead of an integrated workflow layer.

ProChat OS turns AI from a passive chat tool into a connected agentic workflow system.

## Audience

### Primary public audience

The ProChat website is business-agnostic.

It should target:

- small businesses
- local businesses
- solo builders
- personal developers
- workflow-driven operators
- creators and influencers
- SaaS builders
- businesses that want AI/agentic automation without stitching tools together manually

### Direct outreach audience

The first direct-sales niche is:

```text
law firms
```

Law firms are a go-to-market wedge, not the entire ProChat strategy.

### Secondary direct outreach niche

```text
accountants
```

Accountants are the second local comparison niche if law-firm response is weak or if accounting workflows prove easier to sell.

### Organic channel audience

Creators, SaaS builders, influencers, and personal developers should be reached through organic content channels, not direct local sales.

Primary channels:

- YouTube
- Facebook channels/pages/groups
- automated or semi-automated social content

## Website positioning

The ProChat website should not be primarily about law firms, accountants, MikeOSS, or legacy kits.

The website should focus on ProChat OS as a business-agnostic Agentic Workflow OS.

Website framing:

```text
ProChat OS connects to the way your business already works.
It takes messy input from many places, understands it, structures it, and sends useful output where it needs to go.
The dashboard is only the command center.
```

Homepage direction:

```text
Agentic workflows between your messy inputs and your business tools.
```

## Technical foundation

The product is technically an installable private workflow runtime.

Core components:

1. workflow runtime / API
2. memory and context store
3. input/output connectors
4. model router / AI selector
5. approval and event log
6. control console
7. CLI for install, update, configuration, and support
8. optional workflow modules

The full technical definition lives in:

```text
prochat-os-technical-definition.md
```

## Business model

ProChat OS can be offered as:

1. **Free personal/non-commercial GitHub version**
   - source-available
   - personal/non-commercial use
   - lets people inspect, fork, and use the system personally

2. **Commercial license**
   - required for business/commercial use
   - required for agencies, resale, managed hosting, or internal business use if defined by license terms

3. **Managed ProChat OS**
   - ProChat installs, configures, updates, and supports the system
   - can run on customer-owned AWS/VPS
   - can run on ProChat-managed AWS/VPS
   - can run on-premise for local/nearby customers

4. **Modular workflow blocks**
   - customers may start with one workflow outcome
   - more modules can be added over time

## Productized service model

ProChat may sell a managed productized service.

Plain-language definition:

```text
You are not selling random custom work.
You are selling the same system repeatedly, with setup and support included.
```

For ProChat OS:

```text
ProChat installs ProChat OS, connects it to selected workflows, keeps it updated, and helps the customer run it. The core system stays the same. The modules and integrations vary by customer.
```

## Deployment philosophy

ProChat OS should become deeply integrated and sticky, but should avoid requiring broad infrastructure access where possible.

Principle:

```text
Share generic computation.
Isolate private context.
```

Customer trust model:

```text
Customer owns the infrastructure.
Customer owns the credentials.
ProChat OS runs the workflows.
ProChat support sees status and redacted logs, not secrets.
Human approval is required first.
Automation increases only after trust.
```

## Go-to-market summary

### Public brand

Business-agnostic ProChat OS messaging.

### First direct wedge

Law firms, using MikeOSS as a tangible legal document AI workspace wedge.

### Second direct wedge

Accountants, if law-firm outreach underperforms or accounting workflows prove clearer.

### Organic wedge

Creators, SaaS builders, influencers, and developers through automated/organic social and YouTube channels.

Full go-to-market details live in:

```text
prochat-os-go-to-market.md
```

## MikeOSS role

MikeOSS is a law-firm wedge and implementation block.

```text
MikeOSS = legal document AI workspace
ProChat OS = Agentic Workflow OS around and beyond it
```

MikeOSS should not define the ProChat website or main product strategy.

Dedicated execution plan:

```text
mikeoss-law-firm-demo-plan.md
```

## Legacy products

The following remain real products but are now legacy/secondary:

- ProKit
- SaaSKit
- UXKit
- WaaSKit

They are not abandoned. They may later be upgraded into more agentic ProChat OS modules.

They should not drive the main website, homepage, or flagship positioning.

## Strategic spine

```text
ProChat OS is the Agentic Workflow OS for turning messy business inputs into structured work.

It is installed as a private workflow runtime, connected to the customer's existing tools, and expanded through modular agents and workflows.

The free version is available for personal/non-commercial use. Commercial and managed use requires a ProChat license or managed plan.
```

## Execution-stage decisions still open

These do not block the strategy:

- exact first law-firm workflow
- exact first pricing
- exact first AWS deployment architecture
- exact landing page copy
- exact v1 implementation plan
- exact demo script and outreach sequence

Those belong in roadmap, implementation, offer, and outreach docs.
