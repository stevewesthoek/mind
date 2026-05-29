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

The canonical Video Orchestrator strategy, roadmap, implementation plan, cost controls, S3 layout, service boundaries, metadata contract, and architecture diagram live in:

```text
wiki/organisations/prochat/brand/prochat-os-strategy.md
```

This note should stay sparse and should not store render logs, queue dumps, upload credentials, generated media state, or copied asset files.

## V1 boundary

The first MVP supports only:

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

Primary objective:

```text
Validate ProChat OS through real internal workflows before supporting external users.
```

Initial internal content users:

- Says The Bible
- ProChat

Do not build for external customers before the internal workflow produces repeatable videos.

## Ownership boundaries

ProChat OS owns:

- job creation
- template selection
- approval gates
- prompt history
- asset metadata
- workflow status
- logs
- retry commands
- publishing checklist
- module visibility in the console
- asset references

AWS owns:

- S3 asset storage and job folders
- Bedrock script, prompt, image, and video generation
- Polly narration
- Transcribe captions and transcripts
- MediaConvert render, transcode, and export
- Step Functions orchestration state machine
- Lambda glue tasks only
- CloudFront optional signed delivery later

## Metadata contract

Canonical per-job metadata files:

```text
metadata/job.json
metadata/status.json
metadata/approvals.json
metadata/assets.json
metadata/cost.json
```

These files are the contract between ProChat OS and AWS execution.

## Cost and storage guardrails

- every job has a max budget
- every job has max retries
- every generated clip has max duration
- failed generations are tracked
- raw assets get lifecycle rules
- dev bucket and production bucket stay separate
- no public S3 access
- CloudFront and signed URLs are used only when needed

## Future visibility

- high-level render queue state
- current job summaries
- blocked/failed video workflow notices
- approval links
- links to AWS-backed asset references
- links to durable workflow notes when human action is required

## Current status

Implementation progress:

```text
✅ A. Create private S3 dev bucket
✅ B. Test Bedrock text generation
✅ C. Test Polly text-to-speech into S3
✅ D. Test Transcribe captions from audio
✅ E. Test MediaConvert on one sample clip
✅ F. Create first Step Functions skeleton
✅ G. Define canonical job metadata schema
⬜ H. Add approval checkpoint
⬜ I. Generate one complete 60-second internal video
```

Current phase:

```text
Phase 1 — Infrastructure Validation: COMPLETE
Phase 2 — Metadata Contract: COMPLETE
```

Current next implementation target:

```text
Step Functions writes and updates metadata/status.json instead of metadata/status-started.json and metadata/status-completed.json.
```

- No production video jobs are started from Brain Core yet.
- No upload, render, or publish mutation endpoint exists yet.
- Runtime video state should stay in the execution backend and ProChat OS metadata, not duplicated into Mind.

## Safety rules

- Do not paste video service logs here.
- Do not store API credentials here.
- Do not use this page as a queue database.
- Do not store generated media files in Mind unless they are deliberate durable sources.
- Do not create a separate Video Studio product from this note.
- Do not use local video generation or local FFmpeg as the core production path for v1.
- Do not add account management, scheduling, autonomous publishing, or a customer-facing SaaS dashboard in v1.
