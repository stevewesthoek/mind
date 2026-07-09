# Memory Map — Where AI Should Look

This file tells AI agents where to retrieve context without loading the whole vault.

Use this before answering Steve-specific questions.

## Default Retrieval Protocol

1. Classify the user's request.
2. Check the routing table below.
3. Search the smallest relevant folder first.
4. Read the most relevant files.
5. State when context was not found.
6. Save durable output only in the correct location.

## High-Level Routing

| User asks about | Search first | Then search |
|---|---|---|
| Current priorities | `00-current-context.md`, `home.md`, `kanban.md` | `live/tasks.md`, `live/projects.md` |
| How the vault works | `AGENTS.md`, `00-start-here.md`, `README.md` | `CLAUDE.md` |
| Strategy or decisions | `wiki/organisations/`, `live/decisions.md` | `archive/` |
| Active projects | `live/projects.md` | `live/tasks.md` |
| Tasks or execution | `live/tasks.md`, `kanban.md` | `live/projects.md` |
| Long-term responsibilities | `wiki/areas/` | `wiki/` |
| Research or references | `resources/research/` | `resources/` |
| Old/completed work | `archive/` | `archive/old/` |
| Raw captures | `capture/inbox/` | `capture/failed/` |
| Templates | `system/templates/` | existing files of same type |
| Router/automation rules | `system/agent-context/` | `AGENTS.md` |

## Organisation Routing

| User asks about | Search first |
|---|---|
| ProChat | `organizations/prochat/`, then `wiki/organisations/prochat/` |
| ProChat brand/messaging | `wiki/organisations/prochat/brand/` |
| ProChat growth/marketing | `organizations/prochat/growth/`, then `resources/research/marketing/` |
| ProChat YouTube/content | `wiki/organisations/prochat/youtube/` |
| ProChat legal | `organizations/prochat/legal/` |
| Arkware | `organizations/arkware/` |
| Yeshua Academy | `organizations/yeshua-academy/` |
| Organisation ecosystem | `organizations/ecosystem.md` |
| Organisation conventions | `organizations/conventions.md` |

## Research Routing

Research belongs under:

```text
resources/research/
```

| User asks about | Search/create under |
|---|---|
| Bible passage study | `faith/resources/bible/passages/` |
| Bible topic | `faith/resources/bible/topics/` |
| Bible word study | `faith/resources/bible/word-studies/` |
| Theological question | `faith/resources/bible/theological-questions/` or `faith/resources/theology/` |
| Comparative theological views | `faith/resources/bible/comparative-views/` |
| Apologetics | `faith/resources/apologetics/` |
| Steve's apologetics voice/debate style | `faith/resources/apologetics/steve-apologetics-voice-and-debate-standard.md` |
| Marketing research | `resources/research/marketing/` |
| Business research | `resources/research/business/` |
| AI research | `resources/research/ai/` |
| Book notes | `resources/research/books/` |
| Person research | `resources/research/people/` |
| Organisation research | `resources/research/organisations/` |
| Source files | `resources/` |

## Bible / Theology Routing

Use both wiki and sources, but do not mix them up.

| Need | Location |
|---|---|
| Canonical Yeshua Academy ministry truth | `organizations/yeshua-academy/` |
| Dance of Life theological source library | `faith/resources/dance-of-life/` |
| Bible research notes | `faith/resources/bible/` |
| Theology research notes | `faith/resources/theology/` |
| Apologetics research notes | `faith/resources/apologetics/` |
| Sermon or Bible-study drafts | `faith/resources/bible/` unless promoted to a project |

Rule:

```text
Research informs strategy.
Strategy records committed decisions.
```

Do not overwrite strategy with raw research.

## Business / Marketing Routing

| Need | Location |
|---|---|
| Marketing research | `resources/research/marketing/` |
| Business research | `resources/research/business/` |
| Brand truth | `wiki/organisations/<org>/brand/` |
| Growth playbooks | `organizations/<org>/growth/` or `wiki/organisations/<org>/growth/` if not migrated |
| Offers | `wiki/organisations/<org>/offers.md` or brand/offer files |
| Active campaign/project | `live/projects.md` |
| Atomic task | `live/tasks.md` |

## Natural Language Save Rules

| User says | Save default |
|---|---|
| "remember this" | `capture/inbox/` if unsorted; otherwise relevant folder |
| "save this as research" | `resources/research/` or relevant research category |
| "this is a decision" | `live/decisions.md` or `wiki/organisations/<org>/` |
| "make a task" | `live/tasks.md` |
| "make a project" | `live/projects.md` |
| "this is reference" | `resources/` |
| "archive this" | ask before moving to `archive/` |

## Write Safety

Prefer creating new notes over modifying canonical files.

Patch canonical files only when the user clearly asks to update a decision, strategy, positioning, messaging, or source of truth.

Ask before:

- moving files
- deleting files
- renaming files/folders
- editing `kanban.md`
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
wiki/organisations/prochat/brand/
```

Then answer from the most relevant files.

### Example: "Research baptism views"

Use:

```text
faith/resources/bible/comparative-views/
```

If saving, create a research note there. Do not alter Yeshua Academy strategy unless asked.

### Example: "Make this a task"

Add to:

```text
live/tasks.md
```

### Example: "What should we teach at Yeshua Academy?"

Search:

```text
organizations/yeshua-academy/
faith/resources/bible/
faith/resources/theology/
```

Separate existing canonical truth from new research or recommendations.
