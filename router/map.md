# Router Map

This map tells the model router where to look and where to write.

## New operating structure

- `capture/inbox/` — successful new captures waiting for classification, routing, or compilation.
- `capture/daily/` — daily scratch capture when needed.
- `capture/failed/` — raw recoverable captures that failed classification or writing.
- `live/tasks.md` — current tasks.
- `live/projects.md` — current projects.
- `live/workflows.md` — workflow launch and tracking surface.
- `live/decisions.md` — current committed decisions.
- `wiki/` — compiled durable memory.
  - `wiki/log.md` — append-only maintenance ledger.
- `sources/` — raw evidence and source material.
- `archive/` — completed, old, or legacy material.

## Legacy reference structure

During migration, the router may read these folders but must not move/delete them until validation is complete:

- `01-inbox/`
- `02-strategy/`
- `03-projects/`
- `04-tasks/`
- `05-areas/`
- `06-resources/`
- `07-templates/`
- `08-archive/`

## Search order

1. `router/current.md`
2. `live/`
3. `wiki/index.md`
4. Domain files in `wiki/`
5. `sources/index.md`
6. `wiki/log.md`
7. Legacy numbered folders when needed
