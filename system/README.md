# System

Mind operating documentation, contracts, and reports live here.

## Purpose

Use this folder for rules that describe how Mind works, how automation is allowed to write to it, and how future changes should avoid data loss or broken dependencies.

Do not store raw captures, durable knowledge notes, or generated automation dumps here.

## Current contracts

- `automation-contract.md` — Save-to-Mind, Mind Steward, AI Model Selector, and capture-processing boundary.
- `realtime-inbox-processing-spec.md` — safe future specification for on-arrival capture processing.
- `inbox-queue-throttle-spec.md` — queue, throttle, debounce, retry, and large-file rules required before real-time or Mind-writing processing.
- `folder-contract.md` — top-level folder meanings, root cleanliness rules, and move/rename safety checks.
- `task-kanban-contract.md` — current `kanban.md` source-of-truth rule and no-data-loss task migration boundary.
- `task-sync-spec.md` — safe future task-record and Kanban sync specification, including the read-only `tools/export-kanban-tasks.mjs` exporter.
- `graph-visualization-contract.md` — current Graphify output and future visual graph target.
- `graph-visualization-spec.md` — safe future implementation specification for a clickable visual graph.
- `generated-output-policy.md` — generated Graphify output, capture inbox handling, and recommended ignore rules.

## Reports

- `reports/mind-inventory-2026-06-06.md` — read-only structural and dependency inventory.
- `reports/kanban-inventory-2026-06-06.md` — lossless inventory of the current Obsidian Kanban board.

## Rules

- Keep system docs factual and current.
- Do not describe deprecated behavior as current behavior.
- Do not move or rename folders without checking the contracts and dependency inventory.
- Keep implementation plans small, reversible, and evidence-based.
