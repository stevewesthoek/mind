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
router/    Mind Steward contract, rules, and maintenance definitions
archive/   Completed or inactive material
brain/     AI-system project context lives in the Brain repo, including the video orchestrator
```

## Daily Human Interface

Steve usually works from:

```text
home.md
kanban.md
```

Agents should not rewrite `kanban.md` unless explicitly asked and should preserve automation-sensitive frontmatter in task files.

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
sources/research/
```

The cloud video orchestrator implementation and release docs have moved to:

```text
/Users/Office/Repos/stevewesthoek/brain/projects/video-orchestrator/
```

Research is not the same as strategy. Research can be uncertain, exploratory, or source-heavy. Strategy is committed and canonical (lives in `wiki/organisations/`).

Use this flow:

```text
Research question
  → sources/research/<category>/
Synthesis / brief
  → sources/research/<category>/ or sources/research/
Committed decision
  → wiki/organisations/<org>/ or live/decisions.md
Executable action
  → kanban.md
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
- Research/reference: `sources/research/`
- Final decisions: `wiki/organisations/` or `live/decisions.md`
- Tasks: `kanban.md`
- Completed history: `archive/`

Ask before moving, deleting, renaming, bulk editing, or changing automation-sensitive files.

## Archive

Archived reference material is read-only unless Steve explicitly asks for archive maintenance. Do not write new content into `archive/old/`.
