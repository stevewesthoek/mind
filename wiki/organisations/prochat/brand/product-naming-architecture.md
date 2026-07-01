# ProChat Product Naming Architecture

**Status:** canonical naming architecture  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-01

## Source of truth

This document defines the canonical relationship between the ProChat business, its two products, discipline-specific Memory editions, and future capabilities.

All downstream documentation and public product naming must follow this hierarchy.

## Canonical hierarchy

```text
COMPANY
ProChat

PRODUCT 1 — FLAGSHIP
ProChat Memory
└── CURRENT EDITION
    ProChat Memory for QA

PRODUCT 2
ProChat Workbench

FUTURE MEMORY EDITIONS
ProChat Memory for [Discipline]

FUTURE CAPABILITIES — NOT PRODUCTS
Automation capabilities
API access
MCP integrations
```

## Company

### ProChat

ProChat is the business and master brand.

Do not use ProChat as the name of an individual product when the distinction matters.

## Product 1 — ProChat Memory

ProChat Memory is the flagship product.

It keeps reviewed project knowledge reusable, local, inspectable, editable, source-traceable, and versionable with Git.

It may store and improve:

- project context;
- decisions;
- failures and fixes;
- investigation lessons;
- procedures;
- examples;
- corrections;
- reviewer feedback;
- source references.

Core principle:

```text
Memory is the foundation.
Evidence keeps it trustworthy.
Human review improves it.
AI puts it to work.
```

Question answering, retrieval, summarization, and future automation are capabilities of ProChat Memory. They are not separate products.

## Memory edition naming

Use this pattern:

```text
ProChat Memory for [Discipline]
```

Current edition:

- ProChat Memory for QA

Possible future examples:

- ProChat Memory for Lawyers
- ProChat Memory for Accountants

A discipline-specific edition remains part of ProChat Memory. It is not a separate product family.

## ProChat Memory for QA

ProChat Memory for QA is the first and only current discipline-specific edition.

It helps individual QA testers preserve reviewed knowledge from test investigations, including failed tests, evidence, causes, fixes, corrections, environment conditions, and lessons that should be reused when similar failures happen again.

The primary user is an individual QA tester. A future economic buyer may be a QA business or software company purchasing licenses for its testers.

## Product 2 — ProChat Workbench

ProChat Workbench is a ChatGPT-first local builder workbench for repositories, documentation, notes, and project folders.

```text
ChatGPT provides the reasoning interface.
The local computer remains the source of truth and execution environment.
Workbench connects them with bounded, guarded operations.
```

Primary audiences include developers, builders, technical founders, and vibe coders.

Workbench can be presented as an alternative workflow to Cursor, Claude Code, and similar tools without claiming to replace every editor or coding environment.

BuildFlow remains the technical engine and internal compatibility identifier where required.

## Future capabilities

Automation capabilities, API access, and MCP integrations are future capabilities or interfaces. They are not current products and must not appear beside ProChat Memory and ProChat Workbench as product cards.

See `future-capabilities.md`.

## Approved names

- ProChat
- ProChat Memory
- ProChat Memory for QA
- ProChat Memory for [Discipline]
- ProChat Workbench

## Product-count rule

Any current company overview, product page, or product hierarchy must show exactly two products:

```text
ProChat Memory
ProChat Workbench
```
