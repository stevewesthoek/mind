# Capture Inbox

Successful Save-to-Mind captures land here after they are synced from GitHub into the local vault.

Producer:

```text
POST /webhook/mind-inbox -> n8n -> GitHub capture/inbox/
```

Classification:

```text
nightly local scheduler -> sync missing inbox captures -> Mind Steward -> AI Model Selector -> local_only=true -> local OpenAI-compatible model
```

Do not manually delete captures from here unless they have been reviewed and promoted, or intentionally discarded.
