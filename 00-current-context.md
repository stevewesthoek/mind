# Current Context

This file is the compact current-context layer for AI sessions.

Agents should read this early, but should not treat it as exhaustive. Use `00-memory-map.md` to retrieve supporting files.

## Status

```yaml
status: draft
last_reviewed: 2026-05-09
owner: Steve Westhoek
purpose: Keep AI sessions oriented without loading the whole vault.
```

## Current Operating Model

Steve uses this repo as a personal Obsidian vault and AI-readable memory.

The `brain` repo contains AI infrastructure, skills, system configs, and automation logic.
The `mind` repo contains personal knowledge, strategy, convictions, business/ministry context, projects, tasks, and research.

## Current Architecture Decision

Research should live inside this repo, under:

```text
06-resources/research/
```

Do not create separate research repos by default.

Use folders inside the research area for Bible, theology, apologetics, marketing, business, AI, books, people, and organisations.

Split into a separate repo only if there is a strong boundary:

- different collaborators
- different privacy/confidentiality level
- different publishing workflow
- large files/media
- productized/public research library
- legal/copyright separation

## Current AI Memory Decision

AI agents should not load the whole `mind` repo into every session.

They should:

1. Read `AGENTS.md`.
2. Read `00-start-here.md`.
3. Read this file.
4. Read `00-memory-map.md`.
5. Search/read only relevant files.
6. Save durable outputs in the correct PARA location when asked.

## Important Active Context Areas

### Personal / Knowledge System

- `README.md` documents the vault and automations.
- `HOME.md` is the human daily dashboard.
- `KANBAN.md` is the working board.
- `04-tasks/` is automation-sensitive and syncs with the kanban system.

### Organisations

Canonical organisation truth lives in:

```text
02-strategy/organisations/
```

Known organisation folders include:

```text
02-strategy/organisations/prochat/
02-strategy/organisations/arkware/
02-strategy/organisations/yeshua-academy/
```

Use these folders for committed strategy, positioning, messaging, offers, brand truth, ministry truth, and organisational decisions.

### Ministry / Theology

Yeshua Academy context lives in:

```text
02-strategy/organisations/yeshua-academy/
```

Theological studies and ongoing responsibility context may live in:

```text
05-areas/theological-studies/
```

Bible/theology/apologetics research should live in:

```text
06-resources/research/notes/bible/
06-resources/research/notes/theology/
06-resources/research/notes/apologetics/
```

For apologetics debate replies, use Steve's personal voice/debate standard before drafting:

```text
06-resources/research/notes/apologetics/steve-apologetics-voice-and-debate-standard.md
```

The default should be respectful but direct, fair but not timid, and claim-by-claim rather than a soft generalized essay.

### Business / Marketing

Business and marketing research should live in:

```text
06-resources/research/notes/business/
06-resources/research/notes/marketing/
```

Committed business/brand/growth strategy belongs under the relevant organisation in:

```text
02-strategy/organisations/
```

## Current Writing Defaults

When the user says:

| Natural language request | Default action |
|---|---|
| "remember this" | save to `01-inbox/` unless category is obvious |
| "research this" | create/use `06-resources/research/` |
| "turn this into strategy" | draft in `02-strategy/` |
| "make this a project" | create under `03-projects/` |
| "make this a task" | create under `04-tasks/` with proper task frontmatter |
| "archive this" | ask before moving to `08-archive/` |
| "what do I believe/decide/plan?" | search `02-strategy/`, then relevant resources |

## Maintenance Rule

Keep this file short. It should orient the AI, not become the whole knowledge base.

When context grows, link to dedicated files instead of pasting everything here.
