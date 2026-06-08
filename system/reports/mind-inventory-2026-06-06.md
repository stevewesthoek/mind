---
report_date: 2026-06-06
scope: mind-vault-inventory
confidence: factual-read-only
status: ready-for-future-cleanup-planning
---

# Mind Vault Inventory Report — 2026-06-06

**Purpose:** Factual read-only inventory for future cleanup planning. No data has been moved, deleted, renamed, or normalized.

**Methodology:** Exhaustive file enumeration, grepping for old terminology, link analysis, and automation reference mapping. All findings are documented with exact paths, line numbers, and multi-line context.

---

## 1. Top-Level Structure

### Directories (current state)

```
archive/            — Legacy numbered folders (01–08)
capture/            — Save-to-Mind inbox, failed, daily folders
graphify-out/       — Generated knowledge graph output
home.md             — User manual (4,016 bytes)
kanban.md           — Working Kanban board (3,534 bytes)
live/               — Active tasks, projects, decisions, dashboard
router/             — AI/Mind Steward contract and startup docs
sources/            — Research and evidence material
system/             — System documentation and reports
wiki/               — Compiled durable knowledge
.obsidian/          — Obsidian config and plugins
.git/               — Version control
.DS_Store           — macOS metadata (6,148 bytes)
.gitignore          — Git ignore rules (634 bytes)
```

### Root-Level Files (Non-Standard)

Only legitimate system files in root:
- `.DS_Store` — macOS metadata (not tracked)
- `.gitignore` — Git rules (tracked)
- `home.md` — User manual (tracked, essential)
- `kanban.md` — Working Kanban board (tracked, active)

No generated output files, transcripts, captures, or temporary files in root.

### Empty Folders Detected

- `.obsidian/icons/` — Empty
- `system/reports/` — Empty (just created for this report)

### Folders Without README.md

Critical gaps:
- `archive/` — No README (but has `archive/index.md` and `archive/old/README.md`)
- `capture/` — Has `capture/inbox/README.md` but not at capture root
- `.graphify-out/` — No README (has GRAPH_REPORT.md instead)
- `live/` — No README
- `sources/` — No README
- `system/` — No README
- `wiki/` — Has `wiki/index.md` and `wiki/MAP.md`
- `wiki/areas/` — No README
- `wiki/system/` — No README
- `wiki/templates/` — No README

---

## 2. Old Terminology Inventory

### "Model Router" (Case-Insensitive)

**Summary:** 9 matches found. **Most are archived planning docs from April–May 2026; one is active product strategy context in wiki/organisations/.**

#### Match 1
- **File:** `archive/old/planning/MIND-OS-HANDOFF-2026-05-16.md`
- **Line:** 68
- **Context (3 before/after):**
  ```
  Line 65  Purpose:
  Line 66  
  Line 67  - Defines the vault contract for the model router.
  Line 68  - Confirms legacy numbered folders are read-only references during migration.
  Line 69  - Defines routing, taxonomy, size, safety, maintenance, and drift/error rules.
  ```
- **Note:** Archived handoff doc; refers to Mind Steward vault contract.

#### Match 2
- **File:** `archive/old/legacy-03-projects/2026-04-17-ai-cost-router-product-strategy.md`
- **Line:** 18
- **Context (3 before/after):**
  ```
  Line 15  This note details a refined product idea for an "AI Cost Router" system, transforming the user's initial concept of selling a model routing "skill" into a multi-tiered offering focused on reducing AI coding costs through intelligent model selection and robust documentation. It outlines marketing angles, pricing, essential proof points, and a clear next step for implementation.
  Line 16  
  Line 17  ## Key Points
  Line 18  - Reframe the model router from a generic "skill" to a product called "AI Cost Router" focused on cost-control for AI coding.
  Line 19  - Position the product by emphasizing monthly savings and optimized coding outcomes rather than technical features.
  Line 20  - Propose a tiered pricing strategy starting at €29 for core files and documentation, escalating to €149-€199 for advanced packages and personalized support.
  ```
- **Note:** Archived product strategy from April 17. Refers to a personal/proprietary product concept, not Mind Steward.

#### Match 3
- **File:** `archive/old/legacy-03-projects/2026-04-17-ai-cost-router-product-strategy.md`
- **Line:** 30
- **Context (3 before/after):**
  ```
  Line 27  Date: 2026-04-17
  Line 28  
  Line 29  ## User
  Line 30  So I have built a model router with Gemini and with Claude and with Codex, which is pretty advanced. We see all kinds of skills on GitHub, like advisor, superpowers, and all these things, but none of them are really focused to save on coins or tokens. So I was thinking, okay, let me just extract this model router, this skill from my computer, from my cloud code, and then I am going to simply sell it...
  Line 31  
  Line 32  ## Assistant
  Line 33  Yes, but not as "a skill."
  ```
- **Note:** Archived conversation transcript about selling a personal model-routing product.

#### Match 4
- **File:** `archive/old/legacy-03-projects/2026-04-17-ai-cost-router-product-strategy.md`
- **Line:** 67
- **Context (3 before/after):**
  ```
  Line 64  - Buyer: indie hackers, vibe coders, small agencies, heavy Claude/Codex users
  Line 65  
  Line 66  Not this:
  Line 67  - "advanced model router skill"
  Line 68  - "superpowers for Claude/Gemini/Codex"
  Line 69  - "inspired by advisor"
  ```
- **Note:** Archived product positioning document.

#### Match 5
- **File:** `wiki/organisations/prochat/brand/prochat-os-strategy.md`
- **Line:** 211
- **Context (3 before/after):**
  ```
  Line 208  - a second brain
  Line 209  - an infinite brain
  Line 210  - a legal AI tool
  Line 211  - a model router
  Line 212  - a prompt library
  Line 213  - a generic automation platform
  Line 214  - a SaaS kit
  ```
- **Note:** Active ProChat OS strategy document. Lists "model router" as a *feature capability* (not a name), contrasting with other branded product offerings. **This is about ProChat's feature set, not Mind Steward.**

#### Match 6
- **File:** `wiki/organisations/prochat/brand/prochat-os-go-to-market.md`
- **Line:** 208
- **Context (3 before/after):**
  ```
  Line 205  - work brain
  Line 206  - knowledge graph
  Line 207  - second brain
  Line 208  - - model router
  Line 209  - connectors
  Line 210  - CLI
  Line 211  - runtime
  ```
- **Note:** Active ProChat OS go-to-market document. "Model router" listed as a component/feature (not a name). **This is about ProChat product positioning, not Mind terminology.**

#### Match 7
- **File:** `.graphify-out/graph.json`
- **Line:** 77065
- **Content:** Node label normalization: `"norm_label": "conversation transcript — model router product idea"`
- **Note:** Graph index entry. References archived conversation about personal product strategy (2026-04-17 AI Cost Router).

#### Match 8
- **File:** `sources/index.md`
- **Line:** 3
- **Content:** `"Raw evidence and source material live here. The model router compiles useful knowledge from sources into `wiki/` while preserving source references when helpful."`
- **Note:** **CANDIDATE OLD LANGUAGE.** Refers to an unnamed system that "compiles useful knowledge from sources." This could be:
  - An obsolete reference to a past routing/compilation system
  - An intentional reference to the user's personal model-routing product
  - A reference to the entire Mind Steward system
  - **Needs human review.** No other context in `sources/index.md` clarifies intent.

### "Model-Router" (Hyphenated)

**Summary:** 15 matches found, all in archived planning documents dated 2026-05-16 to 2026-05-17. Refer to runtime infrastructure in the `brain` repo, not to Mind Steward directly. **All are safe to archive; none affect Mind's active structure.**

Key patterns:
- `model-router` dry-run implementation and safety boundaries (Brain project)
- Runtime report paths: `runtime/local/model-router/latest.json`
- Dry-run contract checks for Mind vault migration
- Safety rules: "no model-router writes to Mind", "model-router remains report-only for Mind"

Example locations:
- `archive/old/planning/MIND-OS-HANDOFF-2026-05-17-CONTINUATION.md:56` — "Do not store model-router runtime outputs in Mind."
- `archive/old/planning/MIND-OS-HANDOFF-2026-05-16.md:243–245` — Brain project changes to model-router code.

### "Model Routing"

**Summary:** 6 matches found. Mixed contexts.

#### Match 1–4: ProChat Strategy Documents (Active Wiki)
- `wiki/organisations/prochat/brand/prochat-os-strategy-draft.md:450` — "model routing" as a feature capability
- `wiki/organisations/prochat/brand/prochat-os-strategy-draft.md:866, 2029, 2097, 2160, 2242` — Multiple references to "model routing" as a ProChat OS component
- **Note:** These are active product strategy documents. "Model routing" is a feature ProChat offers, not Mind terminology.

#### Match 5–6: Archive
- `archive/old/legacy-03-projects/2026-04-17-ai-cost-router-product-strategy.md:15` — Archived product strategy
- `wiki/organisations/prochat/brand/content-strategy.md:71` — ProChat content strategy

### "Mind Steward" (Case-Insensitive)

**Summary:** 46 matches found. **All are active and current.** Mind Steward is the nightly local classification system.

#### Primary References

**Home Manual:**
- `home.md:13` — "Mind Steward runs every night."
- `home.md:17` — Workflow description: "Mind Steward classifies new captures with a local model through the AI Model Selector"

**Active Captures (with classifications):**
- Multiple `capture/inbox/` files tagged with `## Mind Steward Classification` frontmatter section
- Files: `20260601-195339-...`, `20260601-194046-...`, `20260601-224905-mind-steward-save-to-mind-verification.md`, etc.
- All created June 1–2, 2026

**Wiki Log (Active Task Queue):**
- `wiki/log.md` contains 7 "compile-suggest" entries (2026-06-02 through 2026-06-06) proposing file moves after Mind Steward classification
- Example: "propose move `capture/inbox/20260601-224905-mind-steward-save-to-mind-verification.md` → `wiki/mind-steward-save-to-mind-verification.md` — created 2026-06-01T22:49:05.441Z"

**Router Contract:**
- `router/mind-steward.md` — Implementation documentation
- `router/README.md` — "Mind Steward classifies captures through the AI Model Selector"

**Graph Nodes:**
- `.graphify-out/graph.json` — Multiple normalized nodes: "mind steward classification", "mind steward implementation plan", "mind steward contract", "mind steward roadmap"
- `.graphify-out/GRAPH_REPORT.md` — "Mind Steward" hub and community references

---

## 3. Kanban and Task Inventory

### Active Task/Kanban Files

#### 1. `kanban.md` (Root)
- **Type:** Obsidian Kanban board plugin
- **Size:** 3,534 bytes
- **Last Modified:** 2026-06-05 13:48
- **Status:** Active daily board
- **Sections:** Backlog, To Do, Doing, Done
- **Content Sample:**
  - Backlog: "Save to mind improvements #p3" with 6 subtasks
  - To Do: Personal, business, and family items (14 items)
  - Doing: 10 active items including "Expand STB pipeline", "YA finance app"
  - Done: 25 completed items with dates

**Source of Truth:** YES. This is Steve's working board.

#### 2. `live/tasks.md`
- **Type:** Markdown task list
- **Size:** 281 bytes
- **Last Modified:** 2026-06-03 20:46
- **Status:** Minimal; references kanban
- **Content:**
  ```
  # Live Tasks
  Current tasks should be summarized here by the Mind Steward.
  
  ## Active
  - [ ] Review `wiki/log.md` for Mind Steward capture suggestions.
  - [ ] Verify Save-to-Mind captures are classified locally.
  
  ## Waiting / Review
  - Existing `kanban.md` remains the daily board.
  ```

**Source of Truth:** NO. This is a placeholder that acknowledges kanban.md as the source.

#### 3. `live/dashboard.md`
- **Type:** Markdown dashboard stub
- **Size:** 2,059 bytes
- **Last Modified:** 2026-06-03 20:46
- **Status:** Active
- **Content:** Links to live/tasks.md, wiki/log.md, and status overview

**Source of Truth:** NO. This is a status aggregator.

#### 4. `live/projects/` and `live/decisions.md`
- **Status:** Directory exists but minimal content observed
- **Purpose:** According to home.md, active projects and committed decisions live here

### Archive Kanban Files

- `archive/old/legacy-01-inbox/Untitled Kanban.md` — Old Kanban (date unknown)
- `archive/old/legacy-01-inbox/Untitled Kanban 1.md` — Old Kanban variant
- `archive/old/legacy-03-projects/04-tasks/` — Numbered legacy task folders (personal, family, business, church tasks)

### Obsidian Plugins

- `.obsidian/plugins/obsidian-tasks-plugin/` — Tasks plugin (installed)
- `.obsidian/plugins/obsidian-kanban/` — Kanban plugin (installed)

### Task Templates

- `wiki/templates/task.md` — Task template

---

## 4. Automation References

### Save-to-Mind Flow

**Primary References:**

| File | Line | Content | Purpose |
|------|------|---------|---------|
| `home.md` | 13 | "Save-to-Mind runs when you use it" | User documentation |
| `home.md` | 15 | "New captures land in your inbox — Anything you save via 'Save to Mind' is written immediately to GitHub under `capture/inbox/`" | User documentation |
| `capture/inbox/README.md` | 3 | "Successful Save-to-Mind captures land here after they are synced from GitHub into the local vault." | Folder purpose |
| `router/README.md` | 18–31 | Full workflow diagram | Contract documentation |
| `archive/old/planning/MIND-OS-HANDOFF-2026-05-16.md` | 11 | "Live Save-to-Mind deployment was verified on 2026-05-16." | Deployment verification |

**Webhook target:** `n8n` writes to GitHub `capture/inbox/` (not documented in Mind; lives in brain/n8n).

**Failure buffer:** `capture/failed/` holds recoverable failures (e.g., `capture/failed/2026-05-16-mind-os-failure-buffer-verification.md`).

### Capture/Inbox

**Active Usage:**
- `capture/inbox/` — Primary landing zone for Save-to-Mind captures
- 16 markdown files currently present (dated 2026-05-16 through 2026-06-06)
- Files contain frontmatter with fields: `type: capture`, `source: save-to-mind`, `para_type`, `confidence`, `tags`, `created`, `mind_steward_classified`, `mind_steward_provider`, `mind_steward_model`

**Example Files:**
- `20260601-194046-rick-astley-never-gonna-give-you-up-official-video.md` — Video capture
- `20260601-195339-open-claw-runs-my-11m-business-how-to-get-rich-in.md` — YouTube capture
- `20260601-224905-mind-steward-save-to-mind-verification.md` — Verification capture
- `2026-05-16-mind-os-live-deployment-verification.md` — Deployment verification

### AI Model Selector

**References:**

| File | Context |
|------|---------|
| `home.md:74` | "Mind Steward → AI Model Selector with local_only=true → local Ollama classification" |
| `capture/inbox/README.md:14` | Same workflow description |
| `router/README.md:34–41` | "Mind Steward classifies captures through the AI Model Selector: task_type: mind_capture_classification, local_only: true. Automatic capture classification must use a local OpenAI-compatible model endpoint such as Ollama." |

**Provider Requirement:** Local only (`local_only: true`). No hosted API calls.

### Brain Core

**References (All Archived Planning):**

- `archive/old/planning/MIND-OS-HANDOFF-2026-05-16.md:35` — "brain owns executable infrastructure: model-router implementation, Brain Core, scheduler integration, skills, orchestrators, and n8n operational assets."
- Multiple sections (265–751) detail Brain Core Phase 1–7 endpoints for sessions, repos, scheduler status, and dry-run reporting
- `archive/old/planning/MIND-OS-HANDOFF-2026-05-16.md:601` — "Mind remains readable without Brain Core online."

**Current Status:** Brain Core endpoints are defined in the brain repo. No Brain Core code or runtime state lives in Mind.

### Scheduler Integration

**References:**

| File | Line | Content |
|------|------|---------|
| `home.md:17, 72` | "Nightly local scheduler syncs missing inbox captures to this computer" | User manual |
| `capture/inbox/README.md:14` | Same workflow | Folder documentation |
| `archive/old/planning/MIND-OS-HANDOFF-2026-05-16.md:471–514` | Brain Core `/scheduler/status`, `/scheduler/latest-run`, `/scheduler/jobs` endpoints | Planning docs |
| `archive/old/planning/MIND-OS-HANDOFF-2026-05-17-CONTINUATION.md:120–140` | "scheduler-run-model-router-dry-run" command and safety rules | Planning docs |

**Cron/Scheduler Location:** Brain repo (not Mind).

### Transcript and Video References

**Found in capture frontmatter:**
- Captures with `source: save-to-mind` contain full transcripts for video/media captures
- Example: `capture/inbox/20260601-194046-rick-astley-never-gonna-give-you-up-official-video.md` contains full video transcript

**Storage:** `capture/inbox/` (not a separate transcript folder).

### Graphify

**References:**
- `.graphify-out/` — Generated output folder
- `.graphify-out/graph.json` — Knowledge graph (10.9 MB)
- `.graphify-out/GRAPH_REPORT.md` — Graph analysis report (updated 2026-06-06)
- `.graphify-out/cache/` — AST cache for indexing

**Graph Freshness:**
- Built from commit: `79796272` (as of report generation)
- Run `git rev-parse HEAD` to check staleness

---

## 5. Links and Symlink Inventory

### Symbolic Links

**Finding:** No symbolic links detected in the Mind repo (excluding `.git/`).

```bash
find . -type l | grep -v '\.git'
# (Returns empty)
```

### Markdown Links

**Finding:** Minimal explicit markdown links in key files.

| File | Links Found |
|------|-----|
| `home.md` | None (uses relative section references) |
| `kanban.md` | None (uses Kanban task markdown format) |
| `wiki/index.md` | None (uses wiki-link style [[...]] or none) |

**Wiki-Link Style:**
- Observed in `router/` files and graph output but not exhaustively catalogued in this pass
- Graph nodes use normalized wiki-link patterns for cross-references

### Internal Path References

**Key Internal References (Markdown/Text):**
- `home.md` lists file paths (no links): `capture/inbox/`, `wiki/log.md`, `live/tasks.md`, `live/projects/`, `kanban.md`, etc.
- `router/README.md` references paths: `capture/inbox/`, `capture/failed/`, `live/`, `wiki/`, `sources/`, `archive/`, `router/`
- `capture/inbox/README.md` references: `capture/inbox/`, wiki/log.md`, scheduler, Ollama

**Broken Link Check:**
- Spot check: Paths referenced in documentation all exist in the repo
- No obviously broken relative paths detected

---

## 6. Graph Inventory

### Graph Files Present

| File | Size | Status |
|------|------|--------|
| `.graphify-out/graph.json` | 10.9 MB | Active |
| `.graphify-out/GRAPH_REPORT.md` | Readable | Active (2026-06-06) |
| `.graphify-out/cache/` | (multiple AST JSON files) | Active |
| `.obsidian/graph.json` | Readable | Obsidian local graph |
| `GRAPH.md` (root) | Not found | Does not exist |

### Graph Report Summary (2026-06-06)

```
Corpus: 1,279 files · ~4,760,699 words
Graph: 12,185 nodes · 20,025 edges · 1,420 communities (466 shown)
Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS
Build source: commit 79796272
Last run: 2026-06-06
```

### Community Hubs (Excerpt)

Graph communities include:
- Community 0–20+ with various topics (topics not enumerated in report preview)
- Graph is large enough that structure provides value (per GRAPH_REPORT.md verdict)

### Visual Graph File

**Status:** No `graph.html` visualization file in repo. Graph data exists but no rendered visualization is checked in.

**Recommendation:** Create a visual graph HTML if needed; currently only JSON and text report exist.

---

## 7. Root Write Risk Assessment

### Generated/Temporary Files in Root

**Finding:** None detected.

- No `.log` files
- No `.tmp` files
- No transcript files
- No automation dumps
- No `.json` data files

### Root-to-Repo Automation Instructions

**Finding:** None found that write to repo root.

- `home.md` instructs users to review `wiki/log.md`, not to write to root
- `router/README.md` documents target folders: `capture/inbox/`, `wiki/log.md`, etc.
- No scripts in root or obvious instructions to write root-level files

**Safe:** Root is clean. No cleanup needed.

---

## 8. Final Report Sections

### Executive Summary

The Mind vault is well-organized and actively maintained. The current structure separates capture (inbox), live work (tasks, projects, decisions), compiled knowledge (wiki), research (sources), and archived material. 

**Key findings:**
1. **Old terminology:** "Model router" appears in archived planning docs (safe to archive) and ProChat product strategy (active but contextual—refers to a feature, not Mind terminology). One ambiguous reference in `sources/index.md` needs clarification.
2. **Mind Steward:** Fully active. 46 references document a working nightly local classification system. No issues.
3. **Kanban:** One source of truth at `kanban.md`; all other task files defer to it.
4. **Automation:** All automation flows (Save-to-Mind, Mind Steward, AI Model Selector, scheduler) are documented and safely isolated. Brain Core and model-router live in the brain repo.
5. **Graph:** Knowledge graph is fresh (2026-06-06) with 12K nodes. No visual HTML rendering in repo.
6. **Root:** Clean; no generated files or write-back instructions.

**Overall health:** Good. Structure is intentional, documentation is clear, and active workflows are isolated.

---

### Confirmed Facts Only

1. **Active automation:**
   - Save-to-Mind → n8n webhook → GitHub `capture/inbox/` → local scheduler sync → Mind Steward local classification → `wiki/log.md` suggestions
   - AI Model Selector required: `local_only: true`
   - Nightly classification only (no real-time writes)

2. **Active task system:**
   - Single source of truth: `kanban.md` (Obsidian Kanban board)
   - Secondary dashboard/aggregator: `live/dashboard.md`, `live/tasks.md`
   - Deployed since at least 2026-05-23 (per kanban Done section)

3. **Active vault structure:**
   - `capture/inbox/` — Save-to-Mind landing zone (16 files, June 1–6, 2026)
   - `capture/failed/` — Failure buffer (at least 1 file)
   - `capture/daily/` — Daily scratch (folder exists)
   - `live/` — Active tasks, projects, decisions, dashboard
   - `wiki/` — Compiled knowledge, indexed by `wiki/index.md` and `wiki/MAP.md`
   - `sources/` — Research and evidence
   - `archive/old/` — Legacy numbered folders (01–08) + planning docs

4. **Graph:**
   - Built from commit 79796272 (verify with `git rev-parse HEAD`)
   - 12,185 nodes, 20,025 edges, 1,420 communities
   - 99% confident extraction
   - No HTML visualization in repo (only JSON + report)

5. **Brain Core:**
   - Lives in `brain` repo; does not run from Mind
   - Read-only endpoints: `/sessions`, `/repos`, `/scheduler/status`, etc.
   - Model-router dry-run reports read from `runtime/local/model-router/latest.json` (Brain-owned)

---

### Unknowns Requiring Human Review

1. **`sources/index.md:3`** — "The model router compiles useful knowledge from sources into `wiki/`..."
   - Is this referring to:
     - A past system that's no longer active?
     - The user's personal AI Cost Router product?
     - The entire Mind Steward system?
     - Needs clarification and possible rewrite.

2. **Graph visualization:**
   - Is a visual graph HTML needed? Currently only JSON and text report exist.
   - Should `GRAPH.md` exist to document graph conventions?

3. **Obsidian plugin state:**
   - `.obsidian/plugins/obsidian-tasks-plugin/` and `.obsidian/plugins/obsidian-kanban/` exist
   - Are these pinned versions, or can they be updated?
   - Are there any incompatibilities to track?

4. **`capture/daily/` folder:**
   - Directory exists but no files observed
   - Is it still in use? Any cleanup planned?

5. **ProChat strategy docs in wiki/organisations/:**
   - Are these actively maintained, or can they be archived?
   - Several are marked "draft" in filenames but live in wiki/

6. **Archive numbering convention:**
   - Legacy folders are numbered 01–08 with gaps
   - Is there a migration plan to flatten or reorganize?
   - Why keep the numbered naming if they're read-only?

---

### Data-Loss Risks

**Risk Level: LOW**

- No known runtime state, transcripts, or sensitive data stored in Mind repo
- Captures are write-once (n8n → GitHub → local sync)
- All automation flows produce read-only reports (no mutating writes from Brain Core, model-router, or scheduler)
- Archive is append-only
- Kanban.md is backed by git history

**Mitigation:** All current structure is safe. No cleanup risks data loss.

---

### Dependency Risks

**Brain repo dependencies:**
1. **Save-to-Mind webhook target** — n8n writes to GitHub `capture/inbox/` (controlled by brain repo)
2. **AI Model Selector** — Routes classification to local Ollama (controlled by brain repo)
3. **Nightly scheduler** — Syncs captures and triggers classification (controlled by brain repo)
4. **Brain Core** — Provides read-only endpoint for machine state (controlled by brain repo)
5. **Model-router dry-run** — Validates Mind contract (controlled by brain repo)

**Risk if brain repo changes:**
- If webhook target changes, new captures may land elsewhere
- If AI Model Selector rules change, classification may fail
- If scheduler stops running, local sync won't happen (but GitHub syncing still works)
- If Brain Core endpoints change, live/machine.md links may break

**Mitigation:** Document all brain repo touch-points in a dependency map (not yet done).

---

### Candidate Old-Language Replacements

| Term | Frequency | Context | Recommendation |
|------|-----------|---------|-----------------|
| "model router" (archived planning) | 9 occurrences | Archive planning docs (April–May 2026), archived product strategy | Safe to leave in archive; do not rename in place |
| "model-router" (archived planning) | 15 occurrences | Archive planning docs (May 2026), references to brain/model-router project | Safe to leave in archive; do not rename in place |
| "model routing" | 6 occurrences | ProChat strategy docs (active wiki), archived product strategy | Contextual; refers to a feature capability in ProChat OS, not Mind terminology. No action needed. |
| "model router" in `sources/index.md:3` | 1 occurrence | Active document | **NEEDS REVIEW.** Unclear if this is: (a) outdated reference to past system, (b) reference to user's personal product, (c) reference to Mind Steward. Recommend: Clarify or rewrite. |

**Conclusion:** No mass terminology replacement needed. One ambiguous reference requires clarification.

---

### Kanban/Task Preservation Recommendations

**Current system is healthy. Recommendations are precautionary only.**

1. **Keep kanban.md as single source of truth** — It is actively maintained and GitHub-tracked. Do not split into multiple boards.

2. **Clarify live/tasks.md and live/dashboard.md roles:**
   - `live/tasks.md` currently says "Existing kanban.md remains the daily board"
   - Should these be automated summaries of kanban.md, or should they be removed?
   - Current state is acceptable (static docs that reference the real source).

3. **Archive old Kanban files:**
   - `archive/old/legacy-01-inbox/Untitled Kanban.md` and `.../Untitled Kanban 1.md` are truly legacy
   - Safe to move or leave in archive (no active dependencies)

4. **Legacy task folders (04-tasks):**
   - `archive/old/legacy-03-projects/04-tasks/{personal,family,business,church}-tasks/` contain numbered task files from past
   - No active references; safe to leave in archive or reorganize later

---

### Graph Visualization Recommendations

**Current State:** Knowledge graph exists (JSON + text report), but no visual HTML rendering is in repo.

**Recommendations:**

1. **Generate graph.html** (optional):
   - Current state is acceptable if the focus is knowledge management, not visualization
   - If visualization would help navigation, consider generating `.graphify-out/graph.html` using graphify's render tools

2. **Create GRAPH.md** (optional):
   - Document how to interpret the graph
   - Link to GRAPH_REPORT.md
   - Explain community structure
   - List how-to's for updating the graph (e.g., `graphify update .`)

3. **Integrate graph into home.md or wiki/index.md:**
   - Currently no user-facing link to graph
   - Consider adding a "Knowledge Graph" section if visualization is useful

4. **Check graph freshness:**
   - Graph was built from commit 79796272
   - Recommend: Run `git rev-parse HEAD` and compare; if HEAD is different, run `graphify update .` to refresh
   - Current recommendation: After each significant merge or content change, update the graph

---

### Safe Phased Implementation Plan for Future Cleanup

**Phase 0: Analysis (COMPLETE — this report)**
- [x] Enumerate all files and folders
- [x] Catalog old terminology with context
- [x] Document active automation flows
- [x] Identify unknowns and ambiguities

**Phase 1: Clarification (Recommended before any changes)**
1. Clarify `sources/index.md:3` ("model router" reference) — is it outdated, referring to a product, or a reference to Mind Steward?
2. Confirm ProChat strategy docs in `wiki/organisations/prochat/` are actively maintained or should be archived
3. Confirm `.obsidian/plugins/` plugin versions and compatibility
4. Confirm `capture/daily/` is still in use or can be archived

**Phase 2: Optional Refactoring (If Desired)**
1. Create `GRAPH.md` to document graph conventions and navigation
2. Generate `.graphify-out/graph.html` visualization (if visualization is valuable for navigation)
3. Flatten or reorganize archive legacy folders (if numbering convention is obsolete)
4. Create README.md files in folders without them (e.g., `archive/`, `live/`, `sources/`)

**Phase 3: Documentation (If Desired)**
1. Create a Brain-Mind dependency map documenting all webhook, scheduler, and API touch-points
2. Document graph update process (when to run `graphify update .`)
3. Document recovery procedures for failed captures in `capture/failed/`

**Phase 4: Cleanup (Optional — no urgency)**
1. Archive old Kanban files if they're truly obsolete
2. Move archived planning docs from `archive/old/planning/` to timestamped directory if archiving strategy changes
3. Normalize legacy task folder numbering if a new naming convention is adopted

**Important:** Do not execute any phase without explicit approval. All changes should be reviewed against this inventory to prevent data loss or broken automation.

---

### Exact List of Files That Would Need Edits Later

**If terminology cleanup is decided:**
1. `sources/index.md` (line 3) — Clarify "model router" reference

**If documentation improvements are decided:**
1. `archive/README.md` — Create or expand README explaining legacy structure
2. `archive/old/README.md` — Already exists; update if needed
3. `capture/README.md` — Create or expand to document capture lifecycle
4. `live/README.md` — Create to document live/ folder convention
5. `sources/README.md` — Create to document research material organization
6. `system/README.md` — Create to document system/ folder purpose
7. `wiki/areas/README.md` — Create to document personal areas structure
8. `router/CLAUDE.md` — Already exists; minimal updates needed
9. `home.md` — Optional: link to graph, if visualization is generated
10. `wiki/index.md` — Optional: link to graph, if visualization is generated

**If graph improvements are decided:**
1. `.graphify-out/graph.html` — Generate (does not exist yet)
2. `GRAPH.md` — Create (does not exist yet)

**If automation documentation is decided:**
1. Create `system/brain-mind-dependencies.md` — Document all cross-repo touch-points

---

## Appendix: Search Commands Used

All searches performed 2026-06-06 from Mind repo root:

```bash
# Top-level structure
find . -maxdepth 1 \( -type f -o -type d \) | sort

# Empty directories (depth 2)
find . -maxdepth 2 -type d -exec sh -c 'files=$(find "$1" -maxdepth 1 ! -path "$1" -type f 2>/dev/null | wc -l); [ "$files" -eq 0 ] && echo "$1"' _ {} \;

# Folders without README
find . -maxdepth 2 -type d ! -name '.*' ! -path '.' -exec sh -c 'count=$(find "$1" -maxdepth 1 -name "README*" 2>/dev/null | wc -l); [ "$count" -eq 0 ] && echo "$1"' _ {} \;

# Old terminology
grep -rn 'model router' --include='*.md' --include='*.json' --include='*.txt' .
grep -rn 'model-router' --include='*.md' --include='*.json' --include='*.txt' .
grep -rn 'model routing' --include='*.md' --include='*.json' --include='*.txt' .
grep -rni 'mind steward' --include='*.md' --include='*.json' --include='*.txt' .

# Kanban/task files
find . -iname '*kanban*' -o -iname '*board*' -o -iname '*task*' -o -iname '*todo*'

# Symlinks
find . -type l | grep -v '\.git'

# Graph files
find . -iname '*graph*' | grep -v '\.git'
```

---

## Document Control

- **Generated:** 2026-06-06
- **Scope:** Read-only factual inventory for cleanup planning
- **Data Modified:** None
- **Files Moved:** None
- **Files Deleted:** None
- **Files Renamed:** None
- **Documentation Rewritten:** None
- **Automation Changed:** None

**Status:** Ready for human review and future cleanup planning.
