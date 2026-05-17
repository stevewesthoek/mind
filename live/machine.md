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

## Current status

- Brain Core Phase 1 scaffold exists in `brain/projects/brain-core/`.
- Phase 1 is read-only.
- `/sessions` and `/skills` start as placeholders until clean adapters are migrated from ProBot backend logic.
- Mutation endpoints are intentionally not implemented yet.

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
