# Maintenance Pilot Fixture

**Status:** canonical test fixture  
**Depends on:** `system/runbooks/maintenance-report-pilot-runbook.md`, `system/maintenance-report-contract.md`  
**Purpose:** define the exact five-file pilot inputs, expected detector behavior, sample findings, negative cases, and review outcomes for the first report-only maintenance implementation.

## Fixture boundary

This fixture is intentionally small.

The implementation must inspect only:

```text
router/00-current-context.md
live/projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/prochat-os-strategy.md
live/dashboard.md
system/automation-roadmap.md
```

No other Mind paths may influence the first pilot result except:

- the current date;
- the source commit hash;
- the maintenance contracts and runbook;
- explicit configuration supplied by Brain.

This makes the first run reproducible and reviewable.

## Enabled detectors

```yaml
stale-page: true
completed-but-active: true
source-gap: true
duplicate-candidate: false
contradiction-candidate: false
capture-promotion: false
```

The fixture must fail if a disabled detector emits a finding.

## Fixture assumptions

The first pilot assumes the following page states.

### Current context

Path:

```text
router/00-current-context.md
```

Expected metadata:

```yaml
status: review-needed
last_reviewed: 2026-05-22
review_after: 2026-06-05
freshness_risk: high
```

Interpretation:

- this page claims to represent current AI-session context;
- its review date has passed;
- it is already marked `review-needed`;
- age is enough to request review but not enough to declare any claim false.

### QA Memory strategy

Path:

```text
live/projects/prochat-qa-memory/STRATEGY-PLAN.md
```

Expected metadata:

```text
Status: draft
Last reviewed: 2026-06-13
Review after: 2026-07-13
Freshness risk: medium
```

Interpretation:

- draft is intentional;
- the page is not stale while the review date remains in the future;
- draft status is not an error;
- the page should not be treated as canonical ProChat strategy.

### ProChat OS strategy

Path:

```text
wiki/organisations/prochat/brand/prochat-os-strategy.md
```

Expected metadata:

```text
Status: current
Last reviewed: 2026-06-13
Review after: 2026-07-13
Freshness risk: high
```

Interpretation:

- the page is current and high impact;
- the review date is still valid during the initial fixture period;
- niche-product strategy may extend this strategy without contradicting it;
- source-gap checks must target exact high-impact claims, not the page generally.

### Live dashboard

Path:

```text
live/dashboard.md
```

Expected state:

- Brain Console is described as primary;
- Markdown is described as fallback/reference navigation;
- no explicit completion evidence exists within the bounded dataset;
- technical wording is not itself a maintenance issue.

### Automation roadmap

Path:

```text
system/automation-roadmap.md
```

Expected state:

- marked as a technical automation sub-roadmap;
- explicitly subordinate to the canonical Mind philosophy, strategy, roadmap, and implementation plan;
- contains completed foundation and remaining phases;
- unfinished phases are intentional and not a defect.

## Expected report summary

A valid initial report should usually resemble:

```json
{
  "files_considered": 5,
  "findings_total": 1,
  "findings_open": 1,
  "findings_suppressed": 0,
  "detector_errors": 0,
  "no_write_performed": true
}
```

This is a default expectation, not a forced result.

A different finding count is acceptable only when every extra or missing finding is explained by exact evidence and configuration.

## Required positive finding

### Stale current-context candidate

The deterministic stale-page detector should emit one finding when the report date is after `2026-06-05`.

Expected semantic content:

```yaml
id: finding-stale-page-current-context-001
type: stale-page
status: open
source_repo: mind
scope: system
paths:
  - router/00-current-context.md
trigger: review_after date has passed
matched_evidence:
  - path: router/00-current-context.md
    location: status block
    summary: The page is marked review-needed and review_after is earlier than the report date.
comparison_evidence: []
confidence: 0.98
risk: medium
recommended_action: Review the current-context page and either confirm it or update only the affected sections.
requires_approval: true
no_write_performed: true
deduplication_key: stale-page:router/00-current-context.md:review_after
```

Required wording properties:

- says `review` or `revalidate`;
- does not say the page is false;
- does not propose a broad rewrite;
- does not modify the page;
- clearly distinguishes time-triggered evidence from contradiction evidence.

## Required negative cases

The first report should not emit the following findings unless the fixture inputs have materially changed.

### No stale finding for QA Memory strategy

Reason:

- its review date is in the future for the initial pilot;
- draft status is intentional;
- no evidence in the five-file dataset proves the draft is misleading.

Invalid finding example:

```text
The QA Memory strategy is stale because it is a draft.
```

Why invalid:

- draft and stale are different states;
- no freshness trigger exists.

### No stale finding for ProChat OS strategy

Reason:

- its review date is in the future for the initial pilot;
- it is explicitly current;
- no newer contradictory evidence exists inside the bounded dataset.

### No contradiction finding

Reason:

- the contradiction detector is disabled;
- QA Memory is a niche derivative and may align with the flagship strategy;
- semantic difference is not automatically contradiction.

### No duplicate finding

Reason:

- the duplicate detector is disabled;
- related strategy pages with different scope are not duplicates by default.

### No capture-promotion finding

Reason:

- the capture detector is disabled;
- no capture path is part of the fixture.

### No completed-but-active finding for dashboard

Reason:

- the bounded dataset contains no direct completion or supersession evidence for the dashboard;
- describing Brain Console as primary and Markdown as fallback is internally coherent.

### No completed-but-active finding for roadmap

Reason:

- a roadmap can contain completed foundation and unfinished phases simultaneously;
- incomplete work is not a status mismatch.

## Source-gap test cases

The source-gap detector is enabled but must behave conservatively.

### Acceptable no-finding outcome

It is valid for the detector to emit zero source-gap findings when:

- the claims are clearly strategic choices or self-authored principles;
- provenance would not materially improve trust;
- the bounded dataset contains no likely source candidate;
- the detector cannot identify an exact unsupported factual claim.

### Acceptable finding shape

A source-gap finding is valid only when it identifies an exact claim.

Example:

```yaml
id: finding-source-gap-prochat-strategy-001
type: source-gap
status: open
paths:
  - wiki/organisations/prochat/brand/prochat-os-strategy.md
trigger: high-impact factual claim lacks a linked decision or source reference
matched_evidence:
  - path: wiki/organisations/prochat/brand/prochat-os-strategy.md
    location: "<exact heading or line reference>"
    summary: "<exact claim summary>"
confidence: 0.74
risk: low
recommended_action: Confirm whether this is a strategic choice, observed fact, or externally sourced claim; add provenance only if it improves trust.
requires_approval: true
no_write_performed: true
```

Invalid behavior:

- flagging the whole page;
- demanding citations for every product principle;
- treating Steve's own strategic decision as an unsupported external fact;
- inventing a source candidate.

## Completed-but-active test cases

This detector should emit zero findings in the initial fixture unless one of the five pages contains direct, explicit mismatch evidence.

A valid finding would require:

```text
active status or active navigation
+
explicit completion, cancellation, replacement, or archive evidence
```

Title words such as `final`, `complete`, or `roadmap` are insufficient on their own.

## Report ID and parity fixture

The JSON and Markdown outputs must share:

```text
report_id
generated_at
source_commit
files_considered
enabled detector list
findings_total
findings_open
findings_suppressed
detector_errors
no_write_performed
```

Fixture assertion:

```text
JSON report ID == Markdown report ID
JSON finding count == Markdown finding count
JSON detector error count == Markdown detector error count
```

The Markdown report must be rendered from the validated JSON data.

## Review-state fixture

Use the required stale current-context finding to test review behavior.

### Open state

Initial state:

```yaml
status: open
review: null
```

Expected behavior:

- appears in the human report;
- remains non-writing;
- may appear in the next report if still unchanged and not reviewed.

### Accepted state

Review record:

```yaml
status: accepted
reviewed_by: Steve Westhoek
reviewed_at: 2026-06-13T00:00:00Z
reason: The page needs a content review.
next_action: Prepare an exact-path proposal for router/00-current-context.md.
```

Expected behavior:

- no source page changes;
- no automatic `last_reviewed` update;
- a separate write proposal may be prepared;
- the report records acceptance.

### Dismissed state

Review record:

```yaml
status: dismissed
reviewed_by: Steve Westhoek
reviewed_at: 2026-06-13T00:00:00Z
reason: The current page remains intentionally valid despite the elapsed date.
suppression_until: 2026-07-13
```

Expected behavior:

- identical evidence does not immediately resurface;
- the source page remains unchanged;
- changed page content or materially new evidence may reopen the concern;
- the dismissal reason remains inspectable.

### Resolved state

Review record:

```yaml
status: resolved
reviewed_by: Steve Westhoek
reviewed_at: 2026-06-13T00:00:00Z
reason: The page was reviewed and confirmed current.
resolution_ref: "<commit or reviewed operation reference>"
```

Expected behavior:

- resolution is traceable;
- unchanged evidence does not create a duplicate open finding;
- a future passed review date may create a new finding with a new evidence state.

## Suppression fixture

Use this stable key:

```text
stale-page:router/00-current-context.md:review_after
```

Suppress only when all are unchanged:

- detector type;
- path;
- trigger;
- relevant metadata values;
- affected claim scope;
- source commit content for the page.

Do not suppress when:

- `review_after` changes;
- page content materially changes;
- new contradiction evidence appears;
- a reviewer explicitly requests rechecking;
- the suppression period expires.

## Detector-error fixture

Simulate one detector failure without failing the report.

Example:

```json
{
  "detector": "source-gap",
  "path": "wiki/organisations/prochat/brand/prochat-os-strategy.md",
  "error_type": "timeout",
  "summary": "Source-gap semantic review exceeded its bounded execution time.",
  "retryable": true
}
```

Expected report summary:

```json
{
  "files_considered": 5,
  "findings_total": 1,
  "findings_open": 1,
  "findings_suppressed": 0,
  "detector_errors": 1,
  "no_write_performed": true
}
```

Required behavior:

- stale-page result is preserved;
- the Markdown report shows the source-gap detector error;
- the report does not claim that no source gaps exist;
- no retries continue indefinitely;
- no content files change.

## Atomic-write fixture

The report writer should use this sequence:

```text
validate complete JSON in memory
→ write temporary JSON report
→ fsync/close
→ rename to maintenance-latest.json
→ render Markdown from validated JSON
→ write temporary Markdown report
→ fsync/close
→ rename to maintenance-latest.md
→ verify parity
```

If Markdown rendering fails after JSON replacement:

- report the run as incomplete;
- do not present the JSON-only result as a successful complete run;
- retain explicit recovery information;
- never touch the five source files.

Implementation details belong in Brain, but the outcome must satisfy this Mind-owned contract.

## Safety fixture

Capture before/after hashes or Git status for:

```text
router/00-current-context.md
live/projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/prochat-os-strategy.md
live/dashboard.md
system/automation-roadmap.md
kanban.md
```

Expected:

```text
all unchanged
```

Allowed changed paths:

```text
system/reports/maintenance-latest.json
system/reports/maintenance-latest.md
```

No other changed path is acceptable for the pilot.

## Pilot review scorecard

After the first run, record:

| Measure | Result |
|---|---|
| Files considered | 5 |
| Findings total | |
| Findings accepted | |
| Findings dismissed | |
| Findings left open | |
| Detector errors | |
| False-positive causes | |
| Review duration | |
| Source files changed | must be 0 |
| Report parity | pass/fail |
| Useful enough for next detector | yes/no |

## Pass criteria

The fixture passes when:

- the five-file boundary is respected;
- only enabled detectors run;
- the current-context stale candidate is correctly represented when its date is passed;
- no forced false positives are created for the other pages;
- source-gap behavior is claim-specific and conservative;
- JSON and Markdown outputs match;
- review states work without writes;
- suppression behaves predictably;
- detector errors remain explicit;
- source files remain unchanged.

## Fail criteria

The fixture fails when:

- any disabled detector emits a finding;
- age is presented as proof of falsehood;
- draft status is treated as stale;
- related strategy pages are treated as duplicates without a duplicate detector;
- a source-gap finding lacks an exact claim;
- a detector error is hidden;
- accepting a finding changes content;
- any source file changes;
- generated output appears outside the two allowed latest-report paths.

## Next step after fixture success

Choose one:

```text
add duplicate detection to the same fixture
add contradiction detection to the same fixture
refine stale-page evidence quality
refine source-gap precision
improve suppression behavior
stop because the report is not yet useful
```

Do not expand to a repo-wide scan until one additional detector or one quality refinement passes against this same bounded dataset.
