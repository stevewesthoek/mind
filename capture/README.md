# Capture

**Legacy structure only — All active captures moved to inbox/ (2026-07-09, Batch 8W).**

This folder now contains only archival/legacy subfolders. No new captures land here.

## Folders

- `inbox/` — **legacy empty folder** (all historical captures moved to inbox/new/ or history/ as of 2026-07-09, Batch 8W).
- `failed/` — **legacy failed-capture archive** (historical failures; contains 3 files; failure routing not yet switched to inbox/failed/).
- `daily/` — legacy daily capture grouping (not migrated; historical reference only).

## Migration Status (Batch 8W, 2026-07-09)

**Action taken:** All 28 active captures from capture/inbox/ were moved out:
- 9 active unprocessed captures → `inbox/new/` (consolidate into active system)
- 7 historical/verified artifacts → `history/capture-inbox-historical/2026-07-09/`
- 2 duplicate captures → `history/capture-inbox-historical/2026-07-09/`
- 9 test artifacts → `history/capture-inbox-quarantine/2026-07-09/` (not deleted, quarantined)
- 1 unclassified file → `history/capture-inbox-review-required/2026-07-09/`

**Result:** capture/inbox/ is now empty. No active capture files remain here.

## Rules

- **Active Save-to-Mind webhook** writes new captures to `inbox/new/`, not to this legacy folder.
- `capture/inbox/` receives no new captures (no automation writes here anymore).
- `capture/failed/` remains unchanged; failure routing is future work (separate batch).
- Do not delete failed captures without human review.
- Do not add new captures to this folder; use `inbox/new/` for all new material.
- Processed knowledge should be distilled into `wiki/`, `sources/`, `live/`, or another documented destination while preserving source references when helpful.
