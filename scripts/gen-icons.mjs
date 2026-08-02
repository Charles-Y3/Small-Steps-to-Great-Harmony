import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';

const SRC = 'public/icons/small-steps-to-great-harmony-icon.png';
const OUT = 'public/icons';
mkdirSync(OUT, { recursive: true });

// Square crop centered on the medallion, with a little breathing room.
const CROP = { left: 425, top: 97, width: 560, height: 560 };

function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entryOffset = 6 + i * 16;
    header.writeUInt8(size === 256 ? 0 : size, entryOffset + 0); // width
    header.writeUInt8(size === 256 ? 0 : size, entryOffset + 1); // height
    header.writeUInt8(0, entryOffset + 2); // color palette
    header.writeUInt8(0, entryOffset + 3); // reserved
    header.writeUInt16LE(1, entryOffset + 4); // color planes
    header.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    header.writeUInt32LE(buf.length, entryOffset + 8); // size in bytes
    header.writeUInt32LE(offset, entryOffset + 12); // offset
    offset += buf.length;
    entries.push(buf);
  }
  return Buffer.concat([header, ...entries]);
}

async function main() {
  const cropped = sharp(SRC).extract(CROP);

  await cropped.clone().resize(512, 512).png().toFile(`${OUT}/icon512.png`);
  await cropped.clone().resize(192, 192).png().toFile(`${OUT}/icon192.png`);
  await cropped.clone().resize(180, 180).png().toFile(`${OUT}/apple-touch-icon.png`);
  await cropped.clone().resize(32, 32).png().toFile(`${OUT}/favicon.png`);

  // Maskable: pad out so the medallion sits inside the ~80% safe zone,
  // background matches the source's own off-white so corners don't clip odd.
  const bg = { r: 0xef, g: 0xec, b: 0xe6, alpha: 1 };
  await cropped
    .clone()
    .resize(410, 410)
    .extend({ top: 51, bottom: 51, left: 51, right: 51, background: bg })
    .resize(512, 512)
    .png()
    .toFile(`${OUT}/iconMaskable512.png`);

  const sizes = [16, 32, 48];
  const buffers = await Promise.all(sizes.map((s) => cropped.clone().resize(s, s).png().toBuffer()));
  writeFileSync(`${OUT}/favicon.ico`, buildIco(buffers, sizes));

  console.log('done');
}

main();
