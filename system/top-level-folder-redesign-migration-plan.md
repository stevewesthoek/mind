# Top-Level Folder Redesign Migration Plan

**Status:** proposed migration plan  
**Created:** 2026-07-06  
**Owner:** Mind structure with Brain runtime support  
**Purpose:** redesign Mind's top-level folders so Steve can use the vault intuitively while preserving every automation, reference, approval boundary, and source file that currently depends on the old structure.

## Decision

The current top-level names are too system-oriented for daily use:

```text
capture/
live/
wiki/
sources/
archive/
kanban.md
router/
graphify-out/
```

The target structure should be human-first:

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

This is a migration plan only. It does not authorize moving files, deleting old folders, changing Save-to-Mind, enabling continuous processing, or editing durable Mind content automatically.

## Target folder meanings

| New path | Meaning |
|----------|---------|
| `inbox/` | Everything not understood yet; Steve's universal dump zone and Brain's intake lifecycle. |
| `inbox/new/` | New captures from ChatGPT, Wispr Flow, Obsidian, client requests, feature ideas, bugs, future work, coding lessons, meetings, and voice/text notes. |
| `inbox/raw/` | Immutable originals: raw audio, pasted originals, source dumps, uploaded files, original transcripts, screenshots/OCR outputs. |
| `inbox/processed/` | Brain-generated summaries, relation reports, structured proposals, capture receipts, transcript derivatives, and review surfaces. Not durable truth. |
| `inbox/failed/` | Failed, blocked, too-large, unreadable, duplicate-conflicted, or approval-blocked captures. |
| `organizations/` | Businesses, ministries, non-profits, and other long-lived entities such as ProChat, Arkware, and Yeshua Academy. |
| `projects/` | Active efforts with outcomes, deadlines, deliverables, campaigns, launches, studies being prepared, or client work. |
| `repos/` | Technical repositories, apps, products, deployment surfaces, repo-specific lessons, conventions, and runbook pointers. |
| `people/` | People connected to work, faith, clients, teams, books, theology, ministry, Bible studies, and research. |
| `faith/` | First-class Bible, theology, apologetics, ministry, study preparation, faith questions, and faith-specific resources. |
| `knowledge/` | Distilled non-faith durable knowledge: business, product, engineering, marketing, personal operating principles, and cross-domain lessons. |
| `resources/` | Non-faith reference material: books, articles, transcripts, documents, meetings, datasets, and external material used as evidence. |
| `history/` | Completed, superseded, old, inactive, or historical material that remains useful but is not current. |
| `system/` | How Mind works: philosophy, strategy, roadmap, implementation plan, contracts, templates, reports, router/agent context, generated outputs, and migration notes. |
| `kanban.md` | Sole current human task authority. `tasks.md` is a retired, non-authoritative compatibility snapshot. |

## Old-to-new mapping

| Current path | Target path | Notes |
|--------------|-------------|-------|
| `capture/inbox/` | `inbox/new/` | Retired historical path; Brain B1.0a verified the live success route to `inbox/new/` on 2026-07-22. |
| `capture/failed/` | `inbox/failed/` | Retired historical path; Brain B1.0a verified the live failure route to `inbox/failed/` on 2026-07-22. |
| `capture/` grouped source material | `inbox/raw/` or `resources/` | Raw original intake artifacts go to `inbox/raw/`; durable reference material goes to `resources/` or `faith/resources/`. |
| `live/projects/` | `projects/` | Active project state becomes human-obvious. |
| `live/decisions.md` | `projects/decisions.md` or `knowledge/decisions.md` | Decide per decision type during migration. |
| `live/tasks.md` | `kanban.md` or `inbox/processed/` | Human task changes belong only in authoritative `kanban.md`; generated summaries go under `inbox/processed/` or `system/reports/`. |
| `wiki/organisations/` | `organizations/` | Use US spelling `organizations/` for consistency with tooling and common folder names. |
| `wiki/areas/` | `knowledge/` or `faith/` | Faith areas move to `faith/`; other durable areas move to `knowledge/`. |
| `wiki/log.md` | `inbox/processed/proposals.md` or `system/reports/proposals.md` | Capture/project proposals should be user-visible in inbox; system maintenance reports stay in `system/reports/`. |
| `wiki/` durable knowledge | `knowledge/` or `faith/` | Faith/theology/Bible material goes to `faith/`; other distilled knowledge goes to `knowledge/`. |
| `sources/research/bible/` | `faith/bible/` or `faith/resources/` | Durable Bible notes go to `faith/bible/`; source material goes to `faith/resources/`. |
| `sources/research/theology/` | `faith/theology/` or `faith/resources/` | Distilled theology goes to `faith/theology/`; source material goes to `faith/resources/`. |
| `sources/research/apologetics/` | `faith/apologetics/` or `faith/resources/` | Same distinction. |
| `sources/` non-faith evidence | `resources/` | Preserve provenance; do not confuse sources with conclusions. |
| `archive/` | `history/` | Historical, completed, superseded, and inactive material. |
| `tasks.md` | `kanban.md` | `tasks.md` is retired and non-authoritative; no task-content migration is authorized. |
| `router/` | `system/agent-context/` | Requires AI startup/IDE/Brain contract migration. |
| `graphify-out/` | `system/generated/graph/` | Requires Graphify config and generated-output contract migration. |

## Faith structure

Faith is first-class because Steve reads books, writes studies for people, gathers data, prepares teaching, and needs people/topics/studies to be automatically connected.

Proposed faith subtree:

```text
faith/
  home.md
  bible/
    books/
    passages/
    themes/
  studies/
  topics/
  theology/
  apologetics/
  ministry/
  resources/
    books/
    articles/
    sermons/
    transcripts/
    notes/
  questions/
```

Bible studies normally live in `faith/studies/`. Broader active deliverables such as a public course launch may also have a project under `projects/` that links back to the relevant faith study, Bible notes, resources, and people.

## Repo structure

Each significant code repository or app should have a page or folder under `repos/`.

Example:

```text
repos/brain/
repos/mind/
repos/prochat/
repos/workbench/
repos/client-app-name/
```

Repo pages should link to related organizations, projects, people, coding lessons, deployment/runbook references, and Brain-owned technical documentation.

## Relationship automation target

Steve should not manually remember relationships. Brain should eventually process `inbox/new/` and propose links such as:

- person to organization;
- person to project;
- person to Bible study;
- book or author to faith topic;
- client request to project/app/repo;
- coding lesson to repo and best-practice memory;
- feature request to organization, project, and repo;
- strategy signal to organization/project strategy;
- Bible passage to topic, study, theologian, resource, or ministry output.

The first implementation must be report-only: Brain proposes backlinks and destinations; Steve approves durable updates.

## Required full inventory before migration

Before any file move, both repositories must be searched for exact references to old paths and contracts.

### Mind inventory patterns

Search at minimum:

```text
capture/
capture/inbox
capture/failed
live/
live/projects
live/dashboard.md
live/tasks.md
live/decisions.md
wiki/
wiki/log.md
wiki/organisations
wiki/areas
sources/
sources/research
archive/
kanban.md
router/
graphify-out
.graphify-out
```

Inventory destinations:

- `home.md`;
- `system/folder-contract.md`;
- `system/brain-mind-bridge.md`;
- `system/mind-roadmap.md`;
- `system/mind-implementation-plan.md`;
- `system/automation-roadmap.md`;
- `system/*contract*.md`;
- `system/reports/**`;
- `router/**`;
- Obsidian links across all Markdown notes;
- Graphify configuration and generated-output references;
- task and proposal surfaces.

### Brain inventory patterns

Search at minimum:

```text
capture/inbox
capture/failed
capture/
live/
wiki/log.md
wiki/
sources/
archive/
kanban.md
router/
graphify-out
.graphify-out
MIND_MAINTENANCE_PILOT_FILES
MIND_MAINTENANCE_REPORT_OUTPUTS
mindRoot
inboxPath
Save-to-Mind
Mind Steward
mind-structure-validator
```

Inventory destinations:

- Brain Core source and tests;
- Save-to-Mind action/tooling;
- Mind Steward inbox classifier and queue;
- Mind maintenance loader and freshness/stale detectors;
- approval/write gates and allowed prefixes;
- Brain Console Mind surfaces;
- graph/Graphify runbooks and configs;
- AI model selector and routed intake code;
- IDE/agent context contracts;
- runtime report templates;
- docs, runbooks, package scripts, and tests;
- generated runtime files, which may be ignored but must not be confused with source contracts.

## Phase 1 inventory evidence

Initial Phase 1 inventory report:

```text
system/reports/top-level-folder-path-inventory-2026-07-06.md
```

Summary:

- Mind scan: 1,471 text-like files scanned; 120 files matched old-path tokens.
- Brain active-source scan: 884 bounded active files scanned; 142 files matched migration-sensitive tokens.
- Brain generated-runtime scan: 57 runtime files scanned; 24 generated files matched old-path tokens.
- Conclusion: do not start with file moves; first implement Brain path compatibility and tests, then migrate Save-to-Mind and Mind folders in small validated slices.

## Phase 4 batch-plan evidence

Initial content migration batch plan:

```text
system/reports/top-level-folder-migration-batch-plan-2026-07-07.md
```

Summary:

- current legacy content groups were inventoried read-only;
- exact migration batches were proposed without moving files;
- human-decision paths and legacy-hold paths were identified;
- Batch 1 completed: tracked `router/` agent-context files moved to `system/agent-context/`; `router/README.md` preserved as `system/agent-context/router-README.md`.

## Phase 3 structure-prep evidence

Initial target folders now have README-backed placeholders before any content moves:

```text
inbox/
inbox/new/
inbox/raw/
inbox/processed/
inbox/failed/
organizations/
projects/
repos/
people/
faith/
knowledge/
resources/
history/
system/agent-context/
```

Notes:

- no existing Mind content was moved;
- no old folder was deleted;
- Save-to-Mind still writes to the legacy capture path until a later explicit switch;
- `system/generated/graph/README.md` could not be created through Workbench because generated-output paths are blocked by repository write policy; keep generated graph output documented in contracts until Graphify config can create the target output safely.

## Migration phases

### Phase 0 — approval and freeze window

- Confirm target structure and naming.
- Confirm whether compatibility stubs are allowed temporarily.
- Freeze large manual reorganizations during migration.
- Ensure Mind and Brain are backed up and clean except known unrelated Brain local system dirt.

### Phase 1 — full dependency inventory

- Produce a Brain + Mind path-reference inventory report.
- Categorize every reference as code, test, config, documentation, generated runtime output, Obsidian link, or historical report.
- Mark each as migrate, retain as historical, ignore generated, or delete only with later approval.
- No moves yet.

### Phase 2 — compatibility design

- Update Brain to understand both old and new paths where necessary.
- Make Save-to-Mind write to the new `inbox/new/` only after readers support it.
- Save-to-Mind intake cutover completed: `inbox/new/` and `inbox/failed/` are verified live; legacy capture paths are historical-only.
- Avoid symlinks unless explicitly approved; they can confuse mobile, Git, Obsidian, and cross-platform tooling.

### Phase 3 — Mind documentation and contracts

- Update `home.md`, folder contract, bridge contract, roadmap, implementation plan, automation roadmap, and relevant templates.
- Create README files for new top-level folders.
- Add clear rules that `inbox/processed/` is not durable truth.
- Add a migration note explaining old-to-new path mapping.

### Phase 4 — Brain runtime and test updates

- Update Save-to-Mind destination path.
- Update Mind Steward inbox queue/classifier paths.
- Update structure validator expected paths.
- Update approval/write gates for new durable prefixes.
- Update Brain Console Mind surfaces.
- Update tests and fixtures.
- Update IDE/terminal-agent context paths.
- Update Graphify generated-output path or explicitly keep the old generated path until separate approval.

### Phase 5 — file migration

- Use exact `git mv` operations for approved path groups.
- Preserve file history where possible.
- Do not delete or archive content implicitly.
- Do not rewrite durable content beyond path/link updates required for migration.
- Keep migration commits small and reviewable by folder family.

### Phase 6 — link and reference update

- Update Obsidian links and Markdown path references.
- Update YAML/frontmatter source paths where needed.
- Update proposal templates and approval payload examples.
- Update generated reports only if they are current operational surfaces; historical reports may retain old paths with a migration note.

### Phase 7 — validation

Required evidence before declaring migration complete:

- Mind path inventory shows no active old-path references except approved historical migration notes;
- Brain path inventory shows no active old-path dependencies except explicit compatibility code, if any;
- Save-to-Mind writes a new capture to `inbox/new/`;
- Mind Steward can read and classify the new inbox path report-only;
- structure validator passes with new expected paths;
- approval/write gates accept new durable prefixes and reject unsafe paths;
- Graphify or graph output behavior is validated or explicitly deferred;
- Obsidian links for migrated files are checked;
- `kanban.md` remains the sole task authority; any future replacement requires separate lossless, reversible validation and explicit approval;
- no automatic durable writes, deletions, or archives occur during validation.

### Phase 8 — cleanup and deprecation

- Remove temporary compatibility only after successful validation and human approval.
- Remove old empty top-level folders only after inventory confirms no active dependency remains.
- Keep this migration plan or a short summary under `system/` for historical traceability.

## Safety boundaries

- Do not perform this as one giant rename.
- Do not run broad deletion or cleanup.
- Do not migrate generated runtime output as durable knowledge.
- Do not automatically rewrite personal/business/faith truth while updating paths.
- Do not enable continuous processing as part of this migration.
- Do not merge Brain and Mind repositories.
- Do not assume generated Brain runtime reports are source-of-truth contracts.
- Do not break mobile Obsidian/Git workflows by using unsupported symlink tricks.

## Definition of done

The migration is done only when Steve can use Mind with this mental model:

```text
inbox       = everything not understood yet
organizations = businesses, ministries, non-profits, and long-lived entities
projects    = active outcomes and deliverables
repos       = codebases/apps/products
people      = people connected to anything
faith       = Bible, theology, apologetics, ministry, studies, and faith resources
knowledge   = durable non-faith understanding and best practices
resources   = non-faith source/reference material
history     = no longer current, but still preserved
system      = how Mind works
```

And Brain can still:

```text
save new captures;
inspect and classify inbox items;
propose relations and destinations;
run report-only maintenance;
show status in Brain Console;
validate required Mind surfaces;
route coding agents to Steve's identity and strategy;
preserve provenance;
require approval before durable changes.
```
