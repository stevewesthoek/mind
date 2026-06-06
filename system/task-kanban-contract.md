# Task and Kanban Contract

This document describes the current Mind task/Kanban reality and the safe migration boundary.

## Current source of truth

`kanban.md` is the current daily task board and source of truth.

It uses the Obsidian Kanban plugin format and currently contains the active board columns and cards.

## Summary surface

`live/tasks.md` is a compact Mind Steward summary surface.

It may summarize current task attention or Mind Steward suggestions, but it does not replace `kanban.md` and must not be treated as the complete task database.

## Preservation rule

No Kanban card may be deleted, renamed, moved, overwritten, regenerated, or migrated without a lossless export or backup first.

Task titles are user data. Legacy titles should not be rewritten automatically unless the user explicitly approves that exact change.

## Future direction

A future task system may make durable task records the source of truth and generate or synchronize `kanban.md` from those records.

That future migration must be lossless and reversible:

1. Inventory every current Kanban card.
2. Assign stable task IDs or preserve raw card text.
3. Export/import cards into structured task records.
4. Validate that generated/synced Kanban output preserves all cards, states, tags, dates, and subtasks.
5. Only then consider changing the source of truth.

## Current inventory

The current board inventory is documented in:

`system/reports/kanban-inventory-2026-06-06.md`

The future no-data-loss task sync specification is documented in:

`system/task-sync-spec.md`
