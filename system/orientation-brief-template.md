# Orientation Brief Template

**Status:** canonical lightweight template  
**Purpose:** strengthen Mind as Brain's orientation layer without creating a heavy ontology.  
**Applies to:** significant AI-assisted work where Brain needs current context, strategy, constraints, active projects, decision principles, and evidence before proposing action.  
**Does not do:** replace source pages, authorize durable writes, or require duplicating the whole vault.

## Principle

Use the smallest useful brief.

The brief should summarize and reference existing Mind surfaces rather than copying whole files or creating a new folder structure.

Brain may use an orientation brief to understand context before observing, deciding, or proposing action. Mind remains the authority for personal and business truth.

## Source map

Prefer these existing Mind surfaces:

| Orientation need | Preferred source |
|---|---|
| Current context | `system/agent-context/00-current-context.md` |
| Retrieval map | `system/agent-context/00-memory-map.md` |
| Human entrypoint | `home.md` |
| Active priorities and tasks | `kanban.md` |
| Proposals and review log | `wiki/log.md` |
| Active project dashboard | `live/dashboard.md` |
| Strategy and operating principles | `system/mind-strategy.md`, `system/mind-roadmap.md`, `system/mind-implementation-plan.md` |
| Brain/Mind boundaries | `system/brain-mind-bridge.md` |
| Maintenance status | `system/reports/maintenance-latest.md` |
| Domain or business knowledge | relevant `wiki/` pages |
| Raw evidence | relevant `sources/` pages |

If a needed source is missing, record the gap instead of inventing orientation.

## When to use this

Use an orientation brief before work that could otherwise drift because Brain lacks context, such as:

- roadmap or implementation planning;
- business strategy decisions;
- project prioritization;
- capture promotion decisions;
- maintenance proposals;
- cross-repo changes;
- tasks that may touch Brain/Mind boundaries.

Do not require this for trivial edits or short factual checks.

## Brief template

```yaml
title: ""
date: YYYY-MM-DD
status: draft | current | superseded
purpose: ""
requested_by: "Steve"
scope:
  repos:
    - mind
    - brain
  paths:
    - ""
sources:
  - path: ""
    role: current_context | strategy | constraint | project_status | decision_principle | evidence | maintenance_status | other
    last_reviewed: ""
summary: ""
current_context:
  - ""
strategy_and_priorities:
  - ""
constraints_and_non_negotiables:
  - ""
trusted_sources_or_thinkers:
  - ""
active_projects_and_status:
  - ""
decision_principles:
  - ""
evidence_links:
  - ""
unknowns_or_gaps:
  - ""
recommended_next_action: ""
requires_approval: true
```

## Human-readable format

### Purpose

- Why this brief exists:
- What decision or task it should orient:

### Source references

- `path` — why it matters

### Current context

- What is true now:

### Strategy and priorities

- What matters most:

### Constraints and non-negotiables

- What Brain must not violate:

### Trusted sources / thinkers

- Sources Steve trusts for this task:
- Sources that should be treated cautiously:

### Active projects and status

- Project:
- Status:
- Relevant paths:

### Decision principles

- How to decide:
- Approval required:

### Evidence links

- `path` — evidence summary

### Unknowns or gaps

- Missing source:
- Ambiguity:
- Needed human decision:

### Recommended next action

```text
<copy-ready next task or "none">
```

## Safety rules

- A brief orients work; it does not approve work.
- Do not promote a brief to durable truth unless Steve reviews it.
- Do not copy full files into the brief when source references are enough.
- Do not let stale briefs override current evidence.
- Record uncertainty and missing sources instead of filling gaps with guesses.
- Important truth changes still require exact-path approval.
