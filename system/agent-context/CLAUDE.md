# CLAUDE.md — Mind Vault

For complete system documentation, see `system/agent-context/README.md`.

## Required AI Startup Protocol

For every new Claude Code session, start with:

1. `system/agent-context/AGENTS.md`
2. `system/agent-context/00-start-here.md`
3. `system/agent-context/00-current-context.md`
4. `system/agent-context/00-memory-map.md`
5. `system/agent-context/README.md` only when full vault/automation details are needed

Do not load the whole vault. Use `system/agent-context/00-memory-map.md`, then search/read only relevant files.

## Structure

```text
capture/   Save-to-Mind captures and failure buffer
live/      Active tasks, projects, decisions, workflows
wiki/      Compiled durable knowledge
sources/   Research, references, and evidence
archive/   Completed or inactive material
system/agent-context/    AI and Mind Steward contract files
```

## Integration Notes

- Capture: n8n writes to GitHub `capture/inbox/`.
- Sync: the nightly scheduler copies missing inbox captures to this computer.
- Classification: Mind Steward uses the AI Model Selector with `local_only: true` during the nightly local run.
- Kanban: `kanban.md` is the working board.
- Runtime reports: Brain-owned; do not store runtime JSON in Mind.
