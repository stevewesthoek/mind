# Capture

Historical raw intake buffer. New captures now land in `inbox/new/` via Save-to-Mind routing (active as of 2026-07-09).

## Folders

- `inbox/` — **legacy landing zone** (historical captures from prior deployments; contains 19 files as of 2026-07-09 local clone, not moved).
- `daily/` — legacy daily capture grouping (future target: under `inbox/processed/` or `history/` by human decision).
- `failed/` — **legacy safety buffer** for captures that could not be processed (historical failures; contains 3 files as of 2026-07-09 local clone, not moved).

## Rules

- **Active Save-to-Mind webhook** writes new captures to `inbox/new/`, not to this legacy folder.
- Existing legacy automations that still write to `capture/inbox/` will be reviewed in a later compatibility batch.
- Do not delete failed captures without human review.
- Processed knowledge should be distilled into `wiki/`, `sources/`, `live/`, or another documented destination while preserving source references when helpful.
- Mind Steward is responsible for classifying and suggesting where capture material should go.
