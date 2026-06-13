# Mind Roadmap

**Status:** canonical roadmap  
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`  
**Purpose:** sequence the transition from the current Mind vault into a human-first Infinite Brain system.

## Roadmap rule

The roadmap must improve lifecycle and retrieval before adding automation.

```text
clarify the system
→ standardize the bridge
→ improve freshness and maintenance
→ enable approved writes
→ automate carefully
→ evaluate and simplify
```

The existing `system/automation-roadmap.md` remains the detailed automation sub-roadmap. This document leads it and defines the human/product order.

## Current foundation

Already present:

- shallow top-level structure;
- `home.md` human user manual;
- `capture/inbox/` and `capture/failed/` boundaries;
- `live/`, `wiki/`, `sources/`, and `archive/` roles;
- `kanban.md` protected as task source of truth;
- Mind Steward report-only classification;
- `wiki/log.md` maintenance/proposal surface;
- Graphify outputs and visual graph;
- Brain Core and Brain Console read-only visibility;
- automation, folder, queue, graph, and task contracts;
- human approval before durable writes.

The missing layer is a canonical philosophy, strategy, standardized Brain–Mind bridge, freshness model, and implementation sequence.

## Phase 0 — Canonical direction

**Goal:** make the philosophy and strategy explicit before changing structure or automation.

Deliverables:

- `system/infinite-brain-philosophy.md`;
- `system/mind-strategy.md`;
- `system/mind-roadmap.md`;
- `system/mind-implementation-plan.md`;
- links from `system/README.md` and `home.md`.

Exit criteria:

- philosophy → strategy → roadmap → implementation plan is clear;
- existing contracts are subordinate to the canonical chain;
- no content restructuring has occurred.

## Phase 1 — Human entrypoint and semantic orientation

**Goal:** make Mind understandable from one human entrypoint without adding folder depth.

Deliverables:

- refine `home.md` as the canonical human start page;
- align `live/dashboard.md` with current-state navigation;
- add a compact lifecycle explanation;
- document current truth versus durable knowledge versus source evidence;
- ensure top-level folder descriptions match actual use.

Exit criteria:

- a human can understand where information belongs within five minutes;
- current priorities and decisions are reachable in one or two steps;
- no new top-level folders are needed.

## Phase 2 — Brain–Mind bridge standard

**Goal:** define safe, normalized communication without merging repository ownership.

Deliverables:

- `system/brain-mind-bridge.md`;
- normalized cross-repo brief envelope;
- allowed Brain → Mind proposal types;
- allowed Mind → Brain context types;
- approval boundaries;
- source and supersession rules;
- one documented inbox/review destination for each proposal type.

Exit criteria:

- no automation needs to guess where cross-repo information belongs;
- Brain cannot silently redefine Mind truth;
- Mind does not duplicate Brain runtime or system documentation.

## Phase 3 — Freshness and knowledge-state model

**Goal:** prevent changing knowledge from becoming silently stale.

Deliverables:

- small status vocabulary: `draft`, `current`, `review-needed`, `superseded`, `archived`;
- selective `last_reviewed` and `review_after` guidance;
- rules for contradiction detection;
- rules for supersession and archive history;
- freshness guidance for strategy, projects, vendors, pricing, technical architecture, and procedures;
- no mandatory metadata on timeless notes.

Exit criteria:

- changing knowledge can be identified and reviewed;
- current truth is clearly distinguishable from old truth;
- the human reading experience remains simple.

## Phase 4 — Maintenance intelligence in report-only mode

**Goal:** make self-healing visible before allowing writes.

Deliverables:

- stale-page report;
- duplicate-candidate report;
- contradiction-candidate report;
- completed-but-still-active report;
- source-reference gap report;
- durable-insight-trapped-in-capture report;
- clear false-positive and dismissal path.

Exit criteria:

- reports are useful enough to save human maintenance time;
- no durable content is changed automatically;
- recommendations cite the pages and evidence involved.

## Phase 5 — Approved bounded writes

**Goal:** allow safe, explicit changes after review.

Deliverables:

- approved wiki update workflow;
- approved live-page status update workflow;
- approved archive/supersede workflow;
- approved source-routing workflow;
- verified write log;
- rollback or recovery instructions.

Exit criteria:

- every write is bounded to an approved path and action;
- source references are preserved;
- current truth changes are reviewable;
- no broad AI rewrite is possible.

## Phase 6 — Capture-to-knowledge improvement

**Goal:** reduce the amount of useful knowledge trapped in capture.

Deliverables:

- persistent inbox queue;
- structured classification suggestions;
- destination proposals;
- duplicate checks before durable creation;
- source preservation;
- reviewed promotion into `live/`, `wiki/`, `sources/`, `archive/`, or task surfaces.

Exit criteria:

- captures move through a predictable lifecycle;
- duplicate durable pages are reduced;
- rejected suggestions remain safe and traceable.

## Phase 7 — Task and project continuity

**Goal:** connect knowledge, decisions, projects, and tasks without replacing the human Kanban prematurely.

Deliverables:

- task proposals linked to source knowledge;
- project status review suggestions;
- completed-project archive suggestions;
- approved task synchronization only after lossless validation;
- preserve `kanban.md` as source of truth until migration is proven.

Exit criteria:

- no task loss;
- active work reflects current knowledge;
- project history remains retrievable.

## Phase 8 — Scheduled and on-demand automation

**Goal:** run proven workflows through Brain with observability and controls.

Deliverables:

- Brain-owned scheduler jobs;
- feature flags;
- queues, throttling, retries, and kill switch;
- Brain Console visibility;
- bounded on-demand actions;
- scheduled graph and maintenance refreshes.

Exit criteria:

- automation is recoverable and observable;
- no unbounded watcher is needed for ordinary use;
- human review remains the default for important truth changes.

## Phase 9 — Continuous processing where justified

**Goal:** enable near-real-time behavior only for workflows that proved useful and safe.

Deliverables:

- stable-file detection;
- debounce and concurrency limits;
- large-file fallback;
- failure buffer;
- bounded continuous runner;
- measured machine and maintenance impact.

Exit criteria:

- continuous processing saves more time than it creates complexity;
- failures do not lose data or corrupt current truth;
- the system can be paused instantly.

## Phase 10 — Evaluation and simplification

**Goal:** ensure Infinite Brain growth makes Mind simpler, not heavier.

Review:

- folder count and depth;
- navigation steps;
- capture backlog age;
- stale-page detection quality;
- false-positive maintenance suggestions;
- approval burden;
- duplicate reduction;
- retrieval speed for humans and AI;
- usefulness of Brain–Mind exchange;
- whether any files, metadata, or workflows can be removed.

Exit criteria:

- Mind remains calm and human-readable;
- automation reduces work;
- the architecture is still understandable without technical expertise.

## Roadmap guardrails

Do not:

- reorganize the vault before contracts and acceptance criteria are clear;
- add top-level folders to represent every state;
- copy Brain's technical entrypoint structure into Mind;
- enable automatic durable writes before report-only quality is proven;
- treat Graphify as the human navigation system;
- duplicate runtime state from Brain into Mind;
- replace `kanban.md` before lossless task synchronization is verified.

## Roadmap success statement

```text
Mind becomes a persistent, self-improving human knowledge system while remaining easier to read, easier to trust, and easier to maintain than before.
```
