# Task Sync Specification

This specification defines the safe future path from the current Obsidian Kanban board to durable task records.

It does not change current behavior.

## Current state

`kanban.md` remains the current daily task board and source of truth.

`live/tasks.md` remains a compact Mind Steward summary surface.

The current board inventory is preserved in:

```text
system/reports/kanban-inventory-2026-06-06.md
```

## Goal

Create a future task system where:

```text
structured task records → generated or synchronized kanban.md → live/tasks.md summary
```

The migration must be lossless, reversible, and validated before `kanban.md` stops being the source of truth.

## Non-goals

- Do not overwrite `kanban.md` yet.
- Do not rename legacy task titles automatically.
- Do not delete completed cards.
- Do not collapse subtasks into plain text without preserving structure.
- Do not make `live/tasks.md` the source of truth.
- Do not add real-time task automation until the data model and validation checks exist.

## Proposed task record shape

A durable task record should preserve the full Kanban card, not only the title.

Recommended fields:

```yaml
---
id: task-YYYYMMDD-slug-or-hash
source: kanban.md
source_line: null
status: backlog|todo|doing|done
checked: false
raw_text: "Original Kanban card text"
title: "Human-readable task title"
tags: []
priority: null
owner: null
completed_at: null
created_at: null
updated_at: null
subtasks: []
links: []
notes: null
---
```

## Stable ID rule

Task IDs must be stable before synchronization is enabled.

Safe options:

1. preserve an explicit task ID inside the card text; or
2. generate IDs from a reversible export table; or
3. use a content hash only if raw card text and original line context are preserved.

Do not rely only on line numbers because cards move between columns.

## Subtask rule

Nested Kanban subtasks must remain nested task data.

Example from current board:

```text
Save to mind improvements #p3 #you
  - Normalize producer tags output...
  - Add lightweight regression check...
```

A future export must preserve:

- parent task title;
- parent status;
- tags;
- every subtask text;
- each subtask checkbox state.

## Legacy title rule

Task titles are user data.

Legacy titles such as `Product: Model Router` must not be rewritten automatically. They may be manually renamed by the user or migrated with the raw original title preserved.

## Validation requirements

Before any generated/synced `kanban.md` is allowed:

1. Export all current Kanban cards to structured records.
2. Regenerate a candidate Kanban file in a temporary location.
3. Compare source and candidate counts by column.
4. Compare all titles, checkbox states, completion dates, tags, and subtasks.
5. Confirm plugin settings are preserved.
6. Confirm no card is missing, duplicated, renamed, or moved unexpectedly.
7. Keep a backup of the original `kanban.md`.
8. Require human approval before replacing `kanban.md`.

## Future file layout

Possible future layout:

```text
tasks/
  README.md
  active/
  done/
  archive/
  index.json
```

This layout is not active yet.

Do not create or move tasks into this structure until the export/import tool and validation report exist.

## Brain Core and Mind Steward boundary

Future task synchronization should use standardized system boundaries:

```text
Brain Core / scheduler
→ Mind Steward task job
→ AI Model Selector when classification or summarization is needed
→ structured task records
→ generated/synced kanban.md
→ live/tasks.md summary
```

Do not add ad hoc scripts that overwrite the board outside the documented sync path.
