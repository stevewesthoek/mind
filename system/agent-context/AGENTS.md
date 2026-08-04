# AGENTS.md — Mind AI Entry Point

Mind is Steve Westhoek's human-owned Obsidian vault and AI-readable orientation source.

## Read order

1. `00-start-here.md`
2. `00-current-context.md` when current state matters
3. `00-memory-map.md`
4. only the relevant domain files

Do not scan or load the entire vault.

## Repository boundary

```text
mind  = personal and organizational meaning, evidence, decisions, priorities, and history
brain = AI skills, retrieval, automation, configs, runtime, safety, and observability
```

Use Brain for how AI works. Use Mind for what Steve believes, knows, plans, values, has approved, or is researching.

## Current path contract

- new captures: `inbox/new/`;
- raw preserved inputs: `inbox/raw/` or `resources/`;
- generated proposals and receipts: `inbox/processed/`;
- failed processing target: `inbox/failed/`;
- current external failure-routing compatibility: consult `../folder-contract.md` before moving or writing failed captures;
- organizations: `organizations/`;
- projects: `projects/`;
- repo context: `repos/`;
- people: `people/`;
- faith: `faith/`;
- durable non-faith knowledge: `knowledge/`;
- resources/research: `resources/`;
- completed/superseded history: `history/`;
- task authority: consult `../task-kanban-contract.md`.

Legacy folders may remain for migration or history. They are not default destinations.

## Retrieval rules

1. Classify the request and required privacy boundary.
2. When the client exposes Brain's `mind-context` provider, call
   `mind_context_health` and use the Gateway only when it reports healthy,
   current, and read-only.
3. Prefer `mind_context_resolve` for bounded cited retrieval and use
   `mind_context_explain` only when ranking or exclusion evidence is needed.
4. If the provider is absent, unhealthy, stale, or returns unavailable, use
   `00-memory-map.md` and manual targeted reads. Do not broaden scope or infer a
   Gateway result.
5. Prefer current canonical pages over captures, historical material, model output, or generated graphs.
6. Check freshness and source evidence when the topic can change.
7. Surface contradictions and missing evidence.
8. Cite the Mind paths used when it helps verification.
9. Do not expose unrelated private context.

The Context Gateway is a preferred read-only retrieval interface, not a write
authority. It exposes no Mind mutation path; all write rules below still apply.

## Write rules

Reading and analysis do not authorize writes.

When the user explicitly requests a Mind write:

- prefer additive, exact, reversible edits;
- preserve provenance;
- use `inbox/new/` for an unclassified capture;
- use `resources/` for source material;
- place durable truth only in the correct domain after review;
- do not silently modify beliefs, strategy, priorities, commitments, tasks, project state, or history meaning;
- ask before moves, deletions, bulk rewrites, or automation-sensitive changes;
- never write secrets, credentials, cookies, tokens, or private keys.

`home.md`, `tasks.md`, `kanban.md`, and files under `system/agent-context/` are protected orientation surfaces. Change them only when the task explicitly requires it.

## Information-state rule

Treat these as different:

```text
capture ≠ evidence ≠ inference ≠ approved knowledge ≠ decision ≠ task ≠ runtime state
```

Generated summaries, relation proposals, and graphs are derived views, not authority.

## Canonical system docs

- `../infinite-brain-philosophy.md`
- `../mind-strategy.md`
- `../mind-roadmap.md`
- `../mind-implementation-plan.md`
- `../brain-mind-bridge.md`
- `../folder-contract.md`
