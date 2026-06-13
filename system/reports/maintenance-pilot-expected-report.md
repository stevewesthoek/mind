# Maintenance Pilot Expected Report

**Status:** canonical example  
**Depends on:** `system/reports/maintenance-pilot-fixture.md`, `system/maintenance-report-contract.md`  
**Purpose:** show the exact shape and wording quality expected from the first report-only maintenance pilot.

## Important boundary

This file is an example, not a real maintenance run.

It must not be treated as:

- current system state;
- proof that a detector actually ran;
- an accepted maintenance finding;
- authorization to change any Mind content.

The real pilot must generate:

```text
system/reports/maintenance-latest.json
system/reports/maintenance-latest.md
```

from the current source commit and current file contents.

## Example machine-readable report

```json
{
  "schema_version": "1.0",
  "report_id": "mind-maintenance-20260613-120000",
  "generated_at": "2026-06-13T12:00:00Z",
  "generated_by": "brain/mind-steward",
  "mode": "report-only",
  "source_repo": "mind",
  "source_commit": "EXAMPLE_COMMIT",
  "configuration": {
    "max_files": 5,
    "max_findings_per_detector": 5,
    "minimum_confidence": 0.7,
    "ai_assist": "when-ambiguous"
  },
  "detectors": {
    "stale-page": {
      "enabled": true,
      "status": "completed"
    },
    "completed-but-active": {
      "enabled": true,
      "status": "completed"
    },
    "source-gap": {
      "enabled": true,
      "status": "completed"
    },
    "duplicate-candidate": {
      "enabled": false,
      "status": "disabled"
    },
    "contradiction-candidate": {
      "enabled": false,
      "status": "disabled"
    },
    "capture-promotion": {
      "enabled": false,
      "status": "disabled"
    }
  },
  "files_considered": [
    "router/00-current-context.md",
    "live/projects/prochat-qa-memory/STRATEGY-PLAN.md",
    "wiki/organisations/prochat/brand/prochat-os-strategy.md",
    "live/dashboard.md",
    "system/automation-roadmap.md"
  ],
  "summary": {
    "files_considered": 5,
    "findings_total": 1,
    "findings_open": 1,
    "findings_accepted": 0,
    "findings_dismissed": 0,
    "findings_resolved": 0,
    "findings_suppressed": 0,
    "detector_errors": 0
  },
  "findings": [
    {
      "id": "finding-stale-page-current-context-001",
      "type": "stale-page",
      "status": "open",
      "created": "2026-06-13",
      "source_repo": "mind",
      "scope": "system",
      "paths": [
        "router/00-current-context.md"
      ],
      "trigger": "review_after date has passed",
      "matched_evidence": [
        {
          "path": "router/00-current-context.md",
          "location": "Status YAML block",
          "summary": "The page is marked review-needed and review_after is 2026-06-05, which is earlier than the report date."
        }
      ],
      "comparison_evidence": [],
      "uncertainty": "The elapsed review date shows that review is due; it does not show that any statement on the page is incorrect.",
      "confidence": 0.98,
      "risk": "medium",
      "recommended_action": "Review the current-context page and either confirm it as current or update only the sections that no longer match present reality.",
      "requires_approval": true,
      "no_write_performed": true,
      "deduplication_key": "stale-page:router/00-current-context.md:review_after",
      "suppression_until": null,
      "review": null
    }
  ],
  "suppressed_findings": [],
  "errors": [],
  "safety": {
    "allowed_output_paths": [
      "system/reports/maintenance-latest.json",
      "system/reports/maintenance-latest.md"
    ],
    "source_files_changed": 0,
    "kanban_changed": false,
    "capture_files_changed": 0,
    "wiki_files_changed": 0,
    "live_files_changed": 0,
    "archive_files_changed": 0,
    "root_files_created": 0,
    "no_write_performed": true
  },
  "no_write_performed": true
}
```

## Example human-readable report

```markdown
# Mind Maintenance Report

**Report ID:** `mind-maintenance-20260613-120000`  
**Generated:** 2026-06-13 12:00 UTC  
**Source commit:** `EXAMPLE_COMMIT`  
**Mode:** report-only  
**Writes performed:** none

## Summary

- Files considered: 5
- Open findings: 1
- Accepted findings: 0
- Dismissed findings: 0
- Suppressed findings: 0
- Detector errors: 0
- Source files changed: 0

## Enabled detectors

- Stale page: completed
- Completed but active: completed
- Source gap: completed
- Duplicate candidate: disabled
- Contradiction candidate: disabled
- Capture promotion: disabled

## High-priority findings

No high-risk findings.

## Findings

### Review due for current AI context

- **Finding ID:** `finding-stale-page-current-context-001`
- **Type:** stale page
- **Risk:** medium
- **Confidence:** 0.98
- **Path:** `router/00-current-context.md`
- **Trigger:** `review_after` date has passed
- **Matched evidence:** The page is marked `review-needed`; its `review_after` value is `2026-06-05`, earlier than this report.
- **Uncertainty:** This shows that review is due. It does not prove that the page is incorrect.
- **Recommended review:** Confirm the page remains current, or update only the sections that no longer match present reality.
- **Approval required:** yes
- **Write performed:** no

## No findings detected

No valid finding was detected for:

- `live/projects/prochat-qa-memory/STRATEGY-PLAN.md`
- `wiki/organisations/prochat/brand/prochat-os-strategy.md`
- `live/dashboard.md`
- `system/automation-roadmap.md`

This means the enabled detectors found no evidence meeting the configured threshold. It does not prove those pages can never require maintenance.

## Detector errors

None.

## Safety verification

- Pilot boundary respected: yes
- Source files changed: no
- `kanban.md` changed: no
- Capture files moved or changed: no
- Wiki or live knowledge changed: no
- Archive changed: no
- Root output created: no

## Review instructions

Choose one action for each finding:

- **Leave open** — useful but not yet reviewed.
- **Accept** — concern is valid; prepare a separate exact-path proposal.
- **Dismiss** — not useful; record the reason and suppress unchanged recurrence.
- **Resolve** — only after an approved action is completed or review confirms no change is needed.

Accepting a finding does not authorize a content write.
```

## Quality requirements demonstrated

The example deliberately demonstrates these properties.

### Evidence is exact

The finding names:

- one exact path;
- one exact metadata block;
- one exact trigger;
- one bounded recommendation.

It does not generalize from age to falsehood.

### Uncertainty is explicit

The report distinguishes:

```text
review is due
```

from:

```text
the page is wrong
```

The second claim is not made because no comparison evidence exists.

### Negative results are careful

The report says:

```text
No valid finding was detected by enabled detectors.
```

It does not say:

```text
These pages have no maintenance problems.
```

That distinction is required whenever detectors are disabled or bounded.

### Disabled detectors remain visible

The report shows that duplicate, contradiction, and capture-promotion detectors did not run.

A reader should never mistake a disabled detector for a clean result.

### Review is separate from writing

The finding can be accepted without changing the source page.

A separate exact-path proposal is required before any write.

## Example accepted review

The finding may later contain:

```json
{
  "status": "accepted",
  "review": {
    "reviewed_by": "Steve Westhoek",
    "reviewed_at": "2026-06-13T13:00:00Z",
    "decision": "accepted",
    "reason": "The page needs a content review.",
    "next_action": "Prepare an exact-path review proposal for router/00-current-context.md.",
    "resolution_ref": null
  }
}
```

Required outcome:

- source page remains unchanged;
- no automatic review date update occurs;
- a separate proposal may be prepared.

## Example dismissed review

```json
{
  "status": "dismissed",
  "suppression_until": "2026-07-13",
  "review": {
    "reviewed_by": "Steve Westhoek",
    "reviewed_at": "2026-06-13T13:00:00Z",
    "decision": "dismissed",
    "reason": "The page remains intentionally valid despite the elapsed date.",
    "next_action": "Suppress unchanged recurrence until the next review date.",
    "resolution_ref": null
  }
}
```

Required outcome:

- source page remains unchanged;
- identical evidence does not immediately reappear;
- new evidence or changed metadata may reopen the concern.

## Example partial detector failure

If source-gap analysis times out, the report should preserve the stale finding and add:

```json
{
  "detector": "source-gap",
  "path": "wiki/organisations/prochat/brand/prochat-os-strategy.md",
  "error_type": "timeout",
  "summary": "Source-gap semantic review exceeded its bounded execution time.",
  "retryable": true
}
```

The Markdown projection should say:

```text
Source-gap detector did not complete for ProChat OS strategy.
This is not equivalent to finding no source gap.
```

The report remains partial and report-only.

## Example parity checks

An implementation should verify:

```text
JSON report_id == Markdown report ID
JSON source_commit == Markdown source commit
JSON findings_total == Markdown finding count
JSON detector_errors == Markdown detector error count
JSON no_write_performed == true
Markdown writes performed == none
```

A parity mismatch fails the run.

## Example forbidden outputs

The pilot fails if it produces wording such as:

```text
The current-context page is outdated and should be rewritten.
```

Why:

- “outdated” overstates the time trigger;
- “rewritten” is too broad;
- no comparison evidence is cited.

The pilot also fails if it says:

```text
No contradictions exist.
```

Why:

- contradiction detection is disabled.

The pilot fails if it changes:

```text
router/00-current-context.md
```

merely because the finding was generated or accepted.

## Brain implementation target

Brain should treat this example as a contract test for:

- report writer output;
- Markdown projection;
- evidence wording;
- disabled-detector transparency;
- review-state serialization;
- partial-error behavior;
- safety summary;
- JSON/Markdown parity.

The implementation may add machine-useful fields, but it must preserve the human meaning and safety guarantees shown here.

## Definition of done

This example is satisfied when the first Brain-generated pilot report:

- uses the same core structure;
- describes evidence with equal or better precision;
- preserves uncertainty;
- exposes disabled detectors and errors;
- produces matching JSON and Markdown;
- performs no source-content writes;
- can be reviewed without consulting implementation code.
