# Brain–Mind Bridge Contract

**Status:** canonical human policy
**Version:** 2.0
**Last reviewed:** 2026-07-31
**Owner role:** Steve Westhoek (human policy); Brain (machine schema and execution)
**Machine schema owner:** Brain
**Brain context-pack schema:** version `1.0` at `/Users/Office/Repos/stevewesthoek/brain/operations/specs/context-pack.schema.json`.
**Context Gateway contract:** Brain owns Context Gateway implementation and activation status; see Brain's live-status runbook for current state.
**Depends on:** `system/infinite-brain-philosophy.md`, `system/mind-strategy.md`
**Conflict rule:** Mind's human policy fields take precedence for approval, privacy, and authority semantics. Brain's JSON Schema takes precedence for machine payload shape. When field naming differs, adapters must map explicitly rather than treating either as canonical for both domains.

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
| New captures | verified live target `inbox/new/` (Brain B1.0a, 2026-07-22) |
| Raw preserved inputs | `inbox/raw/` or `resources/` |
| Generated proposals/receipts | `inbox/processed/` |
| Failed or blocked processing target | verified live target `inbox/failed/` (Brain B1.0a, 2026-07-22) |
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

The bridge human policy defines seven exchange types:

1. `context-pack`
2. `capture-disposition`
3. `knowledge-proposal`
4. `task-or-project-proposal`
5. `maintenance-finding`
6. `exact-path-approval`
7. `application-receipt`

Every conforming payload must contain `schema_version`, stable ID, type, creation time, source references, status, and producer.

## Context pack contract

A context pack is read-only orientation, not permission.

**Machine schema:** Brain Context Pack version `1.0` at `/Users/Office/Repos/stevewesthoek/brain/operations/specs/context-pack.schema.json` (validated BS0.21, 2026-07-16).

### Machine-required fields (Brain schema `1.0`)

Brain's executable schema uses camelCase and is authoritative for payload conformance. All fields below are required unless noted.

```text
packId              string, non-empty
version             const "1.0"
queryId             string, non-empty
generatedAt         date-time
freshness           "fresh" | "stale" | "mixed" | "unknown"
authorizedScopes    array of strings, min 1
sources             array of source objects (see below)
conflicts           array of conflict objects
unknowns            array of strings
exclusions          array of exclusion objects
privacyClassification  "public" | "internal" | "sensitive"
budget              { maxItems, maxTokens, usedItems, usedTokens }
truncation          { truncated: boolean, reason: string|null }
provenance          { retriever, corpusVersion, deterministicOrder: true }
state               { repository, deployed, observed, verified }
safetyWarnings      array of strings
modelSuppliedAuthority  boolean (optional)
```

Source object fields:

```text
sourceId    string
path        string
authority   "canonical" | "supporting" | "conflicting" | "untrusted"
citation    string, non-empty
sha256      string, 64 hex chars
freshness   "fresh" | "stale" | "unknown"
scope       string
untrusted   boolean
```

Conflict object fields: `field`, `leftSourceId`, `rightSourceId`.

Exclusion object fields: `sourceId`, `reason`.

### Human-policy vocabulary and field mapping

Mind's human-policy vocabulary uses expanded labels for human readability. When the bridge human policy uses a different name or value set, the following explicit mapping applies:

| Human-policy label | Machine field | Notes |
|---|---|---|
| schema_version | version | Always `"1.0"` |
| pack_id | packId | |
| query | queryId | |
| created_at | generatedAt | ISO 8601 |
| scopes_searched | authorizedScopes | |
| scopes_excluded | (derived from exclusions[].reason) | No direct machine field; encode as exclusion entries |
| authority_summary | (human-only) | Not in machine schema; used in bridge reports and proposals only |
| freshness_summary | (human-only) | Not in machine schema; used in bridge reports and proposals only |
| context_budget.requested_tokens | budget.maxTokens | |
| context_budget.estimated_tokens | budget.usedTokens | |
| context_budget.omitted_source_count | (derived from exclusions.length) | |
| brief | (human-only) | Not in machine schema; used in human-facing summaries |
| producer | provenance.retriever | |

### Authority labels

Machine schema values: `canonical`, `supporting`, `conflicting`, `untrusted`.

Mind human-policy expands authority into seven granular labels for human reasoning. The mapping to machine values:

| Human authority label | Machine authority value | When to use |
|---|---|---|
| human-decision | canonical | Explicit recent human decision |
| canonical | canonical | Current canonical document |
| primary-evidence | supporting | Cited primary evidence |
| reviewed-synthesis | supporting | Reviewed synthesis or summary |
| capture | supporting | Unreviewed capture |
| inference | untrusted | Model inference without approval |
| generated | untrusted | Generated index, graph, or summary |

When a source is known to conflict with other sources in the pack, use `conflicting` regardless of its human-policy label.

### Freshness states

Machine schema values (top-level pack): `fresh`, `stale`, `mixed`, `unknown`.
Machine schema values (per-source): `fresh`, `stale`, `unknown`.

Mind human-policy expansion:

| Human freshness label | Machine freshness value | Meaning |
|---|---|---|
| current | fresh | Within review window; no known supersession |
| review-needed | stale | Past review-after date or flagged for revalidation |
| superseded | stale | Explicitly replaced by newer material |
| unknown | unknown | No freshness metadata or unverifiable |

### Privacy scopes

Allowed scope values for `authorizedScopes`:

```text
personal | business | ministry | project:<id> | organization:<id> | public-safe
```

Detailed scope definitions: `system/context-privacy-scopes.md`.

### Conflict handling

When the retriever identifies conflicting sources:

1. Include both sources in the pack with `authority: "conflicting"`.
2. Record the conflict in the `conflicts` array with field, left source ID, and right source ID.
3. Do not silently omit either side.
4. Surface the conflict in any human-facing brief or summary.

### Citation rules

- Every material claim in a human-facing brief must cite a source ID.
- The `citation` field in each source must be a non-empty human-readable reference.
- Omitted sources must appear in the `exclusions` array with a reason.

### Unknown handling

- A missing source produces an entry in the `unknowns` array, not an inference presented as fact.
- A source with no freshness metadata uses `freshness: "unknown"`.
- A scope that cannot be searched (permissions, unavailable) appears in exclusions with reason.

### Least-disclosure behavior

- Search only scopes listed in `authorizedScopes`.
- Do not copy secrets, credentials, tokens, or private keys into any context pack.
- The `privacyClassification` field records the highest sensitivity of included content.
- Sensitive scope content that is not needed for the query must be excluded with reason.
- Context packs are disposable runtime projections, not durable Mind truth.

### Rules

- search only authorized scopes;
- cite every material claim;
- do not silently omit a known contradiction;
- record omitted source count via exclusions array;
- do not copy secrets or unrelated private information;
- a missing source produces an unknown, not an inference presented as fact;
- `modelSuppliedAuthority` must be `false` or absent; models cannot self-authorize;
- `provenance.deterministicOrder` must be `true`; non-deterministic ranking requires the semantic-ranker gate to pass evaluation first;
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
- Brain's JSON Schemas define executable payload shape. Context Pack version `1.0` is canonical at `/Users/Office/Repos/stevewesthoek/brain/operations/specs/context-pack.schema.json`.
- Brain's generated status and dated evidence define live capability state; see Brain's live-status runbook for current implementation and deployment claims.
- Generated copies must identify source version and must not be edited as new authority.

## Conformance

Priority 1 of both implementation plans must add a cross-repo contract check. Until it exists, reviewers manually verify:

1. current paths match `system/folder-contract.md`;
2. bridge policy and Brain `Context Pack 1.0` schema remain semantically aligned, with explicit mapping for differently named human-policy fields;
3. active agent instructions use `system/agent-context/`;
4. no payload implies approval;
5. Mind remains usable without Brain.
