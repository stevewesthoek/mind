# Mind Legacy Root Migration Closeout

**Status:** Phases 1–5 complete — final closeout version
**Version:** final
**Date:** 2026-08-07
**Owner role:** Steve Westhoek (human authority)
**Scope:** Staged retirement of six legacy root folders: `capture/`, `live/`, `sources/`, `wiki/`, `archive/`, `graphify-out/`
**Brain audit basis:** Brain declared all six roots SAFE_TO_REMOVE; no active Brain runtime writes or fallbacks depend on these roots.

File integrity is supplied by Git history, not by any SHA embedded here.

---

## Phase 1 — `capture/`, `live/`, `sources/`

**Status:** complete — 2026-08-06

### 1.1 Pre-migration inventory

#### capture/ — 7 files, 10,638 bytes

| Source path | Size | SHA-256 | Classification |
|-------------|------|---------|----------------|
| `capture/.DS_Store` | 6,148 | `77a18cc5ee781ff432d77f4c7b9d1f97e6fbd181bc2246448f3f8ee1047906c7` | macOS local metadata — untracked |
| `capture/README.md` | 1,882 | `ec0da62cab6a4499331c3cb569487c3ebf9c3a638edd955d5b90ba211fe50079` | legacy routing documentation |
| `capture/daily/README.md` | 233 | `d4928395f4240222d2da1397edafc03c59f5befc9844346618e2fa9f7401d2fa` | legacy routing documentation |
| `capture/failed/README.md` | 744 | `ec720a5df66715f873af4836b27a32826d5a71ac64a5f05c5e238c0333038e10` | historical failed-capture notes |
| `capture/failed/2026-05-16-mind-os-failure-buffer-verification.md` | 514 | `19528e0a35fde2970c17243c8cce74b69249fab610c74101c47635c6dad0a7a9` | historical failure evidence |
| `capture/failed/2026-05-16-mind-os-sanitized-workflow-verification.md` | 523 | `caf99af8bb5d459178dbc8c26be9654985568d8f4461f599a87ef6883e2c69a9` | historical failure evidence |
| `capture/inbox/README.md` | 594 | `5bed194f8411c60a3c70842f1a9fb1a309c0aec2505b47de2fce6b0b93c08b1f` | historical inbox routing documentation |

#### live/ — 10 files, 36,288 bytes

| Source path | Size | SHA-256 | Classification |
|-------------|------|---------|----------------|
| `live/README.md` | 1,534 | `485f8fea735bb21f4c524ff73f5b9f8e7f914cc5d21ee32d2259905d217e39dd` | superseded dashboard root README |
| `live/aws-video-pipeline.md` | 1,635 | `129ec548f21f3c3228ab7d91de983baf794d5073f0a7c28cbfbd94015236a0e8` | superseded pointer dashboard |
| `live/business.md` | 1,037 | `49d0ffe4be234b7754e474c6364eb32d825e3872f15ec5fe852c5ed06d3f064d` | superseded scaffold stub |
| `live/fala.md` | 2,184 | `2fe1719ab18e4fca54ee0c35ce665fd62a045c8d4f1318fffd753ea3bfab982d` | superseded operational dashboard |
| `live/machine.md` | 1,460 | `8b01dd1858231f95ad6a251c809fb8e3c01b08703c58cc51fd4f07d65cd65e8f` | superseded Brain Console pointer |
| `live/projects.md` | 411 | `1678f8326b9bc99afb910c1f6f00dc4a2b20f1e6de919d6bf5cfc82a065abce4` | superseded projects summary stub |
| `live/sessions.md` | 1,042 | `11d05e8d6654ed8913d34e58e644a281635a6786be75684b2a589e3d711ca6ab` | superseded session visibility stub |
| `live/tasks.md` | 281 | `5b85ebdd6d5acb0e05651eea119cf921c7699fd5e63a803e862646f4002e88a4` | superseded task summary stub |
| `live/video.md` | 25,999 | `cb75de170d964c32409b447f617336f5d9444f8990229e69ec953eb0bb88fd31` | superseded video pipeline dashboard |
| `live/workflows.md` | 705 | `0663aaf69a44c2f9420cd3277612fb7231d068b74562798aa0f5e53ffeda013f` | superseded workflow stub |

#### sources/ — 1 file, 6,148 bytes

| Source path | Size | SHA-256 | Classification |
|-------------|------|---------|----------------|
| `sources/.DS_Store` | 6,148 | `69b8f671827dd1b1dcf9add4306c4fe58015f0c48ad46f6371ae284881870838` | macOS local metadata — untracked |

### 1.2 Migration disposition

| Source | Disposition | Target | Rationale |
|--------|-------------|--------|-----------|
| `capture/.DS_Store` | deleted | — | macOS untracked metadata; not knowledge |
| `capture/README.md` | moved | `history/legacy-capture/README.md` | historical routing documentation |
| `capture/daily/README.md` | moved | `history/legacy-capture/daily/README.md` | historical routing documentation |
| `capture/failed/README.md` | moved | `history/legacy-capture/failed/README.md` | historical failure routing notes |
| `capture/failed/2026-05-16-mind-os-failure-buffer-verification.md` | moved | `history/legacy-capture/failed/2026-05-16-mind-os-failure-buffer-verification.md` | historical failure evidence |
| `capture/failed/2026-05-16-mind-os-sanitized-workflow-verification.md` | moved | `history/legacy-capture/failed/2026-05-16-mind-os-sanitized-workflow-verification.md` | historical failure evidence |
| `capture/inbox/README.md` | moved | `history/legacy-capture/inbox/README.md` | historical inbox routing documentation |
| `live/README.md` | moved | `history/legacy-live/README.md` | superseded root README |
| `live/aws-video-pipeline.md` | moved | `history/legacy-live/aws-video-pipeline.md` | superseded dashboard; canonical at Brain |
| `live/business.md` | moved | `history/legacy-live/business.md` | superseded scaffold stub |
| `live/fala.md` | moved | `history/legacy-live/fala.md` | superseded operational notes |
| `live/machine.md` | moved | `history/legacy-live/machine.md` | superseded Brain Console pointer |
| `live/projects.md` | moved | `history/legacy-live/projects.md` | superseded summary stub |
| `live/sessions.md` | moved | `history/legacy-live/sessions.md` | superseded stub |
| `live/tasks.md` | moved | `history/legacy-live/tasks.md` | superseded task summary stub |
| `live/video.md` | moved | `history/legacy-live/video.md` | superseded dashboard |
| `live/workflows.md` | moved | `history/legacy-live/workflows.md` | superseded stub |
| `sources/.DS_Store` | deleted | — | macOS untracked metadata; not knowledge |
| `sources/` root | removed | — | empty after `.DS_Store` deletion |

### 1.3 Collision report

**No collisions.** Both `history/legacy-capture/` and `history/legacy-live/` were absent before migration. No existing target file was overwritten.

### 1.4 Hash verification

All 16 meaningful files (6 from `capture/`, 10 from `live/`) verified:

- Method: `sha256sum` on target file immediately after `git mv`
- Result: **16/16 SHA-256 matches — all PASS**
- `.DS_Store` files (2): deleted, not preserved, no SHA-256 required

### 1.5 Before/after counts

| Root | Before files | Before bytes | After files | After bytes | Method |
|------|-------------|-------------|------------|------------|--------|
| `capture/` | 7 | 10,638 | 0 (absent) | 0 | git mv + rm |
| `live/` | 10 | 36,288 | 0 (absent) | 0 | git mv + rmdir |
| `sources/` | 1 | 6,148 | 0 (absent) | 0 | rm + rmdir |
| `history/legacy-capture/` | 0 (absent) | 0 | 6 | 4,490 | git mv |
| `history/legacy-live/` | 0 (absent) | 0 | 10 | 36,288 | git mv |

Note: `capture/.DS_Store` and `sources/.DS_Store` were untracked macOS metadata
and were deleted, not migrated. 4,490 bytes in `history/legacy-capture/` excludes
the deleted `.DS_Store` (6,148 bytes).

### 1.6 Active-reference updates

Updated to reflect Phase 1 migration:

| File | Change |
|------|--------|
| `system/agent-context/map.md` | Updated historical path list; removed `live/` fallback from search order; updated `capture/` references to `history/legacy-capture/` |
| `system/agent-context/rules.md` | Removed `live/projects/` fallback; removed `sources/` migration note; updated `capture/failed/` reference |
| `system/agent-context/maintenance.md` | Removed `capture/inbox/` and `sources/` compatibility inputs; removed `live/tasks.md` and `live/decisions.md` compatibility outputs |
| `system/folder-contract.md` | Updated compatibility table to record Phase 1 completion; updated root write rule footnote |
| `home.md` | Updated migration notes in target structure table |

### 1.7 Remaining historical references (classified)

After Phase 1, references to these migrated roots remain in reports and contracts.
All are classified below — none are active writers, readers, or navigation targets.

| File | Reference | Classification |
|------|-----------|----------------|
| `system/folder-contract.md` | `capture/` and `live/` in compatibility history table | migration documentation — records completed status |
| `system/reports/m1-3-m1-4-closure-2026-07-31.md` | `capture/inbox/`, `capture/failed/` | historical evidence — prior migration work |
| `system/reports/mind-legacy-root-migration-closeout.md` (this file) | all three roots | migration documentation |
| Various `system/reports/` | `capture/`, `live/`, `sources/` | historical evidence in dated reports |

No active agent-context contract, script, template, validator, runbook, or navigation document retains a live reader/writer/fallback reference to `capture/`, `live/`, or `sources/`.

### 1.8 Rollback instructions

To roll back Phase 1 entirely:

```bash
git revert HEAD --no-edit
# or
git reset --hard b4c2aa71007660cab00c67e7ee18769f0644de88
```

The starting commit `b4c2aa71007660cab00c67e7ee18769f0644de88` restores the exact pre-Phase-1 state including all three legacy roots.

---

## Phase 2 — `wiki/`

**Status:** complete — 2026-08-06

### 2.1 Pre-migration inventory

Total: 60 files, 1,460,354 bytes (independently verified; matches prior audit).

#### wiki/organisations/prochat/brand/ — 28 files

| Source path | Size | SHA-256 | Classification | Target |
|-------------|------|---------|----------------|--------|
| `wiki/organisations/prochat/brand/archive/README.md` | — | `8dca5708` | legacy archive routing note | `organizations/prochat/brand/archive/README.md` |
| `wiki/organisations/prochat/brand/brand-governance.md` | — | `96750633` | canonical brand content | `organizations/prochat/brand/brand-governance.md` |
| `wiki/organisations/prochat/brand/brand-ruleset.md` | — | `024afbc2` | canonical brand content | `organizations/prochat/brand/brand-ruleset.md` |
| `wiki/organisations/prochat/brand/canonical-homepage-copy.md` | — | `6896f2a6` | canonical brand content | `organizations/prochat/brand/canonical-homepage-copy.md` |
| `wiki/organisations/prochat/brand/category-definition.md` | — | `e8306c06` | canonical brand content | `organizations/prochat/brand/category-definition.md` |
| `wiki/organisations/prochat/brand/company-overview.md` | — | `55258bc8` | canonical brand content | `organizations/prochat/brand/company-overview.md` |
| `wiki/organisations/prochat/brand/company-principles.md` | — | `3e4adaf5` | canonical brand content | `organizations/prochat/brand/company-principles.md` |
| `wiki/organisations/prochat/brand/content-strategy.md` | — | `3c6b8c82` | canonical brand content | `organizations/prochat/brand/content-strategy.md` |
| `wiki/organisations/prochat/brand/customer-profiles.md` | — | `f4e5a4e3` | canonical brand content | `organizations/prochat/brand/customer-profiles.md` |
| `wiki/organisations/prochat/brand/future-capabilities.md` | — | `caac626e` | canonical brand content | `organizations/prochat/brand/future-capabilities.md` |
| `wiki/organisations/prochat/brand/global-design-foundation.md` | — | `c9844eb5` | canonical brand content | `organizations/prochat/brand/global-design-foundation.md` |
| `wiki/organisations/prochat/brand/go-to-market.md` | — | `0c7dbdfa` | canonical brand content | `organizations/prochat/brand/go-to-market.md` |
| `wiki/organisations/prochat/brand/messaging-framework.md` | — | `10cac150` | canonical brand content | `organizations/prochat/brand/messaging-framework.md` |
| `wiki/organisations/prochat/brand/mikeoss-dokploy-deploy-script.sh` | — | `7d50be82` | operational script | `organizations/prochat/brand/mikeoss-dokploy-deploy-script.sh` |
| `wiki/organisations/prochat/brand/mikeoss-dokploy-provision-template.sh` | — | `f715355d` | operational script | `organizations/prochat/brand/mikeoss-dokploy-provision-template.sh` |
| `wiki/organisations/prochat/brand/narrative.md` | — | `a25abcf9` | canonical brand content | `organizations/prochat/brand/narrative.md` |
| `wiki/organisations/prochat/brand/positioning.md` | — | `8de496bb` | canonical brand content | `organizations/prochat/brand/positioning.md` |
| `wiki/organisations/prochat/brand/prochat-memory-technical-definition.md` | — | `18574c1b` | canonical brand content | `organizations/prochat/brand/prochat-memory-technical-definition.md` |
| `wiki/organisations/prochat/brand/prochat-workbench-strategy.md` | — | `f944cb0d` | canonical brand content | `organizations/prochat/brand/prochat-workbench-strategy.md` |
| `wiki/organisations/prochat/brand/product-architecture.md` | — | `28249815` | canonical brand content | `organizations/prochat/brand/product-architecture.md` |
| `wiki/organisations/prochat/brand/product-naming-architecture.md` | — | `fa2f440f` | canonical brand content | `organizations/prochat/brand/product-naming-architecture.md` |
| `wiki/organisations/prochat/brand/product-roadmap.md` | — | `9088dd96` | canonical brand content | `organizations/prochat/brand/product-roadmap.md` |
| `wiki/organisations/prochat/brand/product-strategy.md` | — | `66c1a198` | canonical brand content | `organizations/prochat/brand/product-strategy.md` |
| `wiki/organisations/prochat/brand/public-platform-roadmap.md` | — | `5ac4d6ba` | canonical brand content | `organizations/prochat/brand/public-platform-roadmap.md` |
| `wiki/organisations/prochat/brand/public-platform-strategy.md` | — | `3ba58d16` | canonical brand content | `organizations/prochat/brand/public-platform-strategy.md` |
| `wiki/organisations/prochat/brand/README.md` | — | `847ef3df` | brand area README | `organizations/prochat/brand/README.md` |
| `wiki/organisations/prochat/brand/website-build-contract.md` | — | `ac29be90` | canonical brand content | `organizations/prochat/brand/website-build-contract.md` |
| `wiki/organisations/prochat/brand/website-visual-motion-system.md` | — | `463a5d1d` | canonical brand content | `organizations/prochat/brand/website-visual-motion-system.md` |

#### wiki/organisations/prochat/playbooks/ — 5 files

| Source path | SHA-256 | Classification | Target |
|-------------|---------|----------------|--------|
| `wiki/organisations/prochat/playbooks/ai-business.md` | `802c8af7` | canonical playbook | `organizations/prochat/playbooks/ai-business.md` |
| `wiki/organisations/prochat/playbooks/assets/Avatar-Niche-Worksheet.docx` | `a3cd0399` | supporting asset | `organizations/prochat/playbooks/assets/Avatar-Niche-Worksheet.docx` |
| `wiki/organisations/prochat/playbooks/README.md` | `c7718a68` | playbooks README | `organizations/prochat/playbooks/README.md` |
| `wiki/organisations/prochat/playbooks/saas-reference.md` | `a414e257` | canonical reference | `organizations/prochat/playbooks/saas-reference.md` |
| `wiki/organisations/prochat/playbooks/waas-to-saas.md` | `3d9e4ab3` | canonical reference | `organizations/prochat/playbooks/waas-to-saas.md` |

#### wiki/organisations/prochat/youtube/ — 14 files

| Source path | SHA-256 | Classification | Target |
|-------------|---------|----------------|--------|
| `wiki/organisations/prochat/youtube/archive/YouTube-Money-Plan.pdf` | `65184f74` | historical research asset | `organizations/prochat/youtube/archive/YouTube-Money-Plan.pdf` |
| `wiki/organisations/prochat/youtube/channel/channel-description.md` | `22ca1f5c` | canonical channel content | `organizations/prochat/youtube/channel/channel-description.md` |
| `wiki/organisations/prochat/youtube/channel/channel-starting-point.md` | `fd994c1b` | canonical channel content | `organizations/prochat/youtube/channel/channel-starting-point.md` |
| `wiki/organisations/prochat/youtube/channel/playbook.md` | `c0a9ce3f` | canonical playbook | `organizations/prochat/youtube/channel/playbook.md` |
| `wiki/organisations/prochat/youtube/channel/README.md` | `36a269aa` | channel README | `organizations/prochat/youtube/channel/README.md` |
| `wiki/organisations/prochat/youtube/channel/roadmap.md` | `e53d477f` | canonical roadmap | `organizations/prochat/youtube/channel/roadmap.md` |
| `wiki/organisations/prochat/youtube/channel/scripts/001` | `cd173d72` | video script | `organizations/prochat/youtube/channel/scripts/001` |
| `wiki/organisations/prochat/youtube/channel/scripts/002` | `298b2548` | video script | `organizations/prochat/youtube/channel/scripts/002` |
| `wiki/organisations/prochat/youtube/channel/scripts/004` | `4b5e1bdd` | video script | `organizations/prochat/youtube/channel/scripts/004` |
| `wiki/organisations/prochat/youtube/channel/scripts/005` | `e725ae0c` | video script | `organizations/prochat/youtube/channel/scripts/005` |
| `wiki/organisations/prochat/youtube/channel/scripts/009` | `c1090b45` | video script | `organizations/prochat/youtube/channel/scripts/009` |
| `wiki/organisations/prochat/youtube/channel/video-template.md` | `1825b07f` | canonical template | `organizations/prochat/youtube/channel/video-template.md` |
| `wiki/organisations/prochat/youtube/channel/visual-style-guide.md` | `57111e83` | canonical style guide | `organizations/prochat/youtube/channel/visual-style-guide.md` |
| `wiki/organisations/prochat/youtube/README.md` | `936f486a` | youtube README | `organizations/prochat/youtube/README.md` |

#### wiki/organisations/ — 1 file (collision)

| Source path | SHA-256 | Classification | Target | Resolution |
|-------------|---------|----------------|--------|------------|
| `wiki/organisations/README.md` | `ace2f70d` | legacy PARA-era stub | `history/legacy-wiki/organisations/README.md` | **Differing collision** with `organizations/README.md` (`2464cece`). Canonical target wins; wiki version moved to `history/legacy-wiki/`. |

#### wiki/organisations/prochat/ — 1 file (untracked, deleted)

| Source path | SHA-256 | Classification | Disposition |
|-------------|---------|----------------|-------------|
| `wiki/organisations/prochat/.DS_Store` | `18c1cd88` | macOS local metadata — untracked | deleted |

#### wiki/areas/personal-identity/ — 3 files

| Source path | SHA-256 | Classification | Target |
|-------------|---------|----------------|--------|
| `wiki/areas/personal-identity/profile.md` | `f5a02b55` | canonical personal identity profile | `people/steve/personal-identity/profile.md` |
| `wiki/areas/personal-identity/README.md` | `d68fb01e` | personal-identity area README | `people/steve/personal-identity/README.md` |
| `wiki/areas/personal-identity/theology.md` | `7e15e89f` | canonical faith convictions | `people/steve/personal-identity/theology.md` |

#### wiki/ personal knowledge — 3 files

| Source path | SHA-256 | Classification | Target |
|-------------|---------|----------------|--------|
| `wiki/family.md` | `c6ebe7a8` | personal durable knowledge | `knowledge/personal/family.md` |
| `wiki/finance.md` | `006a6540` | personal durable knowledge | `knowledge/personal/finance.md` |
| `wiki/health.md` | `b9a1ae34` | personal durable knowledge | `knowledge/personal/health.md` |

#### wiki/log.md — 1 file

| Source path | SHA-256 | Classification | Target |
|-------------|---------|----------------|--------|
| `wiki/log.md` | `5b22cf75` | historical proposal/compilation ledger | `inbox/processed/legacy-wiki-proposal-log.md` |

#### wiki/ root navigation stubs — 3 files → history/legacy-wiki/

| Source path | SHA-256 | Classification | Target |
|-------------|---------|----------------|--------|
| `wiki/index.md` | `9bb4fb16` | legacy navigation index stub | `history/legacy-wiki/index.md` |
| `wiki/people.md` | `4ba84033` | legacy people stub | `history/legacy-wiki/people.md` |
| `wiki/README.md` | `f8386085` | legacy compatibility-only README | `history/legacy-wiki/README.md` |

#### wiki/.DS_Store — 1 file (untracked, deleted)

| Source path | SHA-256 | Classification | Disposition |
|-------------|---------|----------------|-------------|
| `wiki/.DS_Store` | `fff16b87` | macOS local metadata — untracked | deleted |

### 2.2 Before/after counts

| Root | Before files | Before bytes | After files | After bytes |
|------|-------------|-------------|------------|------------|
| `wiki/` | 60 | 1,460,354 | 0 (absent) | 0 |
| `organizations/prochat/brand/` | 0 (absent) | 0 | 28 | — |
| `organizations/prochat/playbooks/` | 0 (absent) | 0 | 5 | — |
| `organizations/prochat/youtube/` | 0 (absent) | 0 | 14 | — |
| `people/steve/personal-identity/` | 0 (absent) | 0 | 3 | — |
| `knowledge/personal/` | 0 (absent) | 0 | 3 | — |
| `inbox/processed/` (log added) | existing | existing | +1 | — |
| `history/legacy-wiki/` | 0 (absent) | 0 | 4 | — |

Note: 2 untracked `.DS_Store` files deleted, not preserved. 58 tracked files moved. 1 collision resolved (canonical target retained; wiki version moved to `history/legacy-wiki/`).

**Accounting verification (2026-08-07):** `git ls-tree -r --name-only 8a5aabc -- wiki/` returns 58 tracked files. `git diff-tree --no-commit-id -r --name-status 272cd03` confirms 58 deletions from `wiki/` and 58 additions to destination paths. The report previously stated 57; corrected to 58. The discrepancy was a counting error in the original closeout narrative.

### 2.3 Collision report

| Source | Target | Type | Resolution |
|--------|--------|------|------------|
| `wiki/organisations/README.md` | `organizations/README.md` | **Differing** | Canonical `organizations/README.md` retained. Wiki version moved to `history/legacy-wiki/organisations/README.md`. Both hashes recorded: wiki=`ace2f70d`, canonical=`2464cece`. |

No other collisions. All other target paths were absent before migration.

### 2.4 Hash verification

- Method: SHA-256 on target files after `git mv`
- Verified: representative sample across all categories (brand, playbooks, youtube, personal-identity, personal-knowledge, log, legacy-wiki stubs) — all PASS
- Full verification: all moves executed via `git mv` which guarantees byte-identical transfer

### 2.5 Active-reference updates

| File | Change |
|------|--------|
| `system/agent-context/map.md` | Removed `wiki/` and `wiki/log.md` pending entries; added migrated history paths; removed `wiki/index.md` fallback from search order; removed `wiki/log.md` from write policy |
| `system/agent-context/rules.md` | Removed `wiki/log.md` compatibility ledger note; updated archive pending reference to Phase 3 |
| `system/agent-context/maintenance.md` | Removed `wiki/` compatibility output entries; removed `wiki/index.md` fallback; removed `wiki/log.md` compatibility surface |
| `system/folder-contract.md` | Updated wiki rows to record Phase 2 complete; added `wiki/` root row; updated version date; updated documentation compatibility note; updated root write rule note |
| `home.md` | Removed `wiki/log.md` compatibility reference; updated target structure table with Phase 2 migration notes |
| `system/evals/context-expectations.yaml` | Bulk-replaced all `wiki/areas/personal-identity/` → `people/steve/personal-identity/` (19 occurrences); all `wiki/organisations/prochat/brand/` → `organizations/prochat/brand/` (33 occurrences) |

### 2.6 Remaining wiki/ references (classified)

All remaining `wiki/` text in active documents is classified as migration documentation or explicit negative assertion — none are active readers, writers, or navigation targets.

| File | Reference type | Classification |
|------|---------------|----------------|
| `system/agent-context/map.md` | historical path records | migration documentation |
| `home.md` | migrated-from path descriptions | migration documentation |
| `system/folder-contract.md` | compatibility table rows + negative assertion | migration documentation + explicit negative assertion |
| Historical reports under `system/reports/` | prior batch evidence | historical evidence |
| `history/legacy-wiki/README.md` | self-referential legacy README | historical evidence |

### 2.7 Rollback instructions

To roll back Phase 2 entirely:

```bash
git revert HEAD --no-edit
```

The Phase 1 commit (`8a5aabc`) is the clean pre-Phase-2 restore point.

---

## Phase 3 — `archive/`

**Status:** complete — 2026-08-07

### 3.1 Pre-migration inventory

Total: 846 files, 1,952,280 bytes (independently verified; matches prior audit).

- 841 tracked files: `historical-archive` classification → moved to `history/archive/`
- 5 untracked `.DS_Store` files: `local-metadata` classification → deleted

`.DS_Store` locations deleted:
- `archive/.DS_Store`
- `archive/old/legacy-06-resources/.DS_Store`
- `archive/old/legacy-06-resources/research/.DS_Store`
- `archive/old/legacy-03-projects/04-tasks/.DS_Store`
- `archive/old/legacy-06-resources/research/notes/.DS_Store`

Complete machine-readable manifest: `system/reports/mind-legacy-root-migration-archive-manifest.jsonl` (846 records).

### 3.2 Filesystem artifact: empty `wiki/` directory tree

The `wiki/` directory was absent from git (all files migrated in Phase 2) but retained empty subdirectory scaffolding as a filesystem artifact (12 empty directories, 0 files, all untracked). Removed with `rmdir` before beginning Phase 3 migration. Git does not track empty directories, so no git operation was required. This cleanup is recorded here as a filesystem-only change.

### 3.3 Before/after counts

| Root | Before files | Before bytes | After files | After bytes |
|------|-------------|-------------|------------|------------|
| `archive/` | 846 | 1,952,280 | 0 (absent) | 0 |
| `history/archive/` | 0 (absent) | 0 | 841 | 1,921,540 |

Note: 5 untracked `.DS_Store` files deleted (30,740 bytes), not preserved. 841 tracked files moved.

### 3.4 Collision report

**No collisions.** `history/archive/` was absent before migration. No existing target file was overwritten. Manifest confirmed 0 collision entries.

### 3.5 Hash verification

- Method: SHA-256 on target files after `git mv`; compared against manifest-recorded source hashes
- Verified: **841/841 SHA-256 matches — all PASS**
- Deleted (`.DS_Store`): 5 files; deleted, not preserved, no SHA-256 required

### 3.6 Active-reference updates

| File | Change |
|------|--------|
| `system/folder-contract.md` | Updated `archive/` row to record Phase 3 complete; updated documentation compatibility note; updated root write rule; version bumped to 3.0 |
| `system/agent-context/map.md` | Changed `archive/` pending entry to `history/archive/` migrated 2026-08-07 |
| `system/agent-context/rules.md` | Changed `archive/` pending note to reflect Phase 3 complete |
| `system/agent-context/maintenance.md` | Removed `archive/` compatibility-output section (was pending Phase 3) |
| `home.md` | Updated target structure table: `archive/ pending Phase 3` → `history/archive/ migrated Phase 3` |
| `system/reports/mind-legacy-root-migration-closeout.md` (this file) | Phase 2 accounting corrected (57→58 tracked files); metadata version bumped to 2.0 (Phase 2); Phase 3 section populated |

### 3.7 Remaining `archive/` references (classified)

| File | Reference | Classification |
|------|-----------|----------------|
| `system/folder-contract.md` | `archive/` in compatibility table | migration documentation — records completed status |
| `system/reports/mind-legacy-root-migration-closeout.md` (this file) | all archive paths | migration documentation |
| `system/reports/mind-legacy-root-migration-archive-manifest.jsonl` | source paths begin with `archive/` | historical manifest evidence |
| Various `system/reports/` | `archive/` in historical evidence | historical evidence |
| `.graphifyignore` | `archive/` and `**/archive/` exclusion patterns | explicit negative assertion — these patterns now match `history/archive/` sub-path as well, which is the correct behavior since archived historical content should not be graphed |

No active agent-context contract, script, template, validator, runbook, or navigation document retains a live reader/writer/fallback reference to `archive/`.

### 3.8 Rollback instructions

To roll back Phase 3 entirely:

```bash
git revert HEAD --no-edit
```

The Phase 2 commit (`272cd03`) is the clean pre-Phase-3 restore point.

---

## Phase 4 — `graphify-out/`

**Status:** complete — 2026-08-07

### 4.1 Pre-deletion inventory

**Full pre-deletion root inventory (independently verified before deletion):**
- 236 files
- 322,487,070 bytes
- 0 symlinks

All files classified as:
- generated (runtime Graphify output)
- non-authoritative (not human-authored knowledge)
- rebuildable (can be regenerated from Graphify runtime)
- safe to remove (verified by Brain)

**Committed per-file manifest coverage:**
- 124 records
- 228,531,544 bytes represented
- Format: JSONL (one JSON object per line)
- Location: `system/reports/mind-legacy-root-migration-graphify-manifest.jsonl`

**Unmanifested generated portion (safely deleted under root-level SAFE_TO_REMOVE):**
- 112 files
- 93,955,526 bytes
- Classification: generated, rebuildable, deleted under root-level evidence (no individual per-file hashes recorded)

### 4.2 Deletion verification

- Method: Workbench mutation executor with explicit confirmation token `confirm:mind:delete_directory:graphify-out/`
- Result: Deletion succeeded; `graphify-out/` verified absent
- Workbench response: `"status": "deleted", "existsAfter": false`

### 4.3 Manifest aggregate

| Metric | Full Root | Committed Manifest | Unmanifested |
|--------|-----------|-------------------|--------------|
| File count | 236 | 124 | 112 |
| Total bytes | 322,487,070 | 228,531,544 | 93,955,526 |
| Format | — | JSONL | — |
| Manifest SHA-256 | — | `70f45c8587e0fc9738c58299acb2e02bdcc8b14ef225196c14189b2346886a8e` | — |

### 4.4 Deletion justification

Brain declared `graphify-out/` at the root level:
- SAFE_TO_REMOVE
- generated
- rebuildable
- externally unused
- not an active fallback

The entire root was independently classified generated, rebuildable, non-authoritative, and SAFE_TO_REMOVE before deletion. 

The 124 files with individual manifest records are all verified safe for deletion. The remaining 112 generated files (no individual hashes) were deleted under the root-level SAFE_TO_REMOVE evidence. No evidence of meaningful canonical knowledge loss: all files are generated output, not human-authored knowledge.

**Audit-evidence note:** The committed per-file manifest covers 124 of the 236 files (52.5% by count, 70.9% by bytes). The 112 unmanifested files were safely deleted under the verified root-level SAFE_TO_REMOVE classification but were not individually recorded in the committed manifest. This represents an audit-evidence limitation, not a claim that those files were authoritative or non-redundant.

### 4.5 Remaining `graphify-out/` references (classified)

| File | Reference | Classification |
|------|-----------|----------------|
| `.graphifyignore` | `graphify-out/` directory | explicit negative assertion — ensures accidental runtime reintroduction prevented |
| `system/generated-output-policy.md` | "graphify-out" text mentions | policy documentation — records status as retired |
| `system/graphify-strategy.md` | "graphify-out" path references | operational documentation — records runtime behavior |

No active agent-context contract, script, template, validator, runbook, or navigation document retains a live reader/writer/fallback reference to `graphify-out/`.

### 4.6 Rollback instructions

`graphify-out/` was generated output, not canonical Mind content. To restore:

```bash
# Regenerate via Graphify runtime (Brain responsibility, not Mind operation)
# Directory is not managed by git and contains no durable knowledge.
```

---

## Phase 5 — Final active-reference cleanup

**Status:** complete — 2026-08-07

### 5.1 Repository-wide reference scan

Inspected all forward-looking Mind authority documents:
- `system/folder-contract.md`
- `system/generated-output-policy.md`
- `system/graphify-strategy.md`
- `system/graph-visualization-contract.md`
- `system/agent-context/00-memory-map.md`
- `system/agent-context/00-current-context.md`
- `system/agent-context/map.md`
- `system/agent-context/rules.md`
- `system/agent-context/maintenance.md`
- `system/README.md`
- `home.md`
- `.graphifyignore`
- `system/evals/context-expectations.yaml`
- active scripts, validators, templates, routing documents, navigation documents

### 5.2 Remaining references to all six retired roots (classified)

| Root | File | Reference | Classification |
|------|------|-----------|----------------|
| `capture/` | `system/folder-contract.md` | compatibility table | migration documentation |
| `capture/` | `system/reports/` | historical reports | historical evidence |
| `live/` | `system/folder-contract.md` | compatibility table | migration documentation |
| `live/` | `system/reports/` | historical reports | historical evidence |
| `sources/` | `system/reports/` | historical reports | historical evidence |
| `wiki/` | `system/folder-contract.md` | compatibility table | migration documentation |
| `wiki/` | `system/reports/` | historical reports | historical evidence |
| `archive/` | `system/folder-contract.md` | compatibility table | migration documentation |
| `archive/` | `.graphifyignore` | `**/archive/` pattern | explicit negative assertion |
| `archive/` | `system/reports/` | historical reports | historical evidence |
| `graphify-out/` | `.graphifyignore` | `graphify-out/` pattern | explicit negative assertion |
| `graphify-out/` | `system/generated-output-policy.md` | policy text | operational documentation |
| `graphify-out/` | `system/graphify-strategy.md` | strategy text | operational documentation |

### 5.3 Active-reference classification verification

✓ No remaining reference functions as:
- active writer (all legacy roots absent from git)
- active reader (no active script/validator reads from legacy paths)
- authority source (all legacy content migrated or deleted)
- fallback (all fallbacks updated to new canonical paths)
- navigation destination (all navigation stubs migrated to history/)
- command target (no command operates on legacy roots)
- output destination (all output paths updated to active roots)
- generated-output requirement (Graphify runtime is Brain-owned)

✓ All `.graphifyignore` patterns documented as defensive exclusions preventing accidental reintroduction, not as active output contracts.

### 5.4 Graphify policy update

Operational generated snapshots explicitly out-of-scope for canonical Mind authority:
- Old compatibility snapshot `graphify-out/` retired
- `graphify-out/` is not a canonical Mind root
- Operational generated snapshots belong outside canonical Mind authority (Brain-runtime responsibility)
- Brain remains responsible for Graphify runtime/execution behavior, not Mind
- Pattern exclusions in `.graphifyignore` are defensive, not contractual

### 5.5 Remaining historical references (verified safe)

Historical reports, tables, and documentation referencing retired roots serve migration and audit purposes only:
- No active system depends on these references
- All active navigation, readers, writers, and outputs have been migrated
- Historical reports are append-only; their content is not re-evaluated for each runtime
- Rollback/history references are preserved for recovery evidence only

---

## Summary

**Status:** Phases 1–5 complete — final version

**Completion date:** 2026-08-07

**All six legacy roots retired:**
- ✓ `capture/` (Phase 1)
- ✓ `live/` (Phase 1)
- ✓ `sources/` (Phase 1)
- ✓ `wiki/` (Phase 2)
- ✓ `archive/` (Phase 3)
- ✓ `graphify-out/` (Phase 4)

**Verification:**
- ✓ No meaningful data lost (all 841 archive records migrated with verified SHA-256 hashes)
- ✓ All deletion dispositions recorded
- ✓ Collision resolutions documented
- ✓ Protected-path verification complete (ten local modifications untouched)
- ✓ `tasks.md` remained untouched and remains retired/non-authoritative; `kanban.md` is sole current human task authority
- ✓ Roadmap milestones not reopened (legacy-root cleanup is post-closeout operational housekeeping)
- ✓ All active references updated to new canonical paths
- ✓ All remaining references classified as historical or defensive

**Final canonical root structure:**
- `inbox/` (active capture/processing)
- `organizations/` (canonical business/ministry context)
- `projects/` (active outcomes)
- `repos/` (repository context)
- `people/` (personal and organizational)
- `faith/` (theology and ministry)
- `knowledge/` (durable non-faith knowledge)
- `resources/` (research and references)
- `history/` (completed and archived material)
- `system/` (AI and operational contracts)

**Git history is authoritative for the commit containing this closeout document; this document does not embed its own commit SHA.**
