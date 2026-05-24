#!/usr/bin/env bash
set -euo pipefail

# MikeOSS Dokploy Demo Provision Template
# Purpose: helper template for provisioning a MikeOSS demo through the existing Dokploy flow.
# Safety: this script does not contain secrets. Fill env vars locally before running.
# Source strategy doc: mikeoss-dokploy-demo-checklist.md

# ── Required local env ───────────────────────────────────────────────────────
# Export these before running, or place them in a local untracked shell session.
# Do NOT commit real values.

: "${DOKPLOY_API_KEY:?Set DOKPLOY_API_KEY locally}"
: "${DOKPLOY_URL:=https://dokploy.prochat.tools/api}"
: "${DOKPLOY_API_HEADER:=x-api-key}"

# App IDs are created in Dokploy UI first, then pasted here locally.
: "${MIKE_FRONTEND_APP_ID:?Set MIKE_FRONTEND_APP_ID locally}"
: "${MIKE_BACKEND_APP_ID:?Set MIKE_BACKEND_APP_ID locally}"

# GHCR image names after the demo repo/fork exists.
: "${MIKE_FRONTEND_IMAGE:=ghcr.io/prochattools/mike-legal-demo-frontend:latest}"
: "${MIKE_BACKEND_IMAGE:=ghcr.io/prochattools/mike-legal-demo-backend:latest}"

# Domains.
: "${MIKE_FRONTEND_DOMAIN:=legal.prochat.tools}"
: "${MIKE_BACKEND_DOMAIN:=legal-api.prochat.tools}"

# Optional metadata for Dokploy deployments.
DEPLOY_TITLE="${DEPLOY_TITLE:-MikeOSS legal demo deploy}"
DEPLOY_DESCRIPTION="${DEPLOY_DESCRIPTION:-Triggered from local MikeOSS Dokploy provision template}"

api_post() {
  local endpoint="$1"
  local payload="$2"

  local response_file
  response_file="$(mktemp)"

  local status
  status=$(curl -sS -o "$response_file" -w "%{http_code}" \
    -X POST "$DOKPLOY_URL/$endpoint" \
    -H "$DOKPLOY_API_HEADER: $DOKPLOY_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload")

  echo "POST $endpoint -> HTTP $status"
  cat "$response_file"
  echo
  rm -f "$response_file"

  if [[ "$status" != "200" ]]; then
    echo "Dokploy API call failed: $endpoint" >&2
    exit 1
  fi
}

update_image() {
  local app_id="$1"
  local image="$2"

  api_post "application.update" "{\"applicationId\":\"$app_id\",\"dockerImage\":\"$image\"}"
}

trigger_deploy() {
  local app_id="$1"

  api_post "application.deploy" "{\"applicationId\":\"$app_id\",\"title\":\"$DEPLOY_TITLE\",\"description\":\"$DEPLOY_DESCRIPTION\"}"
}

print_next_steps() {
  cat <<EOF

Next manual checks:
1. Confirm frontend loads: https://$MIKE_FRONTEND_DOMAIN
2. Confirm backend health/API through: https://$MIKE_BACKEND_DOMAIN
3. Sign up with demo account.
4. Create a Mike project/matter.
5. Upload fake legal PDFs only.
6. Ask document questions and verify cited answers.
7. Record Loom.

Reminder:
- Do not upload real law-firm client documents to the shared demo.
- Keep MikeOSS AGPL notices intact.
- Keep secrets only in Dokploy/GitHub/local env, never in Git.
EOF
}

main() {
  echo "Updating MikeOSS frontend image in Dokploy..."
  update_image "$MIKE_FRONTEND_APP_ID" "$MIKE_FRONTEND_IMAGE"

  echo "Updating MikeOSS backend image in Dokploy..."
  update_image "$MIKE_BACKEND_APP_ID" "$MIKE_BACKEND_IMAGE"

  echo "Triggering backend deploy..."
  trigger_deploy "$MIKE_BACKEND_APP_ID"

  echo "Triggering frontend deploy..."
  trigger_deploy "$MIKE_FRONTEND_APP_ID"

  print_next_steps
}

main "$@"
