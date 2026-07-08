# General Knowledge Migration Precheck — 2026-07-08

**Task:** Task O — Batch 6 general knowledge migration precheck
**Status:** precheck complete; no content moved
**Boundary:** inventory and classify legacy `wiki/` general-knowledge candidates before any move into `knowledge/`, `people/`, `organizations/`, or `system/`.

## Current state verified

Latest verified commit before this precheck:

```text
399586c docs: finalize faith migration
```

Starting dirty status contained the expected unrelated paths plus one unrelated zero-byte root canvas file:

```text
 M wiki/log.md
?? Untitled.canvas
?? wiki/organisations/prochat/pitch-decks/
```

`Untitled.canvas` was inspected as a zero-byte untracked file and is outside this batch. It was not staged or edited.

## Batch 6 goal

Move non-faith durable knowledge from legacy `wiki/` paths into clearer top-level homes after review.

Primary target families:

```text
knowledge/
people/
organizations/
system/
```

This precheck does not move content, create knowledge targets, update Save-to-Mind behavior, or enable continuous processing.

## Candidate inventory and classification

| Candidate path | Observed content | Classification | Recommended handling |
|----------------|------------------|----------------|----------------------|
| `wiki/areas/` | `personal-identity/` plus empty `theological-studies/` directory from Git's perspective | mixed area/person/private context; historical/archive candidate for empty subtree | Do not move as a whole. Review `personal-identity/` separately for `people/` or deferred handling. No tracked non-faith content remains under `wiki/areas/theological-studies/` after Batch 5. |
| `wiki/areas/personal-identity/README.md` | personal identity area landing page | personal/private context needing human decision | Defer for a narrower personal-context migration. Candidate target may be `people/` or a private/personal knowledge area after approval. |
| `wiki/areas/personal-identity/profile.md` | personal profile context | person/relationship context; personal/private context needing human decision | Defer for privacy review before any `people/` move. |
| `wiki/areas/personal-identity/theology.md` | already deferred during faith closeout | mixed personal identity and faith boundary context | Keep deferred; do not include in Batch 6 general knowledge moves without explicit human decision. |
| `wiki/ai.md` | durable AI strategy, Mind Steward concepts, agent patterns, and automation knowledge stub | durable general knowledge | Low-risk candidate for `knowledge/ai.md` after target collision and reference checks. |
| `wiki/business.md` | durable business memory, strategy, offers, operations, and lessons stub | organization/business context | Candidate for `knowledge/business.md`; organization-specific content should move to `organizations/` or remain deferred after review. |
| `wiki/content.md` | durable content strategy, channel memory, publishing ideas, and creative references stub | durable general knowledge | Low-risk candidate for `knowledge/content.md` after target collision and reference checks. |
| `wiki/family.md` | durable family and household memory stub | personal/private context needing human decision | Defer or route to an approved `people/`/personal context target. Do not bulk-move into public general knowledge. |
| `wiki/finance.md` | finance context, systems, and references stub with no-secrets warning | personal/private and potentially sensitive knowledge | Needs human decision. Candidate `knowledge/finance.md` only if approved and still excludes secrets, account passwords, and tokens. |
| `wiki/health.md` | health context, routines, and references stub | personal/private context needing human decision | Needs human decision before any move. Candidate may be `knowledge/health.md` only after privacy review. |
| `wiki/people.md` | durable notes about people stub | person/relationship context | Candidate merge into `people/README.md` or `people/index.md`, but needs privacy review and merge policy. |
| `wiki/tools.md` | durable tool notes, workflows, setup references, and operating decisions stub | durable general knowledge; system/process context | Candidate for `knowledge/tools.md`, with repo/tooling operations possibly better under `system/` or repo-specific docs after review. |
| `wiki/system/` | contains `wiki/system/repo-boundaries.md` | system/process/template content | Candidate for `system/` after ownership review. Do not move blindly because it may overlap with existing folder contracts and agent-context docs. |
| `wiki/templates/` | contains `area.md`, `capture.md`, `daily.md`, `project.md`, `resource.md`, `strategy.md`, `task.md` | system/process/template content | Candidate for `system/templates/` or `knowledge/templates/` after template registry review. |
| `wiki/.DS_Store` | local metadata | not knowledge | Do not migrate as content. Cleanup separately if desired. |
| `wiki/organisations/prochat/.DS_Store` | local metadata in held legacy ProChat area | not knowledge | Out of scope for Batch 6. Do not migrate as content. |

Adjacent legacy paths observed but not included in the Batch 6 candidate move list:

```text
wiki/README.md
wiki/index.md
wiki/log.md
wiki/organisations/
```

`wiki/log.md` remains explicitly out of scope because it has an unrelated local edit and proposal-surface migration is not approved. `wiki/organisations/` retains held ProChat legacy material and should be handled by organization-specific batches, not this general knowledge batch.

## Active references found

Requested active files checked:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
system/folder-contract.md
```

Forward-looking candidate references found:

```text
system/agent-context/00-memory-map.md:25:| Long-term responsibilities | `wiki/areas/` | `wiki/` |
system/agent-context/00-memory-map.md:29:| Templates | `wiki/templates/` | existing files of same type |
```

Historical/completed compatibility reference found:

```text
system/folder-contract.md:76:| `wiki/areas/theological-studies/dance-of-life/` | completed to `faith/resources/dance-of-life/` | Source-first move completed in Batch 5I2; no content promoted to `faith/studies/dance-of-life/`. |
```

No direct candidate references were found in:

```text
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
```

Additional compatibility reference observed outside the requested active-file set:

```text
system/agent-context/router-README.md:46:| `area` | `knowledge/`, `faith/`, `people/`, or `organizations/` | `wiki/areas/` |
```

That should be reviewed during the later move/reference update batch if `wiki/areas/` handling changes.

## Recommendation

Do not perform Batch 6 as one broad move. The candidates mix low-risk durable stubs, personal/private context, people context, system/template material, organization context, and historical leftovers.

Recommended sequencing:

1. Batch 6A: perform a narrow target-collision and move-readiness check for low-risk one-file durable knowledge stubs:
   - `wiki/ai.md`
   - `wiki/content.md`
   - `wiki/tools.md`
   - optionally `wiki/business.md` after deciding whether organization-specific content belongs elsewhere
2. Batch 6B: handle personal/private candidates separately:
   - `wiki/family.md`
   - `wiki/finance.md`
   - `wiki/health.md`
   - `wiki/people.md`
   - `wiki/areas/personal-identity/`
3. Batch 6C: review system/template candidates separately:
   - `wiki/system/`
   - `wiki/templates/`
4. Keep `wiki/organisations/` material out of Batch 6 unless a later organization-specific prompt approves it.

## Validation

Precheck validation:

- no `wiki/` content was moved;
- no candidate content was edited;
- no `knowledge/` target content was created by this precheck;
- `wiki/log.md` was not touched;
- `wiki/organisations/prochat/pitch-decks/` was not touched;
- `Untitled.canvas` was not touched;
- Save-to-Mind behavior was not changed;
- continuous processing was not enabled;
- only this precheck report and the Batch 6 roadmap status should be staged for commit.
