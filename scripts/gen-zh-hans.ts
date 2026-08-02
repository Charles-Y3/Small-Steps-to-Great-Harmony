// Build-time script: collects every Traditional Chinese string authored in
// this app's content/UI data, converts each to Simplified Chinese via
// opencc-js, and writes a flat lookup table consumed at runtime by
// src/i18n/L.ts. Run with `npm run gen:i18n` whenever content changes.
//
// Same direction/rationale as the two quiz apps: author en + zh-Hant,
// generate zh-Hans. See src/i18n/types.ts's header comment.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as OpenCC from 'opencc-js';

import { APPS } from '../src/data/apps';
import { UI } from '../src/i18n/strings';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const CJK = /[㐀-鿿豈-﫿]/;

function collect(value: unknown, out: Set<string>): void {
  if (typeof value === 'string') {
    if (CJK.test(value)) out.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collect(v, out);
    return;
  }
  if (value && typeof value === 'object') {
    for (const v of Object.values(value as Record<string, unknown>)) collect(v, out);
  }
}

const found = new Set<string>();
for (const root_ of [APPS, UI]) {
  collect(root_, found);
}

const converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
const map: Record<string, string> = {};
for (const s of found) {
  const converted = converter(s);
  if (converted !== s) map[s] = converted;
}

const outPath = path.join(root, 'src/i18n/zhHans.generated.json');
fs.writeFileSync(outPath, JSON.stringify(map), 'utf8');
console.log(
  `gen-zh-hans: wrote ${Object.keys(map).length} entries (of ${found.size} unique zh strings scanned) -> ${path.relative(root, outPath)}`,
);
