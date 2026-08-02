# Approved Mind Write Pilot

**Status:** validated synthetic prerequisite for Brain B5.4
**Decision date:** 2026-07-31
**Mind task:** M5.1
**Brain dependency:** prerequisite for Brain B5.4

## Selected pilot

The first controlled Mind write is a **frontmatter freshness-only edit** on an isolated synthetic file:

`system/evals/write-pilot/synthetic-frontmatter-target.md`

The proposal may change only:

- line 4: `freshness_status: stale` → `freshness_status: current`
- line 5: `last_reviewed: 2026-01-01` → `last_reviewed: 2026-07-31`

No body content, task state, entity facts, links, filenames, folders, or production notes are in scope.

## Exact scope

| Control | Required value |
|---|---|
| Target path | `system/evals/write-pilot/synthetic-frontmatter-target.md` |
| Before hash | `2a124e5bdb01bf3b189699e0a9a55198b86f515366315d5f659fedcbd91ea0a8` |
| After hash | `2d54ca14a827c5c2813d188d0d2bd2f9c9f51cf85f3c25145ea495ca04375724` |
| Approved lines | 4–5 only |
| Idempotency key | `mind-m5-frontmatter-freshness-fixture-v1` |
| Rollback strategy | `restore-before-content` |
| Approval expiry | `2026-08-01T12:00:00.000Z` |

The proposal, independent approval, expected receipts, expiry rejection, and rollback proof are stored under `system/evals/write-pilot/`.

## Why this pilot is the safest first write

This class is bounded, reversible, deterministic, and semantically low-risk. It proves exact-path approval, before-state verification, narrow section scope, idempotent replay, expiry rejection, receipt generation, and byte-equivalent rollback without touching meaningful Mind content.

## Preconditions

Execution requires all of the following:

1. Brain B5.1–B5.3 controls remain validated.
2. The exact target path and before hash still match the approved proposal.
3. Approval identity comes from a trusted human-controlled surface, not model output.
4. Approval is unexpired at execution time.
5. Rollback content is available before mutation.
6. The review checklist in `system/runbooks/review-approved-mind-write.md` passes.

## Explicit exclusions

This pilot does not authorize:

- writes to `kanban.md`, `tasks.md`, or other task surfaces;
- body-content rewrites;
- entity merges or factual updates;
- file creation outside the synthetic evaluation directory;
- moves, renames, or deletions;
- batch writes;
- production rollout;
- model-supplied authorization fields.

## Authorization boundary

Completion of Mind M5.1–M5.3 makes the documented Mind prerequisite available to Brain B5.4. It does **not** itself complete Brain B5.4 or authorize unrestricted Mind mutation. Brain must still execute and verify its own end-to-end pilot under the canonical Brain plan.
