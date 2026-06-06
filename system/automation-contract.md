# Mind Automation Contract

This document records the current Mind automation boundary.

## Current capture flow

Save-to-Mind captures use this path:

```text
Save-to-Mind
→ n8n webhook
→ GitHub `capture/inbox/`
→ local scheduler sync
→ Mind Steward local classification
→ `wiki/log.md` suggestions
```

## Current classification path

Mind Steward classifies captures through the AI Model Selector.

Current confirmed selector policy:

```text
task_type: mind_capture_classification
local_only: true
```

Automatic capture classification must use the standardized selector path. Do not add ad hoc model calls directly from Mind automation.

## Current timing

Current confirmed behavior is nightly classification, not real-time processing.

Real-time or on-arrival processing is a possible future improvement, but it must be implemented through the same standardized path:

```text
Brain Core / scheduler
→ Mind Steward job
→ AI Model Selector
→ local model when suitable
→ Mind output surfaces
```

## Current output surfaces

- `capture/inbox/` — unprocessed or newly synced captures.
- `capture/failed/` — recoverable failure buffer.
- `wiki/log.md` — Mind Steward suggestions and classification log surface.
- `live/tasks.md` — compact Mind Steward task summary surface.
- `kanban.md` — current daily task source of truth; not overwritten by automation.

## Safety rules

- Do not write generated captures or automation dumps to the repository root.
- Do not delete from `capture/failed/` without human review.
- Do not overwrite `kanban.md` from automation until a lossless task sync system exists.
- Do not bypass Brain Core, scheduler, Mind Steward, or AI Model Selector with one-off automation.
- Do not enable real-time inbox processing until throttling, queueing, and failure handling are documented and tested.

## Future on-arrival processing requirements

Before on-arrival processing is enabled, define and test:

1. debounce behavior for newly written files;
2. max concurrent local AI jobs;
3. queue and retry behavior;
4. large-file fallback behavior;
5. failure routing to `capture/failed/`;
6. log output to `wiki/log.md` or another documented surface;
7. no root writes;
8. no Kanban overwrite.
