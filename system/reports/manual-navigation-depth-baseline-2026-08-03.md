# Manual Navigation Depth Baseline — 2026-08-03

**Status:** complete
**Milestone:** M7.4 follow-up baseline
**Scope:** ten representative repository-only navigation questions
**Method:** follow the current agent entrypoints and memory-map routing without Graphify, Context Gateway, embeddings, a model provider, or a broad vault scan

## Measurement rule

A transition is one followed link or explicit path handoff from a loaded Mind entrypoint to an index, contract, or canonical source. The entrypoint itself is transition zero. Compatibility-authoritative ProChat sources count as canonical within their documented scope.

## Samples

| # | Representative question | Domain | Route | Transitions | Result |
|---:|---|---|---|---:|---|
| 1 | What are the current Mind priorities? | current context | `system/agent-context/00-start-here.md` → `system/agent-context/00-current-context.md` | 1 | canonical current-context source reached |
| 2 | Where are current personal decisions recorded? | personal knowledge | `system/agent-context/00-memory-map.md` → `knowledge/README.md` → `knowledge/decisions.md` | 2 | canonical durable-knowledge source reached |
| 3 | What is the current ProChat product roadmap? | organization | `system/agent-context/00-memory-map.md` → `organizations/prochat/README.md` → `wiki/organisations/prochat/brand/README.md` → `wiki/organisations/prochat/brand/product-roadmap.md` | 3 | scoped compatibility-authoritative strategy source reached |
| 4 | What is Yeshua Academy's mission? | organization/ministry | `system/agent-context/00-memory-map.md` → `organizations/README.md` → `organizations/yeshua-academy/overview.md` | 2 | canonical organization source reached |
| 5 | Where is the ProChat QA Memory project strategy? | project | `system/agent-context/00-memory-map.md` → `projects/README.md` → `projects/prochat-qa-memory/STRATEGY-PLAN.md` | 2 | active project source reached |
| 6 | Where should repository-specific human context live? | repository | `system/agent-context/00-memory-map.md` → `repos/README.md` | 1 | canonical repository-context policy reached |
| 7 | Where are reviewed apologetics notes routed? | faith | `system/agent-context/00-memory-map.md` → `faith/README.md` → `faith/apologetics/README.md` | 2 | canonical faith-domain source reached |
| 8 | Where should working business research be found? | research | `system/agent-context/00-memory-map.md` → `resources/README.md` → `resources/research/README.md` → `resources/research/business/README.md` | 3 | canonical research index reached |
| 9 | What is the current task authority? | tasks | `system/agent-context/AGENTS.md` → `system/task-kanban-contract.md` → `kanban.md` | 2 | authoritative task surface reached |
| 10 | Where is current AI capability state verified? | AI-system boundary | `system/agent-context/00-memory-map.md` → `/Users/Office/Repos/stevewesthoek/brain/operations/runbooks/infinite-brain-roadmap-status.md` | 1 | canonical external live-status authority reached |

## Result

- Samples: 10
- Median transitions: 2
- Maximum transitions: 3
- Budget: at most 3 transitions
- Verdict: PASS

This result establishes the previously provisional manual-navigation baseline. It proves only repository navigation depth; it does not prove retrieval correctness, Context Gateway deployment, Graphify freshness, or end-to-end time savings.
