---
type: dashboard
---

# Command Center

**Your daily starting point. Check here first.**

---

## ⚡ Quick Navigation

| What             | Where           | Purpose                                  |
| ---------------- | --------------- | ---------------------------------------- |
| **Today**       | [[TODAY]]       | Current daily focus surface              |
| **Live Dashboard** | [[live/dashboard]] | New Mind OS operating dashboard       |
| **Machine**      | [[live/machine]] | Local Brain Core status entry point       |
| **Sessions**     | [[live/sessions]] | AI session visibility surface             |
| **Video**        | [[live/video]] | Video Orchestrator visibility surface       |
| **Business**     | [[live/business]] | Sparse business operating surface        |
| **Live Tasks**   | [[live/tasks]]  | Compact current task surface             |
| **Live Projects** | [[live/projects]] | Compact current project surface       |
| **Workflows**    | [[live/workflows]] | Research, design, code, video, deploy, memory |
| **Kanban Board** | [[KANBAN]]      | Existing board; unchanged during migration |
| **System Guide** | [[README]]      | How the vault works (start here if lost) |
| **AI Entry Point** | [[AGENTS]] | Instructions for Claude Code, Codex, Gemini, and other agents |
| **AI Memory Map** | [[00-memory-map]] | Where AI should search/read for context |
| **Strategy**     | [[02-strategy]] | Internal (where captured decisions go)  |
| **Tasks**        | [[04-tasks]]    | Internal (sub-items of projects)        |
| **Projects**     | [[03-projects]] | Active projects with timelines           |
| **Inbox**        | [[01-inbox]]    | Unprocessed captures (review weekly)     |
| **Areas**        | [[05-areas]]    | Ongoing responsibilities                 |
| **Archive**      | [[08-archive]]  | Historical work (reference)              |

---

## 🎯 Today's Focus

```dataview
TABLE priority, assigned_to, due_date
FROM "04-tasks"
WHERE (status = "ready" OR status = "in-progress")
SORT priority ASC
LIMIT 5
```

**No results?** Pick a task from Kanban "To Do" column.

---

## ⚠️ Blockers (Escalate Immediately)

```dataview
LIST file.link, status, priority
FROM "04-tasks"
WHERE status = "blocked"
SORT priority DESC
```

**If anything above:** Stop. Unblock it first. Everything else waits.

---

## 📥 Inbox Backlog

```dataview
TABLE file.ctime as Created, confidence, signal_quality
FROM "01-inbox"
SORT file.ctime DESC
LIMIT 5
```

**Review this weekly.** High confidence + high signal = keep. Low either = delete.

---

## 🚀 Active Projects (Timeline)

```dataview
TABLE status, priority, target_end_date
FROM "03-projects"
WHERE status = "in-progress"
SORT target_end_date ASC
```

**Overdue?** Check blockers above. Escalate if stuck.

---

## 📋 What to Do Now

**Next 5 minutes:**
1. Open [[KANBAN]] 
2. Pick 1-3 tasks from "To Do"
3. Drag to "Doing" and work
4. Drag to "Done" when finished

**Weekly (20 min):**
- Review [[01-inbox]] — delete low-signal captures
- Check [[02-strategy]] — any draft → committed?
- Check [[03-projects]] — blocked? overdue? complete?
- Archive done tasks from [[04-tasks]] to [[08-archive]]
- Review [[05-areas]] — any need attention?

---

## 🔧 System Status

- **Capture pipeline**: n8n webhook `/mind-inbox` (automatic every time you save from ChatGPT; writes to `capture/inbox/`, and test-only failure buffering now writes to `capture/failed/`; legacy `01-inbox/` remains for historical reference)
- **Inbox classification**: Gemini (automatic, confidence + signal scores)
- **Kanban sync**: Every 10 minutes
- **Manual**: Everything else (you decide keep/delete, create strategy/project/task, execute)

**See [[README#Automation--Cadence|README → Automation & Cadence]] for details.**

---

## 🆘 Something Stuck?

- **Capture didn't appear?** Check [[capture/inbox]] or see [[README#Troubleshooting|README → Troubleshooting]]
- **Kanban out of sync?** Wait 10 min, or edit task file directly
- **Can't find something?** Search with Cmd+Shift+F or check [[08-archive]]
- **Inbox too full?** Archive low-signal captures to [[08-archive]]

---

**Last updated: {{date:YYYY-MM-DD HH:mm}}**

*For the full system guide, see [[README]].*
