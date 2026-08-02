# Legacy Router README — Migration Reference

This file preserves the old `router/README.md` content position as a migration reference.

Active agent-context files now live in:

```text
system/agent-context/
```

The active folder README is:

```text
system/agent-context/README.md
```

## Previous structure summary

Before Batch 1, the legacy `router/` folder documented Mind Steward and AI agent context files.

During the broader top-level folder migration, these old paths are compatibility references, not active target paths:

```text
capture/inbox/    legacy Save-to-Mind capture path; target is inbox/new/
capture/failed/   legacy failed-capture path; target is inbox/failed/
live/             legacy active-state root; targets include projects/, knowledge/, system/reports/; human tasks remain in authoritative kanban.md
wiki/             legacy durable-knowledge root; targets include knowledge/, faith/, organizations/
sources/          legacy source/reference root; target is resources/ or faith/resources/
archive/          legacy history root; target is history/
router/           legacy agent-context root; target is system/agent-context/
```

## Historical Save-to-Mind compatibility flow

Historically, Save-to-Mind wrote to legacy `capture/inbox/`. The active success-intake path is now `inbox/new/`.

Brain may classify and propose destinations, but durable changes remain review-first and approval-gated.

## Target promotion guidance

| Classification | Target review/destination | Legacy fallback |
|---|---|---|
| `task` | exact human-approved write to authoritative `kanban.md` | `tasks.md` is retired and non-authoritative |
| `project` | `projects/` | `live/projects/` |
| `decision` | `knowledge/decisions.md` | `live/decisions.md` |
| `area` | `knowledge/`, `faith/`, `people/`, or `organizations/` | `wiki/areas/` |
| `research` | `resources/research/` or `faith/resources/` | `sources/research/` |
| `resource` | `resources/` or `faith/resources/` | `sources/` |
| `inbox` | keep in active `inbox/new/` | historical compatibility-only reference: `capture/inbox/` |

## Active contract files

```text
system/agent-context/AGENTS.md
system/agent-context/00-start-here.md
system/agent-context/00-current-context.md
system/agent-context/00-memory-map.md
system/agent-context/current.md
system/agent-context/map.md
system/agent-context/rules.md
system/agent-context/taxonomy.md
system/agent-context/maintenance.md
system/agent-context/mind-steward.md
```

## Safety

- Do not store runtime logs, reports, tokens, API keys, or credentials in Mind.
- Do not bypass the AI Model Selector for classification.
- Always set `local_only: true` for automatic capture classification.
- Do not move, delete, archive, compact, split, or rewrite Mind files without an explicit approved apply path.
- Keep raw captures and raw sources intact.
