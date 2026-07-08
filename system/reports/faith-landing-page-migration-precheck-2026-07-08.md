# Faith Landing Page Migration Precheck — 2026-07-08

**Task:** Task O — Batch 5F faith landing page migration precheck  
**Status:** precheck only  
**Boundary:** no `wiki/faith.md` content moved, merged, or deleted in this batch.

## Candidate legacy page

```text
wiki/faith.md
```

Current content:

```markdown
# Faith

Compiled durable faith, ministry, theology, and discipleship memory belongs here.
```

## Target page inspected

```text
faith/README.md
```

`faith/README.md` is already the richer target landing page. It describes Bible, theology, apologetics, ministry, study preparation, faith questions, and faith-specific resources, and lists the target faith substructure.

## Classification

| Path | Classification | Likely target | Move readiness | Notes |
|------|----------------|---------------|----------------|-------|
| `wiki/faith.md` | distilled durable faith landing-page stub | merge into `faith/README.md` or retire after confirming no active links | likely safe after approval | The page is only a short legacy landing stub and should not overwrite the prepared target README. |

## Active references inspected

No exact active `wiki/faith.md` references were found in:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
```

Search found the page itself but did not surface active cross-references that require immediate update.

## Recommendation

Proceed next with **Batch 5F1 — Faith landing page retire/merge**, after approval.

Preferred handling:

1. Keep `faith/README.md` as the canonical target landing page.
2. Add a concise sentence from the legacy page only if useful:
   - “Compiled durable faith, ministry, theology, and discipleship memory belongs here.”
3. Remove or relocate `wiki/faith.md` only if write policy allows and validation confirms no active references.

Do not move `wiki/faith.md` over `faith/README.md`.

## Validation required for Batch 5F1

1. Verify `wiki/faith.md` exists and `faith/README.md` remains the target canonical landing page.
2. Update `faith/README.md` only if preserving the exact legacy sentence adds value.
3. Remove, archive, or leave `wiki/faith.md` according to approved policy; do not overwrite target README.
4. Validate active references do not break.
5. Do not move or edit unrelated faith area content:
   - `wiki/areas/personal-identity/theology.md`
   - `wiki/areas/theological-studies/`
6. Do not touch unrelated dirty paths:
   - `wiki/log.md`
   - `wiki/organisations/prochat/pitch-decks/`
7. Preserve Save-to-Mind behavior.
8. Keep continuous processing disabled.

## Boundaries preserved in this precheck

- No `wiki/faith.md` content moved.
- No `faith/README.md` content changed.
- No wiki area content moved.
- `wiki/log.md` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- Save-to-Mind unchanged.
- Continuous processing disabled.
