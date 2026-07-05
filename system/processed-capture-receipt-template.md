# Processed-Capture Receipt Template

**Status:** canonical lightweight template  
**Purpose:** make capture outcomes auditable when inbox volume or lost-context risk justifies it.  
**Applies to:** captures from `capture/inbox/`, transcripts, newsletters, emails, meetings, web clips, or other imported observations.  
**Does not do:** move files, approve durable writes, or create an automation pipeline.

## When to use this

Use a processed-capture receipt when a capture has enough value, ambiguity, or follow-up risk that Steve may later need to know what happened to it.

Good candidates:

- capture became a durable Mind note;
- capture became a task or project update;
- capture was ignored or archived for a reason worth remembering;
- capture was rejected because the source was low quality;
- capture was left pending because approval or better evidence is needed;
- multiple captures were summarized together.

Do not create receipts for every trivial capture unless inbox volume proves that is useful. This template is intentionally optional.

## Default destination

Default location:

```text
wiki/log.md
```

Use a dedicated file only when capture processing becomes too noisy for `wiki/log.md`.

Suggested dedicated location, if needed later:

```text
system/capture-receipts/YYYY-MM-DD-short-source.md
```

## Outcome vocabulary

Use one primary outcome:

```text
ignored
summarized
promoted_to_knowledge
converted_to_task
project_update_proposed
maintenance_finding
source_rejected
left_pending
merged_with_other_capture
```

## Receipt template

```yaml
title: ""
date: YYYY-MM-DD
capture_path: "capture/inbox/..."
source_type: transcript | newsletter | email | meeting | web_clip | manual_note | other
source_name: ""
outcome: ignored | summarized | promoted_to_knowledge | converted_to_task | project_update_proposed | maintenance_finding | source_rejected | left_pending | merged_with_other_capture
destination_paths:
  - ""
approval:
  required: true
  status: not_required | pending | approved | rejected
  approved_by: ""
  approval_ref: ""
reason: ""
summary: ""
evidence:
  - ""
follow_up_task: ""
do_not_forget:
  - ""
```

## Human-readable format

### Capture

- Capture path:
- Source type:
- Source name:
- Date processed:

### Outcome

- Outcome:
- Reason:
- Summary:

### Destination

- Destination path(s):
- Approval required:
- Approval status:
- Approval reference:

### Evidence

- Source evidence:
- Quality concerns:
- Freshness risk:

### Follow-up

```text
<copy-ready next task or "none">
```

### Do not forget

- Pending decision:
- Related project/task:
- Why this was not promoted, if rejected:

## Safety rules

- A processed-capture receipt records an outcome; it does not authorize the outcome.
- Do not move, delete, archive, or rewrite captures just because a receipt exists.
- Do not promote source material into durable Mind truth without human approval when approval is required.
- Do not include secrets, tokens, credentials, private keys, or sensitive raw message dumps.
- Prefer summaries and exact source references over full copied content.
- Do not turn this into mandatory bureaucracy unless real inbox volume proves it saves time.
