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

**Status:** completed 2026-07-07. The legacy `router/` files were moved into `system/agent-context/`; `router/README.md` was preserved as `system/agent-context/router-README.md` so the target README was not overwritten.

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

**Status:** precheck completed 2026-07-07. See `system/reports/task-surface-migration-precheck-2026-07-07.md`. Decision: do not move `kanban.md` yet; use a later copy-first validation batch before switching the task source of truth.

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

**Status:** Batch 3D decision request completed 2026-07-07. See `system/reports/active-projects-migration-precheck-2026-07-07.md`, `system/reports/root-live-files-migration-decision-precheck-2026-07-07.md`, and `system/reports/remaining-live-files-decision-request-2026-07-07.md`. The two clear `live/projects/` subfolders moved to `projects/`; `live/decisions.md` moved to `knowledge/decisions.md`; `live/dashboard.md` moved to `system/reports/dashboard.md`; remaining root `live/*.md` files stay in place pending Steve decisions.

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
| `live/decisions.md` | `knowledge/decisions.md` | Completed in Batch 3C; moved without changing accepted decision text beyond title. |
| `live/dashboard.md` | `system/reports/dashboard.md` | Completed in Batch 3C; moved as Brain Console Markdown fallback with updated links. |

Validation:

- project status suggestions recognize `projects/`;
- completed-project suggestions map `projects/` to `history/projects/`;
- Obsidian links are updated.

### Batch 4 — Organizations migration

**Status:** Batch 4C1 completed 2026-07-08. See `system/reports/organizations-migration-precheck-2026-07-07.md` and `system/reports/prochat-core-migration-precheck-2026-07-08.md`. Arkware, Yeshua Academy, conventions, ecosystem, and ProChat core README/growth/legal files have moved to `organizations/`. Hold remaining ProChat `brand/`, `playbooks/`, `youtube/`, `pitch-decks/`, `.DS_Store`, and legacy organization README decisions for separate batches.

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

**Status:** Batch 5J faith migration finalization completed 2026-07-08. See `system/reports/faith-migration-finalization-closeout-2026-07-08.md`, `system/reports/faith-migration-precheck-2026-07-08.md`, `system/reports/faith-source-subinventory-2026-07-08.md`, `system/reports/bible-source-resources-move-precheck-2026-07-08.md`, `system/reports/theology-source-resources-move-precheck-2026-07-08.md`, `system/reports/apologetics-source-resources-move-precheck-2026-07-08.md`, `system/reports/faith-landing-page-migration-precheck-2026-07-08.md`, `system/reports/personal-theology-boundary-migration-precheck-2026-07-08.md`, `system/reports/dance-of-life-theological-studies-subinventory-2026-07-08.md`, `system/reports/dance-of-life-split-decision-plan-2026-07-08.md`, and `system/reports/dance-of-life-source-first-move-precheck-2026-07-08.md`. Bible, theology, approved apologetics, and Dance of Life source resources now live under `faith/resources/`; `wiki/faith.md` was retired after preserving useful content in `faith/README.md`; personal theology boundary content remains deferred under personal identity; no source material was promoted into distilled faith folders; Save-to-Mind remains unchanged; continuous processing remains disabled.

**Goal:** move Bible, theology, apologetics, ministry, and study material into `faith/`.

Candidate moves:

| From | To |
|------|----|
| `sources/research/bible/` | completed to `faith/resources/bible/` in Batch 5C1 |
| `sources/research/theology/` | completed to `faith/resources/theology/` in Batch 5D1 |
| `sources/research/apologetics/` | completed to `faith/resources/apologetics/` in Batch 5E1 |
| `wiki/areas/theological-studies/dance-of-life/` | completed to `faith/resources/dance-of-life/` in Batch 5I2 |
| `wiki/faith.md` | retired in Batch 5J after preserving useful content in `faith/README.md` |
| `wiki/areas/personal-identity/theology.md` | deferred for later personal/people or faith-boundary target decision |
| selected `wiki/areas/faith*` content | deferred; no blind move in Batch 5J |

Validation:

- source material remains distinguishable from distilled study conclusions;
- Bible studies that are output/preparation work live under `faith/studies/`;
- books/authors/theologians link to `people/` where appropriate.

Human decision needed:

- for each faith-related source folder, decide whether content is source material, durable Bible/theology notes, or active study output.

### Batch 6 — General knowledge migration

**Goal:** move non-faith durable knowledge from `wiki/` into `knowledge/`.

**Status:** Batch 6 precheck completed 2026-07-08. See `system/reports/general-knowledge-migration-precheck-2026-07-08.md`. Candidate legacy `wiki/` general-knowledge paths were inventoried and classified; no content was moved. Low-risk durable stubs, personal/private context, people context, organization/business context, and system/template material should be handled in narrower follow-up batches.

**Batch 6A status:** low-risk one-file durable knowledge stub move precheck completed 2026-07-08. See `system/reports/general-knowledge-low-risk-stub-move-precheck-2026-07-08.md`. `wiki/ai.md`, `wiki/content.md`, `wiki/tools.md`, and `wiki/business.md` have no direct `knowledge/*.md` target collisions. No content was moved. Later Batch 6A1 should move only those four stubs and update the active `live/business.md` references.

**Batch 6A1 status:** completed 2026-07-08. `wiki/ai.md`, `wiki/content.md`, `wiki/tools.md`, and `wiki/business.md` moved to `knowledge/ai.md`, `knowledge/content.md`, `knowledge/tools.md`, and `knowledge/business.md`. Active `live/business.md` references now point to `knowledge/business.md`. No other `wiki/` content was moved.

**Batch 6B status:** personal/private and people-context migration precheck completed 2026-07-08. See `system/reports/personal-private-general-knowledge-migration-precheck-2026-07-08.md`. `wiki/family.md`, `wiki/finance.md`, `wiki/health.md`, `wiki/people.md`, and `wiki/areas/personal-identity/` were classified as privacy-sensitive or human-decision content. No content was moved.

**Batch 6C status:** system/template migration precheck completed 2026-07-08. See `system/reports/system-template-general-knowledge-migration-precheck-2026-07-08.md`. `wiki/system/repo-boundaries.md` was classified as system/process contract content for `system/repo-boundaries.md`, and `wiki/templates/` was classified as template content for `system/templates/`. No content was moved.

**Batch 6C1 status:** completed 2026-07-08. `wiki/system/repo-boundaries.md` moved to `system/repo-boundaries.md`, and `wiki/templates/` moved to `system/templates/`. Active template routing in `system/agent-context/00-memory-map.md` now points to `system/templates/`. Template internals were not modernized.

**Batch 6D status:** closeout precheck completed 2026-07-08. See `system/reports/general-knowledge-migration-closeout-precheck-2026-07-08.md`. Batch 6 can be partially closed for completed low-risk durable knowledge and system/template moves, but it must not be claimed as a complete `wiki/` migration. Personal/private content, `wiki/areas/personal-identity/`, `wiki/log.md`, `wiki/organisations/`, root wiki indexes, metadata, and empty legacy directory cleanup remain deferred.

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

**Status:** Batch 7B resources migration closeout precheck completed 2026-07-08. See `system/reports/resources-migration-precheck-2026-07-08.md` and `system/reports/resources-migration-closeout-precheck-2026-07-08.md`. Approved non-faith source/resource scaffolding now lives under `resources/`; only `sources/.DS_Store` remains as local generated metadata and was not touched or staged. Batch 7 is content-complete pending final closeout or metadata cleanup decision.

**Batch 7A status:** completed 2026-07-09. `sources/books/`, `sources/files/`, `sources/papers/`, `sources/transcripts/`, `sources/web/`, `sources/research/`, and `sources/index.md` moved source-preservingly to `resources/`. Active non-faith source/resource routing now points to `resources/` and `resources/research/`. `sources/.DS_Store` was not migrated or staged.

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
