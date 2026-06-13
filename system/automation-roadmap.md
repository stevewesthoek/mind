# Mind Automation Roadmap

**Status:** technical automation sub-roadmap  
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/mind-roadmap.md`, `system/mind-implementation-plan.md`

This roadmap defines the remaining automation work for the automated Infinite Brain runtime.

It does not lead Mind strategy. The canonical roadmap is `system/mind-roadmap.md`. This file should only define the technical automation sequence inside that wider human-first direction.

The cleanup, contract, graph, and report-only Mind Steward preflight foundation is complete. The remaining work should be implemented in small phases with report-only mode first, then approved writes, then automation.

## Current completed foundation

Implemented:

- clear folder/root/capture contracts;
- `kanban.md` protected as current task source of truth;
- Graphify visual graph renderer;
- graph refresh wrapper: `tools/update-graph.sh`;
- Brain-side inbox inspection preflight;
- Brain-side classifier dry-run;
- Brain-side queue dry-run;
- Brain Core status endpoint: `GET /scheduler/mind-steward/status`;
- Brain Console read-only visibility;
- operator runbook for safe preflights.

Not implemented:

- automatic Mind writes;
- automatic capture moves;
- automatic source routing;
- automatic wiki writes;
- automatic Kanban/task writes;
- filesystem watcher;
- continuous runner.

## Phase A — Persistent inbox queue

Goal:

Create durable queue state for `capture/inbox/` candidates.

Output:

- queue state stored in Brain runtime first;
- no Mind writes;
- no capture moves;
- no Kanban changes.

Status: next recommended automation phase.

## Phase B — Auto-process inbox into suggestions

Goal:

Use Mind Steward + AI Model Selector to turn captures into structured suggestions.

Output examples:

- proposed summary;
- proposed tags;
- proposed destination;
- proposed wiki/source/task action;
- confidence and review reason.

Boundary:

Suggestions only. No direct writes to `wiki/`, `sources/`, `tasks/`, or `kanban.md`.

## Phase C — Approved wiki writes

Goal:

Allow reviewed suggestions to write durable wiki notes.

Boundary:

- human approval first;
- preserve source references;
- write only to documented wiki paths;
- no root writes.

## Phase D — Approved source routing

Goal:

Move or copy source material from intake to documented `sources/` destinations after approval.

Boundary:

- no deletion;
- preserve original reference;
- log routing decisions.

## Phase E — Task proposal and Kanban sync

Goal:

Generate task suggestions and eventually sync durable task records with `kanban.md`.

Boundary:

- `kanban.md` remains source of truth until lossless migration is validated;
- no automatic board overwrite;
- preserve every legacy card, title, status, date, tag, and subtask.

## Phase F — Auto-update graph

Goal:

Keep the graph data and visual graph fresh.

Current implementation:

```bash
bash tools/update-graph.sh
```

This refreshes:

- `.graphify-out/GRAPH_REPORT.md`;
- `.graphify-out/graph.json`;
- `.graphify-out/graph.html`;
- `system/reports/graph-refresh-latest.json`;
- `system/reports/graph-refresh-latest.md`.

Next step:

Run this manually or through a scheduled Brain-side report-only job before any continuous automation is enabled.

Status: implementation tool added; scheduling not enabled.

## Phase G — Scheduled/on-demand runner

Goal:

Run approved automation on a schedule or explicit operator action.

Boundary:

- Brain Core / scheduler owned;
- feature flags required;
- queue/throttle enforced;
- no background watcher yet.

## Phase H — Continuous watcher

Goal:

Process captures shortly after they land.

Boundary:

Only after Phases A–G are proven.

Required controls:

- debounce;
- queue;
- max concurrency;
- retry limits;
- large-file fallback;
- dashboard visibility;
- kill switch;
- no unreviewed destructive actions.

## Phase I — Monitoring and recovery

Goal:

Make the automated runtime observable and recoverable.

Required surfaces:

- Brain Console status;
- latest run reports;
- failed item list;
- retry controls;
- audit log;
- local machine load checks.

## Guiding rule

Every phase should move through this sequence:

```text
report-only
→ proposed writes
→ approved writes
→ scheduled execution
→ continuous execution
```

Do not skip directly to continuous execution.
