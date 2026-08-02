// One-off PWA icon generator: six small dots arranged in a ring (six
// small apps, six small steps), graphite ink on warm paper — the
// portal's own neutral identity, no lineage color. Re-run with
// `npm run icons` if the mark changes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(OUT_DIR, { recursive: true });

function sixDotsSvg({ size, bg, includeBg = true, scale = 1 }) {
  const cx = size / 2;
  const ringR = size * 0.28 * scale;
  const dotR = size * 0.07 * scale;
  const dots = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    const x = cx + ringR * Math.cos(angle);
    const y = cx + ringR * Math.sin(angle);
    return `<circle cx="${x}" cy="${y}" r="${dotR}" fill="#2f2c29" />`;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    ${includeBg ? `<rect width="${size}" height="${size}" fill="${bg}" />` : ''}
    ${dots}
  </svg>`;
}

async function render(name, size, opts) {
  const svg = sixDotsSvg({ size, ...opts });
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT_DIR, name));
  console.log(`icons: wrote ${name} (${size}x${size})`);
}

await render('icon192.png', 192, { bg: '#faf8f4' });
await render('icon512.png', 512, { bg: '#faf8f4' });
await render('iconMaskable512.png', 512, { bg: '#faf8f4', scale: 0.62 });
await render('apple-touch-icon.png', 180, { bg: '#faf8f4' });
await sharp(Buffer.from(sixDotsSvg({ size: 64, bg: '#faf8f4' })))
  .png()
  .toFile(path.join(OUT_DIR, 'favicon.png'));
fs.copyFileSync(path.join(OUT_DIR, 'favicon.png'), path.join(OUT_DIR, 'favicon.ico'));

console.log('\nicons: done.');
