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

## Updated Phase 8 status

Phase 8 now has a Brain-side approved, feature-flagged, report-only inbox preflight.

It is still not real-time processing. The next implementation step is a controlled classifier dry-run that uses AI Model Selector with `local_only: true` and writes only a Brain runtime report, not Mind files.

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
