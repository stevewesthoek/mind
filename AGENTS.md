# AGENTS.md — Mind Repo AI Entry Point

This repository is Steve Westhoek's personal Obsidian knowledge vault and AI-readable memory.

It is the source of truth for personal context, strategy, convictions, ministry context, business context, active projects, tasks, reference material, and research notes.

## Read This First

Every AI agent working with this repo must start here.

Then read, in this order:

1. `00-start-here.md` — high-level map and operating model.
2. `00-current-context.md` — current priorities and active context.
3. `00-memory-map.md` — where to search for the user's request.
4. `README.md` — full vault/automation documentation when needed.
5. `CLAUDE.md` — Claude-specific compatibility notes; also useful to other agents.

Do not scan the whole repo blindly. Use the memory map, then search/read only the relevant files.

## Core Mental Model

```text
brain = AI infrastructure, skills, system configs, automations, tools
mind  = Steve's personal knowledge, memory, strategy, convictions, projects, research
```

Use `brain` for AI capabilities and operating system work.
Use `mind` for Steve-specific context and durable knowledge.

## Non-Negotiable Safety Rules

Do not rename, move, or delete these existing PARA folders:

```text
01-inbox/
02-strategy/
03-projects/
04-tasks/
05-areas/
06-resources/
07-templates/
08-archive/
```

Do not rename or replace these root files unless explicitly asked:

```text
README.md
HOME.md
KANBAN.md
CLAUDE.md
```

Do not break existing automations:

- capture pipeline writes to `01-inbox/`
- auto-router may process inbox notes
- project-decomposer may use strategies/projects/tasks
- kanban-syncer syncs `04-tasks/` with `KANBAN.md`
- Obsidian uses this repo as a vault

Never commit secrets, OAuth tokens, API keys, cookies, private keys, service account files, `.env` values, or credentials.

## How To Use This Repo As AI Memory

When the user asks a personal, strategic, business, theological, ministry, or historical question, treat `mind` as the source of truth.

Do this:

1. Read `00-memory-map.md`.
2. Identify the likely folder.
3. Search that folder first.
4. Read only relevant files.
5. Answer from found context.
6. If context is missing, say what was searched and what was not found.
7. Offer to save durable output back into the correct folder.

Do not do this:

- Do not claim to know Steve's context without checking `mind`.
- Do not load the whole repo into context.
- Do not duplicate canonical strategy into random folders.
- Do not put tasks outside `04-tasks/`.
- Do not put research conclusions directly into `02-strategy/` unless they are committed decisions.

## Where New Information Goes

Use these defaults:

| Information type | Default location |
|---|---|
| Raw capture, unsorted idea | `01-inbox/` |
| Final strategy, positioning, decision, conviction applied to an organisation | `02-strategy/` |
| Active project with outcome/deadline | `03-projects/` |
| Atomic executable task | `04-tasks/` |
| Long-term responsibility | `05-areas/` |
| Research, notes, references, source material | `06-resources/` |
| Reusable template | `07-templates/` |
| Completed or historical material | `08-archive/` |

## Research Rules

Research belongs under:

```text
06-resources/research/
```

Use research folders for investigation, source notes, drafts, Bible studies, marketing research, business research, AI research, book notes, and evidence gathering.

Use `02-strategy/` only when research becomes a committed strategy, ministry conviction, business decision, messaging decision, or canonical organisational truth.

## Bible / Theology Rules

Bible and theology research usually belongs under:

```text
06-resources/research/notes/bible/
06-resources/research/notes/theology/
06-resources/research/notes/apologetics/
```

Canonical Yeshua Academy ministry truth belongs under:

```text
02-strategy/organisations/yeshua-academy/
```

Do not overwrite Yeshua Academy canonical files with raw research. Research should feed strategy after review.

## Business / Marketing Rules

Marketing and business research usually belongs under:

```text
06-resources/research/notes/marketing/
06-resources/research/notes/business/
```

Canonical ProChat or Arkware strategy belongs under:

```text
02-strategy/organisations/prochat/
02-strategy/organisations/arkware/
```

## Natural Language Workflow

The user should be able to speak naturally. When they say things like:

- "remember this"
- "save this to mind"
- "research this"
- "what do I believe about this?"
- "what is our strategy for this?"
- "turn this into a task"
- "prepare this for Yeshua Academy"

route automatically using this file plus `00-memory-map.md`.

When uncertain, prefer a safe draft in `01-inbox/` or `06-resources/research/inbox/` rather than corrupting strategy, tasks, or projects.

## Write Policy For Agents

Prefer additive changes:

- create new notes
- append clearly marked sections
- patch small exact text when requested

Avoid destructive changes unless explicitly confirmed:

- moving files
- deleting files
- renaming folders
- bulk edits
- changing automation-sensitive frontmatter
- rewriting `KANBAN.md`

## Definition Of A Good AI Session

A good session:

1. Starts from this entry point.
2. Reads current context and memory map.
3. Retrieves only relevant notes.
4. Produces a useful answer or artifact.
5. Saves durable output in the right place when asked.
6. Does not break PARA, Obsidian, Git, or automation assumptions.

## Related Files

- `00-start-here.md` — concise human/AI orientation.
- `00-current-context.md` — current priorities and active focus.
- `00-memory-map.md` — routing map for context retrieval.
- `06-resources/research/README.md` — research system and categories.
- `README.md` — full vault documentation.
- `CLAUDE.md` — existing Claude Code notes.
