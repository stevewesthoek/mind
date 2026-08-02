# Mind Strategy

**Status:** canonical strategy
**Version:** 2.1
**Last reviewed:** 2026-07-31
**Owner role:** Steve Westhoek (human authority)
**Depends on:** `system/infinite-brain-philosophy.md`
**Conflict rule:** when this strategy conflicts with the philosophy, philosophy takes precedence. When lower documents conflict with this strategy, this strategy takes precedence unless a newer explicit human decision supersedes a specific choice.

## Strategic objective

Mind is Steve's human-first personal and organizational knowledge system.

Its objective is:

```text
Turn low-friction capture into trustworthy orientation, clear commitments,
durable learning, and useful history without making Steve maintain a machine ontology.
```

## Strategic position

```text
Mind  = authority for human meaning and approved context
Brain = authority for AI capability and execution
Bridge = versioned context, proposal, approval, and receipt exchange
```

The two-repo split is permanent unless evidence shows that separation itself causes more cost or errors than it prevents. No such evidence currently exists.

## Outcomes

Mind should deliver seven outcomes:

1. Capture takes seconds and does not require immediate organization.
2. Current priorities, projects, and decisions are easy to locate.
3. Durable knowledge preserves evidence and compounds through use.
4. Stale, contradictory, or low-authority information is visible.
5. Any authorized LLM can obtain a small, cited orientation pack without loading the vault.
6. Brain reduces maintenance without silently changing human truth.
7. Steve can correct, supersede, export, or remove his information without provider lock-in.

## Current structure

The target structure is authoritative:

```text
home.md
kanban.md
inbox/
organizations/
projects/
repos/
people/
faith/
knowledge/
resources/
history/
system/
```

`kanban.md` is the sole current human task authority. `tasks.md` is a retired, non-authoritative compatibility snapshot. Remaining legacy folders are compatibility surfaces only where the current folder contract explicitly says so. New documentation and code plans must use target paths.

## Information classes

Mind distinguishes these classes:

| Class | Meaning | Default home |
|---|---|---|
| Observation | Unreviewed input or event | `inbox/new/` |
| Raw source | Immutable original or imported evidence | `inbox/raw/` or `resources/` |
| Proposal | AI-generated classification, summary, relation, or change suggestion | `inbox/processed/` |
| Failed item | Processing failure or blocked item | `inbox/failed/` |
| Approved orientation | Reviewed current context or durable understanding | domain folder |
| Commitment | Human-approved decision, task, priority, or project state | `kanban.md`, `projects/`, `organizations/`, or `knowledge/` |
| History | Completed, superseded, or inactive material | `history/` |

AI output remains a proposal until its authority is explicitly changed.

## Authority and freshness

When sources disagree, use this order as a starting point:

1. explicit recent human decision;
2. current canonical organization/project/faith/knowledge page;
3. cited primary evidence;
4. reviewed synthesis;
5. unreviewed capture or model inference;
6. generated index, graph, or summary.

Recency does not automatically override authority. Brain should show the conflict when the correct interpretation is unclear.

Use freshness metadata only where change risk is meaningful:

```yaml
status: draft | current | review-needed | superseded | archived
last_reviewed: YYYY-MM-DD
review_after: YYYY-MM-DD
```

## Human navigation

The normal path is:

```text
home.md
→ one domain or active-work surface
→ linked page
```

Steve should not need to understand schemas, graphs, model routing, or automation state to use Mind.

## AI retrieval

Brain's Context Gateway activation status is owned by Brain's live-status runbook. The current default retrieval path for Mind agents is the manual targeted-read fallback:

```text
system/agent-context/AGENTS.md
→ 00-start-here.md
→ 00-current-context.md when needed
→ 00-memory-map.md
→ targeted search and reads
```

The target interface is one Brain-owned Context Gateway returning cited context packs with authority, freshness, conflicts, exclusions, and a token budget. Agent-specific instructions point to the gateway once activated; they do not reimplement retrieval.

## Capture and disposition

Capture processing follows:

```text
inbox/new
→ preserve source identity
→ deterministic checks
→ source-quality assessment
→ classification and relation proposal
→ inbox/processed or inbox/failed
→ human approval when meaning or commitment changes
→ approved destination
```

Duplicate detection, metadata extraction, and obvious spam/file validation may be deterministic. Models are reserved for interpretation.

## Brain–Mind bridge

Mind owns the human policy. Brain owns the executable schema and validation. The bridge exchanges references and compact payloads, not repository copies.

Required exchange types:

- context pack;
- capture disposition;
- knowledge or task proposal;
- maintenance finding;
- exact-path approval;
- application receipt;
- rejection/supersession record.

`system/brain-mind-bridge.md` defines the contract.

## Maintenance

Brain may automatically:

- validate paths and frontmatter;
- rebuild derived indexes;
- identify stale or conflicting pages;
- find duplicates and missing source references;
- prepare exact proposals;
- retry safe processing and preserve failures.

Human approval remains required for changes to beliefs, strategy, priorities, commitments, durable conclusions, archival meaning, and externally consequential actions.

## Privacy

Context retrieval is least-disclosure by default.

The future Context Gateway must support scope restrictions such as:

```text
personal | business | ministry | project:<id> | organization:<id> | public-safe
```

Every context pack should record which scopes were searched and which were excluded. Sensitive source content should not be copied into Brain runtime longer than necessary.

## Measurement

The system is evaluated by:

- retrieval precision and source coverage;
- freshness and authority correctness;
- contradiction detection;
- time to useful orientation;
- manual maintenance time;
- proposal acceptance and rejection rates;
- rollback and error rates;
- user-reported usefulness.

Volume of captures, graph edges, model calls, or generated summaries is not success by itself.

## Non-goals

Mind should not become:

- an AI runtime or log store;
- a rigid database-shaped ontology;
- a copy of Brain configuration;
- a mandatory vector database;
- a repository of every AI conversation;
- a system that autonomously decides Steve's values or priorities;
- a deeply nested filing system;
- dependent on continuous automation for basic usefulness.

## Strategic rule

```text
Improve orientation through better authority, lifecycle, retrieval, freshness,
and reviewed learning—not through more folders, prompts, or autonomous activity.
```
