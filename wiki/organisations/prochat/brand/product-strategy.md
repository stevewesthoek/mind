# ProChat Product Strategy

**Status:** canonical strategy  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-01  
**Last reviewed:** 2026-07-01  
**Review after:** 2026-08-01  
**Freshness risk:** high

## Naming source of truth

```text
wiki/organisations/prochat/brand/product-naming-architecture.md
```

## One-sentence strategy

ProChat builds local, memory-first products that keep project knowledge reusable and let people put that knowledge to work through familiar AI interfaces.

## Product hierarchy

```text
ProChat
├── ProChat Memory
│   └── ProChat Memory for QA
└── ProChat Workbench
```

ProChat currently has exactly two products.

## Core philosophy

ProChat is a memory-first software company.

The durable value in AI-assisted work is not the model alone. It is the reviewed knowledge created through real projects: decisions, examples, failures, fixes, corrections, procedures, context, and lessons learned.

```text
Memory is the foundation.
Evidence keeps it trustworthy.
Human review improves it.
AI puts it to work.
```

Useful project work should leave useful memory behind. That memory should help people avoid repeating investigations, re-explaining context, searching for the same information, or making the same preventable mistake again.

## Product principles

ProChat products should be:

- **Memory-first:** useful work should leave reusable knowledge behind.
- **Local-first:** customer memory and project data remain on the customer’s computer.
- **Markdown-first:** durable memory should remain readable and portable where practical.
- **Git-versioned:** important changes should be reviewable through version history.
- **Review-first:** people approve trusted memory and important actions.
- **Evidence-aware:** current evidence and human judgment override stored memory.
- **Inspectable:** users can see which knowledge affects a result.
- **Editable:** memory can be corrected, improved, split, merged, or retired.
- **Source-traceable:** important lessons preserve their origin.
- **Portable:** memory should not be trapped in one hosted platform.
- **Safe by default:** unreviewed input must not silently become trusted memory.
- **AI-flexible:** durable memory should remain useful across supported AI tools where practical.

## ProChat Memory

ProChat Memory is the flagship product.

It provides a local, Markdown-first structure for capturing, reviewing, retrieving, and improving project knowledge.

Customer memory remains local and can be committed to Git for version control. ProChat does not host the customer’s project memory.

Question answering, retrieval, summaries, checklists, and future automation may be capabilities of ProChat Memory. They are not separate products.

## ProChat Memory for QA

ProChat Memory for QA is the first discipline-specific edition of ProChat Memory.

It helps individual QA testers remember:

- which tests failed;
- what evidence was collected;
- what caused the failure;
- what was ruled out;
- how the issue was fixed;
- which test case, selector, data, or environment condition mattered;
- what should be checked when a similar failure occurs again.

It does not replace Playwright, Cypress, Selenium, Robot Framework, CI systems, issue trackers, test-management tools, or tester judgment.

Its primary promise is:

```text
Stop solving the same QA failure twice.
```

The primary user is an individual QA tester. The future economic buyer may be a QA business or software company purchasing licenses for multiple testers.

## ProChat Workbench

ProChat Workbench is a ChatGPT-first local builder workbench.

Its primary promise is:

```text
Build apps through ChatGPT locally.
```

It connects ChatGPT to real repositories, documentation, notes, and project folders through bounded, guarded operations.

```text
ChatGPT provides the reasoning interface.
The local computer remains the project and execution layer.
Workbench is the trusted control plane between them.
```

Workbench is for developers, builders, technical founders, and vibe coders who want to use the familiar ChatGPT interface for substantial local project work.

Its canonical product strategy is defined in:

```text
wiki/organisations/prochat/brand/prochat-workbench-strategy.md
```

It can provide an alternative workflow to Cursor, Claude Code, and similar tools, especially when a user values local control, exact project context, explicit Git operations, targeted validation, and the ability to continue planning or reviewing through the native ChatGPT ecosystem.

Do not promise unlimited usage, zero hallucinations, universal cost savings, or complete replacement of every editor.

## Current business stage

ProChat is pre-revenue. Both products are in active development.

The current objective is to:

1. gain direct experience in the QA discipline;
2. invite selected testers into the public beta;
3. observe real project usage;
4. collect structured feedback;
5. improve onboarding, retrieval, review, and trust;
6. build a relevant professional network;
7. define suitable product licenses;
8. establish retained value before monetization.

## Beta direction

ProChat Memory for QA is available through a public, sanitized repository while ProChat manually selects an invited feedback group.

The beta is free and has no fixed end date. Approved testers may evaluate it in real company or client work while customer memory remains local.

The source is visible for evaluation, but the product is not currently presented as open source. Final licensing remains a separate legal and product decision.

## Product boundary

Current products:

```text
ProChat Memory
ProChat Workbench
```

Current Memory edition:

```text
ProChat Memory for QA
```

Automation capabilities, API access, and MCP integrations may become future capabilities. They are not current standalone products.

## Strategic focus

Do not broaden the Memory product into multiple disciplines before the QA edition demonstrates useful, repeated adoption.

The current sequence is:

```text
QA domain experience
→ selected beta testers
→ repeated real usage
→ product improvement
→ trust and traction
→ licensing and monetization
→ later discipline expansion
```
