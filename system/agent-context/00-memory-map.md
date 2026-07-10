# Memory Map — Mind Retrieval Router

Use the smallest relevant area first.

## Default protocol

1. Classify the request.
2. Search the first location in the table.
3. Read the most relevant current pages.
4. Expand to evidence or history only when needed.
5. Report missing, stale, or contradictory context.

## Routing table

| Request | Search first | Then search |
|---|---|---|
| Current priorities and commitments | `00-current-context.md`, `home.md`, task authority | `projects/`, `organizations/` |
| How Mind works | `AGENTS.md`, `00-start-here.md`, `system/` | Brain canonical docs |
| ProChat | `organizations/prochat/` | `projects/`, `resources/research/` |
| Arkware | `organizations/arkware/` | `projects/`, `resources/research/` |
| Yeshua Academy | `organizations/yeshua-academy/` | `faith/`, `projects/`, `resources/` |
| Business strategy or decisions | relevant `organizations/` page | `knowledge/`, `resources/research/business/` |
| Brand, growth, or marketing | relevant organization | `resources/research/marketing/` |
| Active project | `projects/` | related organization, repo, people, resources |
| Code repo or app context | `repos/` | relevant project and Brain repo |
| Person or relationship | `people/` | related organization/project/resource |
| Personal durable knowledge | `knowledge/` | `resources/`, `history/` |
| Bible/theology/apologetics/ministry | `faith/` | `faith/resources/`, relevant organization |
| Research/source evidence | `resources/` or `faith/resources/` | domain page that cites it |
| Raw/unreviewed capture | `inbox/new/` | `inbox/raw/`, `inbox/processed/` |
| Generated proposal or receipt | `inbox/processed/` | cited source and target pages |
| Failed processing | verified current failure surface | Brain runtime status/report |
| Completed or superseded work | `history/` | Git history if needed |
| AI behavior, skills, tools, configs | Brain repo | Brain memory map and runbooks |

## Authority order

Use as a starting point:

1. recent explicit human decision;
2. current canonical page;
3. cited primary evidence;
4. reviewed synthesis;
5. unreviewed capture or inference;
6. generated graph, index, or summary.

Recency does not automatically override authority. Show unresolved conflicts.

## Privacy

Retrieve only the context needed for the task. Do not combine personal, business, ministry, or third-party private content merely because it is available.

## Save routing

Only when a write is explicitly requested:

| Information | Default destination |
|---|---|
| Unclassified capture | `inbox/new/` |
| Raw/source material | `inbox/raw/` or `resources/` |
| Generated proposal/receipt | `inbox/processed/` |
| Durable approved non-faith knowledge | `knowledge/` |
| Approved faith knowledge/source | `faith/` |
| Organization truth | `organizations/<name>/` |
| Active project state | `projects/<name>/` |
| Repo-specific human context | `repos/<name>/` |
| Person context | `people/` |
| Completed/superseded history | `history/` after approval |

Task writes follow `system/task-kanban-contract.md`.
