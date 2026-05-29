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
✅ I-1. Manual final video assembly (validation only)
🟡 I-2. Automate final assembly through Step Functions
⬜ I-3. Replace placeholder with generated clips
⬜ I-4. Add thumbnail generation
⬜ I-5. Generate real internal content
```

Current phase:

```text
Phase 1 — Infrastructure Validation: COMPLETE
Phase 2 — Metadata Contract: COMPLETE
Phase 2 bridge — Canonical status writer: COMPLETE
Phase 3 — Approval Checkpoint: COMPLETE
Phase 4 — Internal Video Assembly: ACTIVE
  I-1 Manual assembly: COMPLETE
  I-2 Step Functions automation: ACTIVE
```

I-1 validation result:

```text
jobs/test-001/exports/test-001-final.mp4 created and uploaded to S3
Duration: 64.033333 seconds
Method: ffmpeg combine (narration.mp3 + sample-transcoded.mp4)
Validation only: local ffmpeg used as temporary shortcut to prove concept
Production path: AWS MediaConvert (canonical for I-2)
```

Current active implementation target:

```text
I-2. Automate final assembly through Step Functions
- Check approvals.json for script.status = approved
- Retrieve narration and transcoded video
- Trigger MediaConvert job for final assembly
- Write output to jobs/test-001/exports/test-001-final.mp4
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

### I-1: Manual Final Video Assembly ✅ COMPLETE

**Goal:** Combine validated assets (narration + transcoded video) into one final MP4.

**Inputs:**
- `jobs/test-001/audio/narration.mp3` — approved narration
- `jobs/test-001/exports/sample-transcoded.mp4` — transcoded visual placeholder

**Validation method (temporary):**
- Used local ffmpeg to combine audio + video
- Output: `jobs/test-001/exports/test-001-final.mp4`
- Duration: 64.033333 seconds
- Uploaded to S3 dev bucket

**Important:** Local ffmpeg was used only as a validation shortcut to prove the concept end-to-end. This is not the canonical production path.

**Result:**
✅ Confirmed one complete internal 60-second MP4 can be created from validated assets
✅ Confirmed audio and video are properly synchronized
✅ Confirmed final export is playable

### I-2: Automate Assembly Through Step Functions 🟡 ACTIVE

**Goal:** Move final assembly into AWS execution layer via Step Functions after approval.

**Canonical production path:**
- AWS MediaConvert is the canonical execution engine for final assembly
- Local ffmpeg was validation only, not production

**Step Functions workflow after approval:**
1. Lambda checks approvals.json for script.status = approved
2. Lambda retrieves narration.mp3 and sample-transcoded.mp4 from S3
3. Lambda triggers MediaConvert job with audio/video inputs
4. MediaConvert writes final output: test-001-final.mp4
5. Lambda updates status.json with status = complete
6. Lambda marks job ready for next phase

**Why MediaConvert instead of local ffmpeg?**
- AWS-native, no local dependencies
- Scales to production workloads
- Integrates with Step Functions state machine
- Consistent with AWS-owns-execution boundary
- Better observability and cost tracking

### I-3: Replace Placeholder with Generated Clips ⬜ FUTURE

Replace sample-transcoded.mp4 with real video clips generated by Bedrock Nova Reel.

### I-4: Add Thumbnail Generation ⬜ FUTURE

Generate and store preview thumbnail using Nova Canvas or MediaConvert snapshot.

### I-5: Generate Real Internal Content ⬜ FUTURE

Replace test-001 with real Says The Bible or ProChat workflow demonstration video.

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
