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

### Phase 3 — Video Generation

Goal: generate complete short-form video assets.

Workflow:

```text
Topic
→ Script
→ Scenes
→ Voice
→ Generated clips
→ Captions
→ Thumbnail
→ Export
```

Exit criteria:

```text
One short video can be generated, rendered, stored, and exported from one workflow definition.
```

### Phase 4 — ProChat OS Integration

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

First internal users:

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

A. Create private S3 dev bucket  
B. Test Bedrock text generation  
C. Test Polly text-to-speech into S3  
D. Test Transcribe captions from audio  
E. Test MediaConvert on one sample clip  
F. Create first Step Functions skeleton  
G. Add ProChat OS job metadata  
H. Add approval checkpoint  
I. Generate one complete 60-second internal video

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
