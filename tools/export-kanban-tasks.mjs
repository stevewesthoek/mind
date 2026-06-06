#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const repoRoot = resolve(new URL('..', import.meta.url).pathname);
const kanbanPath = resolve(repoRoot, 'kanban.md');
const defaultOutputPath = resolve(repoRoot, 'system/reports/kanban-export-latest.json');

function parseArgs(argv) {
  const args = { write: false, output: defaultOutputPath, markdown: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--write') args.write = true;
    else if (arg === '--markdown') args.markdown = true;
    else if (arg === '--output') {
      const next = argv[index + 1];
      if (!next) throw new Error('--output requires a path');
      args.output = resolve(repoRoot, next);
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
  return `Usage: node tools/export-kanban-tasks.mjs [--write] [--output <path>] [--markdown]\n\nExports kanban.md into structured task data without modifying kanban.md.\n\nDefault behavior prints JSON to stdout.\n\nOptions:\n  --write           Write the export to system/reports/kanban-export-latest.json\n  --output <path>   Write to a custom repo-relative path when used with --write\n  --markdown        Output a Markdown summary instead of JSON\n`;
}

function parseKanban(markdown) {
  const lines = markdown.split(/\r?\n/);
  const columns = [];
  let currentColumn = null;
  let currentCard = null;
  let inPluginSettings = false;

  function finishCard() {
    if (currentColumn && currentCard) {
      currentColumn.cards.push(currentCard);
      currentCard = null;
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1;
    const line = lines[index];

    if (line.trim() === '%% kanban:settings') {
      finishCard();
      inPluginSettings = true;
      continue;
    }
    if (inPluginSettings) continue;

    const columnMatch = line.match(/^##\s+(.+?)\s*$/);
    if (columnMatch) {
      finishCard();
      currentColumn = { name: columnMatch[1], line: lineNumber, cards: [] };
      columns.push(currentColumn);
      continue;
    }

    const cardMatch = line.match(/^- \[( |x|X)\]\s*(.*)$/);
    if (cardMatch && currentColumn) {
      finishCard();
      currentCard = {
        column: currentColumn.name,
        line: lineNumber,
        checked: cardMatch[1].toLowerCase() === 'x',
        title: cardMatch[2].trim(),
        raw: line,
        tags: [...cardMatch[2].matchAll(/#[\p{L}\p{N}_-]+/gu)].map(match => match[0]),
        completedAt: (cardMatch[2].match(/✅\s*(\d{4}-\d{2}-\d{2})/) || [null, null])[1],
        subtasks: [],
      };
      continue;
    }

    const subtaskMatch = line.match(/^\s+- \[( |x|X)\]\s*(.*)$/);
    if (subtaskMatch && currentCard) {
      currentCard.subtasks.push({
        line: lineNumber,
        checked: subtaskMatch[1].toLowerCase() === 'x',
        title: subtaskMatch[2].trim(),
        raw: line,
        tags: [...subtaskMatch[2].matchAll(/#[\p{L}\p{N}_-]+/gu)].map(match => match[0]),
        completedAt: (subtaskMatch[2].match(/✅\s*(\d{4}-\d{2}-\d{2})/) || [null, null])[1],
      });
    }
  }

  finishCard();

  const cards = columns.flatMap(column => column.cards);
  return {
    source: 'kanban.md',
    generatedAt: new Date().toISOString(),
    columns: columns.map(column => ({
      name: column.name,
      line: column.line,
      cardCount: column.cards.length,
    })),
    totals: {
      columns: columns.length,
      cards: cards.length,
      checked: cards.filter(card => card.checked).length,
      unchecked: cards.filter(card => !card.checked).length,
      subtasks: cards.reduce((total, card) => total + card.subtasks.length, 0),
    },
    cards,
  };
}

function toMarkdown(exportData) {
  const lines = [
    '# Kanban Export',
    '',
    `Generated: ${exportData.generatedAt}`,
    '',
    '## Totals',
    '',
    `- Columns: ${exportData.totals.columns}`,
    `- Cards: ${exportData.totals.cards}`,
    `- Checked: ${exportData.totals.checked}`,
    `- Unchecked: ${exportData.totals.unchecked}`,
    `- Subtasks: ${exportData.totals.subtasks}`,
    '',
  ];

  for (const column of exportData.columns) {
    lines.push(`## ${column.name}`, '', `Cards: ${column.cardCount}`, '');
    for (const card of exportData.cards.filter(item => item.column === column.name)) {
      lines.push(`- [${card.checked ? 'x' : ' '}] ${card.title || '[blank card]'} (line ${card.line})`);
      for (const subtask of card.subtasks) {
        lines.push(`  - [${subtask.checked ? 'x' : ' '}] ${subtask.title} (line ${subtask.line})`);
      }
    }
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(helpText());
    return;
  }

  const markdown = await readFile(kanbanPath, 'utf8');
  const exportData = parseKanban(markdown);
  const output = args.markdown ? toMarkdown(exportData) : `${JSON.stringify(exportData, null, 2)}\n`;

  if (args.write) {
    await mkdir(dirname(args.output), { recursive: true });
    await writeFile(args.output, output, 'utf8');
    process.stdout.write(`Wrote ${args.output}\n`);
    return;
  }

  process.stdout.write(output);
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
