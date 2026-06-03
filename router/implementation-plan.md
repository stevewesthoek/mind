# Mind Steward Implementation Plan

## Source

Implementation lives in:

```text
/Users/Office/Repos/stevewesthoek/brain/projects/mind-steward/
```

Scheduler scripts live in:

```text
/Users/Office/Repos/stevewesthoek/brain/tools/scripts/
```

## Required Jobs

```text
mind-steward-sync-inbox.sh
mind-steward-classify-captures.sh
mind-steward-dry-run-report.sh
mind-compile-loop.sh
```

`mind-steward-sync-inbox.sh` runs before classification and copies missing `capture/inbox/*.md` files from GitHub into the local checkout without overwriting local files.

## Classification Contract

Mind Steward classifies files in `capture/inbox/` that do not have:

```yaml
mind_steward_classified: true
```

It requests a local route from the AI Model Selector:

```json
{
  "task_type": "mind_capture_classification",
  "local_only": true,
  "urgent": true
}
```

The selected route must return `provider_id`, `model`, and `base_url` for a local OpenAI-compatible endpoint.

Classification runs during the nightly local scheduler. Save-to-Mind saves immediately and queues captures for that nightly run.

## Output

Mind Steward writes classification frontmatter and a `Mind Steward Classification` section into the capture note. It writes runtime reports to Brain-owned runtime storage:

```text
brain/runtime/local/mind-steward/
```

## Verification

```bash
npm run --prefix /Users/Office/Repos/stevewesthoek/brain/projects/mind-steward ci
python3 -m unittest discover /Users/Office/Repos/stevewesthoek/brain/operations/system-configs/model-selector/tests
bash /Users/Office/Repos/stevewesthoek/brain/tools/scripts/mind-steward-classify-captures.sh
```
