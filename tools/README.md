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

Generate the default visual graph:

```bash
node tools/render-graph-html.mjs
```

Default input:

```text
graphify-out/graph.json
```

Default output:

```text
graphify-out/graph.html
```

Render more nodes or links:

```bash
node tools/render-graph-html.mjs --max-nodes 2000 --max-links 5000
```

The generated HTML is a refreshable artifact. It should be regenerated from `graphify-out/graph.json`, not hand-edited.

## Safety

- The Kanban exporter reads `kanban.md` and does not modify it.
- `kanban.md` remains the current task source of truth.
- Do not use generated exports to overwrite `kanban.md` until the task sync validation rules are implemented.
- The graph renderer reads `graphify-out/graph.json` and writes generated HTML only when run locally.
- Do not manually edit generated graph artifacts as source knowledge.
- See `../system/task-kanban-contract.md`, `../system/task-sync-spec.md`, and `../system/graph-visualization-spec.md`.
