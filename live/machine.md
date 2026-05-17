---
type: dashboard
status: scaffold
---

# Machine

This page is the Obsidian-facing entry point for local machine state.

Brain Core owns the live runtime data. This note should stay sparse and should not duplicate logs, secrets, raw process dumps, or scheduler state.

## Local Brain Core

Default local endpoint:

```text
http://127.0.0.1:4877/status
```

Initial read-only endpoints:

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
```

Current `/sessions` behavior:

- read-only recursive discovery from configured safe session directories
- age labels
- intent labels
- simple recency/intent ranking
- placeholder fallback when no readable session directory is configured

Current `/repos` behavior:

- reads configured repo aliases
- reports whether repos exist
- reports whether known handoff files exist
- does not copy handoff contents, logs, or runtime state into this note

Current `/orchestrators` and `/capabilities` behavior:

- `/orchestrators` lists placeholder orchestrator surfaces such as Video Orchestrator, Mind Model Router, and Office Nightly Scheduler
- `/capabilities` lists read endpoints and approval-request endpoints
- capability manifest reports `executableActionsEnabled: false`

Current scheduler behavior:

- `/scheduler/status`, `/scheduler/latest-run`, and `/scheduler/jobs` are read-only
- returns placeholder state until Brain Core finds `runtime/local/model-router/latest.json` or a configured safe report path
- exposes model-router dry-run report status when the report exists
- does not inspect logs
- does not run scheduler jobs
- does not mutate scheduler state

Current local-app/video/approval behavior:

- `/local-apps` is a placeholder local service list
- `/video/status` and `/video/queue` are placeholder Video Orchestrator surfaces
- `/approvals` reads the current in-memory approval request surface or a placeholder
- `POST /actions/request?kind=<safe-action-kind>` creates an approval record only
- `POST /scheduler/jobs/:id/request-run`, `POST /skills/profile`, `POST /sessions/:id/resume`, and `POST /local-apps/:id/start|stop|restart` create approval requests only
- `POST /approvals/:id/approve` and `POST /approvals/:id/reject` update approval status only
- approval endpoints return `executed: false` and do not run actions yet

## Current status

- Brain Core Phase 1 scaffold exists in `brain/projects/brain-core/`.
- Phase 1 is read-only.
- `/sessions` and `/skills` start as placeholders until clean adapters are migrated from ProBot backend logic.
- Mutation endpoints are intentionally not implemented yet.

## Brain Console integration

The future Obsidian `brain-console` plugin or integration layer should render Brain Core data using read-only widget contracts from `brain/projects/brain-core/src/obsidian.ts`.

Initial widget surfaces:

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

This page remains readable even when Brain Core is offline.

## Safety rules

- Do not store secrets in this note.
- Do not paste runtime logs here.
- Do not use this note as a database.
- Link to live Brain Core/adapter output instead of duplicating runtime truth.
- Keep ProBot dashboard frozen as a product UI; use it only as a fallback during migration.

## Next Brain Core work

- Replace placeholder sessions adapter with clean session discovery.
- Replace placeholder skills adapter with a real skills index reader.
- Add tests before adding actions.
- Add approval-aware mutation endpoints only after read-only status is reliable.
