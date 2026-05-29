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

## Approval checkpoint (H)

The first approval gate is script approval.

### Approval files

**metadata/approvals.json** — canonical approval checkpoint state

Required shape:

```json
{
  "jobId": "test-001",
  "approvals": {
    "script": {
      "status": "pending",
      "approvedBy": null,
      "approvedAt": null,
      "notes": null
    },
    "scenes": {
      "status": "not_required",
      "approvedBy": null,
      "approvedAt": null,
      "notes": null
    },
    "final": {
      "status": "not_required",
      "approvedBy": null,
      "approvedAt": null,
      "notes": null
    }
  }
}
```

### Workflow contract

1. Step Functions generates script from topic via Bedrock.
2. Step Functions writes `metadata/status.json` with `status = "awaiting_script_approval"`.
3. Step Functions writes `metadata/approvals.json` with `approvals.script.status = "pending"`.
4. Workflow stops and waits for human approval.
5. Human reviews script (stored in `metadata/job.json`).
6. Human updates `metadata/approvals.json` with `approvals.script.status = "approved"` and optional `approvedBy`, `approvedAt`, `notes`.
7. Later execution resumes and continues to scene generation, rendering, etc.

### Manual approval path (v1)

In v1, approval is manual file-based:

1. Human SSH or Lambda console into dev environment.
2. Human reads `metadata/job.json` and the generated script.
3. Human edits `metadata/approvals.json` script approval fields.
4. Human sets `approvals.script.status = "approved"` and optionally adds `approvedBy`, `approvedAt`, `notes`.
5. Human triggers next Lambda function or workflow step manually.
6. Workflow resumes.

### Future approval paths

- UI approval form in ProChat Console (ProChat OS owns approval UI)
- API approval endpoint (ProChat OS owns approval logic)
- webhook approval from external systems

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
✅ F/G Bridge. Step Functions writes canonical metadata/status.json
✅ H. Define approval checkpoint contract
🟡 I. Generate one complete 60-second internal video
```

Current phase:

```text
Phase 1 — Infrastructure Validation: COMPLETE
Phase 2 — Metadata Contract: COMPLETE
Phase 2 bridge — Canonical status writer: COMPLETE
Phase 3 — Approval Checkpoint: COMPLETE
Phase 4 — Internal Video Assembly: ACTIVE
```

Approval validation result:

```text
jobs/test-001/metadata/approvals.json written with script.status = pending
Human manually approved by setting script.status = approved
Workflow resumed after approval
```

Current active implementation target:

```text
I. Generate one complete 60-second internal video (manual assembly first)
```

### Phase 4 — Internal Video Assembly

**Goal:** Create one end-to-end internal MP4 export using already-validated assets, before automating through Step Functions.

Available test-001 assets:

```text
jobs/test-001/scripts/script.md
jobs/test-001/audio/narration.mp3
jobs/test-001/captions/transcript.json
jobs/test-001/video-raw/sample.mp4
jobs/test-001/exports/sample-transcoded.mp4
jobs/test-001/metadata/approvals.json (script.status = approved)
```

Required output:

```text
jobs/test-001/exports/test-001-final.mp4
```

### I-1: Manual Final Video Assembly

**Goal:** Combine validated assets (narration + transcoded video) into one final MP4.

**Inputs:**
- `jobs/test-001/audio/narration.mp3` — approved narration
- `jobs/test-001/exports/sample-transcoded.mp4` — transcoded visual placeholder

**Process:**
1. Use existing narration.mp3 as audio track
2. Use existing sample-transcoded.mp4 as visual track
3. Combine audio and video into final MP4
4. Keep simple: no burned-in captions yet (can add later if easy)
5. Output: `jobs/test-001/exports/test-001-final.mp4`

**Validation:**
- Confirm final MP4 exists in S3
- Confirm audio and video are synchronized
- Confirm playback is valid

### I-2: Automate Assembly Through Step Functions

Integrate final assembly step into Step Functions orchestration after approval.

Step Functions should:
1. Check approvals.json for script.status = approved
2. Retrieve narration and transcoded video
3. Run MediaConvert job for final assembly
4. Write test-001-final.mp4 to exports/
5. Update status.json with status = complete

### I-3: Replace Placeholder with Generated Clips

Replace sample-transcoded.mp4 with real generated video clips from Bedrock/Nova Reel.

### I-4: Add Thumbnail Generation

Generate and store preview thumbnail using Nova Canvas or MediaConvert snapshot.

### I-5: Generate Real Internal Content

Replace test-001 with real Says The Bible or ProChat short video.

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
