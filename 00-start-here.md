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

## PARA Structure

Do not rename or restructure these folders.

```text
01-inbox/     Raw captures and unsorted material
02-strategy/  Committed strategy, decisions, positioning, convictions-in-use
03-projects/  Active work with outcomes/timelines
04-tasks/     Atomic executable tasks; syncs with KANBAN.md
05-areas/     Ongoing responsibilities
06-resources/ Reference material, research, notes, source material
07-templates/ Reusable note templates
08-archive/   Completed or historical material
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
06-resources/research/
```

Research is not the same as strategy. Research can be uncertain, exploratory, or source-heavy. Strategy is committed and canonical.

Use this flow:

```text
Research question
  → 06-resources/research/
Synthesis / brief
  → 06-resources/research/briefs/ or reports/
Committed decision
  → 02-strategy/
Executable action
  → 04-tasks/
```

## Core Organisation Context

Important organisation strategy currently lives under:

```text
02-strategy/organisations/prochat/
02-strategy/organisations/arkware/
02-strategy/organisations/yeshua-academy/
```

Do not duplicate canonical organisation truth into research notes. Link to it or update it only when the user asks for a committed change.

## When Unsure

Use safe defaults:

- Capture first: `01-inbox/`
- Research/reference: `06-resources/research/`
- Final decisions: `02-strategy/`
- Tasks: `04-tasks/`
- Completed history: `08-archive/`

Ask before moving, deleting, renaming, bulk editing, or changing automation-sensitive files.
