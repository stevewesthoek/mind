# ProChat Memory Technical Definition

**Status:** canonical technical definition  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-01

## Product definition

ProChat Memory is a local, Markdown-first project memory system.

It helps people capture, review, retrieve, and improve reusable project knowledge without requiring ProChat to host customer data.

## Core flow

```text
current project evidence
→ retrieve relevant reviewed memory
→ investigate with AI assistance and human judgment
→ draft a reusable lesson
→ sanitize and review
→ approve scoped memory
→ improve future investigations
```

## Local ownership

Customer memory remains on the customer’s own computer.

ProChat does not host the memory workspace, project evidence, client data, or approved lessons.

A recommended separation is:

```text
product repository
customer-owned memory workspace
customer or client project repository
```

The memory workspace should not be stored inside a public product repository.

## Markdown-first storage

Durable memory should use readable Markdown files where practical.

Markdown makes memory:

- inspectable;
- editable;
- portable;
- searchable;
- easy to review;
- compatible with Git;
- usable across supported AI tools.

Structured metadata and indexes may be added where they improve retrieval without making the source memory opaque.

## Git version control

The customer may commit the memory workspace to a private Git repository.

Git provides:

- change history;
- reviewable diffs;
- rollback;
- authorship and timestamps;
- branch-based experimentation;
- controlled sharing inside an approved organization.

Sensitive memory must not be pushed to public repositories.

## Memory scopes

Memory should be explicitly scoped.

Possible scopes include:

```text
personal
project
client
team
organization
cross-project
```

A project-specific lesson must not automatically become cross-project or company memory.

Promotion requires review, sanitization, and an explicit decision.

## Memory lifecycle

```text
raw evidence
→ ingestion record
→ draft lesson
→ sanitization
→ human review
→ approved memory
→ indexed retrieval
→ later correction or retirement
```

Raw logs and AI-generated drafts are not trusted memory.

## Evidence hierarchy

The system must distinguish stored memory from current evidence.

```text
current evidence and human judgment
> reviewed stored memory
> unreviewed notes or AI drafts
```

Stored memory should guide an investigation, not override fresh logs, traces, source code, screenshots, test output, or tester judgment.

## Retrieval

Retrieval should select only memory relevant to the current project, scope, and question.

Useful retrieval metadata may include:

- project alias;
- client scope;
- framework;
- failure category;
- environment;
- affected feature;
- evidence source;
- approval state;
- last reviewed date.

The system should expose which memory influenced an AI-assisted result.

## CLI

A local CLI may provide operations such as:

- initialize a memory workspace;
- add or list projects;
- ingest approved evidence;
- create draft lessons;
- review, approve, reject, or retire memory;
- rebuild indexes;
- retrieve relevant memory;
- validate workspace structure.

The CLI is an interface to ProChat Memory, not a separate product.

## Optional AI integrations

ProChat Memory may be used through compatible AI clients.

An optional MCP integration may expose approved local operations to supported clients. It remains an integration capability, not a current standalone product.

The durable memory must remain useful even when a specific AI client or model changes.

## ProChat Memory for QA

The first implementation is ProChat Memory for QA.

It focuses on reviewed lessons from testing work, including:

- failed tests;
- root causes;
- fixes;
- selectors;
- test data;
- environments;
- framework behavior;
- investigation evidence;
- recurring failure patterns;
- sanitization and approval decisions.

It complements existing test runners, CI systems, issue trackers, and test-management tools.

## Safety principles

- Customer data remains local.
- Secrets and confidential raw evidence must not be promoted into reusable memory.
- Client and project aliases should be used where appropriate.
- Human approval is required before drafts become trusted memory.
- Current evidence overrides memory.
- Cross-project reuse requires sanitization and explicit approval.
- Public product releases must not contain private development data or customer memory.

## Deployment boundary

The initial product is installed and run locally.

ProChat does not provide hosted memory storage, hosted customer workspaces, or a managed cloud runtime in the current strategy.
