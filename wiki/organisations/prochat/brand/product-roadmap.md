# ProChat Product Roadmap

**Status:** canonical roadmap  
**Owner:** Steve Westhoek  
**Last updated:** 2026-07-01

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

### Phase 1 — Reliability

Maintain exact context reads, guarded file changes, allowlisted commands, persistent runs, targeted validation, and explicit Git operations.

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

Compare honestly with Cursor, Claude Code, and similar tools without claiming universal replacement or unlimited usage.

### Phase 5 — Licensing and launch

Define the public source license, commercial-use boundary, support expectations, and launch criteria.

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
