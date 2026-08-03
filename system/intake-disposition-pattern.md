# Intake-Disposition Pattern

**Status:** canonical lightweight pattern  
**Last reviewed:** 2026-08-03
**Purpose:** define how observations become outcomes before adding more ingestion automation.  
**Applies to:** captures, transcripts, newsletters, emails, meetings, web clips, ideas, research notes, and other observations entering Mind or Brain-assisted review.  
**Does not do:** ingest automatically, approve durable writes, move files, or replace human review.

## Principle

Every intake item should have one clear disposition before it becomes durable Mind knowledge, a task, a project update, or an automated action.

The disposition answers:

```text
What is this observation?
Does it matter?
Where should it go?
What action, if any, is allowed?
What approval is required?
```

A disposition is a routing decision. It is not the same as approval.

## Routing outcomes

Use one primary disposition:

| Disposition | Meaning | Durable write allowed? |
|---|---|---|
| `ignore_archive` | Not useful enough to keep active; may be ignored or archived by an approved/manual process. | No, unless exact archive/delete action is separately approved. |
| `deterministic_action` | Simple rule-based handling, such as obvious spam, duplicate, or known notification. | Only if the deterministic action is already approved and bounded. |
| `knowledge_proposal` | Candidate for durable `knowledge/` or source summary. | No; requires human approval before promotion. |
| `task_proposal` | Candidate for `kanban.md` or a task system. | No; requires human approval before task write. |
| `project_update_proposal` | Candidate update to an active project or dashboard. | No; requires human approval before project write. |
| `maintenance_finding` | Candidate stale, conflicting, duplicate, missing-source, or cleanup finding. | No; finding may be reported, not applied. |
| `source_quality_rejection` | Source is too weak, irrelevant, stale, untrusted, or noisy to promote. | No. |
| `left_pending` | Needs human decision, better evidence, or more context. | No. |

## Model-routing guidance

Prefer the cheapest safe routing layer:

1. deterministic rules for obvious cases;
2. cheap model classification for simple low-risk routing;
3. stronger model only for high-context, strategic, ambiguous, or cross-project orientation tasks;
4. human review whenever the disposition could alter durable truth, tasks, projects, or business decisions.

Do not use expensive model reasoning when deterministic rules are enough. Do not use cheap classification when high-context orientation is required.

## Disposition template

```yaml
title: ""
date: YYYY-MM-DD
status: proposed | approved | rejected | applied | superseded
source_path: "inbox/new/..."
source_type: transcript | newsletter | email | meeting | web_clip | manual_note | other
source_name: ""
observation_summary: ""
primary_disposition: ignore_archive | deterministic_action | knowledge_proposal | task_proposal | project_update_proposal | maintenance_finding | source_quality_rejection | left_pending
routing_layer: deterministic | cheap_model | strong_model | human_review
confidence: 0.0
reason: ""
recommended_destination: ""
affected_paths:
  - ""
requires_approval: true
approval_status: not_required | pending | approved | rejected
evidence:
  - ""
source_quality_notes:
  - ""
next_action: ""
no_write_performed: true
```

## Human-readable format

### Observation

- Source path:
- Source type:
- Source name:
- Summary:

### Disposition

- Primary disposition:
- Routing layer:
- Confidence:
- Reason:

### Destination or action

- Recommended destination:
- Affected path(s):
- Approval required:
- Approval status:

### Evidence and quality

- Evidence:
- Source-quality notes:
- Missing context:

### Next action

```text
<copy-ready next action or "none">
```

## Safety rules

- A disposition does not authorize a durable write.
- A finding does not authorize a fix.
- A task proposal does not authorize editing `kanban.md`.
- A knowledge proposal does not authorize promotion into `knowledge/`.
- A project update proposal does not authorize editing project or dashboard files.
- Archive/delete actions require exact-path approval.
- Record uncertainty instead of forcing a disposition.
- Keep source references and summaries; do not copy full raw content when references are enough.

## Relationship to existing templates

Use this pattern before or alongside:

- `system/processed-capture-receipt-template.md` when recording what happened to a capture;
- `system/orientation-brief-template.md` when high-context orientation is needed before routing;
- `system/session-closeout-receipt-template.md` when closing a significant AI/repo work session.

This pattern may produce bridge proposals that follow `system/brain-mind-bridge.md`, but it does not replace the bridge contract.
