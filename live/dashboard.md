# Live Dashboard

**Use the Brain Console plugin dashboard (primary) — this page is reference fallback.**

## 🧠 Brain Console Plugin Dashboard (Primary)

Open the **Obsidian Brain Console plugin** in the right sidebar. It displays:
- Status strip with 6 pills (Brain Core, Model Router, Scheduler, Save-to-Mind, Approvals, Maintenance)
- 6 core cards: Wiki Health, Maintenance Previews, Approvals, Scheduler Status, Brain Core readiness, Next Safe Action
- Action buttons: Refresh, Request Dry Run, View Latest, Open Mind, Wiki Log
- Recent activity panel

This is your primary system cockpit — it pulls live data from Brain Core and requires no manual updates.

## 📋 Reference Navigation

If you need to browse Mind Markdown directly (plugin unavailable):

- [[../HOME|HOME]] — command center with task/project dataviews
- [[../TODAY|TODAY]] — today’s focus
- [[tasks]] — current tasks (fallback browsing)
- [[projects]] — current projects (fallback browsing)
- [[sessions]] — AI session visibility (fallback)
- [[machine]] — Brain Core machine entry point (fallback; plugin is primary)
- [[video]] — Video Orchestrator visibility (fallback)
- [[business]] — sparse business operating surface
- [[workflows]] — workflow launch and tracking
- [[decisions]] — current committed decisions

## Machine Visibility (Brain Console Primary)

Machine and scheduler state is exposed through **Brain Console plugin cards**, not copied into Markdown files in this vault. Live data comes from Brain Core endpoints:
- `/status` → Brain Core status card
- `/runtime/reports` → Wiki health card
- `/execution/mind-previews` → Maintenance previews card
- `/scheduler/jobs` → Scheduler status card
- `/approvals` → Approvals card
- `/execution/readiness` → Next safe action card

## Migration Status

- New structure scaffolded beside legacy numbered folders
- Brain Console plugin is now the primary Obsidian interface
- Legacy folders remain for reference only
- Archive phase remains blocked until explicit cleanup plan
