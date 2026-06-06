# Mind Steward Documentation

This directory documents the Mind vault contract used by AI agents and Mind Steward.

## Current Structure

```text
capture/inbox/    New Save-to-Mind captures
capture/failed/   Recoverable capture failures
capture/daily/    Daily scratch notes
live/             Active tasks, projects, decisions, workflows, dashboard
wiki/             Compiled durable knowledge
sources/          Raw evidence, research, and source material
archive/          Completed or inactive material
router/           AI and Mind Steward contract files
```

## Save-to-Mind Flow

```text
ChatGPT / shortcut / webhook
  -> n8n receives capture
  -> n8n writes markdown to GitHub capture/inbox/
  -> nightly local scheduler syncs missing inbox captures to this computer
  -> Mind Steward classifies locally on this computer
  -> Mind Steward appends review suggestions to wiki/log.md
  -> Steve or an AI agent reviews and promotes useful material
```

Save-to-Mind saves immediately. Mind Steward classification is nightly only.

## Classification

Mind Steward classifies captures through the AI Model Selector:

```text
task_type: mind_capture_classification
local_only: true
```

Automatic capture classification must use a local OpenAI-compatible model endpoint such as Ollama. It must not use hosted, CLI-backed, or paid/API-backed providers.

## Capture Frontmatter

Mind Steward writes classification metadata into capture notes:

```yaml
type: capture
source: save-to-mind
para_type: project|area|resource|task|decision|research|inbox
confidence: 0.95
signal_quality: 0.90
title: "Useful title"
tags: []
created: 2026-06-01T12:00:00.000Z
mind_steward_classified: true
mind_steward_classified_at: 2026-06-01T12:05:00.000Z
mind_steward_provider: ollama-m4pro
mind_steward_model: qwen2.5:14b
```

## Promotion Rules

| Classification | Review target |
|---|---|
| `task` | `kanban.md` |
| `project` | `live/projects.md` |
| `decision` | `live/decisions.md` |
| `area` | `wiki/areas/` |
| `research` | `sources/research/` |
| `resource` | `sources/` or `wiki/` |
| `inbox` | Keep in `capture/inbox/` for review |

Mind Steward may suggest these targets, but promotion is review-first.

## Active Contract Files

```text
router/AGENTS.md
router/00-start-here.md
router/00-current-context.md
router/00-memory-map.md
router/current.md
router/map.md
router/rules.md
router/taxonomy.md
router/maintenance.md
router/mind-steward.md
```

## Safety

- Do not store runtime logs, reports, tokens, API keys, or credentials in Mind.
- Do not bypass the AI Model Selector for classification.
- Always set `local_only: true` for automatic capture classification.
- Do not move, delete, archive, compact, split, or rewrite Mind files without an explicit approved apply path.
- Keep raw captures and raw sources intact.
