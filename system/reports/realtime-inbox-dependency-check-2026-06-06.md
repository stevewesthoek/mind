# Real-Time Inbox Dependency Check — 2026-06-06

Read-only dependency check for future real-time Mind inbox processing.

## Scope

This check looked for Brain-side evidence related to:

- Mind Steward;
- scheduler/local capture classification;
- `capture/inbox/`;
- AI Model Selector;
- `mind_capture_classification`;
- `local_only` routing.

No automation was changed.

## Confirmed evidence

### AI Model Selector local-only path exists

Brain contains a local-only selector test at:

```text
operations/system-configs/model-selector/tests/test_model_selector_local_only.py
```

The test config includes task type:

```text
mind_capture_classification
```

and a local provider:

```text
ollama-local
```

with OpenAI-compatible local endpoint:

```text
http://127.0.0.1:11434/v1
```

This supports the existing Mind automation contract statement that capture classification can use the AI Model Selector with `local_only: true`.

## Not confirmed in this pass

This small search did not find the exact Brain-side Mind Steward scheduler implementation file.

Do not implement real-time processing until the concrete implementation path is found and read.

## Current safe conclusion

It is reasonable to keep the documented future flow as a target:

```text
Brain Core / scheduler
→ Mind Steward job
→ AI Model Selector
→ local model when suitable
→ documented Mind output surfaces
```

But it is not yet safe to implement on-arrival processing because the actual scheduler/Mind Steward entrypoint was not verified in this pass.

## Next dependency search

Before implementation, search/read exact Brain files for:

- Mind Steward runtime implementation;
- scheduler definitions;
- local app or automation jobs that touch `mind/capture/inbox/`;
- Brain Core routes that expose Mind Steward status or actions;
- scripts that append to `wiki/log.md`;
- any hardcoded Mind paths.

## Boundary

Do not add watchers, cron jobs, or filesystem-triggered automation until:

1. the existing scheduler/Mind Steward implementation is found;
2. the call path through AI Model Selector is confirmed;
3. queue/throttle behavior is designed in the owning runtime;
4. failure routing is confirmed;
5. validation can prove no root writes and no Kanban overwrite.
