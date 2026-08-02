# Inbox — Failed

**Active failure intake target — Finalized Batch 8Z (2026-07-10).**

Failed, blocked, unreadable, duplicate-conflicted, or approval-blocked captures land here as the unified failure surface.

**Verified routing status (2026-07-22):** Brain task B1.0a completed the guarded Save-to-Mind deployment and canonical readback. The approved live workflow routes failed processing to `inbox/failed/`; `capture/failed/` is no longer an active route.

**Current intake sources:**
- Save-to-Mind webhook failure branch: n8n error handler → GitHub `inbox/failed/`
- Manual failure captures: any failure-case capture should target `inbox/failed/`

**Historical note:** legacy capture/failed contained 3 historical test files (archived 2026-07-10). All new failures use inbox/failed.
