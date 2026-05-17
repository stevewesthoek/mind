---
type: dashboard
status: scaffold
---

# Video

This page is the human-facing place for Video Orchestrator visibility.

Brain Core owns runtime video status. This note should stay sparse and should not store render logs, queue dumps, upload credentials, or generated media state.

## Brain Core endpoints

```text
GET /video/status
GET /video/queue
```

## What should appear here later

- high-level render queue state
- current job summaries
- blocked/failed video workflow notices
- links to durable workflow notes when human action is required

## Current Phase 2 status

- Brain Core `/video/status` and `/video/queue` exist as read-only placeholders.
- No video jobs are started from Brain Core yet.
- No upload or render mutation endpoint exists yet.

## Safety rules

- Do not paste video service logs here.
- Do not store API credentials here.
- Do not use this page as a queue database.
- Keep generated media files outside Mind unless they are deliberate durable sources.
