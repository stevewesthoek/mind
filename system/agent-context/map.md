# Agent Context Map

This map tells Mind Steward where to look and where to write proposals during the migration period.

## Operating Structure

Target paths:

- `inbox/new/` — active success-intake path.
- `inbox/failed/` — verified live failed-processing path.
- `inbox/processed/` — processed summaries, receipts, and proposals.
- `kanban.md` — sole current human task authority.
- `projects/` — target active project home.
- `knowledge/decisions.md` — target committed decisions surface when migrated.
- `knowledge/` — durable non-faith memory.
- `faith/` — Bible, theology, apologetics, ministry, and faith studies.
- `resources/` — source/reference material.
- `history/` — completed or inactive material.

Historical or compatibility-only paths:

- `history/legacy-capture/inbox/` — migrated; retired success-intake path (was `capture/inbox/`).
- `history/legacy-capture/failed/` — migrated; historical-only failed-routing path (was `capture/failed/`).
- `tasks.md` — retired, non-authoritative compatibility snapshot.
- `history/legacy-live/tasks.md` — migrated (was `live/tasks.md`).
- `history/legacy-live/projects.md` — migrated (was `live/projects.md`).
- `history/legacy-live/workflows.md` — migrated (was `live/workflows.md`).
- `history/legacy-live/decisions.md` — migrated (was `live/decisions.md`; file absent, not created).
- `history/legacy-wiki/` — migrated 2026-08-06; retired wiki root (was `wiki/`).
- `inbox/processed/legacy-wiki-proposal-log.md` — migrated 2026-08-06 (was `wiki/log.md`).
- `archive/` — pending Phase 3 migration.

## Search Order

1. `system/agent-context/current.md`
2. `system/agent-context/00-current-context.md`
3. `projects/`
4. `knowledge/index.md`
5. Domain files in `knowledge/`, `faith/`, `organizations/`, `people/`, and `repos/`
6. `resources/index.md`
7. `inbox/processed/` proposal surface

## Write Policy

Mind Steward classification writes only to approved capture/intake paths.

Active success-intake path:

```text
inbox/new/
```

Failed-processing target:

```text
inbox/failed/
```

Failed writes and moves use verified canonical `inbox/failed/`; `history/legacy-capture/failed/` is historical evidence only and must not receive new writes.

Mind Steward review suggestions target `inbox/processed/`.

All promotion into `projects/`, `knowledge/`, `faith/`, `organizations/`, `resources/`, `history/`, or their legacy fallbacks is review-first and approval-gated.
