# ProChat OS Roadmap

**Status:** canonical roadmap  
**Owner:** Steve Westhoek  
**Last updated:** 2026-05-29

## Roadmap principle

Build ProChat OS in phases.

Do not start with the full platform, full SaaS, or every connector.

Start with a tangible demo, validate one painful workflow, then productize the runtime.

## Execution control

This roadmap is the canonical progress-control document for ProChat OS execution.

Every implementation slice should have:

- one phase
- one goal
- one bounded task
- one clear output
- one validation step
- one commit
- one handoff note or resume point

Use this order for every work session:

```text
read canonical strategy
→ identify active roadmap phase
→ execute the next bounded task
→ validate
→ commit only touched files
→ update the roadmap status or handoff note when state changes
```

Low-reasoning LLMs should be given only one bounded task at a time, with exact files, expected output, validation command, and commit message.

## Active execution lane

The broad business roadmap still starts with the legal/MikeOSS wedge for customer discovery.

The active engineering lane is the AWS-backed Video Orchestrator proof because it validates ProChat OS workflows and creates internal content for ProChat and Says The Bible.

This does not change the business positioning: ProChat OS is the product; Video Orchestrator is a module.

Current implementation progress:

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

Canonical metadata files:

```text
metadata/job.json
metadata/status.json
metadata/approvals.json
metadata/assets.json
metadata/cost.json
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

### Phase 3 — Approval Checkpoint

#### H. Define approval checkpoint contract

**Goal:** Define the script approval gate and manual approval workflow.

**Scope:**
- Script approval is the first approval gate.
- Step Functions stops after generating script and writing approvals.json.
- Workflow state is "awaiting_script_approval".
- Manual approval means human edits approvals.json file.
- No UI approval, no API approval, no automation in v1.
- No calls to Polly/Transcribe/MediaConvert yet.

**Requirement:** 
- metadata/approvals.json writes `script.status = "pending"` after generation.
- metadata/status.json writes `status = "awaiting_script_approval"`.
- Step Functions workflow stops and waits for approval.
- Future workflow resumes when script.status becomes "approved".

**Approval path (manual):**
1. Step Functions generates script and writes approvals.json.
2. Human reviews script in metadata/job.json.
3. Human edits metadata/approvals.json by setting script.status to "approved".
4. Later invocation resumes workflow.

**Output:**
- Updated prochat-os-strategy.md with approval gate description
- Updated prochat-os-roadmap.md with Phase 3 details
- Updated live/video.md with approval checkpoint spec
- Commitment to implement this in Phase 3 without building UI

**Validation:** Human can review script, edit approvals.json, and trigger resume without UI.

Do not move to complete 60-second generation until approval checkpoint contract is tested with one end-to-end flow.

### Phase 4 — Internal Video Assembly

#### I. Generate one complete 60-second internal video

**Goal:** Prove end-to-end internal MP4 generation using already-validated assets, before automating through Step Functions.

**Available test-001 assets:**

```text
jobs/test-001/scripts/script.md — approved script
jobs/test-001/audio/narration.mp3 — approved narration
jobs/test-001/captions/transcript.json — transcript
jobs/test-001/video-raw/sample.mp4 — raw video
jobs/test-001/exports/sample-transcoded.mp4 — transcoded video
jobs/test-001/metadata/approvals.json — script.status = approved
```

**Required output:**

```text
jobs/test-001/exports/test-001-final.mp4 — final 60-second video
```

#### I-1: Manual Final Video Assembly

**Goal:** Combine narration + transcoded video into final MP4 manually to prove the concept.

**Process:**
1. Use existing narration.mp3 as audio track
2. Use existing sample-transcoded.mp4 as visual track
3. Combine audio and video using MediaConvert or local FFmpeg
4. Keep simple: no burned-in captions yet (optional enhancement)
5. Output: `jobs/test-001/exports/test-001-final.mp4`

**Validation:**
- Final MP4 exists and is playable
- Audio and video are synchronized
- Duration is approximately 60 seconds

**Why manual first?** Validates the full pipeline end-to-end before automating. Proves the contract works. Allows easy iteration.

#### I-2: Automate Assembly Through Step Functions

Integrate final assembly step into Step Functions after approval.

Workflow after approval:
1. Check approvals.json for script.status = approved
2. Retrieve narration.mp3 and sample-transcoded.mp4
3. Run MediaConvert final assembly job
4. Write test-001-final.mp4 to exports/
5. Update status.json with status = complete

#### I-3: Replace Placeholder with Generated Clips

Replace sample-transcoded.mp4 with real video generated by Bedrock Nova Reel.

#### I-4: Add Thumbnail Generation

Generate and store preview thumbnail using Nova Canvas or MediaConvert snapshot.

#### I-5: Generate Real Internal Content

Move to production internal content:
- First Says The Bible short video
- First ProChat workflow demonstration video
- Real topic instead of test-001

**Scope constraints for Phase 4:**
- No customer UI yet
- No publishing integration yet
- No multiple templates yet
- No model provider selection UI
- No automatic approvals
- No asset tracking dashboard yet
- Manual S3 browsing for verification

## Phase 0 — Strategy and definition

Status: complete enough to proceed.

Outputs:

- canonical strategy: `prochat-os-strategy.md`
- technical definition: `prochat-os-technical-definition.md`
- go-to-market: `prochat-os-go-to-market.md`
- MikeOSS legal demo plan: `mikeoss-law-firm-demo-plan.md`
- discovery history: `prochat-os-strategy-draft.md`

Exit criteria:

- ProChat OS is clearly defined as Agentic Workflow OS
- website remains business-agnostic
- law firms are first outreach wedge
- MikeOSS role is defined
- technical core is defined

## Phase 1 — Legal demo wedge

Goal:

Create a concrete demo law firms can understand.

Primary artifact:

```text
private MikeOSS Dokploy demo + fake legal matter data + Loom demo
```

Tasks:

- deploy MikeOSS on existing Dokploy environment for the demo
- use `legal.prochat.tools` and `legal-api.prochat.tools`
- use hosted Supabase and Cloudflare R2 for fast setup
- keep AWS for later customer-owned or ProChat-managed production installs
- create fake legal matter pack
- show messy documents and notes becoming structured legal/admin output
- record 60–90 second Loom
- write short outreach message
- send to selected local law firms

Success criteria:

- law firms understand the before/after
- at least one firm agrees to a discovery call
- prospects can name painful document/admin workflows

## Phase 2 — Workflow discovery

Goal:

Find the first real workflow to automate.

Do not assume from the outside.

Ask prospects:

- what repetitive admin/document/intake task they hate most
- where the information comes from
- what the final output should look like
- how often it happens
- how long it takes manually
- what tools are involved
- what needs approval
- what it would be worth monthly

Exit criteria:

```text
first niche + first workflow + first managed pilot promise
```

## Phase 3 — First managed pilot

Goal:

Install a private ProChat OS/MikeOSS pilot for one law firm.

Preferred pilot model:

```text
free setup + higher monthly managed plan after 30 days
```

Pilot scope:

- private environment
- fake/sample data first, real data only after trust and approval
- one workflow only
- human approval first
- structured output
- redacted logs/support path
- clear success metric

Possible first workflow:

```text
messy client intake → structured matter/client summary + missing-info checklist + task list + draft follow-up
```

Exit criteria:

- customer uses the workflow
- customer sees time savings
- customer understands managed value
- customer is willing to continue or refer

## Phase 4 — ProChat OS v1 runtime

Goal:

Extract the core runtime into a productized installable ProChat OS instance.

V1 components:

- core workflow API
- worker/scheduler
- memory database
- one input connector
- one output connector
- event log
- human approval queue
- simple console/status page
- CLI install/status/support commands
- one model provider
- optional MikeOSS module

Non-goals:

- full multi-tenant SaaS
- every connector
- perfect model routing
- deep CRM integrations
- autonomous unsupervised actions
- broad shell access
- complex dashboard-first UX

Exit criteria:

- ProChat OS can be installed without private Steve-specific repos
- customer memory is separate from Steve's mind repo
- customer credentials are separate
- first workflow can run end to end

## Phase 5 — Website and public GitHub release

Goal:

Publish business-agnostic ProChat OS positioning and a source-available personal/non-commercial repo.

Website should focus on:

- Agentic Workflow OS
- messy inputs to structured outputs
- private workflow runtime
- business tools integration
- managed ProChat OS
- human approval first

Website should not focus on:

- law firms only
- MikeOSS as the main product
- legacy SaaS kits
- dashboard screenshots as the whole product

GitHub release should include:

- clear license
- commercial license notice
- trademark policy
- install docs
- architecture docs
- module docs
- examples
- no private memory or secrets

Exit criteria:

- public ProChat OS story is coherent
- free personal/non-commercial use path is clear
- commercial/managed path is clear

## Phase 6 — Managed ProChat OS offer

Goal:

Turn pilots into a repeatable managed productized service.

Offer:

```text
Managed ProChat OS
Private Agentic Workflow OS installation, setup, updates, support, and one or more workflow modules.
```

Commercial elements:

- commercial license
- managed hosting/support
- setup/configuration
- workflow modules
- update path
- support bundle process
- backup/restore policy

Exit criteria:

- one repeatable offer
- onboarding checklist
- support checklist
- pricing model
- pilot-to-paid conversion path

## Phase 7 — Organic content engine

Goal:

Attract SaaS builders, creators, influencers, and personal developers without direct outreach.

Content demos:

- Git commits to X posts
- research to video outline
- messy notes to content plan
- AWS-backed Video Orchestrator module demos
- local app building
- business memory workflows

Channels:

- YouTube
- Facebook pages/groups/channels
- build-in-public
- automated social workflows

Video principle:

```text
ProChat OS owns workflows.
AWS owns media execution.
```

The canonical Video Orchestrator strategy, roadmap, implementation plan, cost controls, S3 layout, and architecture diagram live in:

```text
prochat-os-strategy.md
```

V1 is narrow: one internal workflow, one exported MP4, no publishing automation, no account management, no customer-facing SaaS dashboard, and no local video-generation production path.

V1 workflow:

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

First internal users:

- Says The Bible
- ProChat

Exit criteria:

- content shows ProChat OS operating real workflows
- inbound audience understands the product without law-firm framing
- organic demos create leads for managed/custom installs
- video demos validate ProChat OS instead of becoming a separate media product

## Phase 8 — Shared ProChat Cloud modules

Goal:

Add shared cloud/API modules only after single-tenant pilots prove demand.

Principle:

```text
Share generic computation.
Isolate private context.
```

Good shared candidates:

- content generation
- AWS-backed video execution
- public monitoring checks
- template generation
- license checks
- update checks

Avoid sharing too early:

- private memory
- customer files
- credentials
- autonomous actions
- sensitive workflows
- generated media state that belongs in S3 or the execution backend

Exit criteria:

- single-tenant model works
- safe modules are clear
- billing/support model is understood
- tenant/security model is ready

## Long-term direction

ProChat OS evolves into:

```text
private customer instances + optional ProChat Cloud services + modular workflow agents + managed commercial support
```

The goal is not another narrow SaaS tool.

The goal is the operating layer for agentic workflows.
