---
type: dashboard
status: scaffold
---

# Sessions

This page is the human-facing place for AI coding and reasoning session visibility.

Runtime truth belongs in Brain Core. This note should stay sparse and should not store raw session logs, transcripts, tokens, credentials, or terminal output.

## Brain Core endpoint

```text
GET /sessions
```

## What should appear here later

- recent Claude, Codex, Gemini, and local model sessions
- age labels
- intent labels
- repo labels
- safe resume guidance

## Current Phase 2 status

- Brain Core `/sessions` exists and is read-only.
- The adapter supports configured session directories and fallback placeholders.
- Obsidian integration is not live yet; use the Brain Core endpoint as the runtime source.

## Safety rules

- Do not paste session transcripts here.
- Do not paste terminal logs here.
- Do not store tokens or model credentials here.
- Do not use this page as a session database.
