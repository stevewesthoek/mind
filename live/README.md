# Live

Current-state and fallback dashboard surfaces for Mind live here.

## Purpose

Use this folder for compact, human-readable views of current context, decisions, task summaries, business state, and workflow visibility.

The primary machine/runtime cockpit is Brain Console. The files in `live/` are Markdown fallback and review surfaces, not the source of every runtime fact.

## Important files

- `dashboard.md` — fallback navigation and Brain Console reference.
- `tasks.md` — Mind Steward task summary surface.
- `decisions.md` — current committed decisions that guide future work.
- `business.md` — sparse business operating surface.
- `aws-video-pipeline.md` — AWS Video pipeline visibility or notes.
- `fala.md` — Fala language-learning cockpit surface.

## Task boundary

`kanban.md` is the current daily task board and task source of truth.

`live/tasks.md` may summarize current attention or Mind Steward suggestions, but it must not be treated as the complete task database.

See `system/task-kanban-contract.md` for the current no-data-loss task/Kanban boundary.

## Rules

- Keep live files compact and current.
- Do not store raw captures here; use `capture/inbox/`.
- Do not duplicate Brain Core runtime state manually when Brain Console already exposes it.
- Record durable knowledge in `wiki/` or source material in `sources/` instead of bloating live surfaces.
