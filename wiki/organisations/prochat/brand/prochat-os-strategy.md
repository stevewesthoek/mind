# ProChat OS Strategy

**Status:** canonical strategy  
**Owner:** Steve Westhoek  
**Last updated:** 2026-05-29  
**Source history:** `prochat-os-strategy-draft.md`

## Strategic decision

ProChat OS is the flagship product of ProChat.

ProChat is no longer primarily positioned around fixed SaaS kits, WaaSKit, or a narrow non-technical-founder SaaS education path. Those products remain real, but they are now legacy products and no longer define the company direction.

The company direction is now:

```text
Agentic workflows.
Modular automation.
Private workflow runtimes.
Managed ProChat OS installations.
```

## Category

ProChat OS operates in the category:

```text
Agentic Workflow OS
```

Plain-language explanation:

```text
ProChat OS is the middle layer between messy business inputs and the tools a business already uses.
```

## What ProChat OS is

ProChat OS is an installable Agentic Workflow OS that gives businesses, solo builders, and workflow-driven operators a private agentic employee for memory, automation, local apps, content, operations, and execution.

It connects messy inputs to business tools through configurable workflows, memory, model routing, agents, approvals, logs, connectors, and a control console.

Core description:

```text
ProChat OS turns messy information from emails, files, forms, notes, APIs, and folders into structured outputs, tasks, reports, drafts, updates, and actions.
```

## What ProChat OS is not

ProChat OS is not:

- a chatbot
- a dashboard only
- a generic AI wrapper
- a single SaaS tool
- a fixed SaaS kit
- MikeOSS
- a media company
- a Runway, HeyGen, CapCut, or Adobe competitor
- the model router alone
- the memory store alone
- the Brain Console alone

Those can be components, modules, or wedges. ProChat OS is the runtime system that coordinates them.

## Core product promise

```text
Agentic workflows that work for you 24/7.
```

Supporting promise:

```text
You keep working the way you work. ProChat OS sits in the middle and structures the mess.
```

## Main problem

Modern AI tools are powerful, but most work still happens manually around them.

The customer still has to:

- copy information into chat windows
- write prompts repeatedly
- move outputs to other tools
- reformat information
- create tasks manually
- update CRM or business systems manually
- remember context manually
- restart the process for every task

This is not scalable.

## Enemy

The enemy is:

```text
manual AI glue work
```

Manual AI glue work means using AI as an isolated assistant instead of an integrated workflow layer.

ProChat OS turns AI from a passive chat tool into a connected agentic workflow system.

## Audience

### Primary public audience

The ProChat website is business-agnostic.

It should target:

- small businesses
- local businesses
- solo builders
- personal developers
- workflow-driven operators
- creators and influencers
- SaaS builders
- businesses that want AI/agentic automation without stitching tools together manually

### Direct outreach audience

The first direct-sales niche is:

```text
law firms
```

Law firms are a go-to-market wedge, not the entire ProChat strategy.

### Secondary direct outreach niche

```text
accountants
```

Accountants are the second local comparison niche if law-firm response is weak or if accounting workflows prove easier to sell.

### Organic channel audience

Creators, SaaS builders, influencers, and personal developers should be reached through organic content channels, not direct local sales.

Primary channels:

- YouTube
- Facebook channels/pages/groups
- automated or semi-automated social content

## Website positioning

The ProChat website should not be primarily about law firms, accountants, MikeOSS, video generation, or legacy kits.

The website should focus on ProChat OS as a business-agnostic Agentic Workflow OS.

Website framing:

```text
ProChat OS connects to the way your business already works.
It takes messy input from many places, understands it, structures it, and sends useful output where it needs to go.
The dashboard is only the command center.
```

Homepage direction:

```text
Agentic workflows between your messy inputs and your business tools.
```

## Technical foundation

The product is technically an installable private workflow runtime.

Core components:

1. workflow runtime / API
2. memory and context store
3. input/output connectors
4. model router / AI selector
5. approval and event log
6. control console
7. CLI for install, update, configuration, and support
8. optional workflow modules

The full technical definition lives in:

```text
prochat-os-technical-definition.md
```

## Canonical document hierarchy

Use this hierarchy to prevent strategy drift:

1. `prochat-os-strategy.md` defines the business direction and non-goals.
2. `prochat-os-roadmap.md` defines phase order, active execution lane, and progress tracking rules.
3. `prochat-os-technical-definition.md` defines the installable runtime and module boundaries.
4. `prochat-os-go-to-market.md` defines public positioning, outreach wedges, and validation rules.
5. Live notes such as `live/video.md` are visibility surfaces only, not strategy sources.

If documents conflict, update the lower-level document to match the higher-level canonical source.

## Canonical Video Orchestrator direction

The Video Orchestrator is a ProChat OS module, not a separate platform.

Canonical direction:

```text
ProChat OS owns workflows.
AWS owns media execution.
```

Architecture:

```text
ProChat OS
  ↓
Video Orchestrator Module
  ↓
AWS Execution Layer
```

ProChat OS owns:

- workflow definitions
- job creation
- templates
- prompt history
- asset metadata
- human approvals
- logs
- retry actions
- publishing checklists
- future publishing integrations
- references to generated assets

AWS owns:

- Bedrock
- Polly
- Transcribe
- Nova Reel
- Nova Canvas
- MediaConvert
- S3
- Step Functions
- Lambda
- CloudFront
- generation, rendering, storage, transcoding, and long-running media execution

Exact AWS service responsibilities:

- S3 stores assets and job folders.
- Bedrock generates scripts, prompts, images, and video clips.
- Polly generates narration.
- Transcribe generates captions and transcripts.
- MediaConvert renders, transcodes, and exports MP4 outputs.
- Step Functions owns the AWS-side orchestration state machine.
- Lambda performs glue tasks only.
- CloudFront is optional delivery later, only when signed delivery is needed.

Exact ProChat OS responsibilities:

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

Reason for this decision:

- faster time-to-market
- less infrastructure maintenance
- better scaling
- better observability
- better retry/recovery
- better asset management
- better async processing
- better use of available AWS credits

The old local-first direction is no longer canonical for video. Local AI can still be used later for drafts, cheap text tasks, experiments, or privacy-sensitive workflows, but the first production video pipeline should use AWS as the execution backend.

## Video Orchestrator purpose

ProChat OS is not a media company.

The Video Orchestrator exists to:

1. generate content for ProChat
2. generate content for Says The Bible
3. validate the workflow runtime
4. showcase ProChat OS through real workflows
5. eventually become a paid ProChat OS module

The purpose is not to compete with Runway, HeyGen, CapCut, Adobe, or full creative-studio tools.

The first promise should be:

```text
Generate short social videos with script, scenes, narration, captions, thumbnail, and platform-ready exports.
```

The first promise should not be:

```text
Fully automated high-end YouTube studio.
```

## Video Orchestrator audit summary

Audit findings from the current repo state:

- No large standalone Video Studio strategy file was found in the canonical ProChat brand docs.
- The existing roadmap mentions video orchestration as an organic content example and video planning as a future shared module.
- The live video note treats Brain Core as the owner of runtime video status, which risks implying a separate local orchestration runtime.
- The technical definition already supports optional modules, shared computation, human approvals, logs, and model/provider routing.
- The docs need one clear rule to avoid drift: ProChat OS owns workflow state; AWS owns media execution.

Conflicting or outdated assumptions to remove:

- local-first video generation as the main production path
- local rendering as the first implementation path
- local asset management as the durable media store
- any separate Video Studio platform outside ProChat OS
- any second orchestration runtime for video jobs
- any roadmap that treats video generation as the main company product

## Video Orchestrator roadmap

This is the only canonical video roadmap.

### Phase 1 — Foundation

Goal: prove the AWS execution layer works before building product UI.

Tasks:

- prepare AWS account and permissions
- create S3 asset storage structure
- validate Bedrock access
- validate Polly narration
- validate Transcribe captions
- validate MediaConvert rendering/transcoding
- validate basic Step Functions orchestration

Exit criteria:

```text
A developer can run one controlled AWS-backed media test and inspect outputs in S3.
```

### Phase 2 — First Workflow

Goal: create the first approved content workflow without full video generation complexity.

Workflow:

```text
Topic
→ Script
→ Scene prompts
→ Human approval
→ Voiceover
→ Asset storage
```

Exit criteria:

```text
A ProChat or Says The Bible topic becomes an approved script, scene plan, voiceover, and stored assets.
```

## Approval checkpoint strategy

The first approval gate is script approval.

ProChat OS owns the approval decision and approval gate. AWS executes media generation and stops at each gate until approval.

### Approval contract

**metadata/approvals.json** defines the approval checkpoint state for each job.

```json
{
  "jobId": "job-id",
  "approvals": {
    "script": {
      "status": "pending|approved|rejected",
      "approvedBy": "user-id or null",
      "approvedAt": "2026-05-29T12:00:00Z or null",
      "notes": "approval notes or null"
    },
    "scenes": {
      "status": "not_required|pending|approved|rejected",
      "approvedBy": null,
      "approvedAt": null,
      "notes": null
    },
    "final": {
      "status": "not_required|pending|approved|rejected",
      "approvedBy": null,
      "approvedAt": null,
      "notes": null
    }
  }
}
```

### Step Functions behavior at approval gates

1. Step Functions generates script from topic using Bedrock.
2. Step Functions writes script to metadata/job.json.
3. Step Functions writes approvals.json with script.status = "pending".
4. Step Functions writes status.json with status = "awaiting_script_approval".
5. Step Functions stops execution.
6. Human approves by editing metadata/approvals.json.
7. Human sets script.status = "approved" and optionally adds approvedBy, approvedAt, notes.
8. Later Lambda invocation or Step Functions resume trigger continues to next phase.
9. If script.status = "rejected", workflow stops and notifies.

### Human approval workflow (v1)

In v1, approval is manual:

1. Developer/human reviews job folder.
2. Human reads generated script in metadata/job.json.
3. Human edits metadata/approvals.json directly.
4. Human sets script.status to "approved" or "rejected".
5. Human optionally adds approvedBy and notes.
6. Human triggers next workflow step via Lambda console or workflow resume.

### Future approval workflows

- ProChat OS UI approval form (ProChat OS owns approval UI)
- Approval API endpoint (ProChat OS owns approval logic)
- Webhook approval integration (ProChat OS owns webhook logic)
- Slack approval bot (ProChat OS owns bot)

Automation of approvals (always-approve workflows) is out of scope for the first approval gate.

### Reason for this design

- Clear separation of concerns: ProChat OS owns decisions, AWS owns execution.
- Gates are explicit and testable without UI.
- Manual approval in v1 validates the workflow before automating.
- Approval state is durable and audit-able in S3.
- Future approval UIs can read/write the same metadata file.
- Easy to extend with more approval gates later.

### Phase 4 — Internal Video Assembly

Goal: create one end-to-end internal MP4 export using validated assets before automating through Step Functions.

Status: **I-1 complete, I-2 active**

Workflow:

```text
I-1: Manual assembly validation (narration + transcoded video → final MP4)  ✅ COMPLETE
I-2: Automate assembly through Step Functions + MediaConvert  🟡 ACTIVE
I-3: Replace placeholder with generated clips
I-4: Add thumbnail generation
I-5: Generate real internal content (Says The Bible or ProChat)
```

Exit criteria I-1:

```text
One internal 60-second MP4 created from validated assets and exported to S3.
Audio and video are synchronized.
Workflow contract validated before moving to AWS automation.
```

Exit criteria I-1 met:

```text
✅ jobs/test-001/exports/test-001-final.mp4 exists and is playable
✅ Duration: 64.033333 seconds
✅ Audio/video synchronized
✅ Validation used local ffmpeg as temporary shortcut (not production path)
```

Exit criteria I-2:

```text
Final assembly automated through Step Functions after approval.
MediaConvert is the canonical execution engine.
```

Important distinction:

```text
I-1 used local ffmpeg as validation shortcut to prove the concept works end-to-end.
I-2 moves to AWS MediaConvert as the canonical production execution path.
AWS owns media execution; Step Functions owns orchestration.
```

### Phase 5 — Video Generation with Automation

Goal: automate video generation through the complete workflow.

Workflow:

```text
Topic
→ Script (Bedrock)
→ Scenes (Nova Canvas prompts)
→ Voice (Polly)
→ Generated clips (Nova Reel)
→ Captions (Transcribe)
→ Thumbnail (Nova Canvas)
→ Export (MediaConvert)
```

Exit criteria:

```text
One short video can be automatically generated, rendered, stored, and exported from one workflow definition.
```

### Phase 6 — ProChat OS Integration

Goal: make the workflow visible and controllable through ProChat OS.

Tasks:

- job console
- workflow management
- logs
- asset browser
- approval screens
- retry actions
- publishing checklist state

Exit criteria:

```text
A user can create, review, approve, monitor, retry, and inspect a video job from ProChat OS.
```

### Phase 5 — Publishing Layer

Goal: prepare platform-specific publishing workflows.

Targets:

- YouTube Shorts
- TikTok
- Reels
- metadata generation
- publishing checklists first
- API publishing integrations later

Exit criteria:

```text
A finished video has platform-ready assets, captions, titles, descriptions, and checklist state.
```

## Video Orchestrator implementation plan

Do not build fantasy enterprise architecture.

Only support one workflow initially.

Primary objective:

```text
Validate ProChat OS through real internal workflows before supporting external users.
```

Initial internal content users:

- Says The Bible
- ProChat content

Do not build for external customers before the internal workflow produces repeatable videos.

MVP boundary:

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

V1 does not support multiple workflows, many channels, account management, scheduling, or publishing automation.

First MVP workflow:

```text
Topic
→ 60 second script
→ 5 scene prompts
→ human approval
→ Polly narration
→ 5 generated clips
→ captions
→ thumbnail
→ final render
→ exported MP4
```

First implementation sequence:

✅ A. Create private S3 dev bucket  
✅ B. Test Bedrock text generation  
✅ C. Test Polly text-to-speech into S3  
✅ D. Test Transcribe captions from audio  
✅ E. Test MediaConvert on one sample clip  
✅ F. Create first Step Functions skeleton  
⬜ G. Add ProChat OS job metadata  
⬜ H. Add approval checkpoint  
⬜ I. Generate one complete 60-second internal video

Infrastructure validation status:

```text
COMPLETE
```

Validated outputs:

```text
metadata/status-started.json
metadata/status-completed.json
scripts/generated script output
scripts/usage tracking output
audio/narration.mp3
captions/transcript.json
exports/sample-transcoded.mp4
```

The validated architecture is:

```text
ProChat OS
→ starts workflow
Step Functions
→ orchestrates workflow
S3
→ stores workflow state and media assets
```

Current next implementation task:

```text
G. Canonical Job Metadata Schema
```

Expected output:

```text
Replace ad-hoc metadata with canonical per-job metadata files:
metadata/job.json
metadata/status.json
metadata/approvals.json
metadata/assets.json
metadata/cost.json
```

Goal:

```text
One source of truth per job.
```

These metadata files are the contract between ProChat OS and AWS execution. ProChat OS should read and write workflow intent, approvals, status, asset references, and cost metadata through these files. AWS execution should update execution state and generated asset references through the same contract.

Canonical S3 metadata structure:

```text
jobs/
  {jobId}/
    metadata/
      job.json
      status.json
      approvals.json
      assets.json
      cost.json
    input/
    scripts/
    audio/
    video-raw/
    captions/
    thumbnails/
    exports/
    logs/
```

### metadata/job.json

Purpose: static job definition.

```json
{
  "jobId": "vo-20260529-001",
  "templateId": "short-internal-video",
  "title": "Example ProChat OS Short",
  "topic": "How ProChat OS turns messy inputs into structured workflows",
  "owner": "prochat",
  "internalUseCase": "ProChat content",
  "targetDurationSeconds": 60,
  "targetPlatforms": ["youtube-shorts"],
  "createdAt": "2026-05-29T12:00:00Z",
  "updatedAt": "2026-05-29T12:00:00Z",
  "environment": "dev",
  "statusFile": "metadata/status.json",
  "assetsFile": "metadata/assets.json",
  "approvalsFile": "metadata/approvals.json",
  "costFile": "metadata/cost.json"
}
```

### metadata/status.json

Purpose: current workflow state.

Allowed statuses:

```text
draft
script_generated
awaiting_script_approval
narration_generated
captions_generated
video_processed
awaiting_final_approval
exported
failed
cancelled
```

```json
{
  "jobId": "vo-20260529-001",
  "status": "script_generated",
  "currentStep": "bedrock_script_generation",
  "completedSteps": [
    "s3_job_folder_created",
    "bedrock_script_generation"
  ],
  "failedStep": null,
  "lastError": null,
  "startedAt": "2026-05-29T12:00:00Z",
  "completedAt": null,
  "updatedAt": "2026-05-29T12:03:00Z",
  "stepFunctionsExecutionArn": "arn:aws:states:eu-west-1:123456789012:execution:video-orchestrator-dev:vo-20260529-001",
  "retryCount": 0
}
```

### metadata/approvals.json

Purpose: human approval gates.

Allowed approval statuses:

```text
not_required
pending
approved
rejected
```

```json
{
  "jobId": "vo-20260529-001",
  "approvals": {
    "script": {
      "status": "pending",
      "approvedBy": null,
      "approvedAt": null,
      "notes": null
    },
    "scenes": {
      "status": "pending",
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

### metadata/assets.json

Purpose: track all generated and uploaded assets.

Each asset must include `assetId`, `type`, `s3Uri`, `contentType`, `sizeBytes`, `createdAt`, `provider`, and `step`. `checksum` is optional.

```json
{
  "jobId": "vo-20260529-001",
  "inputs": [
    {
      "assetId": "asset-input-topic-001",
      "type": "topic",
      "s3Uri": "s3://prochat-video-dev/jobs/vo-20260529-001/input/topic.json",
      "contentType": "application/json",
      "sizeBytes": 512,
      "createdAt": "2026-05-29T12:00:00Z",
      "provider": "prochat-os",
      "step": "job_created",
      "checksum": null
    }
  ],
  "scripts": [
    {
      "assetId": "asset-script-001",
      "type": "script",
      "s3Uri": "s3://prochat-video-dev/jobs/vo-20260529-001/scripts/script.json",
      "contentType": "application/json",
      "sizeBytes": 4096,
      "createdAt": "2026-05-29T12:03:00Z",
      "provider": "bedrock",
      "step": "bedrock_script_generation",
      "checksum": null
    }
  ],
  "audio": [
    {
      "assetId": "asset-audio-001",
      "type": "narration",
      "s3Uri": "s3://prochat-video-dev/jobs/vo-20260529-001/audio/narration.mp3",
      "contentType": "audio/mpeg",
      "sizeBytes": 980000,
      "createdAt": "2026-05-29T12:08:00Z",
      "provider": "polly",
      "step": "polly_narration",
      "checksum": null
    }
  ],
  "videoRaw": [],
  "captions": [
    {
      "assetId": "asset-captions-001",
      "type": "transcript",
      "s3Uri": "s3://prochat-video-dev/jobs/vo-20260529-001/captions/transcript.json",
      "contentType": "application/json",
      "sizeBytes": 12000,
      "createdAt": "2026-05-29T12:12:00Z",
      "provider": "transcribe",
      "step": "transcribe_captions",
      "checksum": null
    }
  ],
  "thumbnails": [],
  "exports": [
    {
      "assetId": "asset-export-001",
      "type": "mp4",
      "s3Uri": "s3://prochat-video-dev/jobs/vo-20260529-001/exports/sample-transcoded.mp4",
      "contentType": "video/mp4",
      "sizeBytes": 8500000,
      "createdAt": "2026-05-29T12:20:00Z",
      "provider": "mediaconvert",
      "step": "mediaconvert_export",
      "checksum": null
    }
  ],
  "logs": []
}
```

### metadata/cost.json

Purpose: track budget and estimated cost. Cost tracking can be approximate in v1.

```json
{
  "jobId": "vo-20260529-001",
  "budgetLimitUsd": 5.0,
  "estimatedCostUsd": 1.25,
  "actualCostUsd": null,
  "currency": "USD",
  "costItems": [
    {
      "service": "bedrock",
      "step": "bedrock_script_generation",
      "usageUnit": "tokens",
      "usageAmount": 1800,
      "estimatedUsd": 0.05
    },
    {
      "service": "polly",
      "step": "polly_narration",
      "usageUnit": "characters",
      "usageAmount": 900,
      "estimatedUsd": 0.02
    },
    {
      "service": "transcribe",
      "step": "transcribe_captions",
      "usageUnit": "audio_seconds",
      "usageAmount": 60,
      "estimatedUsd": 0.03
    },
    {
      "service": "mediaconvert",
      "step": "mediaconvert_export",
      "usageUnit": "output_minutes",
      "usageAmount": 1,
      "estimatedUsd": 0.15
    }
  ],
  "retryCostUsd": 0.0,
  "updatedAt": "2026-05-29T12:20:00Z"
}
```

G completion criteria:

```text
The schema examples above define the contract all future code must use.
```

## F/G bridge — Step Functions writes canonical status metadata

Status:

```text
COMPLETE
```

Validation result:

```text
jobs/test-001/metadata/status.json exists and status is exported.
```

The bridge proved the schema is not only documentation: Step Functions writes and updates `metadata/status.json` instead of `metadata/status-started.json` and `metadata/status-completed.json`.

Scope boundaries for the bridge:

- keep this as a skeleton state machine only
- do not call Bedrock, Polly, Transcribe, or MediaConvert yet
- do not build approval UI
- do not build a customer dashboard
- do not expand providers
- do not redesign the workflow

Required behavior:

1. On start, write `jobs/{jobId}/metadata/status.json` using the canonical `status.json` shape.
2. Use `draft` as the closest documented starting status.
3. After the wait/test step, overwrite the same `metadata/status.json` file.
4. Use `exported` as the documented completed status.
5. Stop targeting `metadata/status-started.json` and `metadata/status-completed.json`.

Minimal ASL skeleton:

```json
{
  "Comment": "AWS-backed Video Orchestrator skeleton that writes canonical metadata/status.json only.",
  "StartAt": "BuildStartedStatus",
  "States": {
    "BuildStartedStatus": {
      "Type": "Pass",
      "Parameters": {
        "bucket.$": "$.bucket",
        "jobId.$": "$.jobId",
        "statusDocument": {
          "jobId.$": "$.jobId",
          "status": "draft",
          "currentStep": "skeleton_started",
          "completedSteps": [],
          "failedStep": null,
          "lastError": null,
          "startedAt.$": "$.State.EnteredTime",
          "completedAt": null,
          "updatedAt.$": "$.State.EnteredTime",
          "stepFunctionsExecutionArn.$": "$.Execution.Id",
          "retryCount": 0
        }
      },
      "Next": "WriteStartedStatus"
    },
    "WriteStartedStatus": {
      "Type": "Task",
      "Resource": "arn:aws:states:::aws-sdk:s3:putObject",
      "Parameters": {
        "Bucket.$": "$.bucket",
        "Key.$": "States.Format('jobs/{}/metadata/status.json', $.jobId)",
        "ContentType": "application/json",
        "Body.$": "States.JsonToString($.statusDocument)"
      },
      "ResultPath": null,
      "Next": "WaitForSkeletonTest"
    },
    "WaitForSkeletonTest": {
      "Type": "Wait",
      "Seconds": 5,
      "Next": "BuildCompletedStatus"
    },
    "BuildCompletedStatus": {
      "Type": "Pass",
      "Parameters": {
        "bucket.$": "$.bucket",
        "jobId.$": "$.jobId",
        "statusDocument": {
          "jobId.$": "$.jobId",
          "status": "exported",
          "currentStep": "complete",
          "completedSteps": [
            "skeleton_started",
            "status_json_written",
            "wait_test_completed"
          ],
          "failedStep": null,
          "lastError": null,
          "startedAt.$": "$.Execution.StartTime",
          "completedAt.$": "$.State.EnteredTime",
          "updatedAt.$": "$.State.EnteredTime",
          "stepFunctionsExecutionArn.$": "$.Execution.Id",
          "retryCount": 0
        }
      },
      "Next": "WriteCompletedStatus"
    },
    "WriteCompletedStatus": {
      "Type": "Task",
      "Resource": "arn:aws:states:::aws-sdk:s3:putObject",
      "Parameters": {
        "Bucket.$": "$.bucket",
        "Key.$": "States.Format('jobs/{}/metadata/status.json', $.jobId)",
        "ContentType": "application/json",
        "Body.$": "States.JsonToString($.statusDocument)"
      },
      "End": true
    }
  }
}
```

Test input:

```json
{
  "bucket": "prochat-video-dev",
  "jobId": "test-001"
}
```

Validation checklist:

```text
Run one execution against test-001.
Confirm S3 contains jobs/test-001/metadata/status.json.
Confirm status.json is overwritten from draft to exported.
Confirm status-started.json and status-completed.json are no longer the target files.
```

Next task:

```text
H. Approval checkpoint
```

Implementation principles:

- Start with one workflow definition.
- Store durable media in S3, not in Mind.
- Store metadata, prompts, approvals, and asset references in ProChat OS.
- Use AWS for slow async media tasks.
- Keep the ProChat OS UI focused on job state, approvals, logs, retries, and assets.
- Do not add platform posting until export quality is proven.
- Do not optimize for many accounts or many templates in the first version.
- Do not build a separate Video Studio product.

Cost-control and storage rules:

- Every job has a max budget.
- Every job has max retries.
- Every generated clip has max duration.
- Failed generations are tracked.
- Raw assets get lifecycle rules.
- Dev bucket and production bucket must be separate.
- No public S3 access.
- CloudFront and signed URLs are used only when needed.

First S3 dev bucket structure:

```text
prochat-video-dev/
  jobs/
    {jobId}/
      input/
      scripts/
      audio/
      video-raw/
      captions/
      thumbnails/
      exports/
      logs/
```

Suggested module shape:

```text
modules/video-orchestrator/
  workflows/
    short-social-video.workflow.json
  templates/
    short-internal-video.json
  providers/
    aws-bedrock
    aws-polly
    aws-transcribe
    aws-mediaconvert
  approvals/
    script-approval
    scene-approval
    final-video-approval
```

First data model concepts:

- video job
- script draft
- scene plan
- prompt history
- approval state
- asset reference
- render profile
- export package
- publishing checklist

Non-goals for the first implementation:

- local video generation
- local FFmpeg as the core production path
- autonomous publishing
- multi-account social scheduling
- full video editor UX
- HeyGen clone
- Runway clone
- long-form cinematic video studio
- customer-facing SaaS dashboard
- many templates
- many model providers
- multi-tenant video SaaS
- separate Video Studio platform
- every social platform
- direct publishing APIs
- local GPU model hosting
- advanced editor UI
- talking-head avatar studio
- perfect character consistency

## Business model

ProChat OS can be offered as:

1. **Free personal/non-commercial GitHub version**
   - source-available
   - personal/non-commercial use
   - lets people inspect, fork, and use the system personally

2. **Commercial license**
   - required for business/commercial use
   - required for agencies, resale, managed hosting, or internal business use if defined by license terms

3. **Managed ProChat OS**
   - ProChat installs, configures, updates, and supports the system
   - can run on customer-owned AWS/VPS
   - can run on ProChat-managed AWS/VPS
   - can run on-premise for local/nearby customers

4. **Modular workflow blocks**
   - customers may start with one workflow outcome
   - more modules can be added over time
   - the Video Orchestrator may become a paid module after it proves value internally

## Productized service model

ProChat may sell a managed productized service.

Plain-language definition:

```text
You are not selling random custom work.
You are selling the same system repeatedly, with setup and support included.
```

For ProChat OS:

```text
ProChat installs ProChat OS, connects it to selected workflows, keeps it updated, and helps the customer run it. The core system stays the same. The modules and integrations vary by customer.
```

## Deployment philosophy

ProChat OS should become deeply integrated and sticky, but should avoid requiring broad infrastructure access where possible.

Principle:

```text
Share generic computation.
Isolate private context.
```

Customer trust model:

```text
Customer owns the infrastructure.
Customer owns the credentials.
ProChat OS runs the workflows.
ProChat support sees status and redacted logs, not secrets.
Human approval is required first.
Automation increases only after trust.
```

For video specifically:

```text
Share media execution where safe.
Isolate private workflow context, credentials, approvals, and customer memory.
```

## Go-to-market summary

### Public brand

Business-agnostic ProChat OS messaging.

### First direct wedge

Law firms, using MikeOSS as a tangible legal document AI workspace wedge.

### Second direct wedge

Accountants, if law-firm outreach underperforms or accounting workflows prove clearer.

### Organic wedge

Creators, SaaS builders, influencers, and developers through automated/organic social and YouTube channels. The Video Orchestrator should help generate this content and demonstrate ProChat OS, but it should not become the main public product identity.

Full go-to-market details live in:

```text
prochat-os-go-to-market.md
```

## MikeOSS role

MikeOSS is a law-firm wedge and implementation block.

```text
MikeOSS = legal document AI workspace
ProChat OS = Agentic Workflow OS around and beyond it
```

MikeOSS should not define the ProChat website or main product strategy.

Dedicated execution plan:

```text
mikeoss-law-firm-demo-plan.md
```

## Legacy products

The following remain real products but are now legacy/secondary:

- ProKit
- SaaSKit
- UXKit
- WaaSKit

They are not abandoned. They may later be upgraded into more agentic ProChat OS modules.

They should not drive the main website, homepage, or flagship positioning.

## Strategic spine

```text
ProChat OS is the Agentic Workflow OS for turning messy business inputs into structured work.

It is installed as a private workflow runtime, connected to the customer's existing tools, and expanded through modular agents and workflows.

The Video Orchestrator is a ProChat OS module: ProChat OS owns workflows, approvals, logs, templates, metadata, publishing state, and asset references; AWS owns media generation, rendering, storage, transcoding, and long-running execution.

The free version is available for personal/non-commercial use. Commercial and managed use requires a ProChat license or managed plan.
```

## Execution-stage decisions still open

These do not block the strategy:

- exact first law-firm workflow
- exact first pricing
- exact first AWS account and permission layout
- exact landing page copy
- exact v1 implementation plan for the core runtime
- exact demo script and outreach sequence

Those belong in roadmap, implementation, offer, and outreach docs.
