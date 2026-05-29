---
type: dashboard
status: scaffold
---

# Video

This page is the human-facing place for Video Orchestrator visibility.

Canonical strategy:

```text
ProChat OS owns workflows.
AWS owns media execution.
```

The canonical Video Orchestrator strategy, roadmap, implementation plan, and architecture diagram live in:

```text
wiki/organisations/prochat/brand/prochat-os-strategy.md
```

This note should stay sparse and should not store render logs, queue dumps, upload credentials, generated media state, or copied asset files.

## Ownership boundaries

ProChat OS owns:

- job status
- workflow references
- approvals
- logs
- retry actions
- asset references
- publishing checklist state

AWS owns:

- S3 asset storage and job folders
- Bedrock script, prompt, image, and video generation
- Polly narration
- Transcribe captions and transcripts
- MediaConvert render, transcode, and export
- Step Functions orchestration state machine
- Lambda glue tasks only
- optional CloudFront delivery later
- generation, rendering, storage, transcoding, and long-running media execution

V1 boundary:

```text
Topic
→ 60-second script
→ 5 scene prompts
→ human approval
→ Polly voiceover
→ generated clips
→ captions
→ thumbnail
→ final render
→ exported MP4
```

V1 has no publishing automation, account management, customer SaaS dashboard, full editor UX, local video generation, or local FFmpeg production path.

## Future visibility

- high-level render queue state
- current job summaries
- blocked/failed video workflow notices
- approval links
- links to AWS-backed asset references
- links to durable workflow notes when human action is required

## Current status

- No production video jobs are started from Brain Core yet.
- No upload, render, or publish mutation endpoint exists yet.
- Runtime video state should stay in the execution backend and ProChat OS metadata, not duplicated into Mind.

## Safety rules

- Do not paste video service logs here.
- Do not store API credentials here.
- Do not use this page as a queue database.
- Do not store generated media files in Mind unless they are deliberate durable sources.
- Do not create a separate Video Studio product from this note.
