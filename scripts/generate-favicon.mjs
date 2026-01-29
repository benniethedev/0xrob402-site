import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const logoPath = join(publicDir, 'logo.png');

// Generate multiple sizes
const sizes = [16, 32, 48, 64, 128, 180, 192, 512];

async function generateFavicons() {
  console.log('Generating favicons from logo.png...');
  
  for (const size of sizes) {
    await sharp(logoPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 10, g: 10, b: 10, alpha: 1 } // Dark background matching site
      })
      .png()
      .toFile(join(publicDir, `favicon-${size}.png`));
    console.log(`  Created favicon-${size}.png`);
  }
  
  // Create apple-touch-icon
  await sharp(logoPath)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 10, g: 10, b: 10, alpha: 1 }
    })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('  Created apple-touch-icon.png');
  
  // Create favicon.ico (multi-resolution ICO)
  // Sharp doesn't support ICO directly, so we'll use the 32x32 PNG as primary
  await sharp(logoPath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 10, g: 10, b: 10, alpha: 1 }
    })
    .png()
    .toFile(join(publicDir, 'favicon.png'));
  
  // For proper ICO, we'll create a simple concatenated ICO
  // ICO header + 16x16 + 32x32
  const ico16 = await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .raw()
    .toBuffer();
    
  const ico32 = await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .raw()
    .toBuffer();
  
  // Create ICO file manually
  const createIco = (images) => {
    const count = images.length;
    const headerSize = 6 + (count * 16);
    let dataOffset = headerSize;
    const entries = [];
    const datas = [];
    
    for (const img of images) {
      const size = img.size;
      const rawSize = size * size * 4;
      const bmpHeaderSize = 40;
      const dataSize = bmpHeaderSize + rawSize;
      
      entries.push({
        width: size === 256 ? 0 : size,
        height: size === 256 ? 0 : size,
        colorCount: 0,
        reserved: 0,
        planes: 1,
        bitCount: 32,
        bytesInRes: dataSize,
        imageOffset: dataOffset
      });
      
      // BMP info header (BITMAPINFOHEADER) - DIB format for ICO
      const bmpHeader = Buffer.alloc(bmpHeaderSize);
      bmpHeader.writeUInt32LE(40, 0);           // biSize
      bmpHeader.writeInt32LE(size, 4);          // biWidth
      bmpHeader.writeInt32LE(size * 2, 8);      // biHeight (doubled for ICO)
      bmpHeader.writeUInt16LE(1, 12);           // biPlanes
      bmpHeader.writeUInt16LE(32, 14);          // biBitCount
      bmpHeader.writeUInt32LE(0, 16);           // biCompression
      bmpHeader.writeUInt32LE(rawSize, 20);     // biSizeImage
      
      // Convert RGBA to BGRA and flip vertically
      const pixels = Buffer.alloc(rawSize);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const srcIdx = ((size - 1 - y) * size + x) * 4;
          const dstIdx = (y * size + x) * 4;
          pixels[dstIdx + 0] = img.data[srcIdx + 2]; // B
          pixels[dstIdx + 1] = img.data[srcIdx + 1]; // G
          pixels[dstIdx + 2] = img.data[srcIdx + 0]; // R
          pixels[dstIdx + 3] = img.data[srcIdx + 3]; // A
        }
      }
      
      datas.push(Buffer.concat([bmpHeader, pixels]));
      dataOffset += dataSize;
    }
    
    // ICO header
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);        // Reserved
    header.writeUInt16LE(1, 2);        // Type (1 = ICO)
    header.writeUInt16LE(count, 4);    // Image count
    
    // Entry directory
    const directory = Buffer.alloc(count * 16);
    entries.forEach((entry, i) => {
      const offset = i * 16;
      directory.writeUInt8(entry.width, offset);
      directory.writeUInt8(entry.height, offset + 1);
      directory.writeUInt8(entry.colorCount, offset + 2);
      directory.writeUInt8(entry.reserved, offset + 3);
      directory.writeUInt16LE(entry.planes, offset + 4);
      directory.writeUInt16LE(entry.bitCount, offset + 6);
      directory.writeUInt32LE(entry.bytesInRes, offset + 8);
      directory.writeUInt32LE(entry.imageOffset, offset + 12);
    });
    
    return Buffer.concat([header, directory, ...datas]);
  };
  
  const ico16Data = await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer();
    
  const ico32Data = await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer();
  
  const icoBuffer = createIco([
    { size: 16, data: ico16Data },
    { size: 32, data: ico32Data }
  ]);
  
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('  Created favicon.ico');
  
  console.log('Done!');
}

generateFavicons().catch(console.error);
