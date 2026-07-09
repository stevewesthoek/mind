# Brain Reader and Routing Compatibility Precheck — 2026-07-08

**Task:** Task O — Batch 8A Brain reader and routing compatibility precheck  
**Status:** precheck only  
**Boundary:** no capture/inbox content moved; no routing switched.

## Current state verified

Latest completed commit before this precheck:

```text
d9b09ea docs: precheck inbox migration
```

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? Untitled.canvas
?? wiki/organisations/prochat/pitch-decks/
```

These paths were not touched or staged. `sources/.DS_Store` was not touched.

## Search scope and terms

Read-only repository search checked code, docs, and config for:

```text
Save-to-Mind
capture/inbox
capture/failed
capture/daily
inbox/new
inbox/failed
inbox/raw
inbox/processed
sources/files
resources/files
Brain
Mind Steward
webhook/mind-inbox
n8n
```

A code/config focused search checked `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.yml`, and `.yaml` files for routing path literals.

## Active routing and config findings

### Obsidian vault config

`.obsidian/app.json` currently contains active vault routing:

```json
{
  "newFileFolderPath": "capture/inbox",
  "attachmentFolderPath": "sources/files"
}
```

Classification:

| Reference | Classification | Handling |
|-----------|----------------|----------|
| `.obsidian/app.json` `newFileFolderPath: capture/inbox` | active Obsidian vault config | update only during controlled switch |
| `.obsidian/app.json` `attachmentFolderPath: sources/files` | stale active Obsidian attachment config | review with routing switch; likely target is `resources/files` |
| `.obsidian/plugins/obsidian-icon-folder/data.json` `sources/files` | Obsidian plugin icon metadata | safe to update later with resources/file icon cleanup |

Workbench exact file reads are policy-blocked for `.obsidian/**`, so the evidence above was collected through a bounded read-only command.

### Code/config hardcodes

Focused code/config search found:

```text
capture/inbox -> .obsidian/app.json
capture/failed -> none
inbox/new -> none
inbox/failed -> none
sources/files -> none in focused code/config search except Obsidian/plugin evidence noted above
resources/files -> none
webhook/mind-inbox -> none
```

No application code route was found for `inbox/new/` or `inbox/failed/`.

### Capture documentation

`capture/inbox/README.md` documents the current external workflow:

```text
POST /webhook/mind-inbox -> n8n -> GitHub capture/inbox/
```

Classification: external workflow documentation. Do not rewrite until the actual Save-to-Mind/n8n target has been switched and controlled-test validated.

`capture/README.md` still instructs automations to write unknown or unclassified material to `capture/inbox/`.

Classification: legacy compatibility documentation. Update only when active routing switches.

`capture/failed/README.md` documents failed captures as recoverable evidence.

Classification: failed-capture lifecycle documentation. Move/update only after failure routing validation.

### Inbox target documentation

`inbox/README.md` describes the post-migration lifecycle and says legacy `capture/` paths remain until Save-to-Mind, Brain readers, Obsidian links, and validation are migrated.

Target folders are present and README-only:

```text
inbox/new/
inbox/raw/
inbox/processed/
inbox/failed/
```

`inbox/new/README.md` states Save-to-Mind still writes to the legacy capture path until explicit migration to `inbox/new/`.

`inbox/failed/README.md` states legacy `capture/failed/` remains until Brain routing and validation switch to `inbox/failed/`.

## Active context findings

Checked active files:

```text
system/agent-context/00-memory-map.md
system/agent-context/00-current-context.md
system/agent-context/AGENTS.md
system/folder-contract.md
```

Current active routing remains legacy by design:

```text
capture/inbox/
capture/failed/
```

`system/agent-context/AGENTS.md` explicitly says Save-to-Mind targets `capture/inbox/` and that this path should not be changed yet.

`system/folder-contract.md` already defines target mappings:

```text
capture/inbox/  -> inbox/new/
capture/failed/ -> inbox/failed/
capture/ raw/original material -> inbox/raw/ or resources/
```

The contract explicitly requires Save-to-Mind and failure routing to remain legacy until switched and validated.

## Reference classification

| Reference area | Current path(s) | Classification | Update timing |
|----------------|-----------------|----------------|---------------|
| `.obsidian/app.json` | `capture/inbox`, `sources/files` | active vault config | controlled switch batch only |
| `.obsidian/plugins/obsidian-icon-folder/data.json` | `sources/files` | plugin icon metadata | safe later with Obsidian cleanup |
| `capture/inbox/README.md` | `capture/inbox`, `webhook/mind-inbox`, `n8n` | external workflow documentation | after n8n/Save-to-Mind switch validation |
| `capture/README.md` | `capture/inbox` | legacy compatibility documentation | after routing switch |
| `capture/failed/README.md` | failed capture semantics | lifecycle documentation | after failure routing switch |
| `inbox/**/README.md` | post-migration targets | target documentation | keep |
| active agent context | `capture/inbox`, `capture/failed` | active routing | change only with actual switch |
| `system/folder-contract.md` | mappings to `inbox/new` and `inbox/failed` | compatibility contract | keep until switch, then mark completed |
| `archive/**` | old paths/workflow notes | historical evidence | do not rewrite |
| `capture/inbox/*.md` and `capture/failed/*.md` | content mentions | capture evidence | do not rewrite |

## Compatibility risk assessment

Do not move content or switch routing yet because:

1. Active context still says Save-to-Mind uses `capture/inbox/`.
2. `.obsidian/app.json` still creates new files under `capture/inbox`.
3. External workflow documentation still says `POST /webhook/mind-inbox -> n8n -> GitHub capture/inbox/`.
4. No active code/config route was found for `inbox/new/` or `inbox/failed/`.
5. Existing `capture/inbox/` contains 19 Markdown files, and `capture/failed/` contains 3 Markdown files.
6. Failure routing needs separate controlled validation before moving failed captures.
7. Obsidian attachments still require review because `attachmentFolderPath` points at legacy `sources/files` after the resources migration.

## Recommended switch order

Recommended future sequence:

1. Add/verify Brain reader support for both legacy and target paths:
   - read `capture/inbox/` and `inbox/new/` during compatibility;
   - read `capture/failed/` and `inbox/failed/` during compatibility.
2. Update docs/context to describe compatibility mode, not yet final switch.
3. Update `.obsidian/app.json` in a controlled routing-switch batch:
   - `newFileFolderPath`: `capture/inbox` -> `inbox/new`;
   - review `attachmentFolderPath`: `sources/files` -> likely `resources/files`.
4. Update Save-to-Mind/n8n target after confirming external workflow access.
5. Run a controlled test capture to `inbox/new/`.
6. Run a controlled failed-capture test to `inbox/failed/`.
7. Only after successful tests, move existing `capture/inbox/` content to `inbox/new/` and `capture/failed/` content to `inbox/failed/`.
8. Decide `capture/daily/` target separately:
   - `inbox/processed/daily/`; or
   - `history/capture-daily/`; or
   - another human-approved target.
9. Update active agent context and folder contract to mark the switch completed.

## Recommendation

Proceed next with **Batch 8B — inbox routing compatibility documentation update** or a code/config support check if Brain reader code exists outside this repo.

Do not move existing capture content and do not switch `.obsidian/app.json` until a controlled Save-to-Mind/n8n test plan is ready.

## Boundaries preserved in this precheck

- No capture content moved.
- No inbox content moved.
- `.obsidian/app.json` unchanged.
- Obsidian plugin metadata unchanged.
- Save-to-Mind unchanged.
- Continuous processing not enabled.
- `wiki/log.md` untouched.
- `Untitled.canvas` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- `sources/.DS_Store` untouched.
