# Real-Time Inbox Processing Specification

This specification defines the safe future path for on-arrival processing of Mind captures.

It does not enable real-time processing yet.

## Current state

Current confirmed intake routing and classification baseline:

```text
Save-to-Mind
→ n8n webhook
→ GitHub inbox/new/
→ local scheduler sync
→ Mind Steward local classification
→ documented review, proposal, and receipt surfaces
```

This specification does not claim that on-arrival classification is enabled; it defines the controls required before changing the existing scheduling mode. Current deployment and scheduler state is owned by Brain's live-status runbook.

Current confirmed AI Model Selector policy:

```text
task_type: mind_capture_classification
local_only: true
```

## Goal

Process new files in canonical `inbox/new/` shortly after they arrive, while preserving current safety and system boundaries.

Desired future flow:

```text
file lands in inbox/new/
→ watcher or scheduler detects stable file
→ Brain Core starts Mind Steward job
→ Mind Steward calls AI Model Selector
→ local model handles classification when suitable
→ suggestions/logs are written to documented Mind surfaces
```

## Non-goals

- Do not bypass Brain Core, scheduler, Mind Steward, or AI Model Selector.
- Do not call local models directly from ad hoc repo scripts.
- Do not write generated files to the repository root.
- Do not overwrite `kanban.md`.
- Do not delete captures automatically.
- Do not enable unbounded always-on processing.

## Required controls

The queue and throttle rules required before real-time or Mind-writing processing are documented in:

```text
system/inbox-queue-throttle-spec.md
```

Before on-arrival processing is enabled, implement and test:

1. debounce — wait until file writes are stable;
2. queueing — process captures through a queue, not parallel file storms;
3. throttling — limit local AI jobs to a safe concurrency;
4. retry policy — retry transient failures and stop after a bounded number of attempts;
5. large-file handling — defer or batch large captures instead of blocking the machine;
6. failure routing — preserve failures in canonical `inbox/failed/` or another documented surface;
7. logging — write outcome summaries to `wiki/log.md` or a documented log surface;
8. no root writes — all outputs use documented destinations;
9. no Kanban overwrite — task suggestions remain suggestions until lossless task sync exists.

## Suggested throttling defaults

Initial conservative defaults:

```yaml
max_concurrent_jobs: 1
debounce_seconds: 30
max_retries: 2
large_file_threshold_mb: 2
large_file_mode: nightly_batch
local_only: true
```

These defaults can be relaxed only after local machine impact is measured.

## Local AI suitability

Local AI is suitable for first-pass capture classification when:

- the file is small or medium-sized;
- the task is routing, summarization, tagging, or triage;
- high creative quality is not required;
- privacy/local-first behavior is preferred;
- the AI Model Selector reports an available local model.

Escalation to a cloud/provider model should require an explicit selector decision and policy allowance.

## Output policy

The first version should write suggestions, not irreversible changes.

Allowed outputs:

- append or update a documented Mind Steward log surface;
- propose destination paths;
- propose tags and summaries;
- produce a triage report;
- mark failures for review.

Disallowed outputs:

- deleting captures;
- moving captures without a reviewed policy;
- rewriting durable wiki notes without review;
- modifying `kanban.md`;
- writing reports to root.

## Validation checklist

Before enabling on-arrival processing:

1. create a small test capture in `inbox/new/`;
2. confirm the watcher/scheduler detects it once;
3. confirm the file is stable before processing starts;
4. confirm Brain Core or scheduler starts the Mind Steward job;
5. confirm AI Model Selector uses `local_only: true` for classification;
6. confirm output goes to the documented log/suggestion surface;
7. confirm no root files are created;
8. confirm `kanban.md` is unchanged;
9. confirm failures are preserved and reviewable;
10. confirm machine load remains acceptable.
