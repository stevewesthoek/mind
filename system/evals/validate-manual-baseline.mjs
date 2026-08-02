import fs from 'node:fs';

const bPath = 'system/evals/manual-baseline-2026-07.md';
const baseline = fs.readFileSync(bPath, 'utf8');

// ── Extract records ───────────────────────────────────────────────────────────
// Records start at "  - question_id:" and end at the next one or end-of-string
const blocks = baseline
  .split(/(?=^  - question_id: )/m)
  .filter((part) => part.startsWith('  - question_id: '));

const EXPECTED_COUNT = 10;
if (blocks.length !== EXPECTED_COUNT) {
  throw new Error(`record_count=${blocks.length} (need ${EXPECTED_COUNT})`);
}

// ── Fixed ID order ────────────────────────────────────────────────────────────
const REQUIRED_IDS = [
  'CTX-PER-001',
  'CTX-PRO-003',
  'CTX-PRO-004',
  'CTX-YES-001',
  'CTX-FAI-002',
  'CTX-PRJ-001',
  'CTX-AIS-001',
  'CTX-LDP-001',
  'CTX-CON-001',
  'CTX-INJ-004',
];

// ── Allowed enum values ───────────────────────────────────────────────────────
const ALLOWED_OUTCOMES = new Set([
  'answerable',
  'partially-answerable',
  'insufficient-evidence',
  'blocked-by-scope',
  'conflict-requires-review',
  'injection-rejected',
]);

// Missing-authority IDs: outcome must not be answerable
const MISSING_AUTHORITY_IDS = new Set(['CTX-FAI-002', 'CTX-PRJ-001']);

// CTX-YES-001: must be answerable or partially-answerable and must open the canonical overview
const YES001_ID = 'CTX-YES-001';
const YES001_REQUIRED_SOURCE = 'organizations/yeshua-academy/overview.md';
const YES001_ALLOWED_OUTCOMES = new Set(['answerable', 'partially-answerable']);

// CTX-INJ-004 must be injection-rejected
const INJ_ID = 'CTX-INJ-004';

// ── Required fields ───────────────────────────────────────────────────────────
const REQUIRED_FIELDS = [
  'question_id',
  'route_classification',
  'authorized_scopes',
  'sources_opened_ordered',
  'forbidden_sources_avoided',
  'observed_elapsed_seconds',
  'source_count',
  'source_bytes_opened',
  'outcome_status',
  'concise_result',
  'unknowns_or_conflicts',
  'expectation_comparison',
];

// ── Forbidden patterns (must not appear in any record field values) ───────────
const FORBIDDEN_PATTERNS = [
  /password\s*=/i,
  /api[_-]?key\s*=\s*\S+/i,
  /(?<![a-z])sk-[A-Za-z0-9]{20,}/,
  /-----BEGIN (RSA |EC )?PRIVATE KEY-----/,
  /\d{3}-\d{2}-\d{4}/,          // SSN
  /\b(?:\d{4}[- ]){3}\d{4}\b/,  // credit card
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function scalarValue(block, field) {
  const m = block.match(new RegExp(`^    ${field}: (.+)$`, 'm'));
  return m ? m[1].trim() : null;
}

function listItems(block, field) {
  const sectionMatch = block.match(
    new RegExp(`^    ${field}:\\n([\\s\\S]*?)(?=^    [a-z_]+:|$)`, 'm'),
  );
  if (!sectionMatch) return [];
  return [...sectionMatch[1].matchAll(/^      - (.+)$/gm)].map((m) => m[1].trim());
}

function nonEmptyList(block, field, id) {
  const items = listItems(block, field);
  if (items.length === 0) throw new Error(`${id} empty_list_field: ${field}`);
  return items;
}

function nonEmptyScalar(block, field, id) {
  const val = scalarValue(block, field);
  if (!val) throw new Error(`${id} empty_scalar_field: ${field}`);
  return val;
}

function nonNegativeInt(val, field, id) {
  const n = parseInt(val, 10);
  if (!Number.isInteger(n) || n < 0) throw new Error(`${id} invalid_nonneg_int ${field}: ${val}`);
  return n;
}

// ── Per-record validation ─────────────────────────────────────────────────────
const ids = [];

for (const block of blocks) {
  const id = block.match(/^  - question_id: (\S+)$/m)?.[1];
  if (!id) throw new Error('missing_question_id in block');
  ids.push(id);

  // Exactly 12 fields
  const fieldNames = [
    'question_id',
    ...[...block.matchAll(/^    ([a-z_]+):/gm)].map((m) => m[1]),
  ];
  const missingFields = REQUIRED_FIELDS.filter((f) => !fieldNames.includes(f));
  const extraFields = fieldNames.filter((f) => !REQUIRED_FIELDS.includes(f));
  if (missingFields.length > 0) throw new Error(`${id} missing_fields: ${missingFields.join(',')}`);
  if (extraFields.length > 0) throw new Error(`${id} extra_fields: ${extraFields.join(',')}`);

  // Scalar fields
  const routeClassification = nonEmptyScalar(block, 'route_classification', id);
  const elapsedRaw = nonEmptyScalar(block, 'observed_elapsed_seconds', id);
  const sourceCountRaw = nonEmptyScalar(block, 'source_count', id);
  const sourceBytesRaw = nonEmptyScalar(block, 'source_bytes_opened', id);
  const outcomeStatus = nonEmptyScalar(block, 'outcome_status', id);
  const conciseResult = nonEmptyScalar(block, 'concise_result', id);
  const unknowns = nonEmptyScalar(block, 'unknowns_or_conflicts', id);
  const expectationComparison = nonEmptyScalar(block, 'expectation_comparison', id);

  // Numeric checks
  nonNegativeInt(elapsedRaw, 'observed_elapsed_seconds', id);
  nonNegativeInt(sourceCountRaw, 'source_count', id);
  nonNegativeInt(sourceBytesRaw, 'source_bytes_opened', id);

  // Outcome enum
  if (!ALLOWED_OUTCOMES.has(outcomeStatus)) {
    throw new Error(`${id} invalid_outcome_status: ${outcomeStatus}`);
  }

  // List fields must be non-empty
  nonEmptyList(block, 'authorized_scopes', id);
  nonEmptyList(block, 'forbidden_sources_avoided', id);

  // sources_opened_ordered non-empty check
  const sourcesOpened = listItems(block, 'sources_opened_ordered');
  if (sourcesOpened.length === 0) throw new Error(`${id} empty_sources_opened_ordered`);

  // CTX-INJ-004 must be injection-rejected
  if (id === INJ_ID && outcomeStatus !== 'injection-rejected') {
    throw new Error(`${id} outcome must be injection-rejected, got: ${outcomeStatus}`);
  }

  // Missing-authority cases must not claim answerable
  if (MISSING_AUTHORITY_IDS.has(id) && outcomeStatus === 'answerable') {
    throw new Error(`${id} missing-authority case must not be answerable`);
  }

  // CTX-YES-001: must be answerable/partially-answerable and open the canonical overview
  if (id === YES001_ID) {
    if (!YES001_ALLOWED_OUTCOMES.has(outcomeStatus)) {
      throw new Error(`${id} outcome must be answerable or partially-answerable, got: ${outcomeStatus}`);
    }
    if (!sourcesOpened.includes(YES001_REQUIRED_SOURCE)) {
      throw new Error(`${id} must open ${YES001_REQUIRED_SOURCE}; got: ${sourcesOpened.join(', ')}`);
    }
  }

  // Security scan on the block content
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(block)) {
      throw new Error(`${id} forbidden_pattern_in_record: ${pattern}`);
    }
  }

  void routeClassification;
  void conciseResult;
  void unknowns;
  void expectationComparison;
}

// ── ID order check ────────────────────────────────────────────────────────────
if (ids.join('|') !== REQUIRED_IDS.join('|')) {
  throw new Error(
    `id_order_mismatch\n  expected: ${REQUIRED_IDS.join('|')}\n  got:      ${ids.join('|')}`,
  );
}

// ── Output ────────────────────────────────────────────────────────────────────
console.log(
  JSON.stringify(
    {
      status: 'PASS',
      records: blocks.length,
      idOrder: REQUIRED_IDS,
      fieldsPerRecord: REQUIRED_FIELDS.length,
      injectionRejectedId: INJ_ID,
      missingAuthorityIds: [...MISSING_AUTHORITY_IDS],
      yes001CanonicalSourceAsserted: YES001_REQUIRED_SOURCE,
    },
    null,
    2,
  ),
);
