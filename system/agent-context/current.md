# Current Context

This file is the short-term context surface for Mind Steward. Keep it compact and current.

## Active Direction

- Obsidian is the human cockpit.
- `mind` stores human memory, live work, sources, and archive.
- `brain` stores executable infrastructure, Brain Core, scheduler jobs, and the Mind Steward implementation.
- Save-to-Mind writes captures immediately to GitHub `inbox/new/`.
- `inbox/failed/` is the failed-processing target; verify external failure routing against `system/folder-contract.md` before moving or writing failed captures.
- A nightly local scheduler and local classification flow are documented targets; deployed and observed state remain unknown until Brain evidence verifies them.
- Brain Core runtime reports remain read-only and Brain-owned; do not copy them into `mind`.

## Guardrails

- Do not store secrets in this vault.
- Do not duplicate machine runtime state here; link to Brain Core surfaces instead.
- Keep this file under 150 lines.
