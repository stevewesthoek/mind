# Current Context

Status: initial Mind OS migration scaffold.

This file is the short-term context surface for the model router. Keep it compact and current.

## Active direction

- Obsidian is the human cockpit.
- `mind` stores human memory, live work, sources, and archive.
- `brain` stores executable infrastructure, Brain Core, scheduler jobs, and the model-router implementation.
- New captures should eventually land in `capture/inbox/` after Save-to-Mind is updated and validated.
- Brain Core runtime reports remain read-only and Brain-owned; do not copy them into `mind`.

## Migration guardrails

- Do not delete or move legacy numbered folders until validation is complete.
- Do not store secrets in this vault.
- Do not duplicate machine runtime state here; link to Brain Core surfaces instead.
- Keep this file under 150 lines.
