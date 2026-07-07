# Agent Context Rules

## Write rules

- Prefer compact indexes and durable pages over many tiny notes.
- New raw captures target `inbox/new/` after Save-to-Mind migration; use legacy `capture/inbox/` until the switch.
- Failed raw captures target `inbox/failed/`; use legacy `capture/failed/` until routing migration.
- Durable non-faith facts compile into `knowledge/`.
- Faith, Bible, theology, apologetics, ministry, and studies compile into `faith/`.
- Current tasks target `tasks.md`; use legacy `kanban.md` until task migration is validated.
- Current projects target `projects/`; use legacy `live/projects/` until project migration.
- Sources target `resources/` or `faith/resources/`; legacy `sources/` remains during migration.
- Raw sources and original captures are source-of-truth material and must not be silently rewritten.
- Compiled knowledge links back to sources or captures when useful.
- `inbox/processed/` is the target proposal/review surface; `wiki/log.md` remains the compatibility ledger until resolved and migrated.
- Historical material targets `history/`; legacy `archive/` remains during migration.

## Safety rules

- Do not store secrets, tokens, credentials, private keys, or live passwords in `mind`.
- Do not duplicate machine runtime truth in markdown.
- Do not store Brain Core runtime reports or approval audit logs in `mind`.
- Do not move or delete archived reference material without explicit approval.
- Do not rewrite `kanban.md` or switch to `tasks.md` during this agent-context batch.
- Do not create broad shell-execution instructions in Obsidian notes.
- Do not remove legacy fallback support until validation passes and Steve explicitly approves cleanup.

## Size rules

- `system/agent-context/current.md`: max 150 lines.
- `system/agent-context/00-current-context.md`: max 200 lines unless a migration note requires otherwise.
- `tasks.md`: target max 300 lines after task migration.
- `projects/README.md` or project index surfaces: target max 250 lines.
- `knowledge/*.md`: target max 500 lines.
- `inbox/new/`: no files older than 7 days without review after Save-to-Mind migration.
- `inbox/failed/`: no files older than 3 days without retry or review after routing migration.
