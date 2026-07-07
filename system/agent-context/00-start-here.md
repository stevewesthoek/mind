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
inbox/                Target intake lifecycle; Save-to-Mind still uses legacy capture/inbox/ until switched
projects/             Target active project home; legacy live/projects/ remains during migration
organizations/        Target business/ministry/non-profit entity home; legacy wiki/organisations/ remains during migration
faith/                Bible, theology, apologetics, ministry, and studies
knowledge/            Durable non-faith knowledge; legacy wiki/ remains during migration
resources/            Source/reference material; legacy sources/ remains during migration
history/              Completed or inactive material; legacy archive/ remains during migration
system/agent-context/ Mind Steward, AI startup, rules, taxonomy, and maintenance context
brain/                AI-system project context lives in the Brain repo, including the video orchestrator
```

## Daily Human Interface

Steve usually works from:

```text
home.md
tasks.md after task migration
kanban.md during compatibility
```

Agents should not rewrite `kanban.md` unless explicitly asked and should preserve automation-sensitive frontmatter in task files.

## AI Memory Interface

Agents should use:

```text
system/agent-context/AGENTS.md
system/agent-context/00-start-here.md
system/agent-context/00-current-context.md
system/agent-context/00-memory-map.md
```

Then retrieve only relevant files.

## Research Home

Research and source material target:

```text
resources/research/
```

Faith-specific Bible, theology, apologetics, ministry, and study material target:

```text
faith/
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

- Capture first: target `inbox/new/`; compatibility fallback `capture/inbox/`
- Research/reference: target `resources/`; faith-specific material under `faith/`
- Final decisions: target `knowledge/decisions.md`; compatibility fallback `live/decisions.md`
- Tasks: target `tasks.md`; compatibility fallback `kanban.md`
- Completed history: target `history/`; compatibility fallback `archive/`

Ask before moving, deleting, renaming, bulk editing, or changing automation-sensitive files.

## Archive

Archived reference material is read-only unless Steve explicitly asks for archive maintenance. Do not write new content into `archive/old/`.
