# Source-Quality Gates

**Status:** canonical lightweight gates  
**Last reviewed:** 2026-08-03
**Purpose:** prevent mediocre, stale, irrelevant, or untrusted inputs from becoming durable Mind orientation just because they were ingested.  
**Applies to:** transcripts, newsletters, emails, meetings, web clips, research notes, imported documents, manual notes, and external ideas.  
**Does not do:** approve promotion, automate ingestion, judge people, or replace human review.

## Principle

Ingestion is not endorsement.

A source can be captured, summarized, or routed without becoming durable Mind truth. Promotion into `knowledge/`, `faith/`, another canonical domain, project files, strategy, task state, or orientation briefs requires source-quality review and approval when approval is required.

## Promotion gates

Before a source becomes durable orientation, check these gates:

| Gate | Question | Pass signal | Fail or caution signal |
|---|---|---|---|
| Source trust | Is the source known, credible, or intentionally selected by Steve? | Known expert, primary source, direct client/user evidence, trusted internal note. | Unknown author, sales copy, low-quality aggregator, spam, unverifiable claim. |
| Relevance | Does this matter to Steve's current strategy, project, decision, or operating context? | Directly supports an active project, priority, task, or known learning goal. | Interesting but not actionable, off-strategy, vague inspiration. |
| Evidence quality | Are the claims supported by clear evidence or useful first-hand context? | Primary evidence, direct quote/reference, concrete example, reproducible observation. | Hype, unsupported assertion, anecdote without context, no source trail. |
| Freshness risk | Could this be outdated or time-sensitive? | Current enough for the decision, or stable evergreen principle. | Old tactical advice, changed market/tool/law/pricing, stale AI/tool workflow. |
| Expected reuse value | Will this likely be reused enough to justify durable storage? | Reusable principle, decision evidence, project input, operating constraint. | One-time curiosity, duplicate, low future retrieval value. |
| Human approval requirement | Would promotion change durable truth, tasks, projects, strategy, or business decisions? | Human review completed or not required for low-risk summary. | Approval missing for any durable truth/task/project/strategy change. |

## Gate outcomes

Use one outcome:

```text
promote_allowed
promote_with_caution
summary_only
source_reference_only
reject_for_quality
needs_more_evidence
needs_human_approval
```

Definitions:

- `promote_allowed` — quality is good enough and approval requirements are satisfied.
- `promote_with_caution` — useful, but uncertainty/freshness/source caveats must travel with it.
- `summary_only` — keep a summary but do not treat as durable truth.
- `source_reference_only` — keep a pointer to the source; no distilled knowledge yet.
- `reject_for_quality` — do not promote; source is too weak, noisy, irrelevant, or untrusted.
- `needs_more_evidence` — source might matter, but evidence is insufficient.
- `needs_human_approval` — quality may be acceptable, but approval is required before promotion.

## Source-quality review template

```yaml
title: ""
date: YYYY-MM-DD
source_path: ""
source_type: transcript | newsletter | email | meeting | web_clip | research_note | imported_document | manual_note | other
source_name: ""
reviewed_by: ""
proposed_destination: ""
source_trust: pass | caution | fail
relevance: pass | caution | fail
evidence_quality: pass | caution | fail
freshness_risk: low | medium | high | unknown
expected_reuse_value: high | medium | low | unknown
human_approval_required: true
approval_status: not_required | pending | approved | rejected
overall_outcome: promote_allowed | promote_with_caution | summary_only | source_reference_only | reject_for_quality | needs_more_evidence | needs_human_approval
summary: ""
evidence:
  - ""
caveats:
  - ""
next_action: ""
no_write_performed: true
```

## Human-readable format

### Source

- Source path:
- Source type:
- Source name:
- Proposed destination:

### Gate review

- Source trust:
- Relevance:
- Evidence quality:
- Freshness risk:
- Expected reuse value:
- Human approval required:
- Approval status:

### Outcome

- Overall outcome:
- Summary:
- Caveats:

### Evidence

- Evidence reference:
- Missing evidence:

### Next action

```text
<copy-ready next action or "none">
```

## Safety rules

- A source-quality pass does not authorize a durable write by itself.
- A useful source can still require approval before promotion.
- A captured source can be rejected without deleting the capture.
- Do not promote raw transcripts, emails, or newsletters wholesale when a summary and source reference are enough.
- Do not use stale tactical advice as current operating truth without freshness review.
- Do not fill evidence gaps with model guesses.
- Treat marketing, hype, and tool-specific AI advice as provisional unless supported by stronger evidence.
- Exact-path approval is still required for durable edits to `knowledge/`, `faith/`, documented compatibility-authoritative paths, `kanban.md`, strategy, or project files.

## Relationship to adjacent patterns

Use this with:

- `system/intake-disposition-pattern.md` before routing a source to promotion;
- `system/processed-capture-receipt-template.md` when recording what happened to a capture;
- `system/orientation-brief-template.md` when a source may shape Brain's orientation layer.

Source-quality gates are a filter before durable orientation, not a new knowledge folder structure.
