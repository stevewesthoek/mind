# Inbox — Failed

**Active failure intake target — Finalized Batch 8Z (2026-07-10).**

Failed, blocked, unreadable, duplicate-conflicted, or approval-blocked captures land here as the unified failure surface.

Current file count: 1 as of 2026-07-10 (README.md only, pending n8n failure switch).

**Status:** Brain failure path fallback retired (Batch 8Y). All Brain readers check inbox/failed only (no fallback to capture/failed). n8n failure routing switch pending — currently awaiting Dokploy n8n workflow update to target this folder instead of legacy capture/failed.

**Intake sources (target):**
- Save-to-Mind webhook failure branch: n8n error handler → GitHub inbox/failed/
- Manual failure captures: Any failure-case capture should target inbox/failed/

**Historical note:** legacy capture/failed contained 3 historical test files (archived 2026-07-10). All new failures use inbox/failed.
