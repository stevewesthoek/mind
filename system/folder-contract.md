# Mind Folder Contract

This document records the Mind root structure, migration status, and root cleanliness rules.

**Status:** `inbox/new/` and `inbox/failed/` are the canonical and verified live Save-to-Mind intake targets.
**Version:** 3.0
**Last verified:** 2026-08-07
**Owner role:** Steve Westhoek (structure authority)
**Depends on:** `system/mind-strategy.md`, `system/brain-mind-bridge.md`
**Conflict rule:** when this contract conflicts with strategy or philosophy, those take precedence. When Brain runtime paths conflict with this contract's canonical paths, this contract takes precedence for Mind-side routing unless Brain provides verified evidence of a necessary change.
**Documentation compatibility:** `capture/`, `live/`, `sources/`, `wiki/`, and `archive/` roots are fully migrated and absent. Brain deployment evidence is authoritative in Brain's live-status runbook.

## Root purpose

The Mind root is the orientation layer. It should stay small, stable, and human-readable.

Allowed root files:

- `home.md` — primary user manual and navigation entry point.
- `kanban.md` — sole current human task authority and active Obsidian board.
- `tasks.md` — retired, non-authoritative compatibility snapshot; do not write or synchronize it.
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

The target folders are canonical for new Mind documentation and approved Mind writes. Retained legacy paths are historical or compatibility-only surfaces whose removal remains gated by the status recorded below.

| Legacy path | Target path | Status |
|-------------|-------------|--------|
| `capture/inbox/` | `inbox/new/` | **Migrated 2026-08-06.** Phase 1: moved to `history/legacy-capture/inbox/` as historical evidence. Brain B1.0a verified the guarded live success route to `inbox/new/` on 2026-07-22. |
| `capture/failed/` | `inbox/failed/` | **Migrated 2026-08-06.** Phase 1: moved to `history/legacy-capture/failed/` as historical evidence. Brain B1.0a verified the guarded live failure route to `inbox/failed/` on 2026-07-22. |
| `capture/` root | `history/legacy-capture/` | **Migrated 2026-08-06.** Phase 1 complete; all files moved to `history/legacy-capture/` with SHA-256 verification. |
| `live/` root | `history/legacy-live/` | **Migrated 2026-08-06.** Phase 1 complete; all files moved to `history/legacy-live/` with SHA-256 verification. |
| `wiki/organisations/` | `organizations/` | **Migrated 2026-08-06.** Phase 2: all files moved to `organizations/prochat/brand/`, `playbooks/`, and `youtube/` with SHA-256 verification. Legacy `wiki/organisations/README.md` moved to `history/legacy-wiki/` (differing from canonical `organizations/README.md`). |
| `wiki/` durable knowledge | `knowledge/` or `faith/` | **Migrated 2026-08-06.** Phase 2: personal knowledge (`family.md`, `finance.md`, `health.md`) moved to `knowledge/personal/`; personal-identity area moved to `people/steve/personal-identity/`; wiki navigation stubs moved to `history/legacy-wiki/`. |
| `wiki/log.md` | `inbox/processed/` | **Migrated 2026-08-06.** Phase 2: moved to `inbox/processed/legacy-wiki-proposal-log.md`. |
| `sources/books/`, `sources/files/`, `sources/papers/`, `sources/transcripts/`, `sources/web/`, `sources/research/`, `sources/index.md` | completed to `resources/` | Non-faith source/resource scaffolding moved in Batch 7A; `.DS_Store` metadata was not migrated. |
| `sources/` root | removed | **Deleted 2026-08-06.** Phase 1: contained only `.DS_Store` (untracked local macOS metadata); deleted and root removed. |
| `sources/research/bible/` | completed to `faith/resources/bible/` | Source material moved in Batch 5C1; distilled Bible notes may be promoted later after review. |
| `sources/research/theology/` | completed to `faith/resources/theology/` | Source material moved in Batch 5D1; distilled theology may be promoted later after review. |
| `sources/research/apologetics/` | completed to `faith/resources/apologetics/` | Approved source material moved in Batch 5E1; distilled apologetics may be promoted later after review. |
| `wiki/areas/theological-studies/dance-of-life/` | completed to `faith/resources/dance-of-life/` | Source-first move completed in Batch 5I2; no content promoted to `faith/studies/dance-of-life/`. |
| `wiki/` root | `history/legacy-wiki/` | **Migrated 2026-08-06.** Phase 2 complete; all files accounted for; root absent. |
| `archive/` | `history/archive/` | **Migrated 2026-08-07.** Phase 3 complete; all files moved to `history/archive/` with SHA-256 verification. |
| `tasks.md` | `kanban.md` | `tasks.md` is retired and non-authoritative. `kanban.md` remains authority unless a future lossless, reversible migration is separately validated and approved. |
| `router/` | `system/agent-context/` | Batch 1 moved tracked agent-context files to `system/agent-context/`; legacy `router/` references are now compatibility/history only until validation cleanup. |
| `graphify-out/` and `.graphify-out/` references | `runtime/local/graphify/` | Future contained operational root; compatibility roots are non-authoritative and blocked for manual writes. |

## Root write rule

Canonical Mind success-intake path:

```text
inbox/new/
```

Canonical Mind failed-processing target:

```text
inbox/failed/
```

External Save-to-Mind routing is aligned with these targets (deployment evidence in Brain's live-status runbook):

- successful processing routes to `inbox/new/`;
- failed processing routes to `inbox/failed/`;
- `capture/` and `live/` roots have been migrated to `history/legacy-capture/` and `history/legacy-live/` respectively; `sources/`, `wiki/`, and `archive/` roots have been migrated and are absent. Do not write to these paths.

Use the canonical intake paths directly. Durable writes beyond intake still require review and exact-path approval.

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
