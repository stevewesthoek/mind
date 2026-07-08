# Personal Private General Knowledge Migration Precheck — 2026-07-08

**Task:** Task O — Batch 6B personal/private general knowledge migration precheck
**Status:** precheck complete; no content moved
**Boundary:** review personal/private and people-context legacy `wiki/` candidates before any move into `knowledge/`, `people/`, or a deferred personal target.

## Current state verified

Latest completed commit before this precheck:

```text
3d8906e docs: move general knowledge stubs
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
wiki/family.md
wiki/finance.md
wiki/health.md
wiki/people.md
wiki/areas/personal-identity/
```

No candidate content was moved or edited in this precheck.

## Candidate inventory and classification

| Candidate path | Observed content | Classification | Privacy / safety concern | Recommended handling |
|----------------|------------------|----------------|--------------------------|----------------------|
| `wiki/family.md` | three-line family and household memory stub | personal/private context needing human decision | family context may include sensitive relationships, household details, minors, or private pastoral context | Do not move blindly. Candidate target could be `knowledge/personal/family.md` or a reviewed personal/private area after explicit approval. |
| `wiki/finance.md` | three-line finance context stub with no-secrets warning | personal/private and potentially sensitive knowledge | finance notes can drift into account data, credentials, tax, income, or other sensitive material | Needs explicit human decision. Candidate `knowledge/finance.md` only if the no-secrets boundary remains clear. |
| `wiki/health.md` | three-line health context stub | personal/private and potentially sensitive knowledge | health notes can contain medical or lifestyle data; avoid broad migration without privacy approval | Needs explicit human decision. Candidate `knowledge/health.md` only if approved as safe durable context. |
| `wiki/people.md` | three-line people notes stub | person/relationship context | people notes can affect privacy, relationships, clients, ministry, and trust boundaries | Candidate merge into `people/README.md` or `people/index.md`, but needs a people-note policy before move. |
| `wiki/areas/personal-identity/README.md` | personal identity and values area landing page | personal/private context; person context | canonical identity and values guidance; should remain stable and not be edited lightly | Defer until a personal identity target is selected. Candidate target may be `people/steve/README.md`, `people/steve/profile.md`, or a dedicated private/personal folder if approved. |
| `wiki/areas/personal-identity/profile.md` | Steve profile, mission, goals, values, AI behavior preferences, theological boundaries, red lines | personal/private context; durable AI/user preference context | high-value personal operating context; moving may affect AI routing and memory expectations | Needs human decision and likely coordination with agent-context memory, not a simple `knowledge/` move. |
| `wiki/areas/personal-identity/theology.md` | personal theological commitments and AI boundaries | mixed personal identity, faith boundary, and AI behavior context | already deferred during faith migration; not source material and not generic general knowledge | Keep deferred unless explicitly approved for a `people/steve/faith-boundaries.md`, `faith/` boundary, or personal identity target. |

## Target collision check

Existing target folders reviewed:

```text
people/
people/README.md
knowledge/
knowledge/README.md
knowledge/ai.md
knowledge/business.md
knowledge/content.md
knowledge/decisions.md
knowledge/tools.md
```

Potential targets absent:

```text
people/family.md
people/finance.md
people/health.md
people/index.md
people/personal-identity.md
people/steve.md
knowledge/family.md
knowledge/finance.md
knowledge/health.md
knowledge/people.md
knowledge/personal/family.md
```

Absence of collisions does not make these candidates safe to move. The content class needs human decision before target creation.

## Active references

Active areas checked:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
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

No active references were found to:

```text
wiki/family.md
wiki/finance.md
wiki/health.md
wiki/people.md
wiki/areas/personal-identity/
```

Planning and historical references exist in:

```text
system/reports/top-level-folder-migration-batch-plan-2026-07-07.md
system/reports/general-knowledge-migration-precheck-2026-07-08.md
system/reports/personal-theology-boundary-migration-precheck-2026-07-08.md
system/reports/faith-migration-finalization-closeout-2026-07-08.md
```

Those references should be updated only as part of later completion notes or owning-report updates.

## Human decisions needed

Before any Batch 6B move, decide:

1. Whether personal/private stubs should live under `knowledge/`, `people/`, or a dedicated private/personal target.
2. Whether `wiki/people.md` should merge into `people/README.md` or become a separate `people/index.md`.
3. Whether finance and health stubs are safe as durable knowledge pages, and what no-secret/no-medical-overreach boundary text should remain.
4. Whether `wiki/areas/personal-identity/profile.md` should be treated as `people/steve/` content, agent-context preference content, or a deferred canonical personal identity document.
5. Whether `wiki/areas/personal-identity/theology.md` belongs with personal identity, `people/steve/faith-boundaries.md`, or another faith-boundary target.

## Recommendation

Do not move Batch 6B content in one pass.

Recommended sequencing:

1. Batch 6B1: move only low-risk root personal stubs after explicit approval:
   - `wiki/finance.md` -> `knowledge/finance.md`
   - `wiki/health.md` -> `knowledge/health.md`
   - optionally `wiki/family.md` -> `knowledge/personal/family.md` only if a personal subfolder is approved.
2. Batch 6B2: handle `wiki/people.md` separately after deciding whether to merge into `people/README.md` or create `people/index.md`.
3. Batch 6B3: handle `wiki/areas/personal-identity/` separately as personal identity / AI preference / faith-boundary material, not generic durable knowledge.

## Validation

Precheck validation:

- no `wiki/` content was moved;
- no candidate content was edited;
- no `knowledge/` or `people/` target content was created by this precheck;
- `wiki/log.md` was not touched;
- `Untitled.canvas` was not touched;
- `wiki/organisations/prochat/pitch-decks/` was not touched;
- Save-to-Mind behavior was not changed;
- continuous processing was not enabled;
- only this precheck report and the Batch 6 roadmap status should be staged for commit.
