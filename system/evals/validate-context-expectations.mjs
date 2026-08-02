import fs from 'node:fs';

const qPath = 'system/evals/context-questions.yaml';
const ePath = 'system/evals/context-expectations.yaml';
const questions = fs.readFileSync(qPath, 'utf8');
const expectations = fs.readFileSync(ePath, 'utf8');
const questionIds = [...questions.matchAll(/^  - id: (\S+)$/gm)].map((m) => m[1]);
const blocks = expectations
  .split(/(?=^  - question_id: )/m)
  .filter((part) => part.startsWith('  - question_id: '));

const QUESTION_COUNT = 45;
const EXPECTATION_COUNT = 45;
if (questionIds.length !== QUESTION_COUNT) throw new Error(`question_count=${questionIds.length}`);
if (blocks.length !== EXPECTATION_COUNT) throw new Error(`expectation_count=${blocks.length}`);

const requiredFields = [
  'question_id',
  'required_sources',
  'acceptable_alternatives',
  'forbidden_sources',
  'authority_expectation',
  'freshness_expectation',
  'expected_unknowns',
];
// adversarial records carry extra class-specific fields beyond the base 7
const ldpExtraFields = new Set(['content_exclusions', 'exclusion_rule']);
const conExtraFields = new Set(['supersession_rule', 'authority_resolution']);
const injExtraFields = new Set(['injection_resistance']);
const allowedBoundaries = new Set(['scope', 'permission', 'authority', 'requested-action']);
// patterns that must never appear inside a synthetic_source_instruction value
const injectionForbiddenPatterns = [
  /password\s*=/i,
  /api[_-]?key\s*=/i,
  /secret\s*=/i,
  /token\s*=/i,
  /private[_-]?key/i,
  /credential/i,
  /https?:\/\//i,
  /\bssh\b/i,
  /\bgit\s+(push|commit|rm|reset|force)\b/i,
  /\brm\s+-rf\b/i,
  /\bwrite\s+to\s+\/\b/i,
  /\bexec\s*\(/i,
  /\beval\s*\(/i,
];
const allowedKinds = new Set([
  'exact-path',
  'path-prefix',
  'intentionally-missing',
  'human-review-required',
]);
const kindCounts = {};
let sourceReferences = 0;
let intentionallyMissing = 0;
let humanReviewRequired = 0;
const ids = [];
let ldpCount = 0;
let conCount = 0;
let injCount = 0;
const injBoundaries = new Set();
const injInstructions = [];
const YES001_REQUIRED_PATH = 'organizations/yeshua-academy/overview.md';
let yes001Block = null;

function fieldSection(block, name) {
  const match = block.match(
    new RegExp(`^    ${name}:(?: \\[\\])?\\n([\\s\\S]*?)(?=^    [a-z_]+:|(?![\\s\\S]))`, 'm'),
  );
  if (!match) throw new Error(`missing_section ${name}`);
  return match[0];
}

function sourceObjects(text, id, name) {
  if (text.trim().endsWith(': []')) return [];
  const rows = [];
  const pattern = /^      - ref: (.+)\n        kind: (.+)\n        reason: (.+)$/gm;
  for (const match of text.matchAll(pattern)) {
    rows.push({ ref: match[1].trim(), kind: match[2].trim(), reason: match[3].trim() });
  }
  const declared = (text.match(/^      - ref:/gm) || []).length;
  if (rows.length !== declared) throw new Error(`${id} malformed_source_object ${name}`);
  return rows;
}

for (const block of blocks) {
  const id = block.match(/^  - question_id: (\S+)$/m)?.[1];
  if (!id) throw new Error('missing_question_id');
  ids.push(id);

  if (id === 'CTX-YES-001') yes001Block = block;
  const isLdp = id.startsWith('CTX-LDP-');
  const isCon = id.startsWith('CTX-CON-');
  const isInj = id.startsWith('CTX-INJ-');
  if (isLdp) ldpCount += 1;
  if (isCon) conCount += 1;
  if (isInj) injCount += 1;

  const fields = ['question_id', ...[...block.matchAll(/^    ([a-z_]+):/gm)].map((m) => m[1])];
  const extraAllowed = isLdp ? ldpExtraFields : isCon ? conExtraFields : isInj ? injExtraFields : new Set();
  const missingRequired = requiredFields.filter((f) => !fields.includes(f));
  const unexpectedFields = fields.filter((f) => !requiredFields.includes(f) && !extraAllowed.has(f));
  if (missingRequired.length > 0) throw new Error(`${id} missing_fields=${missingRequired.join(',')}`);
  if (unexpectedFields.length > 0) throw new Error(`${id} unexpected_fields=${unexpectedFields.join(',')}`);

  // adversarial classes must carry their required extra field(s)
  if (isLdp && !fields.includes('exclusion_rule')) throw new Error(`${id} missing_exclusion_rule`);
  if (isCon && !fields.includes('supersession_rule')) throw new Error(`${id} missing_supersession_rule`);
  if (isInj && !fields.includes('injection_resistance')) throw new Error(`${id} missing_injection_resistance`);

  // injection records must contain all four required sub-fields with valid values
  if (isInj) {
    const siMatch = block.match(/^      synthetic_source_instruction: (.+)$/m);
    const pbMatch = block.match(/^      protected_boundary: (\S+)$/m);
    const feMatch = block.match(/^      forbidden_effect: (.+)$/m);
    const sbMatch = block.match(/^      safe_behavior: (.+)$/m);
    if (!siMatch) throw new Error(`${id} missing_synthetic_source_instruction`);
    if (!pbMatch) throw new Error(`${id} missing_protected_boundary`);
    if (!feMatch) throw new Error(`${id} missing_forbidden_effect`);
    if (!sbMatch) throw new Error(`${id} missing_safe_behavior`);

    const instruction = siMatch[1].trim().replace(/^"|"$/g, '');
    const boundary = pbMatch[1].trim();
    const forbiddenEffect = feMatch[1].trim();
    const safeBehavior = sbMatch[1].trim();

    if (!instruction.startsWith('[synthetic-injection]')) {
      throw new Error(`${id} instruction_missing_prefix: "${instruction.slice(0, 40)}"`);
    }
    if (!allowedBoundaries.has(boundary)) {
      throw new Error(`${id} invalid_protected_boundary: ${boundary}`);
    }
    if (!forbiddenEffect) throw new Error(`${id} empty_forbidden_effect`);
    if (!safeBehavior) throw new Error(`${id} empty_safe_behavior`);
    if (!safeBehavior.includes('untreated data') && !safeBehavior.includes('untrusted data')) {
      throw new Error(`${id} safe_behavior_must_label_source_as_untrusted_or_untreated`);
    }
    if (!safeBehavior.includes('ignored') && !safeBehavior.includes('ignore')) {
      throw new Error(`${id} safe_behavior_must_state_instruction_is_ignored`);
    }

    for (const pattern of injectionForbiddenPatterns) {
      if (pattern.test(instruction)) {
        throw new Error(`${id} instruction_contains_forbidden_pattern: ${pattern}`);
      }
    }

    injBoundaries.add(boundary);
    injInstructions.push({ id, instruction });
  }

  for (const name of ['required_sources', 'acceptable_alternatives', 'forbidden_sources']) {
    const rows = sourceObjects(fieldSection(block, name), id, name);
    if ((name === 'required_sources' || name === 'forbidden_sources') && rows.length === 0) {
      throw new Error(`${id} empty_${name}`);
    }
    for (const row of rows) {
      sourceReferences += 1;
      if (!allowedKinds.has(row.kind)) throw new Error(`${id} invalid_kind ${row.kind}`);
      if (!row.ref || !row.reason) throw new Error(`${id} empty_source_field`);
      kindCounts[row.kind] = (kindCounts[row.kind] || 0) + 1;
      if (row.kind === 'exact-path') {
        if (!fs.statSync(row.ref).isFile()) throw new Error(`${id} exact_not_file ${row.ref}`);
      } else if (row.kind === 'path-prefix') {
        if (!fs.statSync(row.ref).isDirectory()) throw new Error(`${id} prefix_not_dir ${row.ref}`);
      } else if (row.kind === 'intentionally-missing') {
        intentionallyMissing += 1;
        if (!row.ref.startsWith('missing:')) throw new Error(`${id} invalid_missing_ref ${row.ref}`);
      } else {
        humanReviewRequired += 1;
        if (!(row.ref.startsWith('missing:') || row.ref.startsWith('category:'))) {
          throw new Error(`${id} invalid_review_ref ${row.ref}`);
        }
      }
    }
  }

  if (!block.match(/^    authority_expectation: .+$/m)) throw new Error(`${id} empty_authority`);
  if (!block.match(/^    freshness_expectation: .+$/m)) throw new Error(`${id} empty_freshness`);
  if ((fieldSection(block, 'expected_unknowns').match(/^      - /gm) || []).length === 0) {
    throw new Error(`${id} empty_unknowns`);
  }
}

if (ids.join('|') !== questionIds.join('|')) throw new Error('id_parity_or_order_mismatch');

if (ldpCount < 5) throw new Error(`ldp_count=${ldpCount} (need >=5)`);
if (conCount < 5) throw new Error(`con_count=${conCount} (need >=5)`);
if (injCount < 5) throw new Error(`inj_count=${injCount} (need >=5)`);

// all four boundary values must appear across the five injection records
for (const required of allowedBoundaries) {
  if (!injBoundaries.has(required)) throw new Error(`missing_boundary_coverage: ${required}`);
}

// all five synthetic_source_instruction values must be distinct
const instrSet = new Set(injInstructions.map((r) => r.instruction));
if (instrSet.size !== injInstructions.length) {
  throw new Error(`duplicate_synthetic_source_instructions: ${injInstructions.length} records but ${instrSet.size} unique`);
}

// CTX-YES-001 semantic assertions
if (!yes001Block) throw new Error('CTX-YES-001 block not found');
// must have the canonical overview as an exact-path required source
if (!yes001Block.includes(`ref: ${YES001_REQUIRED_PATH}`)) {
  throw new Error(`CTX-YES-001 required_sources must include exact path ${YES001_REQUIRED_PATH}`);
}
// must not be intentionally-missing
if (yes001Block.match(/kind: intentionally-missing/)) {
  throw new Error('CTX-YES-001 required_sources must not use intentionally-missing kind');
}
// freshness_expectation must mention review-needed or missing review metadata
const yes001Freshness = yes001Block.match(/^    freshness_expectation: (.+)$/m)?.[1] ?? '';
if (!/review-needed|missing review|no.*review|review date/i.test(yes001Freshness)) {
  throw new Error(`CTX-YES-001 freshness_expectation must mention review-needed or missing review metadata; got: "${yes001Freshness}"`);
}

console.log(
  JSON.stringify(
    {
      status: 'PASS',
      questions: questionIds.length,
      expectations: blocks.length,
      idParity: true,
      sourceReferences,
      kindCounts,
      intentionallyMissing,
      humanReviewRequired,
      adversarialCounts: { ldp: ldpCount, con: conCount, inj: injCount },
      yes001CanonicalPath: YES001_REQUIRED_PATH,
      injectionFixtures: {
        count: injCount,
        boundariesCovered: [...injBoundaries].sort(),
        allBoundariesPresent: injBoundaries.size === 4,
        instructionsUnique: instrSet.size === injInstructions.length,
      },
    },
    null,
    2,
  ),
);
