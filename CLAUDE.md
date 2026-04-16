# CLAUDE.md — personal-brain

## Purpose

Obsidian vault for personal knowledge management. Independent git repo synced to iOS via Obsidian Git.

## Structure

```
mind/
  01-inbox/           ← Capture point for new ideas
  02-strategy/        ← Brainstorming and strategic thinking
  03-projects/        ← Active projects with deadlines
  04-tasks/           ← Ongoing tasks by category
  05-areas/           ← Long-term responsibilities and areas
  06-resources/       ← Reference material and attachments
  07-templates/       ← Note templates
  08-archive/         ← Completed projects and areas
  .obsidian/          ← Obsidian vault config (not committed except essentials)
  home.md             ← Vault entry point
  kanban.md           ← Kanban board for task tracking
  STRUCTURE.md        ← Vault structure documentation
```

## Workflow

**On Mac:**
- Edit in Obsidian (points to this repo)
- Commit with Obsidian Git plugin
- Push to remote

**On iOS:**
- Clone this repo (200MB only)
- Obsidian opens and syncs normally
- Edit and push changes back

## Sync

- Bidirectional: Mac ↔ iOS via git
- No special commands needed, just push/pull in Obsidian Git
- Obsidian handles conflicts gracefully

## Do not break

- `.obsidian/` folder structure (Obsidian metadata)
- Symlink from brain/mind → this repo (referenced by AI agents)
- .gitignore exclusions (workspace.json, daily notes, trash)

## See also

- `brain/` repo — AI infrastructure, system configs, skills
- `brain/mind` → symlink to this repo (for AI context)
