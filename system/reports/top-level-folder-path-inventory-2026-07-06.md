# Top-Level Folder Path Inventory — Phase 1

**Status:** Phase 1 inventory report  
**Created:** 2026-07-06  
**Migration run:** `agent-9c484bcf-1a06-435c-9546-007448da4a56`  
**Scope:** Brain + Mind old-path dependency inventory before any folder migration  
**Migration plan:** `system/top-level-folder-redesign-migration-plan.md`

## Boundary

This report is inventory-only. It does not authorize folder moves, file deletions, Save-to-Mind path changes, continuous processing, automatic durable writes, task edits, project edits, or faith-study edits.

The target structure remains:

```text
home.md
tasks.md
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

## Inventory method

Two read-only Node scanners were run from Workbench allowlisted commands.

### Mind scan

- Scanned text-like files under the Mind repository, excluding `.git`, `.obsidian`, `.trash`, and `node_modules`.
- Patterns scanned: `capture/`, `capture/inbox`, `capture/failed`, `live/`, `live/projects`, `live/dashboard.md`, `live/tasks.md`, `live/decisions.md`, `wiki/`, `wiki/log.md`, `wiki/organisations`, `wiki/areas`, `sources/`, `sources/research`, `archive/`, `kanban.md`, `router/`, `graphify-out`, `.graphify-out`.
- Result: 1,471 files scanned; 120 files matched old-path tokens.

### Brain active-source scan

- Scanned bounded active roots: `projects/brain-core/src`, `projects/brain-core/package.json`, `operations/specs`, `operations/runbooks`, `operations/docs`, and selected AI/system-config context files.
- Patterns scanned: Mind old path tokens plus `MIND_MAINTENANCE_PILOT_FILES`, `MIND_MAINTENANCE_REPORT_OUTPUTS`, `mindRoot`, `inboxPath`, `Save-to-Mind`, `save-to-mind`, `Mind Steward`, and `mind-structure-validator`.
- Result: 884 files scanned; 142 files matched old-path or migration-sensitive tokens.

### Brain generated-runtime scan

- Scanned `runtime/local` separately.
- Result: 57 files scanned; 24 generated runtime files matched old-path tokens.
- Classification: generated runtime output. These should generally be regenerated or ignored after source migration, not treated as source contracts.

## Mind summary

| Class | Matched files | Migration meaning |
|-------|---------------|-------------------|
| `system-doc` | 29 | Active contracts, roadmaps, specs, templates, and runbooks need deliberate path migration. |
| `historical-report` | 15 | Preserve historical references unless the report is a current operational surface. Add migration note if needed. |
| `agent-context` | 14 | Router/agent startup context depends heavily on old names; migrate with coding-LLM entrypoint task. |
| `current-content` | 7 | `live/` current-state content needs mapping into `projects/`, `tasks.md`, or generated report surfaces. |
| `resource-content` | 9 | `sources/` content needs faith/resources split review. |
| `history-content` | 5 | Existing `archive/` content maps to `history/`; most references are historical. |
| `knowledge-content` | 2 | `wiki/` content needs split into `knowledge/`, `faith/`, `organizations/`, or `people/`. |
| `inbox-content` | 2 | Existing `capture/inbox/` files map to `inbox/new/` after Brain readers support the new path. |
| `root-user-surface` | 1 | `home.md` is a major user-facing reference surface. |
| `other` | 36 | Includes current `capture/` docs, tools, and generated Graphify output; classify before migration. |

### Mind pattern counts

| Pattern | Matched files |
|---------|---------------|
| `wiki/` | 83 |
| `sources/` | 63 |
| `archive/` | 51 |
| `kanban.md` | 48 |
| `capture/` | 47 |
| `live/` | 47 |
| `wiki/organisations` | 46 |
| `capture/inbox` | 43 |
| `sources/research` | 37 |
| `router/` | 27 |
| `wiki/log.md` | 24 |
| `capture/failed` | 22 |
| `live/projects` | 21 |
| `live/tasks.md` | 20 |
| `live/dashboard.md` | 18 |
| `graphify-out` | 17 |
| `.graphify-out` | 14 |
| `live/decisions.md` | 12 |
| `wiki/areas` | 8 |

## Mind high-risk active files

These are likely active migration dependencies, not just historical notes:

```text
home.md
capture/README.md
capture/inbox/README.md
live/README.md
live/business.md
live/decisions.md
live/tasks.md
live/workflows.md
router/00-current-context.md
router/00-memory-map.md
router/00-start-here.md
router/AGENTS.md
router/CLAUDE.md
router/README.md
router/current.md
router/maintenance.md
router/map.md
router/mind-steward.md
router/roadmap.md
router/rules.md
router/taxonomy.md
system/automation-contract.md
system/automation-roadmap.md
system/brain-mind-bridge.md
system/folder-contract.md
system/generated-output-policy.md
system/graph-visualization-contract.md
system/graph-visualization-spec.md
system/graphify-strategy.md
system/inbox-queue-throttle-spec.md
system/infinite-brain-philosophy.md
system/intake-disposition-pattern.md
system/knowledge-freshness-standard.md
system/maintenance-report-contract.md
system/mind-implementation-plan.md
system/mind-roadmap.md
system/mind-strategy.md
system/orientation-brief-template.md
system/processed-capture-receipt-template.md
system/realtime-inbox-processing-spec.md
system/runbooks/maintenance-report-pilot-runbook.md
system/runbooks/mind-steward-preflight-runbook.md
system/source-quality-gates.md
system/task-kanban-contract.md
system/task-sync-spec.md
tasks/README.md
tools/export-kanban-tasks.mjs
tools/render-graph-html.mjs
tools/update-graph.sh
wiki/README.md
```

## Brain active-source summary

| Class | Matched files | Migration meaning |
|-------|---------------|-------------------|
| `brain-core-source` | 55 | Active runtime/source dependencies; must support new paths before Mind files move. |
| `test` | 53 | Test fixtures and expectations must migrate with code changes. |
| `operations-runbook` | 25 | User/operator docs must be updated after code behavior changes. |
| `operations-spec` | 7 | Runtime specs and roadmap references must stay aligned. |
| `package-config` | 1 | `mind-structure-validator` package/bin entry is migration-sensitive. |
| `system-config` | 1 | AI/IDE context contains old router references. |

### Brain active-source pattern counts

| Pattern | Matched files |
|---------|---------------|
| `mindRoot` | 57 |
| `wiki/` | 50 |
| `live/` | 41 |
| `capture/` | 35 |
| `Mind Steward` | 34 |
| `capture/inbox` | 33 |
| `sources/` | 31 |
| `router/` | 28 |
| `kanban.md` | 21 |
| `archive/` | 17 |
| `wiki/log.md` | 13 |
| `MIND_MAINTENANCE_PILOT_FILES` | 11 |
| `inboxPath` | 10 |
| `graphify-out` | 7 |
| `MIND_MAINTENANCE_REPORT_OUTPUTS` | 5 |
| `Save-to-Mind` | 5 |
| `capture/failed` | 4 |
| `.graphify-out` | 4 |
| `save-to-mind` | 2 |

## Brain high-risk active files

### Inbox and capture processing

```text
projects/brain-core/src/adapters/mind-steward-inbox-queue.ts
projects/brain-core/src/adapters/mind-steward-capture-classification.ts
projects/brain-core/src/adapters/mind-steward-capture-source-preservation.ts
projects/brain-core/src/adapters/mind-steward-reviewed-outcome.ts
projects/brain-core/src/adapters/mind-steward-task-proposal.ts
projects/brain-core/src/adapters/continuous-processing-disable-recovery.ts
projects/brain-core/src/adapters/continuous-processing-selection.ts
projects/brain-core/src/tests/mind-steward-inbox-queue.test.ts
projects/brain-core/src/tests/mind-steward-capture-classification.test.ts
projects/brain-core/src/tests/mind-steward-capture-source-preservation.test.ts
projects/brain-core/src/tests/routes.test.ts
```

### Destination, write, approval, and durable-prefix logic

```text
projects/brain-core/src/adapters/mind-steward-destination-proposal.ts
projects/brain-core/src/adapters/infinite-brain-proposal-application-planner.ts
projects/brain-core/src/adapters/infinite-brain-post-write-verification.ts
projects/brain-core/src/adapters/infinite-brain-writers/writer-live-status.ts
projects/brain-core/src/adapters/infinite-brain-writers/writer-source-routing.ts
projects/brain-core/src/adapters/infinite-brain-writers/writer-supersede-archive.ts
projects/brain-core/src/adapters/infinite-brain-writers/writer-wiki.ts
projects/brain-core/src/adapters/mind-steward-task-write-approval.ts
projects/brain-core/src/tests/infinite-brain-proposal-application-planner.test.ts
projects/brain-core/src/tests/infinite-brain-post-write-verification.test.ts
projects/brain-core/src/tests/infinite-brain-writer-stubs.test.ts
projects/brain-core/src/tests/infinite-brain-writer-recovery-procedure.test.ts
projects/brain-core/src/tests/mind-steward-task-write-approval.test.ts
```

### Maintenance, validator, and required Mind surfaces

```text
projects/brain-core/src/mind-structure-validator/validator.ts
projects/brain-core/src/bin/mind-structure-validator.ts
projects/brain-core/src/tests/mind-structure-validator.test.ts
projects/brain-core/src/mind-maintenance-pilot/pilot-file-loader.ts
projects/brain-core/src/mind-maintenance-pilot/report-schema-validator.ts
projects/brain-core/src/mind-maintenance-pilot/source-integrity-validator.ts
projects/brain-core/src/mind-maintenance-pilot/report-writer.ts
projects/brain-core/src/tests/mind-maintenance-pilot-loader-stale.test.ts
projects/brain-core/src/tests/mind-maintenance-source-integrity.test.ts
projects/brain-core/src/tests/mind-maintenance-report-schema.test.ts
```

### Task, project, and status surfaces

```text
projects/brain-core/src/adapters/mind-steward-canonical-task-record.ts
projects/brain-core/src/adapters/mind-steward-project-status-suggestions.ts
projects/brain-core/src/adapters/mind-steward-completed-project-archive-suggestions.ts
projects/brain-core/src/tests/mind-steward-canonical-task-record.test.ts
projects/brain-core/src/tests/mind-steward-project-status-suggestions.test.ts
projects/brain-core/src/tests/mind-steward-completed-project-archive-suggestions.test.ts
projects/brain-core/src/tests/mind-kanban-exporter-validation.test.ts
```

### Runtime routes and API types

```text
projects/brain-core/src/api/routes.ts
projects/brain-core/src/types/api.ts
```

### Brain specs, runbooks, and config

```text
operations/specs/1779034874780-mind-steward-mind-write-apply-policy.md
operations/specs/graphify-standard.md
operations/specs/infinite-brain-runtime-inventory.md
operations/specs/infinite-brain-runtime-roadmap.md
operations/runbooks/brain-console-command-center.md
operations/runbooks/mind-automation-cron-jobs.md
operations/runbooks/mind-steward.md
operations/runbooks/mind-workflow-guide.md
operations/runbooks/n8n-mind-inbox.md
operations/runbooks/shared-memory-system.md
operations/system-configs/gemini/GEMINI.md
```

## Brain generated-runtime summary

`runtime/local` contains generated/latest report outputs with old paths:

- 57 files scanned;
- 24 matched old path tokens;
- matched tokens include `capture/inbox`, `capture/failed`, `live/`, `wiki/`, `sources/`, `archive/`, `kanban.md`, `router/`, `graphify-out`, `mindRoot`, and `inboxPath`.

Representative generated files:

```text
runtime/local/mind-steward/inbox-latest.json
runtime/local/mind-steward/inbox-latest.md
runtime/local/mind-steward/inbox-queue-latest.json
runtime/local/mind-steward/inbox-queue-latest.md
runtime/local/mind-steward/classify-latest.json
runtime/local/mind-steward/classify-latest.md
runtime/local/infinite-brain/entity-classifier-latest.json
runtime/local/infinite-brain/entity-classifier-latest.md
runtime/local/infinite-brain/proposals-latest.json
runtime/local/infinite-brain/proposals-latest.md
runtime/local/graphify/mind-knowledge-latest.json
runtime/local/graphify/mind-knowledge-latest.md
```

Migration handling: do not edit these as canonical source. Regenerate them after code and docs support the new structure, or leave them as historical/latest snapshots until the relevant runtime jobs are re-run.

## Migration dependency order from inventory

The inventory shows this cannot start with `git mv`. The safest order is:

1. Update Brain path constants and readers to support the new structure while preserving compatibility with old paths.
2. Update tests for dual-read compatibility.
3. Update Mind docs and router/agent context to describe the target structure.
4. Update Save-to-Mind only after Brain readers can read `inbox/new/`.
5. Migrate Mind files in small folder-family commits.
6. Update Obsidian links and current user-facing pages.
7. Regenerate or update report surfaces.
8. Remove old folders only after validation and explicit approval.

## Required compatibility choices before Phase 2

These decisions are needed before implementation begins:

1. Should Brain support both old and new paths during a transition window?
   - Recommendation: yes.
2. Should `capture/inbox/` temporarily remain as a compatibility fallback?
   - Recommendation: yes until Save-to-Mind and Mind Steward validate `inbox/new/`.
3. Should `kanban.md` become `tasks.md` in the same migration?
   - Recommendation: yes, but only after task-contract tests support `tasks.md`.
4. Should `router/` move to `system/agent-context/` in the same migration?
   - Recommendation: yes for human cleanliness, but after coding-LLM root entrypoints are fixed.
5. Should `graphify-out/` move under `system/generated/graph/` now?
   - Recommendation: defer unless Graphify config can be updated and validated in the same bounded slice.

## Phase 1 conclusion

Phase 1 inventory confirms the migration is feasible but touches active source code, tests, user docs, agent context, runtime reports, graph output, task contracts, and Save-to-Mind/Mind Steward assumptions.

The next safe implementation phase is not moving Mind files. The next phase should be a Brain compatibility slice:

```text
Add named Mind path constants / structure mapping in Brain Core, update Mind Steward and structure validator to recognize `inbox/new/`, `inbox/failed/`, `projects/`, `knowledge/`, `resources/`, `history/`, `tasks.md`, and keep old paths as compatibility fallbacks during migration.
```
