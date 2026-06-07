# Mind Cleanup Phase Summary — 2026-06-06

This report summarizes the completed Mind cleanup/documentation phases and the remaining implementation work.

## Completed and committed

### Phase 1 — Inventory and terminology cleanup

Completed:

- tracked the factual Mind inventory report;
- replaced confirmed active old `model router` wording with `Mind Steward`;
- preserved product/archived `model routing` references where they did not mean Mind Steward.

### Phase 2 — Kanban/task preservation

Completed:

- created a lossless Kanban inventory report;
- documented that `kanban.md` is the current daily task source of truth;
- documented that `live/tasks.md` is a Mind Steward summary surface;
- aligned router task targets with `kanban.md`.

### Phase 3 — Folder/root/capture contracts

Completed:

- documented current top-level folder purposes;
- documented root cleanliness rules;
- documented `capture/inbox/` as the intake landing zone;
- added README coverage for important folders.

### Phase 4 — Automation and Graphify contracts

Completed:

- documented the current Save-to-Mind → Mind Steward → AI Model Selector flow;
- documented nightly classification as current behavior;
- documented future on-arrival processing requirements;
- documented current Graphify output and future visual graph target;
- documented generated-output handling.

### Phase 5 — Kanban/task sync design

Started and completed first design slice:

- documented safe future task-record shape;
- documented no-data-loss Kanban sync requirements;
- documented that `tasks/` is reserved and not active yet.

## Current source-of-truth rules

- `kanban.md` is the current task source of truth.
- `live/tasks.md` is a summary surface.
- `capture/inbox/` is the intake landing zone.
- `wiki/` is durable compiled knowledge.
- `sources/` is raw evidence/source material.
- `graphify-out/` contains generated graph output.
- `system/` contains operating contracts and reports.

## Remaining uncommitted items at last status check

These are intentionally outside the completed cleanup commits:

- `kanban.md`
- `wiki/areas/theological-studies/dance-of-life/README.md`
- `wiki/log.md`
- untracked `capture/inbox/*.md` files
- untracked generated `graphify-out/*` files
- untracked `wiki/organisations/prochat/brand/ProChat OS Refinement Report.md`

## Remaining implementation phases

### Phase 6 — Kanban export tool

Goal:

Create a read-only export/validation tool that parses `kanban.md` into structured task records in a temporary report or JSON output.

Requirements:

- no board modification;
- preserve raw card text;
- preserve columns, checked state, tags, dates, and subtasks;
- produce validation counts matching the Kanban inventory;
- do not make `tasks/` active yet.

### Phase 7 — Graph visualizer

Goal:

Generate a clickable visual graph from `graphify-out/graph.json`.

Requirements:

- output should be `graphify-out/graph.html` or another documented generated artifact;
- no source-note modifications;
- no root writes;
- regeneration command documented;
- validation that the file opens locally.

### Phase 8 — Real-time inbox processing implementation

Goal:

Implement throttled on-arrival capture processing through standard channels.

Required path:

```text
Brain Core / scheduler
→ Mind Steward job
→ AI Model Selector
→ local model when suitable
→ documented Mind output surfaces
```

Current progress:

- Brain-side approved, feature-flagged inbox preflight implemented.
- Brain-side approved, feature-flagged selector-backed classifier dry-run implemented.
- Brain-side approved, feature-flagged queue/throttle dry-run implemented.
- Read-only Brain Core status endpoint implemented: `GET /scheduler/mind-steward/status`.
- Brain Console Center overview card implemented for Mind Steward preflight visibility.
- Operator runbook documented in `system/runbooks/mind-steward-preflight-runbook.md`.
- Queue/throttle design documented in `system/inbox-queue-throttle-spec.md`.
- Real-time watcher is not implemented.
- Mind writes remain disabled.
- Kanban writes remain disabled.

Remaining requirements:

- debounce;
- queueing;
- max concurrent local AI jobs;
- retry policy;
- large-file fallback;
- failure routing;
- logs;
- no root writes;
- no Kanban overwrite.

### Phase 9 — Folder cleanup/migration

Goal:

Move, remove, or reorganize folders only after dependencies are checked.

Requirements:

- no data loss;
- check Save-to-Mind, Mind Steward, Brain Core/scheduler, AI Model Selector, Graphify, Obsidian, video/transcript capture, and Kanban/task references;
- dry-run first;
- human approval before destructive or broad moves.

## Recommended next step

Start Phase 6 with a read-only Kanban export script or report generator.

Do not implement Phase 8 real-time automation before the queue/throttle path is confirmed through Brain Core or the existing scheduler.
