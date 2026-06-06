#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const repoRoot = resolve(new URL('..', import.meta.url).pathname);
const defaultInput = resolve(repoRoot, 'graphify-out/graph.json');
const defaultOutput = resolve(repoRoot, 'graphify-out/graph.html');

function parseArgs(argv) {
  const args = {
    input: defaultInput,
    output: defaultOutput,
    maxNodes: 1200,
    maxLinks: 3000,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--input') {
      const next = argv[index + 1];
      if (!next) throw new Error('--input requires a path');
      args.input = resolve(repoRoot, next);
      index += 1;
    } else if (arg === '--output') {
      const next = argv[index + 1];
      if (!next) throw new Error('--output requires a path');
      args.output = resolve(repoRoot, next);
      index += 1;
    } else if (arg === '--max-nodes') {
      const next = Number(argv[index + 1]);
      if (!Number.isInteger(next) || next < 1) throw new Error('--max-nodes requires a positive integer');
      args.maxNodes = next;
      index += 1;
    } else if (arg === '--max-links') {
      const next = Number(argv[index + 1]);
      if (!Number.isInteger(next) || next < 1) throw new Error('--max-links requires a positive integer');
      args.maxLinks = next;
      index += 1;
    } else if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function helpText() {
  return `Usage: node tools/render-graph-html.mjs [options]\n\nGenerates a static clickable HTML graph from graphify-out/graph.json.\n\nOptions:\n  --input <path>       Repo-relative graph JSON input. Default: graphify-out/graph.json\n  --output <path>      Repo-relative HTML output. Default: graphify-out/graph.html\n  --max-nodes <count>  Maximum nodes to render. Default: 1200\n  --max-links <count>  Maximum links to render. Default: 3000\n`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function selectGraph(rawGraph, maxNodes, maxLinks) {
  const nodes = Array.isArray(rawGraph.nodes) ? rawGraph.nodes : [];
  const links = Array.isArray(rawGraph.links) ? rawGraph.links : [];

  const degree = new Map();
  for (const link of links) {
    if (typeof link.source === 'string') degree.set(link.source, (degree.get(link.source) ?? 0) + 1);
    if (typeof link.target === 'string') degree.set(link.target, (degree.get(link.target) ?? 0) + 1);
  }

  const selectedNodes = [...nodes]
    .sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0))
    .slice(0, maxNodes)
    .map(node => ({
      id: String(node.id),
      label: String(node.label ?? node.id),
      file_type: node.file_type ?? null,
      source_file: node.source_file ?? null,
      source_location: node.source_location ?? null,
      community: node.community ?? null,
      degree: degree.get(node.id) ?? 0,
    }));

  const selectedIds = new Set(selectedNodes.map(node => node.id));
  const selectedLinks = links
    .filter(link => selectedIds.has(link.source) && selectedIds.has(link.target))
    .slice(0, maxLinks)
    .map(link => ({
      source: String(link.source),
      target: String(link.target),
      relation: link.relation ?? null,
      weight: link.weight ?? 1,
    }));

  return {
    directed: Boolean(rawGraph.directed),
    generatedAt: new Date().toISOString(),
    totalNodes: nodes.length,
    totalLinks: links.length,
    renderedNodes: selectedNodes.length,
    renderedLinks: selectedLinks.length,
    nodes: selectedNodes,
    links: selectedLinks,
  };
}

function htmlFor(graph) {
  const graphJson = JSON.stringify(graph).replaceAll('</script', '<\\/script');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mind Graph</title>
  <style>
    html, body { margin: 0; height: 100%; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0f172a; color: #e2e8f0; }
    #app { display: grid; grid-template-columns: 320px 1fr; height: 100%; }
    aside { padding: 16px; border-right: 1px solid #334155; background: #111827; overflow: auto; }
    main { position: relative; overflow: hidden; }
    h1 { font-size: 18px; margin: 0 0 8px; }
    p, label { color: #cbd5e1; font-size: 13px; line-height: 1.45; }
    input { width: 100%; box-sizing: border-box; padding: 8px; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #e2e8f0; }
    .stat { display: grid; grid-template-columns: 1fr auto; gap: 8px; font-size: 13px; padding: 4px 0; border-bottom: 1px solid #1f2937; }
    .node { cursor: pointer; }
    .node circle { stroke: #0f172a; stroke-width: 1.5; }
    .node text { fill: #e2e8f0; font-size: 10px; pointer-events: none; }
    .link { stroke: #64748b; stroke-opacity: 0.45; }
    .selected circle { stroke: #f8fafc; stroke-width: 3; }
    #details { margin-top: 16px; padding: 12px; background: #0f172a; border: 1px solid #334155; border-radius: 10px; font-size: 13px; white-space: pre-wrap; }
    #empty { color: #94a3b8; }
    a { color: #93c5fd; }
  </style>
</head>
<body>
<div id="app">
  <aside>
    <h1>Mind Graph</h1>
    <p>Generated: ${escapeHtml(graph.generatedAt)}</p>
    <div class="stat"><span>Total nodes</span><strong>${graph.totalNodes}</strong></div>
    <div class="stat"><span>Total links</span><strong>${graph.totalLinks}</strong></div>
    <div class="stat"><span>Rendered nodes</span><strong>${graph.renderedNodes}</strong></div>
    <div class="stat"><span>Rendered links</span><strong>${graph.renderedLinks}</strong></div>
    <p>This view renders the highest-degree nodes for browser performance. Regenerate with higher limits if needed.</p>
    <label for="search">Search node labels</label>
    <input id="search" placeholder="Type to highlight...">
    <div id="details"><span id="empty">Click a node to inspect it.</span></div>
  </aside>
  <main><svg id="graph" width="100%" height="100%"></svg></main>
</div>
<script type="application/json" id="graph-data">${graphJson}</script>
<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
<script>
const data = JSON.parse(document.getElementById('graph-data').textContent);
const svg = d3.select('#graph');
const main = document.querySelector('main');
const width = main.clientWidth;
const height = main.clientHeight;
const root = svg.append('g');
svg.call(d3.zoom().scaleExtent([0.1, 6]).on('zoom', event => root.attr('transform', event.transform)));
const color = d3.scaleOrdinal(d3.schemeTableau10);
const links = data.links.map(d => ({ ...d }));
const nodes = data.nodes.map(d => ({ ...d }));
const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(55))
  .force('charge', d3.forceManyBody().strength(-110))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collision', d3.forceCollide().radius(d => Math.max(8, Math.min(26, 5 + Math.sqrt(d.degree || 1)))));
const link = root.append('g').selectAll('line').data(links).join('line').attr('class', 'link').attr('stroke-width', d => Math.max(1, Math.min(4, Number(d.weight) || 1)));
const node = root.append('g').selectAll('g').data(nodes).join('g').attr('class', 'node').call(drag(simulation));
node.append('circle').attr('r', d => Math.max(5, Math.min(20, 4 + Math.sqrt(d.degree || 1)))).attr('fill', d => color(d.community ?? d.file_type ?? 'unknown'));
node.append('title').text(d => [d.label, d.source_file, d.source_location].filter(Boolean).join(' — '));
node.append('text').attr('x', 9).attr('y', 3).text(d => d.label.length > 32 ? d.label.slice(0, 29) + '…' : d.label);
node.on('click', (_event, d) => {
  node.classed('selected', item => item.id === d.id);
  document.getElementById('details').textContent = JSON.stringify(d, null, 2);
});
simulation.on('tick', () => {
  link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
  node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
});
document.getElementById('search').addEventListener('input', event => {
  const value = event.target.value.trim().toLowerCase();
  node.style('opacity', d => !value || d.label.toLowerCase().includes(value) ? 1 : 0.15);
  link.style('opacity', d => !value || d.source.label?.toLowerCase().includes(value) || d.target.label?.toLowerCase().includes(value) ? 0.45 : 0.05);
});
function drag(simulation) {
  return d3.drag()
    .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
    .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
    .on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; });
}
</script>
</body>
</html>
`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(helpText());
    return;
  }

  const raw = JSON.parse(await readFile(args.input, 'utf8'));
  const selected = selectGraph(raw, args.maxNodes, args.maxLinks);
  const html = htmlFor(selected);
  await mkdir(dirname(args.output), { recursive: true });
  await writeFile(args.output, html, 'utf8');
  process.stdout.write(`Wrote ${args.output}\nRendered ${selected.renderedNodes}/${selected.totalNodes} nodes and ${selected.renderedLinks}/${selected.totalLinks} links.\n`);
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
