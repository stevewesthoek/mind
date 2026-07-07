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
live/             legacy active-state root; targets include projects/, tasks.md, knowledge/, system/reports/
wiki/             legacy durable-knowledge root; targets include knowledge/, faith/, organizations/
sources/          legacy source/reference root; target is resources/ or faith/resources/
archive/          legacy history root; target is history/
router/           legacy agent-context root; target is system/agent-context/
```

## Save-to-Mind flow during compatibility

Save-to-Mind still writes to legacy `capture/inbox/` until a later explicit switch to `inbox/new/` is approved and validated.

Brain may classify and propose destinations, but durable changes remain review-first and approval-gated.

## Target promotion guidance

| Classification | Target review/destination | Legacy fallback |
|---|---|---|
| `task` | `tasks.md` | `kanban.md` |
| `project` | `projects/` | `live/projects/` |
| `decision` | `knowledge/decisions.md` | `live/decisions.md` |
| `area` | `knowledge/`, `faith/`, `people/`, or `organizations/` | `wiki/areas/` |
| `research` | `resources/research/` or `faith/resources/` | `sources/research/` |
| `resource` | `resources/` or `faith/resources/` | `sources/` |
| `inbox` | keep in `inbox/new/` after Save-to-Mind migration | keep in `capture/inbox/` during compatibility |

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
