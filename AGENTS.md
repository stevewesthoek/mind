# AGENTS.md — Mind Vault

Mind is Steve Westhoek's human-owned Obsidian vault and AI-readable orientation
source. It is not a code repository or a runtime system.

## Canonical startup files

Read these in order before any task:

1. `system/agent-context/AGENTS.md` — full agent contract and write rules
2. `system/agent-context/00-start-here.md` — operating model and authority rule
3. `system/agent-context/00-current-context.md` — current priorities and state
4. `system/agent-context/00-memory-map.md` — routing table for smallest-scope reads

Do not scan or load the entire vault. Use `00-memory-map.md` to identify the
relevant folders, then read only those files.

## Mind / Brain ownership boundary

```text
mind  = human meaning, strategy, decisions, approved knowledge, tasks, history
brain = AI skills, runtime execution, deployment, scheduler, schemas, automation
```

Use Mind to answer: what Steve believes, plans, has decided, knows, or is researching.
Use Brain for: how the AI system works, capability status, automation configuration.

## Smallest-scope read contract

1. Classify the request domain.
2. Consult `00-memory-map.md` for the starting location.
3. Read the minimum files needed.
4. Cite the paths you used.
5. Report missing, stale, or contradictory context rather than inferring past it.

## Privacy

Do not combine personal, business, ministry, or third-party private content
beyond what the task requires. Retrieve only the context needed.

## Canonical source authority

Canonical Markdown source files outrank generated summaries, Graphify graphs,
inbox captures, and model-produced output. When both exist, prefer the canonical
source and note if the generated view disagrees.

## Write rules

Reads and analysis do not authorize writes. Before any write:

- confirm the task explicitly names the target file and change;
- use exact, reversible, additive edits;
- do not modify `kanban.md`, `tasks.md`, task content, strategy, beliefs,
  commitments, or `system/agent-context/` files without explicit authorization;
- preserve all existing worktree changes — do not stage, reset, or overwrite
  unstaged files;
- validate via listed verification steps before committing;
- never write secrets, credentials, tokens, or private keys.

## Runtime capability

Do not infer deployment or activation from repository configuration or plans.
Brain's live-status runbook is the only authoritative source for machine
capability state:
`/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md`

Context Gateway, Codebase Memory MCP, Graphify, schedulers, and continuous
automation are not currently authorized for activation from this repository.

## Full contract

`system/agent-context/AGENTS.md` is the complete agent contract.
`system/agent-context/00-memory-map.md` is the complete routing table.
