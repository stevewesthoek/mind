# Mind Automation Roadmap

**Status:** technical automation sub-roadmap  
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/mind-roadmap.md`, `system/mind-implementation-plan.md`

This roadmap defines the remaining automation work for the automated Infinite Brain runtime.

It does not lead Mind strategy. The canonical roadmap is `system/mind-roadmap.md`. This file should only define the technical automation sequence inside that wider human-first direction.

The cleanup, contract, graph, and report-only Mind Steward preflight foundation is complete. The remaining work should be implemented in small phases with report-only mode first, then approved writes, then automation.

## Current foundation

Mind-owned policy boundaries established:

- clear folder/root/capture contracts;
- `kanban.md` protected as current task source of truth;
- operator runbook for safe preflights.

Brain-owned capability implementation status (including scheduler, queue, classifier, watcher, Graphify, and Console) is authoritative only in Brain's live-status runbook at `/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md`.

Not authorized:

- automatic Mind writes;
- automatic capture moves;
- automatic source routing;
- automatic wiki writes;
- automatic Kanban/task writes;
- filesystem watcher;
- continuous runner.

## Phase A — Persistent inbox queue

Goal:

Create durable queue state for canonical `inbox/new/` candidates.

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
- proposed knowledge/resource/task action;
- confidence and review reason.

Boundary:

Suggestions only. No direct writes to `knowledge/`, `resources/`, `projects/`, `organizations/`, or `kanban.md`.

## Phase C — Approved knowledge writes

Goal:

Allow reviewed suggestions to write durable knowledge notes.

Boundary:

- human approval first;
- preserve source references;
- write only to documented `knowledge/` or canonical domain-authority paths;
- no root writes.

## Phase D — Approved resource routing

Goal:

Move or copy source material from intake to documented `resources/` or `faith/resources/` destinations after approval.

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

Historical compatibility tooling:

```bash
bash tools/update-graph.sh
```

The legacy wrapper historically refreshed:

- `.graphify-out/GRAPH_REPORT.md`;
- `.graphify-out/graph.json`;
- `.graphify-out/graph.html`;
- `system/reports/graph-refresh-latest.json`;
- `system/reports/graph-refresh-latest.md`.

Current status:

Graphify execution status is owned by Brain's live-status runbook. Do not invoke the legacy wrapper or infer current execution from compatibility output. A future contained runner must publish under `runtime/local/graphify/` with receipt and source-hash freshness evidence.

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
