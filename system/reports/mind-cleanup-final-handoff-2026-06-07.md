# Mind Cleanup Final Handoff — 2026-06-07

This handoff summarizes the completed Mind cleanup, safety, graph, task, and Mind Steward preflight work.

## Completed phases

### Phase 1 — Inventory and terminology cleanup

Completed:

- factual Mind inventory report tracked;
- confirmed old active `model router` references replaced with `Mind Steward`;
- product and archived `model routing` references preserved when they did not mean Mind Steward.

### Phase 2 — Kanban/task preservation

Completed:

- lossless Kanban inventory report created;
- `kanban.md` documented as current task source of truth;
- `live/tasks.md` documented as Mind Steward summary surface;
- router docs aligned to point task routing at `kanban.md`.

### Phase 3 — Folder/root/capture contracts

Completed:

- root cleanliness rules documented;
- `capture/inbox/` documented as intake landing zone;
- `capture/failed/` documented as safety buffer;
- top-level folder purposes documented;
- README coverage improved for key folders.

### Phase 4 — Graph, generated output, and automation contracts

Completed:

- Graphify output contract documented;
- visual graph renderer added;
- `.graphify-out/graph.html` generated and tracked as a convenience artifact;
- generated-output policy documented;
- Save-to-Mind → Mind Steward → AI Model Selector automation boundary documented.

### Phase 5 — Kanban/task sync design

Completed:

- safe future task sync specification documented;
- `tasks/` documented as reserved and inactive;
- read-only Kanban export tool added at `tools/export-kanban-tasks.mjs`;
- tool usage documented.

### Phase 6 — Visual graph implementation

Completed:

- Graphify HTML renderer added at `tools/render-graph-html.mjs`;
- graph refresh wrapper added at `tools/update-graph.sh`;
- visual graph generated at `.graphify-out/graph.html`;
- graph refresh reports written to `system/reports/graph-refresh-latest.json` and `system/reports/graph-refresh-latest.md` when the wrapper runs;
- home/system/graph docs updated to reflect current visual graph availability.

### Phase 7 / 8 — Mind Steward preflight pipeline

Completed across Brain and Mind:

- Brain-side inbox inspection preflight implemented;
- Brain-side selector-backed classifier dry-run implemented;
- Brain-side queue/throttle dry-run implemented;
- Brain Core read-only status endpoint implemented: `GET /scheduler/mind-steward/status`;
- Brain Console read-only visibility implemented;
- Mind runbook added for safe preflight operation.

## Current source-of-truth rules

- `kanban.md` is the current task source of truth.
- `live/tasks.md` is a Mind Steward summary surface.
- `capture/inbox/` is the intake landing zone.
- `capture/failed/` is the failure/safety buffer.
- `wiki/` is durable compiled knowledge.
- `sources/` is raw evidence/source material.
- `.graphify-out/` contains generated graph output.
- `.graphify-out/graph.html` is intentionally tracked as a convenience visual artifact.
- `system/` contains operating contracts, reports, specs, and runbooks.

## Current Phase 8 safety state

Implemented:

- report-only inbox preflight;
- report-only classifier dry-run;
- report-only queue dry-run;
- read-only Brain Core status endpoint;
- read-only Brain Console visibility;
- operator runbook.

Not implemented:

- filesystem watcher;
- continuous background processing;
- automatic Mind writes;
- automatic capture moves;
- automatic wiki writes;
- automatic source routing;
- automatic Kanban/task sync writes.

## Remaining working-tree items at last check

These items were not part of the cleanup commits and need manual or later automated review:

```text
M .obsidian/graph.json
M .graphify-out/graph.html
M kanban.md
M wiki/areas/theological-studies/dance-of-life/README.md
M wiki/log.md
?? capture/inbox/*.md
?? .graphify-out/.graphify_labels.json
?? .graphify-out/.graphify_root
?? .graphify-out/GRAPH_REPORT.md
?? .graphify-out/cache/
?? .graphify-out/graph.json
?? .graphify-out/manifest.json
?? wiki/organisations/prochat/brand/ProChat OS Refinement Report.md
```

Do not bulk commit or delete these without review.

## Recommended next phase

The next phase should not be a watcher yet.

Recommended sequence:

1. Review and process current `capture/inbox/` backlog using report-only preflights.
2. Decide which generated Graphify artifacts should be tracked versus ignored.
3. Decide whether `.graphify-out/graph.html` should be refreshed/committed after each graph run.
4. Design a reviewed write proposal format for Mind Steward suggestions.
5. Only then add approved write behavior for wiki/source/task suggestions.

## Full automation scope

Full automation is possible, but it should be implemented in separate controlled phases:

1. inbox processing with persistent queue;
2. proposed wiki writes;
3. proposed source routing;
4. task sync proposal generation;
5. approved task/Kanban sync;
6. graph refresh automation;
7. scheduled/continuous runner;
8. monitoring and recovery.

Each phase should start report-only, then move to approved writes only after validation.
