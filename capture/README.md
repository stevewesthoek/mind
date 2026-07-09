# Capture

Raw intake lands here before Mind Steward processes it.

## Folders

- `inbox/` — legacy landing zone; Save-to-Mind captures land here (future target: `inbox/new/` after switch).
- `daily/` — legacy daily capture grouping (future target: under `inbox/processed/` or `history/` by human decision).
- `failed/` — legacy safety buffer for captures that could not be processed (future target: `inbox/failed/` after routing switch).

## Rules

- Automations should write unknown or unclassified material to `capture/inbox/`, not the repository root.
- Do not delete failed captures without human review.
- Processed knowledge should be distilled into `wiki/`, `sources/`, `live/`, or another documented destination while preserving source references when helpful.
- Mind Steward is responsible for classifying and suggesting where capture material should go.
