# Controlled Brain Reader Validation — 2026-07-09

**Task:** Task O — Batch 8C controlled Brain reader validation  
**Status:** validation only; no routing switched, no content moved  
**Starting commit:** `e4978db docs: document inbox routing compatibility`

## Dirty-path preservation

Starting dirty status contained only known unrelated paths:

```text
 M wiki/log.md
?? Untitled.canvas
?? wiki/organisations/prochat/pitch-decks/
```

These paths were not touched or staged. `sources/.DS_Store` also not touched.

## Search scope and methodology

A read-only, exhaustive search was performed across the entire `mind` repo for actual implementation code, active config, and documentation references for Brain readers, Mind Steward, AI Model Selector, Save-to-Mind, n8n/webhook handlers, and capture processing logic.

Searched terms:

```text
Brain
Mind Steward
AI Model Selector
Save-to-Mind
webhook/mind-inbox
n8n
capture/inbox
capture/failed
capture/daily
inbox/new
inbox/failed
inbox/raw
inbox/processed
local_only
local OpenAI-compatible model
scheduler
classification
failed capture
capture processing
```

Searched locations:

```text
package.json             — not found
scripts/                 — empty directory
src/                     — not found
apps/                    — not found
services/                — not found
workflows/               — not found
.github/                 — not found
tools/                   — graph/kanban utilities only (no capture processing)
system/                  — agent context, contracts, specifications, reports
system/agent-context/    — active agent context files
.obsidian/               — standard Obsidian vault config
capture/                 — capture evidence and documentation
inbox/                   — target folder documentation
archive/old/planning/    — historical planning evidence
```

## Evidence table

| System | Searched | Code found in this repo? | Location of actual implementation |
|--------|----------|--------------------------|-----------------------------------|
| Brain readers | all code/config locations | **No** — zero implementation code | `/Users/Office/Repos/stevewesthoek/brain/` |
| Brain Core | all code/config locations | **No** | `brain/projects/brain-core/` |
| Mind Steward implementation | all code/config locations | **No** — only contracts/docs | `brain/projects/mind-steward/` |
| AI Model Selector runtime | all code/config locations | **No** — only reference in `mind-steward.md` | `brain/projects/brain-core/src/adapters/ai-model-selector-service.ts` |
| Save-to-Mind webhook | all code/config locations | **No** — only docs/archive | `brain/operations/automations/n8n/workflows/mind-inbox-fixed.json` |
| n8n workflows | all code/config locations | **No** — no `.json` workflow files | `brain/operations/automations/n8n/workflows/` |
| Capture processing logic | all code/config locations | **No** | brain repo scheduler jobs |
| Webhook handlers | all code/config locations | **No** | brain repo n8n deployment |
| Scheduler | all code/config locations | **No** | brain repo |
| Graphify CLI | referenced by `tools/` | **No** — only shell wrapper | External tool, installed globally |

## Code that DOES exist in this repo (non-documentation)

The only project-authored code/scripts found (none of which involve capture processing or Brain readers):

| File | Purpose |
|------|---------|
| `tools/update-graph.sh` | Runs `graphify update` and renders HTML graph |
| `tools/render-graph-html.mjs` | Parses `graphify-out/graph.json` into interactive D3.js HTML |
| `tools/export-kanban-tasks.mjs` | Parses `kanban.md` into JSON task data |
| `wiki/organisations/prochat/brand/mikeoss-dokploy-deploy-script.sh` | ProChat brand deploy automation |
| `wiki/organisations/prochat/brand/mikeoss-dokploy-provision-template.sh` | ProChat provision template |

No `package.json`, `src/`, `apps/`, `services/`, `workflows/`, `.github/` directories exist.

## Finding: No active Brain reader implementation in this repo

**This repo contains zero implementation code for Brain readers, Mind Steward, AI Model Selector, Save-to-Mind, n8n workflows, webhook handlers, or capture processing logic.**

Only the following reference types were found:

| Classification | Count | Examples |
|----------------|-------|----------|
| active agent context | 15+ files | `AGENTS.md`, `mind-steward.md`, `automation-contract.md`, `realtime-inbox-processing-spec.md` |
| active compatibility documentation | 12+ files | batch plans, precheck reports, contract docs |
| active capture evidence | 19 files | `capture/inbox/*.md` |
| external workflow reference | 10+ files | every reference to Save-to-Mind/n8n/Brain points to the `brain/` repo |
| archive/historical evidence | 3+ files | `archive/old/planning/MIND-OS-HANDOFF-2026-05-16.md` |

## Path-read support assessment

| Path | Supported by code in this repo? | Documentation alignment |
|------|-------------------------------|------------------------|
| `capture/inbox/` | **Documentation only** — no reader code exists here | Active; all docs point here as legacy landing zone |
| `inbox/new/` | **No** — no reader code exists here; no code/config references found | Documented as future target; README-only |
| `capture/failed/` | **Documentation only** — no reader code exists here | Active; documented as legacy failure path |
| `inbox/failed/` | **No** — no reader code exists here; no code/config references found | Documented as future target; README-only |
| `capture/daily/` | **Documentation only** | Active; deferred for human target decision |
| `inbox/raw/` | **No** — no code references found | Documented as future target; README-only |
| `inbox/processed/` | **No** — no code references found | Documented as future target; README-only |

## .obsidian/app.json status

Confirmed unchanged:

```json
{
  "newFileFolderPath": "capture/inbox",
  "attachmentFolderPath": "sources/files"
}
```

- `newFileFolderPath` remains `capture/inbox` — no change.
- `attachmentFolderPath` remains `sources/files` — known stale after resources migration (Batch 7 moved source scaffolding to `resources/files/`).
- `.obsidian/plugins/obsidian-icon-folder/data.json` may still reference `sources/files` — not inspected in detail; not changed.

## Risk assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Switching Save-to-Mind without Brain reader dual-path support | **High** — no reader code exists in this repo to validate; actual readers live in `brain/` repo | Must validate `brain/` repo readers before any switch |
| Moving capture content to `inbox/new/` while external readers still target `capture/inbox/` | **High** — external readers would lose access to moving content | Move only after external reader paths are updated and tested |
| Changing `.obsidian/app.json` before Save-to-Mind switch | **Medium** — Obsidian would create new files in wrong folder if switched early | Switch only together with Save-to-Mind in a controlled batch |
| Changing `attachmentFolderPath` from `sources/files` to `resources/files` | **Low** — stale config only affects new Obsidian attachments | Can be done independently; no routing impact |

## Required validations before any switch

Because no Brain reader code exists in this repo, the following validations must be performed in the `brain` repo before any content move or routing change:

1. **Brain readers support `inbox/new/`** — verify Brain Core, Mind Steward, and any workflow that reads captures can read from `inbox/new/` in addition to (or instead of) `capture/inbox/`.
2. **Brain failure routing supports `inbox/failed/`** — verify Mind Steward classification and n8n failure handlers can write to `inbox/failed/` alongside (or instead of) `capture/failed/`.
3. **Save-to-Mind/n8n target can switch to `inbox/new/`** — verify external webhook workflow can write to `inbox/new/` instead of `capture/inbox/`.
4. **Obsidian `.obsidian/app.json` switch plan** — coordinate `newFileFolderPath` change with Save-to-Mind switch so new Obsidian files and external captures land in the same place.
5. **Capture content move plan** — after read/write paths are validated, move existing `capture/inbox/` content to `inbox/new/` and `capture/failed/` content to `inbox/failed/` in a controlled batch.
6. **`attachmentFolderPath` review** — independently update stale `sources/files` to `resources/files` if Obsidian attachments are needed.

## Recommendation

**Batch 8C is documentation-level validation only.** The `mind` repo cannot answer whether Brain readers support dual-path reading because no reader code lives here.

The recommended next step is:

1. **Batch 8D — External workflow validation plan** (plan only, no switches):
   - Document what must be checked in the `brain` repo.
   - Identify all external paths that reference `capture/inbox/` and `capture/failed/`.
   - Create a controlled switch test plan with success criteria.
   - Do not switch anything.

2. **After Batch 8D coordination with brain repo**, perform controlled tests:
   - Test write to `inbox/new/` from Save-to-Mind.
   - Test read from `inbox/new/` by Brain readers.
   - Test failure routing to `inbox/failed/`.
   - Only after all tests pass, move existing content and update config.

3. **Do not switch save-to-Mind or move content** until external validation confirms both read and write support for the target paths.

## Boundaries preserved in this validation

- No capture content moved.
- No inbox content moved.
- `.obsidian/app.json` unchanged.
- `.obsidian/plugins/obsidian-icon-folder/data.json` unchanged.
- Save-to-Mind unchanged.
- Continuous processing not enabled.
- `wiki/log.md` untouched.
- `Untitled.canvas` untouched.
- `wiki/organisations/prochat/pitch-decks/` untouched.
- `sources/.DS_Store` untouched.
- Only this report and related report updates were staged for Batch 8C.
