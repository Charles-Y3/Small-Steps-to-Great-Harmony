// prebuild gate. Fails loudly (non-zero exit) rather than shipping broken
// or stale content. Run manually with `npm run validate-content`.
import * as OpenCC from 'opencc-js';
import { APPS } from '../src/data/apps';
import { UI } from '../src/i18n/strings';
import hansMap from '../src/i18n/zhHans.generated.json';

const CJK = /[㐀-鿿豈-﫿]/;
const errors: string[] = [];

// Keys/paths where "en" is deliberately CJK (native-script language
// labels), or where "zhHant" is deliberately Latin (a proper noun with no
// official Chinese name, kept identical in both fields on purpose).
const ALLOW_CJK_IN_EN = new Set<string>(['UI/nav_lang_zhHant', 'UI/nav_lang_zhHans']);
const ALLOW_LATIN_IN_ZH = new Set<string>(['apps/atlas/name']);

function checkLocalized(path: string, loc: { en: unknown; zhHant: unknown }) {
  const enVal = loc.en;
  const zhVal = loc.zhHant;
  const enStr = Array.isArray(enVal) ? enVal.join(' ') : String(enVal ?? '');
  const zhStr = Array.isArray(zhVal) ? zhVal.join(' ') : String(zhVal ?? '');
  if (!enStr.trim()) errors.push(`${path}: empty "en"`);
  if (!zhStr.trim()) errors.push(`${path}: empty "zhHant"`);
  if (Array.isArray(enVal) && Array.isArray(zhVal) && enVal.length !== zhVal.length) {
    errors.push(`${path}: en[] and zhHant[] have different lengths (${enVal.length} vs ${zhVal.length})`);
  }
  if (CJK.test(enStr) && !ALLOW_CJK_IN_EN.has(path)) {
    errors.push(`${path}: "en" contains CJK characters — looks untranslated`);
  }
  if (enStr && !CJK.test(zhStr) && zhStr.length > 8 && !ALLOW_LATIN_IN_ZH.has(path)) {
    errors.push(`${path}: "zhHant" has no CJK characters and is longer than 8 chars — looks untranslated`);
  }
}

// --- Rule 1: completeness + Rule 3 (portal-specific) ----------------------
const ids = new Set<string>();
const HEX = /^#[0-9a-f]{6}$/i;
for (const app of APPS) {
  if (ids.has(app.id)) errors.push(`apps: duplicate id "${app.id}"`);
  ids.add(app.id);
  checkLocalized(`apps/${app.id}/name`, app.name);
  checkLocalized(`apps/${app.id}/tagline`, app.tagline);
  checkLocalized(`apps/${app.id}/blurb`, app.blurb);
  checkLocalized(`apps/${app.id}/detail`, app.detail);
  checkLocalized(`apps/${app.id}/goodFor`, app.goodFor);
  checkLocalized(`apps/${app.id}/notFor`, app.notFor);
  checkLocalized(`apps/${app.id}/tags`, app.tags);
  checkLocalized(`apps/${app.id}/timeEstimate`, app.timeEstimate);
  for (const [key, val] of Object.entries(app.modes)) {
    if (val < 0 || val > 10) errors.push(`apps/${app.id}: modes.${key} is ${val}, expected 0-10`);
  }
  if (!HEX.test(app.accent)) errors.push(`apps/${app.id}: accent "${app.accent}" is not a valid hex color`);
  if (!HEX.test(app.accentDark)) errors.push(`apps/${app.id}: accentDark "${app.accentDark}" is not a valid hex color`);
  const enTagline = app.tagline.en;
  if (enTagline.length > 70) errors.push(`apps/${app.id}: en tagline is ${enTagline.length} chars, budget is ~70`);
}
for (const [key, val] of Object.entries(UI)) {
  checkLocalized(`UI/${key}`, val);
}

// --- Rule 2: generated-Simplified staleness ------------------------------
const converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
const found = new Set<string>();
function collect(value: unknown): void {
  if (typeof value === 'string') {
    if (CJK.test(value)) found.add(value);
    return;
  }
  if (Array.isArray(value)) return value.forEach(collect);
  if (value && typeof value === 'object') Object.values(value as Record<string, unknown>).forEach(collect);
}
[APPS, UI].forEach(collect);
const expected: Record<string, string> = {};
for (const s of found) {
  const converted = converter(s);
  if (converted !== s) expected[s] = converted;
}
const actual = hansMap as Record<string, string>;
const expectedKeys = Object.keys(expected).sort();
const actualKeys = Object.keys(actual).sort();
const stale =
  expectedKeys.length !== actualKeys.length ||
  expectedKeys.some((k, i) => k !== actualKeys[i] || expected[k] !== actual[k]);
if (stale) {
  errors.push('zhHans.generated.json is stale — run `npm run gen:i18n` and commit src/i18n/zhHans.generated.json');
}

// --- Report ---------------------------------------------------------------
if (errors.length) {
  console.error(`validate-content: ${errors.length} problem(s) found:\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log(`validate-content: OK (${APPS.length} apps, ${Object.keys(UI).length} UI strings)`);
}
