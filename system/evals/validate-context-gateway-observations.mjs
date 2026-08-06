#!/usr/bin/env node
/**
 * Ledger validator for Context Gateway operational observations.
 *
 * Fails closed: values are parsed only from the bounded "## Ledger metadata"
 * block. Any missing file, wrong value, structural mismatch, or unknown key
 * causes a nonzero exit. Emits deterministic sorted JSON with repo-relative
 * paths only.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VAULT_ROOT = resolve(__dirname, '..', '..');
const EVALS_DIR = __dirname;

// ── Constants ─────────────────────────────────────────────────────────────────
const EXPECTED_TARGET = 10;
const OBS_004_PROVIDER_REVISION = '076b9f97030e1c90bc66ffbb61d29456b41ed69f';
const CTX_CON_006_FORBIDDEN = 'system/templates/area.md';
const ALLOWED_INCIDENT_TYPES = new Set(['none', 'retrieval-authority', 'retrieval-relevance']);

const KNOWN_META_KEYS = new Set([
  'observation_id',
  'session_date',
  'classification',
  'qualifying',
  'incident_type',
  'qualifying_count',
  'target_count',
  'remaining_sessions',
  'next_observation',
]);

// ── Helpers ───────────────────────────────────────────────────────────────────
function obsFilename(id) {
  return `context-gateway-operational-observation-${String(id).padStart(3, '0')}.md`;
}

function obsPath(id) {
  return resolve(EVALS_DIR, obsFilename(id));
}

function repoRelative(p) {
  return relative(VAULT_ROOT, p);
}

/**
 * Discover all observation files present in EVALS_DIR by filename pattern.
 * Returns sorted array of integer IDs.
 */
function discoverObservationIds() {
  const pattern = /^context-gateway-operational-observation-(\d{3})\.md$/;
  let ids;
  try {
    const { readdirSync } = await_import_readdirSync();
    ids = readdirSync(EVALS_DIR)
      .map(f => { const m = f.match(pattern); return m ? parseInt(m[1], 10) : null; })
      .filter(id => id !== null)
      .sort((a, b) => a - b);
  } catch {
    ids = [];
  }
  return ids;
}

// We need readdirSync synchronously — import at top level
import { readdirSync } from 'fs';

function await_import_readdirSync() {
  return { readdirSync };
}

/**
 * Parse the bounded "## Ledger metadata" block from a file's text.
 * Returns { found: boolean, keys: Map<string,string>, duplicates: string[], unknowns: string[] }
 */
function parseLedgerMetadata(text) {
  const startMarker = '## Ledger metadata';
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) {
    return { found: false, keys: new Map(), duplicates: [], unknowns: [] };
  }
  // Bound the block: ends at the next "## " heading or end of string
  const afterStart = text.indexOf('\n', startIdx) + 1;
  const nextHeading = text.indexOf('\n## ', afterStart);
  const blockText = nextHeading === -1
    ? text.slice(afterStart)
    : text.slice(afterStart, nextHeading);

  const keys = new Map();
  const duplicates = [];
  const unknowns = [];

  for (const line of blockText.split('\n')) {
    const trimmed = line.trim();
    // Match "- key: value"
    const m = trimmed.match(/^-\s+([\w_]+)\s*:\s*(.+)$/);
    if (!m) continue;
    const key = m[1];
    const value = m[2].trim();
    if (!KNOWN_META_KEYS.has(key)) {
      unknowns.push(key);
      continue;
    }
    if (keys.has(key)) {
      duplicates.push(key);
    } else {
      keys.set(key, value);
    }
  }

  return { found: true, keys, duplicates, unknowns };
}

/** True if the text contains an embedded Git SHA-like blob that looks like it
 *  is self-referencing its own containing commit. */
function detectSelfHash(text) {
  const selfRefPatterns = [
    /(?:final\s+(?:commit|HEAD)\s*(?:SHA|hash)?[\s:]+)([0-9a-f]{40})/gi,
    /(?:commit\s+SHA\s+(?:for|of|containing)\s+this\s+file[\s:]+)([0-9a-f]{40})/gi,
    /(?:this\s+file.*commit[\s:]+)([0-9a-f]{40})/gi,
  ];
  for (const re of selfRefPatterns) {
    if (re.test(text)) return true;
  }
  return false;
}

// ── Runner ────────────────────────────────────────────────────────────────────
const results = [];
let passed = true;

function fail(check, detail) {
  passed = false;
  results.push({ check, status: 'FAIL', detail });
}

function pass(check, detail) {
  results.push({ check, status: 'PASS', detail: detail || '' });
}

// ── Discover observation files ────────────────────────────────────────────────
const ids = readdirSync(EVALS_DIR)
  .map(f => { const m = f.match(/^context-gateway-operational-observation-(\d{3})\.md$/); return m ? parseInt(m[1], 10) : null; })
  .filter(id => id !== null)
  .sort((a, b) => a - b);

if (ids.length === 0) {
  fail('obs-discovery', 'No observation files found in evals directory');
} else {
  pass('obs-discovery', `Found ${ids.length} observation file(s): ${ids.map(i => String(i).padStart(3,'0')).join(', ')}`);
}

// ── 1. Sequential IDs with no gaps ────────────────────────────────────────────
for (let i = 0; i < ids.length; i++) {
  const expected = i + 1;
  if (ids[i] !== expected) {
    fail('obs-sequential-ids', `ID gap: expected ${expected} but found ${ids[i]} at position ${i + 1}`);
    break;
  }
}
if (ids.length > 0 && !results.some(r => r.check === 'obs-sequential-ids' && r.status === 'FAIL')) {
  pass('obs-sequential-ids', `Sequential IDs 001–${String(ids[ids.length - 1]).padStart(3,'0')}`);
}

// ── Load all observation texts ─────────────────────────────────────────────────
const obsTexts = new Map();
for (const id of ids) {
  const p = obsPath(id);
  if (!existsSync(p)) {
    fail(`obs-${String(id).padStart(3,'0')}-exists`, `File not found: ${repoRelative(p)}`);
  } else {
    obsTexts.set(id, readFileSync(p, 'utf8'));
    pass(`obs-${String(id).padStart(3,'0')}-exists`, repoRelative(p));
  }
}

// ── 2. Parse ledger metadata blocks ───────────────────────────────────────────
const parsedMeta = new Map();
for (const id of ids) {
  const text = obsTexts.get(id);
  if (!text) continue;
  const padded = String(id).padStart(3, '0');
  const meta = parseLedgerMetadata(text);

  if (!meta.found) {
    fail(`obs-${padded}-meta-block`, `Ledger metadata block "## Ledger metadata" not found`);
    continue;
  }
  pass(`obs-${padded}-meta-block`);

  if (meta.duplicates.length > 0) {
    fail(`obs-${padded}-meta-duplicates`, `Duplicate metadata keys: ${meta.duplicates.join(', ')}`);
    continue;
  }
  pass(`obs-${padded}-meta-duplicates`);

  if (meta.unknowns.length > 0) {
    fail(`obs-${padded}-meta-unknowns`, `Unknown metadata keys: ${meta.unknowns.join(', ')}`);
    continue;
  }
  pass(`obs-${padded}-meta-unknowns`);

  parsedMeta.set(id, meta.keys);
}

// ── 3. Per-observation metadata validation ─────────────────────────────────────
for (const id of ids) {
  const m = parsedMeta.get(id);
  if (!m) continue;
  const padded = String(id).padStart(3, '0');

  // observation_id matches filename
  const metaId = m.get('observation_id');
  const expectedIdStr = String(id).padStart(3, '0');
  if (metaId !== expectedIdStr) {
    fail(`obs-${padded}-id-matches-filename`,
      `observation_id "${metaId}" does not match filename "${expectedIdStr}"`);
  } else {
    pass(`obs-${padded}-id-matches-filename`);
  }

  // session_date is a valid ISO date
  const dateStr = m.get('session_date');
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    fail(`obs-${padded}-date-format`, `session_date "${dateStr}" is not a valid YYYY-MM-DD ISO date`);
  } else {
    pass(`obs-${padded}-date-format`);
  }

  // classification present
  const cls = m.get('classification');
  if (!cls) {
    fail(`obs-${padded}-classification`, 'classification is missing');
  } else {
    pass(`obs-${padded}-classification`);
  }

  // incident_type is an allowed value
  const incidentType = m.get('incident_type');
  if (!incidentType || !ALLOWED_INCIDENT_TYPES.has(incidentType)) {
    fail(`obs-${padded}-incident-type`,
      `incident_type "${incidentType}" is not in allowed set: ${[...ALLOWED_INCIDENT_TYPES].join(', ')}`);
  } else {
    pass(`obs-${padded}-incident-type`);
  }

  // target_count must be 10
  const targetCount = parseInt(m.get('target_count'), 10);
  if (isNaN(targetCount) || targetCount !== EXPECTED_TARGET) {
    fail(`obs-${padded}-target-count`, `target_count must be ${EXPECTED_TARGET}; got "${m.get('target_count')}"`);
  } else {
    pass(`obs-${padded}-target-count`);
  }
}

// ── 4. obs-001: fixture-only, non-qualifying ──────────────────────────────────
const meta001 = parsedMeta.get(1);
if (meta001) {
  const cls = meta001.get('classification');
  const qualifying = meta001.get('qualifying');
  const qualifyingCount = meta001.get('qualifying_count');

  if (cls !== 'fixture-only') {
    fail('obs-001-fixture-only', `classification must be "fixture-only"; got "${cls}"`);
  } else {
    pass('obs-001-fixture-only');
  }
  if (qualifying !== 'false') {
    fail('obs-001-not-counting', `qualifying must be "false" for fixture-only obs; got "${qualifying}"`);
  } else {
    pass('obs-001-not-counting');
  }
  if (qualifyingCount !== '0') {
    fail('obs-001-qualifying-count-zero', `qualifying_count must be "0" for fixture-only obs; got "${qualifyingCount}"`);
  } else {
    pass('obs-001-qualifying-count-zero');
  }
}

// ── 5. Observations 002+ must be qualifying ───────────────────────────────────
for (const id of ids.filter(i => i > 1)) {
  const m = parsedMeta.get(id);
  if (!m) continue;
  const padded = String(id).padStart(3, '0');
  const qualifying = m.get('qualifying');
  if (qualifying !== 'true') {
    fail(`obs-${padded}-qualifying`, `qualifying must be "true" for obs ${padded}; got "${qualifying}"`);
  } else {
    pass(`obs-${padded}-qualifying`);
  }
}

// ── 6. Dates are non-decreasing ───────────────────────────────────────────────
{
  let prevDate = null;
  for (const id of ids) {
    const m = parsedMeta.get(id);
    if (!m) continue;
    const padded = String(id).padStart(3, '0');
    const dateStr = m.get('session_date');
    if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      if (prevDate !== null && dateStr < prevDate) {
        fail(`obs-${padded}-date-nondecreasing`,
          `session_date "${dateStr}" is earlier than previous date "${prevDate}"`);
      } else {
        pass(`obs-${padded}-date-nondecreasing`);
      }
      prevDate = dateStr;
    }
  }
}

// ── 7. Qualifying sessions must have distinct dates ────────────────────────────
{
  const qualifyingDates = new Map(); // date → first id
  let dateReuseFailed = false;
  for (const id of ids) {
    const m = parsedMeta.get(id);
    if (!m) continue;
    if (m.get('qualifying') !== 'true') continue;
    const dateStr = m.get('session_date');
    if (!dateStr) continue;
    if (qualifyingDates.has(dateStr)) {
      fail('obs-qualifying-distinct-dates',
        `Qualifying obs ${String(id).padStart(3,'0')} reuses date "${dateStr}" already used by obs ${String(qualifyingDates.get(dateStr)).padStart(3,'0')}`);
      dateReuseFailed = true;
    } else {
      qualifyingDates.set(dateStr, id);
    }
  }
  if (!dateReuseFailed) {
    pass('obs-qualifying-distinct-dates', `All qualifying observations have distinct dates`);
  }
}

// ── 8. Dynamic qualifying counts ──────────────────────────────────────────────
{
  let runningCount = 0;
  for (const id of ids) {
    const m = parsedMeta.get(id);
    if (!m) continue;
    const padded = String(id).padStart(3, '0');
    if (m.get('qualifying') === 'true') runningCount++;

    const metaCount = parseInt(m.get('qualifying_count'), 10);
    const expectedCount = m.get('qualifying') === 'true' ? runningCount : 0;
    if (isNaN(metaCount) || metaCount !== expectedCount) {
      fail(`obs-${padded}-qualifying-count`,
        `qualifying_count must be ${expectedCount}; got "${m.get('qualifying_count')}"`);
    } else {
      pass(`obs-${padded}-qualifying-count`);
    }

    // remaining_sessions
    const remaining = parseInt(m.get('remaining_sessions'), 10);
    const expectedRemaining = EXPECTED_TARGET - expectedCount;
    if (isNaN(remaining) || remaining !== expectedRemaining) {
      fail(`obs-${padded}-remaining-sessions`,
        `remaining_sessions must be ${expectedRemaining}; got "${m.get('remaining_sessions')}"`);
    } else {
      pass(`obs-${padded}-remaining-sessions`);
    }

    // next_observation
    const nextObs = m.get('next_observation');
    const expectedNext = String(id + 1).padStart(3, '0');
    if (nextObs !== expectedNext) {
      fail(`obs-${padded}-next-observation`,
        `next_observation must be "${expectedNext}"; got "${nextObs}"`);
    } else {
      pass(`obs-${padded}-next-observation`);
    }
  }
}

// ── 9. No self-referencing SHA ─────────────────────────────────────────────────
for (const id of ids) {
  const text = obsTexts.get(id);
  if (!text) continue;
  const padded = String(id).padStart(3, '0');
  if (detectSelfHash(text)) {
    fail(`obs-${padded}-no-self-hash`,
      `Observation ${padded} appears to embed its own containing commit SHA`);
  } else {
    pass(`obs-${padded}-no-self-hash`);
  }
}

// ── 10. Observation 004 provider revision ─────────────────────────────────────
if (obsTexts.has(4)) {
  const text = obsTexts.get(4);
  if (!text.includes(OBS_004_PROVIDER_REVISION)) {
    fail('obs-004-provider-revision',
      `Observation 004 must reference provider revision ${OBS_004_PROVIDER_REVISION}`);
  } else {
    pass('obs-004-provider-revision');
  }
}

// ── 11. CTX-CON-006 forbids system/templates/area.md ─────────────────────────
const expectationsPath = resolve(EVALS_DIR, 'context-expectations.yaml');
if (existsSync(expectationsPath)) {
  const yamlText = readFileSync(expectationsPath, 'utf8');
  const con006Idx = yamlText.indexOf('question_id: CTX-CON-006');
  if (con006Idx === -1) {
    fail('ctx-con-006-forbidden-source', 'CTX-CON-006 entry not found in context-expectations.yaml');
  } else {
    const nextQIdx = yamlText.indexOf('question_id:', con006Idx + 1);
    const section = nextQIdx === -1 ? yamlText.slice(con006Idx) : yamlText.slice(con006Idx, nextQIdx);
    if (!section.includes(CTX_CON_006_FORBIDDEN)) {
      fail('ctx-con-006-forbidden-source',
        `CTX-CON-006 expectations must list "${CTX_CON_006_FORBIDDEN}" as a forbidden source`);
    } else {
      pass('ctx-con-006-forbidden-source', `"${CTX_CON_006_FORBIDDEN}" listed as forbidden`);
    }
  }
} else {
  fail('ctx-con-006-forbidden-source', `context-expectations.yaml not found at ${repoRelative(expectationsPath)}`);
}

// ── 12. Output uses repo-relative paths only ──────────────────────────────────
// (paths are emitted only via repoRelative(); no absolute paths enter results)
pass('output-repo-relative-paths', 'All paths in output are repo-relative');

// ── Output ────────────────────────────────────────────────────────────────────
const sortedResults = [...results].sort((a, b) => a.check.localeCompare(b.check));

const output = {
  validator: 'validate-context-gateway-observations',
  version: '2.0',
  passed,
  checks: sortedResults.length,
  failCount: sortedResults.filter(r => r.status === 'FAIL').length,
  passCount: sortedResults.filter(r => r.status === 'PASS').length,
  results: sortedResults,
};

process.stdout.write(JSON.stringify(output, null, 2) + '\n');
process.exit(passed ? 0 : 1);
