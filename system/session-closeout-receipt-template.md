# Session Closeout Receipt Template

**Status:** canonical lightweight template  
**Last reviewed:** 2026-08-03
**Purpose:** prevent forgotten branches, hidden dirty state, and lost decisions after significant AI/repo work.  
**Applies to:** meaningful Brain/Mind/ProChat work sessions, especially when a branch, commit, merge, report, or roadmap decision was created.  
**Does not require:** a full transcript archive.

## When to use this

Create or paste a closeout receipt when a session changed repo state, made a durable decision, produced a report, merged a branch, or left follow-up work that Steve may otherwise forget.

Do not use this template for tiny conversational clarifications, one-off notes, or work that produced no durable decision and no next action.

## Where to place receipts

Default location:

```text
inbox/processed/YYYY-MM-DD-short-session-closeout.md
```

`wiki/log.md` is a read-only compatibility ledger and is not a current receipt destination.

Do not create a transcript archive unless later evidence shows that receipts are too small to preserve the needed handoff.

## Receipt template

```yaml
title: ""
date: YYYY-MM-DD
status: open | complete | blocked | superseded
repo: brain | mind | prochat | other
branch_before: ""
branch_after: ""
commit_range: ""
commits:
  - "<hash> <message>"
changed_files:
  - ""
validation:
  - ""
remaining_dirty_files:
  - ""
decisions_made:
  - ""
next_task: ""
do_not_forget:
  - ""
requires_follow_up: true
```

## Human-readable closeout format

### Session

- Date:
- Repo:
- Branch before:
- Branch after:
- Commit range:

### Commits

- `hash message`

### Changed files

- `path`

### Validation evidence

- `command/result`

### Remaining dirty files

- `path or pattern`
- Mark unrelated local/runtime dirt clearly.

### Decisions made

- Decision:
- Why:
- Who approved it:

### Exact next task

```text
<copy-ready next task>
```

### Do not forget

- Branches to merge/delete:
- Reports to review:
- Dirty files not to commit:
- Deferred risks:

## Safety rules

- A receipt records what happened; it does not authorize new writes.
- Do not include secrets, private keys, tokens, or credentials.
- Do not paste full transcripts by default.
- Do not treat remaining dirty files as approved for cleanup or commit.
- Do not infer approval from a receipt; approval must still name exact paths and actions.
