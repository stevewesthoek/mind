# Fala Local Learning Cockpit

Fala is the local-first household language-learning app for daily European Portuguese practice.

## Current operating mode

- Active learner track: Dutch native → European Portuguese.
- Runtime default: local Ollama through Fala's provider boundary.
- Optional runtime bridge: Brainbridge / model router when explicitly configured.
- Paid fallback policy: route through the model router, which may choose Amazon Bedrock-backed models when policy allows.
- Codex CLI is development/offline automation only, not learner-runtime chat.
- n8n content ingestion is available through the Fala ingest endpoint and workflow template.

## Fala dashboard actions

Run these from the Fala repo unless Brain Console later exposes buttons for them:

```bash
npm run local:doctor
npm run dev -- -H 0.0.0.0
npm run local:content:import
```

## Runtime URLs

```text
Desktop: http://localhost:3050
Phone:   http://<computer-lan-ip>:3050
Health:  http://localhost:3050/api/health
```

## External automation contracts

- Fala repo contract: `OBSIDIAN_DASHBOARD_CONTRACT.md`
- n8n workflow template: `scripts/n8n/fala-content-ingest.workflow.json`
- Fala content ingest endpoint: `POST /api/content/ingest`
- Model-router fallback endpoint expected by Fala: `POST /v1/fala/tutor/stream`

## Environment policy

Do not store real secrets in Mind.

```env
FALA_AI_PROVIDER="ollama"
FALA_AI_FALLBACK_PROVIDER="model-router"
FALA_MODEL_ROUTER_URL="http://<internal-model-router-host>:<port>"
CONTENT_INGEST_API_KEY="[REDACTED]"
```

The model router owns Amazon Bedrock credentials, model choice, local-vs-paid routing, and cost controls. Fala should receive only a stable router URL and user-safe stream responses.

## Readiness checklist

- [ ] Local Postgres is reachable.
- [ ] Fala seed counts are valid.
- [ ] Ollama is reachable and the selected model is present.
- [ ] `/api/health` returns usable local readiness details.
- [ ] n8n test item returns `201`, then duplicate returns `200` with `created: false`.
- [ ] Model-router fallback is disabled by default or explicitly tested through `FALA_AI_FALLBACK_PROVIDER=model-router`.

## Guardrails

- Do not make Mind store Fala runtime logs or secrets.
- Do not bypass the model router for paid fallback unless the Fala roadmap explicitly changes.
- Do not invoke Codex CLI against Fala without an explicit supervised development task.
