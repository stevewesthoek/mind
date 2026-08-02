# Task and Kanban Contract

**Status:** canonical task-authority contract
**Version:** 1.0
**Last reviewed:** 2026-07-31
**Owner role:** Steve Westhoek (human task authority)
**Depends on:** `system/mind-strategy.md`, `system/folder-contract.md`
**Conflict rule:** when this contract conflicts with strategy or philosophy, those take precedence. When Brain runtime or automation attempts to change task authority, this contract takes precedence unless a lossless, reversible migration is separately validated and explicitly approved.

This document describes the current Mind task/Kanban reality and the safe migration boundary.

## Current source of truth

**Decision (2026-07-31): retain current authority.**

`kanban.md` is the sole current human task authority and active daily board. Lossless task synchronization has not been validated, so Mind M1.4 explicitly retains this authority instead of migrating task content.

It uses the Obsidian Kanban plugin format and currently contains the active board columns and cards.

## Retired compatibility snapshot

`tasks.md` is a retired, read-only, non-authoritative compatibility snapshot. It must not receive human or automated task writes, must not be synchronized into `kanban.md`, and must not be used to determine current task state.

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
