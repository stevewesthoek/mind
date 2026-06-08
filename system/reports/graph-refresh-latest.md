# Graph Refresh Report

Status: ok

Started: 2026-06-07T10:45:40+01:00
Ended: 2026-06-07T10:45:56+01:00

Generated/updated:

- graphify-out/GRAPH_REPORT.md
- graphify-out/graph.json
- graphify-out/graph.html

No files should be written to the repository root by this tool.

## Graphify log tail

```text
Re-extracting code files in . (no LLM needed)...
  AST extraction: 1306/1306 files (100%)
[graphify watch] Skipped graph.html: Graph has 12993 nodes - too large for HTML viz (limit: 5000). Use --no-viz, raise GRAPHIFY_VIZ_NODE_LIMIT, or reduce input size.
[graphify watch] Rebuilt: 12993 nodes, 22126 edges, 1456 communities
[graphify watch] graph.json and GRAPH_REPORT.md updated in graphify-out
Code graph updated. For doc/paper/image changes run /graphify --update in your AI assistant.
Tip: set GEMINI_API_KEY or GOOGLE_API_KEY to use Gemini for semantic extraction.
```

## Renderer log tail

```text
Wrote /Users/Office/Repos/stevewesthoek/mind/graphify-out/graph.html
Rendered 1200/6259 nodes and 166/4998 links.
```
