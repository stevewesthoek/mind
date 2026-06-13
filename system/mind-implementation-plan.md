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
- [ ] Add the canonical chain to `system/README.md`.
- [ ] Add a short philosophy/strategy link section to `home.md`.
- [ ] Mark `system/automation-roadmap.md` as a subordinate automation track.
- [ ] Review all four documents for duplicated or conflicting rules.

### Acceptance criteria

- one clear chain exists: philosophy → strategy → roadmap → implementation plan;
- existing contracts remain factual and linked;
- no content folders are moved or renamed;
- no automation behavior changes.

## Phase 1 — Human orientation

**Goal:** make the current Mind system understandable from one page.

### Tasks

- [ ] Review `home.md` against the actual current system.
- [ ] Keep `home.md` concise enough to function as a human user manual.
- [ ] Add a compact lifecycle:
  `capture → review → place → use → revalidate → supersede/archive`.
- [ ] Explain the difference between:
  - current state in `live/`;
  - durable knowledge in `wiki/`;
  - evidence in `sources/`;
  - historical material in `archive/`.
- [ ] Review `live/dashboard.md` for broken, stale, or overly technical navigation.
- [ ] Verify each important top-level folder has one readable index or README.
- [ ] Avoid creating new root files beyond documented exceptions.

### Acceptance criteria

- Steve can explain the system after reading only `home.md`;
- current priorities, decisions, and projects are reachable in one or two steps;
- no additional top-level folders are introduced;
- root and folder contracts match reality.

## Phase 2 — Brain–Mind bridge contract

**Goal:** standardize cross-repo communication while preserving ownership.

### Tasks

- [x] Create `system/brain-mind-bridge.md`.
- [x] Define Brain-owned and Mind-owned information.
- [x] Define allowed Brain → Mind proposal types:
  - capture classification;
  - research summary;
  - decision proposal;
  - maintenance proposal;
  - project/status handoff;
  - task proposal.
- [x] Define allowed Mind → Brain context types:
  - approved strategy;
  - current priorities;
  - durable decisions;
  - project context;
  - personal constraints and preferences;
  - reviewed research conclusions.
- [x] Define one compact cross-repo envelope.
- [x] Decide which fields are required versus optional.
- [x] Define default proposal destinations.
- [x] Define approval and write boundaries.
- [x] Define source, supersession, and rejection behavior.
- [x] Compare the bridge contract with Brain's current memory/handoff policies.

### Acceptance criteria

- neither repo needs to guess ownership or destination;
- no entire-file duplication is required across repos;
- personal/business truth cannot be silently promoted into global AI rules;
- Brain runtime data does not become duplicated Mind truth.

## Phase 3 — Freshness and knowledge-state standard

**Goal:** make changing knowledge maintainable without burdening timeless notes.

### Tasks

- [x] Create `system/knowledge-freshness-standard.md`.
- [x] Define statuses:
  `draft`, `current`, `review-needed`, `superseded`, `archived`.
- [x] Define optional fields:
  `last_reviewed`, `review_after`, `supersedes`.
- [x] Identify content classes that need freshness checks:
  - business strategy;
  - active projects;
  - prices and offers;
  - technical architecture;
  - services/vendors;
  - legal/regulatory research;
  - operating procedures.
- [x] Identify content classes that should not require review dates.
- [x] Define contradiction handling.
- [x] Define supersession and archive behavior.
- [x] Add examples that are readable in Obsidian.
- [x] Validate the standard against three changing Mind pages before applying metadata.
- [x] Apply pilot fields to exactly three reviewed pages:
  - `router/00-current-context.md`;
  - `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`;
  - `wiki/organisations/prochat/brand/prochat-os-strategy.md`.

### Acceptance criteria

- changing truth can be distinguished from historical truth;
- timeless notes remain lightweight;
- no bulk frontmatter migration is required;
- human readers can understand status without a schema reference.

## Phase 4 — Report-only maintenance intelligence

**Goal:** test self-healing suggestions without changing durable content.

### Mind tasks

- [ ] Define report formats and review surfaces.
- [ ] Add clear dismissal and false-positive behavior.
- [ ] Define which reports belong in `system/reports/` versus `wiki/log.md`.
- [ ] Define evidence requirements for each suggestion type.

### Brain implementation tasks

- [ ] Add stale-page candidate detection.
- [ ] Add duplicate-page candidate detection.
- [ ] Add contradiction candidate detection.
- [ ] Add completed-but-still-active detection.
- [ ] Add source-reference gap detection.
- [ ] Add durable-insight-trapped-in-capture detection.
- [ ] Route jobs through Brain Core, scheduler, Mind Steward, and AI Model Selector.
- [ ] Expose status and latest reports in Brain Console.

### Validation

- [ ] Run each report on a bounded fixture set.
- [ ] Measure false positives.
- [ ] Confirm no Mind content changes.
- [ ] Confirm suggestions cite exact source paths.
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
