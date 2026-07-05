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
- canonical philosophy and strategy links;
- Brain-Mind bridge contract;
- freshness model and selective review metadata;
- maintenance report contract and report-only surfaces;
- `wiki/log.md` maintenance/proposal surface;
- Graphify outputs and visual graph;
- Brain Core and Brain Console read-only visibility;
- automation, folder, queue, graph, and task contracts;
- human approval before durable writes.

**Implemented through Phases 1–10:**

- persistent Brain-owned queue state;
- debounce, stability detection, and concurrency controls;
- retry and failure-buffer visibility;
- approval and execution gates with kill switch;
- scheduler planning and readiness surfaces;
- kill switch and recovery guidance;
- plan-only large-file nightly fallback;
- optional continuous-processing safety capabilities;
- bounded simplification review (evidence-based, no destructive action).

**Still unresolved or inactive:**

- active autonomous continuous execution (disabled by default; no approved trial has run);
- meaningful time-savings evidence (no before/after baseline exists);
- reduced maintenance-burden evidence (unproven);
- stale-page detector recall for the required freshness-metadata positive case is validated by a deterministic Brain test; broader maintenance value remains unproven;
- demonstrated operational value for every retained automation.

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

### Phase 9 verified outcome (2026-06-18)

**Implemented safety capability (confirmed):**

- stable-file detection and debounce are implemented and tested;
- concurrency cap, failure buffer, and retry exhaustion are implemented;
- large-file nightly fallback is a bounded plan adapter — not active autonomous execution;
- disable and recovery procedures are documented;
- continuous processing remains optional and disabled by default (`continuousEnabled: false`, `watcherEnabled: false`);
- basic Mind use does not depend on continuous processing;
- measurement adapter collects real timestamps and process memory; configuration is clearly separated from measurements; missing evidence returns null with explicit blockers, never zero.

**Unresolved (Phase 9 acceptance criteria not yet satisfied):**

- meaningful time savings relative to manual processing are not yet proven;
- no before/after time-savings comparison exists;
- operational continuous processing has not yet run in a real approved trial.

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

### Phase 10 verified outcome (2026-06-18)

**Confirmed:**

- canonical documentation matches implemented behavior;
- no destructive simplification occurred; all review tasks were bounded and evidence-based;
- continuous processing remains optional and disableable;
- bounded review tasks produced no file deletions or archival actions.

**Partially supported:**

- Mind remains human-readable and calm (structure is unchanged; no folder depth was added).

**Unresolved:**

- stale-page detection recall for the required freshness-metadata positive case is validated (Brain test `mind-maintenance-pilot-loader-stale` covers Mind-style fenced YAML status blocks);
- meaningful time savings remain unproven;
- Steve spends less time maintaining the system: unproven;
- every retained automation has demonstrated value: not yet satisfied (time savings have no baseline and broader maintenance value still requires operational evidence).

### Post-plan operational validation work

The following work is needed after the plan is structurally complete. This is not a new phase — it is the operational validation that determines whether the Phase 9/10 acceptance criteria are eventually satisfied:

- collect before/after maintenance-time evidence;
- continue monitoring stale-page detector quality beyond the validated required freshness-metadata positive case;
- conduct a bounded real continuous-processing trial only after explicit approval;
- review the five human-decision file candidates (see Task 7 and Task 8 pending decisions);
- keep continuous execution disabled until value and safety are demonstrated.

### Post-plan improvement backlog — documentation first

These items are approved for roadmap tracking only. They must be split into implementation-plan tasks before any code, automation, folder migration, or continuous behavior is built.

From the Infinite Brain OS repo review:

- add a lightweight Brain-owned Mind structural validator/report for the exact files, folders, freshness metadata, Graphify output path, maintenance pilot paths, and report outputs that Steve's workflow depends on — implemented in Brain Core as a report-only module/CLI on 2026-07-05;
- add a lightweight session closeout receipt pattern so major AI/repo sessions record branch, commits, changed files, remaining dirty state, decisions, and next task without requiring a heavy transcript archive — implemented as `system/session-closeout-receipt-template.md` on 2026-07-05;
- add processed-capture receipt tracking only when inbox volume makes it necessary, so captures can be traced from intake to ignored/summarized/promoted/task outcome — implemented as `system/processed-capture-receipt-template.md` on 2026-07-05;
- audit Brain `operations/system-configs/**` ownership so canonical config, generated adapter shims, live local state, logs, and machine-specific files are not confused or accidentally committed — implemented as `brain/operations/specs/runtime-system-config-ownership-audit.md` on 2026-07-05;

From the OODA / Infinite Brain transcript review:

- strengthen Mind as the orientation layer: current context, strategy, constraints, trusted thinkers/sources, active projects, and decision principles should be easy for Brain to retrieve as compact briefs — implemented as `system/orientation-brief-template.md` on 2026-07-05;
- define an intake-disposition pattern: approved observations may become ignored items, deterministic actions, knowledge proposals, task proposals, project updates, or maintenance findings, but durable changes remain human-approved;
- add source-quality gates before promotion: newsletters, transcripts, emails, meetings, and external ideas should not become durable orientation just because they were ingested;
- add a lightweight wager/verdict pattern for significant business or workflow changes: proposal, expected improvement, measurement window, evidence source, later verdict, and follow-up action;
- prefer routed model tiers for intake review: deterministic rules first, cheap model for simple classification, stronger model only for high-context or strategic orientation tasks.

These are not new phases and do not authorize continuous processing. They are the next documentation backlog for improving Infinite Brain without making Mind harder to read.

## Current milestone close-out (2026-06-18)

### Complete — manual/report-only operation

The following capabilities are implemented and ready for use without continuous automation:

- human-first Mind usage: capture flows through `capture/inbox/` and review is human-led;
- automatic capture intake: Save-to-Mind places captures in `capture/inbox/` automatically;
- report-only Mind Steward: Brain inspects, classifies, and prepares proposals without durable writes;
- Brain Console and status visibility: Brain Core API exposes queue state, scheduler status, and maintenance reports;
- manual proposal review: proposals appear in `wiki/log.md` for human approval;
- manual Kanban operation: `kanban.md` remains the task source of truth; no automated task writes;
- disabled continuous execution: continuous processing is off by default and unused for current manual operation.

The current release is fully usable without continuous processing. No claim of autonomous self-improvement or black-box operation is made.

### Future automation track — deferred

The following capabilities are not implemented or not approved for current use:

- optional continuous runner activation (disabled by default; requires explicit approval);
- real-world approved continuous-processing trial;
- auto-resume and persisted pause/recovery state;
- self-optimization and feedback learning;
- approval-feedback loop integration;
- automated durable writes beyond current bounded write adapters (requires separate approval);
- demonstrated time savings relative to manual processing.

Do not mark these as defects in the current milestone. They are intentional deferrals.

---

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
