# Router Rules

## Write rules

- Prefer compact indexes and durable pages over many tiny notes.
- New raw captures go to `capture/inbox/`.
- Failed raw captures go to `capture/failed/` with enough context to retry.
- Durable facts are compiled into `wiki/`.
- Current tasks and projects are summarized in `live/`.
- Sources remain in `sources/`; compiled knowledge links back when useful.
- Legacy numbered folders are read-only references during migration.

## Safety rules

- Do not store secrets, tokens, credentials, private keys, or live passwords in `mind`.
- Do not duplicate machine runtime truth in markdown.
- Do not store Brain Core runtime reports or approval audit logs in `mind`.
- Do not move or delete old numbered folders until the migration validation checklist is complete.
- Do not rewrite `KANBAN.md` during this migration unless explicitly planned.
- Do not create broad shell-execution instructions in Obsidian notes.

## Size rules

- `router/current.md`: max 150 lines.
- `TODAY.md`: max 200 lines.
- `live/tasks.md`: max 300 lines.
- `live/projects.md`: max 250 lines.
- `wiki/*.md`: target max 500 lines.
- `capture/inbox/`: no files older than 7 days without review.
- `capture/failed/`: no files older than 3 days without retry or review.
