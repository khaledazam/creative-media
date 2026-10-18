import fs from 'fs';
import path from 'path';

const landingDir = path.resolve('public/landing');
const files = fs.readdirSync(landingDir);

console.log(`Total files in public/landing: ${files.length}`);

// We can read dimensions using basic jpeg header parser
function getJpegDimensions(buffer) {
  let i = 0;
  if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) return null;
  i += 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) return null;
    const marker = buffer[i + 1];
    if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    const len = buffer.readUInt16BE(i + 2);
    i += 2 + len;
  }
  return null;
}

const list = [];
for (const file of files) {
  const fullPath = path.join(landingDir, file);
  const stat = fs.statSync(fullPath);
  let dim = null;
  if (file.endsWith('.jpeg') || file.endsWith('.jpg')) {
    try {
      const buf = fs.readFileSync(fullPath);
      dim = getJpegDimensions(buf);
    } catch {}
  }
  list.push({
    file,
    sizeKB: (stat.size / 1024).toFixed(1),
    width: dim?.width || 'N/A',
    height: dim?.height || 'N/A',
    ratio: dim ? (dim.width / dim.height).toFixed(2) : 'N/A',
    isVideo: file.endsWith('.mp4')
  });
}

console.log(JSON.stringify(list, null, 2));
