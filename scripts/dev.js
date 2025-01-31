#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    process.exit(1);
  }
}

function checkDependencies() {
  console.log('🔍 Checking for outdated dependencies...');
  try {
    execSync('npm outdated', { stdio: 'pipe' });
    console.log('✅ All dependencies are up to date!');
  } catch (error) {
    console.warn('⚠️  Some dependencies might need updating. Run npm update to fix.');
  }
}

function clearNodeModules() {
  if (existsSync('node_modules')) {
    console.log('🗑️  Removing node_modules...');
    runCommand('rm -rf node_modules');
    console.log('📦 Reinstalling dependencies...');
    runCommand('npm install');
  }
}

const args = process.argv.slice(2);
const command = args[0];
const options = args.slice(1);

const hasTypeErrors = () => {
  try {
    execSync('npm run type-check', { stdio: 'pipe' });
    return false;
  } catch {
    return true;
  }
};

switch (command) {
  case 'clean':
    console.log('🧹 Cleaning development environment...');
    runCommand('rm -rf .next');
    break;
    
  case 'turbo':
    console.log('🚀 Starting development server in turbo mode...');
    runCommand('next dev --turbo');
    break;
    
  case 'fresh':
    console.log('🌟 Starting fresh development environment...');
    if (existsSync('.next')) {
      runCommand('rm -rf .next');
    }
    runCommand('next dev');
    break;

  case 'hard-reset':
    console.log('💣 Performing hard reset of development environment...');
    clearNodeModules();
    runCommand('rm -rf .next');
    runCommand('next dev');
    break;

  case 'analyze':
    console.log('📊 Starting development server with bundle analyzer...');
    process.env.ANALYZE = 'true';
    runCommand('next dev');
    break;

  case 'debug':
    console.log('🐛 Starting development server in debug mode...');
    process.env.DEBUG = '*';
    runCommand('next dev');
    break;

  case 'check':
    console.log('🔍 Running development checks...');
    checkDependencies();
    if (hasTypeErrors()) {
      console.error('❌ TypeScript errors found. Please fix before continuing.');
      process.exit(1);
    }
    runCommand('npm run lint');
    console.log('✅ All checks passed!');
    break;

  case 'perf':
    console.log('⚡ Starting development server with performance monitoring...');
    process.env.NODE_OPTIONS = '--prof';
    runCommand('next dev');
    break;

  default:
    if (options.includes('--check')) {
      checkDependencies();
      if (hasTypeErrors()) {
        console.warn('⚠️  TypeScript errors found, but continuing...');
      }
    }
    console.log('🚀 Starting development server...');
    runCommand('next dev');
    break;
} 