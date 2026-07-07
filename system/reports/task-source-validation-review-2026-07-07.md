# Task Source Validation Review — 2026-07-07

**Task:** Task O — Batch 2B task validation review  
**Status:** validation review only  
**Boundary:** no task files were edited in this batch.

## Files inspected

- `tasks.md`
- `kanban.md`
- `home.md`
- `system/folder-contract.md`
- `system/task-kanban-contract.md`
- `system/task-sync-spec.md`
- `system/reports/task-surface-migration-precheck-2026-07-07.md`

## Copy validation

`tasks.md` and `kanban.md` still match exactly.

```text
contentMatches: true
kanban.md bytes: 4836
tasks.md bytes: 4836
```

This confirms the target file is a faithful validation copy at the time of this review.

## Decision

`tasks.md` should **not** replace `kanban.md` immediately.

`kanban.md` remains the current task source of truth because:

- `home.md` says the target path is `tasks.md`, but `kanban.md` remains the compatibility surface during migration;
- `system/folder-contract.md` says `kanban.md` is retained until task migration is validated;
- `system/task-kanban-contract.md` defines `kanban.md` as the current daily task board and source of truth;
- `system/task-sync-spec.md` requires lossless, reversible validation before `kanban.md` stops being source of truth;
- Steve has not yet confirmed Obsidian/Kanban plugin behavior on `tasks.md`.

## Human and Obsidian validation still required

Before switching to `tasks.md`, Steve should confirm:

1. `tasks.md` opens correctly in Obsidian;
2. the Obsidian Kanban plugin recognizes `tasks.md` as a board;
3. board columns, nested subtasks, completion dates, tags, and plugin settings display correctly;
4. normal daily editing behavior works on `tasks.md`;
5. no mobile/desktop Obsidian Git workflow assumes the old `kanban.md` name.

## Brain-side validation still required

Before switching the source of truth, Brain should validate:

1. task readers accept `tasks.md` as an approved task source;
2. task write approval accepts only explicit `tasks.md` or legacy `kanban.md` paths during compatibility;
3. no automatic task write is enabled by the rename/copy;
4. generated or reviewed task summaries still treat `live/tasks.md` as a report surface;
5. any task-sync/export validation can compare `kanban.md` and `tasks.md` without data loss;
6. all active docs that instruct humans or agents where to edit tasks are updated only after Steve approves the switch.

## `live/tasks.md` handling

`live/tasks.md` should remain a report/summary surface for now.

It should not become the source of truth and should not be merged into `tasks.md` automatically. Later migration can move it to one of these locations after human review:

- `system/reports/task-summary.md` if it is a generated status/report surface;
- `inbox/processed/task-summary.md` if it is a review/proposal surface;
- `history/` if it becomes obsolete.

## Recommended next step

Run a human/Obsidian validation pass on `tasks.md` before any source-of-truth switch.

If that passes, the next safe batch should be a documentation-only switch-prep plan that lists exactly which human-facing docs, Brain validators, and task readers must change before `tasks.md` becomes canonical.
