# Mind Steward Roadmap

## Current Goal

Mind Steward keeps the Mind vault useful by classifying captures locally, producing review suggestions, and maintaining concise active surfaces.

## Active Flow

```text
Save-to-Mind
  -> GitHub inbox/new/
  -> nightly local inbox sync
  -> Mind Steward local classification
  -> wiki/log.md review suggestions
  -> reviewed promotion into projects/, organizations/, knowledge/, resources/, or faith/
```

## Local AI Requirement

Automatic capture classification uses:

```text
AI Model Selector
task_type: mind_capture_classification
local_only: true
```

Only local OpenAI-compatible model endpoints are valid for this job.

## Phases

1. **Capture reliability** — Save-to-Mind writes every capture to GitHub `inbox/new/`.
2. **Local sync** — The nightly scheduler copies missing inbox captures to this computer without overwriting local files.
3. **Local classification** — Mind Steward adds classification frontmatter using local AI only.
4. **Review queue** — Mind Steward appends proposed promotions to `wiki/log.md`.
5. **Approved promotion** — reviewed material moves into `projects/`, `organizations/`, `knowledge/`, `resources/`, or `faith/`.
6. **Maintenance** — Mind Steward reports stale captures, failed captures, oversized wiki pages, broken links, and missing source traces.

## Safety Gates

- No paid/API-backed provider for automatic capture classification.
- No automatic destructive writes.
- No runtime logs or secrets in Mind.
- No promotion without review.
