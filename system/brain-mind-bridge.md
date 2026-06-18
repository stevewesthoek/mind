# Brain–Mind Bridge Contract

**Status:** canonical bridge contract  
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`, `system/mind-roadmap.md`, `system/mind-implementation-plan.md`

## Purpose

This contract defines how Brain and Mind communicate without merging responsibilities or duplicating truth.

```text
brain = AI operating system
mind  = human knowledge and personal operating system
```

The bridge should be standardized, normalized, modular, explicit, and small.

## Ownership boundary

### Brain owns

- AI skills and orchestrators;
- automation and runtime behavior;
- schedulers, queues, retries, and recovery;
- model routing and tool selection;
- machine-facing system health;
- technical runbooks and execution logic.

### Mind owns

- personal knowledge and convictions;
- business strategy and decisions;
- active projects and priorities;
- reviewed research conclusions;
- durable human context;
- the current human interpretation of what is true and important.

### Shared through the bridge

- compact context briefs;
- capture-classification proposals;
- research summaries;
- decision proposals;
- maintenance suggestions;
- project/status handoffs;
- task proposals;
- source references;
- approval results.

The bridge should exchange references and summaries, not duplicate whole repositories or entire files.

## Core rules

1. Brain may observe, retrieve, compare, classify, summarize, and propose.
2. Mind remains the authority for personal and business truth.
3. Important truth changes require human approval.
4. Brain runtime state must not be copied into Mind as durable knowledge unless explicitly promoted.
5. Mind content must not become a global AI-system rule unless explicitly promoted into Brain.
6. Current evidence wins when it conflicts with stored knowledge.
7. Cross-repo exchanges must preserve provenance.
8. The smallest useful brief is preferred over full-context transfer.
9. Rejected proposals must not be silently reapplied.
10. Every approved write must target an explicit path and action.

## Normalized bridge envelope

Use this compact envelope for cross-repo proposals and handoffs:

```yaml
title: ""
type: capture-classification | research-summary | decision-proposal | maintenance-proposal | project-handoff | task-proposal | approved-context
status: proposed | approved | rejected | applied | superseded
source_repo: brain | mind | other
source_path: ""
created: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
confidence: 0.0
summary: ""
evidence:
  - ""
recommended_destination: ""
requires_approval: true
supersedes: ""
```

## Required versus optional fields

Required:

- `title`
- `type`
- `status`
- `source_repo`
- `source_path`
- `created`
- `summary`
- `recommended_destination`
- `requires_approval`

Optional when useful:

- `last_reviewed`
- `confidence`
- `evidence`
- `supersedes`

This envelope is for cross-repo communication. It is not required on every human-authored Mind note.

## Exact-path approval payload

An approval payload authorizes one bounded Mind action against explicit repository paths. It is separate from the proposal envelope and must not be inferred from a finding, recommendation, chat message, folder name, or broad goal.

Required JSON shape:

```json
{
  "schemaVersion": "1.0",
  "approvalId": "mind-approval-YYYYMMDD-HHMMSS-<short-id>",
  "proposalId": "<finding-or-proposal-id>",
  "sourceReportId": "<maintenance-report-id-or-null>",
  "sourceRepo": "mind",
  "sourceCommit": "<full-commit-hash>",
  "approvedBy": "<human-reviewer>",
  "approvedAt": "YYYY-MM-DDTHH:MM:SSZ",
  "expiresAt": "YYYY-MM-DDTHH:MM:SSZ",
  "action": "create | update | move | archive | supersede | add-source-reference",
  "targets": [
    {
      "path": "wiki/example.md",
      "expectedBeforeHash": "<sha256-or-null-for-create>",
      "destinationPath": null,
      "allowedSections": ["<exact-heading-or-frontmatter-key>"],
      "contentIntent": "<concise approved change intent>"
    }
  ],
  "sourceReferences": [
    {
      "path": "sources/example.md",
      "location": "<heading-or-line-range>",
      "summary": "<why this source supports the change>"
    }
  ],
  "constraints": {
    "maxFilesChanged": 1,
    "allowCreate": false,
    "allowDelete": false,
    "allowBroadFolderWrite": false,
    "preserveFrontmatter": true,
    "preserveSourceReferences": true
  },
  "validation": {
    "requiredChecks": [
      "target-path-match",
      "before-hash-match",
      "source-reference-preserved",
      "no-unapproved-paths-changed"
    ]
  },
  "reason": "<human approval reason>"
}
```

Rules:

- `targets` must contain at least one file and every target must be a repository-relative file path.
- Folder paths, globs, wildcards, repository roots, and unspecified destinations are invalid.
- `action` must describe one approved operation class; mixed unrelated actions require separate approvals.
- `expectedBeforeHash` is required for every existing target and must match immediately before execution.
- `destinationPath` is required only for `move`, `archive`, or `supersede`, and must also be an exact repository-relative file path.
- `allowedSections` must identify the exact headings or frontmatter keys that may change. An empty list means the whole explicitly named file was approved, not any sibling path.
- `contentIntent` must be specific enough to reject materially different edits.
- `sourceCommit` binds approval to reviewed repository state; execution must stop when the approved state is stale.
- `expiresAt` prevents indefinite reuse. Expired approvals require a new human review.
- `approvedBy`, `approvedAt`, and `reason` must come from an explicit human decision.
- `maxFilesChanged` must equal or exceed the number of distinct approved target and destination files, and execution must stop if the limit would be exceeded.
- `allowDelete` defaults to false. Archive and supersede flows must preserve history unless a separately approved exact deletion exists.
- Source references attached to the proposal must be preserved unless the approval explicitly identifies a replacement source reference.
- An accepted maintenance finding is not itself an approval payload.
- Approval payloads are single-use. Applied, rejected, expired, hash-mismatched, or superseded approvals must not be replayed.

Invalid payload examples:

```text
path: wiki/
path: "**/*.md"
action: clean up related files
destinationPath: choose the best location
expectedBeforeHash: omitted for an existing file
approvedBy: inferred from report status
```

A valid approval authorizes only the exact paths, operation, sections, intent, and repository state recorded in the payload.

## Brain → Mind flows

### Capture classification

```text
Brain/Mind Steward classifies capture
→ normalized proposal
→ capture/inbox/ or documented review surface
→ human review
→ approved placement
```

Allowed destinations after approval:

- `live/`
- `wiki/`
- `sources/`
- `archive/`
- `kanban.md`

### Research summary

Brain may prepare a compact research summary with sources and uncertainty.

Default destination:

```text
capture/inbox/
```

or a documented review surface when the research task explicitly requested a draft in `sources/research/`.

Research must not silently overwrite committed strategy.

### Decision proposal

Brain may prepare a proposed decision with:

- decision statement;
- evidence;
- trade-offs;
- affected pages;
- proposed destination;
- approval requirement.

Default destination:

```text
capture/inbox/
```

or `wiki/log.md` when the proposal is produced by Mind Steward maintenance.

### Maintenance proposal

Brain may propose:

- stale-page review;
- duplicate merge;
- contradiction resolution;
- archive candidate;
- source-reference improvement;
- completed-but-still-active correction.

Maintenance proposals must cite exact paths and evidence.

Default destination:

```text
wiki/log.md
```

or a report under `system/reports/` for batch analysis.

### Project or status handoff

Use a compact brief:

```text
goal
scope
current state
files/sources inspected
findings
decisions made
validation/review
risks/open questions
exact next action
```

Prefer references to Mind pages over copying their full contents.

### Task proposal

Brain may propose a task with:

- task title;
- source context;
- reason;
- suggested priority;
- project link;
- approval requirement.

`kanban.md` remains the task source of truth until lossless task sync is validated.

## Mind → Brain flows

Brain may retrieve approved Mind context for:

- current priorities;
- business strategy;
- durable decisions;
- project context;
- personal preferences and constraints;
- reviewed research conclusions;
- active workflows.

Retrieval rules:

1. Start from `router/AGENTS.md`.
2. Read `router/00-start-here.md`.
3. Read `router/00-current-context.md` when current state matters.
4. Use `router/00-memory-map.md`.
5. Search/read only the smallest relevant area.
6. State when information is missing, stale, or contradictory.
7. Do not treat raw research as committed strategy.

## Approval boundaries

### Brain may do automatically

- read approved Mind context;
- classify requests;
- search and compare pages;
- draft compact briefs;
- create report-only suggestions;
- identify likely stale, duplicate, or contradictory content;
- preserve source references;
- route failed automation into documented failure surfaces.

### Human approval is required for

- changing personal beliefs or convictions;
- changing business strategy;
- changing durable decisions;
- writing or rewriting `wiki/` truth;
- changing current project status in `live/`;
- moving material into archive;
- creating or changing tasks in `kanban.md`;
- promoting Mind content into global Brain rules;
- deleting or replacing source material.

## Write destinations

| Proposal type | Default review surface | Approved destination |
|---|---|---|
| Capture classification | `capture/inbox/` or `wiki/log.md` | `live/`, `wiki/`, `sources/`, `archive/`, task proposal |
| Research summary | `capture/inbox/` or draft under `sources/research/` | `sources/research/`, then possibly `wiki/` after review |
| Decision proposal | `capture/inbox/` or `wiki/log.md` | `live/decisions.md` or relevant `wiki/organisations/` page |
| Maintenance proposal | `wiki/log.md` or `system/reports/` | exact approved page/path |
| Project handoff | `capture/inbox/` or documented project page | `live/projects/` or project-specific page |
| Task proposal | review surface only | `kanban.md` after explicit approval |

## Supersession and contradiction

When new information conflicts with current Mind knowledge:

1. Current evidence is identified.
2. The conflicting Mind page is cited.
3. The contradiction is explained plainly.
4. Brain proposes one of:
   - update current page;
   - mark review-needed;
   - supersede old statement;
   - archive completed/obsolete material;
   - leave unresolved with both views documented.
5. Human approval determines the final truth change.

Do not silently merge contradictions.

## Rejection behavior

A rejected proposal should record enough information to prevent immediate repetition:

```yaml
status: rejected
last_reviewed: YYYY-MM-DD
summary: "Rejected because ..."
```

Brain should not repeatedly resurface the same proposal unless new evidence materially changes it.

## Logging and verification

Approved writes should record:

- proposal ID or source reference;
- approved action;
- exact changed path;
- before/after summary;
- validation result;
- timestamp;
- superseded path when relevant.

Mind's `wiki/log.md` may record human-readable maintenance events. Brain runtime logs remain in Brain.

## Safety boundary

The bridge must not:

- synchronize entire repos automatically;
- duplicate Brain runtime state in Mind;
- write automation dumps to Mind root;
- overwrite `kanban.md`;
- delete from `capture/failed/` automatically;
- rewrite durable Mind knowledge without approval;
- expose private Mind content to external systems without explicit permission;
- bypass Brain Core, scheduler, Mind Steward, or AI Model Selector for automation.

## Success criteria

The bridge is working when:

- Brain and Mind remain clearly separate;
- cross-repo context can move without copying entire files;
- every proposal has provenance and a destination;
- important truth changes remain human-approved;
- stale or conflicting knowledge can be corrected safely;
- automation does not create duplicate truth;
- Steve can understand the exchange without learning technical internals.
