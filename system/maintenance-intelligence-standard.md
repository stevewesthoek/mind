# Mind Maintenance Intelligence Standard

**Status:** canonical report-only standard  
**Last reviewed:** 2026-08-03
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/brain-mind-bridge.md`, `system/knowledge-freshness-standard.md`  
**Purpose:** define how Mind detects maintenance needs, presents evidence, and learns from human review before any content-changing automation is allowed.

## Core principle

Maintenance intelligence should make Mind easier to trust and maintain without silently changing human knowledge.

```text
observe
→ compare
→ explain
→ propose
→ human reviews
```

This phase is report-only.

No report may directly rewrite, move, archive, merge, delete, or promote Mind content.

## Maintenance report types

The first supported report types are:

1. stale-page candidate;
2. duplicate-page candidate;
3. contradiction candidate;
4. completed-but-still-active candidate;
5. source-reference gap;
6. durable-insight-trapped-in-capture candidate.

Each report type must remain independently enableable and removable.

## Evidence rule

```text
No maintenance claim without matched evidence.
```

Every finding must include:

- exact affected path or paths;
- the statement, metadata, or state that triggered the finding;
- the evidence used for comparison;
- why the evidence may be relevant;
- confidence or uncertainty;
- a recommended review action;
- confirmation that no write occurred.

A date alone is not proof that knowledge is false.
A title similarity alone is not proof of duplication.
A newer file is not automatically more authoritative.

## Finding envelope

Use this normalized shape for maintenance findings:

```yaml
id: ""
type: stale-page | duplicate-candidate | contradiction-candidate | completed-but-active | source-gap | capture-promotion
status: open | dismissed | accepted | resolved | superseded
created: YYYY-MM-DD
source_repo: mind
paths:
  - ""
trigger: ""
evidence:
  - path: ""
    summary: ""
confidence: 0.0
risk: low | medium | high
recommended_action: ""
requires_approval: true
no_write_performed: true
```

Optional fields:

```yaml
scope: personal | project | organisation | system
reviewed_by: Steve Westhoek
reviewed_at: YYYY-MM-DD
dismissal_reason: ""
resolution_ref: ""
```

## Report surfaces

Use two distinct surfaces.

### `system/reports/`

Use for batch or generated analysis that may contain several findings.

Examples:

- weekly freshness scan;
- duplicate-candidate batch;
- contradiction scan;
- capture backlog analysis;
- maintenance quality metrics;
- latest-run machine-readable companion files.

Reports in this folder should be replaceable generated output unless explicitly marked historical.

Recommended naming:

```text
system/reports/maintenance-<type>-latest.md
system/reports/maintenance-<type>-latest.json
```

Use dated files only when preserving a reviewed audit snapshot is useful.

### `inbox/processed/`

Use for short human-facing review proposals, receipts, and accepted/dismissed maintenance outcomes. This is a review surface, not durable truth.

A review record should be compact:

```text
YYYY-MM-DD — maintenance-proposal — <type> — <title> — <paths> — <recommended action>
```

After review, append or update the outcome:

```text
status=accepted | dismissed | resolved
reason=<short human explanation>
```

Do not paste full batch reports into `inbox/processed/`.
Link to the report or exact paths instead. `wiki/log.md` remains a read-only compatibility ledger and is not a current write destination.

## Stale-page candidate

Trigger examples:

- `review_after` has passed;
- a current-context page has not been reviewed within its expected rhythm;
- referenced architecture or service state has changed;
- a page repeatedly conflicts with current observed behavior.

Required evidence:

- current status metadata;
- last review date when present;
- the specific changing claim;
- newer evidence or context when available.

Allowed recommendation:

- review and confirm current;
- mark `review-needed`;
- update a specific section;
- supersede or archive after approval.

Disallowed conclusion:

- “This page is wrong” based only on age.

## Duplicate-page candidate

Trigger examples:

- highly similar titles;
- overlapping summaries;
- repeated source references;
- two durable pages covering the same scope.

Required evidence:

- both exact paths;
- overlapping claims or sections;
- important differences in scope, date, ownership, or authority;
- suggested canonical destination.

Allowed recommendation:

- keep both because scopes differ;
- merge selected sections;
- link related pages;
- supersede one page;
- dismiss as false positive.

Disallowed action:

- automatic merge or deletion.

## Contradiction candidate

Trigger examples:

- two current pages make materially incompatible claims;
- live state conflicts with canonical strategy;
- raw research is being treated as committed truth;
- an implementation result conflicts with an architectural statement.

Required evidence:

- exact conflicting statements;
- source dates;
- scope and authority of each page;
- current observed evidence when available;
- uncertainty explanation.

Allowed recommendation:

- keep one current;
- update one page;
- mark both `review-needed`;
- preserve both as scoped viewpoints;
- supersede the older decision.

Disallowed behavior:

- silently blending the conflict into one new statement.

## Completed-but-still-active candidate

Trigger examples:

- completed task or project still appears in an active dashboard;
- archived implementation remains listed as current;
- project status conflicts with completion evidence;
- finished work remains in a current-context summary.

Required evidence:

- active path;
- completion evidence;
- affected navigation or status surface;
- proposed exact status change or archive destination.

Allowed recommendation:

- update status;
- remove from active index;
- archive after approval;
- keep active with a documented reason.

## Source-reference gap

Trigger examples:

- important strategic claim has no supporting source or decision reference;
- compiled knowledge cannot be traced to research, a decision, or observed evidence;
- a maintenance proposal cannot explain why it exists.

Required evidence:

- exact unsupported claim;
- likely source candidates when available;
- whether the claim is personal judgment, strategy, research, or fact.

Allowed recommendation:

- add source reference;
- mark as interpretation;
- downgrade confidence;
- leave unchanged when provenance is not needed.

Do not force citations onto personal reflections or self-authored convictions merely to satisfy a schema.

## Durable insight trapped in capture

Trigger examples:

- a capture contains a reusable decision, lesson, pattern, or rule;
- the same captured idea has been used repeatedly;
- a capture directly improves an active project or durable knowledge page;
- high-value insight remains unreviewed for an extended period.

Required evidence:

- exact capture path;
- summary of the reusable insight;
- possible existing destination page;
- duplicate check result;
- recommended destination and scope.

Allowed recommendation:

- update an existing page;
- create a reviewed durable page;
- route to source material;
- leave in capture;
- dismiss as temporary or low value.

Disallowed action:

- automatic promotion into trusted `knowledge/`, `faith/`, or another canonical domain.

## Confidence guidance

Confidence describes confidence in the maintenance finding, not confidence that the proposed change is correct.

Suggested interpretation:

```text
0.90–1.00  strong evidence; still requires review
0.70–0.89  likely useful review candidate
0.50–0.69  ambiguous; show uncertainty prominently
below 0.50 low-value suggestion; normally suppress from human review
```

Thresholds should be configurable in Brain, not hardcoded into Mind content.

## Dismissal and false-positive behavior

A human must be able to dismiss any finding with a short reason.

Recommended dismissal record:

```yaml
status: dismissed
reviewed_by: Steve Westhoek
reviewed_at: YYYY-MM-DD
dismissal_reason: "Different scopes; both pages are intentional."
```

Dismissed findings should not immediately reappear.

They may return only when:

- materially new evidence appears;
- one of the affected pages changes significantly;
- the dismissal review period expires where appropriate;
- the original dismissal explicitly requested rechecking.

Repeated false positives should reduce or disable that detector until its rules improve.

## Accepted findings

Accepting a finding does not itself authorize a write.

Use two steps:

```text
accept finding
→ create exact-path change proposal
→ approve bounded write
```

The write proposal must identify:

- exact path;
- exact action;
- expected before/after state;
- source references;
- rollback or recovery path when relevant.

## Resolution and history

A finding becomes `resolved` only after the reviewed action is completed and verified.

Resolution should record:

- changed paths;
- commit or operation reference when available;
- validation result;
- whether content was updated, superseded, archived, linked, or intentionally left unchanged.

Do not delete useful finding history merely because an issue is resolved.

## Brain and Mind responsibilities

### Brain owns

- detector implementation;
- scheduling;
- queues and throttling;
- model selection;
- confidence calculation;
- machine-readable reports;
- retries and runtime recovery;
- Brain Console visibility.

### Mind owns

- maintenance policy;
- report destinations;
- human-readable review surfaces;
- truth and approval boundaries;
- accepted/dismissed outcomes;
- durable resolution history where useful.

## Report-only safety rules

During this phase:

- no automatic file moves;
- no automatic archive actions;
- no automatic wiki updates;
- no automatic task changes;
- no deletion;
- no broad rewrite proposals;
- no generated output in repository root;
- no claim without exact evidence;
- no repeated resurfacing of dismissed findings without new evidence.

## Quality review

Evaluate each detector on:

- evidence accuracy;
- false-positive rate;
- usefulness of recommended action;
- clarity for a human reader;
- review time saved;
- noise introduced;
- whether the finding could be produced deterministically before using AI.

Disable or refine detectors that create more maintenance work than they save.

## Success criteria

This standard is working when:

- maintenance needs are visible before they cause confusion;
- every finding explains why it exists;
- humans can accept or dismiss findings quickly;
- dismissed findings stay dismissed unless evidence changes;
- no report silently changes Mind;
- Brain can later implement each detector as an independent module;
- maintenance intelligence makes the vault feel calmer, not busier.
