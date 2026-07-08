# General Knowledge Low-Risk Stub Move Precheck — 2026-07-08

**Task:** Task O — Batch 6A general knowledge low-risk stub move precheck
**Status:** precheck complete; no content moved
**Boundary:** review target collisions and references for four one-file durable knowledge stubs before any `wiki/` to `knowledge/` move.

## Current state verified

Latest completed commit before this precheck:

```text
3be9053 docs: precheck general knowledge migration
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
wiki/ai.md
wiki/content.md
wiki/tools.md
wiki/business.md
```

Proposed destination paths:

```text
knowledge/ai.md
knowledge/content.md
knowledge/tools.md
knowledge/business.md
```

No candidate content was moved in this precheck.

## Source inventory

All four source files exist and are three-line durable knowledge stubs.

| Source path | Lines | Classification | Move readiness |
|-------------|-------|----------------|----------------|
| `wiki/ai.md` | 3 | durable general knowledge | ready for a narrow move to `knowledge/ai.md` |
| `wiki/content.md` | 3 | durable general knowledge | ready for a narrow move to `knowledge/content.md` |
| `wiki/tools.md` | 3 | durable general knowledge with system/process overlap | ready for `knowledge/tools.md`; later specific operational runbooks can move to `system/` if needed |
| `wiki/business.md` | 3 | durable business knowledge with possible organization overlap | ready for `knowledge/business.md` as the generic business landing stub; organization-specific material should continue to live under `organizations/` |

Observed source text:

```text
wiki/ai.md
Compiled durable AI strategy, Mind Steward concepts, agent patterns, and automation knowledge belongs here.

wiki/content.md
Compiled durable content strategy, channel memory, publishing ideas, and creative references belong here.

wiki/tools.md
Compiled durable tool notes, workflows, setup references, and operating decisions belong here.

wiki/business.md
Compiled durable business memory, strategy, offers, operations, and lessons belong here.
```

## Target collision check

Existing `knowledge/` contents:

```text
knowledge/
knowledge/README.md
knowledge/decisions.md
```

No target collisions were found:

```text
knowledge/ai.md absent
knowledge/content.md absent
knowledge/tools.md absent
knowledge/business.md absent
```

The existing `knowledge/README.md` already defines `knowledge/` as the correct home for durable non-faith understanding and best practices, so these four stubs fit the folder contract.

## Active references

Requested active reference areas checked:

```text
system/agent-context/
system/folder-contract.md
wiki/
knowledge/
organizations/
people/
home.md
kanban.md
live/
```

Non-report active reference found:

```text
live/business.md:32:- Mind Steward may suggest durable business knowledge for `wiki/business.md` and current work for `live/projects.md` / `live/tasks.md`.
live/business.md:38:- [[../wiki/business|Business wiki]]
```

No direct active references were found to:

```text
wiki/ai.md
wiki/content.md
wiki/tools.md
knowledge/ai.md
knowledge/content.md
knowledge/tools.md
knowledge/business.md
```

Planning/precheck references exist in:

```text
system/reports/top-level-folder-migration-batch-plan-2026-07-07.md
system/reports/general-knowledge-migration-precheck-2026-07-08.md
```

Those planning references should be updated only as part of the later move completion notes.

## Recommended Batch 6A1 move plan

Move only the four approved low-risk stubs:

```text
git mv wiki/ai.md knowledge/ai.md
git mv wiki/content.md knowledge/content.md
git mv wiki/tools.md knowledge/tools.md
git mv wiki/business.md knowledge/business.md
```

Then update only active references created obsolete by the move:

```text
live/business.md
```

Expected reference updates:

```text
wiki/business.md -> knowledge/business.md
[[../wiki/business|Business wiki]] -> [[../knowledge/business|Business knowledge]]
```

Do not update historical evidence in older reports except for current completion notes in the relevant Batch 6 reports and roadmap.

## Boundaries for Batch 6A1

Do not move or edit:

```text
wiki/family.md
wiki/finance.md
wiki/health.md
wiki/people.md
wiki/areas/
wiki/system/
wiki/templates/
wiki/organisations/
wiki/log.md
Untitled.canvas
wiki/organisations/prochat/pitch-decks/
```

Do not change Save-to-Mind behavior.

Do not enable continuous processing.

Do not stage broad paths.

Do not claim all top-level migration is complete.

## Validation required for Batch 6A1

1. Verify the four source files exist before moving.
2. Verify the four `knowledge/*.md` target paths are absent before moving.
3. Move only the four approved stubs.
4. Update `live/business.md` references from `wiki/business.md` to `knowledge/business.md`.
5. Confirm no other `wiki/` content moved.
6. Confirm unrelated dirty paths remain unstaged:
   - `wiki/log.md`
   - `Untitled.canvas`
   - `wiki/organisations/prochat/pitch-decks/`
7. Confirm Save-to-Mind remains unchanged.
8. Confirm continuous processing remains disabled.
9. Stage only moved stubs and related reference/report/roadmap updates.

## Precheck validation

- no `wiki/` content was moved;
- no candidate content was edited;
- no `knowledge/` target content was created by this precheck;
- `wiki/log.md` was not touched;
- `Untitled.canvas` was not touched;
- `wiki/organisations/prochat/pitch-decks/` was not touched;
- Save-to-Mind behavior was not changed;
- continuous processing was not enabled.
