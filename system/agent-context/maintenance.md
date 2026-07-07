# Agent Context Maintenance

The Mind Steward implementation lives in `brain`. This file defines the vault maintenance contract for Mind-facing agent context.

## Compile loop

Target inputs after migration:

- `inbox/new/`
- `resources/`
- `faith/resources/`

Compatibility inputs during migration:

- `capture/inbox/`
- `sources/`

Target outputs after migration:

- `knowledge/`
- `faith/`
- `resources/index.md`
- `tasks.md` when action is needed
- `knowledge/decisions.md` when a decision becomes committed

Compatibility outputs during migration:

- `wiki/`
- `sources/index.md`
- `live/tasks.md`
- `live/decisions.md`

## Memory loop

Maintains:

- `system/agent-context/current.md`
- `system/agent-context/00-current-context.md`
- `knowledge/index.md` after migration, with `wiki/index.md` as fallback
- `inbox/processed/` as the target review/proposal surface
- `wiki/log.md` as the compatibility proposal ledger until its local edits and migration are resolved

Purpose: keep short-term memory fresh, long-term memory compact, and the Mind evolution auditable without storing Brain runtime logs in Mind.

## Hygiene loop

Checks:

- duplicate tasks
- stale captures
- oversized files
- orphan notes
- broken links
- missing source trace on compiled pages
- contradictions or stale claims superseded by newer sources
- unprocessed sources
- old inbox items

## Drift/error loop

Checks:

- expected target and fallback folders exist
- agent-context contract files exist
- frontmatter schema is valid
- Save-to-Mind target remains explicit: legacy `capture/inbox/` until the approved switch to `inbox/new/`
- failed captures are not stuck
- Brain Core is reachable when needed
- scheduler latest run is fresh when scheduler integration exists
- runtime reports remain Brain-owned and are not written back into Mind notes

## Reports

Maintenance reports should be compact and linked from Brain Console, `system/reports/`, or the current dashboard surface. They should not be scattered into many small status notes.
