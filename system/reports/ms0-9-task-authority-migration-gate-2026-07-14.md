# MS0.9 — Task-Authority Migration Gate

**Date:** 2026-07-14
**Task:** `MS0.9 — Prepare M1.4 task-authority migration gate`
**Verdict:** **BLOCKED — M1.4 must not begin**
**Boundary:** Mind-only fixtures, validator, contract, and evidence. No live task content was moved or rewritten.

## Authority decision matrix

| Model | Evidence | Decision |
|---|---|---|
| A. `kanban.md` remains permanent authority | Current contract names it current, not permanent. | Rejected as a future decision; it remains the current authority only. |
| B. `tasks.md` becomes authority | `home.md`, `system/folder-contract.md`, and legacy agent-context migration guidance name it a target. | Candidate only. The tracked validation copy is stale and no cutover approval exists. |
| C. `tasks/` structured records become authority | `system/task-kanban-contract.md` and `system/task-sync-spec.md` describe durable structured records; `tasks/README.md` reserves the directory. | Candidate only. Its layout is expressly future/proposed and contains no task records. |
| D. Hybrid model | The sync specification describes structured records → generated/synchronized board → `live/tasks.md` summary. | Candidate only. It does not select the one writable authority or define the current six-column mapping. |

**Current authority:** `kanban.md`, human-only.
**Candidate future authority:** unresolved between the `tasks.md` target and proposed structured-record model.
**Decision:** no future authority model is proven. The machine-readable contract therefore sets `futureAuthority` to `null` and rejects a live dry run.

## Files inspected

Mind canonical and task surfaces:

- `system/mind-implementation-plan.md`, `system/mind-roadmap.md`, `system/task-kanban-contract.md`, `system/task-sync-spec.md`, `system/folder-contract.md`, `system/brain-mind-bridge.md`, `system/mind-strategy.md`, `home.md`
- `kanban.md`, `tasks.md`, `tasks/README.md`, `live/tasks.md`
- `system/reports/pre-1-0-architecture-stabilization-mind-planning-2026-07-13.md`
- `system/reports/m1-3-active-documentation-paths-2026-07-12.md`
- `system/reports/kanban-inventory-2026-06-06.md`
- `system/reports/task-surface-migration-precheck-2026-07-07.md`
- `system/reports/task-source-validation-review-2026-07-07.md`
- `tools/export-kanban-tasks.mjs` and the current task-tool inventory

Brain was inspected read-only:

- `operations/specs/infinite-brain-runtime-implementation-plan.md`
- `operations/specs/infinite-brain-path-registry.json`
- `operations/reports/bs0-6-canonical-path-registry-2026-07-13.md`
- `operations/reports/bs0-9-brain-core-path-consumer-migration-2026-07-14.md`
- `operations/reports/bs0-10-active-legacy-path-producers-2026-07-14.md`

## Task-representation inventory

| Representation | Classification | Inventory / evidence | Authority result |
|---|---|---|---|
| `kanban.md` | Current authority | 6 columns; 87 cards; 45 checked; 42 unchecked; 6 subtasks. | Sole current write authority. |
| `tasks.md` | Proposed future authority / validation copy | 87 cards; 43 checked; differs from `kanban.md` in two cards: `Make up CV Elton` and `Update Freek with Wilson` are complete only on `kanban.md`. | Not authoritative; it cannot be used as a lossless source or destination yet. |
| `tasks/` | Proposed future authority | Only `tasks/README.md`; zero task records. | Not authoritative. |
| `live/tasks.md` | Derived summary / compatibility surface | 12 lines, two checklist suggestions, no stable IDs, and explicitly says `kanban.md` remains the daily board. | Cannot become a competing authority. |
| `projects/` task sections | Historical/planning references only | Focused heading/checkbox scan found no project task record section. | No task representation to migrate. |
| Roadmap and implementation-plan task references | Historical/planning evidence | Contains task IDs and migration requirements, not live task records. | Non-authoritative. |
| Mind executable task tooling | Read-only export / ambiguous non-producer | `tools/export-kanban-tasks.mjs` reads `kanban.md`; static scan found no Mind task writer. | No Mind automation output may establish authority. |
| Brain legacy producers | Automation outputs, out of scope | BS0.10 names `clickup-importer.py`, `mind-kanban-syncer.py`, and `mind-project-decomposer.py` as writers to `04-tasks/`. | Their future interface remains unavailable until this gate is ready. |

### Current board details

| Column | Cards | Checked | Unchecked |
|---|---:|---:|---:|
| Backlog | 2 | 0 | 2 |
| To Do | 15 | 1 | 14 |
| Doing | 13 | 5 | 8 |
| Done | 39 | 39 | 0 |
| Focus | 4 | 0 | 4 |
| Project ideas | 14 | 0 | 14 |

No exact duplicate card title was found in the current board. This is not a stable-ID proof: the board has no task IDs, and raw text or a line number cannot remain stable after a task move. The board contains six checked cards outside `Done`, so checkbox/completion state cannot be silently inferred from column status. No structured owner, project, dependency, due-date, or archive fields exist in the current board; tags, URLs, dates, and subtasks are embedded in text and must be preserved or mapped only by an approved rule.

## Contradictions and blocking findings

1. **MS0.9 prerequisite fails:** `M1.3` is still in progress and its evidence report is blocked. MS0.9 requires M1.3 completion and stable task/runtime behavior.
2. **Future authority is unresolved:** `tasks.md` is named as a target in human-facing migration guidance, while the task contract/specification describes structured task records and a possible `tasks/` layout. Neither names one approved canonical write surface.
3. **The validation copy is no longer lossless:** `tasks.md` has two fewer completed cards than `kanban.md`; direct comparison reports 85 common records, two `kanban.md`-only completed records, and two stale `tasks.md` equivalents.
4. **Status mapping is incomplete:** the specification lists `backlog|todo|doing|done`, but the real board also has `Focus` and `Project ideas`. The gate rejects these unmapped states rather than collapsing them.
5. **Stable IDs are absent:** no approved explicit-ID or reversible export-table mechanism exists for the 87 live cards.
6. **Human/Obsidian validation remains absent:** the prior validation report still requires confirmation that `tasks.md` functions as the intended board and that ordinary editing/mobile workflows do not depend on `kanban.md`.

## Machine-checkable synchronization contract

Created: `system/task-authority-migration-contract.json`.

It defines the current source, unresolved candidates, canonical identity requirements, exact authoritative fields, allowed statuses, source/destination mappings, duplicate/conflict/loss rules, unknown-field rejection, deterministic ordering, idempotency, rollback, cutover criteria, compatibility behavior, and the exact producer interface required before BS0.10 may resume.

Field mapping is deliberately fail-closed:

| Field group | Gate behavior |
|---|---|
| Raw card, title, tags, checkbox, completion date, nested subtasks, column/order, source location | Preserve exactly. |
| Stable ID | Require an approved explicit ID or reversible export table. |
| Priority, owner, project, dependencies, creation/update/due metadata | Preserve only if represented; otherwise remain `null`/empty and may not be inferred. |
| Unknown task-record field | Reject the migration; never drop it. |
| Column/status | Require an approved mapping; unmapped values reject the migration. |

## Validator, fixtures, and dry run

Created:

- `tools/validate-task-authority-migration.mjs`
- `tools/validate-task-authority-migration.test.mjs`
- `tools/fixtures/task-authority-migration/equivalent.json`
- `tools/fixtures/task-authority-migration/divergent-priority.json`
- `tools/fixtures/task-authority-migration/duplicate-id.json`
- `tools/fixtures/task-authority-migration/missing-task.json`
- `tools/fixtures/task-authority-migration/unsupported-status.json`
- `tools/fixtures/task-authority-migration/unknown-field.json`

Fixture coverage:

- all four currently specified status values;
- nested subtasks;
- completed and open records;
- priority, owner, project, and dependency fields;
- lossless destination comparison;
- round trip;
- second-run idempotency;
- exact rollback;
- a deliberate priority divergence;
- duplicate stable IDs;
- a missing destination task;
- an unsupported live-status value;
- an unknown field that must not be discarded.

Commands and observed output:

```text
node --test tools/validate-task-authority-migration.test.mjs
# 6 pass; 0 fail

node tools/validate-task-authority-migration.mjs validate-fixture tools/fixtures/task-authority-migration/equivalent.json
# fixture=pass; tasks=4; lossless=true; round_trip=true; idempotent=true; rollback=true

node tools/validate-task-authority-migration.mjs dry-run
# migration=blocked; reason=future_authority_unresolved; live_content_changed=false
# exit=2
```

The validator proves the gate mechanics using temporary fixtures only. It does not prove a live cutover because the live stable-ID, authority, status-mapping, and prerequisite gates are not satisfied.

## Rollback and compatibility plan

No live snapshot or rollback artifact was created because M1.4 did not begin. Before any cutover, a human-approved hash snapshot of the selected current authority and a reversible stable-ID export table are mandatory.

Until then:

- `kanban.md` remains the only writable task authority;
- `tasks.md` is a stale validation copy and must not receive task writes;
- `tasks/` remains reserved future structure;
- `live/tasks.md` remains a derived summary;
- no compatibility surface may be removed.

## Required future Brain producer interface

BS0.10 remains blocked. A future producer may write only after M1.4 selects an exact target and only when it supplies:

1. the approved exact target path;
2. a stable task ID and complete authoritative fields;
3. an idempotency key;
4. expected pre-write snapshot hash;
5. fail-closed conflict handling with no write on mismatch; and
6. a receipt plus rollback reference.

Forbidden legacy write targets remain `kanban.md`, `tasks.md`, `tasks/`, `live/tasks.md`, and `04-tasks/` until the cutover contract explicitly changes that rule.

## Worktree and safety evidence

- Mind started with 38 unrelated dirty entries, including `kanban.md`, M1.1–M1.3 work, `wiki/log.md`, and contract documents. They were not edited by this task.
- Brain started dirty and ends with 202 unrelated entries; Brain remained read-only.
- Mind now has only the new gate artifacts described above in this task's scope.
- No deployment, automation, scheduler, n8n run, webhook, network write, credential access, commit, or push occurred.

## Final verdict

**MS0.9 is blocked, not complete.** The fixture gate is implemented and passes its positive and negative proofs, but the real authority decision and live cutover prerequisites are not proven. `kanban.md` remains the current authority; **M1.4 did not begin**; **Brain BS0.10 remains blocked**.

### Exact decision needed to unblock a future MS0.9 retry

After M1.3 is completed, an explicit Mind authority decision must select exactly one of: `tasks.md` as the sole write surface, `tasks/` structured records as the sole write surface, or a hybrid with one named writable surface and generated read-only derivatives. That decision must also define mappings for `Focus` and `Project ideas`, stable-ID issuance, completion-vs-column behavior, and the human/Obsidian validation evidence for `tasks.md` if it is selected.
