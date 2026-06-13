# System

Mind operating documentation, contracts, and reports live here.

## Purpose

Use this folder for rules that describe how Mind works, how automation is allowed to write to it, and how future changes should avoid data loss or broken dependencies.

Do not store raw captures, durable knowledge notes, or generated automation dumps here.

## Canonical direction

Read these in order before changing Mind structure, lifecycle, or automation:

1. `infinite-brain-philosophy.md` — first principles for a human-first, self-improving Mind.
2. `mind-strategy.md` — strategic choices, Brain/Mind boundary, structure, and success measures.
3. `mind-roadmap.md` — phased path from current foundation to safe maintenance and automation.
4. `mind-implementation-plan.md` — concrete tasks, dependencies, acceptance criteria, and stop points.

These documents lead the contracts and technical sub-roadmaps below.

## Current contracts

- `brain-mind-bridge.md` — canonical ownership, exchange, approval, provenance, and write rules between Brain and Mind.
- `knowledge-freshness-standard.md` — selective status, review, contradiction, supersession, and archive rules for changing knowledge.
- `graphify-strategy.md` — Mind-owned strategy for Graphify, Infinite Brain context, and cross-repo graph modes.
- `automation-roadmap.md` — remaining Infinite Brain automation phases and execution order.
- `automation-contract.md` — Save-to-Mind, Mind Steward, AI Model Selector, and capture-processing boundary.
- `realtime-inbox-processing-spec.md` — safe future specification for on-arrival capture processing.
- `inbox-queue-throttle-spec.md` — queue, throttle, debounce, retry, and large-file rules required before real-time or Mind-writing processing.
- `folder-contract.md` — top-level folder meanings, root cleanliness rules, and move/rename safety checks.
- `task-kanban-contract.md` — current `kanban.md` source-of-truth rule and no-data-loss task migration boundary.
- `task-sync-spec.md` — safe future task-record and Kanban sync specification, including the read-only `tools/export-kanban-tasks.mjs` exporter.
- `graph-visualization-contract.md` — current Graphify output and future visual graph target.
- `graph-visualization-spec.md` — safe future implementation specification for a clickable visual graph.
- `generated-output-policy.md` — generated Graphify output, capture inbox handling, and recommended ignore rules.

## Runbooks

- `runbooks/mind-steward-preflight-runbook.md` — safe operator sequence for the current report-only Mind Steward preflights.

## Reports

- `reports/mind-inventory-2026-06-06.md` — read-only structural and dependency inventory.
- `reports/kanban-inventory-2026-06-06.md` — lossless inventory of the current Obsidian Kanban board.
- `reports/mind-cleanup-final-handoff-2026-06-07.md` — completed phase summary, current source-of-truth rules, and remaining automation roadmap.

## Rules

- Keep system docs factual and current.
- Do not describe deprecated behavior as current behavior.
- Do not move or rename folders without checking the contracts and dependency inventory.
- Keep implementation plans small, reversible, and evidence-based.
