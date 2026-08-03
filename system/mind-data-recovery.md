# Mind Data Recovery and Retention

**Status:** canonical recovery policy; M7.5 drill passed
**Version:** 1.0
**Last reviewed:** 2026-08-03
**Review after:** 2026-09-03
**Owner role:** Steve Westhoek (recovery and deletion authority)
**Depends on:** `system/folder-contract.md`, `system/generated-output-policy.md`,
`system/task-kanban-contract.md`

This policy defines how to recover Mind without overwriting newer human work,
assuming a model provider is unavailable. It does not authorize a restore,
deletion, Graphify operation, or Brain runtime change.

## Recovery sources and authority

| Source | What it can recover | Current evidence | Authority and limitation |
|---|---|---|---|
| Live Mind working tree | Current tracked, untracked, ignored, and uncommitted state | Present locally; nine protected dirty paths existed during the drill and were not included, copied, or changed by it | Inventory first. Newer live human work outranks an older Git snapshot and must not be overwritten. |
| Canonical Git remote | Committed repository content and history | `git@github.com:stevewesthoek/mind.git`, branch `main`; source commit `1c592ddcb5c7658f1115ec9c926880e88a8c7c43` was pushed and read back before the drill | Primary recovery source for committed content. Git does not recover untracked, ignored, or never-committed edits. |
| Local Git objects | Committed content available in the local clone | The drill used local commit `1c592ddcb5c7658f1115ec9c926880e88a8c7c43` | Useful when offline, but not an independent backup of the machine or disk. |
| External or machine backup | Uncommitted, ignored, application-state, or whole-machine recovery | No approved secondary backup path or current restore receipt was verified in M7.5 | Status is unknown. Do not claim backup coverage until an exact source, timestamp, encryption boundary, and restore test are recorded. |

The Git remote is authoritative for the committed snapshot it names, not for
newer live edits. If Git and an external backup disagree, compare timestamps,
hashes, and provenance in an isolated location; do not select a winner by
convenience.

## Restore order

1. Stop or pause tools that can write to Mind, including Obsidian plugins and
   automation. This is an operator action and may require separate approval.
2. Record the live repository path, branch, HEAD, `git status --short`, untracked
   files, ignored state needed by the task, and exact protected paths.
3. Preserve any uncommitted or untracked target content to a separately named,
   verified recovery source before considering replacement.
4. Resolve the exact Git commit or approved backup timestamp. Verify the remote
   commit independently when network access is available.
5. Extract only the required paths into a new isolated temporary directory.
   Never extract over the live vault.
6. Compare expected and restored SHA-256 hashes, file counts, and required
   entrypoints. For structured data, also run the relevant validator.
7. Review a path-scoped diff between the isolated copy and the live target.
8. Only after Steve explicitly approves the exact target paths, copy or restore
   those paths. Re-run hashes and repository validators afterward.
9. Record the source commit or backup timestamp, targets, before/after hashes,
   validation, approver, and disposition of the isolated copy.

## M7.5 isolated restore drill — 2026-08-03

| Field | Value |
|---|---|
| Source | Local Git commit already verified equal to remote `main` |
| Source commit | `1c592ddcb5c7658f1115ec9c926880e88a8c7c43` |
| Destination | `/tmp/mind-m7-5-restore.Da2thn` |
| Scope | 10 canonical entrypoint/policy files and 4 representative domain source files |
| Result | PASS — 14 of 14 restored hashes equal `git show HEAD:<path>` hashes |
| Live-vault mutation | None |
| Secret handling | Only the 14 named tracked Markdown files were extracted; contents were not printed by the drill |
| Temporary-copy disposition | Left at the exact path above; this policy does not treat automatic `/tmp` cleanup as retained evidence |

The drill used an allowlisted `git archive` extraction into a directory created
by `mktemp -d`. It did not archive the full repository and did not include the
protected dirty paths.

### Verification hashes

| Path | SHA-256 | Result |
|---|---|---|
| `home.md` | `abb5fa28480c53da95994c68219ee25723d818fd6c9d699fc0f00a66606ae9f4` | PASS |
| `system/agent-context/AGENTS.md` | `70b334a634c54fdf795ae4909fce394388e489f6f3e3f09bc473da7f3905eed9` | PASS |
| `system/agent-context/00-start-here.md` | `e5e622a427896bc2a611509a7ed9032babde248addf1e59423e62e6118229f54` | PASS |
| `system/agent-context/00-current-context.md` | `e5761da257d264cdf4a1aacf2034c510a916edcdf3e30d559652452d69ac0779` | PASS |
| `system/agent-context/00-memory-map.md` | `63d5af14bb89e3ad548b51e6489fac5e1f72d7dd950d26628d5d5f32e555f15d` | PASS |
| `system/infinite-brain-philosophy.md` | `f3b6aad2a17bd4ee35ef144aa60eb732eb9972c41c1fb4d33f84514b0967a508` | PASS |
| `system/mind-strategy.md` | `b1c7a417bb9a31431f84e73637ac432aaf8124c1af00a43e530917f58cdbbbe4` | PASS |
| `system/mind-roadmap.md` | `a7f786ac5222691a6e40ff56d5f3fc1b39c3f742bcc640a21eab1e886b8a0a41` | PASS |
| `system/mind-implementation-plan.md` | `dd230f8ce2ec6b7791e8040135eb8b9bab920dc24ed142c35aae31417cc1eec9` | PASS |
| `system/brain-mind-bridge.md` | `f5b2fa061cbb91d4c62453f2cacaeaa100f89e6442a65929ee24d42e03fd8676` | PASS |
| `organizations/prochat/README.md` | `2556b7a767be2e8fc90ec0d8e7341fd7fb179102b8ae4c1abbc4a8659a36081d` | PASS |
| `faith/README.md` | `132961b715a402817d40891487a7ec2291fa05358a395644b2015dd1cc7f7727` | PASS |
| `resources/README.md` | `864108ea14a6ca5deca26d8bac85367a2312399a7db5781a611730148288589d` | PASS |
| `projects/README.md` | `1fec191d20477e1d388aed4770b92c9137b47e5e7e91ee907b69ac0d19d34afe` | PASS |

These hashes verify only the named source commit. Later intentional commits are
expected to have different hashes and require a new receipt.

## Retention classes

| Class | Minimum retention | Correction or disposal rule |
|---|---|---|
| Canonical committed source | Indefinite Git history | Correct with a newer commit or explicitly supersede; do not silently rewrite historical evidence |
| Uncommitted or untracked human work | Until committed, deliberately archived, or explicitly discarded by Steve after a verified recovery copy | Never replace merely because Git has an older version |
| Dated recovery receipt | Retain with the commit, incident, or milestone it verifies | Amend explicitly or add a newer receipt; do not edit an old receipt to imply a different drill |
| Approved external backup | Provisional target: 30 daily and 12 monthly recovery points after an approved backup source exists | Verify at least one bounded restore before calling the source recoverable; retention is not active until configured and evidenced |
| Isolated restore copy | Keep through hash/diff review and the recovery decision | Remove only by exact path after its receipt is retained and no unique data remains |
| Generated/cached output | Follow `system/generated-output-policy.md` | Regenerate from canonical source; never use cache disposal to delete source or audit evidence |
| Superseded knowledge | Retain in Git and move to `history/` only after explicit review | Link the replacement and preserve provenance; archive is not deletion |

## Correction and supersession

- Correct a factual error in a new reviewed commit and identify what changed.
- When a newer document replaces an older one, mark or move the older material
  as superseded only after review, link both directions where practical, and
  preserve it in Git/history.
- Never use a restore to erase a legitimate newer correction. Restore missing
  bytes first, then reconcile meaning as a separate reviewed change.
- Generated summaries, graphs, and caches cannot supersede canonical Markdown.

## Exact human-approved deletion handling

Deletion is a separate operation and is not authorized by this policy or the
successful drill. Before deleting material, require all of the following:

1. exact literal target paths with no broad root, unresolved variable, wildcard,
   or recursive parent scope;
2. named owner and reason;
3. read-only dependency and current-use checks;
4. a verified recovery source and SHA-256 receipt for every unique target;
5. Steve's explicit approval for those exact paths and that disposition;
6. a recoverable mechanism such as Trash when practical;
7. post-operation evidence naming what was removed, the recovery source, and
   how restoration was verified.

No automation may infer deletion approval from age, duplication, storage
pressure, a clean Git status, or the existence of a backup.

## Open recovery task

Identify and approve an encrypted secondary backup source for content Git does
not cover, then perform a bounded restore test and record its timestamp,
retention configuration, and hashes. Until that task is complete, secondary
backup coverage remains unknown.
