# Tasks

This folder is reserved for future durable task records.

## Current status

`tasks/` is not the active task source of truth yet.

Current task source of truth:

```text
kanban.md
```

Current task summary surface:

```text
live/tasks.md
```

## Future direction

A future no-data-loss migration may create structured task records here and then generate or synchronize `kanban.md` from those records.

That migration is not active yet.

## Rules

- Do not manually move Kanban cards here until the task sync process is implemented and validated.
- Do not delete or rewrite `kanban.md` from this folder.
- Do not treat this folder as complete task state yet.
- Preserve all legacy Kanban cards, titles, statuses, dates, tags, and subtasks.

See:

- `../system/task-kanban-contract.md`
- `../system/task-sync-spec.md`
- `../system/reports/kanban-inventory-2026-06-06.md`
