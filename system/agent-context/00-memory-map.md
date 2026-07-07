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
| Research or references | `sources/research/` | `sources/` |
| Old/completed work | `archive/` | `archive/old/` |
| Raw captures | `capture/inbox/` | `capture/failed/` |
| Templates | `wiki/templates/` | existing files of same type |
| Router/automation rules | `system/agent-context/` | `AGENTS.md` |

## Organisation Routing

| User asks about | Search first |
|---|---|
| ProChat | `wiki/organisations/prochat/` |
| ProChat brand/messaging | `wiki/organisations/prochat/brand/` |
| ProChat growth/marketing | `wiki/organisations/prochat/growth/`, then `sources/research/marketing/` |
| ProChat YouTube/content | `wiki/organisations/prochat/youtube/` |
| ProChat legal | `wiki/organisations/prochat/legal/` |
| Arkware | `wiki/organisations/arkware/` |
| Yeshua Academy | `wiki/organisations/yeshua-academy/` |
| Organisation ecosystem | `wiki/organisations/ecosystem.md` |
| Organisation conventions | `wiki/organisations/conventions.md` |

## Research Routing

Research belongs under:

```text
sources/research/
```

| User asks about | Search/create under |
|---|---|
| Bible passage study | `sources/research/bible/passages/` |
| Bible topic | `sources/research/bible/topics/` |
| Bible word study | `sources/research/bible/word-studies/` |
| Theological question | `sources/research/bible/theological-questions/` or `sources/research/theology/` |
| Comparative theological views | `sources/research/bible/comparative-views/` |
| Apologetics | `sources/research/apologetics/` |
| Steve's apologetics voice/debate style | `sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md` |
| Marketing research | `sources/research/marketing/` |
| Business research | `sources/research/business/` |
| AI research | `sources/research/ai/` |
| Book notes | `sources/research/books/` |
| Person research | `sources/research/people/` |
| Organisation research | `sources/research/organisations/` |
| Source files | `sources/` |

## Bible / Theology Routing

Use both wiki and sources, but do not mix them up.

| Need | Location |
|---|---|
| Canonical Yeshua Academy ministry truth | `wiki/organisations/yeshua-academy/` |
| Ongoing theological responsibility area | `wiki/areas/theological-studies/` |
| Bible research notes | `sources/research/bible/` |
| Theology research notes | `sources/research/theology/` |
| Apologetics research notes | `sources/research/apologetics/` |
| Sermon or Bible-study drafts | `sources/research/bible/` unless promoted to a project |

Rule:

```text
Research informs strategy.
Strategy records committed decisions.
```

Do not overwrite strategy with raw research.

## Business / Marketing Routing

| Need | Location |
|---|---|
| Marketing research | `sources/research/marketing/` |
| Business research | `sources/research/business/` |
| Brand truth | `wiki/organisations/<org>/brand/` |
| Growth playbooks | `wiki/organisations/<org>/growth/` |
| Offers | `wiki/organisations/<org>/offers.md` or brand/offer files |
| Active campaign/project | `live/projects.md` |
| Atomic task | `live/tasks.md` |

## Natural Language Save Rules

| User says | Save default |
|---|---|
| "remember this" | `capture/inbox/` if unsorted; otherwise relevant folder |
| "save this as research" | `sources/research/` or relevant research category |
| "this is a decision" | `live/decisions.md` or `wiki/organisations/<org>/` |
| "make a task" | `live/tasks.md` |
| "make a project" | `live/projects.md` |
| "this is reference" | `sources/` |
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
sources/research/bible/comparative-views/
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
wiki/organisations/yeshua-academy/
sources/research/bible/
sources/research/theology/
```

Separate existing canonical truth from new research or recommendations.
