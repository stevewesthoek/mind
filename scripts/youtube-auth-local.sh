#!/bin/bash
# YouTube OAuth Local Authentication Setup
# Generates local token file for YouTube Data API v3
# Usage: scripts/youtube-auth-local.sh
#
# Prerequisites:
# 1. Google Cloud project with YouTube Data API v3 enabled
# 2. OAuth 2.0 Desktop Client created in Cloud Console
# 3. client_secret.json downloaded and placed at ~/.youtube_client_secret.json
#
# Output:
# - ~/.youtube_tokens.json (gitignored, contains access and refresh tokens)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_SECRET_FILE="${HOME}/.youtube_client_secret.json"
TOKEN_FILE="${HOME}/.youtube_tokens.json"

REDIRECT_URI="http://localhost:8888"
LOCAL_PORT=8888

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "==========================================="
echo "YouTube OAuth Local Authentication Setup"
echo "==========================================="
echo ""

# Check if client_secret.json exists
if [ ! -f "$CLIENT_SECRET_FILE" ]; then
    echo -e "${RED}❌ ERROR: $CLIENT_SECRET_FILE not found${NC}"
    echo ""
    echo "Setup required:"
    echo "1. Go to https://console.cloud.google.com"
    echo "2. Create/select your project"
    echo "3. Enable YouTube Data API v3"
    echo "4. Go to APIs & Services → Credentials"
    echo "5. Create OAuth 2.0 Client ID (Desktop application)"
    echo "6. Download the JSON file"
    echo "7. Save to: $CLIENT_SECRET_FILE"
    echo ""
    exit 1
fi

# Extract OAuth credentials from client_secret.json
CLIENT_ID=$(jq -r '.installed.client_id' "$CLIENT_SECRET_FILE")
CLIENT_SECRET=$(jq -r '.installed.client_secret' "$CLIENT_SECRET_FILE")

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
    echo -e "${RED}❌ ERROR: Could not extract client_id or client_secret${NC}"
    echo "Verify $CLIENT_SECRET_FILE is a valid OAuth 2.0 Desktop Client JSON"
    exit 1
fi

echo "Using client_id: ${CLIENT_ID:0:20}..."
echo ""

# Define scopes
SCOPES="https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload"

# Step 1: Generate authorization URL
AUTH_URL="https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=$(echo -n "$SCOPES" | jq -sRr @uri)"

echo "Step 1: Opening browser for authorization..."
echo "URL: $AUTH_URL"
echo ""

# Open in browser (macOS)
if command -v open &> /dev/null; then
    open "$AUTH_URL"
elif command -v xdg-open &> /dev/null; then
    xdg-open "$AUTH_URL"
else
    echo "Please open this URL in your browser:"
    echo "$AUTH_URL"
fi

echo ""
echo "Step 2: Starting local server to capture redirect..."
echo "Listening on $REDIRECT_URI"
echo ""

# Step 2: Start local server and capture auth code
AUTH_CODE=""

# Create a simple HTTP server to capture the redirect
# Using Python if available, otherwise use a fallback
if command -v python3 &> /dev/null; then
    # Python-based server with timeout
    AUTH_CODE=$(python3 << 'PYTHON_EOF'
import http.server
import socketserver
import urllib.parse
from urllib.parse import urlparse, parse_qs
import sys
import threading
import time

auth_code = ""
server = None

class AuthHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        # Parse redirect URL
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)

        if 'code' in query_params:
            auth_code = query_params['code'][0]
            # Send success response
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<html><body><h1>Authorization successful!</h1><p>You can close this window.</p></body></html>')
            print(auth_code)
            sys.exit(0)
        elif 'error' in query_params:
            error = query_params['error'][0]
            self.send_response(400)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(f'<html><body><h1>Authorization failed</h1><p>Error: {error}</p></body></html>'.encode())
            print(f"ERROR: {error}", file=sys.stderr)
            sys.exit(1)
        else:
            self.send_response(400)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<html><body><h1>Invalid request</h1></body></html>')

    def log_message(self, format, *args):
        pass  # Suppress logging

# Suppress default logging
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", 8888), AuthHandler) as httpd:
    # Set timeout
    httpd.timeout = 300  # 5 minutes
    httpd.handle_request()
PYTHON_EOF
    ) 2>&1
elif command -v nc &> /dev/null; then
    # Netcat fallback
    echo "Waiting for authorization code..."
    echo "Once you authorize, Google will redirect to localhost. The code will be captured."

    # This is a simplified version - in production might need more robust capture
    read -p "Paste the code from the redirect URL here: " AUTH_CODE
else
    read -p "Enter the code from the redirect URL (code=...): " AUTH_CODE
fi

if [ -z "$AUTH_CODE" ]; then
    echo -e "${RED}❌ ERROR: No auth code received${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Authorization code received${NC}"
echo ""

# Step 3: Exchange code for tokens
echo "Step 3: Exchanging code for tokens..."

TOKEN_RESPONSE=$(curl -s -X POST https://oauth2.googleapis.com/token \
    -d "client_id=${CLIENT_ID}" \
    -d "client_secret=${CLIENT_SECRET}" \
    -d "code=${AUTH_CODE}" \
    -d "grant_type=authorization_code" \
    -d "redirect_uri=${REDIRECT_URI}")

# Check for errors
ERROR=$(echo "$TOKEN_RESPONSE" | jq -r '.error // empty')
if [ -n "$ERROR" ]; then
    echo -e "${RED}❌ ERROR: OAuth token exchange failed${NC}"
    echo "Response: $TOKEN_RESPONSE"
    exit 1
fi

# Extract tokens
ACCESS_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.access_token')
REFRESH_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.refresh_token')
EXPIRES_IN=$(echo "$TOKEN_RESPONSE" | jq -r '.expires_in')

if [ -z "$ACCESS_TOKEN" ] || [ -z "$REFRESH_TOKEN" ]; then
    echo -e "${RED}❌ ERROR: Missing access_token or refresh_token${NC}"
    echo "Response: $TOKEN_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✓ Tokens received${NC}"
echo ""

# Step 4: Save tokens to file
echo "Step 4: Saving tokens..."

CREATED_AT=$(date +%s)

TOKEN_DATA=$(cat <<EOF
{
  "access_token": "$ACCESS_TOKEN",
  "token_type": "Bearer",
  "expires_in": $EXPIRES_IN,
  "refresh_token": "$REFRESH_TOKEN",
  "scope": "$SCOPES",
  "created_at": $CREATED_AT
}
EOF
)

echo "$TOKEN_DATA" > "$TOKEN_FILE"
chmod 600 "$TOKEN_FILE"  # Restrict permissions

echo -e "${GREEN}✓ Tokens saved to $TOKEN_FILE${NC}"
echo ""

# Step 5: Validate token
echo "Step 5: Validating token..."

CHANNEL_INFO=$(curl -s "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true" \
    -H "Authorization: Bearer $ACCESS_TOKEN" 2>/dev/null)

CHANNEL_NAME=$(echo "$CHANNEL_INFO" | jq -r '.items[0].snippet.title // "UNKNOWN"' 2>/dev/null)
CHANNEL_ID=$(echo "$CHANNEL_INFO" | jq -r '.items[0].id // "UNKNOWN"' 2>/dev/null)

if [ "$CHANNEL_NAME" = "UNKNOWN" ] || [ "$CHANNEL_ID" = "UNKNOWN" ]; then
    echo -e "${YELLOW}⚠ Warning: Could not retrieve channel info${NC}"
else
    echo -e "${GREEN}✓ Token valid!${NC}"
    echo "  Channel: $CHANNEL_NAME"
    echo "  Channel ID: $CHANNEL_ID"
fi

echo ""
echo "==========================================="
echo -e "${GREEN}✅ YouTube OAuth Setup Complete${NC}"
echo "==========================================="
echo ""
echo "Token file: $TOKEN_FILE"
echo "Token expires in: ${EXPIRES_IN}s (approx $(( EXPIRES_IN / 3600 )) hours)"
echo ""
echo "Next steps:"
echo "1. Run: scripts/youtube-auth-check.sh"
echo "   to validate token and test API access"
echo ""
echo "2. When ready, run I-6.2b to implement"
echo "   lambda-publish-youtube.py for actual uploads"
echo ""
