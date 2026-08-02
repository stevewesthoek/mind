# M1.3 — Clean Active Mind Documentation Paths

**Date:** 2026-07-12
**Task:** `M1.3 — Clean active Mind documentation paths`
**Verdict:** **BLOCKED — five-file classification complete; full tracked-Markdown scope not yet verified**

## Scope completed in this run

This continuation was explicitly limited to reading and classifying:

- `capture/README.md`
- `live/README.md`
- `wiki/README.md`
- `resources/index.md`
- `resources/README.md`

Brain was inspected read-only. `wiki/log.md`, `kanban.md`, existing M1.1/M1.2 work, and all Brain B1.0/B1.0a/B1.0f work were preserved.

## Files inspected

- `capture/README.md`
- `live/README.md`
- `wiki/README.md`
- `resources/index.md`
- `resources/README.md`
- `system/mind-implementation-plan.md`
- Mind and Brain worktree status

## Files changed

- `capture/README.md`
  - replaced active destinations `wiki/`, `sources/`, and `live/` with canonical `knowledge/`, `resources/`, `projects/`, and `organizations/`.
- `live/README.md`
  - labeled `live/` explicitly compatibility-only;
  - replaced active intake and destination guidance with `inbox/new/`, `knowledge/`, and `resources/`;
  - removed the remaining active-use instruction for the legacy root.
- `wiki/README.md`
  - labeled `wiki/` explicitly compatibility-only;
  - replaced active `capture/inbox/`, `sources/`, `live/`, `wiki/`, and `.graphify-out/` guidance with canonical authorities;
  - removed the remaining active-use instruction for the legacy root;
  - removed an unsupported `system/generated/graph/` target after verification showed that path does not exist.
- `resources/index.md`
  - renamed the active index from Sources to Resources;
  - replaced `wiki/` and `live/` destinations with `knowledge/`, `projects/`, and relevant domain authority.
- `resources/README.md`
  - changed the `sources/` note from incomplete migration guidance to explicit historical/compatibility-only status.
- Earlier M1.3 edits already present and preserved in this run:
  - `resources/books/README.md`
  - `resources/files/README.md`
  - `resources/papers/README.md`
  - `resources/transcripts/README.md`
  - `resources/web/README.md`
  - each replaced an active `wiki/` compilation destination with `knowledge/` or the relevant domain authority.

## Exact stale-path scan

```bash
rg -n \
  'capture/inbox/?|capture/failed/?|(^|[^A-Za-z0-9])live/|(^|[^A-Za-z0-9])sources/|(^|[^A-Za-z0-9])wiki/|(^|[^A-Za-z0-9])archive/|(^|[^A-Za-z0-9])router/|(^|[^A-Za-z0-9])tasks/|wiki/organisations/|(^|[^A-Za-z0-9])\.?graphify-out/|(^|[/"'"'"'(])(01-start-here|01-current-context|02-current-context|01-memory-map|02-memory-map)\.md' \
  capture/README.md \
  live/README.md \
  wiki/README.md \
  resources/index.md \
  resources/README.md
```

## Pre-edit output and count

**Count:** 18 matching lines.

The original five-file scan contained:

- 7 lines that remain intentionally historical, compatibility-only, or automation-dependent;
- 11 active stale lines corrected by M1.3.

The 11 corrected active stale lines were:

| File | Pre-edit active stale references | Classification and action |
|---|---|---|
| `capture/README.md` | one line routing processed knowledge to `wiki/`, `sources/`, and `live/` | active stale reference; replaced with `knowledge/`, `resources/`, `projects/`, and `organizations/` |
| `live/README.md` | `capture/inbox/`; active `wiki/` and `sources/` destinations | active stale references; replaced with `inbox/new/`, `knowledge/`, and `resources/` |
| `wiki/README.md` | `capture/inbox/`, `sources/`, `live/`, two active `wiki/` references, and `.graphify-out/` | active stale references; replaced with canonical authorities or removed when no canonical generated-output path existed |
| `resources/index.md` | two lines routing compiled knowledge to `wiki/` and `live/` | active stale references; replaced with `knowledge/`, `projects/`, and the relevant domain authority |
| `resources/README.md` | incomplete-migration wording for `sources/` | active stale status wording; replaced with explicit historical/compatibility-only status while retaining the path as evidence |

## Remaining-match classification

| Match | Classification | Rationale |
|---|---|---|
| `resources/README.md:9` — `sources/` | compatibility-only | The line explicitly says remaining references are historical, compatibility-only, or local metadata. |
| `live/README.md:9` — `live/` | compatibility-only | The file is explicitly labeled a compatibility-only legacy surface and this line describes fallback/review use. |
| `live/README.md:24` — `live/tasks.md` | compatibility-only | The line explicitly limits this surface and denies source-of-truth authority. |
| `capture/README.md:15` — `capture/inbox/` | explicitly historical | Located in a dated migration-status section describing completed movement. |
| `capture/README.md:22` — `capture/inbox/` | explicitly historical | Documents the completed result of the migration. |
| `capture/README.md:27` — `capture/inbox/` | compatibility-only | Explicitly states the retired path receives no new writes. |
| `capture/README.md:28` — `capture/failed/` | active automation dependency | Live failed-routing migration remains postponed with Brain B1.0a; the documentation correctly records the current compatibility dependency and was not changed. |

No match in these five files remained ambiguous.

## Post-edit output and count

**Count:** 7 matching lines.

```text
capture/README.md:15:**Action taken:** All 28 active captures from capture/inbox/ were moved out:
capture/README.md:22:**Result:** capture/inbox/ is now empty. No active capture files remain here.
capture/README.md:27:- `capture/inbox/` receives no new captures (no automation writes here anymore).
capture/README.md:28:- `capture/failed/` remains unchanged; failure routing is future work (separate batch).
resources/README.md:9:Compatibility note: active source material now belongs under `resources/`; any remaining `sources/` references are historical, compatibility-only, or local metadata.
live/README.md:9:The primary machine/runtime cockpit is Brain Console. The files in `live/` are Markdown fallback and review surfaces, not the source of every runtime fact.
live/README.md:24:`live/tasks.md` may summarize current attention or Mind Steward suggestions, but it must not be treated as the complete task database.
```

**Delta:** 18 → 7 (`-11`). Every remaining line has an allowed explicit classification; no unexplained active stale reference remains in this five-file slice.

## Canonical-target verification

Verified existing targets referenced by the five edited files:

```text
knowledge=true
resources=true
projects=true
organizations=true
kanban.md=true
inbox/new=true
faith/resources=true
```

A proposed target `system/generated/graph/` returned `false`; that unsupported reference was removed rather than creating or inventing a path.

## Security verification

Focused scan over all ten M1.3 documentation files changed so far:

```json
{
  "findings": []
}
```

## Active automation findings

- `capture/failed/` remains an active compatibility dependency until the already-prepared Brain B1.0a controlled workflow migration can be deployed through the guarded Workbench update capability.
- M1.3 did not modify this automation-dependent reference.

## Preservation checks

- Brain was inspected read-only; no Brain action modified a file.
- `wiki/log.md` remained modified exactly as part of the pre-existing worktree baseline and was not read for editing or changed by M1.3.
- `kanban.md` and all existing M1.1/M1.2 changes were preserved.
- No automation, application code, infrastructure, credentials, generated output, folder structure, or content location was modified.

## Second bounded classification batch

Files inspected:

- `faith/resources/bible/README.md`
- `resources/research/README.md`
- `resources/research/business/README.md`
- `organizations/prochat/legal/README.md`
- `live/video.md`

Exact scan result before any batch edit:

```text
resources/research/business/README.md:7:Promote committed decisions to `02-strategy/organisations/<org>/` and actions to `04-tasks/`.
organizations/prochat/legal/README.md:130:wiki/organisations/prochat/brand/
faith/resources/bible/README.md:7:Promote canonical Yeshua Academy truth to `02-strategy/organisations/yeshua-academy/` and executable follow-up to `04-tasks/`.
resources/research/README.md:7:Promote settled conclusions to `02-strategy/`, executable work to `04-tasks/`, and active delivery work to `03-projects/`.
live/video.md:26:wiki/organisations/prochat/brand/prochat-os-strategy.md
```

Pre-edit match count: `5`.

Classification:

- `faith/resources/bible/README.md:7` — active stale reference. Verified candidate targets exist: `organizations/yeshua-academy/` and `kanban.md`.
- `resources/research/README.md:7` — active stale reference. Verified candidate targets exist: `knowledge/`, `projects/`, and `kanban.md`.
- `resources/research/business/README.md:7` — active stale reference. Verified candidate targets exist: `organizations/` and `kanban.md`.
- `organizations/prochat/legal/README.md:130` — ambiguous. The folder contract marks `wiki/organisations/` retired, but current ProChat authority documents still explicitly describe `wiki/organisations/prochat/brand/` as canonical.
- `live/video.md:26` — ambiguous. The referenced `wiki/organisations/prochat/brand/prochat-os-strategy.md` file does not exist, and no authoritative replacement was found.

Because the user required an immediate stop on ambiguity, no file in this batch was edited. Post-edit match count therefore remains `5`.

Verified path existence:

```text
organizations/yeshua-academy=true
organizations=true
knowledge=true
projects=true
kanban.md=true
wiki/organisations/prochat/brand=true
wiki/organisations/prochat/brand/prochat-os-strategy.md=false
```

## Unresolved blockers

The complete M1.3 acceptance condition covers all tracked Markdown outside `history/**`, `archive/**`, and `system/reports/**`. Additional tracked Markdown remains to be classified. This batch also exposed an authority contradiction: the folder contract retires `wiki/organisations/`, while current ProChat authority documents still call `wiki/organisations/prochat/brand/` canonical, and `live/video.md` references a nonexistent strategy file beneath that root.

Therefore M1.3 cannot honestly be marked complete yet. `system/mind-implementation-plan.md` was not updated.

## Verdict

**BLOCKED.** The five-file slice is complete and verified, but the full tracked-Markdown scope remains incomplete.

## Exact next documented task

Continue M1.3 by resolving the ProChat brand-authority contradiction using only authoritative Mind documents. Determine whether `wiki/organisations/prochat/brand/` remains an active compatibility authority or has a verified canonical replacement under `organizations/prochat/` or `knowledge/`. Do not invent a replacement for the missing `prochat-os-strategy.md`. Once authority is explicit, return to this five-file batch, edit only the three confirmed stale numbered paths plus any newly verified ProChat target, rerun the identical scan, and append results. Do not start M1.4.



## Bounded batch: faith, research, legal, and video documentation

### Files inspected

- `faith/resources/bible/README.md`
- `resources/research/README.md`
- `resources/research/business/README.md`
- `organizations/prochat/legal/README.md`
- `live/video.md`

### Exact scan

```bash
rg -n \
  'capture/inbox/?|capture/failed/?|(^|[^A-Za-z0-9])live/|(^|[^A-Za-z0-9])sources/|(^|[^A-Za-z0-9])wiki/|(^|[^A-Za-z0-9])archive/|(^|[^A-Za-z0-9])router/|(^|[^A-Za-z0-9])tasks/|wiki/organisations/|(^|[^A-Za-z0-9])\.?graphify-out/|(^|[/"'"'"'(])(01-start-here|01-current-context|02-current-context|01-memory-map|02-memory-map)\.md' \
  faith/resources/bible/README.md \
  resources/research/README.md \
  resources/research/business/README.md \
  organizations/prochat/legal/README.md \
  live/video.md
```

### Pre-edit output and count

**Count:** 5 matching lines.

```text
organizations/prochat/legal/README.md:130:wiki/organisations/prochat/brand/
resources/research/README.md:7:Promote settled conclusions to `02-strategy/`, executable work to `04-tasks/`, and active delivery work to `03-projects/`.
faith/resources/bible/README.md:7:Promote canonical Yeshua Academy truth to `02-strategy/organisations/yeshua-academy/` and executable follow-up to `04-tasks/`.
resources/research/business/README.md:7:Promote committed decisions to `02-strategy/organisations/<org>/` and actions to `04-tasks/`.
live/video.md:26:wiki/organisations/prochat/brand/prochat-os-strategy.md
```

### Classification

| Match | Classification | Evidence |
|---|---|---|
| `faith/resources/bible/README.md:7` | active stale reference | The numbered `02-strategy/organisations/yeshua-academy/` and `04-tasks/` paths are retired; intended canonical authorities are `organizations/yeshua-academy/` and task authority such as `kanban.md`, subject to edit after the batch blocker is resolved. |
| `resources/research/README.md:7` | active stale reference | `02-strategy/`, `03-projects/`, and `04-tasks/` are retired numbered paths; intended authorities are `knowledge/` or the relevant domain authority, `projects/`, and `kanban.md`, subject to edit after the batch blocker is resolved. |
| `resources/research/business/README.md:7` | active stale reference | `02-strategy/organisations/<org>/` and `04-tasks/` are retired; intended authorities are `organizations/<org>/` and `kanban.md`, subject to edit after the batch blocker is resolved. |
| `organizations/prochat/legal/README.md:130` | ambiguous active authority | The document actively declares `wiki/organisations/prochat/brand/` as canonical product strategy. The directory exists, but the named canonical strategy file does not. No verified replacement exists under `organizations/prochat/brand/` or `knowledge/`. |
| `live/video.md:26` | ambiguous active authority | The note actively points to `wiki/organisations/prochat/brand/prochat-os-strategy.md`. That file does not exist. `system/repo-boundaries.md` and several active maintenance documents still name the same retired path as canonical, while no migrated canonical target was found. |

### Authority verification

```text
wiki/organisations/prochat/brand=true
wiki/organisations/prochat/brand/prochat-os-strategy.md=false
organizations/prochat/brand=false
organizations/prochat/brand/prochat-os-strategy.md=false
knowledge/prochat-os-strategy.md=false
```

A bounded search found active system contracts that still identify the retired path as canonical, including `system/repo-boundaries.md`, maintenance runbooks, and freshness standards. This contradicts the M1.3 goal of replacing retired active paths and leaves the true ProChat OS strategy authority unresolved.

### Batch verdict

**BLOCKED — ambiguous canonical ProChat OS strategy authority.**

Per M1.3 rules, no file in this five-file batch was edited after the ambiguous reference was confirmed. The three clear numbered-path fixes remain pending until the authority blocker is resolved or explicitly separated into a later bounded batch.

### Post-edit count

Not run for this batch because the stop-on-ambiguity rule triggered before editing.

### Next required decision

Identify or create the canonical current ProChat OS strategy authority, then update all active contracts consistently. Do not invent a replacement path inside M1.3. Until that authority is resolved, M1.3 remains in progress and must not be marked complete.



## Authority-resolution continuation

### Proven outcome

**Outcome A — `wiki/organisations/prochat/brand/` remains a compatibility-only but authoritative ProChat brand surface.**

Evidence:

- `wiki/organisations/prochat/brand/README.md` is dated 2026-07-11 and explicitly labels itself the canonical brand index.
- `organizations/prochat/README.md` explicitly assigns company philosophy, naming, product hierarchy, positioning, and strategy authority to `wiki/organisations/prochat/brand/`.
- `organizations/prochat/growth/README.md` states that core brand truth remains there.
- `organizations/prochat/legal/README.md` uses that path as its canonical product-strategy authority.
- No verified migrated replacement exists under `organizations/prochat/` or `knowledge/`.

Therefore `organizations/prochat/legal/README.md:130` is preserved and reclassified from ambiguous to **compatibility-only authoritative reference**.

### Remaining video authority blocker

`live/video.md:26` remains **ambiguous**. The referenced file:

```text
wiki/organisations/prochat/brand/prochat-os-strategy.md
```

does not exist. Bounded searches found no existing Mind document containing the same Video Orchestrator strategy, roadmap, cost controls, S3 layout, service boundaries, metadata contract, and architecture authority. No replacement was invented and `live/video.md` was not edited.

### Verified edits

The three unambiguous numbered-path references were updated:

- `faith/resources/bible/README.md`
  - `02-strategy/organisations/yeshua-academy/` → `organizations/yeshua-academy/`
  - `04-tasks/` → `kanban.md`
- `resources/research/README.md`
  - `02-strategy/` → `knowledge/`
  - `03-projects/` → `projects/`
  - `04-tasks/` → `kanban.md`
- `resources/research/business/README.md`
  - `02-strategy/organisations/<org>/` → `organizations/<org>/`
  - `04-tasks/` → `kanban.md`

All referenced canonical targets exist.

### Exact post-edit scan

The identical five-file scan returned:

```text
organizations/prochat/legal/README.md:130:wiki/organisations/prochat/brand/
live/video.md:26:wiki/organisations/prochat/brand/prochat-os-strategy.md
```

Counts:

```text
pre_edit_matches=5
post_edit_matches=2
delta=-3
```

Remaining classifications:

- `organizations/prochat/legal/README.md:130` — compatibility-only authoritative reference.
- `live/video.md:26` — unresolved ambiguous reference to a nonexistent file.

Focused secret-material scan over the three edited files returned no findings.

Brain remained read-only. `wiki/log.md`, `kanban.md`, and all prior M1.1/M1.2 work remained at their pre-batch worktree state.

### Continuation verdict

**BLOCKED on one unresolved active reference.** This bounded authority question is resolved as outcome A, and three active stale numbered paths are corrected. M1.3 remains in progress because `live/video.md` still points to a nonexistent authority and the remaining full tracked-Markdown scope has not yet been completely classified and verified.



## Video Orchestrator authority resolution

### Proven outcome

**Outcome A — an exact existing Brain strategy file is the verified canonical authority.**

Verified Brain files:

```text
projects/brain-core/docs/video-orchestrator-strategy.md
operations/runbooks/video-orchestrator-roadmap-optimistic.md
```

Evidence:

- `projects/brain-core/docs/video-orchestrator-strategy.md` is an active architecture strategy and guardrails document.
- It explicitly states that it is the top-level Video Orchestrator contract and that the roadmap and implementation plan must follow it.
- `operations/runbooks/video-orchestrator-roadmap-optimistic.md` is the current phased roadmap.
- `system/repo-boundaries.md` confirms that Brain owns implementation, architecture, runbooks, and operational planning while Mind owns durable human-facing strategy and intent.

### Exact edit

`live/video.md` previously referenced the nonexistent file:

```text
wiki/organisations/prochat/brand/prochat-os-strategy.md
```

That reference was replaced with the verified Brain paths above. The note now explicitly remains the durable Mind-side human-facing summary and does not duplicate Brain implementation details.

### Scan result

The identical stale-path expression was rerun against `live/video.md`.

```text
pre_edit_matches=1
post_edit_matches=0
delta=-1
```

Ripgrep returned exit code `1` with `matchStatus=no_matches`, which is the expected successful no-match result.

### Verification

- Both referenced Brain files were read successfully and exist.
- Brain remained read-only.
- No new Mind strategy document was created.
- No path was invented.
- `wiki/log.md` and `kanban.md` remained at their pre-batch worktree state.

### Continuation verdict

The `live/video.md` authority blocker is resolved. M1.3 remains in progress because the remaining full tracked-Markdown scope still requires classification and verification before completion can be marked.



## Canonical agent-context entry batch

Files scanned:

- `system/agent-context/AGENTS.md`
- `system/agent-context/00-start-here.md`
- `system/agent-context/00-current-context.md`
- `system/agent-context/00-memory-map.md`

The exact stale-path expression returned one pre-edit match:

```text
system/agent-context/AGENTS.md:36:- sources/research: `resources/`;
```

Classification: **active stale reference**. The label used retired `sources/` terminology while the destination was already canonical `resources/`.

Exact edit:

```text
sources/research -> resources/research
```

Post-edit scan returned no matches (`matchStatus=no_matches`, ripgrep exit code `1`, expected for a clean scan).

```text
pre_edit_matches=1
post_edit_matches=0
delta=-1
```

No other file in this four-file batch required editing.



## Agent-context maintenance batch

Files scanned:

- `system/agent-context/CLAUDE.md`
- `system/agent-context/current.md`
- `system/agent-context/implementation-plan.md`
- `system/agent-context/maintenance.md`

The exact stale-path expression returned eight matches, all in `system/agent-context/maintenance.md`:

```text
system/agent-context/maintenance.md:15:- `capture/inbox/` — historical only; retired success-intake path.
system/agent-context/maintenance.md:16:- `sources/` — compatibility-only source path during migration.
system/agent-context/maintenance.md:28:- `wiki/`
system/agent-context/maintenance.md:29:- `sources/index.md`
system/agent-context/maintenance.md:30:- `live/tasks.md`
system/agent-context/maintenance.md:31:- `live/decisions.md`
system/agent-context/maintenance.md:39:- `knowledge/index.md` after migration, with `wiki/index.md` as fallback
system/agent-context/maintenance.md:41:- `wiki/log.md` as the compatibility proposal ledger until its local edits and migration are resolved
```

Classification:

- line 15 — explicitly historical.
- line 16 — compatibility-only.
- lines 28–31 — compatibility-only outputs explicitly grouped under `Compatibility outputs during migration`.
- line 39 — compatibility fallback explicitly labeled as such.
- line 41 — compatibility proposal ledger explicitly labeled as such.

No ambiguity, active stale reference, or active automation dependency was found in this batch. No file was edited.

```text
pre_edit_matches=8
post_edit_matches=8
delta=0
```

The unchanged post-edit result is expected because every remaining match is an allowed historical or compatibility-only reference.



## Agent-context map/steward/roadmap/router batch

Files scanned:

- `system/agent-context/map.md`
- `system/agent-context/mind-steward.md`
- `system/agent-context/roadmap.md`
- `system/agent-context/router-README.md`

The exact stale-path expression returned `36` pre-edit matches.

Classification summary:

- `system/agent-context/map.md` — all matches are explicitly historical, compatibility-only, or migration fallbacks. No edits.
- `system/agent-context/router-README.md` — all matches are explicitly historical or legacy migration-reference content. No edits.
- `system/agent-context/mind-steward.md` — three active stale promotion/evidence destinations were corrected; `wiki/log.md` was preserved as an active compatibility proposal-ledger dependency.
- `system/agent-context/roadmap.md` — two active stale promotion destination lists were corrected; `wiki/log.md` was preserved as the active review queue.

Exact edits:

```text
wiki/ -> knowledge/ or the relevant canonical domain authority
live/ -> projects/, organizations/, and knowledge/
sources/ -> resources/ or faith/resources/
reviewed promotion into live/, wiki/, or sources/ -> projects/, organizations/, knowledge/, resources/, or faith/
```

Post-edit scan returned `34` matches.

```text
pre_edit_matches=36
post_edit_matches=34
delta=-2
```

Every remaining match is classified as one of:

- explicitly historical;
- compatibility-only;
- migration fallback;
- active automation dependency (`wiki/log.md` review queue/proposal ledger).

No ambiguity remains in this batch.

Canonical target verification:

```text
projects=true
organizations=true
knowledge=true
resources=true
faith=true
faith/resources=true
```

Focused secret-material scan over the two edited files and this report returned no findings.

Brain remained read-only. `wiki/log.md`, `kanban.md`, and prior M1.1/M1.2 work remained preserved.



## Agent-context README/rules/taxonomy batch

Requested files:

- `system/agent-context/README.md`
- `system/agent-context/rules.md`
- `system/agent-context/taxonomy.md`
- `system/agent-context/status.md`

`system/agent-context/status.md` does not exist and was omitted as instructed.

The exact stale-path expression returned `10` pre-edit matches across the three existing files.

Classification:

- `system/agent-context/README.md`
  - both `router/` matches are explicitly historical or compatibility-only migration references.
- `system/agent-context/rules.md`
  - `capture/failed/`, `live/projects/`, `sources/`, `wiki/log.md`, and `archive/` are each explicitly labeled compatibility-only, legacy, or pending migration verification.
- `system/agent-context/taxonomy.md`
  - three active stale routing hints were corrected:
    - `live/tasks.md` / `live/projects.md` -> `kanban.md` / `projects/`
    - `wiki/` -> `knowledge/`
    - `sources/` -> `resources/` or `faith/resources/`

Post-edit scan returned `7` matches.

```text
pre_edit_matches=10
post_edit_matches=7
delta=-3
```

Every remaining match is explicitly historical or compatibility-only. No ambiguity or active automation dependency remains in this batch.

Canonical target verification:

```text
kanban.md=true
projects=true
knowledge=true
resources=true
faith/resources=true
```

Focused secret-material scan over `system/agent-context/taxonomy.md` and this report returned no findings.

Brain remained read-only. `wiki/log.md`, `kanban.md`, prior M1.1/M1.2 work, and unrelated Mind changes remained preserved.



## Runbook/template batch

Files scanned:

- `system/runbooks/maintenance-report-pilot-runbook.md`
- `system/runbooks/mind-steward-preflight-runbook.md`
- `system/templates/area.md`
- `system/templates/capture.md`

The exact stale-path expression returned `24` pre-edit matches. The template files returned no matches.

Classification findings:

- `system/runbooks/mind-steward-preflight-runbook.md:99-100`
  - `mind/capture/inbox/` is an **active stale reference** in the validation checklist.
  - Verified current success intake: `inbox/new/`.
- `system/runbooks/maintenance-report-pilot-runbook.md`
  - `router/00-current-context.md` is an active stale path with a verified successor at `system/agent-context/00-current-context.md`.
  - `live/projects/prochat-qa-memory/STRATEGY-PLAN.md` is an active stale path with a verified successor at `projects/prochat-qa-memory/STRATEGY-PLAN.md`.
  - `wiki/organisations/prochat/brand/prochat-os-strategy.md` is **ambiguous**: the file does not exist, and this pilot runbook still calls it canonical current business strategy.
  - `live/dashboard.md` is **ambiguous**: the file does not exist. `home.md` exists, but this batch did not establish that it is a semantically equivalent replacement for the pilot's active current-state surface.
  - `wiki/log.md` remains an active compatibility proposal-ledger dependency.
  - the write-boundary reference to `capture/` is compatibility-only at the legacy root level and requires no change in this batch without a verified exact replacement for the runbook's prohibition semantics.

Exact path verification:

```text
router/00-current-context.md=false
system/agent-context/00-current-context.md=true
live/projects/prochat-qa-memory/STRATEGY-PLAN.md=false
projects/prochat-qa-memory/STRATEGY-PLAN.md=true
wiki/organisations/prochat/brand/prochat-os-strategy.md=false
live/dashboard.md=false
home.md=true
capture=true
inbox/new=true
```

Because this batch contains ambiguous active authority references, the M1.3 stop condition was triggered. No runbook or template file was edited.

```text
pre_edit_matches=24
post_edit_matches=24
delta=0
```

The unchanged post-edit count reflects the required immediate stop on ambiguity, not acceptance of the active stale references.

### Batch blocker

Before this runbook can be updated, authoritative replacements must be established for:

1. `wiki/organisations/prochat/brand/prochat-os-strategy.md` as the pilot's canonical current business strategy page;
2. `live/dashboard.md` as the pilot's active human navigation/current-state page.

The verified router and project replacements, plus `mind/capture/inbox/` -> `mind/inbox/new/`, must remain pending until those ambiguities are resolved in the same runbook batch.



## Maintenance-pilot authority resolution

### Strategy-page outcome

**Outcome C — the pilot dataset is obsolete and remains blocked pending a maintenance-contract decision.**

The missing path:

```text
wiki/organisations/prochat/brand/prochat-os-strategy.md
```

is referenced by both:

- `system/runbooks/maintenance-report-pilot-runbook.md` as the canonical current business strategy;
- `system/maintenance-report-contract.md` as the required current canonical strategy in the five-file pilot dataset.

Bounded exact searches found no existing current Mind file named or described as the equivalent ProChat OS current business strategy. A stale search-index hit for `prochat-os-strategy-draft.md` was checked against the worktree and the file does not exist. No replacement was invented.

### Dashboard outcome

**Outcome C — the pilot dataset is obsolete and remains blocked pending a maintenance-contract decision.**

The missing path:

```text
live/dashboard.md
```

is referenced by both:

- `system/runbooks/maintenance-report-pilot-runbook.md` as the active human navigation and current-state surface;
- `system/maintenance-report-contract.md` as the required active dashboard in the five-file pilot dataset.

`home.md` exists and is typed as a dashboard, but no authoritative Mind document states that it is the maintenance pilot's semantically equivalent replacement for `live/dashboard.md`. Because both the canonical contract and runbook still name the missing path, equivalence was not assumed.

### Consequence

Neither ambiguity can be resolved inside M1.3 without changing maintenance policy or inventing authority. The already verified stale replacements remain pending:

```text
router/00-current-context.md -> system/agent-context/00-current-context.md
live/projects/prochat-qa-memory/STRATEGY-PLAN.md -> projects/prochat-qa-memory/STRATEGY-PLAN.md
mind/capture/inbox/ -> mind/inbox/new/
```

No runbook or template file was edited because the user required an immediate stop if either ambiguity remained unresolved.

The four-file stale-path scan therefore remains:

```text
pre_edit_matches=24
post_edit_matches=24
delta=0
```

### Exact blocker

A separate maintenance-contract decision must replace or retire the two missing pilot-dataset authorities in both:

- `system/maintenance-report-contract.md`;
- `system/runbooks/maintenance-report-pilot-runbook.md`.

M1.3 remains incomplete and M1.4 must not start.



## System README/automation/bridge batch

Files scanned:

- `system/README.md`
- `system/automation-contract.md`
- `system/automation-roadmap.md`
- `system/brain-mind-bridge.md`

The exact stale-path expression returned `18` pre-edit matches.

Classification:

- `system/README.md` — no matches.
- `system/automation-contract.md` — every match is an active automation dependency describing the currently deployed compatibility flow (`capture/inbox/`, `capture/failed/`, `wiki/log.md`, and `live/tasks.md`). M1.3 did not change these paths because live B1.0a migration remains postponed and active automation behavior must not be rewritten as complete.
- `system/brain-mind-bridge.md` — both matches are explicitly labeled compatibility paths pending migration and live verification. No edit.
- `system/automation-roadmap.md` — four active stale future-roadmap references were corrected:
  - `capture/inbox/` candidate queue -> canonical `inbox/new/` candidates;
  - `wiki/source/task` action -> `knowledge/resource/task` action;
  - no-direct-write targets moved from `wiki/`, `sources/`, and `tasks/` to canonical `knowledge/`, `resources/`, `projects/`, and `organizations/` while preserving `kanban.md` protection;
  - approved wiki/source phases were renamed and redirected to approved knowledge/resource destinations.

The current `.graphify-out/` output references in `system/automation-roadmap.md` were preserved as active automation dependencies because the documented `tools/update-graph.sh` implementation still emits those files.

Post-edit scan returned `14` matches.

```text
pre_edit_matches=18
post_edit_matches=14
delta=-4
```

Every remaining match is one of:

- active automation dependency;
- explicitly labeled compatibility path pending migration/live verification.

No ambiguity remains in this batch.

Canonical target verification:

```text
inbox/new=true
knowledge=true
resources=true
faith/resources=true
projects=true
organizations=true
kanban.md=true
```

Focused secret-material scan over `system/automation-roadmap.md` and this report returned no findings.

Brain remained read-only. `wiki/log.md`, `kanban.md`, prior M1.1/M1.2 work, and unrelated Mind changes remained preserved.



## Generated-output and Graphify documentation batch

Files scanned:

- `system/generated-output-policy.md`
- `system/graph-visualization-contract.md`
- `system/graph-visualization-spec.md`
- `system/graphify-strategy.md`

The exact stale-path expression returned `48` matches.

Classification:

- All `.graphify-out/` and `graphify-out/` references describe the active Graphify generator, generated artifacts, regeneration commands, safety boundaries, or compatibility output locations. They are **active automation dependencies** and were preserved exactly.
- `system/generated-output-policy.md` contains two `capture/inbox/` references. They describe the currently deployed compatibility capture output and its no-delete safety rule. Because Brain B1.0a live migration remains postponed and active automation behavior must not be rewritten as complete, both are classified as **active automation dependencies**.
- No match in this batch is an unexplained active stale reference, ambiguous reference, or historical reference requiring relabeling.

No file in this batch was edited.

```text
pre_edit_matches=48
post_edit_matches=48
delta=0
```

The unchanged count is expected because every remaining match is an active generator/output or deployed compatibility dependency.

Brain remained read-only. `wiki/log.md`, `kanban.md`, prior M1.1/M1.2 work, and unrelated Mind changes remained preserved.



## Generated-output and Graphify documentation batch

Files scanned:

- `system/generated-output-policy.md`
- `system/graph-visualization-contract.md`
- `system/graph-visualization-spec.md`
- `system/graphify-strategy.md`

The exact stale-path expression returned `44` pre-edit matches.

Classification:

- `system/generated-output-policy.md`
  - two active stale `capture/inbox/` references were corrected to canonical `inbox/new/`:
    - current workflow output example;
    - safety rule for durable intake preservation.
  - all `.graphify-out/` references describe active generated-output policy and were preserved.
- `system/graph-visualization-contract.md`
  - all matches describe the active Graphify output contract, generated artifact names, or rename safety boundary. No edits.
- `system/graph-visualization-spec.md`
  - all matches describe the active renderer contract, expected generated artifacts, validation steps, and compatibility output paths. No edits.
- `system/graphify-strategy.md`
  - all matches describe active Graphify report/data/visual-output paths used by the documented AI and human workflows. No edits.

Post-edit scan returned `42` matches.

```text
pre_edit_matches=44
post_edit_matches=42
delta=-2
```

Every remaining match is an active automation dependency or generated-output compatibility reference.

Path verification:

```text
inbox/new=true
.graphify-out=false
.graphify-out/graph.json=false
.graphify-out/GRAPH_REPORT.md=false
.graphify-out/graph.html=false
tools/render-graph-html.mjs=true
```

The generated `.graphify-out/` directory is not currently present in the worktree, but the renderer, generator contract, regeneration instructions, and compatibility output policy remain active. Those references were therefore preserved rather than rewritten or removed.

Focused secret-material scan over `system/generated-output-policy.md` and this report returned no findings.

Brain remained read-only. `wiki/log.md`, `kanban.md`, prior M1.1/M1.2 work, and unrelated Mind changes remained preserved.



## Queue, philosophy, disposition, and freshness batch

Files scanned:

- `system/inbox-queue-throttle-spec.md`
- `system/infinite-brain-philosophy.md`
- `system/intake-disposition-pattern.md`
- `system/knowledge-freshness-standard.md`

The exact stale-path expression returned `12` pre-edit matches.

Classification:

- `system/infinite-brain-philosophy.md` — no matches.
- `system/inbox-queue-throttle-spec.md`
  - `capture/inbox/` discovery and queue-template paths are active stale future-spec references; canonical successor `inbox/new/` exists.
  - `capture/failed/` is an active stale future failure destination; canonical successor `inbox/failed/` exists.
  - proposed `wiki/` and `sources/` write phases are active stale future destinations; canonical successors `knowledge/`, `resources/`, and `faith/resources/` exist.
- `system/intake-disposition-pattern.md`
  - the `archive/delete` action wording is a semantic action phrase, not a filesystem-path reference; no edit required.
  - `wiki/` in the `knowledge_proposal` disposition and safety rule is an active stale destination; canonical successor `knowledge/` exists.
  - `capture/inbox/...` in the disposition template is an active stale source path; canonical successor `inbox/new/...` exists.
- `system/knowledge-freshness-standard.md`
  - `router/00-current-context.md` is an active stale example path; verified successor `system/agent-context/00-current-context.md` exists.
  - `live/projects/prochat-qa-memory/STRATEGY-PLAN.md` is an active stale example path; verified successor `projects/prochat-qa-memory/STRATEGY-PLAN.md` exists.
  - `wiki/organisations/prochat/brand/prochat-os-strategy.md` is ambiguous and missing. The standard presents it as a real canonical business-strategy page, but the file does not exist and no verified equivalent was established in this batch.

Exact path verification:

```text
system/agent-context/00-current-context.md=true
projects/prochat-qa-memory/STRATEGY-PLAN.md=true
wiki/organisations/prochat/brand/prochat-os-strategy.md=false
inbox/new=true
inbox/failed=true
knowledge=true
resources=true
faith/resources=true
```

Because the batch contains an ambiguous active authority reference, the M1.3 immediate-stop condition was triggered. No file in this batch was edited.

```text
pre_edit_matches=12
post_edit_matches=12
delta=0
```

The unchanged post-edit count reflects the required ambiguity stop, not acceptance of the confirmed active stale references.

### Batch blocker

Before this batch can be updated, the freshness standard must explicitly decide how to handle its missing `prochat-os-strategy.md` example:

1. identify an exact existing canonical strategy page;
2. mark the example explicitly historical or missing;
3. or remove the claim that it validates a real current Mind page.

Until that authority is resolved, the verified queue, disposition, router, and project-path corrections remain pending in this same batch.



## Write-test, maintenance handoff, orientation, and receipt batch

Files scanned:

- `system/InfiniteBrainWriteTest.md`
- `system/maintenance-brain-implementation-handoff.md`
- `system/orientation-brief-template.md`
- `system/processed-capture-receipt-template.md`

The exact stale-path expression returned `18` pre-edit matches.

Classification:

- `system/InfiniteBrainWriteTest.md` — no matches.
- `system/maintenance-brain-implementation-handoff.md`
  - `router/00-current-context.md` is an active stale path; verified successor `system/agent-context/00-current-context.md` exists.
  - `live/projects/prochat-qa-memory/STRATEGY-PLAN.md` is an active stale path; verified successor `projects/prochat-qa-memory/STRATEGY-PLAN.md` exists.
  - `wiki/organisations/prochat/brand/prochat-os-strategy.md` is an ambiguous active authority reference because the file does not exist.
  - `live/dashboard.md` is an ambiguous active authority reference because the file does not exist and `home.md` equivalence is not established.
  - the `archive/completion metadata` phrase is semantic wording, not a filesystem path.
  - repeated router/project/strategy/dashboard lists and the `stale-page:router/...` identifier remain part of the same blocked pilot contract.
- `system/orientation-brief-template.md`
  - `wiki/log.md` is an active compatibility proposal-ledger dependency.
  - `live/dashboard.md` is ambiguous because the file does not exist.
  - `wiki/` and `sources/` are active stale orientation destinations with verified successors `knowledge/` and `resources/`, but edits are deferred because this batch triggered the ambiguity stop condition.
- `system/processed-capture-receipt-template.md`
  - `capture/inbox/` and `capture/inbox/...` are active stale intake references; verified successor `inbox/new/` exists.
  - `wiki/log.md` is an active compatibility proposal-ledger dependency and was preserved.

Exact path verification:

```text
system/agent-context/00-current-context.md=true
projects/prochat-qa-memory/STRATEGY-PLAN.md=true
wiki/organisations/prochat/brand/prochat-os-strategy.md=false
live/dashboard.md=false
home.md=true
inbox/new=true
knowledge=true
resources=true
wiki/log.md=true
```

Because two active authority references remain ambiguous, the M1.3 immediate-stop condition was triggered. No file in this batch was edited.

The identical post-edit scan returned the same `18` matches:

```text
pre_edit_matches=18
post_edit_matches=18
delta=0
```

The unchanged count records the required ambiguity stop, not acceptance of the confirmed active stale references.

### Batch blockers

Before this batch can be edited, maintenance policy must establish exact existing authorities for:

1. `wiki/organisations/prochat/brand/prochat-os-strategy.md`;
2. `live/dashboard.md`.

The verified router, project, intake, knowledge, and resource replacements remain pending within this batch until those authorities are resolved.



## Mind roadmap/strategy/realtime/closeout batch

Files scanned:

- `system/mind-roadmap.md`
- `system/mind-strategy.md`
- `system/realtime-inbox-processing-spec.md`
- `system/session-closeout-receipt-template.md`

The exact stale-path expression returned `9` pre-edit matches.

Classification:

- `system/mind-roadmap.md` — no matches.
- `system/mind-strategy.md` — no matches.
- `system/realtime-inbox-processing-spec.md`
  - four active stale future-path references were corrected:
    - realtime-processing goal: `capture/inbox/` -> `inbox/new/`;
    - desired-flow intake: `capture/inbox/` -> `inbox/new/`;
    - failure routing: `capture/failed/` -> `inbox/failed/`;
    - validation fixture: `capture/inbox/` -> `inbox/new/`.
  - remaining `capture/inbox/` references describe the currently deployed compatibility flow and are active automation dependencies.
  - remaining `wiki/log.md` references describe the active compatibility review/proposal ledger and were preserved.
- `system/session-closeout-receipt-template.md`
  - `wiki/log.md` remains an active compatibility proposal-ledger dependency.

Post-edit scan returned `5` matches.

```text
pre_edit_matches=9
post_edit_matches=5
delta=-4
```

Every remaining match is an active automation dependency or active compatibility-ledger reference. No ambiguity remains in this batch.

Canonical path verification:

```text
inbox/new=true
inbox/failed=true
wiki/log.md=true
```

Focused secret-material scan over `system/realtime-inbox-processing-spec.md` and this report returned no findings.

Brain remained read-only. `wiki/log.md`, `kanban.md`, prior M1.1/M1.2 work, and unrelated Mind changes remained preserved.

## MS0.6 continuation — maintenance rebaseline and newly deterministic cleanup

**Date:** 2026-07-14

MS0.2 retired the unsupported single ProChat OS strategy concept, and MS0.3 established the dashboard roles. MS0.6 then rebaselined the maintenance pilot without asserting runtime state. The five-file fixture now uses:

```text
system/agent-context/00-current-context.md
projects/prochat-qa-memory/STRATEGY-PLAN.md
wiki/organisations/prochat/brand/product-strategy.md
home.md
system/automation-roadmap.md
```

The strategy path is explicitly scoped to company/product strategy; `brand/README.md` remains the index for the applicable scoped authority. `home.md` is human navigation/orientation only, not a runtime-status surface.

### Newly unblocked deterministic edits

- Rebaselined the maintenance contract, pilot runbook, handoff, and orientation template to the exact current fixture paths.
- Updated the maintenance finding example and deduplication key from `router/00-current-context.md` to `system/agent-context/00-current-context.md`.
- Updated `system/runbooks/mind-steward-preflight-runbook.md` success-intake checks to `mind/inbox/new/`.
- Updated future/documentation-only queue and disposition paths to `inbox/new/`, `inbox/failed/`, `inbox/processed/`, `history/`, `knowledge/`, and `resources/` without changing runtime behavior.
- Updated the remaining stale examples in `system/knowledge-freshness-standard.md` and `system/processed-capture-receipt-template.md` to exact existing paths.

### Current bounded scan results

| Batch | Historic pre-edit count | Current count | Remaining classification |
|---|---:|---:|---|
| Original five-file M1.3 scan | 18 | 7 | Explicit historical/compatibility references plus `capture/failed/` active automation dependency pending Brain B1.0a. |
| Runbook/template batch | 24 | 6 | Scoped ProChat brand authority, `wiki/log.md` compatibility ledger, and explicit no-write protection for legacy directories. |
| Queue/philosophy/disposition/freshness batch | 12 | 3 | Two scoped ProChat strategy references and one semantic archive/delete phrase; no stale active path remains. |
| Handoff/orientation/receipt batch | 18 | 6 | Scoped ProChat brand authority, `wiki/log.md` compatibility ledger, and one semantic archive/completion phrase. |

### Current M1.3 blockers

M1.3 remains **in progress**. The remaining blockers are not resolved by MS0.6:

1. **Brain B1.0a live failure-routing verification** — `capture/failed/` and active automation-compatibility documentation must remain unchanged until Brain provides runtime evidence.
2. **MS0.4 / Brain BS0.15 Graphify operational-path decision** — generated-output and Graphify documentation must remain unchanged until the Brain-owned operational profile/path is established.
3. **MS0.8 completion phase** — not started by instruction; it may only complete M1.3 after the relevant runtime dependencies are resolved.

No task-authority, M1.4, MS0.9, runtime, automation, or Brain work was started.

## MS0.4/MS0.7 reassessment — 2026-07-14

The exact five-file stale-path scan was rerun after MS0.4 and MS0.7:

```text
live/README.md:9,24
capture/README.md:15,22,27,28
resources/README.md:9
```

All seven matches are already classified as human-facing fallback, historical,
compatibility-only, or future failure-routing documentation. No deterministic
category-1 active replacement remains safe to edit. The broader tracked-Markdown
scan likewise contains only the previously classified categories: historical
migration records, scoped ProChat authority references, compatibility-ledger
references, explicit no-write safety text, and runtime-dependent compatibility
claims.

MS0.4 resolved the Graphify terminology blocker. MS0.7 resolved the Mind-side
capability-wording blocker. M1.3 remains **in progress** because the remaining
maintenance-pilot compatibility claims depend on Brain B1.0a live failure-route
evidence, and the instructed MS0.8 completion phase has not begun. No remaining
file was edited based on inference.
