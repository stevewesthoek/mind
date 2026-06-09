# Real-Time Inbox Dependency Check — 2026-06-06

Read-only dependency check for future real-time Mind inbox processing.

## Scope

This check looked for Brain-side evidence related to:

- Mind Steward;
- scheduler/local capture classification;
- `capture/inbox/`;
- AI Model Selector;
- `mind_capture_classification`;
- `local_only` routing.

No automation was changed.

## Confirmed evidence

### AI Model Selector local-only path exists

Brain contains a local-only selector test at:

```text
operations/system-configs/model-selector/tests/test_model_selector_local_only.py
```

The test config includes task type:

```text
mind_capture_classification
```

and a local provider:

```text
ollama-local
```

with OpenAI-compatible local endpoint:

```text
http://127.0.0.1:11434/v1
```

This supports the existing Mind automation contract statement that capture classification can use the AI Model Selector with `local_only: true`.

## Additional confirmed Brain evidence

Brain Core exposes scheduler state through its scheduler adapter:

```text
projects/brain-core/src/adapters/scheduler.ts
```

The adapter includes a scheduler item:

```text
id: mind-steward-dry-run
name: Mind Steward dry-run report
```

It reads a Mind Steward runtime report from:

```text
process.env.BRAIN_CORE_MIND_STEWARD_REPORT_PATH
```

or defaults to:

```text
runtime/local/mind-steward/latest.json
```

This confirms Brain Core currently has a status/report visibility path for Mind Steward output.

## Not confirmed in this pass

This search found Brain Core scheduler visibility for Mind Steward reports, but did not confirm a Brain Core route or scheduler action that executes real-time capture processing.

Do not implement real-time processing until the concrete execution path is found and read.

## Additional confirmed execution-path evidence

Brain Core exposes scheduler run requests through:

```text
POST /scheduler/jobs/:id/request-run
```

In `projects/brain-core/src/api/routes.ts`, this route maps to an approval/action request kind:

```text
scheduler-run-<id>
```

The action allowlist includes:

```text
scheduler-run-
scheduler-run-mind-
```

Further inspection found that `projects/brain-core/src/adapters/actions.ts` already has a narrow execution hook for the exact approval kind:

```text
scheduler-run-mind-steward-dry-run
```

This hook is gated by the feature flag:

```text
BRAIN_CORE_ENABLE_MIND_STEWARD_DRY_RUN_EXECUTION=true
```

and runs the allowlisted script:

```text
tools/scripts/mind-steward-dry-run-report.sh
```

That script generates a runtime report only and explicitly reports:

```text
writesToMind: false
executableActions: false
mode: dry-run-report-only
```

The execution readiness adapter still reports:

```text
executionEnabled: false
writesToMind: false
executableActions: false
```

## Current safe conclusion

It is reasonable to keep the documented future flow as a target:

```text
Brain Core / scheduler
→ Mind Steward job
→ AI Model Selector
→ local model when suitable
→ documented Mind output surfaces
```

The current Brain Core implementation can execute an approved, feature-flagged Mind Steward dry-run report, but that original dry-run does not inspect the inbox, execute real-time capture processing, or write to Mind.

## New confirmed inbox dry-run preflight

Brain commit `62a35e64` adds a dedicated report-only inbox preflight:

```text
scheduler-run-mind-steward-inbox-dry-run
```

The action is gated by:

```text
BRAIN_CORE_ENABLE_MIND_STEWARD_INBOX_DRY_RUN_EXECUTION=true
```

and runs:

```text
tools/scripts/mind-steward-inbox-dry-run-report.sh
```

The script inspects:

```text
mind/capture/inbox/
```

and writes only Brain runtime reports:

```text
runtime/local/mind-steward/inbox-latest.json
runtime/local/mind-steward/inbox-latest.md
```

Confirmed behavior:

- counts inbox files;
- samples filenames with a bounded sample limit;
- flags files above the 2 MB default threshold;
- reports `writesToMind: false`;
- reports `externalSideEffects: false`;
- reports `executableActions: false`;
- does not classify captures;
- does not call local models;
- does not modify `kanban.md`;
- does not write to the Mind repo.

## Confirmed AI Model Selector evidence

The AI Model Selector runtime exists at:

```text
operations/system-configs/model-selector/runtime/core.py
```

It exposes a selector function with this shape:

```text
select(task_type, input_token_count, urgent, previous_failures, task_metadata)
```

The selector can support local/private classification through task metadata flags such as:

```text
private
offline
external_provider_disallowed
```

Earlier selector tests confirm the task type:

```text
mind_capture_classification
```

can select the local provider:

```text
ollama-local
```

with endpoint:

```text
http://127.0.0.1:11434/v1
```

## Updated Phase 8 status

Phase 8 now has a Brain-side approved, feature-flagged, report-only inbox preflight and a verified AI Model Selector runtime path for local capture classification.

## New confirmed classifier dry-run preflight

Brain commit `30ef779a` adds a dedicated report-only classifier preflight:

```text
scheduler-run-mind-steward-inbox-classifier-dry-run
```

The action is gated by:

```text
BRAIN_CORE_ENABLE_MIND_STEWARD_INBOX_CLASSIFIER_DRY_RUN_EXECUTION=true
```

and runs:

```text
tools/scripts/mind-steward-inbox-classifier-dry-run-report.sh
```

The script inspects a bounded sample from:

```text
mind/capture/inbox/
```

and writes only Brain runtime reports:

```text
runtime/local/mind-steward/inbox-classifier-latest.json
runtime/local/mind-steward/inbox-classifier-latest.md
```

Confirmed behavior:

- samples at most 3 files;
- reads at most a small bounded preview from each sampled file;
- skips files larger than 2 MB;
- calls the AI Model Selector runtime for `mind_capture_classification` when available;
- clears proxy environment variables and sets localhost-only proxy bypass values;
- reports selected provider/model/base URL when selector succeeds;
- reports blocked status if selector runtime is missing or unavailable;
- reports `writesToMind: false`;
- reports `externalSideEffects: false`;
- reports `executableActions: false`;
- does not classify captures permanently;
- does not move, delete, or rewrite captures;
- does not modify `kanban.md`;
- does not write to the Mind repo.

## Updated Phase 8 status

Phase 8 now has a Brain-side approved, feature-flagged inbox preflight and a Brain-side approved, feature-flagged selector-backed classifier dry-run.

## New confirmed queue dry-run preflight

Brain commit `7eeb43ac` adds a dedicated report-only queue preflight:

```text
scheduler-run-mind-steward-inbox-queue-dry-run
```

The action is gated by:

```text
BRAIN_CORE_ENABLE_MIND_STEWARD_INBOX_QUEUE_DRY_RUN_EXECUTION=true
```

and runs:

```text
tools/scripts/mind-steward-inbox-queue-dry-run-report.sh
```

The script inspects:

```text
mind/capture/inbox/
```

and writes only Brain runtime reports:

```text
runtime/local/mind-steward/inbox-queue-latest.json
runtime/local/mind-steward/inbox-queue-latest.md
```

Confirmed behavior:

- selects up to 3 pending queue candidates;
- flags files larger than 2 MB as `blocked_large_file`;
- marks overflow entries as `skipped_capacity`;
- records queue defaults such as max concurrency, debounce, retries, large-file threshold, and minimum seconds between runs;
- reports `writesToMind: false`;
- reports `externalSideEffects: false`;
- reports `executableActions: false`;
- does not process files with AI;
- does not classify captures;
- does not move, delete, or rewrite captures;
- does not modify `kanban.md`;
- does not write to the Mind repo.

## Updated Phase 8 status

Phase 8 now has Brain-side approved, feature-flagged report-only preflights for inbox inspection, selector-backed classifier dry-run, and queue/throttle planning.

## New confirmed Brain Core status endpoint

Brain commit `827a3586` adds a read-only status endpoint:

```text
GET /scheduler/mind-steward/status
```

The endpoint aggregates Brain runtime reports from:

```text
runtime/local/mind-steward/latest.json
runtime/local/mind-steward/inbox-latest.json
runtime/local/mind-steward/inbox-classifier-latest.json
runtime/local/mind-steward/inbox-queue-latest.json
```

It returns compact availability/status fields such as:

```text
available
status
message
mode
writesToMind
executableActions
endedAtLisbon
durationSeconds
```

This is read-only visibility. It does not execute jobs, write to Mind, classify captures permanently, move files, or modify Kanban.

## Updated Phase 8 status

Phase 8 now has Brain-side approved, feature-flagged report-only preflights for inbox inspection, selector-backed classifier dry-run, queue/throttle planning, and a read-only Brain Core status endpoint for these reports.

## New confirmed Brain Console visibility

Brain commit `5ac735d2` adds read-only Brain Console visibility for:

```text
GET /scheduler/mind-steward/status
```

The overview dashboard now shows Mind Steward preflight report status for:

```text
dry run
inbox
classifier
queue
```

It displays availability/status and safety flags such as:

```text
writesToMind
executableActions
```

This is dashboard visibility only. It does not execute jobs, write to Mind, classify captures permanently, move files, or modify Kanban.

## Updated Phase 8 status

Phase 8 now has Brain-side approved, feature-flagged report-only preflights for inbox inspection, selector-backed classifier dry-run, queue/throttle planning, a read-only Brain Core status endpoint, and Brain Console visibility for those reports.

It is still not real-time processing. The next implementation step should be either a scheduled/on-demand queue runner that remains report-only first, or manual operator workflow documentation for running the existing preflights safely. Do not add a filesystem watcher or Mind-writing behavior yet.

## Next dependency search

Before implementation, search/read exact Brain files for:

- Mind Steward runtime implementation;
- scheduler definitions;
- local app or automation jobs that touch `mind/capture/inbox/`;
- Brain Core routes that expose Mind Steward status or actions;
- scripts that append to `wiki/log.md`;
- any hardcoded Mind paths.

## Boundary

Do not add watchers, cron jobs, or filesystem-triggered automation until:

1. the existing scheduler/Mind Steward implementation is found;
2. the call path through AI Model Selector is confirmed;
3. queue/throttle behavior is designed in the owning runtime;
4. failure routing is confirmed;
5. validation can prove no root writes and no Kanban overwrite.
