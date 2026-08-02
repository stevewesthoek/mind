# Tools

Utility scripts for Mind live here.

## Kanban export

`export-kanban-tasks.mjs` exports the current Obsidian Kanban board into structured data without modifying `kanban.md`.

Default JSON to stdout:

```bash
node tools/export-kanban-tasks.mjs
```

Markdown summary to stdout:

```bash
node tools/export-kanban-tasks.mjs --markdown
```

Write JSON export to the default report path:

```bash
node tools/export-kanban-tasks.mjs --write
```

Default write output:

```text
system/reports/kanban-export-latest.json
```

Write to a custom repo-relative path:

```bash
node tools/export-kanban-tasks.mjs --write --output system/reports/kanban-export-test.json
```

## Graph visualization

`render-graph-html.mjs` renders the generated Graphify data into a clickable static HTML graph.

By default, the renderer now focuses on human-readable Markdown knowledge paths and filters out generated/plugin/code-heavy internals such as `.obsidian/`, `.graphify-out/`, caches, and non-Markdown implementation nodes.

Historical compatibility renderer (not an active Graphify execution path while
the Brain profile is disabled):

```bash
node tools/render-graph-html.mjs
```

Historical compatibility input:

```text
graphify-out/graph.json
```

Historical compatibility output:

```text
graphify-out/graph.html
```

Render more nodes or links:

```bash
node tools/render-graph-html.mjs --max-nodes 2000 --max-links 5000
```

The generated HTML is a historical compatibility artifact. If a future Brain receipt authorizes regeneration, derive it from `.graphify-out/graph.json`, never hand-edit it.

## Graph refresh

`update-graph.sh` is retained as a historical compatibility wrapper. It must
not be invoked while the Brain Graphify profile is disabled/fail-closed.

Run from the Mind repo root:

```bash
bash tools/update-graph.sh
```

It runs:

```text
graphify update .
node tools/render-graph-html.mjs
```

It writes refresh reports to:

```text
system/reports/graph-refresh-latest.json
system/reports/graph-refresh-latest.md
```

The future contained runner must write only under `runtime/local/graphify/` and
must not write generated files to the repository root.

## Safety

- The Kanban exporter reads `kanban.md` and does not modify it.
- `kanban.md` remains the current task source of truth.
- Do not use generated exports to overwrite `kanban.md` until the task sync validation rules are implemented.
- The historical graph renderer reads `.graphify-out/graph.json` and writes generated HTML only when explicitly run locally under an authorized future contained profile.
- Do not manually edit generated graph artifacts as source knowledge.
- See `../system/task-kanban-contract.md`, `../system/task-sync-spec.md`, and `../system/graph-visualization-spec.md`.
