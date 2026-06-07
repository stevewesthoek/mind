# Brain Console Mind Steward Visibility Plan — 2026-06-07

This report records the next safe visibility slice for Phase 8 after the Brain-side inbox preflights were implemented.

## Current confirmed Brain-side preflights

Brain Core now has approved, feature-flagged, report-only actions for:

```text
scheduler-run-mind-steward-inbox-dry-run
scheduler-run-mind-steward-inbox-classifier-dry-run
scheduler-run-mind-steward-inbox-queue-dry-run
```

They write Brain runtime reports only under:

```text
runtime/local/mind-steward/
```

Known outputs include:

```text
inbox-latest.json
inbox-latest.md
inbox-classifier-latest.json
inbox-classifier-latest.md
inbox-queue-latest.json
inbox-queue-latest.md
```

## Current Brain Console Center finding

A quick Brain Console Center inspection did not find existing scheduler-specific Zod schemas in:

```text
projects/brain-console-center/lib/braincore-schemas.ts
```

So adding Mind Steward visibility to Brain Console Center is not a one-line UI patch. It needs a small schema + component/API integration slice.

## Recommended next implementation slice

Add a read-only Brain Core endpoint that aggregates Mind Steward runtime reports.

Suggested endpoint:

```text
GET /mind-steward/status
```

or, if keeping it under scheduler:

```text
GET /scheduler/mind-steward/status
```

The endpoint should read Brain runtime report files only and return a compact payload:

```yaml
status: ok|partial|missing|error
generatedAt: timestamp
reports:
  inbox:
    available: true|false
    path: runtime/local/mind-steward/inbox-latest.json
    summary: {}
  classifier:
    available: true|false
    path: runtime/local/mind-steward/inbox-classifier-latest.json
    summary: {}
  queue:
    available: true|false
    path: runtime/local/mind-steward/inbox-queue-latest.json
    summary: {}
```

## UI slice after endpoint exists

After the endpoint exists, Brain Console Center can add:

- a Zod schema in `projects/brain-console-center/lib/braincore-schemas.ts`;
- a small `MindStewardDashboard` component or section;
- cards for inbox, classifier, and queue preflights;
- status badges for missing/ok/blocked;
- links or excerpts from the generated Markdown reports;
- no execution buttons yet unless approval flow is explicitly designed.

## Safety boundary

Visibility must remain read-only.

Do not:

- trigger processing from the dashboard yet;
- write to Mind;
- move captures;
- classify captures permanently;
- modify `kanban.md`;
- add filesystem watchers.

## Recommended next prompt

Ask Claude Code in the Brain repo to implement a read-only Brain Core status endpoint for Mind Steward runtime reports first. Only after that endpoint exists should Brain Console Center UI be added.
