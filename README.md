# Personal Knowledge Vault — Save to Mind

**Your personal brain system for capturing ideas and organizing work through a simple PARA model.**

---

## What This Vault Is

An Obsidian-based personal knowledge management system that automatically captures ideas from ChatGPT, classifies them using Gemini, and routes them into a simple PARA structure (Projects, Areas, Resources, Archive). You review captures, decide what to keep, then execute using the kanban board.

**The user-facing model is simple PARA:**
- **Inbox** — Temporary capture (review and decide)
- **Projects** — Active work with deadlines
- **Areas** — Ongoing responsibilities
- **Resources** — Reference material
- **Archive** — Historical reference

**Workflow:**
- **Capture**: macOS shortcut → n8n webhook → Gemini classifies → lands in inbox
- **Review**: You read inbox items, keep what's valuable
- **Route**: Automation moves captures to Projects, Areas, or Resources
- **Execute**: Drag tasks on kanban board (To Do → Doing → Done)
- **Archive**: Completed work moves to archive for historical reference

---

## The PARA Folder Structure

```
01-inbox/          ← Raw captures from ChatGPT (Gemini-classified)
                     Review these regularly. Low-quality captures → delete. Keep ones with signal.

02-strategy/       ← Strategic decisions you've committed to
                     Why? What's the decision? Constraints? Success criteria?
                     Status: draft → committed → on-hold → archived

03-projects/       ← Active projects with defined end dates
                     Container for related tasks. Timeline. Phases. Goal.

04-tasks/          ← Atomic executable work
                     One task = one file. Clear acceptance criteria.
                     Assigned to: you or AI. Status: ready → in-progress → done

05-areas/          ← Ongoing responsibilities (no end date)
                     Health, finance, ministry, business. Recurring but not time-bound.

06-resources/      ← Reference material, frameworks, how-to guides
                     Read-only. Learning material. Don't need to act on it.

07-templates/      ← Copy these when creating notes (don't edit templates themselves)
                     capture.md, strategy.md, project.md, task.md, area.md, resource.md

08-archive/        ← Completed work, organized by type
                     Queryable historical record. Preserve for future reference.
```

---

## The Core Workflow

### Step 1: Capture (Automatic)

You're in ChatGPT or elsewhere. You have an idea.
- macOS shortcut copies text
- Sends to webhook: `https://n8n.prochat.tools/webhook/mind-inbox`
- n8n receives it, classifies with Gemini, saves to inbox

### Step 2: Classify (Automatic — Gemini)

Gemini scores the capture:
- **Confidence (0-1)**: How sure about PARA type (project/area/resource)?
- **Signal Quality (0-1)**: How actionable/valuable is this?

High confidence + high signal = worth keeping  
Low either = probably delete

### Step 3: Land in Inbox (Automatic)

Capture appears in `01-inbox/` with frontmatter:
- `type: capture`
- `source: chatgpt|shortcut`
- `para_type: project|area|resource|inbox`
- `confidence: 0.0-1.0`
- `signal_quality: 0.0-1.0` (Gemini-computed quality score)
- `created: ISO 8601 timestamp` (e.g., 2026-04-18T08:26:30.198Z)
- `title: Refined title`
- `tags: []`
- `status: unrouted` (added by router on first processing)

### Step 4: Review (Manual)

1. Open `home.md` → see unprocessed inbox count
2. Read the capture note
3. Decide: Keep or delete? (If deleting, move to archive)

### Step 5: Create Strategy (Manual)

If keeping, copy template and create strategic note:
- Copy `07-templates/strategy.md` → `02-strategy/[title].md`
- Fill in: Why? Decision? Constraints? Success criteria?
- Set `status: committed` when ready

### Step 6: Create Project (Manual)

For work with a timeline:
- Create folder: `03-projects/[project-name]/`
- Copy `07-templates/project.md` → `03-projects/[project-name]/README.md`
- List phases, timeline, what needs to happen

### Step 7: Create Tasks (Manual)

For each atomic action:
- Create file: `04-tasks/[task-name].md`
- Copy `07-templates/task.md`
- Fill in: What to do? Acceptance criteria? Assigned to: you or AI?
- Link to parent project

### Step 8: Work on Kanban (Manual)

- Open `kanban.md` (Obsidian Canvas)
- Drag tasks: To Do → Doing → Done
- This is your only daily working interface

### Step 9: Archive When Done (Manual)

- Move completed tasks to `08-archive/`
- Or move entire project folder when finished

---

## File Types & Frontmatter

### Capture (auto-generated)

```yaml
---
type: capture
source: chatgpt
para_type: project|area|resource|inbox
confidence: 0.0-1.0
signal_quality: 0.0-1.0
created: YYYY-MM-DD
tags: []
---
```

**Read-only.** Just review and keep/delete.

### Strategy

```yaml
---
type: strategy
status: draft|committed|on-hold|archived
priority: 1-5
created: YYYY-MM-DD
tags: []
---
```

**Your thinking.** Why? What? Constraints? Success?

### Project

```yaml
---
type: project
status: in-progress|blocked|completed
priority: 1-5
start_date: YYYY-MM-DD
target_end_date: YYYY-MM-DD
tags: []
---
```

**Work container.** Goal? Timeline? What needs to happen?

### Task

```yaml
---
type: task
assigned_to: you|ai
status: ready|in-progress|done
priority: 1-5
due_date: YYYY-MM-DD
project: [[03-projects/project-name/README]]
tags: []
---
```

**One action.** One file. Specific acceptance criteria.

### Area

```yaml
---
type: area
tags: []
---
```

**Ongoing.** No end date. Health, finance, ministry, business.

### Resource

```yaml
---
type: resource
tags: []
---
```

**Reference.** How-to, frameworks, learning.

---

## Your Daily Workflow (5 minutes)

1. **Open `home.md`** — See today's focus, blockers, unprocessed inbox
2. **Open `kanban.md`** — See your To Do, Doing, Done columns
3. **Pick 1-3 tasks** from "To Do"
4. **Drag to "Doing"** when you start
5. **Work on it**
6. **Drag to "Done"** when finished
7. **Optional**: At end of day, move done tasks to `08-archive/`

**That's it. Everything else is reference or automation.**

---

## Weekly Review (20 minutes)

1. **Check `01-inbox/`** — Any unprocessed captures waiting?
2. **Check `02-strategy/`** — Any draft decisions ready to commit?
3. **Check `03-projects/`** — Any blocked projects? Any complete?
4. **Archive done tasks** from `04-tasks/` to `08-archive/`
5. **Check `05-areas/`** — Any ongoing areas need attention?

---

## Automation & Cadence

These automations run in the n8n Brain Bridge pipeline:

- **auto-router**: Every 1 minute — Re-routes captures based on updated Gemini classification
- **project-decomposer**: Every 5 minutes — Converts committed strategies → auto-generate project + task templates
- **kanban-syncer**: Every 10 minutes — Syncs task status between files and kanban.md

**Manual for now:** Future phases will add more automation (e.g., auto-archive done tasks).

---

## Root-Level Files (What Each Is For)

- **`README.md`** — This file. The single source of truth for how the vault works.
- **`home.md`** — Dashboard. Start here daily. See focus, blockers, inbox, quick links.
- **`kanban.md`** — Obsidian Canvas. Your working board (To Do → Doing → Done).
- **`CLAUDE.md`** — AI-facing instructions (for Claude Code when accessing this vault).

---

## Avoiding Confusion

❌ **Don't:**
- Create tasks outside `04-tasks/`
- Put strategy notes in `01-inbox/`
- Edit templates (copy them instead)
- Keep multiple kanban files (one: `kanban.md`)
- Overthink folder structure (it's fixed, use it as-is)

✅ **Do:**
- Use one kanban board
- Link tasks to projects
- Archive completed work weekly
- Trust the numbering (01-08 = folders only, files go at root)

---

## Troubleshooting

**My capture didn't appear in inbox:**
- Check `01-inbox/` exists and is readable
- Verify webhook is live: `https://n8n.prochat.tools/webhook/brain-inbox`
- Check n8n execution logs in Brain Bridge
- Try manual test via cURL or Postman

**Kanban board is out of sync:**
- Run kanban-syncer manually (every 10 minutes automatic)
- Or edit task frontmatter directly, kanban pulls from there

**I can't find an archived task:**
- Search `08-archive/` by date or keyword
- Use Obsidian search (Cmd+Shift+F)
- Check file mtime to find recent archives

**Inbox is overflowing:**
- Review `01-inbox/` with Gemini scoring in mind
- Delete low-signal captures (< 0.5 confidence AND signal)
- Move keepers to `02-strategy/` or `03-projects/`

---

## Platform-Specific Setup

**On Mac:**
- Edit in Obsidian (points to this repo)
- Obsidian Git plugin auto-commits changes
- Push to remote manually or via shortcut

**On iOS:**
- Clone this repo (200MB download)
- Open in Obsidian (syncs normally)
- Edit and push changes back via Obsidian Git
- Conflicts handled gracefully by Obsidian

---

## See Also

- **`brain/` repo** — AI infrastructure, system configs, skills
- **Brain Bridge** (`brain/operations/n8n/`) — n8n workflows (capture, classify, route)
- **Obsidian Git** — Syncs between Mac and iOS
- **Gemini API** — Classifies captures by PARA type and signal

---

**Last updated: 2026-04-17**

For questions or issues, check the troubleshooting section above, or inspect recent commits in this repo.
