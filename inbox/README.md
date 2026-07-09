# Inbox

Universal intake and processing lifecycle for anything not understood yet.

**Status:** Save-to-Mind routing now targets `inbox/new/` as of Batch 8P (2026-07-09). Active routing is now:

```text
POST /webhook/mind-inbox -> n8n -> GitHub inbox/new/
```

Use this folder as the active target structure for new captures, raw originals, processed proposals, and failed intake items.

During the compatibility period, existing legacy `capture/` paths remain in place. Historical `capture/inbox/` (19 files in local clone) and `capture/failed/` (3 files in local clone) were not moved and remain available for reference and backward-compatibility processing by Brain readers and Mind Steward. Remote origin/main may include additional Batch 8P webhook test captures.

## Subfolders

- `new/` — new unreviewed captures.
- `raw/` — immutable originals and source dumps.
- `processed/` — Brain-generated summaries, receipts, relation reports, and proposals. Not durable truth.
- `failed/` — failed, blocked, unreadable, duplicate-conflicted, or approval-blocked captures.
