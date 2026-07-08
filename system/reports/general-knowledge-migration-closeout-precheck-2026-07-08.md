# General Knowledge Migration Closeout Precheck — 2026-07-08

**Task:** Task O — Batch 6D general knowledge migration closeout precheck
**Status:** precheck complete; no content moved
**Boundary:** review remaining legacy `wiki/` content after completed Batch 6A1 and 6C1, identify deferrals, and determine whether Batch 6 can be partially closed without claiming all `wiki/` migration is complete.

## Current state verified

Latest completed commit before this precheck:

```text
febe2d6 docs: move system templates
```

Starting dirty status contained only preserved unrelated paths:

```text
 M wiki/log.md
?? Untitled.canvas
?? wiki/organisations/prochat/pitch-decks/
```

Those unrelated paths were not edited or staged.

## Completed Batch 6 moves

Completed durable general knowledge stub moves:

```text
wiki/ai.md -> knowledge/ai.md
wiki/business.md -> knowledge/business.md
wiki/content.md -> knowledge/content.md
wiki/tools.md -> knowledge/tools.md
```

Completed system/template moves:

```text
wiki/system/repo-boundaries.md -> system/repo-boundaries.md
wiki/templates/ -> system/templates/
```

Active template routing now points to:

```text
system/templates/
```

## Remaining legacy `wiki/` inventory

Remaining top-level and selected nested legacy paths:

```text
wiki/.DS_Store
wiki/README.md
wiki/index.md
wiki/log.md
wiki/family.md
wiki/finance.md
wiki/health.md
wiki/people.md
wiki/areas/personal-identity/
wiki/areas/theological-studies/
wiki/system/
wiki/organisations/
```

`wiki/areas/theological-studies/` and `wiki/system/` are empty legacy directories from Git's perspective. Git will not track empty directories, so they should not be treated as remaining tracked migration content.

## Remaining content classification

| Remaining path | Classification | Status | Notes |
|----------------|----------------|--------|-------|
| `wiki/README.md` | legacy wiki landing page | deferred / cleanup candidate | It still describes moved pages such as `ai.md`, `business.md`, `content.md`, `faith.md`, and `tools.md`. Do not update or delete until the remaining `wiki/` role is decided. |
| `wiki/index.md` | legacy wiki index | deferred / cleanup candidate | It links to moved or deferred wiki domains. It may become a history/compatibility note, redirect index, or deletion candidate after all remaining wiki scopes are resolved. |
| `wiki/log.md` | proposal/review compatibility surface | deferred; do not touch | Dirty unrelated local edit exists. Proposal-surface migration is separate from Batch 6 and not approved here. |
| `wiki/family.md` | personal/private context stub | human decision needed | Covered by Batch 6B. Do not move without explicit privacy/target approval. |
| `wiki/finance.md` | personal/private and potentially sensitive context stub | human decision needed | Covered by Batch 6B. Candidate only after no-secrets boundary is approved. |
| `wiki/health.md` | personal/private and potentially sensitive context stub | human decision needed | Covered by Batch 6B. Needs privacy decision before move. |
| `wiki/people.md` | people/relationship context stub | human decision needed | Covered by Batch 6B. Needs decision to merge into `people/README.md` or create `people/index.md`. |
| `wiki/areas/personal-identity/` | personal identity, profile, and theology boundary material | human decision needed | Covered by Batch 6B and prior personal theology precheck. Not generic knowledge. |
| `wiki/areas/theological-studies/` | empty legacy directory | cleanup candidate after Git/path validation | No tracked content remains after Dance of Life source-first move. |
| `wiki/system/` | empty legacy directory | cleanup candidate after Git/path validation | No tracked content remains after Batch 6C1. |
| `wiki/organisations/` | organization/business strategy compatibility area | deferred to organization-specific migration | Not Batch 6 general knowledge. Held ProChat brand, playbooks, YouTube, pitch-deck material remain under separate organization batches. |
| `wiki/.DS_Store` and `wiki/organisations/prochat/.DS_Store` | local metadata | cleanup candidate, not knowledge | Do not migrate as knowledge. Cleanup separately if approved. |

## Active references and compatibility surfaces

Active compatibility references remain for these deferred areas:

```text
wiki/log.md
wiki/organisations/
wiki/areas/
wiki/index.md fallback
```

Examples include:

```text
home.md
system/folder-contract.md
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
system/agent-context/maintenance.md
system/agent-context/mind-steward.md
system/agent-context/rules.md
organizations/prochat/README.md
organizations/prochat/legal/README.md
organizations/README.md
```

These should remain until their owning migrations are approved. Batch 6D does not update them.

No active `wiki/system/` or `wiki/templates/` references remain after Batch 6C1.

## Closeout assessment

Batch 6 can be partially closed for:

- low-risk durable general knowledge stubs moved to `knowledge/`;
- system/process contract content moved to `system/`;
- templates moved to `system/templates/`;
- active template routing updated.

Batch 6 cannot be fully closed as complete because:

- personal/private stubs still need human decisions;
- `wiki/areas/personal-identity/` still needs a personal identity / people / faith-boundary decision;
- `wiki/log.md` remains a dirty compatibility proposal surface;
- `wiki/organisations/` remains an active compatibility area for organization-specific content;
- `wiki/README.md` and `wiki/index.md` still need a later cleanup/redirect decision;
- empty legacy directories may remain locally but are not tracked content.

## Recommendation

Close Batch 6 as **partially complete** only. Do not claim all `wiki/` migration is complete.

Recommended next work:

1. Defer personal/private candidates to explicit human-decision move prompts.
2. Defer `wiki/organisations/` to organization-specific migration batches.
3. Defer `wiki/log.md` until the unrelated local edit is resolved and proposal-surface migration is approved.
4. Later, after remaining `wiki/` scopes are resolved, review `wiki/README.md`, `wiki/index.md`, metadata files, and empty legacy directories for cleanup.

## Validation

Precheck validation:

- no `wiki/` content was moved;
- no remaining candidate content was edited;
- no new `knowledge/`, `people/`, `organizations/`, or `system/` target content was created by this precheck;
- `wiki/log.md` was not touched;
- `Untitled.canvas` was not touched;
- `wiki/organisations/prochat/pitch-decks/` was not touched;
- Save-to-Mind behavior was not changed;
- continuous processing was not enabled;
- only this closeout precheck report and the Batch 6 roadmap status should be staged for commit.
