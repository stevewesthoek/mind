# Wager/Verdict Pattern

**Status:** canonical lightweight pattern  
**Purpose:** add a small scientific-method layer for significant business or workflow changes.  
**Applies to:** meaningful strategy, workflow, project, content, product, automation, or business changes where Steve wants to know later whether the change helped.  
**Does not do:** require a business-intelligence database, automate measurement, authorize implementation, or replace human judgment.

## Principle

A significant change should state what it expects to improve before the change is made, then record a later verdict using available evidence.

The pattern answers:

```text
What are we changing?
Why do we expect it to help?
How will we know?
When will we review it?
What will we do if it improves, fails, or remains unclear?
```

A wager is not approval. A verdict is not automatic enforcement.

## When to use this

Use a wager for changes that are large enough to evaluate later, such as:

- business strategy changes;
- product or positioning changes;
- content or publishing workflow changes;
- automation or AI workflow changes;
- sales, marketing, or onboarding experiments;
- recurring process changes;
- significant project direction changes.

Do not require a wager for tiny edits, factual corrections, routine maintenance, or one-off housekeeping.

## Wager outcomes

A wager may later receive one verdict:

```text
improved
neutral
worsened
insufficient_evidence
not_measured
superseded
```

Definitions:

- `improved` — evidence suggests the change helped enough to retain or expand.
- `neutral` — no meaningful difference was observed.
- `worsened` — evidence suggests the change hurt or created too much cost/risk.
- `insufficient_evidence` — evidence exists but is too weak, noisy, or incomplete.
- `not_measured` — the review window passed without usable evidence.
- `superseded` — another change replaced the wager before a clean verdict was possible.

## Wager template

```yaml
title: ""
date_created: YYYY-MM-DD
status: proposed | approved | active | verdict_recorded | superseded
proposed_change: ""
reason_for_change: ""
expected_improvement: ""
metric_or_observable_evidence: ""
baseline: ""
measurement_window:
  start: YYYY-MM-DD
  end: YYYY-MM-DD
planned_verdict_date: YYYY-MM-DD
affected_components:
  - ""
risk_and_reversibility: ""
approval:
  required: true
  status: pending | approved | rejected | not_required
  approval_ref: ""
evidence_sources:
  - ""
next_action: ""
no_write_performed: true
```

## Verdict template

```yaml
title: ""
wager_ref: ""
date_recorded: YYYY-MM-DD
verdict: improved | neutral | worsened | insufficient_evidence | not_measured | superseded
evidence_used:
  - ""
observed_result: ""
what_changed_since_wager:
  - ""
retain_revert_or_adjust: retain | revert | adjust | continue_measuring | no_action
follow_up_action: ""
reviewed_by: "Steve"
```

## Human-readable wager format

### Proposed change

- What will change:
- Why now:
- Affected components:

### Expected improvement

- Expected improvement:
- Metric or observable evidence:
- Baseline:
- Measurement window:
- Planned verdict date:

### Risk and reversibility

- Risk:
- Reversibility:
- Approval required:
- Approval status:

### Evidence sources

- `path or metric` — why it matters

### Next action

```text
<copy-ready next action or "none">
```

## Human-readable verdict format

### Verdict

- Wager reference:
- Verdict:
- Date recorded:

### Evidence used

- Evidence:
- Observed result:
- What changed since wager:

### Decision

- Retain, revert, adjust, continue measuring, or no action:
- Follow-up action:
- Reviewed by:

## Safety rules

- A wager does not authorize implementation.
- A verdict does not authorize automatic retain/revert/adjust actions.
- Exact-path approval is still required for durable edits.
- Do not fake metrics or invent baselines.
- If there is no evidence, record `not_measured` or `insufficient_evidence` honestly.
- Do not require a BI database before using this manually.
- Do not use wagers for every tiny change; the pattern should reduce confusion, not add bureaucracy.
- If a change affects clients, money, legal duties, or public commitments, require human review before action.

## Relationship to adjacent patterns

Use this with:

- `system/orientation-brief-template.md` when a wager depends on current context, strategy, constraints, or decision principles;
- `system/source-quality-gates.md` when the wager is based on external sources or transcripts;
- `system/intake-disposition-pattern.md` when an observation proposes a change;
- `system/session-closeout-receipt-template.md` when closing the work session that created or reviewed the wager.

The wager/verdict pattern is evidence discipline for important changes, not a replacement for approval or implementation planning.
