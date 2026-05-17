# Router Maintenance

The model router implementation lives in `brain`. This file defines the vault maintenance contract.

## Compile loop

Inputs:

- `capture/inbox/`
- `sources/`

Outputs:

- `wiki/`
- `sources/index.md`
- `live/tasks.md` when action is needed
- `live/decisions.md` when a decision becomes committed

## Memory loop

Maintains:

- `router/current.md`
- `TODAY.md`
- `wiki/index.md`

Purpose: keep short-term memory fresh and long-term memory compact.

## Hygiene loop

Checks:

- duplicate tasks
- stale captures
- oversized files
- orphan notes
- broken links
- unprocessed sources
- old inbox items

## Drift/error loop

Checks:

- expected folders exist
- router contract files exist
- frontmatter schema is valid
- Save-to-Mind target path is `capture/inbox/`
- failed captures are not stuck
- Brain Core is reachable when needed
- scheduler latest run is fresh when scheduler integration exists

## Reports

Maintenance reports should be compact and linked from `live/dashboard.md` or `live/workflows.md`, not scattered into many small status notes.
