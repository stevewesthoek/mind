---
type: failed-capture
source: shortcut
status: needs-retry
para_type: inbox
confidence: 0
signal_quality: 0
title: "Quick capture"
created: 2026-08-13T19:53:47.013Z
failure_stage: gemini-classify
error_summary: "400 - \"{\\n  \\\"error\\\": {\\n    \\\"code\\\": 400,\\n    \\\"message\\\": \\\"API key not valid. Please pass a valid API key.\\\",\\n    \\\"status\\\": \\\"INVALID_ARGUMENT\\\",\\n    \\\"details\\\": [\\n      {\\n        \\\"@type\\\": \\\"type.googleapis.com/google.rpc.ErrorInfo\\\",\\n        \\\"reason\\\": \\\"API_KEY_INVALID\\\",\\n        \\\"domain\\\": \\\"googleapis.com\\\",\\n        \\\"metadata\\\": {\\n          \\\"service\\\": \\\"generativelanguage.googleapis.com\\\"\\n        }\\n      },\\n      {\\n        \\\"@type\\\": \\\"type.googleapis.com/google.rpc.LocalizedMessage\\\",\\n        \\\"locale\\\": \\\"en-US\\\",\\n        \\\"message\\\": \\\"API key not valid. Please pass a valid API key.\\\"\\n      }\\n    ]\\n  }\\n}\\n\""
---

# Quick capture

## Summary
Failed to classify capture; preserved for retry.

## Key Points


## Content
ProChat Automated Media & GPU Production Architecture
Status: Architecture baseline Date: 13 August 2026 Primary goal: Build a cost-efficient, highly automated media-generation platform capable of producing high-quality faceless video content for multiple YouTube/Facebook/social channels and reusable AI-generated assets for advanced 3D websites.

1. Goal
ProChat is building a reusable automated media-production system rather than a collection of individual AI-generation scripts.
The completed platform should be capable of:
* generating content ideas and scripts;
* producing narration;
* generating images and video clips;
* generating selected premium/high-quality visual sequences;
* producing reusable 3D assets for interactive websites;
* assembling complete videos automatically;
* creating multiple output formats such as long-form YouTube videos, Shorts, Facebook videos and Reels;
* storing all permanent source and output assets safely;
* running GPU-intensive workloads only when required;
* automatically terminating expensive GPU infrastructure when work is complete;
* supporting multiple content channels from the same underlying infrastructure.
The principal financial constraint is approximately $7,500 of Lambda Cloud GPU credits, currently expected to be usable over approximately 11 remaining months.
The system therefore prioritizes:
1. quality per generated asset;
2. cost per accepted output;
3. minimal GPU idle time;
4. reproducibility;
5. automation;
6. reuse of existing AWS grant infrastructure.

2. Architectural Principle
The system separates permanent infrastructure from disposable compute.
PERMANENT
AWS
├── orchestration
├── scripts / AI planning
├── narration
├── job state
├── source assets
├── generated outputs
└── permanent S3 storage

DISPOSABLE
Lambda Cloud
└── GPU-heavy generation
    ├── ComfyUI
    ├── Wan
    ├── FLUX
    ├── enhancement
    └── future 3D generation
AWS remains the control plane and permanent storage layer.
Lambda Cloud becomes the temporary GPU rendering layer.
The GPU machine is not treated as a traditional server.
The intended lifecycle is:
Prepare render batch
        ↓
Launch Lambda GPU
        ↓
Bootstrap environment
        ↓
Download / mount required models
        ↓
Process queued jobs continuously
        ↓
Upload completed assets to S3
        ↓
Verify outputs
        ↓
Terminate Lambda instance
GPU billing stops only after termination.
The GPU instance therefore remains disposable.

3. Work Completed
3.1 Existing AWS media pipeline
An AWS media-generation pipeline already exists using services including:
* AWS Step Functions
* Amazon S3
* Amazon Bedrock
* Amazon Nova
* Amazon Polly
The active production direction is centered on:
AWS region: us-east-1
An older development pipeline exists in:
eu-north-1
That older environment is not being reused for the new permanent media storage architecture.

3.2 Permanent production media bucket
A new dedicated production bucket has been created:
prochat-media-prod-909439522876-us-east-1
Naming convention:
<organization>-<workload>-<environment>-<aws-account-id>-<region>
Meaning:
prochat
media
prod
909439522876
us-east-1
This is now the canonical permanent media-storage bucket for the new architecture.

4. Current S3 Configuration
Region
us-east-1
Security
The bucket has been verified with:
Block Public Access          ENABLED — all four controls
Object Ownership             BucketOwnerEnforced
Encryption                   SSE-S3 / AES256
BucketKeyEnabled             false
Versioning                   not enabled
Public ACLs                  disabled
Public Allow policy          none
HTTPS-only access            enforced
The bucket policy contains a deny-only transport rule:
aws:SecureTransport = false
→ DENY
Therefore plain HTTP requests are rejected.
No public access has been introduced.

Lifecycle
Two lifecycle controls currently exist.
Temporary objects
temp/
→ expire after 7 days
Failed/incomplete multipart uploads
incomplete multipart upload
→ abort after 1 day
Permanent assets are currently retained indefinitely.

5. S3 Logical Architecture
The following prefixes define the storage contract:
models/
workflows/
inputs/

jobs/
├── pending/
├── running/
├── completed/
└── failed/

outputs/

temp/
These are S3 object-key prefixes rather than physical directories.
models/
Canonical or cached model artifacts if we later determine that storing models in S3 is economically appropriate.
Examples may eventually include:
* Wan
* FLUX
* model components
* LoRAs
* auxiliary models
We have deliberately not uploaded large model files yet.

workflows/
Versioned generation workflows.
Primarily expected to contain:
* ComfyUI workflows;
* generation presets;
* model-specific workflow definitions;
* validated production configurations.

inputs/
Permanent generation source material.
Examples:
* key frames;
* reference images;
* source audio;
* scripts;
* prepared scene assets.

jobs/
Contains small job manifests and state records.
Example:
jobs/pending/<job-id>.json
jobs/running/<job-id>.json
jobs/completed/<job-id>.json
jobs/failed/<job-id>.json
Large videos and model files should not be repeatedly moved through these prefixes.

outputs/
Canonical completed media.
Examples:
outputs/
├── tests/
├── channels/
├── video/
├── images/
└── 3d/
The exact production hierarchy will be finalized after the GPU proof-of-concept.

temp/
Scratch/intermediate artifacts.
Anything here may disappear automatically after seven days.

6. AWS Infrastructure Repository
The permanent S3 infrastructure is reproducible from:
tools/aws/prochat-media-storage/
├── config.json
├── create-bucket.sh
├── verify-bucket.sh
└── README.md
config.json
Contains only non-secret deterministic information:
* AWS account ID;
* AWS region;
* bucket name.
No AWS credentials are stored here.

create-bucket.sh
Provides idempotent provisioning.
When run against an existing correctly configured bucket, it:
* detects the bucket;
* does not recreate it;
* safely reapplies intended configuration;
* does not delete contents;
* does not mutate unrelated buckets.

verify-bucket.sh
Current verification covers:
1. bucket exists;
2. public access block;
3. BucketOwnerEnforced ownership;
4. AES256 encryption;
5. BucketKeyEnabled=false;
6. 7-day temp/ expiration;
7. one-day incomplete multipart abort;
8. versioning not enabled;
9. HTTPS-only deny policy;
10. absence of any Allow statement in the bucket policy.
Current result:
10 / 10 PASS

7. IAM Configuration
The local AWS automation currently operates through:
IAM user:
claude-code
A scoped managed policy exists for provisioning/configuring the ProChat production media bucket.
The relevant policy has also been extended with:
s3:GetBucketVersioning
s3:GetBucketPolicy
s3:PutBucketPolicy
No new IAM users or long-lived GPU-worker access keys were created.
Future external GPU workers should not receive the local Claude AWS credentials.

8. Future GPU Authentication
Lambda Cloud should access AWS using temporary, scoped authorization.
Preferred mechanisms:
Option A — Presigned URLs
AWS generates short-lived URLs allowing a worker to:
GET specific input
PUT specific output
Advantages:
* no AWS secret stored on Lambda;
* minimal blast radius;
* automatically expires;
* ideal for individual render jobs.
This is the preferred initial implementation.
Option B — Temporary AWS credentials
May be considered later for more sophisticated workers requiring access to multiple objects.
Long-lived AWS access keys on Lambda are explicitly avoided.

9. Planned Lambda Cloud Configuration
Initial GPU proof-of-concept:
Provider:       Lambda Cloud
Region:         Virginia, USA
GPU:            1× NVIDIA A10
VRAM:           24 GB
CPU:            30 vCPU
RAM:            200 GiB
Local SSD:      1.4 TiB
Base image:     Lambda Stack Ubuntu 22.04
Rate:           approximately $1.29/hour
Filesystem:     none initially
The instance is disposable.
There is no intended permanent running Lambda VM.

10. Initial GPU Software Stack
The first validated stack will be deliberately small.
Lambda Stack 22.04
        ↓
NVIDIA/CUDA environment
        ↓
Docker where useful
        ↓
ComfyUI
        ↓
Wan 2.2
        ↓
FFmpeg
First model:
Wan 2.2 TI2V 5B
Initial modes to benchmark:
Text → Video
Image → Video
Image-to-video is expected to become especially important because ProChat can first produce a high-quality controlled key frame and then animate it.

11. Planned Production Model Architecture
The eventual video architecture should use different quality/cost lanes rather than one model for everything.
Lane 1 — inexpensive/static
Used wherever generated video is unnecessary.
Examples:
* generated still images;
* screenshots;
* stock content;
* typography;
* diagrams;
* Ken Burns movement;
* reusable loops;
* screen recordings.

Lane 2 — volume GPU generation
Likely:
Wan 2.2 5B
Used for:
* background motion;
* standard B-roll;
* scene transitions;
* atmospheric clips;
* lower-value generated shots.

Lane 3 — quality GPU generation
Potentially:
Wan 2.2 14B
optimized FP8 / accelerated workflow
Used where higher visual quality justifies additional compute.
A10 compatibility will be benchmarked before choosing A100.

Lane 4 — premium API generation
Potential services/models:
* Seedance
* Amazon Nova
* Veo or comparable premium services
Used only for:
* hero shots;
* opening hooks;
* trailers;
* extremely important visual sequences.
Premium API generation should not become the default for every scene.

12. Image Generation
Planned local/self-hosted image generation:
FLUX-class image models
Primary purpose:
script
↓
scene description
↓
high-quality key image
↓
Wan image-to-video
This should provide substantially more visual consistency than unconstrained text-to-video generation.

13. 3D Website Architecture
The GPU should not be used to generate ordinary web application code.
Website code remains generated/developed using:
Claude Code
Next.js
TypeScript
React
Interactive 3D presentation stack:
Next.js
React Three Fiber / Three.js
GSAP
scroll-driven animation
WebGL
Lambda Cloud may later generate computationally expensive assets, such as:
* 3D meshes;
* PBR textures;
* hero objects;
* environmental assets;
* generated visual sequences.
A candidate future model is:
TRELLIS.2
This will be evaluated separately after video generation is operational.

14. Existing AWS Generation Pipeline
The long-term orchestration path is expected to become:
Topic / content plan
       ↓
Bedrock
       ↓
Script
       ↓
Scene planner
       ↓
Shot classification
       ↓
┌─────────────────────────────────┐
│ Cheap/static scene             │
│ AWS/template/stock             │
├─────────────────────────────────┤
│ Standard motion                │
│ Lambda → Wan volume lane       │
├─────────────────────────────────┤
│ Important scene                │
│ Lambda → quality lane          │
├─────────────────────────────────┤
│ Hero scene                     │
│ premium generation API        │
└─────────────────────────────────┘
       ↓
Polly narration
       ↓
FFmpeg assembly
       ↓
captions/music/audio
       ↓
social variants
       ↓
S3 outputs
AWS Step Functions remains responsible for orchestration.

15. Multi-Channel Production Goal
Target:
3–5 active content channels
Initial expected cadence:
approximately 5 finished videos/week
The same source content should eventually be reusable across:
* YouTube;
* Facebook;
* YouTube Shorts;
* Facebook Reels;
* other vertical-video platforms.
The pipeline should produce multiple derivatives rather than regenerating the same content independently for every platform.
Example:
1 script
↓
1 narration
↓
1 scene package
↓
1 long-form video
+
2–5 short clips
+
thumbnail
+
social captions
This is essential for economical scaling.

16. Cost Strategy
Available Lambda credits:
approximately $7,500
Expected remaining useful period:
approximately 11 months
Nominal monthly equivalent:
~$682/month
However, this is a ceiling rather than a required monthly spend.
Target planned usage:
$400–$500 maximum/month initially
Unused budget remains available for later:
* A100 testing;
* larger video models;
* premium quality experiments;
* 3D generation;
* scaling successful channels.

17. GPU Cost Rule
The primary metric will not be:
cost per generation
It will be:
cost per accepted production-quality clip
For every model/workflow we should record:
* GPU;
* model;
* prompt;
* seed;
* resolution;
* frame count;
* clip duration;
* steps;
* render duration;
* GPU memory use;
* monetary cost;
* accepted/rejected;
* reason for rejection.
That allows actual economic comparison between models.

18. Lambda Instance Lifecycle
Critical rule:
Do not leave Lambda instances idle.
Lambda Cloud does not provide the traditional cheap stopped-VM workflow we need.
Therefore:
launch
→ render
→ preserve output
→ terminate
Using operating-system commands such as:
shutdown
poweroff
must not be treated as the mechanism for ending billing.
Termination must happen using the Lambda Cloud console/API.

19. Persistent Storage Decision
No Lambda persistent filesystem is being created yet.
Reason:
We do not yet know:
* final model set;
* total model size;
* download/bootstrap duration;
* how frequently workers will launch;
* transfer cost;
* operational convenience.
After benchmarking, choose between:
A. S3 / remote hydration
Cheapest idle infrastructure.
B. Lambda persistent filesystem
Costs continuously but avoids model rehydration.
C. Hybrid
Likely eventual architecture:
S3:
jobs
inputs
outputs
canonical assets
backups

Lambda filesystem:
frequently used model weights/cache
No decision should be made until measurements exist.

20. Next Phase
Phase 3 — GPU Proof of Life
Goal:
Prove one complete generation path using a disposable A10.
Success path:
AWS S3
↓
Launch A10
↓
bootstrap environment
↓
run ComfyUI
↓
run Wan 2.2 TI2V 5B
↓
generate test clip
↓
upload through controlled S3 access
↓
verify asset in S3
↓
record benchmark
↓
terminate A10
Success criteria:
* ComfyUI runs correctly;
* Wan generates video;
* A10 VRAM is sufficient;
* render duration is measured;
* actual Lambda cost is calculable;
* output reaches the production S3 bucket;
* no permanent AWS credential is stored on the GPU;
* Lambda instance can be destroyed without losing important data.

21. Following Phase
Phase 4 — Quality Benchmark
Run a controlled comparison using identical reference prompts/images.
Compare:
Wan 2.2 5B
vs.
Wan 2.2 optimized 14B
vs.
premium API reference output where useful
Measure:
visual quality
motion quality
prompt adherence
consistency
render time
rejection rate
cost per accepted clip
Only after this benchmark should we decide whether production uses:
* A10 only;
* A10 + A100;
* A10 + premium APIs;
* another combination.

22. Final Intended Architecture
When complete:
                    PROCHAT MEDIA PLATFORM

                         Content Plan
                              │
                              ▼
                       AWS Bedrock
                    scripts / shot plans
                              │
                              ▼
                     AWS Step Functions
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
        AWS-native        Lambda GPU       Premium APIs
        cheap path        render farm       hero path
             │                │                │
             │          ComfyUI/Wan            │
             │          FLUX / 3D              │
             └────────────────┼────────────────┘
                              │
                              ▼
                            S3
                              │
                              ▼
                       Polly / Audio
                              │
                              ▼
                       FFmpeg Assembly
                              │
                              ▼
                     Platform Variants
                              │
             ┌────────────────┼─────────────────┐
             ▼                ▼                 ▼
          YouTube          Facebook          Shorts/
                                             Reels
For interactive websites:
Claude Code
    ↓
Next.js
    ↓
React Three Fiber
    ↓
GSAP
    +
Lambda-generated 3D/media assets
    ↓
high-end scrolling experience

23. Current Project Status
AWS orchestration foundation        EXISTING
Permanent S3 architecture           COMPLETE
S3 security                         VERIFIED 10/10
Lifecycle configuration             COMPLETE
Reusable provisioning scripts       COMPLETE
GPU instance                        NOT YET LAUNCHED
ComfyUI                              NOT YET INSTALLED
Wan                                  NOT YET INSTALLED
GPU → S3 upload                      NOT YET TESTED
GPU benchmarking                     NOT STARTED
Persistent Lambda filesystem         DEFERRED
Automated GPU provisioning           DEFERRED
Production rendering worker          DEFERRED
Multi-channel automation             FUTURE PHASE
3D generation                        FUTURE PHASE
The permanent AWS storage layer should now be considered frozen and operational.
The next engineering milestone is the first disposable Lambda A10 GPU proof-of-life.

