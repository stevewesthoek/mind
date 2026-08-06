# Mind Legacy Root Migration Closeout

**Status:** Phase 1 complete; Phases 2–4 pending
**Version:** 1.0 (Phase 1)
**Date:** 2026-08-06
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

## Phase 2 — `wiki/` (pending)

**Status:** pending

Scope:
- `wiki/organisations/**` → `organizations/**`
- `wiki/areas/personal-identity/` → `people/steve/personal-identity/`
- `wiki/family.md`, `wiki/finance.md`, `wiki/health.md` → `knowledge/personal/`
- `wiki/log.md` → `inbox/processed/legacy-wiki-proposal-log.md`
- remaining `wiki/` files → `history/legacy-wiki/`

Prerequisites: Phase 1 complete (satisfied).

---

## Phase 3 — `archive/` (pending)

**Status:** pending

Scope:
- `archive/` → `history/archive/`

Prerequisites: Phase 1 complete (satisfied).

---

## Phase 4 — `graphify-out/` (pending)

**Status:** pending

Scope:
- Full inventory and hash record
- Deletion of generated non-authoritative output

Prerequisites: Phase 1 complete (satisfied).

---

## Phase 5 — Final active-reference cleanup (pending)

**Status:** pending

Scope:
- Remaining `wiki/`, `archive/`, `graphify-out/` references in active documents
- Full repository-wide reference scan and classification

Prerequisites: Phases 2–4 complete.
