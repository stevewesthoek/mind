# Mind OS Migration Handoff — Mind Repo

**Date:** 2026-05-16  
**Repo:** `mind`  
**Purpose:** Restart handoff for the next AI conversation after the first safe migration slice.

## Conclusion

The first safe Mind OS migration slice is complete. The new unnumbered structure now exists beside the old numbered PARA structure. No legacy folder was moved, deleted, archived, or rewritten by this migration slice.

Live Save-to-Mind deployment was verified on 2026-05-16. The public `/webhook/mind-inbox` endpoint successfully wrote a harmless test capture to `capture/inbox/2026-05-16-mind-os-live-deployment-verification.md`. The follow-up hardening slice removed the literal Gemini key from the workflow JSON, preserved the success path, and verified a recoverable failure-buffer capture at `capture/failed/2026-05-16-mind-os-failure-buffer-verification.md`.

## Source documents read

Mind docs read and used as source of truth:

- `MIND-OS-ROADMAP.md`
- `MIND-OS-IMPLEMENTATION-PLAN.md`

Brain docs read and used as source of truth:

- `docs/system/obsidian-brain-core-roadmap.md`
- `docs/system/obsidian-brain-core-implementation-plan.md`
- `docs/system/obsidian-mind-model-router-roadmap.md`

Relevant brain n8n docs/workflow read:

- `operations/runbooks/n8n-mind-inbox.md`
- `operations/automations/n8n/workflows/mind-inbox-fixed.json`

## Architecture confirmed

- Obsidian is the primary human cockpit.
- `mind` stores human memory, live work, capture, wiki, sources, and archive.
- `brain` owns executable infrastructure: model-router implementation, Brain Core, scheduler integration, skills, orchestrators, and n8n operational assets.
- Save-to-Mind remains the permanent capture doorway.
- Public webhook path remains `/mind-inbox`.
- Internal target path moves from `01-inbox/` to `capture/inbox/` after live deployment/testing.
- Failure buffer target is `capture/failed/`.
- Old numbered folders stay in place until validation and explicit archive phase.

## Work completed in `mind`

### New root file

Created:

- `TODAY.md`

Purpose:

- Daily focus surface for the Mind OS cockpit.
- Links to `HOME.md`, `live/dashboard.md`, `live/tasks.md`, `live/projects.md`, `live/workflows.md`, and `capture/inbox/README.md`.

### New router contract

Created:

- `router/current.md`
- `router/map.md`
- `router/rules.md`
- `router/taxonomy.md`
- `router/maintenance.md`
- `router/model-router.md`

Purpose:

- Defines the vault contract for the model router.
- Confirms legacy numbered folders are read-only references during migration.
- Defines routing, taxonomy, size, safety, maintenance, and drift/error rules.

### New capture structure

Created:

- `capture/inbox/README.md`
- `capture/daily/README.md`
- `capture/failed/README.md`

Purpose:

- `capture/inbox/` is the new successful Save-to-Mind target after deployment/testing.
- `capture/daily/` is optional daily scratch/capture space.
- `capture/failed/` is the raw recoverable failure buffer.

### New live operating structure

Created:

- `live/dashboard.md`
- `live/tasks.md`
- `live/projects.md`
- `live/workflows.md`
- `live/decisions.md`

Purpose:

- Sparse current operating layer.
- Does not replace `KANBAN.md` yet.
- Does not duplicate machine runtime truth; Brain Core should provide runtime state later.

### New wiki structure

Created:

- `wiki/index.md`
- `wiki/people.md`
- `wiki/organisations.md`
- `wiki/business.md`
- `wiki/faith.md`
- `wiki/family.md`
- `wiki/health.md`
- `wiki/finance.md`
- `wiki/content.md`
- `wiki/ai.md`
- `wiki/tools.md`

Purpose:

- Target compiled durable memory layer.
- Currently placeholders only; no legacy content was compiled or moved yet.

### New sources structure

Created:

- `sources/index.md`
- `sources/web/README.md`
- `sources/books/README.md`
- `sources/papers/README.md`
- `sources/transcripts/README.md`
- `sources/files/README.md`

Purpose:

- Target raw evidence/source material layer.
- Currently placeholders only.

### New archive structure

Created:

- `archive/index.md`
- `archive/completed/README.md`
- `archive/old/README.md`

Purpose:

- Target archive area for later validated archive phase.
- No legacy folders were moved into it.

### Navigation/docs updated

Updated:

- `HOME.md`
- `README.md`

Changes:

- `HOME.md` now links to new Mind OS surfaces while preserving the legacy dashboard and `KANBAN.md` links.
- `HOME.md` capture status now says public webhook `/mind-inbox` writes to `capture/inbox/`, with the legacy `01-inbox/` retained for historical reference.
- `README.md` stale troubleshooting endpoint was corrected from `/brain-inbox` to `/mind-inbox`.

## Matching Brain handoff

There should be a matching handoff in the `brain` repo:

```text
docs/system/mind-os-migration-handoff-2026-05-16.md
```

Read that file before touching n8n/model-router/Brain Core.

## Validation completed in `mind`

BuildFlow verification completed:

- All created files reported `verified:true` when written.
- Root structure listing confirmed new folders exist beside legacy folders.
- Secret-pattern scan using `forbidden_secret_material` passed on the changed migration files.
- `git_status_short` completed.
- Sanitized workflow verification capture landed in `capture/inbox/2026-05-16-mind-os-sanitized-workflow-verification.md`.
- Failure-buffer verification capture landed in `capture/failed/2026-05-16-mind-os-failure-buffer-verification.md`.

Security scan target files included:

- `HOME.md`
- `README.md`
- `TODAY.md`
- all `router/*.md`
- capture README files
- live files
- `wiki/index.md`
- `sources/index.md`
- `archive/index.md`

## Known dirty state in `mind`

Important: before or during this migration window, `mind` already had substantial unrelated working-tree churn.

Observed unrelated/pre-existing state included:

- Modified `.obsidian/community-plugins.json`
- Many deleted files under `04-tasks/...`
- New `.obsidian` plugin/bookmark files
- New untracked files under `01-inbox/`
- New untracked `03-projects/04-tasks/`
- New untracked `06-resources/research/notes/bible/denominations/`

Do not assume those are part of this migration. Do not stage or commit them unless separately reviewed.

Migration-related changed/new paths from this slice:

```text
HOME.md
README.md
TODAY.md
router/
capture/
live/
wiki/
sources/
archive/
MIND-OS-HANDOFF-2026-05-16.md
```

Note: `home.md` appeared in `git diff --name-only` even though the read/update target was `HOME.md`. Be careful on case-sensitive/case-insensitive filesystem behavior. Inspect before staging.

## Continuation update — 2026-05-16

The next conversation resumed from this handoff and the matching Brain handoff.

Validation performed through BuildFlow:

- `git_status_short` completed in both `mind` and `brain`.
- `capture/inbox/`, `capture/failed/`, `router/`, and `live/` were confirmed present in `mind`.
- Brain workflow JSON validation passed for `operations/automations/n8n/workflows/mind-inbox-fixed.json`.
- Brain model-router changed files passed the secret-pattern scan.

Repo-local implementation advanced in `brain`:

- `projects/model-router/src/contracts.ts` now defines Mind OS path snapshots and contract dry-run result types.
- `projects/model-router/src/jobs.ts` now includes a read-only `createMindContractDryRunResult(...)` helper for the drift/error loop.
- `projects/model-router/src/index.ts` exports the new dry-run API.
- `projects/model-router/README.md` documents the dry-run capability and safety boundary.

Verified after continuation:

- Live n8n deployment was performed via the n8n Public API wrapper against workflow `FwP5INe9qoo1OwGC`.
- Production `/webhook/mind-inbox` test returned a saved/file committed response.
- The live capture landed in `capture/inbox/2026-05-16-mind-os-live-deployment-verification.md`.
- Codex reported a sanitized success capture at `capture/inbox/2026-05-16-mind-os-sanitized-workflow-verification.md`; this file was not present in the local BuildFlow `mind` source during the follow-up verification pass, so remote/local sync should be checked before relying on that exact path as local evidence.
- A guarded failure-buffer test was verified locally at `capture/failed/2026-05-16-mind-os-failure-buffer-verification.md`.
- No new capture from the follow-up local check appeared in legacy `01-inbox/`.

Still not verified:

- A real-world failure-buffer trigger from Gemini timeout, malformed JSON, or upstream API failure.

Next Codex handoff created in `brain`:

- `docs/system/1778967920555-codex-prompt-save-to-mind-failure-buffer-and-secret-cleanup-2026-05-16.md`

## Brain Core Phase 1 continuation — 2026-05-16

Created a sparse Obsidian machine page:

```text
live/machine.md
```

Updated:

```text
HOME.md
README.md
```

Purpose:

- Give Obsidian a human-facing entry point for Brain Core machine state.
- Keep runtime truth in Brain Core instead of duplicating logs or service state in markdown.
- Preserve the rule that Obsidian remains the human cockpit while `brain` owns executable infrastructure.

Linked Brain Core endpoints documented:

```text
GET /status
GET /sessions
GET /skills
```

Safety preserved:

- No secrets stored in Mind.
- No runtime logs pasted into Mind.
- No legacy numbered folders moved, deleted, archived, or rewritten.
- No KANBAN changes.

## What was not done

- No legacy numbered folder was moved.
- No legacy numbered folder was archived.
- No legacy numbered folder was deleted.
- No old PARA content was compiled into `live/`, `wiki/`, or `sources/`.
- `KANBAN.md` was not edited.
- No additional live Save-to-Mind webhook test was performed in this slice.
- No capture was written to `capture/inbox/` by live n8n in this slice.
- No live model-router job processed the vault.
- No commit or push was performed.

## Recommended next phase

Start the next conversation here:

1. Read this file.
2. Read the matching `brain/docs/system/mind-os-migration-handoff-2026-05-16.md` file.
3. Run `git status` in both repos through BuildFlow.
4. Verify that the new folders still exist:
   - `capture/inbox/`
   - `capture/failed/`
   - `router/`
   - `live/`
   - `wiki/`
   - `sources/`
   - `archive/`
5. In `brain`, keep the sanitized n8n workflow and failure-buffer branch as the source of truth.
6. Confirm future normal captures still land in `capture/inbox/`.
7. Keep failure-buffer handling as a separate slice if you want to replace the test-only trigger with a real recoverable error branch.
8. Build model-router dry-run checks before any content migration.

## Do not do yet

Do not archive old numbered folders yet.

Do not move:

```text
01-inbox/
02-strategy/
03-projects/
04-tasks/
05-areas/
06-resources/
07-templates/
08-archive/
```

until all of the following are true:

- New Save-to-Mind capture has landed in `capture/inbox/`.
- Failed capture behavior has a recoverable target in `capture/failed/`.
- Model-router dry run can inspect old and new structure.
- The user explicitly approves the archive phase.

## Commit guidance for later

Do not commit until the user asks.

If asked to commit, stage explicit paths only. Suggested `mind` migration paths:

```text
HOME.md
README.md
TODAY.md
MIND-OS-HANDOFF-2026-05-16.md
router/current.md
router/map.md
router/rules.md
router/taxonomy.md
router/maintenance.md
router/model-router.md
capture/inbox/README.md
capture/daily/README.md
capture/failed/README.md
live/dashboard.md
live/tasks.md
live/projects.md
live/workflows.md
live/decisions.md
wiki/index.md
wiki/people.md
wiki/organisations.md
wiki/business.md
wiki/faith.md
wiki/family.md
wiki/health.md
wiki/finance.md
wiki/content.md
wiki/ai.md
wiki/tools.md
sources/index.md
sources/web/README.md
sources/books/README.md
sources/papers/README.md
sources/transcripts/README.md
sources/files/README.md
archive/index.md
archive/completed/README.md
archive/old/README.md
```

Do not stage unrelated `.obsidian` changes, unrelated untracked inbox/base files, or deleted `04-tasks/...` files unless the user explicitly asks after review.

## Safety rules to preserve

- No data loss.
- Additive first, archive later.
- Keep old numbered folders available until validation is complete.
- Keep public webhook `/mind-inbox` stable.
- New n8n internal target is `capture/inbox/`, but do not claim live until tested.
- Failure target is `capture/failed/`.
- Do not store secrets in `mind`.
- Do not duplicate machine runtime state in notes.
- Brain Core should be the machine/runtime boundary later.


## Brain Core adapter-hardening continuation — 2026-05-16

Brain Core Phase 1 was hardened in `brain` after the sparse `live/machine.md` page was created.

Updated Mind file:

```text
live/machine.md
```

The page now documents that Brain Core `/sessions` is still read-only but supports configured session discovery, age labels, intent labels, and simple recency/intent ranking.

Safety preserved:

- No runtime logs copied into Mind.
- No secrets stored in Mind.
- No legacy numbered folders moved, archived, deleted, or rewritten.
- No KANBAN changes.

Validation reported from `brain`:

- `npm run ci` passed in `projects/brain-core`.
- 6 Node route/adapter tests passed.
- JSON validation passed.
- Secret scan passed.

## Brain Core `/repos` continuation — 2026-05-17

Brain Core added a read-only `/repos` endpoint in `brain`.

Mind update:

```text
live/machine.md
```

The machine page now lists `GET /repos` and documents that it reports configured repo aliases and known handoff presence without copying handoff contents, runtime logs, or secrets into Mind.

Safety preserved:

- No secrets stored in Mind.
- No runtime logs copied into Mind.
- No legacy numbered folders moved, archived, deleted, or rewritten.
- No KANBAN changes.

Validation reported from `brain`:

- `npm run ci` passed in `projects/brain-core`.
- 7 Node route/adapter tests passed.
- JSON validation passed.
- Secret scan passed.

## Brain Core `/scheduler/status` continuation — 2026-05-17

Brain Core added a read-only `/scheduler/status` placeholder endpoint in `brain`.

Mind update:

```text
live/machine.md
```

The machine page now lists `GET /scheduler/status` and documents that it is placeholder-only. It does not inspect logs, run scheduler jobs, or mutate scheduler state.

Safety preserved:

- No secrets stored in Mind.
- No runtime logs copied into Mind.
- No legacy numbered folders moved, archived, deleted, or rewritten.
- No KANBAN changes.

Validation reported from `brain`:

- `npm run ci` passed in `projects/brain-core`.
- 8 Node route/adapter tests passed.

## Brain Core Phase 1 endpoint completion — 2026-05-17

Brain Core completed the remaining read-only Phase 1 endpoint surface.

Mind update:

```text
live/machine.md
```

The machine page now lists and describes the complete read-only endpoint surface:

```text
GET /status
GET /sessions
GET /skills
GET /repos
GET /scheduler/status
GET /scheduler/latest-run
GET /scheduler/jobs
GET /local-apps
GET /video/status
GET /video/queue
GET /approvals
```

Safety preserved:

- No secrets stored in Mind.
- No runtime logs copied into Mind.
- No scheduler jobs run from Mind.
- No video jobs started from Mind.
- No approval decisions implemented in Mind.
- No legacy numbered folders moved, archived, deleted, or rewritten.
- No KANBAN changes.

Validation reported from `brain`:

- `npm run ci` passed in `projects/brain-core`.
- 14 Node route/adapter tests passed.

## Mind Phase 2 cockpit completion — 2026-05-17

Completed the next sparse Obsidian cockpit slice.

New pages:

```text
live/sessions.md
live/video.md
live/business.md
```

Updated pages:

```text
HOME.md
README.md
live/dashboard.md
```

Purpose:

- Give Obsidian a clear human-facing surface for sessions, video, and business operations.
- Keep runtime truth in Brain Core and source systems.
- Avoid turning Mind notes into databases, logs, queues, or credential stores.

Safety preserved:

- No secrets stored in Mind.
- No runtime logs copied into Mind.
- No session transcripts copied into Mind.
- No video queue dumps copied into Mind.
- No duplicate task/project database created.
- No legacy numbered folders moved, archived, deleted, or rewritten.
- No KANBAN changes.

## Brain Console integration contract — 2026-05-17

Brain added a safe Phase 3 foundation contract for a future Obsidian `brain-console` plugin/integration layer.

Mind update:

```text
live/machine.md
```

The machine page now documents the read-only Brain Console widget surfaces:

```text
brain-status
brain-sessions
brain-repos
brain-skills
brain-scheduler
brain-local-apps
brain-video-queue
brain-approvals
```

Safety preserved:

- No plugin code was written into `.obsidian` from this slice.
- No secrets stored in Mind.
- No runtime logs copied into Mind.
- No action or approval mutation endpoints exist yet.
- Mind remains readable without Brain Core online.

## Brain Core Phase 4 approval boundary — 2026-05-17

Brain added a safe approval-aware action boundary.

Mind update:

```text
live/machine.md
```

The machine page now documents these local-only Brain Core POST routes:

```text
POST /actions/request?kind=<safe-action-kind>
POST /approvals/:id/approve
POST /approvals/:id/reject
```

Safety preserved:

- Approval records are in-memory only in this slice.
- Approval endpoints return `executed: false`.
- No shell commands are run.
- No scheduler jobs are triggered.
- No local apps are started/stopped/restarted.
- No sessions are resumed.
- No external systems are mutated.
- No secrets stored in Mind.

Validation reported from `brain`:

- `npm run ci` passed in `projects/brain-core`.
- 18 Node route/adapter/widget tests passed.

## Brain Core Phase 7 hardening slice — 2026-05-17

Brain added a Brain Core restore/health/rollback runbook and a Brain Console health-check contract.

Relevant Brain files:

```text
operations/runbooks/brain-core.md
projects/brain-core/src/obsidian.ts
projects/brain-core/src/tests/obsidian.test.ts
```

Mind impact:

- No new runtime state was copied into Mind.
- `live/machine.md` remains the sparse human-facing entry point.
- Obsidian should remain readable if Brain Core is offline.

Validation reported from `brain`:

- `npm run ci` passed in `projects/brain-core`.
- 19 Node route/adapter/widget/health tests passed.

## Brain Core approval audit + blocked plugin handoff — 2026-05-17

Brain continued the remaining roadmap work until blocked by repo policy or live access.

Brain Core added:

```text
GET /approvals/audit
BRAIN_CORE_APPROVAL_AUDIT_PATH optional JSONL persistence
```

Safety preserved:

- Approval endpoints still return `executed: false`.
- Audit logs must not be stored in Mind notes.
- No executable actions were enabled.
- No runtime logs copied into Mind.

Blocked and skipped:

- A standalone Brain Console Obsidian plugin project could not be created because the Brain repo write policy blocks `projects/brain-console-obsidian/`.
- Plugin implementation details were recorded in `brain/operations/specs/brain-console-obsidian-plugin.md`.
- Live integrations that require direct local runtime access were captured in `brain/docs/system/1778991704100-codex-prompt-complete-live-brain-core-integrations-2026-05-17.md`.

Mind safety preserved:

- No legacy numbered folders moved, archived, deleted, or rewritten.
- No KANBAN changes.
- No `.obsidian` plugin files were written by this slice.