# Mind Implementation Plan

**Status:** canonical implementation plan  
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/mind-roadmap.md`  
**Purpose:** convert the Mind roadmap into concrete, reviewable work while preserving the human-first vault.

## Operating rules

1. Implement one small phase or slice at a time.
2. Read the relevant contracts before changing files or automation.
3. Prefer documentation and report-only behavior before writes.
4. Keep the current folder structure unless evidence proves a change is needed.
5. Preserve `kanban.md` as task source of truth until lossless sync is validated.
6. Keep automation implementation in Brain; keep human truth and destination contracts in Mind.
7. Use exact-path, reviewable changes.
8. Validate human readability after every structural change.
9. Stop if the proposed change increases folder depth or maintenance burden without measurable value.

## Phase 0 — Canonical documentation

**Goal:** establish the source-of-truth chain before implementation.

### Tasks

- [x] Create `system/infinite-brain-philosophy.md`.
- [x] Create `system/mind-strategy.md`.
- [x] Create `system/mind-roadmap.md`.
- [x] Create `system/mind-implementation-plan.md`.
- [x] Add the canonical chain to `system/README.md`.
- [x] Add a short philosophy/strategy link section to `home.md`.
- [x] Mark `system/automation-roadmap.md` as a subordinate automation track.
- [x] Review all four documents for duplicated or conflicting rules (evidence: direct comparison of `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/mind-roadmap.md`, and `system/mind-implementation-plan.md`; no conflicting rules or phase-order conflicts found).

### Acceptance criteria

- one clear chain exists: philosophy → strategy → roadmap → implementation plan;
- existing contracts remain factual and linked;
- no content folders are moved or renamed;
- no automation behavior changes.

### Remaining Phase 0 gaps

- review all four canonical documents together for duplicated or conflicting rules;
- later phases still need implementation work for persistent queueing, approved writes, scheduled execution, and continuous processing.

## Phase 1 — Human orientation

**Goal:** make the current Mind system understandable from one page.

### Tasks

- [x] Review `home.md` against the actual current system (evidence: reviewed and corrected against `system/README.md` and `live/dashboard.md`; automatic-write claims removed from `home.md`).
- [x] Keep `home.md` concise enough to function as a human user manual (evidence: full-file review completed; stale memory claims and duplicated technical detail removed; `home.md` reduced from 5,364 to 3,603 bytes).
- [x] Add a compact lifecycle (evidence: `home.md`, “How information moves”):
  `capture → review → place → use → revalidate → supersede/archive`.
- [x] Explain the difference between (evidence: `home.md`, “Current, durable, source, and historical information”; definitions verified against `system/folder-contract.md`):
  - current state in `live/`;
  - durable knowledge in `wiki/`;
  - evidence in `sources/`;
  - historical material in `archive/`.
- [x] Review `live/dashboard.md` for broken, stale, or overly technical navigation (evidence: broken `TODAY.md` link removed, canonical `home.md` link restored, existing fallback targets verified, stale automation claims and excessive runtime detail removed).
- [x] Verify each important top-level folder has one readable index or README (evidence: `archive/index.md`, `capture/README.md`, `live/README.md`, `router/README.md`, `sources/index.md`, `system/README.md`, and `wiki/README.md` were directly read and confirmed human-readable).
- [x] Avoid creating new root files beyond documented exceptions (evidence: Phase 1 changed only existing `home.md`, `live/dashboard.md`, and this implementation plan; no new root file was created; allowed root exceptions remain defined in `system/folder-contract.md`).

### Acceptance criteria

- Steve can explain the system after reading only `home.md`;
- current priorities, decisions, and projects are reachable in one or two steps;
- no additional top-level folders are introduced;
- root and folder contracts match reality.

## Phase 2 — Brain–Mind bridge contract

**Goal:** standardize cross-repo communication while preserving ownership.

### Tasks

- [x] Create `system/brain-mind-bridge.md` (evidence: `system/brain-mind-bridge.md`).
- [x] Define Brain-owned and Mind-owned information (evidence: `system/brain-mind-bridge.md`, “Ownership boundary”).
- [x] Define allowed Brain → Mind proposal types (evidence: `system/brain-mind-bridge.md`, “Shared through the bridge” and “Brain → Mind flows”):
  - capture classification;
  - research summary;
  - decision proposal;
  - maintenance proposal;
  - project/status handoff;
  - task proposal.
- [x] Define allowed Mind → Brain context types (evidence: `system/brain-mind-bridge.md`, Mind ownership and normalized bridge rules):
  - approved strategy;
  - current priorities;
  - durable decisions;
  - project context;
  - personal constraints and preferences;
  - reviewed research conclusions.
- [x] Define one compact cross-repo envelope (evidence: `system/brain-mind-bridge.md`, “Normalized bridge envelope”).
- [x] Decide which fields are required versus optional (evidence: `system/brain-mind-bridge.md`, “Required versus optional fields”).
- [x] Define default proposal destinations (evidence: `system/brain-mind-bridge.md`, “Brain → Mind flows”).
- [x] Define approval and write boundaries (evidence: `system/brain-mind-bridge.md`, “Core rules” and flow boundaries).
- [x] Define source, supersession, and rejection behavior (evidence: `system/brain-mind-bridge.md`, normalized envelope and core rules).
- [x] Compare the bridge contract with Brain's current memory/handoff policies (evidence: direct comparison with Brain `AGENTS.md`, `CLAUDE.md`, `tools/scripts/auto-handoff.sh`, and `operations/specs/infinite-brain-philosophy.md`; ownership, selective retrieval, explicit promotion of Mind content into global AI rules, compact handoffs, separation of repo-local `.ai/` operational state from durable knowledge, secret exclusion, and human-approved truth changes align with `system/brain-mind-bridge.md`; no policy conflict found).

### Acceptance criteria

- neither repo needs to guess ownership or destination;
- no entire-file duplication is required across repos;
- personal/business truth cannot be silently promoted into global AI rules;
- Brain runtime data does not become duplicated Mind truth.

## Phase 3 — Freshness and knowledge-state standard

**Goal:** make changing knowledge maintainable without burdening timeless notes.

### Tasks

- [x] Create `system/knowledge-freshness-standard.md` (evidence: file exists and was directly reviewed).
- [x] Define statuses (evidence: `system/knowledge-freshness-standard.md`, “Knowledge states”):
  `draft`, `current`, `review-needed`, `superseded`, `archived`.
- [x] Define optional fields (evidence: `system/knowledge-freshness-standard.md`, “Optional freshness fields”):
  `last_reviewed`, `review_after`, `supersedes`.
- [x] Identify content classes that need freshness checks (evidence: `system/knowledge-freshness-standard.md`, “What should receive freshness checks”):
  - business strategy;
  - active projects;
  - prices and offers;
  - technical architecture;
  - services/vendors;
  - legal/regulatory research;
  - operating procedures.
- [x] Identify content classes that should not require review dates (evidence: `system/knowledge-freshness-standard.md`, human-first rule and low-freshness-risk classes).
- [x] Define contradiction handling (evidence: `system/knowledge-freshness-standard.md:190-225`; exact conflicting statements, source/date/scope/authority checks, current-evidence preference, exact-path resolution proposals, history preservation, and human approval are explicitly defined).
- [x] Define supersession and archive behavior (evidence: `system/knowledge-freshness-standard.md:227-260`; superseded/current link fields, no full-truth duplication, archive-not-deletion, link/index/history preservation, and archive-reason rules are explicitly defined).
- [x] Add examples that are readable in Obsidian (evidence: `system/knowledge-freshness-standard.md:284-391`; three Markdown examples include clear headings, exact paths, observed state, assessment, and readable YAML recommendations).
- [x] Validate the standard against three changing Mind pages before applying metadata (evidence: direct review of `router/00-current-context.md`, `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`, and the current canonical ProChat strategy identified by `wiki/organisations/prochat/brand/README.md` as `wiki/organisations/prochat/brand/product-strategy.md`; each page’s status, review timing, and freshness risk match the standard’s page-type guidance).
- [x] Apply pilot fields to exactly three reviewed pages (evidence: all three pages were directly read and contain status/review metadata):
  - `router/00-current-context.md`;
  - `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`;
  - `wiki/organisations/prochat/brand/product-strategy.md`.

### Acceptance criteria

- changing truth can be distinguished from historical truth;
- timeless notes remain lightweight;
- no bulk frontmatter migration is required;
- human readers can understand status without a schema reference.

## Phase 4 — Report-only maintenance intelligence

**Goal:** test self-healing suggestions without changing durable content.

### Mind tasks

- [x] Define report formats and review surfaces in `system/maintenance-report-contract.md` and `system/reports/README.md` (evidence: `system/maintenance-report-contract.md:38-56,61-88` and `system/reports/README.md:9-21,84-109`).
- [x] Add clear dismissal, suppression, recurrence, and false-positive behavior (evidence: `system/maintenance-report-contract.md:175-219`, `system/reports/README.md:54-67`).
- [x] Define which reports belong in `system/reports/` versus `wiki/log.md` (evidence: `system/reports/README.md:9-21,62-70`).
- [x] Define evidence requirements for each suggestion type (evidence: `system/maintenance-report-contract.md:14-22,93-123,376-457`).
- [x] Select a bounded five-file pilot dataset and explicit report-only acceptance tests (evidence: `system/reports/maintenance-pilot-fixture.md:11-28,30-41` and `system/runbooks/maintenance-report-pilot-runbook.md:47-69,92-106`).

### Brain implementation tasks

- [x] Add stale-page candidate detection (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-pilot-loader-stale.test.ts`; aggregate gate `test:mind-maintenance-pilot-all` passed 120 tests, 0 failed).
- [x] Add duplicate-page candidate detection (evidence: Brain `projects/brain-core/src/mind-maintenance-pilot/pilot-report-builder.ts` enables conservative exact normalized-content comparison across the bounded pilot dataset; focused test `projects/brain-core/src/tests/mind-maintenance-pilot-report-builder.test.ts` verifies one approval-gated report-only duplicate finding with zero source writes; `test:mind-maintenance-report-builder` passed 10 tests, 0 failed, including TypeScript build).
- [x] Add contradiction candidate detection (evidence: Brain `projects/brain-core/src/mind-maintenance-pilot/contradiction-detector.ts` requires exact claims, locations, authority, scope, bounded paths, and explicit mutual exclusivity; `projects/brain-core/src/mind-maintenance-pilot/pilot-report-builder.ts` enables report-only execution; focused test coverage verifies one approval-gated contradiction finding, exclusion of a compatible pair, and zero source writes; `test:mind-maintenance-report-builder` passed 11 tests, 0 failed, including TypeScript build).
- [x] Add completed-but-still-active detection (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-completed-active.test.ts`; aggregate gate passed 120 tests, 0 failed).
- [x] Add source-reference gap detection (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-source-gap.test.ts`; aggregate gate passed 120 tests, 0 failed).
- [x] Add durable-insight-trapped-in-capture detection (evidence: Brain `projects/brain-core/src/mind-maintenance-pilot/capture-promotion-detector.ts` requires durable classification, repeated-use/repeated-concept or aged high-confidence signals, duplicate-check evidence, bounded destinations, explicit approval, and no writes; `projects/brain-core/src/mind-maintenance-pilot/pilot-report-builder.ts` enables report-only execution; focused direct suite passed 12 tests, 0 failed, including personal-content exclusion and zero source writes).
- [x] Route jobs through Brain Core, scheduler, Mind Steward, and AI Model Selector (evidence: Brain `projects/brain-core/src/adapters/mind-maintenance-routing.ts` routes report-only jobs through runtime `brain-core`, scheduler job `mind-maintenance-report-only`, owner `mind-steward`, and conditionally consults AI Model Selector only for ambiguous semantic checks; `projects/brain-core/src/adapters/scheduler.ts` registers the job; `projects/brain-core/src/adapters/ai-model-selector-service.ts` provides the bounded selector wrapper; `projects/brain-core/src/api/routes.ts` exposes explicit approval-gated `POST /api/mind-maintenance/run`; focused direct suite `test:mind-maintenance-routing:direct` passed 4 tests, 0 failed).
- [x] Expose status and latest reports in Brain Console (evidence: Brain Core `projects/brain-core/src/api/routes.ts` exposes read-only `GET /scheduler/mind-steward/status` and validated `GET /api/mind-maintenance/latest?mindRoot=<path>`; Brain Console `projects/brain-console/lib/braincore-schemas.ts` defines the maintenance response contracts; `projects/brain-console/components/infinite-brain-dashboard.tsx` polls and renders scheduler status, latest report metadata, findings, detector errors, source-file changes, and report-only safety; `projects/brain-console` typecheck passed with 0 errors).

### Validation

- [x] Run each implemented report detector on bounded fixtures (evidence: focused detector tests and Brain aggregate gate passed 120 tests, 0 failed; controlled five-file Mind run completed with 0 detector errors).
- [x] Measure false positives (evidence: reviewed bounded-fixture audit `system/reports/maintenance-history/2026-06-17-false-positive-measurement.md` measured 7 explicit negative cases, 0 false positives, and a 0% observed false-positive rate; the same audit records 1 missed required positive and 0% recall, so stale-page detection still requires repair before Phase 4 detector quality is acceptable).
- [x] Confirm no Mind content changes (evidence: Brain test `projects/brain-core/src/tests/mind-maintenance-source-integrity.test.ts`; controlled run reported `sourceFilesChanged: 0`).
- [x] Confirm suggestions cite exact source paths (evidence: Brain report schema and detector tests require path-bearing evidence; controlled report used the bounded five-file dataset).
- [ ] Collect human usefulness feedback.

### Acceptance criteria

- reports save review time;
- no suggestion is presented as fact without evidence;
- no write occurs;
- noisy report types are disabled or refined.

## Phase 5 — Approved bounded writes

**Goal:** turn useful proposals into safe human-approved updates.

### Tasks

- [ ] Define exact-path approval payloads.
- [ ] Implement approved wiki update flow.
- [ ] Implement approved live-page status update flow.
- [ ] Implement approved supersede/archive flow.
- [ ] Implement approved source-routing flow.
- [ ] Preserve source references.
- [ ] Log changed paths, before/after state, approval, and result.
- [ ] Add rollback or recovery procedure.
- [ ] Reject broad-folder or unspecified writes.

### Acceptance criteria

- every write is tied to an explicit proposal and approved path;
- no hidden bulk rewrite is possible;
- history and provenance are preserved;
- failed writes are recoverable.

## Phase 6 — Capture-to-knowledge lifecycle

**Goal:** make capture reliably become useful knowledge when appropriate.

### Tasks

- [ ] Implement persistent Brain-owned inbox queue.
- [ ] Normalize capture classification output.
- [ ] Require duplicate search before proposing a new durable page.
- [ ] Preserve original capture source.
- [ ] Propose one destination only unless ambiguity is material.
- [ ] Support reviewed outcomes:
  - promote to `live/`;
  - compile into `wiki/`;
  - route to `sources/`;
  - create task proposal;
  - archive;
  - reject/leave in inbox.
- [ ] Define what happens to the original capture after approval.
- [ ] Prevent repeated processing of the same capture.
- [ ] Add bounded retry and failure routing.

### Acceptance criteria

- each processed capture has a visible state;
- duplicate durable pages decrease;
- original evidence is not lost;
- rejected or failed captures remain recoverable.

## Phase 7 — Tasks and projects

**Goal:** connect knowledge with action without risking the current Kanban.

### Tasks

- [ ] Keep task generation proposal-only initially.
- [ ] Link task proposals to source captures or decisions.
- [ ] Add project status review suggestions.
- [ ] Add completed-project archive suggestions.
- [ ] Validate the existing read-only Kanban exporter.
- [ ] Define a lossless canonical task record only if needed.
- [ ] Test round-trip sync on fixtures before touching `kanban.md`.
- [ ] Require explicit approval before any task write.

### Acceptance criteria

- no Kanban cards, subtasks, dates, tags, or statuses are lost;
- project state and task state do not silently diverge;
- knowledge can explain why a task exists.

## Phase 8 — Scheduled/on-demand operation

**Goal:** operate proven workflows reliably through Brain.

### Tasks

- [ ] Add feature flags per workflow.
- [ ] Add on-demand runs first.
- [ ] Add scheduler jobs only after manual success.
- [ ] Enforce queue, throttle, retry, and large-file policies.
- [ ] Add kill switch.
- [ ] Add latest-run, failed-item, and recovery views.
- [ ] Schedule Graphify refresh where useful.
- [ ] Schedule report-only maintenance before approved writes.

### Acceptance criteria

- runs are observable and interruptible;
- failures do not corrupt Mind;
- system load remains acceptable;
- important changes still require review.

## Phase 9 — Continuous processing

**Goal:** enable near-real-time behavior only where measured value justifies it.

### Tasks

- [ ] Select one proven workflow for continuous processing.
- [ ] Add stable-file detection and debounce.
- [ ] Cap concurrency.
- [ ] Add retry exhaustion and failure-buffer behavior.
- [ ] Add large-file nightly fallback.
- [ ] Measure latency, machine load, and review burden.
- [ ] Document disable/recovery procedure.

### Acceptance criteria

- the workflow saves meaningful time;
- no duplicate processing occurs;
- the system can be disabled immediately;
- continuous behavior does not become required for basic Mind use.

## Phase 10 — Simplification review

**Goal:** remove complexity that did not prove valuable.

### Tasks

- [ ] Count top-level folders and maximum useful depth.
- [ ] Review navigation paths from `home.md`.
- [ ] Measure inbox age and maintenance backlog.
- [ ] Review false-positive rates.
- [ ] Review approval volume.
- [ ] Remove redundant reports, metadata, or indexes.
- [ ] Archive superseded system specs.
- [ ] Update philosophy, strategy, roadmap, and implementation plan with validated learning.

### Acceptance criteria

- Mind remains human-readable and calm;
- Steve spends less time maintaining the system;
- every retained automation has demonstrated value;
- the canonical documentation matches actual behavior.

## First implementation batch after documentation approval

Do not begin until the canonical documentation is reviewed.

Recommended first batch:

1. update `system/README.md` and `home.md` with the canonical chain;
2. create `system/brain-mind-bridge.md`;
3. create `system/knowledge-freshness-standard.md`;
4. validate both standards against three real Mind examples;
5. stop for review before changing automation or content structure.

## Definition of done

The implementation is successful when:

```text
Mind captures continuously,
keeps current truth visible,
turns reviewed insight into durable knowledge,
retrieves relevant context quickly,
flags stale or conflicting knowledge,
preserves history,
and improves through safe human-approved use —
without becoming harder for Steve to read or navigate.
```
