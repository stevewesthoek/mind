# ProChat OS Technical Definition

**Status:** canonical technical definition  
**Owner:** Steve Westhoek  
**Last updated:** 2026-05-29

## Definition

ProChat OS is an installable Agentic Workflow OS: a private workflow runtime that connects messy inputs to business tools through memory, connectors, model routing, workflow agents, approvals, logs, and a control console.

Customer-facing explanation:

```text
We install a private workflow runtime on your server. It connects to selected inputs like email, files, forms, folders, APIs, or webhooks. It stores your business context, runs configurable agents, asks for approval when needed, and sends structured outputs to the tools you already use.
```

## What a client installs

A customer does not install Steve's private `mind` or `brain` repositories.

A customer installs a sanitized ProChat OS instance that creates their own:

- memory
- workflows
- credentials
- connectors
- logs
- approvals
- optional modules

Target product structure:

```text
prochat-os/
  core/              workflow runtime and API
  memory/            customer memory/context store
  connectors/        input/output integrations
  router/            model selector and provider routing
  console/           command center and approvals
  cli/               install, configure, update, support commands
  modules/           optional workflow blocks
```

## Core components

### 1. Workflow runtime

The workflow runtime is the heart of ProChat OS.

It runs workflows such as:

```text
input arrives
→ classify input
→ retrieve context
→ call model/router
→ create structured output
→ request approval if needed
→ send result to output connector
→ log event
```

Responsibilities:

- run workflow definitions
- schedule jobs
- execute worker tasks
- coordinate agents
- manage retries/failures
- emit events
- expose internal API endpoints

### 2. Memory and context store

The memory layer stores customer-specific context.

Examples:

- people
- clients
- projects
- matters/cases
- documents
- decisions
- preferences
- instructions
- procedures
- workflow history

The `mind` repo is the prototype pattern, not the customer product.

### 3. Connectors

Connectors make ProChat OS more than a chatbot.

Input connectors may include:

- email
- watched folder
- file upload
- form
- webhook
- CLI
- API
- Drive/Dropbox later
- CRM later

Output connectors may include:

- email draft
- report
- task list
- CRM-ready fields
- file
- webhook
- dashboard card
- approval request

### 4. Model router / AI selector

The model router chooses how AI work is executed.

It may choose by:

- cost
- speed
- privacy
- task type
- quality requirement
- local vs cloud execution
- model availability

The model router is a subsystem, not ProChat OS by itself.

V1 can start with one configured provider if needed. Routing can mature later.

### 5. Approval and event log

ProChat OS should be safe by default.

Approval model:

```text
human approval first
→ semi-automation after trust
→ full automation only for approved low-risk workflows
```

The event log records:

- input received
- workflow started
- model/tool used
- output generated
- approval requested
- approval/rejection
- output sent
- errors/retries

Logs must avoid secrets and sensitive content where possible.

### 6. Control console

The console is the command center, not the product itself.

It shows:

- workflows
- inputs
- outputs
- approvals
- agents
- memory status
- connector status
- logs
- errors
- configuration where needed

The console makes the runtime visible and controllable.

### 7. CLI

The CLI is used for:

- install
- setup
- status
- health checks
- updates
- support bundles
- backup/restore helpers
- connector configuration
- managed-service connection

Possible command shape:

```bash
prochat doctor
prochat install
prochat status
prochat workflows list
prochat connectors list
prochat support-bundle
prochat update
```

### 8. Optional modules

Modules are workflow blocks on top of the core.

Examples:

- MikeOSS legal document workspace
- document workflow agent
- law-firm intake workflow
- accounting intake workflow
- content engine
- AWS-backed Video Orchestrator
- monitoring workflow
- local app builder
- social posting workflow
- CRM connector

Modules should connect back to the same ProChat OS runtime.

For the Video Orchestrator, ProChat OS owns job creation, template selection, approval gates, prompt history, asset metadata, workflow status, logs, retry commands, publishing checklists, module visibility in the console, and asset references. AWS owns media generation, rendering, storage, transcoding, and long-running execution.

Video Orchestrator v1 supports only one internal workflow: topic to 60-second script, 5 scene prompts, human approval, Polly voiceover, generated clips, captions, thumbnail, final render, and exported MP4. V1 does not include local video generation, local FFmpeg as the production path, autonomous publishing, multi-account scheduling, a full editor UX, a customer-facing SaaS dashboard, many templates, or many model providers.

The canonical video strategy, service boundaries, cost controls, S3 layout, roadmap, and implementation sequence live in `prochat-os-strategy.md`.

## Runtime shape

A working instance runs as:

```text
API service
scheduler / worker
memory database / document store
object/file storage
model router
connector workers
control console
CLI
optional modules
```

## Deployment shape

For a managed customer instance:

```text
customer-owned or ProChat-managed server
  ├─ ProChat Core API
  ├─ ProChat Memory DB
  ├─ ProChat Connector workers
  ├─ ProChat Model Router
  ├─ ProChat Approval/Event Log
  ├─ ProChat Console
  ├─ ProChat CLI
  └─ optional modules
```

For the first law-firm wedge:

```text
customer/demo server
  ├─ MikeOSS legal document workspace
  ├─ ProChat OS workflow runtime
  ├─ ProChat OS memory/context
  ├─ ProChat OS connectors
  └─ ProChat OS console/approvals
```

## Current private repo mapping

Current internal pattern:

```text
mind repo
  → prototype of memory/context layer

brain repo
  → prototype of system rules, skills, workflows, model routing, runbooks, runtime docs, and operational logic

Brain Console
  → prototype of command center / dashboard / control plane

ProBot / Brain Core concepts
  → prototype of API, session, status, approval, integration, and remote-client layers
```

Productization requires extracting these patterns into a sanitized installable product.

## Security principles

- customer owns credentials
- customer controls infrastructure where possible
- use least-privilege connectors
- prefer OAuth or scoped app permissions over raw broad credentials
- use human approval by default
- support bundles must redact secrets
- logs must not expose sensitive data unnecessarily
- isolate private customer context
- share only generic computation where safe

## V1 minimal install

The smallest useful ProChat OS v1 should include:

- core workflow API
- worker/scheduler
- memory database
- one input connector, likely email/folder/webhook
- one output connector, likely report/email draft/task list
- event log
- human approval queue
- simple console or status page
- CLI install/status/support commands
- one model provider
- optional MikeOSS instance for law-firm demo

## Technical non-goals for v1

Do not start by building:

- full multi-tenant SaaS
- every connector
- perfect model routing
- deep CRM integrations
- autonomous unsupervised actions
- broad shell access
- complex dashboard-first UX

## Open implementation decisions

- one monolith first or multiple services?
- which database first?
- email, folder, webhook, or form as first input connector?
- report, email draft, task list, or CRM-ready JSON as first output?
- how much Brain Console is needed in v1?
- how to package the public GitHub version?
- how to handle commercial-license checks?
