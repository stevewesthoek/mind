# Inbox Queue and Throttle Specification

This specification defines the safe boundary for turning Mind Steward inbox dry-runs into controlled scheduled or on-demand processing.

It does not enable a filesystem watcher and does not permit writes to Mind yet.

## Current implemented Brain preflights

Brain now supports two approved, feature-flagged, report-only actions:

```text
scheduler-run-mind-steward-inbox-dry-run
scheduler-run-mind-steward-inbox-classifier-dry-run
```

Current report outputs live in Brain runtime only:

```text
runtime/local/mind-steward/inbox-latest.json
runtime/local/mind-steward/inbox-latest.md
runtime/local/mind-steward/inbox-classifier-latest.json
runtime/local/mind-steward/inbox-classifier-latest.md
```

Current constraints remain:

- no Mind writes;
- no Kanban writes;
- no capture moves;
- no capture deletion;
- no filesystem watcher;
- no permanent classification.

## Goal

Add a queue/throttle layer before any on-arrival processing or Mind-writing classifier.

The queue should make capture processing predictable, bounded, observable, and safe for the local machine.

## Required processing stages

Future safe processing should use this order:

```text
capture/inbox file discovery
→ queue candidate selection
→ debounce/stability check
→ size/type checks
→ selector-backed classifier dry-run
→ report-only result
→ human review
→ later approved write/move behavior
```

Do not skip directly from file discovery to Mind writes.

## Queue rules

A future queue should preserve these fields per candidate:

```yaml
path: capture/inbox/example.md
status: pending|running|blocked|failed|reported|approved|done
size_bytes: 0
modified_at: null
first_seen_at: null
last_checked_at: null
attempt_count: 0
last_error: null
large_file: false
selected_for_sample: false
selector_status: unknown
```

## Throttle defaults

Initial safe defaults:

```yaml
max_concurrent_jobs: 1
max_files_per_run: 3
debounce_seconds: 30
max_retries: 2
large_file_threshold_mb: 2
minimum_seconds_between_runs: 300
local_only: true
```

These defaults should remain conservative until local machine impact is measured.

## Large-file behavior

Files larger than the threshold should not be processed by the real-time path.

They should be reported as:

```text
blocked_large_file
```

and handled by a later manual or nightly batch workflow.

## Failure behavior

Failures must preserve source material.

Allowed failure outputs:

- Brain runtime report;
- queue status record;
- Mind Steward log suggestion;
- `capture/failed/` only after explicit approved move behavior exists.

Disallowed failure behavior:

- deleting captures;
- overwriting source captures;
- silently ignoring failed files;
- modifying `kanban.md`.

## Mind write boundary

The queue/throttle layer may prepare suggestions, but it may not write durable Mind changes until a separate approved write phase exists.

Future write phases must be separately documented for:

- proposed `wiki/` updates;
- proposed `sources/` routing;
- proposed task suggestions;
- proposed capture moves to processed/failed/archive.

## Brain Core boundary

Implementation should stay inside the existing Brain Core approval/action/scheduler model.

Expected path:

```text
Brain Core approval/action request
→ allowlisted Mind Steward job
→ AI Model Selector local/private/offline selection
→ Brain runtime report
→ optional dashboard visibility
```

Do not add independent background daemons in the Mind repo.

## Validation requirements

Before any scheduled or on-demand queue processing is considered active:

1. run inbox dry-run;
2. run inbox classifier dry-run;
3. confirm bounded sample size;
4. confirm large files are skipped;
5. confirm no Mind files changed;
6. confirm `kanban.md` is unchanged;
7. confirm reports are written only to Brain runtime;
8. confirm local CPU/memory impact is acceptable;
9. confirm failures are visible and reviewable;
10. confirm feature flags are required.
