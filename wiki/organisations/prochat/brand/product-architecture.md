# ProChat Product Architecture

**Status:** canonical product architecture  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-01

## Naming source of truth

```text
wiki/organisations/prochat/brand/product-naming-architecture.md
```

## Product relationship

```text
ProChat
├── ProChat Memory
│   └── ProChat Memory for QA
└── ProChat Workbench
```

ProChat has two products. They share local-first, review-first, inspectable design principles, but they solve different problems.

## ProChat Memory

ProChat Memory is the flagship product for durable project knowledge.

Its job is to turn reviewed project experience into reusable memory that can help future work.

Core pattern:

```text
current evidence
+ relevant reviewed memory
+ human judgment
→ better investigation or decision
→ reviewed new lesson
→ improved future memory
```

### Durable memory

Memory may include:

- project context;
- investigation lessons;
- failures and fixes;
- decisions;
- procedures;
- examples;
- corrections;
- environment notes;
- source references;
- reviewer feedback.

### Storage model

ProChat Memory is:

- local-first;
- Markdown-first;
- Git-versioned;
- inspectable;
- editable;
- portable;
- source-traceable.

The customer owns and stores the memory workspace. ProChat does not host it.

### Trust model

Raw evidence is not automatically trusted memory.

```text
raw input
→ draft lesson
→ sanitization
→ human review
→ approved scoped memory
```

Current evidence and tester judgment override stored memory.

### Product capabilities

Current and developing capabilities may include:

- local workspace initialization;
- project and client scopes;
- evidence ingestion;
- memory retrieval;
- draft lesson creation;
- review and approval;
- indexing;
- CLI access;
- use through compatible AI clients.

These are capabilities of ProChat Memory, not separate products.

## ProChat Memory for QA

ProChat Memory for QA is the first discipline-specific edition.

Its primary user is an individual QA tester.

It is designed to preserve reviewed lessons about:

- failed tests;
- root causes and likely categories;
- fixes and corrections;
- selectors and test data;
- environment conditions;
- framework-specific or project-specific patterns;
- what evidence ruled possibilities in or out;
- what should be checked when a similar failure returns.

It complements existing QA tools and processes. It is not a test runner, issue tracker, CI service, or test-management system.

## ProChat Workbench

ProChat Workbench is a ChatGPT-first local builder workbench.

Core pattern:

```text
user request
→ exact local project context
→ ChatGPT reasoning
→ bounded operation
→ targeted validation
→ explicit Git action
```

Workbench provides guarded access to repositories, documentation, notes, and knowledge folders.

Its architecture may include:

- bounded context reads;
- verified file changes;
- allowlisted commands;
- persistent run state;
- targeted validation;
- explicit-path Git operations;
- guarded confirmation for sensitive actions.

BuildFlow remains the technical engine and compatibility identifier where required.

## Shared principles

Both products should remain:

- local-first;
- inspectable;
- reviewable;
- explicit about sources and actions;
- safe by default;
- compatible with Git-based working practices;
- useful through familiar AI interfaces.

## Product boundary

Do not create a new product name for a capability.

A capability becomes a separate product only after the canonical naming architecture is deliberately changed.

Automation capabilities, API access, and MCP integrations are documented separately as future capabilities.
