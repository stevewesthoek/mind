# Capture Inbox

**Legacy folder — Historical captures only.** Save-to-Mind routing switched to `inbox/new/` as of Batch 8P (2026-07-09).

**Historical producer (legacy):**

```text
POST /webhook/mind-inbox -> n8n -> GitHub capture/inbox/  [LEGACY — SWITCHED 2026-07-09]
```

**Current active producer (2026-07-09 onwards):**

```text
POST /webhook/mind-inbox -> n8n -> GitHub inbox/new/
```

Classification (historical):

```text
nightly local scheduler -> sync missing inbox captures -> Mind Steward -> AI Model Selector -> local_only=true -> local OpenAI-compatible model
```

Do not manually delete captures from here unless they have been reviewed and promoted, or intentionally discarded.

**Status:** 21 files as of 2026-07-09. Historical captures were not moved. Legacy `capture/inbox/` remains in place for reference and processing until explicitly archived.

Brain source-of-truth reconciled at commit `31554fd0` in `/Users/Office/Repos/stevewesthoek/brain`.
