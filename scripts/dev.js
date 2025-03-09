#!/usr/bin/env node

import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const args = process.argv.slice(2);
const mode = args[0] || 'default';
const port = args[1] || process.env.PORT || 3000;

// Helper function to execute commands with better error handling
const execute = (command) => {
  try {
    console.log(`\n🚀 Executing: ${command}\n`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\n❌ Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
};

// Clean function to remove cache and build directories
const clean = () => {
  const dirsToClean = ['.next', 'node_modules/.cache'];
  let allCleaned = true;
  
  console.log('\n🧹 Cleaning development environment...');
  
  dirsToClean.forEach(dir => {
    const fullPath = join(process.cwd(), dir);
    if (existsSync(fullPath)) {
      try {
        rmSync(fullPath, { recursive: true, force: true });
        console.log(`✅ Cleaned ${dir}`);
      } catch (error) {
        console.warn(`⚠️ Warning: Could not clean ${dir}`, error.message);
        allCleaned = false;
      }
    } else {
      console.log(`ℹ️ ${dir} does not exist, skipping`);
    }
  });
  
  return allCleaned;
};

// Function to check node_modules
const checkDependencies = () => {
  if (!existsSync(join(process.cwd(), 'node_modules'))) {
    console.log('\n📦 node_modules not found, installing dependencies...');
    return execute('npm install');
  }
  return true;
};

// Display help information
const showHelp = () => {
  console.log(`
📋 Development Script Usage:
  npm run dev [mode] [port]

Available modes:
  default   - Standard development server
  turbo     - Run with Turbo mode enabled
  fresh     - Clean cache and run development server
  clean     - Only clean the cache directories
  help      - Show this help message

Examples:
  npm run dev
  npm run dev turbo 4000
  npm run dev fresh
  `);
};

// Main switch for different modes
console.log(`\n🛠️ Starting development environment in ${mode} mode`);

switch (mode) {
  case 'turbo':
    checkDependencies() && execute(`next dev --turbo --port ${port}`);
    break;

  case 'fresh':
    if (clean() && checkDependencies()) {
      execute(`next dev --port ${port}`);
    }
    break;

  case 'clean':
    clean();
    break;
    
  case 'help':
    showHelp();
    break;

  default:
    checkDependencies() && execute(`next dev --port ${port}`);
    break;
} 