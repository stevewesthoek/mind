---
type: dashboard
---

# Mind — User Manual

This is your personal knowledge system. Most of it runs automatically. This file tells you what happens without you, what you need to do, and where everything lives.

---

## What happens automatically (you do nothing)

**Every night, the system runs three jobs:**

1. **New captures land in your inbox** — Anything you save via "Save to Mind" (from any device, any AI session) is automatically classified and dropped into `capture/inbox/`. You do not need to file it yourself.

2. **The compile loop reads your inbox** — Every morning, each new capture has been read, classified, and a proposed action has been written to `wiki/log.md`. The file is never moved automatically. You review and decide.

3. **Memory context is refreshed** — All AI sessions (Claude, Codex, Gemini) are updated with your latest memory index overnight. When you start a session the next day, all three AIs already know what was saved.

---

## What you need to do (your daily interaction)

**One regular review: `wiki/log.md`**

Open `wiki/log.md`. Each line added by the system looks like this:

> `2026-05-22 — compile-suggest — **Title** (project page) → propose move capture/inbox/filename.md → live/projects/slug.md`

For each line, decide:
- **Accept** — move or copy the file to the proposed destination yourself, then delete the line.
- **Reject** — delete the line.
- **Later** — leave it. It stays until you act on it.

That is the only maintenance task this system asks of you.

**Your working board: `KANBAN.md`**

This is your daily driver. Open it to see what is to-do, in-progress, and done. Tasks on the Kanban are managed by you — add, move, and complete them as you work.

---

## Where everything lives

| What | Where |
|------|-------|
| New captures (unreviewed) | `capture/inbox/` |
| Pending system proposals | `wiki/log.md` |
| Active tasks | `live/tasks.md` |
| Active projects | `live/projects/` |
| Committed decisions | `live/decisions.md` |
| Your working board | `KANBAN.md` |
| Business & org knowledge | `wiki/organisations/` (ProChat, Arkware, Yeshua Academy) |
| Personal areas (faith, family, health) | `wiki/areas/` |
| Apologetics research | `sources/research/apologetics/` |
| Bible studies | `sources/research/bible/` |
| Theology | `sources/research/theology/` |
| Marketing & business research | `sources/research/marketing/` · `sources/research/business/` |
| Books and people | `sources/research/books/` · `sources/research/people/` |
| Completed / legacy material | `archive/` |

---

## How a capture flows through the system

```
You save something (voice, text, AI session)
        ↓
n8n webhook → Gemini classifies it → lands in capture/inbox/
        ↓
Nightly: compile loop reads inbox → proposes where it belongs → appends to wiki/log.md
        ↓
You review wiki/log.md → accept (move it) or reject (delete line)
        ↓
File lives in its permanent home (live/ or wiki/ or sources/)
```

---

## AI memory — how it connects

When you tell any AI "remember this" or save a preference, it goes into the shared memory store. Every AI session the next day already knows. You never re-explain preferences.

- **Save:** say "remember this" or "save this preference" to any AI
- **Recall:** the AI knows automatically — no command needed
- **Review:** say "show all my memories" to any AI

The memory system is separate from Mind notes. Notes are your knowledge. Memory is your AI context.

---

## What this system does NOT do automatically

- Move files for you — it only proposes moves in `wiki/log.md`
- Manage your Kanban — that is always manual
- Approve decisions — those go in `live/decisions.md` only when you write them
- Clean up your archive — `archive/` is append-only history
