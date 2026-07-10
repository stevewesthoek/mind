# Mind Roadmap

**Status:** canonical cross-repo priority order
**Version:** 2.0
**Last reviewed:** 2026-07-10
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`

## Roadmap purpose

This roadmap defines the strategic order for Mind and Brain as one paired system. Brain's runtime roadmap is an implementation projection and must not reorder these priorities.

The program contains exactly seven priorities:

```text
1. Canonical coherence
2. Context Gateway
3. Retrieval evaluation
4. Capability truth
5. Controlled application
6. Measured automation
7. System simplification
```

Later priorities may be researched early but must not be activated before their dependencies pass.

## Current baseline

Confirmed on 2026-07-10:

- the two-repo split remains correct;
- `inbox/new/` is the active success intake;
- `inbox/failed/` is the target failure surface;
- Mind's target human-first folder model exists;
- Brain Core type-checks;
- the separate `projects/mind-steward` package does not type-check;
- active Brain instructions and some Mind Steward code still contain retired paths;
- a bounded single-file metadata write path exists;
- broad proposal application and continuous execution are not active;
- meaningful time savings remain unproven;
- current Graphify reports are stale and their scopes include low-signal/generated code.

## Priority 1 — Canonical coherence and migration closure

**Status:** in progress
**Goal:** every active document, config, script, test, and runtime contract uses the same current Mind paths and authority rules.

Outcomes:

- one Brain-owned machine-readable Mind path contract;
- active Mind docs use target paths;
- Claude, Codex, Gemini, Cursor, Kiro, and IDE context files point to `system/agent-context/`;
- the legacy Mind Steward package is either migrated into Brain Core or retired;
- dry-run is the default for classification;
- raw sources are not rewritten unless an exact approved metadata policy allows it;
- all relevant typechecks and path-contract tests pass.

Exit gate:

```text
No active old-path reference remains unless explicitly marked historical or compatibility-only.
```

## Priority 2 — Vendor-neutral Context Gateway

**Status:** planned
**Depends on:** Priority 1
**Goal:** any authorized LLM can retrieve a small, cited, privacy-scoped orientation pack through one core interface.

Outcomes:

- deterministic CLI core;
- versioned context-pack schema;
- authority, freshness, contradiction, privacy-scope, and token-budget fields;
- explain/health commands;
- retrieved source content isolated as untrusted data;
- MCP, API, Console, and agent adapters reuse the same core;
- Mind remains usable when the gateway is unavailable.

Exit gate:

```text
The same query and scope return equivalent source selections through CLI and every enabled adapter.
```

## Priority 3 — Retrieval evaluation and ground truth

**Status:** planned
**Depends on:** Priority 2 core output contract
**Goal:** measure whether Brain understands Steve accurately before expanding semantic automation.

Outcomes:

- versioned real-question corpus;
- expected and forbidden sources;
- authority, freshness, contradiction, privacy, and missing-context cases;
- prompt-injection and data-poisoning cases;
- top-k precision, required-source recall, latency, and token-cost reporting;
- fixed regression command;
- baseline before graph, embedding, or model-ranking experiments.

Exit gate:

```text
Retrieval changes cannot ship without before/after results on the same corpus.
```

## Priority 4 — Capability truth and observability

**Status:** partially implemented
**Depends on:** Priority 1
**Goal:** distinguish plans from tested and active capability using machine-verifiable evidence.

Outcomes:

- one capability manifest;
- standardized states: `planned`, `implemented`, `tested`, `report-only`, `approval-gated`, `active`, `paused`, `retired`;
- status page generated from manifest, tests, feature flags, and health checks;
- stale status detection;
- one operator view in Brain Console or CLI;
- roadmap and implementation-plan documents never claim runtime status.

Exit gate:

```text
Every active capability has an owner, evidence command, safety mode, and last-verified timestamp.
```

## Priority 5 — Controlled proposal application

**Status:** narrow proof implemented; general path planned
**Depends on:** Priorities 1, 3, and 4
**Goal:** apply small approved Mind changes safely without granting broad autonomy.

Outcomes:

- exact-path and section-bounded proposals;
- before hashes, source commit, expiry, and single-use approval;
- idempotency key and conflict detection;
- rollback bundle;
- post-write verification and receipt;
- no folder/glob targets;
- initial allowlist limited to low-risk metadata or one explicitly selected proposal type.

Exit gate:

```text
Repeated write → verify → rollback → verify tests pass on approved fixtures and fail closed elsewhere.
```

## Priority 6 — Measured automation pilots

**Status:** planned
**Depends on:** Priorities 3–5
**Goal:** prove that automation saves time or prevents errors before enabling continuous operation.

Outcomes:

- one narrow pilot selected;
- manual baseline recorded;
- success, error, review-burden, and rollback measures defined;
- bounded trial with kill switch;
- explicit retain, revise, or retire verdict;
- no expansion when value remains unproven.

Good first pilots:

1. context-pack retrieval for a recurring project question;
2. report-only stale-page detection;
3. report-only inbox disposition.

Exit gate:

```text
Steve records that benefit exceeds maintenance and review cost.
```

## Priority 7 — System simplification and performance

**Status:** planned; some cleanup already completed
**Depends on:** may proceed in small safe batches after Priority 1
**Goal:** reduce code, context, storage, and operational complexity while preserving capability.

Outcomes:

- Brain Core routes split into bounded domain routers;
- duplicate path/policy constants removed;
- obsolete Mind Steward package retired or reduced to a thin adapter;
- Graphify scopes exclude plugins, generated output, vendor code, and unrelated projects;
- generated Graphify history and runtime artifacts follow retention limits outside Git;
- system-config binaries and mutable local state are separated from canonical source where feasible;
- docs are checked for broken links, duplicate authority, stale paths, and unsupported status claims;
- performance budgets exist for startup, retrieval latency, context tokens, and storage.
- backup, restore, retention, correction, and deletion procedures are tested without relying on a model provider.

Exit gate:

```text
Measured complexity or cost decreases with no regression in the Priority 3 corpus or capability manifest.
```

## Dependency map

```text
Priority 1 ──→ Priority 2 ──→ Priority 3 ──→ Priority 5 ──→ Priority 6
     │                              │
     └────────→ Priority 4 ─────────┘
     └────────→ Priority 7 (bounded batches)
```

## Roadmap governance

- Mind owns this priority order and the human success criteria.
- Brain owns the implementation projection and live capability status.
- Every task is small enough for a lower-tier model and appears in an implementation plan.
- A task changes one concern, names exact files, has deterministic verification, and includes a stop condition.
- New roadmap priorities require a documented gap that cannot fit into these seven.

## Program definition of done

The program is successful when:

- any authorized LLM can retrieve relevant Steve-specific context without a full-vault prompt;
- context packs cite authority, freshness, scope, and uncertainty;
- Mind remains human-readable and provider-independent;
- Brain applies only approved, bounded changes with verification and rollback;
- live status is evidence-backed;
- automation demonstrates value;
- the system becomes smaller and calmer as reliability improves.
