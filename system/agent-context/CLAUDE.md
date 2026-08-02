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
inbox/                 Capture, processing, and failure lifecycle
organizations/         Businesses, ministries, and long-lived entities
projects/              Active outcomes and deliverables
repos/                 Human-readable repository context
people/                People and relationships
faith/                 Bible, theology, apologetics, and ministry
knowledge/             Durable non-faith knowledge
resources/             Research, references, and evidence
history/               Completed, superseded, or inactive material
system/agent-context/  AI and Mind Steward contract files
```

## Integration Notes

- Capture: n8n writes to GitHub `inbox/new/`.
- Failed processing targets `inbox/failed/`; verify external failure routing against `system/folder-contract.md` before failed writes or moves.
- Sync and classification are documented target flows; scheduler deployment, observation, and capability verification remain unknown unless Brain evidence proves them.
- Kanban: `kanban.md` is the working board.
- Runtime reports: Brain-owned; do not store runtime JSON in Mind.
