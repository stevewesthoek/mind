# Capture Inbox

This is the target landing zone for new successful Save-to-Mind captures after the n8n workflow is updated and validated.

Current migration status: scaffold created; legacy `01-inbox/` remains intact until live Save-to-Mind migration is tested.

Expected producer:

```text
POST /webhook/mind-inbox -> n8n -> Gemini/classifier -> mind/capture/inbox/
```

Do not manually delete captures from here unless they have been compiled, routed, or archived.
