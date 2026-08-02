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

- `capture/inbox/` — historical only; retired success-intake path.
- `capture/failed/` — historical-only failed-routing path.
- `tasks.md` — retired, non-authoritative compatibility snapshot.
- `live/tasks.md`
- `live/projects.md`
- `live/workflows.md`
- `live/decisions.md`
- `wiki/`
- `wiki/log.md`
- `sources/`
- `archive/`

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

Active success-intake path:

```text
inbox/new/
```

Failed-processing target:

```text
inbox/failed/
```

Failed writes and moves use verified canonical `inbox/failed/`; historical `capture/failed/` must not receive new writes.

Mind Steward review suggestions target `inbox/processed/` after migration and `wiki/log.md` as the compatibility surface until proposal-surface migration is approved.

All promotion into `projects/`, `knowledge/`, `faith/`, `organizations/`, `resources/`, `history/`, or their legacy fallbacks is review-first and approval-gated.
