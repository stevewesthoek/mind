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
✅ I-2. Automate final assembly through Step Functions (COMPLETE)
🟡 I-3. Replace placeholder with generated clips
⬜ I-4. Add thumbnail generation
⬜ I-5. Generate real internal content
```

Current phase:

```text
Phase 1 — Infrastructure Validation: COMPLETE
Phase 2 — Metadata Contract: COMPLETE
Phase 2 bridge — Canonical status writer: COMPLETE
Phase 3 — Approval Checkpoint: COMPLETE
Phase 4 — Internal Video Assembly: COMPLETE
  I-1 Manual assembly: COMPLETE (ffmpeg validation only)
  I-2 Step Functions automation: COMPLETE (AWS production path)
Phase 5 — Placeholder Replacement: ACTIVE
  I-3.1 Manual generated clip proof: COMPLETE (Nova Reel cross-region)
  I-3.2 Integrate into MediaConvert: READY (next implementation)
```

I-2 implementation result:

```text
✅ Step Functions State Machine: Deployed
   Name: video-orchestrator-i2-assembly
   States: 13 (8 execution + 5 error handling)

✅ Lambda Functions: 5 functions deployed
   - video-orchestrator-check-approval
   - video-orchestrator-update-status
   - video-orchestrator-mediaconvert
   - video-orchestrator-wait-mediaconvert
   - video-orchestrator-verify-output

✅ Workflow automation proven:
   1. CheckApproval → verify approvals.json script.status = approved
   2. UpdateStatusAssembling → set status = "assembling"
   3. TriggerMediaConvert → submit job (sample-transcoded.mp4 + narration.mp3)
   4. WaitForMediaConvert → poll MediaConvert job for completion
   5. UpdateStatusComplete → set status = "complete" + mediaConvertJobId
   6. VerifyOutput → confirm output file exists

✅ Validation proof (test-001-i2-codec-fixed execution):
   - MediaConvert job created: 1780183306480-uqpvlo
   - Output written: s3://.../jobs/test-001/exports/sample-transcoded-final.mp4
   - metadata/status.json shows: "status": "complete"
   - mediaConvertJobId stored: "1780183306480-uqpvlo"

⚠️  KNOWN CAVEAT - Output naming:
   - Expected canonical: test-001-final.mp4
   - Actual automated output: sample-transcoded-final.mp4
   - Reason: MediaConvert uses input filename + NameModifier ("-final")
   - Status: Not a blocker; rename task deferred to I-3+ cleanup phase
   - Resolution options:
     * Add S3 copy/rename Lambda post-step
     * Adjust MediaConvert destination strategy for future jobs

Documentation: infrastructure/i-2-mediaconvert-orchestration/IMPLEMENTATION_GUIDE.md
```

Current active implementation target:

```text
I-3. Replace placeholder with generated clips (NEXT)
   - Move from sample-transcoded.mp4 to Bedrock Nova Reel output
   - Integrate Nova Reel step into Step Functions workflow
   - Keep same MediaConvert final assembly orchestration
   - Same output path + naming caveat applies
   - Cleanup deferred: normalize final export naming
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

### I-2: Automate Assembly Through Step Functions ✅ IMPLEMENTED

**Goal:** Move final assembly into AWS execution layer via Step Functions after approval.

**Canonical production path:**
- AWS MediaConvert is the canonical execution engine for final assembly
- Local ffmpeg was validation only, not production

**Implementation requirements:**

#### Step Functions State Machine Extension

**Entry point:** After approvals.json indicates script.status=approved

**Workflow states:**

1. **CheckApproval**
   - Read metadata/approvals.json from S3
   - Check: approvals.script.status == "approved"
   - If not approved: end workflow (wait for approval)
   - If approved: proceed

2. **UpdateStatusAssembling**
   - Update metadata/status.json with status = "assembling"
   - Timestamp: current UTC time

3. **TriggerMediaConvert**
   - Create MediaConvert job with:
     - **Video input:** jobs/test-001/exports/sample-transcoded.mp4
     - **Audio input:** jobs/test-001/audio/narration.mp3
     - **Output:** jobs/test-001/exports/test-001-final.mp4
     - **Settings:** MP4 output, H.264 video, AAC audio, 64.033 seconds duration
   - Store job ID in workflow context

4. **WaitForMediaConvert**
   - Poll MediaConvert job status
   - Wait for job to complete (state == "COMPLETE")
   - If failed: retry or handle error

5. **UpdateStatusComplete**
   - Update metadata/status.json with status = "complete"
   - Add assemblyCompletedAt: current UTC time
   - Add mediaConvertJobId: job ID from state

6. **Success**
   - Verify test-001-final.mp4 exists in S3
   - Return success state

#### Lambda Handler Responsibilities

Lambda should:
- Read approvals.json to verify approval
- Construct MediaConvert job payload
- Monitor job completion
- Update metadata files
- Handle errors with retry logic

#### MediaConvert Job Template

```json
{
  "Name": "test-001-final-assembly",
  "Settings": {
    "TimecodeConfig": {
      "Source": "ZEROBASED"
    },
    "Inputs": [
      {
        "FileInput": "s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/exports/sample-transcoded.mp4",
        "AudioSelectors": {
          "Audio Selector 1": {
            "DefaultSelection": "NOT_DEFAULT"
          }
        },
        "VideoSelector": {
          "Rotate": "DEGREE_0"
        }
      },
      {
        "FileInput": "s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/audio/narration.mp3"
      }
    ],
    "OutputGroups": [
      {
        "Name": "File Group",
        "Outputs": [
          {
            "Filename": "test-001-final.mp4",
            "VideoDescription": {
              "CodecSettings": {
                "H264Settings": {
                  "MaxBitrate": 5000000,
                  "FramerateDenominator": 1,
                  "FramerateNumerator": 30,
                  "RateControlMode": "VBR"
                }
              }
            },
            "AudioDescriptions": [
              {
                "CodecSettings": {
                  "AacSettings": {
                    "Bitrate": 128000,
                    "SampleRate": 48000,
                    "Channels": 2
                  }
                }
              }
            ]
          }
        ],
        "OutputGroupSettings": {
          "Type": "FILE_GROUP_SETTINGS",
          "FileGroupSettings": {
            "Destination": "s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/exports/"
          }
        }
      }
    ]
  },
  "Queue": "default"
}
```

**Why MediaConvert instead of local ffmpeg?**
- AWS-native, no local dependencies
- Scales to production workloads
- Integrates with Step Functions state machine
- Consistent with AWS-owns-execution boundary
- Better observability and cost tracking
- Supports complex video workflows later

#### Metadata Contract

**metadata/status.json updates during I-2:**

```json
{
  "jobId": "test-001",
  "status": "assembling",
  "phase": "i-2",
  "assemblyStartedAt": "2026-05-30T12:00:00Z",
  "assemblyCompletedAt": null,
  "mediaConvertJobId": null
}
```

After MediaConvert completes:

```json
{
  "jobId": "test-001",
  "status": "complete",
  "phase": "i-2",
  "assemblyStartedAt": "2026-05-30T12:00:00Z",
  "assemblyCompletedAt": "2026-05-30T12:05:00Z",
  "mediaConvertJobId": "1234567890abcdef1234567890abcdef"
}
```

#### Validation Criteria

✅ Step Functions monitors approvals.json
✅ MediaConvert job created with correct inputs
✅ test-001-final.mp4 written to exports/
✅ status.json updated with assembling → complete
✅ Output MP4 is playable and matches I-1 output duration

#### I-2 Manual Execution Proof (before Step Functions automation)

To validate I-2 implementation before integrating with Step Functions:

**1. Verify approval state:**
```bash
# Confirm script.status = approved in metadata/approvals.json
aws s3 cp s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/metadata/approvals.json - | jq '.approvals.script.status'
# Expected output: "approved"
```

**2. Submit MediaConvert job manually:**
```bash
# Create job from template above, store job ID
aws mediaconvert create-job \
  --endpoint-url https://abcdef1234567.mediaconvert.eu-north-1.amazonaws.com \
  --region eu-north-1 \
  --role arn:aws:iam::909439522876:role/video-orchestrator-role \
  --settings file://mediaconvert-job-template.json

# Capture job ID: 1234567890abcdef1234567890abcdef
```

**3. Monitor job completion:**
```bash
aws mediaconvert get-job --id 1234567890abcdef1234567890abcdef

# Wait for: "Status": "COMPLETE"
```

**4. Update status.json to complete:**
```bash
# Write metadata/status.json with status = complete
aws s3 cp metadata/status.json s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/metadata/status.json
```

**5. Verify output:**
```bash
# Confirm test-001-final.mp4 exists
aws s3 ls s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/exports/

# Download and verify
aws s3 cp s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/exports/test-001-final.mp4 local-final.mp4
ffprobe local-final.mp4
```

**Proof of completion:** When MediaConvert output matches I-1 output (duration ~64 seconds, both audio and video present), I-2 is ready for Step Functions integration.

### I-3: Replace Placeholder with Generated Clips 🟡 ACTIVE

#### I-3.1: Manual Generated Clip Proof ✅ COMPLETE

**Objective:** Generate one short AI video clip and store in S3.

**Method:**
- Used AWS Bedrock Nova Reel in us-east-1 (video generation available in this region)
- Prompt: "Clean modern abstract motion background, soft blue and indigo gradients, subtle flowing lines, calm professional SaaS technology atmosphere, no text, no people, no logos."
- Generated output: `output.mp4` from Bedrock async job

**Cross-region execution:**
- Generation region: **us-east-1** (where Nova Reel models are available)
- Canonical storage: **eu-north-1** (where workflow bucket lives)
- Output workflow: us-east-1 Bedrock output → copied to eu-north-1 S3 → MediaConvert input

**Result:**
✅ Video generated in us-east-1 Bedrock: `s3://bedrock-video-generation-us-east-1-rix1i5/39xbaiwu5i3c/output.mp4`
✅ Video copied to canonical location: `s3://prochat-video-dev-909439522876-eu-north-1-an/jobs/test-001/video-generated/generated-001.mp4`
✅ Video is playable and ready for MediaConvert input

**Metadata update:**
- Added to `metadata/assets.json` with source and generation metadata
- Path: `jobs/test-001/video-generated/generated-001.mp4`
- Type: `generated-clip`

#### I-3.2: Integrate Generated Clip into MediaConvert ⬜ READY

**Objective:** Update MediaConvert assembly to use generated-001.mp4 instead of sample-transcoded.mp4.

**Change required:**
- Lambda: `video-orchestrator-mediaconvert`
- Field: VideoInput parameter
- Current: `s3://.../jobs/test-001/exports/sample-transcoded.mp4`
- New: `s3://.../jobs/test-001/video-generated/generated-001.mp4`

**Implementation:**
1. Update lambda-mediaconvert.py with new input path
2. Re-deploy function to AWS
3. Test end-to-end workflow with generated clip
4. Verify output in jobs/test-001/exports/

**Important:** Do not change the output naming caveat yet. MediaConvert will still output `sample-transcoded-final.mp4` (input-based naming) unless we adjust the destination strategy in I-3+ cleanup phase.

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
