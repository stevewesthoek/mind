# Decisions

Current committed decisions that should guide future work.

## Accepted

- Obsidian is the primary human cockpit.
- `mind` uses clean unnumbered folders for the new structure.
- Save-to-Mind keeps the public `/mind-inbox` webhook path for compatibility.
- Save-to-Mind writes captures to `capture/inbox/`.
- Mind Steward classifies captures locally through the AI Model Selector with `local_only: true`.
- The Mind Steward implementation belongs in `brain`; this vault stores the router contract and human memory.
- Brain Core owns machine/runtime state and safe actions.
