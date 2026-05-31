#!/bin/bash
# YouTube OAuth Token Validation
# Verifies local token is valid and YouTube API is accessible
# Usage: scripts/youtube-auth-check.sh

set -e

TOKEN_FILE="${HOME}/.youtube_tokens.json"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "==========================================="
echo "YouTube OAuth Token Validation"
echo "==========================================="
echo ""

# Step 1: Check token file exists
echo "Step 1: Checking token file..."

if [ ! -f "$TOKEN_FILE" ]; then
    echo -e "${RED}❌ Token file not found: $TOKEN_FILE${NC}"
    echo ""
    echo "Run this first:"
    echo "  scripts/youtube-auth-local.sh"
    exit 1
fi

echo -e "${GREEN}✓ Token file found${NC}"
echo "  File: $TOKEN_FILE"
echo ""

# Step 2: Extract token data
echo "Step 2: Reading token data..."

ACCESS_TOKEN=$(jq -r '.access_token // empty' "$TOKEN_FILE" 2>/dev/null)
REFRESH_TOKEN=$(jq -r '.refresh_token // empty' "$TOKEN_FILE" 2>/dev/null)
CREATED_AT=$(jq -r '.created_at // empty' "$TOKEN_FILE" 2>/dev/null)
EXPIRES_IN=$(jq -r '.expires_in // empty' "$TOKEN_FILE" 2>/dev/null)

if [ -z "$ACCESS_TOKEN" ] || [ -z "$REFRESH_TOKEN" ]; then
    echo -e "${RED}❌ Token file is invalid or corrupted${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Token data readable${NC}"
echo "  Access token: ${ACCESS_TOKEN:0:20}..."
echo "  Refresh token: ${REFRESH_TOKEN:0:20}..."
echo ""

# Step 3: Check token expiry
echo "Step 3: Checking token expiry..."

CURRENT_TIME=$(date +%s)
CREATED_TIME=$CREATED_AT
TOKEN_LIFETIME=$((EXPIRES_IN))
EXPIRY_TIME=$((CREATED_TIME + TOKEN_LIFETIME))
SECONDS_REMAINING=$((EXPIRY_TIME - CURRENT_TIME))

if [ $SECONDS_REMAINING -lt 0 ]; then
    echo -e "${YELLOW}⚠ Token is EXPIRED${NC}"
    echo "  Expired: $(date -d "@$EXPIRY_TIME" 2>/dev/null || echo "N/A")"
    echo ""
    echo "Token will be automatically refreshed on next API call."
    echo "For immediate refresh, re-run:"
    echo "  scripts/youtube-auth-local.sh"
elif [ $SECONDS_REMAINING -lt 300 ]; then
    echo -e "${YELLOW}⚠ Token expiring soon (< 5 minutes)${NC}"
else
    echo -e "${GREEN}✓ Token valid${NC}"
    HOURS=$((SECONDS_REMAINING / 3600))
    MINUTES=$(((SECONDS_REMAINING % 3600) / 60))
    echo "  Expires in: ${HOURS}h ${MINUTES}m (${SECONDS_REMAINING}s)"
fi
echo ""

# Step 4: Test YouTube API access
echo "Step 4: Testing YouTube API access..."
echo "  Calling: channels.list (mine=true)"
echo ""

API_RESPONSE=$(curl -s "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true" \
    -H "Authorization: Bearer $ACCESS_TOKEN" 2>/dev/null)

# Check for API errors
API_ERROR=$(echo "$API_RESPONSE" | jq -r '.error.message // empty' 2>/dev/null)

if [ -n "$API_ERROR" ]; then
    echo -e "${RED}❌ YouTube API error${NC}"
    echo "  Error: $API_ERROR"
    echo ""

    if [[ "$API_ERROR" == *"invalid_token"* ]] || [[ "$API_ERROR" == *"expired"* ]]; then
        echo "Token has expired. Re-authenticate:"
        echo "  scripts/youtube-auth-local.sh"
    fi
    exit 1
fi

# Extract channel info
CHANNEL_NAME=$(echo "$API_RESPONSE" | jq -r '.items[0].snippet.title // "UNKNOWN"' 2>/dev/null)
CHANNEL_ID=$(echo "$API_RESPONSE" | jq -r '.items[0].id // "UNKNOWN"' 2>/dev/null)
SUBSCRIBER_COUNT=$(echo "$API_RESPONSE" | jq -r '.items[0].statistics.subscriberCount // "hidden"' 2>/dev/null)
VIEW_COUNT=$(echo "$API_RESPONSE" | jq -r '.items[0].statistics.viewCount // "0"' 2>/dev/null)

if [ "$CHANNEL_NAME" = "UNKNOWN" ] || [ "$CHANNEL_ID" = "UNKNOWN" ]; then
    echo -e "${RED}❌ Could not retrieve channel information${NC}"
    echo "Response: $API_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✓ YouTube API responding${NC}"
echo ""

# Step 5: Display channel information
echo "Step 5: Authenticated channel information..."
echo ""
echo "  Channel Name: $CHANNEL_NAME"
echo "  Channel ID: $CHANNEL_ID"
echo "  Subscribers: $SUBSCRIBER_COUNT"
echo "  Total Views: $VIEW_COUNT"
echo ""

# Step 6: Check API scopes
echo "Step 6: Checking authorized scopes..."

SCOPES=$(jq -r '.scope // "UNKNOWN"' "$TOKEN_FILE")
echo "  Scopes:"
echo "$SCOPES" | tr ' ' '\n' | sed 's/^/    - /'
echo ""

if [[ "$SCOPES" == *"youtube.upload"* ]]; then
    echo -e "${GREEN}✓ youtube.upload scope available${NC}"
else
    echo -e "${YELLOW}⚠ youtube.upload scope NOT available${NC}"
    echo "  Re-authenticate to add upload scope:"
    echo "    scripts/youtube-auth-local.sh"
fi

if [[ "$SCOPES" == *"youtube.readonly"* ]]; then
    echo -e "${GREEN}✓ youtube.readonly scope available${NC}"
else
    echo -e "${YELLOW}⚠ youtube.readonly scope NOT available${NC}"
fi

echo ""

# Final status
echo "==========================================="
echo -e "${GREEN}✅ YouTube OAuth Validation Complete${NC}"
echo "==========================================="
echo ""
echo "Status:"
echo "  ✓ Token file: $TOKEN_FILE"
echo "  ✓ Token expiry: OK ($SECONDS_REMAINING seconds remaining)"
echo "  ✓ YouTube API: Responding"
echo "  ✓ Authenticated: $CHANNEL_NAME"
echo ""
echo "Ready for: I-6.2b (YouTube upload Lambda)"
echo ""
