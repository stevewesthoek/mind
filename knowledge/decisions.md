# Decisions

Current committed decisions that should guide future work.

## Accepted

- Obsidian is the primary human cockpit.
- `mind` uses clean unnumbered folders for the new structure.
- Save-to-Mind keeps the public `/mind-inbox` webhook path for compatibility.
- Save-to-Mind writes successful captures to `inbox/new/` and recoverable failures to `inbox/failed/`; Brain B1.0a verified the guarded live workflow on 2026-07-22.
- Mind Steward classifies captures locally through the AI Model Selector with `local_only: true`.
- The Mind Steward implementation belongs in `brain`; this vault stores the router contract and human memory.
- Brain Core owns machine/runtime state and safe actions.
- The unsupported single ProChat OS strategy concept is retired. ProChat uses existing scoped strategy authorities: company/product strategy and ProChat Workbench strategy, with the brand index directing readers to the applicable scope.
