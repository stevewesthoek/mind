#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

REPORT_DIR="system/reports"
REPORT_JSON="$REPORT_DIR/graph-refresh-latest.json"
REPORT_MD="$REPORT_DIR/graph-refresh-latest.md"
STARTED_AT="$(date -Iseconds)"

mkdir -p "$REPORT_DIR"

if ! command -v graphify >/dev/null 2>&1; then
  cat > "$REPORT_JSON" <<JSON
{
  "status": "blocked",
  "reason": "graphify command not found",
  "startedAt": "$STARTED_AT",
  "endedAt": "$(date -Iseconds)",
  "writesToRoot": false,
  "updatesGraphifyOut": false,
  "updatesVisualGraph": false
}
JSON
  cat > "$REPORT_MD" <<MD
# Graph Refresh Report

Status: blocked

Reason: `graphify` command not found.

Started: $STARTED_AT
Ended: $(date -Iseconds)

No graph output was refreshed.
MD
  echo "Blocked: graphify command not found. See $REPORT_MD"
  exit 1
fi

GRAPHIFY_OUTPUT="$(mktemp)"
RENDER_OUTPUT="$(mktemp)"
cleanup() {
  rm -f "$GRAPHIFY_OUTPUT" "$RENDER_OUTPUT"
}
trap cleanup EXIT

set +e
graphify update . >"$GRAPHIFY_OUTPUT" 2>&1
GRAPHIFY_EXIT=$?
set -e

if [[ "$GRAPHIFY_EXIT" -ne 0 ]]; then
  ENDED_AT="$(date -Iseconds)"
  GRAPHIFY_LOG_ESCAPED="$(python3 - <<'PY' "$GRAPHIFY_OUTPUT"
import json, pathlib, sys
print(json.dumps(pathlib.Path(sys.argv[1]).read_text(errors='replace')[-4000:]))
PY
)"
  cat > "$REPORT_JSON" <<JSON
{
  "status": "failed",
  "stage": "graphify update",
  "startedAt": "$STARTED_AT",
  "endedAt": "$ENDED_AT",
  "writesToRoot": false,
  "updatesGraphifyOut": true,
  "updatesVisualGraph": false,
  "graphifyLogTail": $GRAPHIFY_LOG_ESCAPED
}
JSON
  cat > "$REPORT_MD" <<MD
# Graph Refresh Report

Status: failed

Stage: graphify update

Started: $STARTED_AT
Ended: $ENDED_AT

## Graphify log tail

\`\`\`text
$(tail -n 80 "$GRAPHIFY_OUTPUT")
\`\`\`
MD
  echo "Failed: graphify update failed. See $REPORT_MD"
  exit "$GRAPHIFY_EXIT"
fi

set +e
node tools/render-graph-html.mjs >"$RENDER_OUTPUT" 2>&1
RENDER_EXIT=$?
set -e

ENDED_AT="$(date -Iseconds)"
GRAPHIFY_LOG_ESCAPED="$(python3 - <<'PY' "$GRAPHIFY_OUTPUT"
import json, pathlib, sys
print(json.dumps(pathlib.Path(sys.argv[1]).read_text(errors='replace')[-4000:]))
PY
)"
RENDER_LOG_ESCAPED="$(python3 - <<'PY' "$RENDER_OUTPUT"
import json, pathlib, sys
print(json.dumps(pathlib.Path(sys.argv[1]).read_text(errors='replace')[-4000:]))
PY
)"

if [[ "$RENDER_EXIT" -ne 0 ]]; then
  cat > "$REPORT_JSON" <<JSON
{
  "status": "failed",
  "stage": "render graph html",
  "startedAt": "$STARTED_AT",
  "endedAt": "$ENDED_AT",
  "writesToRoot": false,
  "updatesGraphifyOut": true,
  "updatesVisualGraph": false,
  "graphifyLogTail": $GRAPHIFY_LOG_ESCAPED,
  "rendererLogTail": $RENDER_LOG_ESCAPED
}
JSON
  cat > "$REPORT_MD" <<MD
# Graph Refresh Report

Status: failed

Stage: render graph html

Started: $STARTED_AT
Ended: $ENDED_AT

## Graphify log tail

\`\`\`text
$(tail -n 80 "$GRAPHIFY_OUTPUT")
\`\`\`

## Renderer log tail

\`\`\`text
$(tail -n 80 "$RENDER_OUTPUT")
\`\`\`
MD
  echo "Failed: graph renderer failed. See $REPORT_MD"
  exit "$RENDER_EXIT"
fi

cat > "$REPORT_JSON" <<JSON
{
  "status": "ok",
  "startedAt": "$STARTED_AT",
  "endedAt": "$ENDED_AT",
  "writesToRoot": false,
  "updatesGraphifyOut": true,
  "updatesVisualGraph": true,
  "graphReport": "graphify-out/GRAPH_REPORT.md",
  "graphData": "graphify-out/graph.json",
  "visualGraph": "graphify-out/graph.html",
  "graphifyLogTail": $GRAPHIFY_LOG_ESCAPED,
  "rendererLogTail": $RENDER_LOG_ESCAPED
}
JSON

cat > "$REPORT_MD" <<MD
# Graph Refresh Report

Status: ok

Started: $STARTED_AT
Ended: $ENDED_AT

Generated/updated:

- `graphify-out/GRAPH_REPORT.md`
- `graphify-out/graph.json`
- `graphify-out/graph.html`

No files should be written to the repository root by this tool.

## Graphify log tail

\`\`\`text
$(tail -n 80 "$GRAPHIFY_OUTPUT")
\`\`\`

## Renderer log tail

\`\`\`text
$(tail -n 80 "$RENDER_OUTPUT")
\`\`\`
MD

echo "Graph refresh complete. See $REPORT_MD"
