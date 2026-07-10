# Brain–Mind Bridge Contract

**Status:** canonical human policy
**Version:** 2.0
**Last reviewed:** 2026-07-10
**Machine schema owner:** Brain
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`

## Purpose

The bridge lets Brain retrieve Mind context and propose or apply bounded changes without merging repositories or duplicating authority.

```text
Mind owns meaning.
Brain owns execution.
The bridge owns typed exchange.
```

## Ownership

### Mind owns

- beliefs, values, preferences, and identity;
- personal, business, ministry, and organizational strategy;
- approved decisions, priorities, projects, and tasks;
- reviewed knowledge and research conclusions;
- source evidence and human-readable history;
- human policy for approval and privacy.

### Brain owns

- machine-readable bridge schemas;
- Context Gateway retrieval and ranking;
- model/tool routing;
- queues, retries, idempotency, and throttling;
- approval validation and execution gates;
- rollback, verification, receipts, and runtime status;
- derived indexes, graphs, caches, and evaluations.

## Current Mind paths

| Purpose | Current path |
|---|---|
| New captures | `inbox/new/` |
| Raw preserved inputs | `inbox/raw/` or `resources/` |
| Generated proposals/receipts | `inbox/processed/` |
| Failed or blocked processing target | `inbox/failed/`; verify current external failure routing in `system/folder-contract.md` |
| Tasks | current authority defined by `system/task-kanban-contract.md` |
| Projects | `projects/` |
| Organizations | `organizations/` |
| Repo-specific context | `repos/` |
| People | `people/` |
| Faith knowledge and resources | `faith/` |
| Durable non-faith knowledge | `knowledge/` |
| Sources and research | `resources/` |
| Completed/superseded history | `history/` |
| Agent orientation | `system/agent-context/` |

Legacy paths may appear in history, archived reports, or explicit compatibility fixtures. They are not active defaults.

## Exchange types

The bridge supports seven types:

1. `context-pack`
2. `capture-disposition`
3. `knowledge-proposal`
4. `task-or-project-proposal`
5. `maintenance-finding`
6. `exact-path-approval`
7. `application-receipt`

Every payload contains `schema_version`, stable ID, type, creation time, source references, status, and producer.

## Context pack contract

A context pack is read-only orientation, not permission.

Required fields:

```yaml
schema_version: "1.0"
pack_id: ""
query: ""
created_at: ""
producer: ""
scopes_searched: []
scopes_excluded: []
sources:
  - path: ""
    authority: "human-decision | canonical | primary-evidence | reviewed-synthesis | capture | inference | generated"
    freshness: "current | review-needed | superseded | unknown"
    relevance_reason: ""
    excerpt: ""
authority_summary: ""
freshness_summary: ""
conflicts: []
unknowns: []
context_budget:
  requested_tokens: 0
  estimated_tokens: 0
  omitted_source_count: 0
brief: ""
```

Rules:

- search only authorized scopes;
- cite every material claim in `brief`;
- do not silently omit a known contradiction;
- record omitted source count;
- do not copy secrets or unrelated private information;
- a missing source produces an unknown, not an inference presented as fact;
- context packs are disposable runtime projections, not durable Mind truth.

## Proposal contract

A proposal describes a possible change. It does not authorize execution.

Required fields:

```yaml
schema_version: "1.0"
proposal_id: ""
type: "capture-disposition | knowledge-proposal | task-or-project-proposal | maintenance-finding"
status: "proposed | approved | rejected | applied | superseded | expired"
created_at: ""
source_paths: []
target_paths: []
summary: ""
evidence: []
confidence: 0.0
authority_impact: "none | metadata | knowledge | commitment"
requires_approval: true
```

Rules:

- targets are exact repository-relative paths;
- folder roots, globs, and unspecified destinations are invalid;
- proposals explain why an existing page cannot be reused when creating a new durable page;
- rejected proposals are not automatically reissued without materially new evidence;
- confidence never replaces evidence or approval.

## Approval contract

An approval authorizes one bounded operation against reviewed source state.

Required fields:

```yaml
schema_version: "1.0"
approval_id: ""
proposal_id: ""
approved_by: ""
approved_at: ""
expires_at: ""
source_commit: ""
idempotency_key: ""
action: "create | update | move | archive | supersede | add-source-reference"
targets:
  - path: ""
    expected_before_hash: ""
    destination_path: null
    allowed_sections: []
    content_intent: ""
constraints:
  max_files_changed: 1
  allow_delete: false
  allow_broad_folder_write: false
required_checks: []
reason: ""
```

Rules:

- approval is single-use and expires;
- existing targets require a before hash;
- source commit mismatch blocks execution;
- `allowed_sections` limits the diff;
- approval replay, path traversal, symlink escape, or scope expansion blocks execution;
- an approved finding is not automatically an approval payload;
- model output cannot populate `approved_by` or infer consent.

## Application receipt

Every attempted approved change produces a receipt in Brain runtime.

Required receipt fields:

- proposal and approval IDs;
- idempotency key;
- exact attempted paths;
- before and after hashes;
- applied or blocked status;
- validation results;
- rollback artifact reference;
- timestamp and executor version;
- no-unapproved-paths-changed result.

A compact human-readable receipt may be placed in `inbox/processed/` when useful. Full runtime logs remain in Brain.

## Retrieval flow

Target flow:

```text
user task
→ Context Gateway query + privacy scope + budget
→ deterministic discovery and ranking
→ optional semantic ranking when evaluation proves value
→ cited context pack
→ agent reasoning or proposal
```

Fallback when Brain is unavailable:

```text
system/agent-context/AGENTS.md
→ 00-start-here.md
→ 00-current-context.md when relevant
→ 00-memory-map.md
→ targeted search/read
```

## Write flow

```text
proposal
→ schema and evidence validation
→ exact diff preview
→ human approval when required
→ state/hash/expiry validation
→ bounded execution
→ post-write verification
→ receipt and rollback evidence
```

## Automatic operations

Brain may automatically perform deterministic, reversible work that does not alter human meaning, including:

- validate paths and schemas;
- rebuild derived indexes;
- calculate hashes;
- detect stale metadata or broken links;
- prepare proposals;
- retry safe report-only processing;
- preserve failed items and runtime evidence.

## Approval-required operations

Human approval is required for:

- changing beliefs, values, strategy, priorities, or commitments;
- promoting unreviewed material into durable knowledge;
- creating/changing tasks or project state;
- archival/supersession that changes active meaning;
- deletion;
- external communication, publication, financial, credential, infrastructure, or production actions;
- expanding an automation's authority or scope.

## Canonical-source rule

- Mind's philosophy, strategy, roadmap, and this bridge define human policy.
- Brain's JSON Schemas define executable payload shape.
- Brain's status runbook defines live capability state.
- Generated copies must identify source version and must not be edited as new authority.

## Conformance

Priority 1 of both implementation plans must add a cross-repo contract check. Until it exists, reviewers manually verify:

1. current paths match `system/folder-contract.md`;
2. bridge and Brain schema versions match;
3. active agent instructions use `system/agent-context/`;
4. no payload implies approval;
5. Mind remains usable without Brain.
