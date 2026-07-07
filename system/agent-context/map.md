# Agent Context Map

This map tells Mind Steward where to look and where to write proposals during the migration period.

## Operating Structure

Target paths:

- `inbox/new/` — new captures after Save-to-Mind migration.
- `inbox/failed/` — failed capture routing after migration.
- `inbox/processed/` — processed summaries, receipts, and proposals.
- `tasks.md` — target human task source of truth after task migration.
- `projects/` — target active project home.
- `knowledge/decisions.md` — target committed decisions surface when migrated.
- `knowledge/` — durable non-faith memory.
- `faith/` — Bible, theology, apologetics, ministry, and faith studies.
- `resources/` — source/reference material.
- `history/` — completed or inactive material.

Compatibility fallbacks:

- `capture/inbox/`
- `capture/failed/`
- `live/tasks.md`
- `live/projects.md`
- `live/workflows.md`
- `live/decisions.md`
- `wiki/`
- `wiki/log.md`
- `sources/`
- `archive/`
- `kanban.md`

## Search Order

1. `system/agent-context/current.md`
2. `system/agent-context/00-current-context.md`
3. `projects/`, with `live/` fallback during migration
4. `knowledge/index.md`, with `wiki/index.md` fallback during migration
5. Domain files in `knowledge/`, `faith/`, `organizations/`, `people/`, and `repos/`
6. `resources/index.md`, with `sources/index.md` fallback during migration
7. `inbox/processed/` and `wiki/log.md` proposal surfaces

## Write Policy

Mind Steward classification writes only to approved capture/intake paths.

Target intake path after Save-to-Mind migration:

```text
inbox/new/
```

Compatibility intake path until the switch:

```text
capture/inbox/
```

Mind Steward review suggestions target `inbox/processed/` after migration and `wiki/log.md` as the compatibility surface until proposal-surface migration is approved.

All promotion into `projects/`, `knowledge/`, `faith/`, `organizations/`, `resources/`, `history/`, or their legacy fallbacks is review-first and approval-gated.
