# Capture

Raw intake lands here before Mind Steward processes it.

## Folders

- `inbox/` — primary landing zone for Save-to-Mind captures, video/transcript captures, and other unprocessed incoming material.
- `daily/` — daily capture grouping when a workflow writes date-based intake summaries or batches.
- `failed/` — safety buffer for captures that could not be processed automatically.

## Rules

- Automations should write unknown or unclassified material to `capture/inbox/`, not the repository root.
- Do not delete failed captures without human review.
- Processed knowledge should be distilled into `wiki/`, `sources/`, `live/`, or another documented destination while preserving source references when helpful.
- Mind Steward is responsible for classifying and suggesting where capture material should go.
