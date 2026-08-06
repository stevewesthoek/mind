# Agent Context Rules

## Write rules

- Prefer compact indexes and durable pages over many tiny notes.
- New raw captures use the active success-intake path `inbox/new/`.
- Failed raw captures target verified live path `inbox/failed/`; `history/legacy-capture/failed/` is historical evidence only.
- Durable non-faith facts compile into `knowledge/`.
- Faith, Bible, theology, apologetics, ministry, and studies compile into `faith/`.
- Current human tasks use authoritative `kanban.md`. `tasks.md` is a retired, non-authoritative snapshot and must not receive writes.
- Current projects target `projects/`.
- Sources target `resources/` or `faith/resources/`.
- Raw sources and original captures are source-of-truth material and must not be silently rewritten.
- Compiled knowledge links back to sources or captures when useful.
- `inbox/processed/` is the target proposal/review surface.
- Historical material targets `history/`; legacy `archive/` remains pending Phase 3 migration.

## Safety rules

- Do not store secrets, tokens, credentials, private keys, or live passwords in `mind`.
- Do not duplicate machine runtime truth in markdown.
- Do not store Brain Core runtime reports or approval audit logs in `mind`.
- Do not move or delete archived reference material without explicit approval.
- Do not automate, regenerate, or bulk-rewrite `kanban.md`. Exact human-approved task edits may target it because it remains authoritative; never switch authority to `tasks.md` without a separately validated migration.
- Do not create broad shell-execution instructions in Obsidian notes.
- Do not remove legacy fallback support until validation passes and Steve explicitly approves cleanup.

## Size rules

- `system/agent-context/current.md`: max 150 lines.
- `system/agent-context/00-current-context.md`: max 200 lines unless a migration note requires otherwise.
- `tasks.md`: retired compatibility snapshot; do not edit, resize, regenerate, or treat as current task state.
- `projects/README.md` or project index surfaces: target max 250 lines.
- `knowledge/*.md`: target max 500 lines.
- `inbox/new/`: no files older than 7 days without review after Save-to-Mind migration.
- `inbox/failed/`: no files older than 3 days without retry or review after routing migration.
