# ProChat Product Roadmap

**Status:** canonical roadmap  
**Owner:** Steve Westhoek  
**Last updated:** 2026-08-15

## Roadmap scope

This document governs product development, validation, licensing, and expansion.

The separate company public-platform, design, content, migration, page-build, and launch program is governed by:

```text
wiki/organisations/prochat/brand/public-platform-roadmap.md
```

The two roadmaps must remain aligned but should not be merged. Product evidence governs public claims; public-platform work must not imply product maturity that this roadmap has not reached.

## Roadmap principle

Build evidence of repeated value before expanding products, disciplines, hosting, or monetization.

ProChat currently has two development lanes:

```text
ProChat Memory
└── ProChat Memory for QA

ProChat Workbench
```

## Current stage

ProChat is pre-revenue.

The immediate priorities are:

- direct QA domain experience;
- selected beta testers;
- real project usage;
- structured feedback;
- product reliability;
- clear licensing;
- evidence of retained value.

## Lane 1 — ProChat Memory for QA

### Phase 1 — Domain immersion

Goal:

```text
Understand how individual QA testers investigate, document, and revisit failures in real work.
```

Actions:

- work directly in the QA discipline;
- map recurring investigation patterns;
- identify where useful lessons are lost;
- document trust, privacy, and client-data constraints;
- compare existing tester workflows and tools.

Exit criteria:

- recurring memory problems are visible in real QA work;
- the product language matches how testers describe those problems.

### Phase 2 — Public beta foundation

Goal:

```text
Make the sanitized public release usable without exposing private development or customer data.
```

Minimum product qualities:

- local installation;
- Markdown-first workspace;
- explicit project scopes;
- Git-compatible memory;
- ingestion and retrieval;
- draft, sanitization, review, and approval flow;
- clear separation between product code, memory workspace, and client repository;
- honest beta status and licensing placeholder.

Exit criteria:

- a tester can install the product and complete one memory cycle locally.

### Phase 3 — Invited tester cohort

Goal:

```text
Observe whether individual QA testers reuse reviewed memory in later investigations.
```

Beta structure:

- public sanitized repository;
- manually selected feedback cohort;
- free access;
- indefinite beta duration;
- real company or client evaluation where approved;
- all customer memory stored locally.

Measure:

- onboarding completion;
- time to first useful memory;
- retrieval attempts;
- accepted or rejected suggestions;
- repeat use;
- missing context;
- trust problems;
- tester-reported time or effort saved.

Exit criteria:

- several testers return to the product without prompting;
- reviewed memory helps at least one later investigation;
- recurring onboarding and trust problems are understood.

### Phase 4 — Iteration and reliability

Goal:

```text
Make the second and third real uses better than the first.
```

Improve:

- installation;
- workspace structure;
- retrieval relevance;
- project isolation;
- sanitization;
- review controls;
- failure handling;
- documentation;
- CLI ergonomics;
- optional compatible-client integration.

Exit criteria:

- the primary workflow is reliable enough for testers to use without direct support on every run.

### Phase 5 — Launch readiness

Goal:

```text
Define what is included, licensed, supported, and safe for commercial use.
```

Required decisions:

- individual license terms;
- QA business or team licensing;
- update and support policy;
- public versus private distribution boundary;
- commercial-use permissions;
- resale, redistribution, sublicensing, and integration restrictions;
- product version and launch criteria.

Exit criteria:

- the product has a real license;
- the public release and private development process are documented;
- beta evidence supports a clear launch claim.

### Phase 6 — Team and business adoption

Goal:

```text
Allow QA businesses and software companies to license the product for multiple testers.
```

Only begin after individual tester value is proven.

Potential additions:

- organization-approved memory rules;
- controlled sharing;
- team review roles;
- license management;
- onboarding for multiple testers;
- organization-level support.

## Lane 2 — ProChat Workbench

Canonical strategy:

```text
wiki/organisations/prochat/brand/prochat-workbench-strategy.md
```

### Phase 1 — Reliability

Maintain exact context reads, guarded file changes, allowlisted commands, persistent runs, targeted validation, and explicit Git operations.

### Phase 1.5 — Portable context and capability federation

After the local reliability baseline is accepted and before broadening onboarding or managed use, make Workbench able to consume context and capabilities through neutral versioned provider contracts rather than customer-specific integrations.

Required direction:

- context sources are pluggable and source-agnostic;
- skills, orchestrators, runbooks, named CLIs, validators, MCP servers/tools, and future capabilities use compact discoverable provider descriptors;
- Steve's Brain/Mind integration is a reference installation profile, not a Workbench product dependency;
- at least one non-Brain/Mind fixture proves portability;
- provider discovery cannot bypass Workbench policy, confirmation, validation, source locking, or Git discipline;
- capability bodies are progressively retrieved rather than injected wholesale into every ChatGPT conversation;
- installation, upgrade, migration, backup, and provider removal remain deterministic and reversible.

This phase is technically queued behind the current Workbench reliability and context-compaction release gates. It does not authorize implementation merely because it appears in this Mind roadmap.

### Phase 2 — Onboarding

Make installation and Custom GPT connection clear for developers, builders, technical founders, and vibe coders.

### Phase 3 — Real project adoption

Collect evidence from users completing meaningful coding, documentation, planning, and repository-maintenance work through ChatGPT.

### Phase 4 — Positioning

Demonstrate the distinct workflow:

```text
ChatGPT reasoning
+ local project context
+ guarded execution
```

Compare honestly with Cursor, Claude Code, Codex, and similar tools without claiming universal replacement or unlimited usage.

### Phase 5 — Licensing and launch

Current Workbench-specific exception:

```text
ProChat Workbench Local has a public prerelease snapshot licensed under AGPL-3.0-only.
Separate commercial or OEM licensing may be requested, but public documentation does not grant commercial rights.
Commercial rights require a separate written agreement.
```

This exception applies only to ProChat Workbench Local and does not apply to ProChat Memory, ProChat Memory for QA, future products, managed services, private modules, customer operations, or internal commercial systems.

Remaining work:

- define support expectations;
- define managed-service and private-module boundaries;
- define paid commercial-agreement workflow where appropriate;
- complete qualified legal review for broader terms, warranties, contributor terms, trademark permissions, and future products;
- keep launch criteria evidence-based and product-specific.

## Expansion rule

Do not start another Memory discipline until the QA edition demonstrates retained value and a repeatable onboarding model.

Future sequence:

```text
prove QA memory
→ launch and license it
→ learn team adoption
→ evaluate the next discipline
```

Do not add a new product name when a capability belongs inside an existing product.
