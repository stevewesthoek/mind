#!/usr/bin/env bash
set -euo pipefail

# MikeOSS Dokploy demo preparation script
#
# Purpose:
#   Prepare a local clone of MikeOSS and generate environment templates for a Dokploy demo.
#
# This script does NOT deploy directly into Dokploy because Dokploy configuration is usually
# completed through its UI or Git integration. It prepares the repo and env templates so the
# two Dokploy apps can be created quickly.
#
# Recommended Dokploy apps:
#   1. mike-backend  -> root directory: backend   -> domain: legal-api.prochat.tools
#   2. mike-frontend -> root directory: frontend  -> domain: legal.prochat.tools

REPO_URL="https://github.com/willchen96/mike.git"
TARGET_DIR="${1:-mikeoss-demo}"
FRONTEND_DOMAIN="${FRONTEND_DOMAIN:-legal.prochat.tools}"
BACKEND_DOMAIN="${BACKEND_DOMAIN:-legal-api.prochat.tools}"
R2_BUCKET_NAME="${R2_BUCKET_NAME:-mike-demo}"

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git is required." >&2
  exit 1
fi

if ! command -v openssl >/dev/null 2>&1; then
  echo "ERROR: openssl is required to generate secrets." >&2
  exit 1
fi

if [ -d "$TARGET_DIR" ]; then
  echo "Directory already exists: $TARGET_DIR"
  echo "Skipping clone."
else
  git clone "$REPO_URL" "$TARGET_DIR"
fi

cd "$TARGET_DIR"

mkdir -p .prochat-dokploy

DOWNLOAD_SIGNING_SECRET="[REDACTED]"
USER_API_KEYS_ENCRYPTION_SECRET="[REDACTED]"

cat > .prochat-dokploy/backend.env.template <<EOF
PORT=3001
FRONTEND_URL=https://${FRONTEND_DOMAIN}
DOWNLOAD_SIGNING_SECRET=${DOWNLOAD_SIGNING_SECRET}
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SECRET_KEY=<supabase-service-role-key>
R2_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<r2-access-key>
R2_SECRET_ACCESS_KEY=<r2-secret-key>
R2_BUCKET_NAME=${R2_BUCKET_NAME}
ANTHROPIC_API_KEY=<optional-anthropic-key>
GEMINI_API_KEY=<optional-gemini-key>
OPENAI_API_KEY=<optional-openai-key>
RESEND_API_KEY=<optional-resend-key>
USER_API_KEYS_ENCRYPTION_SECRET=${USER_API_KEYS_ENCRYPTION_SECRET}
EOF

cat > .prochat-dokploy/frontend.env.template <<EOF
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=<supabase-anon-key>
NEXT_PUBLIC_API_BASE_URL=https://${BACKEND_DOMAIN}
EOF

cat > .prochat-dokploy/dokploy-settings.md <<EOF
# Dokploy settings for MikeOSS demo

## App 1: mike-backend

Repository:

\`\`\`text
${REPO_URL}
\`\`\`

Settings:

\`\`\`text
Root directory: backend
Build command: npm install && npm run build
Start command: npm start
Port: 3001
Domain: ${BACKEND_DOMAIN}
\`\`\`

Environment:

Copy values from:

\`\`\`text
.prochat-dokploy/backend.env.template
\`\`\`

## App 2: mike-frontend

Repository:

\`\`\`text
${REPO_URL}
\`\`\`

Settings:

\`\`\`text
Root directory: frontend
Build command: npm install && npm run build
Start command: npm start
Port: 3000
Domain: ${FRONTEND_DOMAIN}
\`\`\`

Environment:

Copy values from:

\`\`\`text
.prochat-dokploy/frontend.env.template
\`\`\`

## External services required

- Supabase project
- Supabase schema from \`backend/schema.sql\`
- Cloudflare R2 bucket: \`${R2_BUCKET_NAME}\`
- At least one model key: Anthropic, Gemini, or OpenAI

## Demo safety

Use fake legal documents only. Do not use real client files in the shared demo.
EOF

cat <<EOF
MikeOSS Dokploy demo preparation complete.

Generated files:
  ${TARGET_DIR}/.prochat-dokploy/backend.env.template
  ${TARGET_DIR}/.prochat-dokploy/frontend.env.template
  ${TARGET_DIR}/.prochat-dokploy/dokploy-settings.md

Next steps:
  1. Create Supabase project.
  2. Run backend/schema.sql in Supabase SQL editor.
  3. Create Cloudflare R2 bucket and keys.
  4. Replace placeholders in env templates.
  5. Create two Dokploy apps from ${REPO_URL}.
  6. Use root directories: backend and frontend.
  7. Attach domains:
     - frontend: https://${FRONTEND_DOMAIN}
     - backend:  https://${BACKEND_DOMAIN}

EOF
