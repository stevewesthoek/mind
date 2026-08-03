# Mind Roadmap

**Status:** canonical cross-repo priority order
**Version:** 2.0
**Last reviewed:** 2026-08-03
**Owner role:** Steve Westhoek (human authority)
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`
**Conflict rule:** when this roadmap conflicts with philosophy or strategy, those take precedence. Brain's runtime roadmap is an implementation projection and must not reorder these priorities.

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

Confirmed on 2026-07-31:

- the two-repo split remains correct: Mind owns meaning and human authority; Brain owns runtime and machine-operational truth;
- `inbox/new/` and `inbox/failed/` are the verified live Save-to-Mind success and failure targets;
- Mind's human-first folder model exists, and `kanban.md` is the sole human task authority;
- Brain final verification passed its Brain-local Core, Console, Mind Steward, capability, contract, scheduler, retrieval, documentation, recovery, and synthetic-fixture checks;
- Brain Context Pack 1.0 and Context Gateway are implemented per Brain's live-status authority; thin adapters remain fixture-only until separately activated;
- active legacy-path producer migration (Brain BS0.10) is complete: four legacy producers retired with exit guards (2026-07-31). Producer retirement is not package retirement; Mind Steward remains a separate active Brain-owned package per B1.5;
- deletion readiness (Brain BS0.19) is complete: 0 SAFE, 2 PARTIAL, 17 BLOCKED; deletion is separately governed and not authorized;
- the Mind M5.1–M5.3 synthetic exact-scope write proof passes;
- broad proposal application, production write activation, and continuous execution are not authorized;
- meaningful time savings remain unproven;
- current machine capability state (including Codebase Memory, Graphify, and scheduler) is owned by Brain's live-status runbook at `/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md`.

## Pre-1.0 Architecture Stabilization Coordination

Brain's **BS0.1 — Inventory and contain mutable Brain Core capabilities** is
the current highest-priority system stabilization lane. The Brain
Pre-1.0 Architecture Stabilization Program is tracked under `BS0.1`–`BS0.23`;
Mind must reference that program without duplicating Brain runtime work.

- Mind work continues only where it is independent of Brain runtime migration.
- M1.3 is complete: active path instructions use verified canonical routes, while historical evidence remains explicitly classified.
- M1.4 is complete: `kanban.md` remains sole human task authority and `tasks.md` is retired and non-authoritative.
- These decisions satisfy the Mind prerequisites for Brain BS0.10 and BS0.19; the Brain tasks still require Brain-local execution and validation.
- M1.5 is complete (2026-07-31): authority headers added to all six canonical files after the MS0.10 gate passed.
- Mind must not duplicate Brain runtime state, deployment status, scheduler
  truth, schema state, or capability verification.
- Repository configuration, deployed state, observed state, and verified state
  remain distinct.
- Compatibility paths remain non-authoritative unless explicitly documented as
  compatibility-authoritative exceptions.

Mind-owned coordination tasks use the separate `MS0.1`–`MS0.10` namespace in
the implementation plan. They authorize documentation, policy, evidence, and
coordination work only; they do not authorize Brain edits, deployment,
automation changes, or external writes.

## Priority 1 — Canonical coherence and migration closure

**Status:** complete; M1.1–M1.6 complete; exit gate satisfied 2026-08-03
**Evidence:** `system/reports/m1-3-m1-4-closure-2026-07-31.md`, `system/reports/documentation-consistency-2026-07-31.md`, `system/reports/priority-1-exit-gate-reconciliation-2026-08-02.md`, `system/reports/priority-1-mind-steward-disposition-decision-2026-08-02.md`
**Goal:** every active document, config, script, test, and runtime contract uses the same current Mind paths and authority rules.
**Closure:** zero unexplained active stale-path defects; configured agent entrypoints aligned; Mind Steward explicitly retained with a documented Brain-owned boundary and canonical shared path policy. BS0.10 producer retirement remains distinct from package retention. BS0.19 separately governs deletion readiness; Priority 1 completion authorizes no deletion.

Outcomes:

- one Brain-owned machine-readable Mind path contract;
- active Mind docs use target paths;
- Claude, Codex, Gemini, Cursor, Kiro, and IDE context files point to `system/agent-context/`;
- the legacy Mind Steward package is migrated, retired, or explicitly retained with documented Brain-owned boundary separation and canonical shared path policy;
- dry-run is the default for classification;
- raw sources are not rewritten unless an exact approved metadata policy allows it;
- all relevant typechecks and path-contract tests pass.

Exit gate:

```text
No active old-path reference remains unless explicitly marked historical or compatibility-only.
```

## Priority 2 — Vendor-neutral Context Gateway

**Status:** in progress; M2.1–M2.3 complete; M2.4 remains blocked, not deferred
**Evidence:** `system/reports/m2-context-policy-fixtures-2026-07-31.md`, `system/reports/m2-4-context-gateway-adapter-readiness-audit-2026-08-03.md`
**Depends on:** Priority 1
**Goal:** any authorized LLM can retrieve a small, cited, privacy-scoped orientation pack through one core interface.
**Current gate:** core and CLI repository verification is complete; the thin adapter and trust boundary remain fixture-only. Deployment, discovery, provider authentication, live readback, unavailable-service fallback, disable/rollback, and production freshness remain unverified. No activation is authorized.

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

**Status:** complete; M3.1–M3.4 complete; exit gate satisfied — baseline corpus exists for before/after comparison of any future retrieval change
**Evidence:** `system/reports/m3-1-question-corpus-2026-07-31.md`, `system/reports/m3-2-source-expectations-2026-07-31.md`, `system/reports/m3-3-adversarial-context-cases-2026-08-01.md`, `system/evals/manual-baseline-2026-07.md`
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

**Status:** complete
**Evidence:** `system/reports/m4-1-capability-truth-audit-2026-08-01.md`, `system/reports/m4-2-system-status-link-verification-2026-08-01.md`
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

Exit gate satisfied: Brain's generated capability table includes Owner, Safety, Evidence Command, and Last Verified columns. Mind documents carry no duplicate runtime-status claims; all machine-capability questions redirect to Brain's canonical live-status runbook.

## Priority 5 — Controlled proposal application

**Status:** complete
**Evidence:** `system/reports/m5-controlled-write-pilot-verification-2026-07-31.md` (Mind M5.1–M5.3), `/Users/Office/Repos/stevewesthoek/brain/operations/reports/b5-4-controlled-write-pilot-2026-07-31.md` (Brain B5.4), `system/reports/priority-5-controlled-application-reconciliation-2026-08-01.md`
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

Exit gate satisfied: Brain B5.4 (2026-07-31) ran three identical repeatability runs of write → verify → rollback → verify on the synthetic fixture; all rejection gates passed; repository mutation was false. Pilot is synthetic and fixture-only; no production writes, batch writes, or broader proposal types are authorized.

## Priority 6 — Measured automation pilots

**Status:** complete; M6.1–M6.3 complete; exit gate satisfied 2026-08-03; verdict `retain`
**Evidence:** `system/automation-pilot.md`, `system/reports/m6-2-pilot-cadence-decision-2026-08-03.md`, `system/reports/m6-2-run-evidence-repair-2026-08-03.md`, `system/reports/priority-6-automation-pilot-verdict-2026-08-03.md`
**Depends on:** Priorities 3–5
**Goal:** prove that automation saves time or prevents errors before enabling continuous operation.

Outcomes:

- one narrow pilot selected;
- manual baseline recorded;
- success, error, review-burden, and rollback measures defined;
- bounded trial with kill switch;
- explicit retain, revise, or retire verdict;
- no expansion when value remains unproven.

**Closure:**
- all 8 runs fully evaluated through Stage 3 human review;
- 8 of 8 useful, 8 of 8 citations correct, 0 safety violations, and 0-minute measured median correction time;
- no kill condition triggered;
- measured end-to-end time did not beat the 5-second manual baseline;
- runs 3–8 used the authorized immediate serial cadence, which proves bounded repeatability but not multi-week stability;
- operator-triggered report-only use retained; continuous automation remains unauthorized.

Exit gate:

```text
Steve records that benefit exceeds maintenance and review cost.
```

Exit gate satisfied: Steve Westhoek determined that all eight briefs were useful and the seven measured reviews required zero correction time. The repository-defined M6.3 `retain` thresholds passed. This closure does not authorize scheduling, deployment, adapter activation, MCP activation, continuous operation, or a second pilot.

## Priority 7 — System simplification and performance

**Status:** in progress; M7.2 complete; M7.1 and M7.3–M7.5 pending
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

**Current state:** M7.2 generated-output retention is complete. Canonical source, audit records, receipt-bound snapshots, rebuildable outputs, caches, convenience artifacts, captures, and temporary evidence now have explicit retention and Git rules. This did not activate Graphify or authorize deletion. M7.1 still requires a fresh Brain-owned receipt-bound graph and remains pending.

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
