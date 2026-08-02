# Review an Approved Mind Write

**Status:** required review gate
**Mind task:** M5.3
**Applies to:** `system/approved-write-pilot.md`

Use this checklist before any controlled Mind write. A failed or ambiguous check is a stop condition.

## 1. Confirm authority and repository state

- [ ] The active repository source is exactly `mind`.
- [ ] The proposal path is repository-relative, normalized, and contains no traversal.
- [ ] The proposed target is exactly `system/evals/write-pilot/synthetic-frontmatter-target.md`.
- [ ] No unrelated path is included.
- [ ] The current target hash equals `2a124e5bdb01bf3b189699e0a9a55198b86f515366315d5f659fedcbd91ea0a8`.
- [ ] Existing unrelated worktree changes are preserved and excluded from the write.

## 2. Confirm trusted approval

- [ ] Approval ID and approver identity are present.
- [ ] Approval fields originate from a trusted human-controlled surface, not model output.
- [ ] `approvedAt` precedes execution.
- [ ] `expiresAt` is later than execution.
- [ ] Proposal and approval use the same idempotency key.
- [ ] The approval names the exact file, before hash, and allowed section.
- [ ] Rollback is required with strategy `restore-before-content`.

## 3. Confirm bounded semantic scope

- [ ] Only lines 4–5 are approved.
- [ ] Only `freshness_status` and `last_reviewed` change.
- [ ] Frontmatter delimiters and all other metadata remain unchanged.
- [ ] Body text remains byte-equivalent.
- [ ] No task, entity, link, filename, folder, move, deletion, or batch operation is included.

## 4. Preview before applying

- [ ] The calculated before hash matches the proposal.
- [ ] The calculated after hash equals `2d54ca14a827c5c2813d188d0d2bd2f9c9f51cf85f3c25145ea495ca04375724`.
- [ ] The canonical scope hash equals `ea0253d5316a6ddc4c3dec6f831cf3e20dd4d0940ee13a35dc68b31ce849e36a`.
- [ ] The before content is retained for rollback before mutation.

## 5. Apply and verify

- [ ] Apply only once under the approved idempotency key.
- [ ] Verify the resulting file is byte-equivalent to `expected-after.md`.
- [ ] Record an application receipt matching `expected-apply-receipt.json`.
- [ ] Replay the same request and verify `idempotent-replay` without a second mutation.
- [ ] Change the proposal content under the consumed idempotency key and verify rejection as `idempotency_conflict`.

## 6. Verify expiry handling

- [ ] Evaluate the approval after `2026-08-01T12:00:00.000Z`.
- [ ] Verify rejection code `approval_expired`.
- [ ] Verify no content changes occur on expiry rejection.

## 7. Roll back

- [ ] Restore the captured before content to the exact target path.
- [ ] Verify the restored file is byte-equivalent to `before.md` and `expected-rollback.md`.
- [ ] Verify the restored hash equals `2a124e5bdb01bf3b189699e0a9a55198b86f515366315d5f659fedcbd91ea0a8`.
- [ ] Record rollback evidence matching `expected-rollback-proof.json`.

## Stop conditions

Stop without applying or continuing when any of these occurs:

- target path, before hash, section scope, or idempotency key differs;
- approval is absent, expired, ambiguous, or model-supplied;
- rollback content is unavailable;
- a write would touch meaningful Mind content;
- an unrelated worktree path would be modified;
- validation produces an unexpected receipt or hash;
- repository or Workbench connectivity becomes uncertain.

## Completion evidence

The review is complete only when the deterministic validator passes every assertion in `system/evals/write-pilot/validate-write-pilot.mjs` and the dated M5 verification report records the result.
