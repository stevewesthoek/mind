# Mind Folder Contract

This document records the Mind root structure, migration status, and root cleanliness rules.

**Last verified:** 2026-07-08
**Status:** target structure prepared; legacy folders retained as compatibility fallbacks

## Root purpose

The Mind root is the orientation layer. It should stay small, stable, and human-readable.

Allowed root files:

- `home.md` — primary user manual and navigation entry point.
- `tasks.md` — target human task source of truth after task migration.
- `kanban.md` — legacy task board retained until task migration is validated.
- `.gitignore` — Git ignore rules.
- `.graphifyignore` — Graphify exclusion rules.
- `.DS_Store` — local macOS metadata when present; not meaningful knowledge.

Generated captures, transcripts, reports, research drafts, and automation dumps should not be written to the repository root.

## Target top-level folders

The human-first target structure is:

```text
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

| Target path | Purpose |
|-------------|---------|
| `inbox/` | Universal intake and processing lifecycle for material not understood yet. |
| `inbox/new/` | New unreviewed captures after Save-to-Mind migration. |
| `inbox/raw/` | Immutable originals and source dumps. |
| `inbox/processed/` | Brain-generated summaries, receipts, relation reports, and proposals. Not durable truth. |
| `inbox/failed/` | Failed, blocked, unreadable, duplicate-conflicted, or approval-blocked captures. |
| `organizations/` | Businesses, ministries, non-profits, communities, and other long-lived entities. |
| `projects/` | Active efforts with outcomes, deadlines, deliverables, courses, migrations, or client work. |
| `repos/` | Human-readable memory for code repositories, apps, and products. |
| `people/` | People connected to work, faith, clients, teams, books, ministry, and research. |
| `faith/` | Bible, theology, apologetics, ministry, studies, faith questions, and faith resources. |
| `knowledge/` | Durable non-faith understanding, lessons, and best practices. |
| `resources/` | Non-faith source/reference material and external evidence. |
| `history/` | Completed, superseded, inactive, old, or historical material. |
| `system/` | Mind operating documentation, contracts, reports, templates, agent context, and generated-output notes. |

## Compatibility period

The target folders now exist with README files, but legacy folders remain active until content, Obsidian links, Save-to-Mind, Brain reports, Graphify, task handling, and validation are migrated.

| Legacy path | Target path | Compatibility rule |
|-------------|-------------|--------------------|
| `capture/inbox/` | `inbox/new/` | Save-to-Mind remains legacy until explicitly switched and validated. |
| `capture/failed/` | `inbox/failed/` | Failure routing remains legacy until explicitly switched and validated. |
| `capture/` raw/original material | `inbox/raw/` or `resources/` | Move only after source preservation review. |
| `live/projects/` | `projects/` | Brain supports both; move project content later in small commits. |
| `live/decisions.md` | `knowledge/decisions.md` | Decide per decision type during migration. |
| `live/tasks.md` | `tasks.md` or `inbox/processed/` | Human tasks go to `tasks.md`; generated summaries go to review/report surfaces. |
| `wiki/organisations/` | `organizations/` | Use `organizations/` after migration. |
| `wiki/` durable knowledge | `knowledge/` or `faith/` | Faith material goes to `faith/`; other durable knowledge goes to `knowledge/`. |
| `wiki/log.md` | `inbox/processed/` or `system/reports/` | Proposal/review surfaces move later; current local edits must not be overwritten. |
| `sources/` | `resources/` or `faith/resources/` | Preserve provenance and keep raw evidence separate from conclusions. |
| `sources/research/bible/` | completed to `faith/resources/bible/` | Source material moved in Batch 5C1; distilled Bible notes may be promoted later after review. |
| `sources/research/theology/` | completed to `faith/resources/theology/` | Source material moved in Batch 5D1; distilled theology may be promoted later after review. |
| `sources/research/apologetics/` | completed to `faith/resources/apologetics/` | Approved source material moved in Batch 5E1; distilled apologetics may be promoted later after review. |
| `wiki/areas/theological-studies/dance-of-life/` | completed to `faith/resources/dance-of-life/` | Source-first move completed in Batch 5I2; no content promoted to `faith/studies/dance-of-life/`. |
| `archive/` | `history/` | Historical content moves only after validation. |
| `kanban.md` | `tasks.md` | Switch only after lossless task migration is validated. |
| `router/` | `system/agent-context/` | Batch 1 moved tracked agent-context files to `system/agent-context/`; legacy `router/` references are now compatibility/history only until validation cleanup. |
| `graphify-out/` and `.graphify-out/` references | `system/generated/graph/` | Generated path is blocked for manual writes; use docs/config migration before generating output. |

## Root write rule

Target rule after migration:

```text
inbox/new/
```

Compatibility rule before Save-to-Mind is switched:

```text
capture/inbox/
```

If processing fails, the target path is:

```text
inbox/failed/
```

Compatibility fallback before routing is switched:

```text
capture/failed/
```

If material is distilled into durable knowledge, it should be linked or moved into the documented destination while preserving source references when useful. Durable writes still require review and exact-path approval.

## README rule

Every important top-level folder should have either:

1. a `README.md`; or
2. a clearly named index file that serves the same purpose.

Empty target folders are allowed during the migration only when they contain a README explaining what will populate them.

## Safety rule

Do not move, rename, delete, or rewrite folders until dependencies are checked for:

- Save-to-Mind;
- Mind Steward;
- Brain Core or scheduler references;
- AI Model Selector references;
- Graphify refresh commands;
- Obsidian links and plugin assumptions;
- video/transcript capture paths;
- Kanban/task references;
- coding-agent and router/agent-context references.

Do not remove legacy fallback folders until Brain validation passes against the migrated target structure and Steve explicitly approves cleanup.
