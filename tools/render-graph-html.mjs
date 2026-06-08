#!/usr/bin/env node
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';

const repoRoot = resolve(new URL('..', import.meta.url).pathname);
const defaultInput = resolve(repoRoot, 'graphify-out/graph.json');
const defaultOutput = resolve(repoRoot, 'graphify-out/graph.html');

const allowedRoots = new Set(['archive', 'capture', 'live', 'router', 'sources', 'system', 'tasks', 'wiki']);
const blockedRoots = new Set(['.git', '.obsidian', 'graphify-out', 'node_modules', 'cache']);
const stopConcepts = new Set([
  'about', 'after', 'also', 'because', 'before', 'between', 'capture', 'current', 'example', 'folder', 'future',
  'graph', 'index', 'inside', 'notes', 'output', 'phase', 'report', 'source', 'status', 'system', 'task', 'that',
  'this', 'through', 'update', 'using', 'with', 'without', 'workflow', 'writes', 'write', 'read', 'file', 'files',
]);

function parseArgs(argv) {
  const args = { input: defaultInput, output: defaultOutput, maxNodes: 1200, maxLinks: 3000, mode: 'file' };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--input') args.input = resolve(repoRoot, argv[++index] ?? '');
    else if (arg === '--output') args.output = resolve(repoRoot, argv[++index] ?? '');
    else if (arg === '--max-nodes') args.maxNodes = Number(argv[++index]);
    else if (arg === '--max-links') args.maxLinks = Number(argv[++index]);
    else if (arg === '--mode') args.mode = argv[++index] ?? 'file';
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isInteger(args.maxNodes) || args.maxNodes < 1) throw new Error('--max-nodes requires a positive integer');
  if (!Number.isInteger(args.maxLinks) || args.maxLinks < 1) throw new Error('--max-links requires a positive integer');
  if (!['file', 'concept'].includes(args.mode)) throw new Error('--mode must be file or concept');
  return args;
}

function helpText() {
  return `Usage: node tools/render-graph-html.mjs [options]\n\nGenerates a clickable HTML graph from graphify-out/graph.json.\n\nDefault mode is a hybrid human graph: Markdown files are nodes, folder/tag hubs are navigational nodes, and edges come from folder membership, Markdown links, tags, direct Graphify links, and shared Graphify concepts.\n\nOptions:\n  --input <path>       Repo-relative Graphify JSON input. Default: graphify-out/graph.json\n  --output <path>      Repo-relative HTML output. Default: graphify-out/graph.html\n  --max-nodes <count>  Maximum nodes to render. Default: 1200\n  --max-links <count>  Maximum links to render. Default: 3000\n  --mode <file|concept> Default: file\n`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isHumanReadablePath(pathValue) {
  const path = String(pathValue ?? '');
  if (!path.endsWith('.md')) return false;
  if (path === 'home.md' || path === 'kanban.md') return true;
  const root = path.split('/')[0];
  return allowedRoots.has(root) && !blockedRoots.has(root);
}

function noteLabel(path) {
  if (path === 'home.md' || path === 'kanban.md') return path.replace(/\.md$/, '');
  const parts = String(path).split('/');
  const fileName = parts.at(-1)?.replace(/\.md$/, '') || String(path);
  const parent = parts.length > 1 ? parts.at(-2) : null;
  return parent && !allowedRoots.has(parent) ? `${fileName} · ${parent}` : fileName;
}

async function walkMarkdown(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (blockedRoots.has(entry.name)) continue;
    const fullPath = resolve(dir, entry.name);
    const rel = relative(repoRoot, fullPath);
    const root = rel.split('/')[0];
    if (entry.isDirectory()) {
      if (rel.split('/').length === 1 && !allowedRoots.has(root) && root !== '.') continue;
      await walkMarkdown(fullPath, results);
    } else if (entry.isFile() && extname(entry.name) === '.md' && isHumanReadablePath(rel)) {
      results.push(rel);
    }
  }
  return results;
}

function normalizeConcept(node) {
  const raw = String(node.norm_label ?? node.label ?? '').trim().toLowerCase();
  if (!raw || raw.length < 4 || raw.length > 80) return null;
  if (stopConcepts.has(raw)) return null;
  if (/^\d+$/.test(raw) || /^l\d+$/.test(raw)) return null;
  if (/[{};=()]/.test(raw)) return null;
  if (raw.includes('function') || raw.includes('const ') || raw.includes('return ')) return null;
  return raw;
}

function addNode(nodes, id, attrs) {
  if (!nodes.has(id)) nodes.set(id, { id, degree: 0, ...attrs });
  return nodes.get(id);
}

function addEdge(edgeMap, source, target, weight, relation, reason) {
  if (!source || !target || source === target) return;
  const directed = relation === 'markdown-link';
  const [a, b] = directed ? [source, target] : [source, target].sort();
  const key = `${relation}|||${a}|||${b}`;
  const edge = edgeMap.get(key) ?? { source: a, target: b, weight: 0, relation, reasons: new Set() };
  edge.weight += weight;
  if (reason) edge.reasons.add(reason);
  edgeMap.set(key, edge);
}

function extractTags(markdown) {
  return [...markdown.matchAll(/(^|\s)#([\p{L}\p{N}_/-]{2,})/gu)]
    .map(match => `#${match[2]}`)
    .filter(tag => !/^#\d+$/.test(tag));
}

function extractWikiLinks(markdown) {
  return [...markdown.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)].map(match => match[1].trim());
}

function extractMarkdownLinks(markdown) {
  return [...markdown.matchAll(/\[[^\]]+\]\(([^)]+\.md)(?:#[^)]+)?\)/g)].map(match => match[1].trim());
}

function resolveLink(fromPath, link, pathByStem) {
  const clean = link.replace(/^\.\//, '').replace(/\.md$/, '');
  const direct = clean.endsWith('.md') ? clean : `${clean}.md`;
  if (pathByStem.has(direct.replace(/\.md$/, '').toLowerCase())) return pathByStem.get(direct.replace(/\.md$/, '').toLowerCase());

  const fromDir = dirname(fromPath);
  const relativeCandidate = relative(repoRoot, resolve(repoRoot, fromDir, direct));
  if (isHumanReadablePath(relativeCandidate)) return relativeCandidate;

  const stem = clean.split('/').at(-1)?.toLowerCase();
  return stem ? pathByStem.get(stem) ?? null : null;
}

async function buildFileGraph(rawGraph, maxNodes, maxLinks) {
  const markdownFiles = await walkMarkdown(repoRoot);
  const nodes = new Map();
  const edgeMap = new Map();
  const pathByStem = new Map();

  for (const path of markdownFiles) {
    addNode(nodes, path, { label: noteLabel(path), path, kind: 'file', file_type: 'markdown-file', community: path.split('/')[0] });
    pathByStem.set(path.replace(/\.md$/, '').split('/').at(-1).toLowerCase(), path);
  }

  for (const path of markdownFiles) {
    const parts = path.split('/');
    const root = parts.length === 1 ? 'root' : parts[0];
    const rootHub = `folder:${root}`;
    addNode(nodes, rootHub, { label: root, path: root, kind: 'folder', file_type: 'folder-hub', community: root });
    addEdge(edgeMap, rootHub, path, 3, 'folder', `folder:${root}`);

    if (parts.length > 2) {
      const parentPath = parts.slice(0, -1).join('/');
      const parentHub = `folder:${parentPath}`;
      addNode(nodes, parentHub, { label: parentPath, path: parentPath, kind: 'folder', file_type: 'folder-hub', community: root });
      addEdge(edgeMap, rootHub, parentHub, 2, 'folder', `folder:${parentPath}`);
      addEdge(edgeMap, parentHub, path, 4, 'folder', `folder:${parentPath}`);
    }

    const markdown = await readFile(resolve(repoRoot, path), 'utf8').catch(() => '');

    for (const tag of new Set(extractTags(markdown))) {
      const tagHub = `tag:${tag}`;
      addNode(nodes, tagHub, { label: tag, path: tag, kind: 'tag', file_type: 'tag-hub', community: 'tag' });
      addEdge(edgeMap, tagHub, path, 5, 'tag', tag);
    }

    for (const link of [...extractWikiLinks(markdown), ...extractMarkdownLinks(markdown)]) {
      const target = resolveLink(path, link, pathByStem);
      if (target && nodes.has(target)) addEdge(edgeMap, path, target, 8, 'markdown-link', link);
    }
  }

  const rawNodes = Array.isArray(rawGraph.nodes) ? rawGraph.nodes : [];
  const rawLinks = Array.isArray(rawGraph.links) ? rawGraph.links : [];
  const graphifyNodeToFile = new Map();
  const conceptToFiles = new Map();

  for (const node of rawNodes) {
    if (!isHumanReadablePath(node.source_file)) continue;
    const sourceFile = String(node.source_file);
    if (!nodes.has(sourceFile)) continue;
    graphifyNodeToFile.set(String(node.id), sourceFile);
    const concept = normalizeConcept(node);
    if (concept) {
      const set = conceptToFiles.get(concept) ?? new Set();
      set.add(sourceFile);
      conceptToFiles.set(concept, set);
    }
  }

  for (const link of rawLinks) {
    const sourceFile = graphifyNodeToFile.get(String(link.source));
    const targetFile = graphifyNodeToFile.get(String(link.target));
    if (sourceFile && targetFile && sourceFile !== targetFile) {
      addEdge(edgeMap, sourceFile, targetFile, Number(link.weight) || 1, 'graphify-direct', link.relation ?? 'related');
    }
  }

  for (const [concept, fileSet] of conceptToFiles.entries()) {
    const relatedFiles = [...fileSet];
    if (relatedFiles.length < 2 || relatedFiles.length > 20) continue;
    for (let i = 0; i < relatedFiles.length; i += 1) {
      for (let j = i + 1; j < relatedFiles.length; j += 1) {
        addEdge(edgeMap, relatedFiles[i], relatedFiles[j], 1, 'shared-concept', concept);
      }
    }
  }

  for (const edge of edgeMap.values()) {
    nodes.get(edge.source).degree += 1;
    nodes.get(edge.target).degree += 1;
  }

  const selectedNodes = [...nodes.values()]
    .sort((a, b) => {
      const kindRank = { folder: 3, tag: 2, file: 1 };
      return (kindRank[b.kind] ?? 0) - (kindRank[a.kind] ?? 0) || b.degree - a.degree || a.label.localeCompare(b.label);
    })
    .slice(0, maxNodes);
  const selectedIds = new Set(selectedNodes.map(node => node.id));

  const selectedLinks = [...edgeMap.values()]
    .filter(edge => selectedIds.has(edge.source) && selectedIds.has(edge.target))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, maxLinks)
    .map(edge => ({
      source: edge.source,
      target: edge.target,
      relation: edge.relation,
      weight: edge.weight,
      reasons: [...edge.reasons].slice(0, 8),
    }));

  return {
    mode: 'file',
    generatedAt: new Date().toISOString(),
    rawGraphNodes: rawNodes.length,
    rawGraphLinks: rawLinks.length,
    totalNodes: nodes.size,
    totalLinks: edgeMap.size,
    renderedNodes: selectedNodes.length,
    renderedLinks: selectedLinks.length,
    nodes: selectedNodes,
    links: selectedLinks,
  };
}

function buildConceptGraph(rawGraph, maxNodes, maxLinks) {
  const allNodes = Array.isArray(rawGraph.nodes) ? rawGraph.nodes : [];
  const allLinks = Array.isArray(rawGraph.links) ? rawGraph.links : [];
  const nodes = allNodes.filter(node => isHumanReadablePath(node.source_file));
  const ids = new Set(nodes.map(node => String(node.id)));
  const links = allLinks.filter(link => ids.has(String(link.source)) && ids.has(String(link.target)));
  const degree = new Map();
  for (const link of links) {
    degree.set(String(link.source), (degree.get(String(link.source)) ?? 0) + 1);
    degree.set(String(link.target), (degree.get(String(link.target)) ?? 0) + 1);
  }
  const selectedNodes = nodes.sort((a, b) => (degree.get(String(b.id)) ?? 0) - (degree.get(String(a.id)) ?? 0)).slice(0, maxNodes).map(node => ({
    id: String(node.id),
    label: String(node.label ?? node.id),
    path: node.source_file ?? null,
    kind: 'concept',
    file_type: node.file_type ?? null,
    source_file: node.source_file ?? null,
    source_location: node.source_location ?? null,
    community: node.community ?? null,
    degree: degree.get(String(node.id)) ?? 0,
  }));
  const selectedIds = new Set(selectedNodes.map(node => node.id));
  const selectedLinks = links.filter(link => selectedIds.has(String(link.source)) && selectedIds.has(String(link.target))).slice(0, maxLinks).map(link => ({
    source: String(link.source),
    target: String(link.target),
    relation: link.relation ?? 'related',
    weight: Number(link.weight) || 1,
  }));
  return {
    mode: 'concept',
    generatedAt: new Date().toISOString(),
    rawGraphNodes: allNodes.length,
    rawGraphLinks: allLinks.length,
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
    #app { display: grid; grid-template-columns: 380px 1fr; height: 100%; }
    aside { padding: 16px; border-right: 1px solid #334155; background: #111827; overflow: auto; }
    main { position: relative; overflow: hidden; }
    h1 { font-size: 18px; margin: 0 0 8px; }
    p, label { color: #cbd5e1; font-size: 13px; line-height: 1.45; }
    input { width: 100%; box-sizing: border-box; padding: 8px; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #e2e8f0; }
    .stat { display: grid; grid-template-columns: 1fr auto; gap: 8px; font-size: 13px; padding: 4px 0; border-bottom: 1px solid #1f2937; }
    .node { cursor: pointer; }
    .node circle { stroke: #0f172a; stroke-width: 1.5; }
    .node text { fill: #e2e8f0; font-size: 10px; pointer-events: none; }
    .link { stroke: #64748b; stroke-opacity: 0.35; }
    .link.folder { stroke: #94a3b8; stroke-opacity: 0.2; }
    .link.markdown-link { stroke: #38bdf8; stroke-opacity: 0.7; }
    .link.tag { stroke: #facc15; stroke-opacity: 0.45; }
    .selected circle { stroke: #f8fafc; stroke-width: 3; }
    #details { margin-top: 16px; padding: 12px; background: #0f172a; border: 1px solid #334155; border-radius: 10px; font-size: 13px; white-space: pre-wrap; }
    #empty { color: #94a3b8; }
  </style>
</head>
<body>
<div id="app">
  <aside>
    <h1>Mind Graph</h1>
    <p>Mode: ${escapeHtml(graph.mode)} · Generated: ${escapeHtml(graph.generatedAt)}</p>
    <div class="stat"><span>Raw Graphify nodes</span><strong>${graph.rawGraphNodes}</strong></div>
    <div class="stat"><span>Raw Graphify links</span><strong>${graph.rawGraphLinks}</strong></div>
    <div class="stat"><span>Graph nodes</span><strong>${graph.totalNodes}</strong></div>
    <div class="stat"><span>Graph links</span><strong>${graph.totalLinks}</strong></div>
    <div class="stat"><span>Rendered nodes</span><strong>${graph.renderedNodes}</strong></div>
    <div class="stat"><span>Rendered links</span><strong>${graph.renderedLinks}</strong></div>
    <p>File mode uses Markdown files plus folder/tag hubs. Edges include folder membership, Markdown links, tags, Graphify direct links, and shared concepts.</p>
    <label for="search">Search labels or paths</label>
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
svg.call(d3.zoom().scaleExtent([0.05, 8]).on('zoom', event => root.attr('transform', event.transform)));
const color = d3.scaleOrdinal(d3.schemeTableau10);
const links = data.links.map(d => ({ ...d }));
const nodes = data.nodes.map(d => ({ ...d }));
const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(d => d.relation === 'folder' ? 42 : Math.max(45, 125 - Math.min(90, Number(d.weight) || 1))))
  .force('charge', d3.forceManyBody().strength(d => d.kind === 'folder' ? -420 : d.kind === 'tag' ? -260 : -130))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collision', d3.forceCollide().radius(d => Math.max(8, Math.min(32, 6 + Math.sqrt(d.degree || 1)))));
const link = root.append('g').selectAll('line').data(links).join('line').attr('class', d => 'link ' + d.relation).attr('stroke-width', d => Math.max(0.8, Math.min(5, Math.sqrt(Number(d.weight) || 1))));
const node = root.append('g').selectAll('g').data(nodes).join('g').attr('class', 'node').call(drag(simulation));
node.append('circle').attr('r', d => d.kind === 'folder' ? 16 : d.kind === 'tag' ? 11 : Math.max(5, Math.min(18, 4 + Math.sqrt(d.degree || 1)))).attr('fill', d => d.kind === 'folder' ? '#60a5fa' : d.kind === 'tag' ? '#facc15' : color(d.community ?? d.file_type ?? 'unknown'));
node.append('title').text(d => [d.label, d.path, d.kind].filter(Boolean).join(' — '));
node.append('text').attr('x', 9).attr('y', 3).text(d => d.label.length > 36 ? d.label.slice(0, 33) + '…' : d.label);
node.on('click', (_event, d) => {
  node.classed('selected', item => item.id === d.id);
  const related = links.filter(link => link.source.id === d.id || link.target.id === d.id).slice(0, 12).map(link => ({
    relation: link.relation,
    other: link.source.id === d.id ? link.target.label : link.source.label,
    weight: link.weight,
    reasons: link.reasons,
  }));
  document.getElementById('details').textContent = JSON.stringify({ ...d, related }, null, 2);
});
simulation.on('tick', () => {
  link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
  node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
});
document.getElementById('search').addEventListener('input', event => {
  const value = event.target.value.trim().toLowerCase();
  node.style('opacity', d => !value || d.label.toLowerCase().includes(value) || String(d.path ?? '').toLowerCase().includes(value) ? 1 : 0.15);
  link.style('opacity', d => !value || d.source.label?.toLowerCase().includes(value) || d.target.label?.toLowerCase().includes(value) || String(d.source.path ?? '').toLowerCase().includes(value) || String(d.target.path ?? '').toLowerCase().includes(value) ? 0.45 : 0.04);
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
  const selected = args.mode === 'concept'
    ? buildConceptGraph(raw, args.maxNodes, args.maxLinks)
    : await buildFileGraph(raw, args.maxNodes, args.maxLinks);
  const html = htmlFor(selected);
  await mkdir(dirname(args.output), { recursive: true });
  await writeFile(args.output, html, 'utf8');
  process.stdout.write(`Wrote ${args.output}\nRendered ${selected.renderedNodes}/${selected.totalNodes} ${selected.mode} nodes and ${selected.renderedLinks}/${selected.totalLinks} links.\n`);
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
