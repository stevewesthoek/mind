# Top-Level Folder Migration Batch Plan — 2026-07-07

**Status:** planning only  
**Task:** Task O — Phase 4 Mind content migration planning  
**Depends on:** `system/top-level-folder-redesign-migration-plan.md`, `system/folder-contract.md`  
**Boundary:** do not move files from this plan without a separate approved migration batch.

## Current state

- Phase 1 inventory is complete.
- Phase 2 Brain compatibility is complete.
- Phase 3 target README-backed folders are prepared.
- No Mind content has been moved.
- No legacy folder has been deleted.
- Save-to-Mind still writes to legacy `capture/inbox/` until an explicit later switch.
- Continuous processing remains disabled.
- `wiki/log.md` has unrelated local changes and must not be touched by migration planning.

## Read-only inventory summary

| Legacy group | Files | Directories | Markdown files | Notes |
|--------------|-------|-------------|----------------|-------|
| `capture/` | 25 | 3 | 24 | Contains `daily/`, `failed/`, `inbox/`, and `README.md`. |
| `live/` | 20 | 5 | 20 | Contains current-state pages, project pages, task/status summaries, and dashboard surfaces. |
| `wiki/` | 216 | 51 | 204 | Large durable-knowledge root; includes areas, organizations, templates, and `wiki/log.md`. |
| `sources/` | 181 | 29 | 178 | Source/reference material; includes research, books, papers, transcripts, web, and files. |
| `archive/` | 846 | 36 | 831 | Large historical/old material root. |
| `router/` | 14 | 0 | 14 | AI/coding-agent context files. |
| `graphify-out/` | 201 | 36 | 28 | Large generated graph output; should not be moved manually yet. |
| `kanban.md` | 1 | 0 | 1 | Legacy task source of truth. |

## Migration principles

1. Move content in small folder-family batches, not one giant rename.
2. Preserve Git history with exact moves where possible.
3. Do not edit `wiki/log.md` until its unrelated local change is resolved.
4. Do not switch Save-to-Mind until `inbox/new/` is validated as the write target.
5. Do not move Graphify generated output manually through Workbench; migrate configuration and regenerate later.
6. Do not promote source material into knowledge without review.
7. Do not rewrite truth while moving files; only path/link updates belong in migration batches.
8. Keep legacy folders until validation passes and Steve explicitly approves cleanup.

## Proposed migration batches

### Batch 0 — Pre-move checks

**Goal:** confirm the workspace is safe before moving anything.

Actions:

- resolve or explicitly ignore unrelated local `wiki/log.md` changes;
- run a fresh status check;
- confirm Brain compatibility commits are present;
- confirm target README folders exist;
- confirm no Save-to-Mind switch is part of this batch.

No file moves.

### Batch 1 — Agent context migration

**Goal:** move AI/coding-agent context from legacy `router/` to target `system/agent-context/`.

Candidate moves:

| From | To |
|------|----|
| `router/00-current-context.md` | `system/agent-context/00-current-context.md` |
| `router/00-memory-map.md` | `system/agent-context/00-memory-map.md` |
| `router/00-start-here.md` | `system/agent-context/00-start-here.md` |
| `router/AGENTS.md` | `system/agent-context/AGENTS.md` |
| `router/CLAUDE.md` | `system/agent-context/CLAUDE.md` |
| `router/README.md` | `system/agent-context/router-README.md` or merge into existing README |
| `router/current.md` | `system/agent-context/current.md` |
| `router/implementation-plan.md` | `system/agent-context/implementation-plan.md` |
| `router/maintenance.md` | `system/agent-context/maintenance.md` |
| `router/map.md` | `system/agent-context/map.md` |
| `router/mind-steward.md` | `system/agent-context/mind-steward.md` |
| `router/roadmap.md` | `system/agent-context/roadmap.md` |
| `router/rules.md` | `system/agent-context/rules.md` |
| `router/taxonomy.md` | `system/agent-context/taxonomy.md` |

Validation:

- Brain structure validator recognizes target agent-context paths;
- coding-agent entrypoints still work;
- Obsidian links pointing to `router/` are updated or compatibility notes remain.

Human decision needed:

- whether to keep `router/README.md` content separate or merge it into `system/agent-context/README.md`.

### Batch 2 — Task surface migration

**Goal:** migrate the human task source from `kanban.md` to `tasks.md` only after task compatibility is validated.

Candidate moves/copies:

| From | To |
|------|----|
| `kanban.md` | `tasks.md` |
| `live/tasks.md` | `inbox/processed/task-summary.md` or `system/reports/task-summary.md` |

Validation:

- task source remains human-readable;
- task-sync/lossless task expectations pass;
- Brain task write approval accepts `tasks.md`;
- no automatic task writes are enabled.

Human decision needed:

- whether `live/tasks.md` is a generated/report surface or should become a durable human task note.

### Batch 3 — Active projects migration

**Goal:** move active project state from `live/projects/` into `projects/`.

Candidate moves:

| From | To |
|------|----|
| `live/projects/` | `projects/` |
| `live/projects.md` | `projects/README.md` merge or `projects/index.md` |

Related `live/` files needing classification:

| Path | Proposed target | Decision |
|------|-----------------|----------|
| `live/aws-video-pipeline.md` | `projects/`, `repos/`, or `knowledge/` | Human review needed. |
| `live/business.md` | `organizations/` or `knowledge/business.md` | Human review needed. |
| `live/fala.md` | `projects/`, `repos/`, or `organizations/` | Human review needed. |
| `live/machine.md` | `repos/`, `knowledge/engineering/`, or `resources/` | Human review needed. |
| `live/video.md` | `projects/`, `repos/`, `knowledge/`, or `resources/` | Human review needed because it is large/current. |
| `live/workflows.md` | `knowledge/` or `system/` | Human review needed. |
| `live/sessions.md` | `history/`, `resources/meetings/`, or `system/reports/` | Human review needed. |
| `live/decisions.md` | `knowledge/decisions.md` | Likely move after decision-link review. |
| `live/dashboard.md` | `system/reports/dashboard.md` | Likely move after Brain Console/report validation. |

Validation:

- project status suggestions recognize `projects/`;
- completed-project suggestions map `projects/` to `history/projects/`;
- Obsidian links are updated.

### Batch 4 — Organizations migration

**Goal:** move organization/business knowledge from legacy `wiki/organisations/` to `organizations/`.

Candidate move:

| From | To |
|------|----|
| `wiki/organisations/` | `organizations/` |

Validation:

- links to ProChat, Arkware, Yeshua Academy, and other organizations still resolve;
- source references remain intact;
- no organization content is rewritten beyond path/link updates.

Human decision needed:

- whether some organization pages are actually projects, repos, or resources.

### Batch 5 — Faith-first migration

**Goal:** move Bible, theology, apologetics, ministry, and study material into `faith/`.

Candidate moves:

| From | To |
|------|----|
| `sources/research/bible/` | `faith/bible/` or `faith/resources/` |
| `sources/research/theology/` | `faith/theology/` or `faith/resources/` |
| `sources/research/apologetics/` | `faith/apologetics/` or `faith/resources/` |
| `wiki/faith.md` | `faith/README.md` merge or `faith/index.md` |
| selected `wiki/areas/faith*` content | `faith/` |

Validation:

- source material remains distinguishable from distilled study conclusions;
- Bible studies that are output/preparation work live under `faith/studies/`;
- books/authors/theologians link to `people/` where appropriate.

Human decision needed:

- for each faith-related source folder, decide whether content is source material, durable Bible/theology notes, or active study output.

### Batch 6 — General knowledge migration

**Goal:** move non-faith durable knowledge from `wiki/` into `knowledge/`.

Candidate moves:

| From | To |
|------|----|
| `wiki/areas/` non-faith subtrees | `knowledge/` |
| `wiki/ai.md` | `knowledge/ai.md` |
| `wiki/business.md` | `knowledge/business.md` or `organizations/` index link |
| `wiki/content.md` | `knowledge/content.md` |
| `wiki/family.md` | `knowledge/personal/family.md` or human decision |
| `wiki/finance.md` | `knowledge/finance.md` |
| `wiki/health.md` | `knowledge/health.md` |
| `wiki/people.md` | `people/README.md` merge or `people/index.md` |
| `wiki/tools.md` | `knowledge/tools.md` or `repos/` depending content |
| `wiki/system/` | `system/` or `knowledge/system/` after review |
| `wiki/templates/` | `system/templates/` or `knowledge/templates/` after review |

Do not touch:

- `wiki/log.md` until the unrelated local edit is resolved and proposal-surface migration is approved.

Validation:

- Obsidian links update cleanly;
- durable knowledge remains distinct from source material;
- no source/reference material is incorrectly promoted.

### Batch 7 — Resources migration

**Goal:** move non-faith source/reference material from `sources/` into `resources/`.

Candidate moves:

| From | To |
|------|----|
| `sources/books/` | `resources/books/` |
| `sources/files/` | `resources/files/` |
| `sources/papers/` | `resources/papers/` |
| `sources/transcripts/` | `resources/transcripts/` |
| `sources/web/` | `resources/web/` |
| `sources/research/marketing/` | `resources/research/marketing/` or `knowledge/marketing/` after review |
| `sources/research/business/` | `resources/research/business/` or `knowledge/business/` after review |
| other non-faith `sources/research/` content | `resources/research/` or `knowledge/` by review |
| `sources/index.md` | `resources/index.md` or merge into `resources/README.md` |

Validation:

- approved write gates accept `resources/`;
- source references in knowledge notes remain valid;
- raw evidence is not rewritten as durable knowledge.

### Batch 8 — Inbox migration and Save-to-Mind switch

**Goal:** migrate capture lifecycle paths after Brain readers and docs are validated.

Candidate moves after approval:

| From | To |
|------|----|
| `capture/inbox/` | `inbox/new/` |
| `capture/failed/` | `inbox/failed/` |
| `capture/daily/` | `inbox/processed/daily/` or `history/capture-daily/` by review |
| selected raw originals under `capture/` | `inbox/raw/` |
| `capture/README.md` | merge into `inbox/README.md` or archive as migration note |

Do not switch Save-to-Mind in the same step as bulk content movement unless validation is ready.

Validation:

- Brain Mind Steward reads `inbox/new/`;
- Save-to-Mind writes a new capture to `inbox/new/` in a controlled test;
- failure routing uses `inbox/failed/`;
- no existing capture is lost;
- capture source preservation still works.

Human decision needed:

- whether old processed/daily capture history belongs in `inbox/processed/`, `history/`, or `resources/`.

### Batch 9 — History migration

**Goal:** move historical material from `archive/` into `history/`.

Candidate moves:

| From | To |
|------|----|
| `archive/completed/` | `history/completed/` |
| `archive/old/` | `history/old/` |
| `archive/index.md` | `history/index.md` or merge into `history/README.md` |

Validation:

- completed-project suggestions target `history/projects/`;
- historical material remains retrievable but is not presented as current truth;
- no archive cleanup/deletion happens without approval.

### Batch 10 — Graphify generated output migration

**Goal:** migrate Graphify output only by config/regeneration, not by manual file moves.

Current state:

- `graphify-out/` exists;
- it contains 201 files and about 267 MB;
- Workbench blocks manual writes under target generated-output paths;
- `system/generated/graph/README.md` was not created because generated-output paths are protected.

Plan:

1. audit Graphify config and docs;
2. update output path to `system/generated/graph/` if policy allows;
3. regenerate graph output;
4. validate Brain structure validator and Graphify reports;
5. remove legacy generated output only after explicit approval.

Do not manually move `graphify-out/` in a content migration batch.

## Human decisions required before movement

- Resolve or preserve current `wiki/log.md` local edits before proposal-surface migration.
- Decide whether `router/README.md` should be merged into `system/agent-context/README.md` or moved as `router-README.md`.
- Decide whether `live/tasks.md` is generated/report content or human task content.
- Classify ambiguous `live/*.md` pages into `projects/`, `repos/`, `organizations/`, `knowledge/`, `resources/`, or `system/reports/`.
- Split faith material into Scripture/study, theology/apologetics conclusions, ministry output, and faith resources.
- Decide which `wiki/areas/` content is faith, personal knowledge, business/product knowledge, or people-related.
- Decide which `sources/research/` material is source-only versus distilled knowledge.
- Decide when Save-to-Mind may switch from `capture/inbox/` to `inbox/new/`.
- Decide when old empty folders may be removed after validation.

## Paths to leave legacy for now

| Path | Reason |
|------|--------|
| `capture/inbox/` | Save-to-Mind still writes here until explicit switch. |
| `capture/failed/` | Failure routing switch needs validation. |
| `wiki/log.md` | Unrelated local edit and proposal-surface migration needs separate approval. |
| `graphify-out/` | Generated output; migrate by config/regeneration later. |
| `kanban.md` | Task migration needs explicit validation and likely user review. |

## Recommended next move batch

Start with **Batch 1 — Agent context migration** after confirming no coding-agent session depends on reading legacy `router/` directly during the migration window.

Why first:

- small, bounded set of 14 Markdown files;
- Brain already supports `system/agent-context/` target paths;
- no personal truth or project content needs interpretation;
- easiest batch to validate without touching `wiki/log.md`, Save-to-Mind, Graphify, or task content.

## Validation checklist for every move batch

- run status before moving;
- stage only exact moved files and updated links/docs;
- do not stage unrelated dirt;
- run targeted link/path search for old references in affected files;
- run relevant Brain/Mind validation if available;
- commit each batch separately;
- stop before deleting old folders or fallback support.
