---
type: capture
source: shortcut
para_type: resource
confidence: 0.95
signal_quality: 0.92
title: "Save to Mind — next improvements backlog seed"
created: 2026-04-18T09:23:23.224Z
---

# Save to Mind — next improvements backlog seed

## Summary
This note outlines a backlog of specific, optional enhancements for the "Save to Mind" intake and routing system, intended as reference for future planning. The improvements focus on data consistency, system reliability, testing, and observability.

## Key Points
- Identifies future improvements for the "Save to Mind" intake and routing system.
- Focuses on enhancing data consistency and validation of captured data.
- Suggests adding regression checks and a smoke-test runbook for system reliability.
- Recommends reviewing confidence serialization format and increasing observability.
- Serves as a reference for future backlog planning for the system.

## Content
Future improvements for Save to Mind intake and routing system, captured as reference for backlog planning.

Optional enhancements to consider:
1. Normalize producer tags output so captures consistently include tags: [] in frontmatter — currently sometimes absent
2. Add lightweight regression check for producer/router contract — verify all 8 frontmatter fields present
3. Add lightweight regression check for single-pass routing — ensure captures route once, not duplicate
4. Add tiny operational smoke-test runbook for post-change verification — self-service validation
5. Review whether confidence should always be serialized as float 0.0–1.0 — currently sometimes 1 instead of 1.0
6. Review whether additional observability/log retention would be useful — track routing performance over time
