# Capture

Historical raw intake buffer. New captures now land in `inbox/new/` via Save-to-Mind routing (active as of 2026-07-09).

## Folders

- `inbox/` — **legacy landing zone** (historical captures from prior deployments; still contains 21 files as of 2026-07-09 and was not moved).
- `daily/` — legacy daily capture grouping (future target: under `inbox/processed/` or `history/` by human decision).
- `failed/` — **legacy safety buffer** for captures that could not be processed (historical failures; still contains 5 files as of 2026-07-09 and was not moved).

## Rules

- Automations should write unknown or unclassified material to `capture/inbox/`, not the repository root.
- Do not delete failed captures without human review.
- Processed knowledge should be distilled into `wiki/`, `sources/`, `live/`, or another documented destination while preserving source references when helpful.
- Mind Steward is responsible for classifying and suggesting where capture material should go.
