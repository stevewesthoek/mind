# Model Router Contract

The model router is the AI steward for this vault. Its implementation belongs in `brain/projects/model-router/`; this file describes what it must respect inside `mind`.

## Purpose

Keep the vault small, current, useful, and safe while preserving history.

## Pipeline

```text
capture -> classify -> route -> compile -> dashboard -> maintain
```

## Current dry-run loops

Implementation lives in `brain/projects/model-router/`.

Current loops are dry-run only:

```text
mind-compile-loop
mind-memory-loop
mind-hygiene-loop
mind-drift-error-loop
```

The planner may report proposed actions such as:

```text
compile-capture
promote-memory
summarize-file
split-file
archive-stale-capture
review-failed-capture
verify-contract
```

These are advisory plans only. Planned writes are not executed from this vault.

## Responsibilities

- Classify captures.
- Route useful information to `live/`, `wiki/`, or `sources/`.
- Keep dashboards sparse and human-facing.
- Deduplicate tasks and stale notes.
- Compile old PARA material into the new structure.
- Preserve legacy folders until validation is complete.
- Surface failures in `capture/failed/`.

## Non-responsibilities

- Do not execute planned writes directly from this vault.
- Do not compact, split, archive, move, delete, or rewrite files without an explicit approved apply phase.
- Do not execute arbitrary shell commands from this vault.
- Do not store or reveal secrets.
- Do not directly control runtime systems.
- Do not replace Brain Core as the machine boundary.
- Do not delete legacy material without an explicit validated archive phase.

## Worker policy

The router may delegate to Claude, Codex, Gemini, or local models, but the user-facing contract remains this vault structure and Brain Core boundaries.
