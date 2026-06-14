# Current Context

This file is the compact current-context layer for AI sessions.

Agents should read this early, but should not treat it as exhaustive. Use `00-memory-map.md` to retrieve supporting files.

## Status

```yaml
status: current
last_reviewed: 2026-06-14
review_after: 2026-06-28
freshness_risk: high
owner: Steve Westhoek
purpose: Keep AI sessions oriented without loading the whole vault.
```

## Current Operating Model

Steve uses this repo as a personal Obsidian vault and AI-readable memory.

The `brain` repo contains AI infrastructure, skills, system configs, and automation logic.
The `mind` repo contains personal knowledge, strategy, convictions, business/ministry context, projects, tasks, and research.

## Current Folder Structure

```text
capture/inbox/    New captures from Save-to-Mind automation
capture/failed/   Failed captures needing retry
capture/daily/    Daily scratch/notes
live/             Active work surfaces (tasks, projects, decisions, workflows)
wiki/             Compiled durable knowledge
sources/          Raw evidence, research notes, source material
router/           Mind Steward contract and rules
archive/          Completed or inactive material
archive/old/      Read-only backups
```

The cloud video orchestrator implementation is now in the Brain repo at:

```text
/Users/Office/Repos/stevewesthoek/brain/projects/video-orchestrator/
```

## Current Architecture Decision

Research lives inside this repo under:

```text
sources/research/
```

Subfolders: `bible/`, `theology/`, `apologetics/`, `marketing/`, `business/`, `books/`, `people/`, `organisations/`, `ai/`.

Organisation strategy is compiled, committed knowledge that lives in:

```text
wiki/organisations/
```

## Current AI Memory Decision

AI agents should not load the whole `mind` repo into every session.

They should:

1. Read `AGENTS.md`.
2. Read `00-start-here.md`.
3. Read this file.
4. Read `00-memory-map.md`.
5. Search/read only relevant files.
6. Save durable outputs in the correct location when asked.

## Important Active Context Areas

### Personal / Knowledge System

- `README.md` documents the vault and automations.
- `home.md` is the human daily dashboard.
- `kanban.md` is the working board.
- `live/tasks.md` is the current tasks summary.

### Organisations

Canonical organisation truth lives in:

```text
wiki/organisations/
```

Known organisation folders:

```text
wiki/organisations/prochat/
wiki/organisations/arkware/
wiki/organisations/yeshua-academy/
```

Use these folders for committed strategy, positioning, messaging, offers, brand truth, ministry truth, and organisational decisions.

### Ministry / Theology

Yeshua Academy context lives in:

```text
wiki/organisations/yeshua-academy/
```

Theological studies and ongoing responsibility context lives in:

```text
wiki/areas/theological-studies/
```

Bible/theology/apologetics research lives in:

```text
sources/research/bible/
sources/research/theology/
sources/research/apologetics/
```

For apologetics debate replies, use Steve's personal voice/debate standard before drafting:

```text
sources/research/apologetics/steve-apologetics-voice-and-debate-standard.md
```

The default should be respectful but direct, fair but not timid, and claim-by-claim rather than a soft generalized essay.

### Business / Marketing

Business and marketing research lives in:

```text
sources/research/business/
sources/research/marketing/
```

Committed business/brand/growth strategy belongs under the relevant organisation:

```text
wiki/organisations/
```

## Current Writing Defaults

When the user says:

| Natural language request | Default action |
|---|---|
| "remember this" | save to `capture/inbox/` unless category is obvious |
| "research this" | create/use `sources/research/` |
| "turn this into strategy" | draft in `wiki/organisations/` or `live/decisions.md` |
| "make a task" | add to `live/tasks.md` |
| "archive this" | ask before moving to `archive/` |
| "what do I believe/decide/plan?" | search `wiki/organisations/`, then relevant sources |

## Maintenance Rule

Keep this file short. It should orient the AI, not become the whole knowledge base.

When context grows, link to dedicated files instead of pasting everything here.
