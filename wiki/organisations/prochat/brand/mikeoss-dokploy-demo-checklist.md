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
legal-demo.prochat.tools
law-demo.prochat.tools
```

Recommended:

```text
legal-demo.prochat.tools
```

Reason: it is clearer for law-firm outreach and avoids making `mike` look like a ProChat-owned product name.

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

- [ ] Choose subdomain, preferably `legal-demo.prochat.tools`.
- [ ] Create DNS record pointing the subdomain to the Dokploy server.
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
FRONTEND_URL=https://legal-demo.prochat.tools
DOWNLOAD_SIGNING_SECRET=<random-32-byte-hex>
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SECRET_KEY=<supabase-service-role-key>
R2_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<r2-access-key>
R2_SECRET_ACCESS_KEY=<r2-secret-key>
R2_BUCKET_NAME=mike-demo
ANTHROPIC_API_KEY=<optional>
GEMINI_API_KEY=<optional>
OPENAI_API_KEY=<optional>
RESEND_API_KEY=<optional>
USER_API_KEYS_ENCRYPTION_SECRET=<long-random-secret>
```

### Frontend

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=<supabase-anon-key>
NEXT_PUBLIC_API_BASE_URL=https://legal-demo-api.prochat.tools
```

## Domain pattern

Recommended two-subdomain pattern:

```text
legal-demo.prochat.tools      → Mike frontend
legal-demo-api.prochat.tools  → Mike backend
```

Alternative path-based pattern:

```text
legal-demo.prochat.tools      → frontend
legal-demo.prochat.tools/api  → backend
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
Domain: legal-demo-api.prochat.tools
```

Add backend environment variables.

#### App 2: `mike-frontend`

Settings:

```text
Root directory: frontend
Build command: npm install && npm run build
Start command: npm start
Port: 3000
Domain: legal-demo.prochat.tools
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
      FRONTEND_URL: "https://legal-demo.prochat.tools"
    ports:
      - "3001:3001"

  mike-frontend:
    image: node:20-bookworm
    working_dir: /app/frontend
    volumes:
      - ./:/app
    command: sh -c "npm install && npm run build && npm start"
    environment:
      NEXT_PUBLIC_API_BASE_URL: "https://legal-demo-api.prochat.tools"
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

- [ ] Open `https://legal-demo.prochat.tools`.
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
