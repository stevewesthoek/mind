# MikeOSS Law-Firm Demo Plan

**Status:** draft execution plan  
**Owner:** Steve Westhoek  
**Date:** 2026-05-24  
**Purpose:** use MikeOSS as the first tangible law-firm wedge for ProChat OS.

## Decision

Use MikeOSS as a low-entry legal AI demo and implementation block.

```text
MikeOSS = legal document AI workspace
ProChat OS = Agentic Workflow OS around and beyond the document workspace
```

MikeOSS should help law firms understand the first visible value: private document AI, matter/project workspaces, cited answers, and reusable workflows.

ProChat OS should be sold as the broader managed system around it: hosting, setup, integrations, intake workflows, document/admin agents, follow-ups, approvals, reporting, and ongoing support.

## MikeOSS requirements found

MikeOSS is a legal document assistant with:

- Next.js frontend
- Express backend
- Supabase Auth/Postgres
- S3-compatible object storage such as Cloudflare R2 or MinIO
- supported model provider API key: Anthropic, Google Gemini, or OpenAI
- optional LibreOffice for DOC/DOCX to PDF conversion
- AGPL-3.0-only license

## Recommended v1 architecture

For the first demo, use the simplest cloud-hybrid setup:

```text
AWS EC2 demo server
  ├─ Mike frontend
  ├─ Mike backend
  ├─ Nginx/Caddy reverse proxy
  ├─ PM2 or systemd process management
  └─ LibreOffice for DOC/DOCX support

Managed services
  ├─ Supabase project for Auth/Postgres
  ├─ Cloudflare R2 bucket for document storage
  └─ Claude/Gemini/OpenAI API key
```

Do not start by self-hosting every component. The goal is fast demo readiness, not perfect infrastructure.

## Recommended AWS demo setup

Start with one private demo server:

- Ubuntu LTS
- Node.js 20+
- Nginx or Caddy
- PM2 or systemd
- LibreOffice installed
- SSL via Caddy or Certbot
- restricted SSH access
- environment variables outside Git
- regular server snapshot before outreach

Instance sizing to test:

- start small for demo, then increase if document processing is slow
- use separate storage/object bucket rather than storing uploaded documents only on the instance

## Data policy for demo

For public/early demos, use fake/sample legal data only.

Do not ask law firms to upload confidential client documents into the first shared demo.

Safer demo path:

```text
sample law-firm matter pack
→ upload to MikeOSS
→ ask questions
→ run table/review workflow
→ show cited answers and structured output
→ explain how a private firm instance would work
```

## Outreach flow

1. Build the demo instance.
2. Create a sample legal matter pack with fake documents.
3. Record a short Loom showing before/after.
4. Send to local law firms.
5. Ask which admin/document workflow they would want automated.
6. Offer a private pilot instance.
7. Use the pilot to sell managed ProChat OS.

## First demo story

```text
A new client sends messy documents, emails, forms, and notes.
MikeOSS gives the firm a private legal document workspace.
ProChat OS turns the messy intake around it into structured summaries, missing-info checklists, tasks, and follow-up drafts.
```

## First sales ladder

```text
1. Free/demo Loom with fake documents
2. Private MikeOSS pilot instance
3. Managed MikeOSS hosting/support
4. ProChat OS document/admin workflow agent
5. ProChat OS intake/follow-up/reporting workflows
6. Full managed ProChat OS plan
```

## AGPL caution

MikeOSS is AGPL-3.0-only.

Safe first approach:

- install and configure unmodified MikeOSS
- keep copyright/license notices intact
- provide source access where required
- avoid proprietary modifications inside MikeOSS until license boundaries are reviewed
- build ProChat OS integrations as separate services/API layers when possible
- get legal review before reselling a modified MikeOSS distribution

## Best first offer wording

```text
I can set up a private legal AI document workspace for your firm, using open-source software you can own and audit. Then I can add ProChat OS workflows around it so client intake, document admin, follow-ups, and internal summaries become structured and easier to process.
```

## Next implementation tasks

- inspect MikeOSS repo in detail
- create AWS deployment checklist
- create sample fake legal matter pack
- create law-firm Loom script
- create outreach list
- test one demo deployment before contacting firms
