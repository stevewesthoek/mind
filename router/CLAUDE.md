# CLAUDE.md — personal-brain

For complete system documentation, see **[[README.md]]** — the single source of truth for how this vault works.

## Required AI Startup Protocol

For every new Claude Code session, start with:

1. `AGENTS.md`
2. `00-start-here.md`
3. `00-current-context.md`
4. `00-memory-map.md`
5. `README.md` only when full vault/automation details are needed

Do not load the whole vault. Use `00-memory-map.md`, then search/read only relevant files.

## AI Context

**Repository:** Personal Obsidian knowledge vault (Save to Mind system)  
**Type:** PARA-based personal knowledge management and AI-readable memory  
**Entry point:** `AGENTS.md` for agents, `home.md` for Steve, `README.md` for full system guide

## Structure

PARA folders (01-08): inbox, strategy, projects, tasks, areas, resources, templates, archive.  
Root files: README.md (guide), home.md (dashboard), kanban.md (working board), CLAUDE.md (this file).

## Do not break

- PARA folder numbering (01-08)
- `.obsidian/` structure (Obsidian vault config)
- Symlink at `brain/mind` → this repo
- `.gitignore` exclusions (workspace, daily notes, trash)
- `08-archive/` as canonical archive location

## Integration Notes

- **Capture**: macOS shortcut → n8n webhook → Gemini classifies → lands in `01-inbox/`
- **Kanban**: `kanban.md` (Obsidian Canvas) is the only working board
- **Automation**: Runs in Brain Bridge (n8n) — auto-router (1 min), project-decomposer (5 min), kanban-syncer (10 min)

For operational details, see README.md → Automation & Cadence.
