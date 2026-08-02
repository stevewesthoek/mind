# CLAUDE.md — Mind Vault

Mind is Steve Westhoek's human-owned knowledge vault. It provides orientation
and human authority. Brain (`/Users/Office/Repos/stevewesthoek/brain`) provides
AI capability and runtime execution.

## Required startup order

For every new session, read these files in order before doing anything else:

1. `system/agent-context/AGENTS.md`
2. `system/agent-context/00-start-here.md`
3. `system/agent-context/00-current-context.md`
4. `system/agent-context/00-memory-map.md`

Do not load the whole vault. After the startup files, read only the sections
relevant to the task using `00-memory-map.md` as the routing guide.

## Retrieval rules

- Use targeted reads; cite the source path in every answer that draws on Mind content.
- Prefer current canonical pages over captures, generated summaries, and graph output.
- `00-memory-map.md` routes you to the smallest relevant area — always consult it first.
- Do not treat generated reports, Graphify graphs, or inbox captures as approved truth.

## Ownership boundary

- **Mind owns:** beliefs, decisions, strategy, approved knowledge, tasks, and human authority.
- **Brain owns:** runtime capability, scheduler state, deployment status, and machine execution.

Do not infer that a capability is deployed or active from repository configuration or plans.
For current machine capability state, consult Brain's live-status runbook:
`/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md`

## Write restrictions

Reading and analysis do not authorize writes.

- Do not modify `kanban.md`, `tasks.md`, or `system/agent-context/` files without
  explicit task authorization.
- Do not activate MCP servers, Graphify, schedulers, or continuous automation.
- Do not create `.mcp.json` or automation configuration files.
- Broad vault rewrites require explicit per-file authorization.

## Full documentation

`system/agent-context/README.md` — complete vault contracts and automation policy.
`system/mind-roadmap.md` — strategic priority order.
`system/brain-mind-bridge.md` — typed exchange contract.
