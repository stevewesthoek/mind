---
type: dashboard
status: live
---

# Machine

Obsidian-facing entry point for local machine state. Open Brain Console Center for live data.

Brain Core owns all live runtime data — this note stays sparse.

## Brain Console (primary)

Open Brain Console Center via ribbon icon or command `Open Brain Console dashboard`.

Tabs: Overview · Apps · Sessions · Infra · Analytics · Stripe · Monitoring · Studio · Orchestrators · Pipelines · Projects · Reports · Posts · Agents · Recovery

## Local Brain Core

```text
http://127.0.0.1:4877/health
```

Restart if needed:

```bash
cd brain/projects/brain-core && nohup node dist/index.js > /tmp/brain-core.log 2>&1 &
```

## Infrastructure endpoints

All infra adapters return graceful `not-configured` when credentials are absent:

```text
GET /infra/dokploy     — Dokploy apps and compose services
GET /infra/tunnels     — Cloudflare tunnels
GET /infra/domains     — Cloudflare zones (sorted by expiry)
GET /infra/monitoring  — New Relic hosts and synthetics
GET /infra/analytics   — Umami websites
GET /infra/google-ads  — Google Ads budget metrics (SQLite)
GET /infra/stripe      — Stripe account balances
GET /infra/studio      — Viral Flow + Video Orchestrator status
```

## Safety rules

- Do not store secrets in this note.
- Do not paste runtime logs here.
- Do not use this note as a database.
- ProBot dashboard is decommissioned — do not open it for normal operation.
