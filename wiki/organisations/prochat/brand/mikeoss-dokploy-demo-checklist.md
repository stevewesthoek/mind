# MikeOSS Dokploy Demo Checklist

**Status:** draft execution checklist  
**Owner:** Steve Westhoek  
**Date:** 2026-05-24  
**Purpose:** deploy MikeOSS quickly on the existing Dokploy environment as the first law-firm demo wedge for ProChat OS.

## Decision

For the first demo, use the existing Dokploy server instead of AWS.

Reason:

```text
It is only a demo. AWS adds friction. Dokploy is already available and is faster to ship.
```

AWS remains relevant later for customer-owned or ProChat-managed production installs, but the first law-firm demo should prioritize speed.

## Demo domain direction

Use a subdomain of `prochat.tools`.

Possible options:

```text
mike.prochat.tools
legal.prochat.tools
legal-api.prochat.tools
law-demo.prochat.tools
```

Recommended:

```text
legal.prochat.tools
legal-api.prochat.tools
```

Note: `legal-api@prochat.tools` is an email address. For the API service, use the hostname `legal-api.prochat.tools` unless an email mailbox is intentionally needed later.

Reason: `legal.prochat.tools` is clearer for law-firm outreach and avoids making `mike` look like a ProChat-owned product name.

## MikeOSS requirements

From the MikeOSS repository, Mike requires:

- Node.js 20+
- npm
- Git
- Supabase project
- Cloudflare R2, MinIO, or another S3-compatible bucket
- at least one model provider API key: Anthropic, Gemini, or OpenAI
- LibreOffice if DOC/DOCX to PDF conversion is needed

Mike architecture:

```text
frontend/ = Next.js app
backend/  = Express API, document processing, Supabase access
```

## Recommended demo architecture

Use Dokploy for the app containers/services, while keeping managed external services for speed:

```text
Dokploy server
  ├─ mike-frontend service
  ├─ mike-backend service
  └─ reverse proxy / SSL via Dokploy

External services
  ├─ Supabase Auth/Postgres
  ├─ Cloudflare R2 bucket
  └─ Anthropic/Gemini/OpenAI API key
```

Do not self-host Supabase or object storage for the first demo.

## Data policy

Use fake/sample legal matter data only.

Do not let law firms upload confidential client documents into the shared demo environment.

The first shared demo should be a visualization and proof of concept, not a production legal workspace.

## Pre-deployment checklist

- [ ] Choose subdomains: `legal.prochat.tools` for frontend and `legal-api.prochat.tools` for backend.
- [ ] Create DNS records pointing both subdomains to the Dokploy server.
- [ ] Create Supabase project for MikeOSS demo.
- [ ] Run MikeOSS `backend/schema.sql` in Supabase SQL editor.
- [ ] Create Cloudflare R2 bucket, e.g. `mike-demo`.
- [ ] Create R2 access key and secret.
- [ ] Choose initial model provider key.
- [ ] Generate `DOWNLOAD_SIGNING_SECRET`.
- [ ] Generate `USER_API_KEYS_ENCRYPTION_SECRET`.
- [ ] Decide whether demo disables Supabase email confirmation.
- [ ] Prepare fake legal sample documents.
- [ ] Prepare Loom demo script.

## Environment variables

### Backend

```env
PORT=3001
FRONTEND_URL=https://legal.prochat.tools
DOWNLOAD_SIGNING_SECRET=<random-32-byte-hex>
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SECRET_KEY=<supabase-service-role-key>
R2_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<r2-access-key>
R2_SECRET_ACCESS_KEY=<r2-secret-key>
R2_BUCKET_NAME=mike-demo
ANTHROPIC_API_KEY=<optional>
OPENAI_API_KEY=<optional>
RESEND_API_KEY=<optional>
USER_API_KEYS_ENCRYPTION_SECRET=<long-random-secret>
```

### Frontend

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=<supabase-anon-key>
NEXT_PUBLIC_API_BASE_URL=https://legal-api.prochat.tools
```

## Domain pattern

Recommended two-subdomain pattern:

```text
legal.prochat.tools      → Mike frontend
legal-api.prochat.tools  → Mike backend
```

Alternative path-based pattern:

```text
legal.prochat.tools      → frontend
legal.prochat.tools/api  → backend
```

Use two subdomains first because it is simpler and matches Mike's `NEXT_PUBLIC_API_BASE_URL` expectation.

## Dokploy deployment steps

### Option A — two Dokploy applications from the same repo

Create two Dokploy apps from:

```text
https://github.com/willchen96/mike
```

#### App 1: `mike-backend`

Settings:

```text
Root directory: backend
Build command: npm install && npm run build
Start command: npm start
Port: 3001
Domain: legal-api.prochat.tools
```

Add backend environment variables.

#### App 2: `mike-frontend`

Settings:

```text
Root directory: frontend
Build command: npm install && npm run build
Start command: npm start
Port: 3000
Domain: legal.prochat.tools
```

Add frontend environment variables.

### Option B — Docker Compose app

If Dokploy handles compose more cleanly, use a compose file with two services.

```yaml
services:
  mike-backend:
    image: node:20-bookworm
    working_dir: /app/backend
    volumes:
      - ./:/app
    command: sh -c "npm install && npm run build && npm start"
    environment:
      PORT: "3001"
      FRONTEND_URL: "https://legal.prochat.tools"
    ports:
      - "3001:3001"

  mike-frontend:
    image: node:20-bookworm
    working_dir: /app/frontend
    volumes:
      - ./:/app
    command: sh -c "npm install && npm run build && npm start"
    environment:
      NEXT_PUBLIC_API_BASE_URL: "https://legal-api.prochat.tools"
    ports:
      - "3000:3000"
```

Prefer Option A first if Dokploy supports separate app root directories.

## LibreOffice note

Mike requires LibreOffice locally for DOC/DOCX to PDF conversion.

If using plain Node runtime in Dokploy, DOC/DOCX conversion may fail unless LibreOffice is available in the container or host image.

For the first demo, easiest options:

1. Use PDFs only in fake demo data.
2. Add a custom Dockerfile that installs LibreOffice later.

Recommended for first demo:

```text
Use PDFs only. Avoid DOC/DOCX until the demo works.
```

## First-run checklist

- [ ] Open `https://legal.prochat.tools`.
- [ ] Sign up as demo admin/user.
- [ ] If Supabase confirmation blocks login, disable email confirmation for demo or configure SMTP.
- [ ] Add provider key in app if not set globally.
- [ ] Create project/matter.
- [ ] Upload fake legal PDFs.
- [ ] Ask document questions.
- [ ] Verify citations/answers.
- [ ] Run review/table workflow if available.
- [ ] Record screenshots and Loom.

## Fake legal matter pack

Create a fictional matter with no real client data.

Example:

```text
Matter: Van Dijk Consulting Contract Dispute

Documents:
- client-intake-email.pdf
- services-agreement.pdf
- invoice-summary.pdf
- meeting-notes.pdf
- timeline-of-events.pdf
- missing-documents-note.pdf
```

Demo questions:

- What is this matter about?
- What are the key dates?
- What documents are missing?
- What follow-up questions should the lawyer ask the client?
- Create a structured client intake summary.
- Create a missing-information checklist.

## Demo positioning

The demo should not claim MikeOSS or ProChat OS gives legal advice.

Use this framing:

```text
This is not legal advice. This is document and admin workflow support. The goal is to structure messy client information so the lawyer can review faster.
```

## Law-firm demo flow

1. Show messy document pack.
2. Upload into MikeOSS.
3. Ask for summary and key dates.
4. Ask for missing-information checklist.
5. Show structured output.
6. Explain ProChat OS can sit around this to automate intake, follow-ups, approvals, and reporting.
7. Ask: which document/admin workflow in your firm takes too much time?

## How this sells ProChat OS

MikeOSS is the visible first block.

ProChat OS is the managed workflow layer:

```text
MikeOSS shows legal document AI.
ProChat OS turns it into a managed agentic workflow system.
```

Upsell path:

```text
MikeOSS demo
→ private MikeOSS install
→ managed hosting/support
→ ProChat OS intake workflow
→ ProChat OS admin/document workflow
→ full managed ProChat OS
```

## Helper scripts

Two local helper templates have been added:

```text
wiki/organisations/prochat/brand/mikeoss-dokploy-deploy-script.sh
```

Use this first. It clones MikeOSS locally and generates backend/frontend env templates plus Dokploy settings notes.

```text
wiki/organisations/prochat/brand/mikeoss-dokploy-provision-template.sh
```

Use this later, only after the Dokploy applications exist and local environment variables are set. It updates image references and triggers redeploys through the Dokploy API.

Both scripts contain no real secrets and should remain templates.

## Next tasks

- [ ] Create or fork/mirror MikeOSS demo repo.
- [ ] Decide whether to deploy as two Dokploy apps or custom Docker images.
- [ ] Create Dokploy deployment from MikeOSS repo.
- [ ] Configure Supabase and R2.
- [ ] Deploy frontend/backend domains.
- [ ] Upload fake legal sample data.
- [ ] Record Loom.
- [ ] Send first law-firm outreach batch.




## Domain override — final demo domains

Use these domains for the MikeOSS legal demo:

```text
legal.prochat.tools      → Mike frontend
legal-api.prochat.tools  → Mike backend/API
```

Important clarification:

```text
legal-api@prochat.tools
```

is an email address, not an API hostname. For the backend API service, use:

```text
legal-api.prochat.tools
```

If an email inbox is needed later for intake or support, `legal-api@prochat.tools` can be created separately as a mailbox or alias, but it should not be used as the API URL.

When older examples in this checklist mention `legal.prochat.tools` or `legal-api.prochat.tools`, treat them as superseded by the final domains above.

## MikeOSS frontend changes, branding, and AGPL note

MikeOSS is licensed under AGPL-3.0. That means ProChat may run it, modify it, and offer paid installation/hosting/support, but modifications come with source-code obligations, especially when users interact with the modified software over a network.

### Can the frontend be changed?

Yes, technically and legally under AGPL-3.0, the frontend can be changed.

However, if ProChat modifies the MikeOSS frontend and makes that modified version available to users over the network, ProChat must be prepared to provide the Corresponding Source for the modified covered work under AGPL-3.0 terms.

Safe first demo approach:

```text
Do not modify the MikeOSS frontend for the shared demo.
Use the unmodified app, configure deployment/env only, and keep MikeOSS notices intact.
```

### Can MikeOSS be rebranded?

Treat rebranding carefully.

Possible:

- use a neutral deployment label such as `Legal AI Demo`
- frame it as an open-source MikeOSS-based legal document workspace
- add ProChat OS around it as a separate workflow/integration layer
- provide installation, hosting, support, and configuration services

Avoid without legal review:

- removing MikeOSS copyright/license notices
- implying ProChat created MikeOSS
- hiding that the legal document workspace is based on MikeOSS
- distributing or operating a modified proprietary fork without AGPL compliance
- mixing MikeOSS code directly into closed/source-available ProChat OS code

Recommended first positioning:

```text
Private Legal AI Workspace powered by MikeOSS, installed and managed by ProChat.
```

Then ProChat OS remains the upsell and separate product:

```text
MikeOSS = legal document workspace
ProChat OS = Agentic Workflow OS and managed workflow layer around it
```

### Practical rule

For v1:

```text
Configure, host, support, and integrate around MikeOSS.
Do not heavily modify or rebrand the MikeOSS frontend yet.
Keep ProChat OS separate as the workflow layer.
```

Later, if ProChat wants a fully branded legal workspace, review the AGPL obligations and decide whether to:

1. maintain an AGPL-compliant MikeOSS fork with public source,
2. build a separate ProChat legal UI from scratch,
3. use MikeOSS only as a backend/reference tool,
4. or request a separate commercial license from the MikeOSS author if available.




## License and branding note

MikeOSS is licensed under AGPL-3.0.

### Can the frontend be changed?

Yes, the frontend can be changed.

AGPL-3.0 allows modification, including frontend changes, but the modified version must comply with AGPL terms.

For a network/server app, if the modified version is used by users over a network, those users must be offered access to the corresponding source code of the modified version.

### Can it be rebranded?

Technically, yes, it can be rebranded as a modified AGPL version if the license terms are followed.

However, do not imply that ProChat owns the original MikeOSS project, and do not remove copyright/license notices that must remain.

Safe wording:

```text
Powered by MikeOSS, configured and managed by ProChat.
```

or:

```text
Private legal AI workspace, deployed and managed by ProChat using MikeOSS.
```

Avoid wording like:

```text
ProChat Legal OS
```

unless the fork/rebrand/license/trademark boundaries have been reviewed.

### Recommended first demo approach

For the first demo, do not change the frontend branding heavily.

Use MikeOSS mostly as-is and add ProChat branding around the demo page, Loom, outreach, and managed service offer.

Recommended:

- keep MikeOSS license notices intact
- keep source availability clear
- use `legal.prochat.tools` as the demo domain
- describe it as a MikeOSS-powered legal AI workspace
- sell ProChat OS as the workflow layer around it

### Recommended client install approach

For client installs:

1. Install unmodified or lightly configured MikeOSS first.
2. Keep MikeOSS AGPL notices and source availability intact.
3. If frontend/backend code is modified, make the modified source available as required.
4. Keep ProChat OS modules separate where possible.
5. Sell installation, hosting, configuration, support, and ProChat OS workflow integrations.

### Commercial caution

AGPL allows charging for copies, hosting, support, and services, but it does not allow taking a modified covered work proprietary.

Therefore:

```text
Good first business model:
install + configure + host + support + integrate around MikeOSS

Riskier model:
closed-source proprietary rebrand/fork of MikeOSS
```

Before reselling a heavily modified/rebranded MikeOSS product, get legal review.




## License and rebranding guidance

MikeOSS is licensed under AGPL-3.0-only.

This means the demo and any client install must treat MikeOSS as open-source AGPL software, not as proprietary ProChat-owned code.

### Can ProChat change the frontend?

Yes, technically and legally, the frontend can be changed because AGPL allows modification.

However, if ProChat modifies MikeOSS and lets users interact with that modified version over a network, the modified MikeOSS source code must be made available to those users under the AGPL terms.

Practical rule:

```text
If we modify MikeOSS, we must be prepared to publish those MikeOSS modifications.
```

### Can ProChat rebrand MikeOSS?

Caution required.

For the safest first demo and client installs:

```text
Do not rebrand MikeOSS as ProChat-owned software.
Do not remove license notices.
Do not hide that the legal document workspace is MikeOSS / AGPL software.
```

Safer wording:

```text
Installed and managed by ProChat.
Powered by MikeOSS, an AGPL open-source legal document workspace.
Extended with ProChat OS workflows.
```

### What can be branded as ProChat?

ProChat can brand the surrounding service and workflow layer:

- ProChat OS
- managed installation
- support and hosting
- workflow configuration
- law-firm intake workflows
- ProChat-created connectors
- ProChat-created orchestration around MikeOSS
- ProChat dashboard/console if separate from MikeOSS

Do not imply ProChat owns MikeOSS itself.

### Safest first approach

For the first demo:

```text
Use MikeOSS mostly unmodified.
Use the legal.prochat.tools domain.
Keep MikeOSS notices intact.
Use fake legal data.
Brand the service as a ProChat-managed legal AI demo.
Position ProChat OS as the workflow layer around it.
```

### Client deployment approach

For a client install, safest offer:

```text
We install and manage an open-source legal document AI workspace for your firm, then add ProChat OS workflows around it.
```

If a client wants frontend branding changes:

- allow minor configuration or theme changes only after checking license implications
- keep copyright/license notices intact
- provide source for modified MikeOSS code to the users of that instance
- keep ProChat proprietary/source-available modules separate where possible

### Separation principle

```text
MikeOSS changes = AGPL source obligations.
ProChat OS separate services/modules = keep separately licensed if they communicate over APIs and are not derivative works.
```

This boundary should be reviewed by a software/IP lawyer before selling heavily modified deployments.
