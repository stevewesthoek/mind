# Inbox

**Single-system active intake — Batch 8W cleanup complete (2026-07-09).**

Universal intake and processing lifecycle for anything not understood yet.

**Status:** Save-to-Mind routing exclusively targets `inbox/new/` as of Batch 8P (2026-07-09). Active routing is:

```text
POST /webhook/mind-inbox -> n8n -> GitHub inbox/new/
```

**Migration complete (Batch 8W, 2026-07-09):** Legacy `capture/inbox/` has been fully migrated. All active captures and historical material have been moved:
- Active unprocessed captures: `inbox/new/` (12 files)
- Historical verified captures: `history/capture-inbox-historical/2026-07-09/` (9 files)
- Test artifacts: `history/capture-inbox-quarantine/2026-07-09/` (9 files, not deleted)

**Legacy status:** `capture/inbox/` is now empty. No backward-compatibility fallback is required; all material has been explicitly migrated.

## Subfolders

- `new/` — new unreviewed captures.
- `raw/` — immutable originals and source dumps.
- `processed/` — Brain-generated summaries, receipts, relation reports, and proposals. Not durable truth.
- `failed/` — failed, blocked, unreadable, duplicate-conflicted, or approval-blocked captures.
