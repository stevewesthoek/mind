# Mind OS Handoff — 2026-05-17 Continuation

## Purpose

Restart handoff for the next conversation. This file records the current Mind repo state and how it relates to the latest Brain roadmap work.

## Current verified repo state

Verified through BuildFlow during the handoff update:

Mind dirty state before this file is committed:

```text
 M .obsidian/community-plugins.json
?? .obsidian/plugins/custom-sort/
?? .obsidian/plugins/ghostty-terminal/
?? .obsidian/plugins/obsidian-icon-folder/
?? MIND-OS-HANDOFF-2026-05-17-CONTINUATION.md
```

The `.obsidian` entries are local Obsidian plugin/config state. Do not stage or commit them automatically. They require an explicit user decision and path-by-path review.

Brain latest pushed roadmap commit at the time of this handoff:

```text
9e40c0b1 Update first-action execution status docs
```

Brain still has unrelated dirty state that should not be staged without separate review:

```text
 M operations/system-configs/claude/.last-cleanup
 D operations/system-configs/claude/plans/*.md
 M tools/firecrawl/logs/firecrawl.log
```

## Mind OS state

Completed:

- Mind OS root/cockpit structure exists:
  - `capture/`
  - `live/`
  - `router/`
  - `wiki/`
  - `sources/`
  - `archive/`
- `live/machine.md` is the sparse Brain Core entry point.
- `live/sessions.md`, `live/video.md`, and `live/business.md` exist as sparse human-facing pages.
- Mind remains the human cockpit; Brain owns runtime truth.

Mind rules:

- Do not store Brain runtime logs in Mind.
- Do not store approval/audit JSONL in Mind.
- Do not store model-router runtime outputs in Mind.
- Do not store secrets in Mind.
- Do not duplicate machine runtime truth in notes.

## Save-to-Mind state

Completed:

- Save-to-Mind target is `capture/inbox/`.
- Failure buffer target is `capture/failed/`.
- Public webhook remains `/webhook/mind-inbox`.
- n8n workflow was sanitized to avoid hardcoded Gemini key material.
- Live capture and failure-buffer behavior are documented in the Brain handoff/report chain.

## Legacy task migration state

Completed:

- Legacy task migration Option B was executed safely.
- Preservation tag was created first: `mind-pre-legacy-task-decision-2026-05-18`.
- Old tracked `04-tasks/**` and mirror `03-projects/04-tasks/**` had parity immediately before migration.
- Sample hash checks passed before commit.
- Migration was committed in Mind as `12495d4 Migrate legacy tasks into project task mirror`.
- Later Mind commit `55e2473 mind: sync kanban board from tasks` is known as the latest pre-handoff Mind commit referenced by earlier docs.

Do not redo legacy task migration unless the user explicitly asks for rollback or audit.

## Brain Core state relevant to Mind

Brain Core now has a tested local API surface.

Important endpoints:

```text
GET /status
GET /sessions
GET /skills
GET /repos
GET /orchestrators
GET /capabilities
GET /scheduler/status
GET /scheduler/latest-run
GET /scheduler/jobs
GET /local-apps
GET /video/status
GET /video/queue
GET /approvals
GET /approvals/store
GET /approvals/audit
GET /runtime/reports
GET /execution/plans
GET /execution/plans/:kind
GET /execution/readiness
POST /actions/request
POST /approvals/:id/approve
POST /approvals/:id/reject
POST /scheduler/jobs/:id/request-run
```

## Controlled first-action execution state

Brain now implements exactly one controlled report-only execution path:

```text
scheduler-run-model-router-dry-run
```

This is not broad execution. It is not a shell runner. It is not a model-router write/apply path for Mind.

The first action requires all gates:

- exact action kind only
- `BRAIN_CORE_ENABLE_MODEL_ROUTER_DRY_RUN_EXECUTION=true`
- durable approval store available
- durable approval audit path available
- approved approval record
- exact command only: `bash tools/scripts/model-router-dry-run-report.sh`
- Brain-owned runtime output only: `runtime/local/model-router/latest.json`
- `MODEL_ROUTER_MIND_ROOT` stripped before execution
- execution summary records `writesToMind=false` and `externalSideEffects=false`
- audit records an `executed` event only after success

Mind rule:

- The model-router remains report-only for Mind.
- No Brain Core path may write, move, delete, archive, compact, split, or rewrite Mind content until a separate write/apply policy is approved and tested.

## Brain Console plugin state

Completed in Brain:

- Standalone plugin exists at `brain/projects/brain-console-obsidian/`.
- Typecheck/build passed during the latest continuation.
- Manual install runbook exists in Brain:
  - `operations/runbooks/brain-console-manual-install-test.md`
- Brain Console surfaces the first-action feature flag and readiness state.

Important rules:

- Brain Console is not installed into this Mind vault by default.
- Do not copy plugin files into `mind/.obsidian/plugins/` without explicit approval.
- Do not commit local `.obsidian` plugin install state unless explicitly reviewed.

## ProBot state

Completed in Brain:

- ProBot is now a thin fallback/mobile client over Brain Core.
- `brain ...` aliases are wired into Slack DM text and Telegram message text paths.
- ProBot reads Brain Core status surfaces through GET helpers.
- ProBot surfaces Brain Core status, runtime reports, approvals, approval store, execution readiness, and the first-action flag.

## Latest validation evidence from Brain continuation

Before the latest Brain commits were pushed, BuildFlow validation passed:

```text
Brain Core CI: passed, 52 tests
Model-router CI: passed, 8 tests
Brain Console typecheck: passed
Brain Console build: passed
ProBot typecheck: passed
Secret scans on changed files/docs: no findings
```

## Matching Brain handoff

Read this matching Brain handoff before continuing implementation:

```text
brain/docs/system/brain-mind-roadmap-handoff-2026-05-17.md
brain/docs/system/brain-mind-roadmap-agent-handoff-2026-05-17.md
```

The Brain handoff contains the full roadmap implementation status, latest pushed commit list, and safety boundaries.

## Optional Mind-specific next phase

Resolve the remaining `.obsidian` plugin/config state only if the user wants a clean working tree.

Review path-by-path:

```text
.obsidian/community-plugins.json
.obsidian/plugins/custom-sort/
.obsidian/plugins/ghostty-terminal/
.obsidian/plugins/obsidian-icon-folder/
```

Do not commit plugin data/helper files blindly.

## Do not do by default

Do not:

- Install Brain Console into Mind without approval.
- Store runtime logs or reports in Mind.
- Store approval/audit logs in Mind.
- Store secrets in Mind.
- Reopen the legacy task migration without a clear request.
- Move/delete/archive additional legacy folders without a new explicit plan.
- Let model-router mutate Mind without a separately approved write/apply policy.

## First commands for next conversation

In Mind:

```bash
git status --short
git log --oneline -5
```

In Brain:

```bash
git status --short
git log --oneline -5
npm run --prefix projects/brain-core ci
npm run --prefix projects/model-router ci
```

Then read:

```text
brain/docs/system/brain-mind-roadmap-handoff-2026-05-17.md
brain/operations/specs/brain-core-first-action-feature-flag.md
brain/operations/runbooks/brain-core-approval-gates.md
brain/operations/runbooks/brain-core-first-action-incident-response.md
mind/MIND-OS-HANDOFF-2026-05-17-CONTINUATION.md
```

## Copy/paste prompt for the next conversation

```text
Please continue from the Brain and Mind handoffs. First read, in brain: docs/system/brain-mind-roadmap-handoff-2026-05-17.md, docs/system/brain-mind-roadmap-agent-handoff-2026-05-17.md, operations/specs/brain-core-first-action-feature-flag.md, operations/runbooks/brain-core-approval-gates.md, and operations/runbooks/brain-core-first-action-incident-response.md. Then read, in mind: MIND-OS-HANDOFF-2026-05-17-CONTINUATION.md, MIND-OS-ROADMAP.md, and MIND-OS-IMPLEMENTATION-PLAN.md. Verify git status in both repos. Treat the latest Brain pushed commit as 9e40c0b1. Do not stage unrelated Claude plan cleanup, Firecrawl logs, or Mind .obsidian plugin/config state unless explicitly reviewed. Continue the roadmap from the documented state, preserving the safety boundaries: no broad shell runner, no model-router writes to Mind, no runtime logs/secrets in Mind, and no plugin install into Mind without approval. Validate before committing and push only reviewed, tested changes.
```
