# Start Here — Mind Repo

This repo is Steve Westhoek's personal Obsidian vault and AI-readable memory.

Use it as the durable source of truth for Steve-specific context: strategy, convictions, ministry, business, projects, tasks, resources, research, and archived history.

## First Rule

Do not load the whole repo into an AI conversation.

Start with:

1. `AGENTS.md`
2. `00-start-here.md` — this file
3. `00-current-context.md`
4. `00-memory-map.md`

Then search/read only the relevant folders.

## Repo Roles

```text
brain = AI operating system: skills, tools, automations, configs
mind  = Steve's personal memory: knowledge, strategy, tasks, research, convictions
```

If the user asks how an AI/tool works, inspect `brain`.
If the user asks what Steve believes, plans, knows, is building, or has decided, inspect `mind`.

## Folder Structure

```text
capture/   Raw incoming captures (inbox/, daily/, failed/)
live/      Active work surfaces (tasks, projects, decisions, workflows)
wiki/      Compiled durable knowledge (organisations, areas, faith, business, etc.)
sources/   Raw evidence and research notes (research/notes/bible, apologetics, etc.)
router/    Model-router contract, rules, and maintenance definitions
archive/   Old, completed, or legacy material (archive/old/ for legacy numbered folders)
```

## Daily Human Interface

Steve usually works from:

```text
HOME.md
KANBAN.md
```

Agents should not rewrite `KANBAN.md` unless explicitly asked and should preserve automation-sensitive frontmatter in task files.

## AI Memory Interface

Agents should use:

```text
AGENTS.md
00-start-here.md
00-current-context.md
00-memory-map.md
```

Then retrieve only relevant files.

## Research Home

Research lives in:

```text
sources/research/notes/
```

Research is not the same as strategy. Research can be uncertain, exploratory, or source-heavy. Strategy is committed and canonical (lives in `wiki/organisations/`).

Use this flow:

```text
Research question
  → sources/research/notes/<category>/
Synthesis / brief
  → sources/research/notes/<category>/ or sources/research/
Committed decision
  → wiki/organisations/<org>/ or live/decisions.md
Executable action
  → live/tasks.md
```

## Core Organisation Context

Important organisation strategy lives under:

```text
wiki/organisations/prochat/
wiki/organisations/arkware/
wiki/organisations/yeshua-academy/
```

Do not duplicate canonical organisation truth into research notes. Link to it or update it only when the user asks for a committed change.

## When Unsure

Use safe defaults:

- Capture first: `capture/inbox/`
- Research/reference: `sources/research/notes/`
- Final decisions: `wiki/organisations/` or `live/decisions.md`
- Tasks: `live/tasks.md`
- Completed history: `archive/`

Ask before moving, deleting, renaming, bulk editing, or changing automation-sensitive files.

## Legacy Material

Old numbered PARA folders have been archived to:

```text
archive/old/legacy-01-inbox/
archive/old/legacy-02-strategy/
archive/old/legacy-03-projects/
archive/old/legacy-05-areas/
archive/old/legacy-06-resources/
archive/old/legacy-07-templates/
archive/old/legacy-08-archive/
```

These are read-only backups. Do not write new content there.
