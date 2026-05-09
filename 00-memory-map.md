# Memory Map — Where AI Should Look

This file tells AI agents where to retrieve context without loading the whole vault.

Use this before answering Steve-specific questions.

## Default Retrieval Protocol

1. Classify the user's request.
2. Check the routing table below.
3. Search the smallest relevant folder first.
4. Read the most relevant files.
5. State when context was not found.
6. Save durable output only in the correct PARA location.

## High-Level Routing

| User asks about | Search first | Then search |
|---|---|---|
| Current priorities | `00-current-context.md`, `HOME.md`, `KANBAN.md` | `04-tasks/`, `03-projects/` |
| How the vault works | `AGENTS.md`, `00-start-here.md`, `README.md` | `CLAUDE.md` |
| Strategy or decisions | `02-strategy/` | `06-resources/`, `08-archive/` |
| Active projects | `03-projects/` | `04-tasks/`, `02-strategy/` |
| Tasks or execution | `04-tasks/`, `KANBAN.md` | `03-projects/` |
| Long-term responsibilities | `05-areas/` | `02-strategy/`, `06-resources/` |
| Research or references | `06-resources/research/` | `06-resources/`, `01-inbox/` |
| Old/completed work | `08-archive/` | relevant original folder |
| Raw captures | `01-inbox/` | `08-archive/` |
| Templates | `07-templates/` | existing files of same type |

## Organisation Routing

| User asks about | Search first |
|---|---|
| ProChat | `02-strategy/organisations/prochat/` |
| ProChat brand/messaging | `02-strategy/organisations/prochat/brand/` |
| ProChat growth/marketing | `02-strategy/organisations/prochat/growth/`, then `06-resources/research/notes/marketing/` |
| ProChat YouTube/content | `02-strategy/organisations/prochat/youtube/` |
| ProChat legal | `02-strategy/organisations/prochat/legal/` |
| Arkware | `02-strategy/organisations/arkware/` |
| Yeshua Academy | `02-strategy/organisations/yeshua-academy/` |
| Organisation ecosystem | `02-strategy/organisations/ecosystem.md` |
| Organisation conventions | `02-strategy/organisations/conventions.md` |

## Research Routing

Research belongs under:

```text
06-resources/research/
```

| User asks about | Search/create under |
|---|---|
| Bible passage study | `06-resources/research/notes/bible/passages/` |
| Bible topic | `06-resources/research/notes/bible/topics/` |
| Bible word study | `06-resources/research/notes/bible/word-studies/` |
| Theological question | `06-resources/research/notes/bible/theological-questions/` or `06-resources/research/notes/theology/` |
| Comparative theological views | `06-resources/research/notes/bible/comparative-views/` |
| Apologetics | `06-resources/research/notes/apologetics/` |
| Marketing research | `06-resources/research/notes/marketing/` |
| Business research | `06-resources/research/notes/business/` |
| AI research | `06-resources/research/notes/ai/` |
| Book notes | `06-resources/research/notes/books/` |
| Person research | `06-resources/research/notes/people/` |
| Organisation research | `06-resources/research/notes/organisations/` |
| Source files | `06-resources/research/sources/` |
| Research briefs | `06-resources/research/briefs/` |
| Research reports | `06-resources/research/reports/` |
| Bibliographies | `06-resources/research/bibliographies/` |

## Bible / Theology Routing

Use both strategy and research, but do not mix them up.

| Need | Location |
|---|---|
| Canonical Yeshua Academy ministry truth | `02-strategy/organisations/yeshua-academy/` |
| Ongoing theological responsibility area | `05-areas/theological-studies/` |
| Bible research notes | `06-resources/research/notes/bible/` |
| Theology research notes | `06-resources/research/notes/theology/` |
| Apologetics research notes | `06-resources/research/notes/apologetics/` |
| Sermon or Bible-study drafts | `06-resources/research/notes/bible/` unless promoted to a project |

Rule:

```text
Research informs strategy.
Strategy records committed decisions.
```

Do not overwrite strategy with raw research.

## Business / Marketing Routing

| Need | Location |
|---|---|
| Marketing research | `06-resources/research/notes/marketing/` |
| Business research | `06-resources/research/notes/business/` |
| Brand truth | `02-strategy/organisations/<org>/brand/` |
| Growth playbooks | `02-strategy/organisations/<org>/growth/` |
| Offers | `02-strategy/organisations/<org>/offers.md` or brand/offer files |
| Active campaign/project | `03-projects/` |
| Atomic task | `04-tasks/` |

## Natural Language Save Rules

| User says | Save default |
|---|---|
| "remember this" | `01-inbox/` if unsorted; otherwise relevant folder |
| "save this as research" | `06-resources/research/inbox/` or relevant research category |
| "this is a decision" | `02-strategy/` |
| "make a task" | `04-tasks/` |
| "make a project" | `03-projects/` |
| "this is reference" | `06-resources/` |
| "archive this" | ask before moving to `08-archive/` |

## Write Safety

Prefer creating new notes over modifying canonical files.

Patch canonical files only when the user clearly asks to update a decision, strategy, positioning, messaging, or source of truth.

Ask before:

- moving files
- deleting files
- renaming files/folders
- editing `KANBAN.md`
- bulk-changing task frontmatter
- changing folder names
- changing automation assumptions

## Context Quality Rules

When answering from `mind`, say what you checked if it matters.

If search finds nothing, say:

```text
I checked [folder/path/query] and did not find a canonical note yet.
```

Then recommend a safe save location.

## Good AI Behavior Examples

### Example: "What is my ProChat positioning?"

Search:

```text
02-strategy/organisations/prochat/brand/
```

Then answer from the most relevant files.

### Example: "Research baptism views"

Use:

```text
06-resources/research/notes/bible/comparative-views/
```

If saving, create a research note there. Do not alter Yeshua Academy strategy unless asked.

### Example: "Make this a task"

Create a new task file in:

```text
04-tasks/
```

Use task frontmatter compatible with existing templates.

### Example: "What should we teach at Yeshua Academy?"

Search:

```text
02-strategy/organisations/yeshua-academy/
06-resources/research/notes/bible/
06-resources/research/notes/theology/
```

Separate existing canonical truth from new research or recommendations.
