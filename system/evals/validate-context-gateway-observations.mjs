#!/usr/bin/env node
/**
 * Ledger validator for Context Gateway operational observations.
 *
 * Fails closed: any missing file, wrong value, or structural mismatch causes
 * a nonzero exit. Emits deterministic JSON to stdout.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VAULT_ROOT = resolve(__dirname, '..', '..');

function observationPath(id) {
  const padded = String(id).padStart(3, '0');
  return resolve(
    __dirname,
    `context-gateway-operational-observation-${padded}.md`,
  );
}

function readObs(id) {
  const p = observationPath(id);
  if (!existsSync(p)) return null;
  return readFileSync(p, 'utf8');
}

/** Extract a value from a metadata line like `- **key**: value` */
function extractMeta(text, key) {
  const re = new RegExp(`\\*\\*${key}\\*\\*[:\\s]+(.+?)(?:\\n|$)`, 'i');
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

/** True if the text contains an embedded Git SHA-like blob that looks like it
 *  is self-referencing its own containing commit (40-char hex following certain
 *  patterns that indicate "this file's own commit SHA"). */
function detectSelfHash(text, obsId) {
  // We look for 40-hex strings that are explicitly presented as
  // "the SHA of this commit" or "final HEAD after this commit" or similar
  // self-referential phrases immediately adjacent to a 40-char hex.
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

/** The canonical ledger definition. */
const CANONICAL = [
  {
    id: 1,
    date: '2026-08-04',
    classification: 'fixture-only',
    counts: false,
    incidentType: null,
  },
  {
    id: 2,
    date: '2026-08-04',
    classification: 'qualifying-live',
    counts: true,
    incidentType: 'retrieval-authority',
  },
  {
    id: 3,
    date: '2026-08-05',
    classification: 'qualifying-live',
    counts: true,
    incidentType: 'retrieval-relevance',
  },
  {
    id: 4,
    date: '2026-08-06',
    classification: 'qualifying-live',
    counts: true,
    incidentType: 'none',
  },
];

const EXPECTED_COMPLETED = 3;
const EXPECTED_TARGET = 10;
const EXPECTED_REMAINING = 7;
const EXPECTED_NEXT = '005';
const OBS_004_PROVIDER_REVISION = '076b9f97030e1c90bc66ffbb61d29456b41ed69f';
const CTX_CON_006_FORBIDDEN = 'system/templates/area.md';

const results = [];
let passed = true;

function fail(check, detail) {
  passed = false;
  results.push({ check, status: 'FAIL', detail });
}

function pass(check, detail) {
  results.push({ check, status: 'PASS', detail: detail || '' });
}

// ── 1. Files exist sequentially ──────────────────────────────────────────────
for (const entry of CANONICAL) {
  const text = readObs(entry.id);
  if (text === null) {
    fail(`obs-${entry.id}-exists`, `File not found: ${observationPath(entry.id)}`);
  } else {
    pass(`obs-${entry.id}-exists`, observationPath(entry.id));
  }
}

// ── 2. IDs match filenames ────────────────────────────────────────────────────
// Observations use varied formats: "Observation 002", "observation-002", "observation_id: 004"
// We accept any of these as evidence that the file self-identifies its ID.
for (const entry of CANONICAL) {
  const text = readObs(entry.id);
  if (!text) continue;
  const padded = String(entry.id).padStart(3, '0');
  // Accept: "Observation 002", "observation-002", "observation_id: 4", "observation_id**: 004"
  const patterns = [
    new RegExp(`[Oo]bservation[\\s\\-_]+0*${entry.id}\\b`),
    new RegExp(`observation[_\\-]id[^\\n]*:\\s*0*${entry.id}\\b`, 'i'),
    new RegExp(`observation-${padded}`, 'i'),
  ];
  const found = patterns.some((re) => re.test(text));
  if (!found) {
    fail(
      `obs-${entry.id}-id-matches-filename`,
      `File does not self-identify as observation ${entry.id} (tried patterns: Observation ${entry.id}, observation-${padded}, observation_id: ${entry.id})`,
    );
  } else {
    pass(`obs-${entry.id}-id-matches-filename`);
  }
}

// ── 3. Dates match canonical history ─────────────────────────────────────────
const OBS_DATES = {
  1: /2026-08-04/,
  2: /2026-08-04/,
  3: /2026-08-05/,
  4: /2026-08-06/,
};
for (const entry of CANONICAL) {
  const text = readObs(entry.id);
  if (!text) continue;
  if (!OBS_DATES[entry.id].test(text)) {
    fail(
      `obs-${entry.id}-date`,
      `Expected date pattern ${OBS_DATES[entry.id]} not found`,
    );
  } else {
    pass(`obs-${entry.id}-date`);
  }
}

// ── 4. Observation 001 is non-counting (fixture-only) ─────────────────────────
const obs1 = readObs(1);
if (obs1) {
  const isFixture =
    obs1.includes('fixture-only') || obs1.includes('fixtureOnly') || obs1.includes('fixture only');
  if (!isFixture) {
    fail('obs-001-fixture-only', 'Observation 001 must be marked fixture-only');
  } else {
    pass('obs-001-fixture-only');
  }
  // It must NOT claim to be a qualifying live session
  if (/qualifying.{0,30}live/i.test(obs1) && !/non-counting|does not count|fixture-only/i.test(obs1)) {
    fail(
      'obs-001-not-counting',
      'Observation 001 must not claim to be a qualifying live session',
    );
  } else {
    pass('obs-001-not-counting');
  }
}

// ── 5. Observations 002–004 are qualifying ─────────────────────────────────
for (const id of [2, 3, 4]) {
  const text = readObs(id);
  if (!text) continue;
  if (!/qualifying/i.test(text)) {
    fail(`obs-${id}-qualifying`, `Observation ${id} must be marked qualifying`);
  } else {
    pass(`obs-${id}-qualifying`);
  }
}

// ── 6. Incident types match ───────────────────────────────────────────────────
const INCIDENT_PATTERNS = {
  2: /retrieval.{0,10}authority/i,
  3: /retrieval.{0,10}relevance/i,
  4: /none|clean|no incident/i,
};
for (const [id, pattern] of Object.entries(INCIDENT_PATTERNS)) {
  const text = readObs(Number(id));
  if (!text) continue;
  if (!pattern.test(text)) {
    fail(
      `obs-${id}-incident-type`,
      `Expected incident-type pattern ${pattern} not found in observation ${id}`,
    );
  } else {
    pass(`obs-${id}-incident-type`);
  }
}

// ── 7. Observation 004 is clean ───────────────────────────────────────────────
const obs4 = readObs(4);
if (obs4) {
  if (
    /incident_type.*?:/i.test(obs4) &&
    !/incident_type.*?:\s*none/i.test(obs4) &&
    !/no incidents/i.test(obs4)
  ) {
    fail('obs-004-clean', 'Observation 004 incident_type must be none');
  } else {
    pass('obs-004-clean');
  }
}

// ── 8. Ledger accounting: completed=3, target=10, remaining=7, next=005 ──────
if (obs4) {
  if (!/3\s*of\s*10/i.test(obs4)) {
    fail('obs-004-accounting-completed', 'Observation 004 must state "3 of 10"');
  } else {
    pass('obs-004-accounting-completed');
  }
  if (!/remaining.*?7|7.*?remaining/i.test(obs4)) {
    fail('obs-004-accounting-remaining', 'Observation 004 must state remaining = 7');
  } else {
    pass('obs-004-accounting-remaining');
  }
  if (!/005/i.test(obs4)) {
    fail('obs-004-accounting-next', 'Observation 004 must reference next observation 005');
  } else {
    pass('obs-004-accounting-next');
  }
}

// ── 9. No observation embeds a self-SHA for its containing commit ────────────
for (const entry of CANONICAL) {
  const text = readObs(entry.id);
  if (!text) continue;
  if (detectSelfHash(text, entry.id)) {
    fail(
      `obs-${entry.id}-no-self-hash`,
      `Observation ${entry.id} appears to embed its own containing commit SHA`,
    );
  } else {
    pass(`obs-${entry.id}-no-self-hash`);
  }
}

// ── 10. Observation 004 references provider revision 076b9f97… ───────────────
if (obs4) {
  if (!obs4.includes(OBS_004_PROVIDER_REVISION)) {
    fail(
      'obs-004-provider-revision',
      `Observation 004 must reference provider revision ${OBS_004_PROVIDER_REVISION}`,
    );
  } else {
    pass('obs-004-provider-revision');
  }
}

// ── 11. CTX-CON-006 forbids system/templates/area.md ─────────────────────────
// Check in context-expectations.yaml
const expectationsPath = resolve(__dirname, 'context-expectations.yaml');
if (existsSync(expectationsPath)) {
  const yamlText = readFileSync(expectationsPath, 'utf8');
  // Locate the CTX-CON-006 section
  const con006Idx = yamlText.indexOf('question_id: CTX-CON-006');
  if (con006Idx === -1) {
    fail(
      'ctx-con-006-forbidden-source',
      'CTX-CON-006 entry not found in context-expectations.yaml',
    );
  } else {
    // Find the next question_id after CTX-CON-006 to bound the section
    const nextQIdx = yamlText.indexOf('question_id:', con006Idx + 1);
    const section =
      nextQIdx === -1
        ? yamlText.slice(con006Idx)
        : yamlText.slice(con006Idx, nextQIdx);
    if (!section.includes(CTX_CON_006_FORBIDDEN)) {
      fail(
        'ctx-con-006-forbidden-source',
        `CTX-CON-006 expectations must list "${CTX_CON_006_FORBIDDEN}" as a forbidden source`,
      );
    } else {
      pass('ctx-con-006-forbidden-source', `"${CTX_CON_006_FORBIDDEN}" listed as forbidden`);
    }
  }
} else {
  fail('ctx-con-006-forbidden-source', 'context-expectations.yaml not found');
}

// ── Output ────────────────────────────────────────────────────────────────────
const output = {
  validator: 'validate-context-gateway-observations',
  version: '1.0',
  passed,
  checks: results.length,
  failCount: results.filter((r) => r.status === 'FAIL').length,
  passCount: results.filter((r) => r.status === 'PASS').length,
  results,
};

process.stdout.write(JSON.stringify(output, null, 2) + '\n');
process.exit(passed ? 0 : 1);
