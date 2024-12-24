import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ICON_SIZES = [64, 192, 512];
const ICON_COLOR = '#3B82F6';

async function generateIcon(size) {
  const svgIcon = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${ICON_COLOR}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="${size * 0.5}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        CW
      </text>
    </svg>
  `;

  const outputPath = join(__dirname, '..', 'public');
  
  if (size === 64) {
    await sharp(Buffer.from(svgIcon))
      .png()
      .toFile(join(outputPath, 'favicon.ico'));
  } else {
    await sharp(Buffer.from(svgIcon))
      .png()
      .toFile(join(outputPath, `logo${size}.png`));
  }
}

async function generateIcons() {
  try {
    await Promise.all(ICON_SIZES.map(size => generateIcon(size)));
    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
