# Organizations Migration Precheck — 2026-07-07

**Task:** Task O — Batch 4 organizations migration planning/precheck  
**Status:** planning/precheck only  
**Boundary:** no organization content moved or edited in this batch.

## Files and folders inspected

- `wiki/organisations/`
- `organizations/README.md`
- `wiki/organisations/README.md`
- `system/folder-contract.md`
- `system/reports/top-level-folder-migration-batch-plan-2026-07-07.md`

## Inventory summary

`wiki/organisations/` currently contains:

```text
wiki/organisations/README.md
wiki/organisations/conventions.md
wiki/organisations/ecosystem.md
wiki/organisations/arkware/
wiki/organisations/prochat/
wiki/organisations/yeshua-academy/
```

Bounded inventory, excluding unrelated untracked `wiki/organisations/prochat/pitch-decks/`:

```text
tracked-like files found: 65
directories found: 14
skipped unrelated untracked folder: wiki/organisations/prochat/pitch-decks/
```

## Primary target mapping

| Current path | Proposed target | Classification | Safe later move? | Notes |
|--------------|-----------------|----------------|------------------|-------|
| `wiki/organisations/README.md` | `organizations/legacy-README.md` or merge into `organizations/README.md` | Legacy folder overview | Human decision | Contains old PARA-era structure and should not overwrite the prepared target README automatically. |
| `wiki/organisations/conventions.md` | `organizations/conventions.md` | Organization IA conventions | Likely yes | May need wording updates from `organisations`/PARA to target `organizations/`. |
| `wiki/organisations/ecosystem.md` | `organizations/ecosystem.md` | Business/entity map | Likely yes | Durable organization map. |
| `wiki/organisations/arkware/` | `organizations/arkware/` | Organization folder | Likely yes | Contains overview, messaging, offers, positioning. |
| `wiki/organisations/yeshua-academy/` | `organizations/yeshua-academy/` | Organization folder | Likely yes | Contains overview, messaging, offers, positioning. |
| `wiki/organisations/prochat/README.md` | `organizations/prochat/README.md` | Organization overview | Likely yes | ProChat durable organization context. |
| `wiki/organisations/prochat/brand/` | `organizations/prochat/brand/` with possible exceptions | Brand/product strategy | Mixed | Most brand truth belongs under organization, but scripts/templates/code-like deployment files may need repos/resources review. |
| `wiki/organisations/prochat/growth/` | `organizations/prochat/growth/` | Growth/marketing strategy | Likely yes | Durable organization growth context. |
| `wiki/organisations/prochat/legal/` | `organizations/prochat/legal/` | Legal/policy drafts | Likely yes | Keep as organization legal context; review before external use. |
| `wiki/organisations/prochat/playbooks/` | `organizations/prochat/playbooks/` with possible resources exceptions | Playbooks and assets | Mixed | Markdown playbooks fit organization; `.docx` asset likely remains with organization or moves to resources depending on provenance rules. |
| `wiki/organisations/prochat/youtube/` | `organizations/prochat/youtube/` with archive/history exceptions | Channel/content strategy | Mixed | Active channel strategy fits ProChat organization; archive PDF may later move to history/resources. |
| `wiki/organisations/prochat/.DS_Store` | no durable target | Local metadata | No | Should not become knowledge; handle only in cleanup, not migration. |
| `wiki/organisations/prochat/pitch-decks/` | hold | Untracked unrelated folder | No | Explicitly out of scope and untouched. |

## Content that may need non-organization targets

| Current path | Possible target | Reason |
|--------------|-----------------|--------|
| `wiki/organisations/prochat/brand/mikeoss-dokploy-deploy-script.sh` | `repos/`, `resources/`, or hold under `organizations/prochat/brand/` | Script-like deployment material may be repo/tool context, not pure organization truth. |
| `wiki/organisations/prochat/brand/mikeoss-dokploy-provision-template.sh` | `repos/`, `resources/`, or hold under `organizations/prochat/brand/` | Script/template artifact; needs repo/provenance decision. |
| `wiki/organisations/prochat/playbooks/assets/Avatar-Niche-Worksheet.docx` | `resources/` or `organizations/prochat/playbooks/assets/` | Binary/source asset; target depends on whether it is ProChat-owned playbook material or generic resource. |
| `wiki/organisations/prochat/youtube/archive/YouTube-Money-Plan.pdf` | `history/`, `resources/`, or `organizations/prochat/youtube/archive/` | Archived PDF/source material; may be historical/reference rather than active organization truth. |
| `wiki/organisations/prochat/youtube/assets/` | `resources/` or `organizations/prochat/youtube/assets/` | Asset folder needs inventory before move. |
| `wiki/organisations/prochat/youtube/channel/scripts/*` | `organizations/prochat/youtube/channel/scripts/` or `projects/` | Content scripts may be active project deliverables or organization channel material. |

## Recommended migration approach

Do not move the entire `wiki/organisations/` tree in one commit.

Recommended sequence:

1. **Batch 4A — small organization folders:** move `arkware/` and `yeshua-academy/` first, plus link updates.
2. **Batch 4B — organization root docs:** move `ecosystem.md` and `conventions.md`; preserve or merge old README after decision.
3. **Batch 4C — ProChat core:** move `prochat/README.md`, `growth/`, and `legal/` if references validate.
4. **Batch 4D — ProChat brand:** move brand Markdown files; hold or classify script-like `.sh` files.
5. **Batch 4E — ProChat playbooks and YouTube:** split active strategy from assets/archive/source material as needed.
6. Cleanup legacy `wiki/organisations/` only after validation and explicit approval.

## Recommended first move batch

Proceed next with **Batch 4A — small organization folder move**:

```text
wiki/organisations/arkware/ -> organizations/arkware/
wiki/organisations/yeshua-academy/ -> organizations/yeshua-academy/
```

Why:

- both are small, clean organization folders;
- both have clear target paths;
- neither depends on the untracked `prochat/pitch-decks/` folder;
- neither contains binaries or script-like deployment artifacts;
- the move can be validated with exact file counts and path-token search.

## Human decisions needed before later batches

1. Whether to preserve `wiki/organisations/README.md` as `organizations/legacy-README.md` or merge useful parts into `organizations/README.md`.
2. Whether ProChat script-like `.sh` files are organization documentation, repo documentation, or resources.
3. Whether ProChat playbook `.docx` and YouTube PDF/archive assets stay under organization or move to `resources/`/`history/`.
4. Whether YouTube scripts are organization channel material or project deliverables.
5. When to handle or ignore `.DS_Store` cleanup.

## Boundaries preserved

- no organization files moved;
- no organization files edited;
- `wiki/log.md` untouched;
- `wiki/organisations/prochat/pitch-decks/` untouched;
- Save-to-Mind unchanged;
- continuous processing disabled.
