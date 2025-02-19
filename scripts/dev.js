#!/usr/bin/env node

import { execSync } from 'child_process';
import { rmSync } from 'fs';
import { join } from 'path';

const args = process.argv.slice(2);
const mode = args[0] || 'default';

// Helper function to execute commands
const execute = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
};

// Clean function to remove cache and build directories
const clean = () => {
  const dirsToClean = ['.next', 'node_modules/.cache'];
  
  dirsToClean.forEach(dir => {
    try {
      rmSync(join(process.cwd(), dir), { recursive: true, force: true });
      console.log(`✓ Cleaned ${dir}`);
    } catch (error) {
      console.warn(`Warning: Could not clean ${dir}`, error);
    }
  });
};

// Main switch for different modes
switch (mode) {
  case 'turbo':
    execute('next dev --turbo');
    break;

  case 'fresh':
    clean();
    execute('next dev');
    break;

  case 'clean':
    clean();
    break;

  default:
    execute('next dev');
    break;
} 