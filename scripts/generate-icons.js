#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const ICON_SIZES = {
  favicon: { size: '32x32', format: 'ico' },
  'apple-touch-icon': { size: '180x180', format: 'png' },
  'icon-512': { size: '512x512', format: 'webp' },
  'icon-192': { size: '192x192', format: 'webp' },
  'icon-192-maskable': { size: '192x192', format: 'webp', maskable: true },
  'icon-192-monochrome': { size: '192x192', format: 'webp', monochrome: true },
};

const ICON_DIRS = [
  'public/assets/icons',
  'public/assets/screenshots',
];

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function ensureDirectories() {
  for (const dir of ICON_DIRS) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  }
}

function generateIcons() {
  const sourceImage = 'public/misc/profile-picture.webp';
  
  // Check if ImageMagick is installed
  try {
    execSync('which magick', { stdio: 'ignore' });
  } catch {
    console.error('❌ ImageMagick is not installed. Please install it first:');
    console.log('brew install imagemagick');
    process.exit(1);
  }

  // Generate each icon
  for (const [name, config] of Object.entries(ICON_SIZES)) {
    const outputPath = `public/assets/icons/${name}.${config.format}`;
    let command = `magick ${sourceImage} -resize ${config.size}`;
    
    if (config.maskable) {
      command += ' -gravity center -extent ${config.size}';
    }
    
    if (config.monochrome) {
      command += ' -colorspace gray';
    }
    
    command += ` -quality 90 ${outputPath}`;
    
    console.log(`🎨 Generating ${name}...`);
    runCommand(command);
  }

  // Generate writing icon
  console.log('🎨 Generating writing icon...');
  runCommand(`
    magick -size 96x96 xc:transparent \
    -font Arial -fill "#3b82f6" \
    -gravity center -pointsize 48 \
    -annotate 0 "W" public/assets/icons/writing-icon.webp
  `);

  // Copy favicon
  console.log('📋 Copying favicon...');
  runCommand('cp public/misc/favicon.ico public/assets/icons/favicon.ico');
}

function main() {
  console.log('🎨 Starting icon generation...');
  
  ensureDirectories();
  generateIcons();
  
  console.log('\n✨ Icon generation complete!');
  console.log('Generated icons are in public/assets/icons/');
}

main(); 