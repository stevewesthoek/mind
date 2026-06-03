# Current Context

This file is the short-term context surface for Mind Steward. Keep it compact and current.

## Active Direction

- Obsidian is the human cockpit.
- `mind` stores human memory, live work, sources, and archive.
- `brain` stores executable infrastructure, Brain Core, scheduler jobs, and the Mind Steward implementation.
- Save-to-Mind writes captures immediately to GitHub `capture/inbox/`.
- The nightly local scheduler syncs missing inbox captures to this computer.
- Mind Steward classifies captures locally through the AI Model Selector with `local_only: true` during the nightly local run.
- Brain Core runtime reports remain read-only and Brain-owned; do not copy them into `mind`.

## Guardrails

- Do not store secrets in this vault.
- Do not duplicate machine runtime state here; link to Brain Core surfaces instead.
- Keep this file under 150 lines.
