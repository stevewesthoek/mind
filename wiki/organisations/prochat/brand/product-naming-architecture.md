# ProChat Product Naming Architecture

**Status:** canonical naming architecture  
**Owner:** Steve Westhoek  
**Last updated:** 2026-06-14

## Source of truth

This document defines the canonical relationship between the ProChat business, its products, solution bundles, and technical interfaces.

All downstream documentation and public product naming should follow this hierarchy.

## Product suite

```text
COMPANY
ProChat

FOUNDATION
ProChat Memory

BUSINESS PRODUCTS
ProChat Answers
ProChat Automations

BUILDER PRODUCT
ProChat Workbench
Powered by the BuildFlow engine

SOLUTIONS
ProChat for Founders
ProChat for Sales
ProChat for Support
ProChat for Marketing
ProChat for Operations
ProChat for Legal
ProChat for Accounting

INTERFACES
ProChat API
ProChat MCP
```

## Company

### ProChat

ProChat is the business and master brand.

Do not use ProChat as the name of one individual product when describing the full suite.

## Foundation

### ProChat Memory

ProChat Memory is the shared memory foundation behind the business products.

It stores and improves reusable:

- examples
- decisions
- rules
- procedures
- style and tone
- client and project context
- recurring formats
- corrections
- reviewer feedback
- source references

Core principle:

```text
Memory is the product foundation.
Workflows are the method.
AI is the assistant.
```

ProChat Memory is not automatically a standalone buyer-facing application in every sales conversation. It is the durable foundation that powers answers, automations, and niche solutions.

## Business products

### ProChat Answers

Purpose:

```text
Reliable, sourced answers from approved business knowledge.
```

Core experience:

```text
question
→ approved knowledge and sources
→ grounded answer
→ source references
→ correction or feedback
→ improved memory
```

Use `Q&A` only as a descriptive phrase. Do not use `QA` in the product name because software audiences commonly read QA as quality assurance.

### ProChat Automations

Purpose:

```text
Turn repeated business work into useful output ready for review.
```

Examples:

```text
sales notes → follow-up draft
support request → reply draft
meeting notes → task list
documents → summary and checklist
weekly updates → status report
client context → proposal draft
```

Internally, these may use workflow modules. Publicly, use `Automations` because it communicates buyer value more clearly than `Workflows`.

## Builder product

### ProChat Workbench

Purpose:

```text
Let ChatGPT work safely with real local repositories, documentation, notes, and projects.
```

Positioning:

```text
ChatGPT does the reasoning.
The local computer remains the source of truth.
ProChat Workbench connects the two with bounded, guarded operations.
```

Relationship to BuildFlow:

```text
Public product name: ProChat Workbench
Technical engine and temporary internal identifier: BuildFlow
```

During the naming migration, preserve technical identifiers where renaming would create compatibility risk:

- repository name
- package names
- workspace scopes
- source IDs
- action operation names
- scripts
- environment variables
- API contracts

Public documentation should describe BuildFlow as the engine powering ProChat Workbench until the technical rename is intentionally planned.

## Solutions

Use one predictable pattern:

```text
ProChat for [Role or Industry]
```

Examples:

- ProChat for Founders
- ProChat for Sales
- ProChat for Support
- ProChat for Marketing
- ProChat for Operations
- ProChat for Legal
- ProChat for Accounting

Solutions are packaged combinations of ProChat Memory, ProChat Answers, ProChat Automations, review rules, and delivery configuration.

They are not separate technical foundations.

Example:

```text
ProChat for Sales
├── sales memory
├── ProChat Answers
│   └── answers about offers, accounts, objections, and previous conversations
└── ProChat Automations
    ├── follow-up drafts
    ├── proposal drafts
    ├── call summaries
    └── next-step preparation
```

## Interfaces

### ProChat API

Programmatic access to approved memory, answers, automations, review, and feedback capabilities.

### ProChat MCP

MCP-compatible access for supported AI clients and developer tools.

API and MCP are technical interfaces, not primary buyer-facing products.

## Naming rules

### Products

Use:

```text
ProChat + clear noun
```

Approved:

- ProChat Memory
- ProChat Answers
- ProChat Automations
- ProChat Workbench

### Solutions

Use:

```text
ProChat for [Audience]
```

### Automations

Use:

```text
[Outcome] Automation
```

Examples:

- Follow-up Automation
- Proposal Automation
- Reporting Automation
- Intake Automation
- Support Reply Automation

### Technical access

Use:

- ProChat API
- ProChat MCP

## Names to retire from public product architecture

Do not use these as primary public product names:

- ProChat OS
- MemOS
- MemQA
- ProChat QA
- Ask ProChat
- ProChat Workflows
- SalesBrain
- LegalOS
- SupportAgent

`ProChat OS` may remain temporarily in historical paths or implementation references until documentation and code migrations are complete, but it is no longer the preferred product-suite name.

## One-line suite logic

```text
Memory remembers.
Answers explains.
Automations prepares.
Workbench changes.
Solutions package.
API and MCP connect.
```
