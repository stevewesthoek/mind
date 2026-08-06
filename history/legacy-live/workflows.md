# Live Workflows

Workflow launch and tracking surface for the Obsidian cockpit.

## Core workflow families

- Research
- Design
- Code
- Video
- Deploy
- Memory

## Migration workflow

```text
capture -> classify -> route -> compile -> dashboard -> maintain
```

## Brain Core integration

Live machine actions should be requested through Brain Core once available. This vault should display or link state, not store runtime truth.

## Save-to-Mind

Current public endpoint remains:

```text
/webhook/mind-inbox
```

Verified internal routing:

```text
success -> inbox/new/
failure -> inbox/failed/
```

Brain B1.0a verified the guarded live workflow on 2026-07-22. `capture/inbox/` is historical-only.
