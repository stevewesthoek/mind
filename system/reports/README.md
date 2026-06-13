# Mind System Reports

This folder contains generated reports, reviewed operational snapshots, and implementation handoffs for Mind.

Reports explain system state or maintenance findings. They are not durable human knowledge and must not silently change `live/`, `wiki/`, `sources/`, `archive/`, `capture/`, or `kanban.md`.

## Maintenance report surfaces

The canonical report-only maintenance surfaces are:

```text
system/reports/maintenance-latest.json
system/reports/maintenance-latest.md
```

They represent the same run.

- `maintenance-latest.json` is the canonical machine-readable report.
- `maintenance-latest.md` is the compact human-readable projection.
- Both must share the same report ID, generation time, source commit, detector list, and finding count.
- Both must state `mode: report-only` and confirm that no content write occurred.

Reviewed or operationally significant snapshots may be preserved under:

```text
system/reports/maintenance-history/
```

Use dated history only when preserving a reviewed decision, incident, pilot result, or audit snapshot is useful. Routine generated runs should replace only the `latest` surfaces.

## Human review workflow

```text
open latest Markdown report
→ inspect exact evidence and affected paths
→ accept, dismiss, or leave each finding open
→ record a concise review outcome
→ create a separate exact-path proposal for accepted findings
→ approve the bounded write separately
```

Accepting a maintenance finding does not authorize a content change.

## Finding states

```text
open
accepted
dismissed
resolved
superseded
```

- `open` — not reviewed.
- `accepted` — the maintenance concern is valid; prepare a separate change proposal.
- `dismissed` — not useful or not actionable; preserve the reason and suppress unchanged recurrence.
- `resolved` — the approved follow-up was completed and verified, or review confirmed no change was required.
- `superseded` — a newer finding or wider review replaced the finding.

## Supported maintenance detectors

The first report version supports independent findings for:

- stale pages;
- duplicate candidates;
- contradiction candidates;
- completed-but-still-active items;
- source-reference gaps;
- durable insights trapped in capture.

Each detector must provide exact paths, matched evidence, confidence, risk, and a recommended review action.

## Report-only boundary

A report run may:

- inspect documented Mind paths;
- compare metadata and content;
- create or replace the two `maintenance-latest` report files;
- preserve selected reviewed history;
- expose errors and partial detector results;
- prepare recommendations.

A report run may not:

- change `kanban.md`;
- move or delete captures;
- update `live/` or `wiki/` pages;
- archive files;
- promote captured insight into trusted knowledge;
- write generated output to the repository root;
- hide detector failures behind a successful summary.

## Human-readable surface requirements

`maintenance-latest.md` should include:

```text
report ID
generation time
source commit
mode
files considered
open findings
suppressed findings
detector errors
confirmation that no writes occurred
high-priority findings
other findings
review instructions
```

Each finding should show only the smallest evidence needed for review. Do not paste large note bodies into reports.

## Machine-readable surface requirements

`maintenance-latest.json` should include:

```text
schema version
report ID
generation metadata
source commit
enabled detectors
summary counts
findings
errors
no_write_performed: true
```

Every finding must include a stable deduplication key so identical open, dismissed, or resolved findings do not repeatedly reappear without changed evidence.

## Errors and partial reports

A failed detector must not invalidate successful findings from other detectors.

The report must distinguish:

```text
no finding detected
```

from:

```text
detector did not complete
```

Record detector errors in both latest surfaces. Do not retry indefinitely, and do not perform any content write during a partial run.

## Generated versus reviewed files

Generated latest files may be replaced by the next successful report run.

Reviewed history should preserve:

- review date;
- reviewer;
- accepted or dismissed outcomes;
- dismissal reasons;
- resolution references;
- source commit;
- changed paths when a later approved action resolves a finding.

## Implementation source of truth

Read these before implementing or changing maintenance reports:

1. `../maintenance-intelligence-standard.md`
2. `../maintenance-report-contract.md`
3. `../knowledge-freshness-standard.md`
4. `../brain-mind-bridge.md`
5. `../mind-implementation-plan.md`

Brain owns detector execution, scheduling, model selection, suppression storage, and report generation.

Mind owns report policy, review surfaces, approval boundaries, and durable human interpretation.
