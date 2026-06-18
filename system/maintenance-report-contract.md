# Mind Maintenance Report Contract

**Status:** canonical implementation contract  
**Contract version:** 1.0
**Depends on:** `system/maintenance-intelligence-standard.md`, `system/knowledge-freshness-standard.md`, `system/brain-mind-bridge.md`  
**Purpose:** define the exact report formats, review states, evidence rules, detector boundaries, and Brain implementation handoff for report-only Mind maintenance intelligence.

## Scope

This contract turns the maintenance-intelligence philosophy into an implementable report protocol.

It covers:

- Markdown and JSON report formats;
- report naming and storage;
- detector output requirements;
- human review states;
- false-positive suppression;
- accepted finding handoff;
- exact evidence requirements;
- implementation acceptance tests;
- Brain/Mind responsibility boundaries.

It does not authorize writes to `live/`, `wiki/`, `sources/`, `archive/`, `kanban.md`, or capture files.

## Operating sequence

```text
Brain detector runs
→ machine-readable report is written
→ human-readable report is rendered
→ Steve reviews findings
→ findings are accepted, dismissed, or left open
→ accepted finding becomes a separate exact-path write proposal
→ no content write occurs until that proposal is explicitly approved
```

## Report locations

Use these paths:

```text
system/reports/maintenance-latest.json
system/reports/maintenance-latest.md
system/reports/maintenance-history/YYYY-MM-DD-maintenance.md
```

Rules:

- `maintenance-latest.json` is the canonical machine-readable latest run.
- `maintenance-latest.md` is the human-readable projection of that same run.
- dated history files are created only for reviewed or operationally significant runs.
- generated reports must never be written to the repository root.
- a report run may replace the latest files, but it must not overwrite reviewed historical records.
- `system/reports/maintenance-decisions.json` is optional and may be absent when the decision ledger is empty.

## Report-level JSON schema

`generatedBy` identifies the actual generator or operator that produced the report. It is a free-form string and does not need to equal a fixed sentinel value.

```json
{
  "schemaVersion": "1.0",
  "reportId": "mind-maintenance-YYYYMMDD-HHMMSS",
  "generatedAt": "YYYY-MM-DDTHH:MM:SSZ",
  "generatedBy": "controlled-real-mind-pilot",
  "mode": "report-only",
  "sourceRepo": "mind",
  "sourceCommit": "",
  "detectors": [
    "stale-page",
    "duplicate-candidate",
    "contradiction-candidate",
    "completed-but-active",
    "source-gap",
    "capture-promotion"
  ],
  "summary": {
    "filesConsidered": 0,
    "findingsTotal": 0,
    "findingsOpen": 0,
    "findingsSuppressed": 0,
    "detectorErrors": 0
  },
  "findings": [],
  "errors": [],
  "noWritePerformed": true
}
```

## Finding JSON schema

Each finding must use this shape:

```json
{
  "id": "finding-stale-page-001",
  "type": "stale-page",
  "status": "open",
  "created": "YYYY-MM-DD",
  "sourceRepo": "mind",
  "scope": "system",
  "paths": [
    "router/00-current-context.md"
  ],
  "trigger": "review_after date has passed",
  "matched_evidence": [
    {
      "path": "router/00-current-context.md",
      "location": "status block",
      "summary": "review_after is earlier than the report date"
    }
  ],
  "comparison_evidence": [],
  "confidence": 0.95,
  "risk": "medium",
  "recommended_action": "Review the page and either confirm current or update the affected sections.",
  "requires_approval": true,
  "noWritePerformed": true,
  "deduplicationKey": "stale-page:router/00-current-context.md:review_after",
  "suppressionUntil": null,
  "review": null
}
```

## Human-readable Markdown report

The Markdown report should stay compact and decision-oriented.

Required structure:

```markdown
# Mind Maintenance Report

Generated: YYYY-MM-DD HH:MM
Mode: report-only
Source commit: <hash>

## Summary

- Files considered: N
- Open findings: N
- Suppressed findings: N
- Detector errors: N
- Writes performed: none

## High-priority findings

### <Finding title>

- Type:
- Paths:
- Trigger:
- Evidence:
- Confidence:
- Risk:
- Recommended review:
- Finding ID:

## Other findings

...

## Detector errors

...

## Review instructions

Accept, dismiss, or leave open. Accepting a finding does not authorize a content write.
```

Do not include large copied sections from Mind pages. Quote only the smallest text needed to identify the issue.

## Human review states

Allowed finding states:

```text
open
accepted
dismissed
resolved
superseded
```

### `open`

The finding has not been reviewed.

### `accepted`

Steve agrees the maintenance concern is valid.

Acceptance means:

```text
prepare an exact-path change proposal
```

It does not mean:

```text
apply the change automatically
```

### `dismissed`

The finding is not useful or not actionable.

A dismissal should record a short reason.

### `resolved`

The approved follow-up action was completed and verified, or the review confirmed no change was necessary.

### `superseded`

A newer finding or broader review replaced this finding.

## Review record

```json
{
  "reviewedBy": "Steve Westhoek",
  "reviewedAt": "YYYY-MM-DDTHH:MM:SSZ",
  "decision": "accepted",
  "reason": "The current-context page is genuinely outdated.",
  "nextAction": "Prepare an exact-path update proposal.",
  "resolutionRef": null
}
```

## Detector contract: stale page

### Inputs

- status metadata;
- `last_reviewed`;
- `review_after`;
- page class;
- current date;
- optional newer evidence.

### Deterministic checks first

- `review_after` passed;
- `status: current` with no review date on a high-risk page;
- current-context page older than configured threshold;
- page marked `review-needed` for an extended period.

### AI-assisted checks only when needed

- whether the changing claim is materially affected by newer context;
- whether the page scope makes the age meaningful;
- whether newer evidence actually conflicts.

### Required output

- exact page;
- exact trigger;
- affected claim when available;
- whether evidence exists beyond age;
- review recommendation.

### Suppression

If dismissed because the page is intentionally stable, suppress until:

- the page changes;
- new contradictory evidence appears;
- a configured future review date arrives.

## Detector contract: duplicate candidate

### Inputs

- file title;
- headings;
- summary or first meaningful section;
- links and source references;
- content scope;
- page status.

### Deterministic checks first

- exact normalized-title match;
- repeated source reference;
- duplicate canonical destination;
- identical or near-identical summary hash.

### AI-assisted checks only when needed

- whether the pages express the same durable idea;
- whether differences are meaningful scope differences;
- whether one should update another instead of becoming a new page.

### Required output

- both paths;
- shared content;
- meaningful differences;
- recommended canonical destination;
- keep-both option.

### Suppression

Use the path pair and content hashes in the deduplication key.

## Detector contract: contradiction candidate

### Inputs

- current and canonical pages;
- page status;
- dates;
- scope;
- source references;
- exact claims.

### Deterministic checks first

- conflicting status values for the same project;
- current and archived paths both linked as canonical;
- explicit mutually exclusive values;
- superseded page still referenced as current.

### AI-assisted checks only when needed

- semantic contradiction;
- scope or date explanation;
- research-versus-strategy distinction;
- whether both statements can coexist under different scopes.

### Required output

- exact conflicting statements;
- authority and scope of each page;
- current evidence;
- uncertainty;
- resolution options.

### Safety

Do not decide which personal belief or business strategy is true without human review.

## Detector contract: completed but active

### Inputs

- `kanban.md` completion state;
- live project pages;
- current dashboards;
- archive state;
- completion notes or release handoffs.

### Deterministic checks first

- completed task still listed under active summary;
- project marked completed but linked under active projects;
- archived path still referenced in current dashboard;
- completion date exists while status remains active.

### AI-assisted checks only when needed

- whether ongoing follow-up justifies keeping the item active;
- whether a project transitioned into maintenance rather than completion.

### Required output

- active path;
- completion evidence;
- exact status or navigation mismatch;
- proposed review action.

## Detector contract: source-reference gap

### Inputs

- page type;
- claim type;
- links and references;
- source folder relationships;
- explicit decision references.

### Deterministic checks first

- canonical strategy page with no decision/source references where references are expected;
- compiled research conclusion with no source link;
- maintenance finding with no evidence paths.

### AI-assisted checks only when needed

- whether the statement is a factual claim, personal judgment, conviction, or strategic choice;
- whether adding provenance would improve trust.

### Required output

- exact claim;
- why provenance may matter;
- likely sources when available;
- leave-unchanged option.

### Safety

Do not force citations onto personal reflections, self-authored convictions, or purely creative work.

## Detector contract: capture promotion

### Inputs

- capture age;
- capture summary;
- repeated concepts;
- existing live/wiki/source pages;
- prior use or references;
- destination rules.

### Deterministic checks first

- repeated links to the capture;
- capture explicitly marked as decision/lesson/rule;
- aged capture with high-confidence classification;
- existing matching durable page.

### AI-assisted checks only when needed

- whether the insight is reusable;
- whether it belongs in an existing page;
- whether the content is temporary, personal, or durable;
- correct knowledge scope.

### Required output

- exact capture path;
- concise reusable insight;
- duplicate-check result;
- recommended destination;
- update-existing versus create-new recommendation.

### Safety

Never promote directly into trusted `wiki/` knowledge without approval.

## Deduplication and recurrence

Every finding must include a stable `deduplicationKey`.

Recommended patterns:

```text
stale-page:<path>:<trigger>
duplicate:<sorted-path-a>:<sorted-path-b>:<content-hash>
contradiction:<sorted-path-a>:<sorted-path-b>:<claim-hash>
completed-active:<path>:<status-location>
source-gap:<path>:<claim-hash>
capture-promotion:<capture-path>:<destination-path>
```

A finding should not be shown again when:

- it was dismissed and the evidence is unchanged;
- it was resolved and the affected files are unchanged;
- an identical open finding already exists.

It may return when:

- relevant files changed;
- new evidence appeared;
- the configured suppression period ended;
- the human review explicitly requested another check.

## Detector execution policy

Run deterministic checks before AI-assisted checks.

```text
cheap deterministic filter
→ bounded candidate set
→ AI comparison only for ambiguous candidates
→ report rendering
```

This reduces cost, latency, and noise.

Each detector should expose:

```yaml
enabled: true
mode: report-only
max_findings: 25
minimum_confidence: 0.70
ai_assist: when-ambiguous
```

Configuration belongs in Brain. Mind owns the policy described here.

## Error handling

Detector errors must not fail the whole report.

Record:

```json
{
  "detector": "duplicate-candidate",
  "path": "",
  "error_type": "timeout",
  "summary": "Duplicate detector exceeded its bounded execution time.",
  "retryable": true
}
```

Rules:

- preserve successful findings from other detectors;
- show errors in both JSON and Markdown reports;
- do not present missing detector output as “no issues found”;
- do not retry indefinitely;
- no partial run may perform writes.

## Brain implementation handoff

Brain should implement this as independent modules:

```text
maintenance runner
├── stale-page detector
├── duplicate detector
├── contradiction detector
├── completed-active detector
├── source-gap detector
├── capture-promotion detector
├── suppression store
├── JSON report writer
├── Markdown renderer
└── Brain Console report viewer
```

The runner should use:

- Brain Core or scheduler ownership;
- Mind Steward for Mind-specific classification;
- AI Model Selector for bounded semantic comparisons;
- local/deterministic processing where sufficient;
- exact Mind paths from this contract;
- report-only feature flags.

## Initial implementation order

Implement in this order:

1. report writer and schema validation;
2. stale-page detector;
3. completed-but-active detector;
4. source-reference gap detector;
5. duplicate candidate detector;
6. contradiction candidate detector;
7. capture-promotion detector;
8. suppression and review feedback;
9. Brain Console visibility.

Reasoning:

- stale and status checks are mostly deterministic;
- duplicate and contradiction detection require more semantic judgment;
- capture promotion is highest risk because it can influence durable knowledge creation.

## Acceptance tests

### Report-level tests

- latest JSON and Markdown files are created in `system/reports/`;
- both outputs share the same report ID and finding count;
- `mode` equals `report-only`;
- `noWritePerformed` equals `true`;
- detector errors are visible;
- no files outside approved report paths change.

### Finding-level tests

- every finding has exact paths;
- every finding has matched evidence;
- confidence is between 0 and 1;
- every finding has a deduplication key;
- every finding requires approval;
- no finding claims falsehood based on age alone;
- duplicate findings explain meaningful differences;
- contradiction findings include both exact claims;
- capture-promotion findings include duplicate-check results.

### Review tests

- open finding can be accepted;
- open finding can be dismissed with reason;
- accepted finding creates no content write;
- dismissed finding is suppressed while evidence is unchanged;
- resolved finding records its resolution reference;
- new evidence can legitimately reopen a dismissed concern.

### Safety tests

- `kanban.md` remains unchanged;
- no capture files move;
- no wiki pages change;
- no archive writes occur;
- no root files are created;
- a detector timeout still produces a partial report with an explicit error;
- stopping the run leaves no half-written report.

## Pilot dataset

Use a small bounded pilot set before any repo-wide scan:

```text
router/00-current-context.md
live/projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/prochat-os-strategy.md
live/dashboard.md
system/automation-roadmap.md
```

The pilot should deliberately include:

- one stale/review-needed page;
- one draft project strategy;
- one current canonical strategy;
- one active dashboard;
- one technical roadmap.

Do not use the full Mind vault for the first implementation test.

## Optional decision ledger

`system/reports/maintenance-decisions.json` is an optional empty-state artifact.

- When present, it is the canonical decision ledger for persisted accepts, dismissals, and resolutions.
- When absent, the maintenance workflow treats the decision set as empty.
- The report-only runner may create or replace it only through explicit decision recording.
- The absence of this file is not a failure condition for a valid report-only pilot.

## Definition of done for this slice

This contract is complete when:

- report schemas are explicit;
- review states are explicit;
- all six detectors have bounded contracts;
- suppression behavior is defined;
- Brain implementation order is defined;
- pilot paths are selected;
- acceptance and safety tests are explicit;
- no content-changing automation has been enabled.
