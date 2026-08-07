# Mind Automation Contract

This document records the current Mind automation boundary.

## Current capture flow

Save-to-Mind captures use this verified path:

```text
Save-to-Mind
→ n8n webhook
→ GitHub `inbox/new/`
→ local scheduler sync
→ Mind Steward local classification
→ reviewed proposal/log surfaces
```

Brain task B1.0a verified the guarded live workflow on 2026-07-22. Success routes to `inbox/new/` and failed processing routes to `inbox/failed/`; compatibility paths under `capture/` are historical-only.

## Current classification path

Mind Steward classifies captures through the AI Model Selector.

Current confirmed selector policy:

```text
task_type: mind_capture_classification
local_only: true
```

Automatic capture classification must use the standardized selector path. Do not add ad hoc model calls directly from Mind automation.

## Current timing

Scheduler and deployment state is owned by Brain's live-status runbook. On-arrival processing is not authorized; any future activation must follow the same standardized path:

```text
Brain Core / scheduler
→ Mind Steward job
→ AI Model Selector
→ local model when suitable
→ Mind output surfaces
```

## Current output surfaces

- `inbox/new/` — newly synced/unprocessed captures.
- `inbox/failed/` — recoverable failure buffer.
- `inbox/processed/` — reviewed proposal, receipt, and processing/log evidence.
- `kanban.md` — sole current human task authority; never an automation-write target.

## Safety rules

- Do not write generated captures or automation dumps to the repository root.
- Do not delete from `inbox/failed/` without human review.
- Do not write to `kanban.md` from automation; task changes require exact human action while it remains authority.
- Do not bypass Brain Core, scheduler, Mind Steward, or AI Model Selector with one-off automation.
- Do not enable real-time inbox processing until throttling, queueing, and failure handling are documented and tested.

## Future on-arrival processing requirements

The safe future specification is documented in:

```text
system/realtime-inbox-processing-spec.md
```

Before on-arrival processing is enabled, define and test:

1. debounce behavior for newly written files;
2. max concurrent local AI jobs;
3. queue and retry behavior;
4. large-file fallback behavior;
5. failure routing to canonical `inbox/failed/`;
6. log or receipt output to `inbox/processed/` or another explicitly documented canonical review surface;
7. no root writes;
8. no Kanban overwrite.
