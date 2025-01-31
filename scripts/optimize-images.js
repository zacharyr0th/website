import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public');
const QUALITY = {
  webp: 80,
  jpeg: 85,
  png: 85,
  avif: 65
};

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const outputPath = filePath.replace(ext, '.webp');
  const avifPath = filePath.replace(ext, '.avif');

  if (!SUPPORTED_FORMATS.includes(ext)) {
    return;
  }

  try {
    const image = sharp(filePath);

    // Skip if image is already optimized and small enough
    const stats = await fs.stat(filePath);
    if (stats.size < 50 * 1024) { // Skip if less than 50KB
      console.log(`✓ Skipped (already optimized): ${fileName}`);
      return;
    }

    // Generate WebP
    await image
      .webp({
        quality: QUALITY.webp,
        effort: 6,
        smartSubsample: true,
        nearLossless: false
      })
      .toFile(outputPath + '.temp');

    // Generate AVIF for modern browsers
    await image
      .avif({
        quality: QUALITY.avif,
        effort: 9,
        chromaSubsampling: '4:2:0'
      })
      .toFile(avifPath + '.temp');

    // Replace original files with optimized versions
    if (ext !== '.webp') {
      await fs.unlink(filePath);
    }
    await fs.rename(outputPath + '.temp', outputPath);
    await fs.rename(avifPath + '.temp', avifPath);

    const newStats = await fs.stat(outputPath);
    const avifStats = await fs.stat(avifPath);
    
    console.log(`✓ Optimized: ${fileName}`);
    console.log(`  WebP: ${(newStats.size / 1024).toFixed(2)} KB`);
    console.log(`  AVIF: ${(avifStats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error(`✗ Error optimizing ${fileName}:`, error.message);
  }
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .next directories
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await processDirectory(fullPath);
        }
      } else if (entry.isFile()) {
        await optimizeImage(fullPath);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error.message);
  }
}

console.log('Starting image optimization...\n');
processDirectory(IMAGES_DIR).then(() => {
  console.log('\nOptimization complete!');
}); 