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

## Safety

- The exporter reads `kanban.md` and does not modify it.
- `kanban.md` remains the current task source of truth.
- Do not use generated exports to overwrite `kanban.md` until the task sync validation rules are implemented.
- See `../system/task-kanban-contract.md` and `../system/task-sync-spec.md`.
