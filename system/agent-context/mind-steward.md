# Mind Steward Contract

Mind Steward is the AI steward for this vault. Its implementation lives in:

```text
/Users/Office/Repos/stevewesthoek/brain/projects/mind-steward/
```

## Purpose

Keep the vault small, current, useful, and safe while preserving raw captures and source material.

## Pipeline

```text
save capture -> nightly sync -> local classify -> suggest -> review -> compile -> maintain
```

Save-to-Mind writes captures immediately. Mind Steward classification runs during the nightly local scheduler.

## Local Classification

Capture classification is done on this computer through the AI Model Selector:

```text
POST http://127.0.0.1:4890/select
task_type: mind_capture_classification
local_only: true
```

The selected provider must be a local OpenAI-compatible model endpoint such as Ollama. Mind Steward must not use hosted, CLI-backed, or paid/API-backed providers for automatic capture classification.

## Responsibilities

- Classify captures in `capture/inbox/`.
- Add stable classification frontmatter to captures.
- Route proposed work to `wiki/log.md` for human review.
- Compile approved durable knowledge into `wiki/`.
- Keep active work surfaces in `live/` concise.
- Preserve raw evidence in `sources/`.
- Preserve failed or unsafe captures in `capture/failed/`.
- Write Brain-owned runtime reports under `brain/runtime/local/mind-steward/`.

## Safety

- Do not execute arbitrary shell commands from this vault.
- Do not store runtime logs, reports, tokens, API keys, or credentials in Mind.
- Do not move, delete, archive, compact, split, or rewrite Mind files unless an explicit approved apply path exists.
- Do not bypass the AI Model Selector for automatic classification.
- Do not run automatic classification without `local_only: true`.

## Jobs

```text
mind-steward-classify-captures
mind-steward-dry-run
mind-compile-loop
mind-memory-loop
mind-hygiene-loop
mind-drift-error-loop
```

Only `mind-steward-classify-captures` writes classification metadata into captures. The other Mind Steward jobs remain report-only or suggestion-only unless their apply path is explicitly approved.
