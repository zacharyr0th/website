#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    process.exit(1);
  }
}

function checkNextConfig() {
  try {
    const configPath = join(process.cwd(), 'next.config.js');
    if (existsSync(configPath)) {
      console.log('✅ Next.js config exists');
    } else {
      console.warn('⚠️  Missing next.config.js');
    }
  } catch (error) {
    console.error('❌ Error checking Next.js config:', error.message);
  }
}

function analyzeDependencies() {
  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const depsCount = Object.keys(deps).length;
    console.log(`📊 Total dependencies: ${depsCount}`);
    
    // Check for duplicate dependencies
    const packageLock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
    const versions = new Map();
    let duplicates = 0;
    
    Object.keys(packageLock.packages).forEach(pkg => {
      if (pkg.startsWith('node_modules/')) {
        const name = pkg.split('/')[1];
        if (versions.has(name)) {
          duplicates++;
        } else {
          versions.set(name, true);
        }
      }
    });
    
    if (duplicates > 0) {
      console.warn(`⚠️  Found ${duplicates} potential duplicate dependencies`);
    }
  } catch (error) {
    console.error('❌ Error analyzing dependencies:', error.message);
  }
}

function cleanDependencies() {
  console.log('🧹 Cleaning dependencies...');
  try {
    // Remove node_modules and package-lock.json
    if (existsSync('node_modules')) {
      execSync('rm -rf node_modules', { stdio: 'inherit' });
    }
    if (existsSync('package-lock.json')) {
      execSync('rm -f package-lock.json', { stdio: 'inherit' });
    }
    // Clean npm cache
    execSync('npm cache clean --force', { stdio: 'inherit' });
    console.log('✅ Dependencies cleaned successfully');
  } catch (error) {
    console.error('❌ Error cleaning dependencies:', error.message);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'deps':
    console.log('📦 Cleaning and updating dependencies...');
    cleanDependencies();
    runCommand('npm install');
    analyzeDependencies();
    break;
    
  case 'update':
    console.log('🔄 Updating all dependencies...');
    runCommand('npm update --save && npm update --save-dev');
    console.log('Running security audit...');
    runCommand('npm audit fix');
    break;
    
  case 'audit':
    console.log('🔍 Auditing dependencies...');
    runCommand('npm audit && npm outdated');
    analyzeDependencies();
    break;
    
  case 'prune':
    console.log('✂️  Pruning unused dependencies...');
    runCommand('npm prune');
    console.log('Cleaning npm cache...');
    runCommand('npm cache clean --force');
    break;
    
  case 'verify':
    console.log('✅ Verifying project integrity...');
    checkNextConfig();
    runCommand('npm run type-check');
    runCommand('npm run lint');
    runCommand('npm run test');
    break;

  case 'optimize':
    console.log('⚡ Optimizing project...');
    runCommand('npm run optimize-images');
    console.log('Running bundle analysis...');
    runCommand('ANALYZE=true next build');
    break;

  case 'clean-all':
    console.log('🧹 Deep cleaning project...');
    runCommand('rm -rf node_modules .next out');
    runCommand('npm cache clean --force');
    runCommand('npm install');
    break;

  case 'test-all':
    console.log('🧪 Running all tests...');
    runCommand('npm run test:ci');
    runCommand('npm run lint');
    runCommand('npm run type-check');
    break;

  case 'security':
    console.log('🔒 Running security checks...');
    runCommand('npm audit');
    runCommand('npm audit fix');
    runCommand('npm doctor');
    break;
    
  default:
    console.log('⚡ Running all maintenance tasks...');
    checkNextConfig();
    analyzeDependencies();
    cleanDependencies();
    runCommand('npm install');
    runCommand('npm audit fix');
    runCommand('npm prune');
    console.log('🔍 Running verification checks...');
    runCommand('npm run type-check');
    runCommand('npm run lint');
    runCommand('npm run test');
    console.log('🎉 Maintenance complete!');
    break;
} 