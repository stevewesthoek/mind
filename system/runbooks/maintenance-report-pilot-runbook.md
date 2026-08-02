# Maintenance Report Pilot Runbook

**Status:** report-only pilot  
**Depends on:** `system/maintenance-intelligence-standard.md`, `system/maintenance-report-contract.md`, `system/reports/README.md`  
**Purpose:** run and review the first bounded Mind maintenance report without changing Mind content.

## Pilot objective

Validate the maintenance-report contract against a small, representative dataset before any repo-wide scan or content-changing workflow is enabled.

The pilot should answer:

- can the report writer produce matching JSON and Markdown surfaces;
- can each finding cite exact evidence;
- can stale or conflicting knowledge be surfaced without overstating certainty;
- can findings be accepted or dismissed without authorizing writes;
- can duplicate findings be suppressed when evidence is unchanged;
- can detector errors remain visible without invalidating the entire report;
- does the report save review time rather than create noise.

## Safety state

This pilot is strictly report-only.

It may create or replace:

```text
system/reports/maintenance-latest.json
system/reports/maintenance-latest.md
```

It may not modify:

```text
system/agent-context/00-current-context.md
projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/product-strategy.md
home.md
system/automation-roadmap.md
kanban.md
capture/
wiki/log.md
```

No capture move, task update, archive action, strategy rewrite, or freshness-state change is permitted during the pilot.

## Pilot dataset

Inspect only these five paths:

```text
system/agent-context/00-current-context.md
projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/product-strategy.md
home.md
system/automation-roadmap.md
```

Why these pages were selected:

| Path | Purpose in pilot |
|---|---|
| `system/agent-context/00-current-context.md` | high-risk current context with explicit freshness metadata |
| `projects/prochat-qa-memory/STRATEGY-PLAN.md` | developing project strategy marked as draft |
| `wiki/organisations/prochat/brand/product-strategy.md` | canonical company/product strategy within its declared scope |
| `home.md` | human navigation and orientation surface; not runtime status |
| `system/automation-roadmap.md` | technical roadmap subordinate to the human-first strategy |

Do not expand the dataset during the first run.

## Enabled detectors

Enable only:

```yaml
stale-page: true
completed-but-active: true
source-gap: true
duplicate-candidate: false
contradiction-candidate: false
capture-promotion: false
```

Reasoning:

- stale-page checks are mostly deterministic;
- completed-but-active checks can compare explicit state and completion evidence;
- source-gap checks can test evidence requirements conservatively;
- duplicate and contradiction detectors require broader semantic comparison and should wait until report quality is proven;
- capture promotion should remain last because it can influence durable knowledge creation.

## Suggested pilot configuration

```yaml
mode: report-only
source_repo: mind
max_files: 5
max_findings_per_detector: 5
minimum_confidence: 0.70
ai_assist: when-ambiguous
write_surfaces:
  - system/reports/maintenance-latest.json
  - system/reports/maintenance-latest.md
history_snapshot: false
no_write_performed: true
```

Configuration belongs in Brain. This runbook defines the Mind-owned policy and expected behavior.

## Preflight

Before running:

1. Confirm the Mind working tree is understood.
2. Record the current Mind commit hash.
3. Confirm the five pilot paths exist.
4. Confirm report output paths are allowed.
5. Confirm no content-writing feature flag is enabled.
6. Confirm the runner is in `report-only` mode.
7. Confirm `kanban.md`, `capture/`, `wiki/`, `live/`, and `archive/` are not writable targets for the run.
8. Confirm the report writer can finish atomically or leave no partial latest report.

If any preflight fails, stop and produce no report.

## Expected deterministic checks

### Current context

Path:

```text
system/agent-context/00-current-context.md
```

Inspect:

- `status`;
- `last_reviewed`;
- `review_after`;
- `freshness_risk`;
- whether the page still claims to describe current context.

Expected behavior:

- a passed `review_after` date may create a stale-page finding;
- the finding must say the page needs review, not that it is false;
- no update to the page is allowed.

### QA Memory strategy

Path:

```text
projects/prochat-qa-memory/STRATEGY-PLAN.md
```

Inspect:

- draft status;
- last reviewed date;
- review-after date;
- whether the page is being treated as canonical elsewhere in the pilot dataset.

Expected behavior:

- a future review date should not produce a stale finding;
- draft status should not be reported as an error;
- a source-gap finding should only appear for a specific high-impact claim lacking provenance, not for the entire strategy merely because it is strategic.

### Company/product strategy (scoped)

Path:

```text
wiki/organisations/prochat/brand/product-strategy.md
```

Inspect:

- current status;
- last reviewed date;
- review-after date;
- source or decision references for high-impact claims;
- whether its declared company/product scope is being extended beyond that scope.

Expected behavior:

- a future review date should not create a stale finding;
- a scoped product strategy should not automatically be generalized into another product's authority;
- source-gap findings must identify an exact claim and explain why provenance matters.

### Mind navigation

Path:

```text
home.md
```

Inspect:

- whether links and navigation still represent active Mind surfaces;
- whether completed or deprecated Mind surfaces remain presented as primary;
- whether the page defers runtime status to Brain rather than claiming it.

Expected behavior:

- no completed-but-active finding without direct completion or supersession evidence;
- technical wording alone is not a maintenance defect or a runtime claim;
- ambiguous navigation concerns should be suppressed below the confidence threshold.

### Automation roadmap

Path:

```text
system/automation-roadmap.md
```

Inspect:

- subordinate status;
- completed versus remaining phases;
- whether completed items are still listed as pending;
- whether current implementation claims conflict with explicit status notes.

Expected behavior:

- completed-but-active findings require an exact mismatched phase or task;
- the roadmap being unfinished is not a defect;
- no roadmap rewrite is allowed.

## Report generation sequence

```text
read five exact files
→ run deterministic checks
→ build bounded candidate set
→ use AI comparison only for ambiguous candidates
→ validate every finding against the schema
→ write JSON atomically
→ render Markdown from the validated JSON
→ verify report IDs and counts match
→ confirm no other paths changed
```

The Markdown report must be rendered from the canonical JSON result, not generated independently.

## Required report metadata

Both report surfaces must include:

```text
schema version
report ID
generated time
generator identity
source commit
mode: report-only
enabled detectors
files considered
finding counts
suppressed finding count
detector errors
no_write_performed: true
```

## Finding quality checklist

Every finding must answer:

1. Which exact path is affected?
2. What exact metadata, statement, or state triggered it?
3. What evidence was matched?
4. Is there comparison evidence, or is the finding only time-triggered?
5. What is uncertain?
6. Why does this matter?
7. What should a human review?
8. What action is recommended?
9. Does the finding explicitly require approval?
10. Does it explicitly confirm no write occurred?

Suppress the finding if these questions cannot be answered clearly.

## Expected first-run findings

The pilot should not be designed to force a certain number of findings.

A plausible first result is:

- one stale-page candidate for `system/agent-context/00-current-context.md` if its review date remains passed;
- zero stale findings for the scoped strategy page while its review date remains in the future;
- zero completed-but-active findings unless direct completion evidence is found;
- zero or a small number of source-gap candidates tied to exact high-impact claims;
- no duplicate, contradiction, or capture-promotion findings because those detectors are disabled.

A report with zero valid findings is acceptable if the evidence does not support a finding.

## Example stale-page finding

```yaml
id: finding-stale-page-current-context-001
type: stale-page
status: open
paths:
  - system/agent-context/00-current-context.md
trigger: review_after date has passed
matched_evidence:
  - path: system/agent-context/00-current-context.md
    location: status block
    summary: The page is marked review-needed and its review date is earlier than the report date.
comparison_evidence: []
confidence: 0.98
risk: medium
recommended_action: Review the current-context page and either confirm it or update the affected sections.
requires_approval: true
no_write_performed: true
```

The report must not claim that the page is incorrect without matched current evidence.

## Review procedure

Open:

```text
system/reports/maintenance-latest.md
```

For each finding, choose:

### Leave open

Use when the finding appears useful but is not yet reviewed.

### Accept

Use when the concern is valid.

Acceptance authorizes only:

```text
prepare a separate exact-path proposal
```

It does not authorize a write.

### Dismiss

Record a concise reason such as:

```text
Different scopes; both pages are intentionally separate.
```

The same finding should remain suppressed while evidence is unchanged.

### Resolve

Use only after:

- an approved follow-up was completed and verified; or
- human review confirmed no change was required.

Record a resolution reference.

## False-positive review

For every dismissed finding, classify the cause:

```text
scope misunderstood
page type misunderstood
age over-weighted
source expectation inappropriate
completion evidence insufficient
confidence too high
stale input graph/context
other
```

After the pilot, summarize:

- findings generated;
- findings accepted;
- findings dismissed;
- false-positive causes;
- review time;
- whether the report was easier than manually reviewing all five pages.

## Acceptance tests

### Output tests

- [ ] Both latest report files exist.
- [ ] Both share the same report ID.
- [ ] Both share the same source commit.
- [ ] Both report five files considered.
- [ ] Both show the same finding and error counts.
- [ ] Both state `report-only`.
- [ ] Both confirm no writes occurred.

### Evidence tests

- [ ] Every finding cites exact paths.
- [ ] Every finding includes matched evidence.
- [ ] Time-triggered findings do not claim falsehood.
- [ ] Source-gap findings cite exact claims.
- [ ] Completed-active findings cite completion evidence.
- [ ] Confidence remains between 0 and 1.
- [ ] Every finding includes a stable deduplication key.

### Safety tests

- [ ] The five pilot source files remain unchanged.
- [ ] `kanban.md` remains unchanged.
- [ ] No capture files move or change.
- [ ] No wiki or live knowledge pages change.
- [ ] No archive writes occur.
- [ ] No generated files appear in repository root.
- [ ] A detector failure appears explicitly in both outputs.

### Review tests

- [ ] A finding can remain open.
- [ ] A finding can be accepted without creating a content write.
- [ ] A finding can be dismissed with a reason.
- [ ] An unchanged dismissed finding stays suppressed on the next run.
- [ ] Changed evidence can legitimately reopen a concern.

## Stop conditions

Stop the pilot immediately if:

- any non-report file changes;
- the report writer targets repository root;
- report IDs or counts differ between JSON and Markdown;
- a detector claims a page is false without evidence;
- an accepted finding triggers a write;
- a dismissed finding immediately reappears unchanged;
- the runner expands beyond the five allowed paths;
- a partial failure is reported as a clean run.

## Pilot completion handoff

After a successful run, record:

```text
source commit
report ID
enabled detectors
files considered
findings by type
accepted/dismissed/open counts
false-positive causes
detector errors
review duration
safety verification
recommended next detector or correction
```

Then choose exactly one next step:

```text
refine the report writer
refine one detector
add the duplicate detector to the same five-file dataset
add the contradiction detector to the same five-file dataset
stop because report quality is not yet useful
```

Do not expand to the whole vault immediately after one successful pilot.

## Definition of done

The pilot is complete when:

- matching JSON and Markdown reports are produced;
- all findings meet evidence requirements;
- human review states work without content writes;
- false positives can be suppressed;
- source files remain unchanged;
- the result demonstrates enough value to justify one carefully chosen next detector.
