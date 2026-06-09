# Mind Steward Preflight Runbook

This runbook explains how to use the current Mind Steward preflight system safely.

It does not enable real-time processing, filesystem watchers, or Mind-writing automation.

## Current available preflights

Brain Core currently exposes approved, feature-flagged, report-only preflights for:

```text
scheduler-run-mind-steward-dry-run
scheduler-run-mind-steward-inbox-dry-run
scheduler-run-mind-steward-inbox-classifier-dry-run
scheduler-run-mind-steward-inbox-queue-dry-run
```

Brain Console shows their read-only status through:

```text
GET /scheduler/mind-steward/status
```

## Safety boundary

These preflights are allowed to:

- inspect current runtime or inbox state;
- produce Brain runtime reports;
- expose status in Brain Console.

They are not allowed to:

- write to the Mind repo;
- move captures;
- delete captures;
- classify captures permanently;
- modify `kanban.md`;
- add or run a filesystem watcher;
- write generated files to the Mind root.

## Runtime reports

Reports are written under the Brain repo:

```text
runtime/local/mind-steward/
```

Known reports:

```text
latest.json
latest.md
inbox-latest.json
inbox-latest.md
inbox-classifier-latest.json
inbox-classifier-latest.md
inbox-queue-latest.json
inbox-queue-latest.md
```

## Feature flags

Each executable preflight requires its explicit feature flag.

Known flags:

```text
BRAIN_CORE_ENABLE_MIND_STEWARD_DRY_RUN_EXECUTION=true
BRAIN_CORE_ENABLE_MIND_STEWARD_INBOX_DRY_RUN_EXECUTION=true
BRAIN_CORE_ENABLE_MIND_STEWARD_INBOX_CLASSIFIER_DRY_RUN_EXECUTION=true
BRAIN_CORE_ENABLE_MIND_STEWARD_INBOX_QUEUE_DRY_RUN_EXECUTION=true
```

Do not enable a flag unless you intend to run that specific report-only preflight.

## Recommended manual sequence

Use this order when checking the inbox pipeline:

1. Run Mind Steward dry-run report.
2. Run inbox dry-run report.
3. Run inbox queue dry-run report.
4. Run inbox classifier dry-run report.
5. Review Brain Console preflight status.
6. Review generated Brain runtime reports.
7. Confirm no Mind files changed.
8. Confirm `kanban.md` did not change.

## Validation checklist

After running preflights, verify:

- Brain runtime reports exist;
- Brain Console shows report status;
- `writesToMind` remains `false`;
- `executableActions` remains `false` unless explicitly changed by a future approved phase;
- no files were moved out of `mind/capture/inbox/`;
- no files were deleted from `mind/capture/inbox/`;
- `mind/kanban.md` is unchanged;
- no generated files appeared in the Mind root.

## Escalation boundary

If a preflight reports blocked, missing script, missing selector runtime, large files, or selector errors:

- do not retry in a loop;
- do not manually edit generated runtime reports;
- inspect the report;
- fix the owning Brain-side dependency;
- run the preflight once again after the fix.

## Next phase boundary

The next implementation phase may add scheduled or on-demand queue execution, but it should remain report-only first.

Do not add real-time watchers or Mind-writing behavior until a separate approved phase documents and validates those changes.
