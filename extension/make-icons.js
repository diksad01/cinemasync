// Run: node make-icons.js
// Generates simple colored PNG icons for the extension
const fs = require('fs');
const path = require('path');

fs.mkdirSync(path.join(__dirname, 'icons'), { recursive: true });

// Build a minimal valid PNG with a solid color fill
function createSolidPNG(size, bgHex, fgHex) {
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function crc32(buf) {
    let crc = 0xffffffff;
    const table = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[i] = c;
    }
    for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const t = Buffer.from(type);
    const crcBuf = Buffer.concat([t, data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc32(crcBuf));
    return Buffer.concat([len, t, data, c]);
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB

  // Parse hex colors
  const bg = [
    parseInt(bgHex.slice(1,3),16),
    parseInt(bgHex.slice(3,5),16),
    parseInt(bgHex.slice(5,7),16)
  ];
  const fg = [
    parseInt(fgHex.slice(1,3),16),
    parseInt(fgHex.slice(3,5),16),
    parseInt(fgHex.slice(5,7),16)
  ];

  // Build raw image data — draw a simple circle in the center
  const rows = [];
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  for (let y = 0; y < size; y++) {
    const row = [0]; // filter byte
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const inCircle = (dx*dx + dy*dy) <= r*r;
      const color = inCircle ? fg : bg;
      row.push(...color);
    }
    rows.push(Buffer.from(row));
  }

  const raw = Buffer.concat(rows);

  // Deflate compress
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

[16, 48, 128].forEach(size => {
  const png = createSolidPNG(size, '#06080f', '#f0c060');
  fs.writeFileSync(path.join(__dirname, 'icons', `icon${size}.png`), png);
  console.log(`✓ icon${size}.png created`);
});

console.log('Icons ready! You can replace them with your own logo later.');
