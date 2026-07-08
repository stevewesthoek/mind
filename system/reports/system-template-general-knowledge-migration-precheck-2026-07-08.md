# System Template General Knowledge Migration Precheck — 2026-07-08

**Task:** Task O — Batch 6C system/template general knowledge migration precheck
**Status:** Batch 6C1 completed after precheck
**Boundary:** review legacy `wiki/system/` and `wiki/templates/` candidates before any move into `system/`, `system/templates/`, or `knowledge/system/`.

## Current state verified

Latest completed commit before this precheck:

```text
6c5d7a9 docs: precheck personal private knowledge migration
```

Starting dirty status contained only preserved unrelated paths:

```text
 M wiki/log.md
?? Untitled.canvas
?? wiki/organisations/prochat/pitch-decks/
```

Those unrelated paths were not edited or staged.

## Scope

Precheck candidates:

```text
wiki/system/
wiki/templates/
```

No candidate content was moved or edited in this precheck.

## Candidate inventory and classification

| Candidate path | Observed content | Classification | Recommended target | Notes |
|----------------|------------------|----------------|--------------------|-------|
| `wiki/system/repo-boundaries.md` | canonical cross-repo boundary document for Mind, Brain, Brain Core, Brain Console, and ProChat OS docs | system/process contract | `system/repo-boundaries.md` | This is operating documentation, not general knowledge. Moving to `knowledge/system/` would blur contracts with durable knowledge. |
| `wiki/templates/area.md` | legacy area note template with old `notes/projects` dataview path | system/template content | `system/templates/area.md` after template review | Contains legacy paths and should be preserved source-for-source first; content modernization should be separate. |
| `wiki/templates/capture.md` | capture note template | system/template content | `system/templates/capture.md` | Preserve as a template; do not convert to a knowledge note. |
| `wiki/templates/daily.md` | daily note template with task queries and capture prompts | system/template content | `system/templates/daily.md` | Contains emoji and Obsidian task syntax; preserve as-is during a move. |
| `wiki/templates/project.md` | project note template with legacy `notes/tasks/` instruction | system/template content | `system/templates/project.md` after template review | Move source-preservingly first; update old paths only in a later template modernization batch. |
| `wiki/templates/resource.md` | resource note template | system/template content | `system/templates/resource.md` | Template, not source/provenance material. |
| `wiki/templates/strategy.md` | strategy note template | system/template content | `system/templates/strategy.md` | Template, not generic knowledge. |
| `wiki/templates/task.md` | task note template with legacy `notes/projects/project-name` link | system/template content | `system/templates/task.md` after template review | Move source-preservingly first; update old paths only in a later template modernization batch. |

## Target collision check

No direct target collisions were found:

```text
system/repo-boundaries.md absent
system/templates/ absent
system/templates/area.md absent
system/templates/capture.md absent
system/templates/daily.md absent
system/templates/project.md absent
system/templates/resource.md absent
system/templates/strategy.md absent
system/templates/task.md absent
knowledge/system/ absent
knowledge/system/repo-boundaries.md absent
knowledge/templates/ absent
```

The existing `system/README.md` defines `system/` as the home for Mind operating documentation, contracts, reports, and templates. The existing `system/folder-contract.md` also lists `system/` as the target for Mind operating documentation, contracts, reports, templates, agent context, and generated-output notes.

## Active references

Active areas checked:

```text
system/agent-context/
system/folder-contract.md
live/
wiki/
knowledge/
people/
organizations/
home.md
kanban.md
README.md
AGENTS.md
```

Forward-looking active reference found:

```text
system/agent-context/00-memory-map.md:29:| Templates | `wiki/templates/` | existing files of same type |
```

No active references were found to:

```text
wiki/system/
wiki/system/repo-boundaries.md
wiki/templates/area.md
wiki/templates/capture.md
wiki/templates/daily.md
wiki/templates/project.md
wiki/templates/resource.md
wiki/templates/strategy.md
wiki/templates/task.md
system/templates/
knowledge/system/
knowledge/templates/
```

Planning references exist in:

```text
system/reports/top-level-folder-migration-batch-plan-2026-07-07.md
system/reports/general-knowledge-migration-precheck-2026-07-08.md
```

Those should be updated only as part of later completion notes.

## Recommendation

Do not route these candidates to `knowledge/system/`.

Recommended Batch 6C1 move:

```text
wiki/system/repo-boundaries.md -> system/repo-boundaries.md
wiki/templates/ -> system/templates/
```

Then update active template routing:

```text
system/agent-context/00-memory-map.md
```

Expected reference update:

```text
wiki/templates/ -> system/templates/
```

Do not modernize template internals during the move. Several templates contain legacy paths such as `notes/projects`, `notes/tasks`, and old project/task links. Those should be handled in a separate template modernization review after source-preserving relocation.

## Boundaries for Batch 6C1

Do not move or edit:

```text
wiki/family.md
wiki/finance.md
wiki/health.md
wiki/people.md
wiki/areas/
wiki/organisations/
wiki/log.md
Untitled.canvas
wiki/organisations/prochat/pitch-decks/
```

Do not change Save-to-Mind behavior.

Do not enable continuous processing.

Do not stage broad paths.

Do not claim all top-level migration is complete.

## Validation required for Batch 6C1

1. Verify `wiki/system/repo-boundaries.md` and all seven `wiki/templates/*.md` files exist before moving.
2. Verify `system/repo-boundaries.md` and `system/templates/` targets are absent before moving.
3. Move only approved system/template paths.
4. Update `system/agent-context/00-memory-map.md` template routing from `wiki/templates/` to `system/templates/`.
5. Do not modernize template internal paths in the same commit.
6. Confirm no other `wiki/` content moved.
7. Confirm unrelated dirty paths remain unstaged:
   - `wiki/log.md`
   - `Untitled.canvas`
   - `wiki/organisations/prochat/pitch-decks/`
8. Confirm Save-to-Mind remains unchanged.
9. Confirm continuous processing remains disabled.
10. Stage only moved system/template files and related reference/report/roadmap updates.

## Precheck validation

- no `wiki/` content was moved;
- no candidate content was edited;
- no `system/`, `system/templates/`, or `knowledge/system/` target content was created by this precheck;
- `wiki/log.md` was not touched;
- `Untitled.canvas` was not touched;
- `wiki/organisations/prochat/pitch-decks/` was not touched;
- Save-to-Mind behavior was not changed;
- continuous processing was not enabled;
- only this precheck report and the Batch 6 roadmap status should be staged for commit.

## Batch 6C1 completion notes

Completed source-preserving moves:

```text
wiki/system/repo-boundaries.md -> system/repo-boundaries.md
wiki/templates/ -> system/templates/
```

Updated active references in:

```text
system/agent-context/00-memory-map.md
```

Reference update completed:

```text
wiki/templates/ -> system/templates/
```

Template internals were not modernized in this batch. Legacy template body references such as `notes/projects`, `notes/tasks`, and old project/task links remain preserved for a later template modernization review.

Batch 6C1 boundaries preserved:

- no other `wiki/` content was moved;
- `wiki/family.md`, `wiki/finance.md`, `wiki/health.md`, `wiki/people.md`, `wiki/areas/`, and `wiki/organisations/` remain in place;
- `wiki/log.md` was not touched;
- `Untitled.canvas` was not touched;
- `wiki/organisations/prochat/pitch-decks/` was not touched;
- Save-to-Mind behavior was not changed;
- continuous processing was not enabled.
