# Router Map

This map tells Mind Steward where to look and where to write proposals.

## Operating Structure

- `capture/inbox/` — successful Save-to-Mind captures waiting for local classification or review.
- `capture/daily/` — daily scratch capture when needed.
- `capture/failed/` — recoverable captures that failed writing or classification.
- `live/tasks.md` — current tasks.
- `live/projects.md` — current projects.
- `live/workflows.md` — workflow launch and tracking surface.
- `live/decisions.md` — current committed decisions.
- `wiki/` — compiled durable memory.
- `wiki/log.md` — append-only review ledger.
- `sources/` — raw evidence and source material.
- `archive/` — completed or inactive material.

## Search Order

1. `router/current.md`
2. `live/`
3. `wiki/index.md`
4. Domain files in `wiki/`
5. `sources/index.md`
6. `wiki/log.md`

## Write Policy

Mind Steward classification writes only to capture files in `capture/inbox/`.

Mind Steward review suggestions append to `wiki/log.md`.

All promotion into `live/`, `wiki/`, `sources/`, or `archive/` is review-first.
