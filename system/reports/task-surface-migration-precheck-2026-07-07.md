# Task Surface Migration Precheck — 2026-07-07

**Task:** Task O — Batch 2 task surface migration precheck  
**Status:** planning/precheck only  
**Boundary:** no task files moved or edited in this batch.

## Current task surfaces

| Path | Status | Finding |
|------|--------|---------|
| `kanban.md` | exists | Active Obsidian Kanban board and current human task source of truth. |
| `tasks.md` | absent | Target path exists in contracts only; no file has been created yet. |
| `live/tasks.md` | exists | Short Mind Steward task summary/report surface, not the live board. |

## Evidence summary

`kanban.md` contains the real task board with Kanban plugin frontmatter and columns including Backlog, To Do, Doing, Done, Focus, and Project ideas. It also contains nested subtasks and completed-task date markers.

`live/tasks.md` is a small summary page that says current tasks should be summarized by Mind Steward and explicitly states that existing `kanban.md` remains the daily board.

`home.md` already says:

- target path after migration: `tasks.md`;
- compatibility surface during migration: `kanban.md`;
- keep using the active task surface until lossless task-sync implementation is validated.

`system/folder-contract.md` already records `tasks.md` as the target task source and `kanban.md` as the legacy task board retained until validation.

## Decision

Do **not** move `kanban.md` to `tasks.md` yet.

Recommended next action is a **copy-first validation batch**, not a move:

1. create `tasks.md` from `kanban.md` in a later approved batch;
2. preserve `kanban.md` in place while Obsidian Kanban/plugin behavior, Brain task readers, and lossless round-trip expectations are validated;
3. compare `tasks.md` and `kanban.md` after validation;
4. only switch the human task source of truth after Steve confirms the target file works in Obsidian and Brain validation passes;
5. only then decide whether to retire, archive, or keep `kanban.md` as a compatibility fallback.

## Why not move now

Moving now is not safe because:

- `tasks.md` does not exist yet;
- `kanban.md` contains active personal, business, product, family, and faith-related tasks;
- the file uses Obsidian Kanban plugin frontmatter;
- losing board/plugin behavior would damage the daily operating surface;
- `live/tasks.md` is not equivalent to `kanban.md` and should not be merged automatically;
- a copy-first strategy is reversible and lets both Brain and Obsidian validate before the source of truth changes.

## Proposed Batch 2A — copy-first task validation

**Goal:** create a target `tasks.md` copy for validation without retiring `kanban.md`.

Candidate action in a later approved batch:

| From | To | Mode |
|------|----|------|
| `kanban.md` | `tasks.md` | copy-first; preserve `kanban.md` |

Validation before switching source of truth:

- confirm `tasks.md` opens correctly in Obsidian;
- confirm Kanban plugin behavior is acceptable on `tasks.md`, or decide to keep `kanban.md` for plugin-specific workflow;
- run Brain task compatibility validation against `tasks.md`;
- confirm no task lines were lost or reordered unexpectedly;
- confirm `live/tasks.md` remains a report/summary surface, not the source of truth;
- update `home.md` and `system/folder-contract.md` only after Steve approves the switch.

## Proposed handling for `live/tasks.md`

Do not migrate `live/tasks.md` with the task source of truth.

Treat it as a report/summary surface. Later options:

- move to `system/reports/task-summary.md` if it remains generated/report-like;
- move to `inbox/processed/task-summary.md` if it is a review/proposal surface;
- archive to `history/` if it becomes obsolete after task migration.

Human decision required before moving `live/tasks.md`.

## Batch 2 hold paths

| Path | Hold reason |
|------|-------------|
| `kanban.md` | Active daily board; do not move before copy-first validation. |
| `tasks.md` | Target absent; create only in a later approved copy-first batch. |
| `live/tasks.md` | Report/summary surface; not equivalent to the task board. |
| `wiki/log.md` | Unrelated dirty file; do not touch. |

## Batch 2A validation copy evidence

**Status:** completed 2026-07-07.

`tasks.md` was created as an exact byte-for-byte validation copy of `kanban.md`.

```text
kanban.md bytes: 4930
tasks.md bytes: 4930
content match: true
```

`kanban.md` remains the active source of truth until Steve confirms Obsidian task/board behavior and Brain task compatibility are safe on `tasks.md`.

`live/tasks.md` remains a report/summary surface and was not edited.

## Recommendation

Proceed next with **Batch 2B — task validation and source-of-truth decision**, not a direct retirement of `kanban.md`.

This keeps the working task board safe while preparing the target `tasks.md` path for validation.



## Batch 2A copy-first validation — 2026-07-07

`tasks.md` has been created as an exact validation copy of `kanban.md`.

Status:

- `kanban.md` remains the active source of truth for now;
- `tasks.md` is a validation copy only, not yet the source of truth;
- `live/tasks.md` remains a report/summary surface;
- `wiki/log.md` was not touched;
- no Save-to-Mind behavior changed;
- continuous processing remains disabled.

Validation evidence:

```text
kanban.md bytes: 4836
tasks.md bytes: 4836
contentMatches: true
```

Do not retire `kanban.md` until Steve confirms Obsidian/Kanban behavior is acceptable on `tasks.md` and Brain task compatibility checks pass.
