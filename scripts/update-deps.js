#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const MAJOR_UPDATES = {
  // Core dependencies
  'react': '^19.0.0',
  'react-dom': '^19.0.0',
  'next': '^15.1.6',
  'framer-motion': '^12.0.6',
  'react-icons': '^5.4.0',
  'tailwind-merge': '^3.0.1',
  
  // Dev dependencies
  '@next/bundle-analyzer': '^15.1.6',
  'eslint': '^9.19.0',
  'eslint-config-next': '^15.1.6',
  'eslint-config-prettier': '^10.0.1',
  'eslint-plugin-react-hooks': '^5.1.0',
  'typescript': '^5.7.3',
  
  // Additional dependencies that need updates
  '@types/react': '^19.0.0',
  '@types/react-dom': '^19.0.0',
  '@testing-library/react': '^14.2.1',
  'postcss': '^8.5.1'
};

function runCommand(command, ignoreError = false) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    if (!ignoreError) {
      console.error(`Failed to execute ${command}`, error.message);
      process.exit(1);
    }
    return false;
  }
}

function backupPackageJson() {
  const content = readFileSync('package.json', 'utf8');
  writeFileSync('package.json.backup', content);
  console.log('✅ Created backup of package.json');
}

function restorePackageJson() {
  const backup = readFileSync('package.json.backup', 'utf8');
  writeFileSync('package.json', backup);
  console.log('⚠️ Restored package.json from backup');
}

function updateDependencies() {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  let hasUpdates = false;

  // Update dependencies
  for (const [dep, version] of Object.entries(MAJOR_UPDATES)) {
    if (pkg.dependencies?.[dep]) {
      pkg.dependencies[dep] = version;
      hasUpdates = true;
    }
    if (pkg.devDependencies?.[dep]) {
      pkg.devDependencies[dep] = version;
      hasUpdates = true;
    }
  }

  if (hasUpdates) {
    writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    console.log('✅ Updated package.json with new versions');
  } else {
    console.log('ℹ️ No updates needed in package.json');
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  console.log(`🔄 Starting dependency update process... ${isDryRun ? '(dry run)' : ''}`);
  
  // Create backup
  backupPackageJson();
  
  try {
    // Update package.json
    updateDependencies();
    
    if (isDryRun) {
      console.log('🔍 Dry run complete. No changes were made.');
      restorePackageJson();
      return;
    }

    // Clean node_modules and package-lock.json
    console.log('🧹 Cleaning installation...');
    runCommand('rm -rf node_modules package-lock.json');
    
    // Install dependencies
    console.log('📦 Installing dependencies...');
    if (!runCommand('npm install', true)) {
      console.log('⚠️ Initial install failed, trying with legacy peer deps...');
      runCommand('npm install --legacy-peer-deps');
    }
    
    // Run type check
    console.log('🔍 Running type check...');
    const typeCheckSuccess = runCommand('npm run type-check', true);
    
    // Run tests
    console.log('🧪 Running tests...');
    const testSuccess = runCommand('npm run test', true);
    
    if (!typeCheckSuccess || !testSuccess) {
      console.log('\n⚠️ Some checks failed. You may need to:');
      console.log('1. Fix type errors');
      console.log('2. Update test files for React 19');
      console.log('3. Handle breaking changes in updated packages');
    }
    
    console.log('\n✨ Dependency update complete!');
    console.log('\nNext steps:');
    console.log('1. Review and fix any type errors or failing tests');
    console.log('2. Test the application thoroughly');
    console.log('3. Update any code for breaking changes');
    console.log('\nTo revert: copy package.json.backup to package.json and run npm install');
  } catch (error) {
    console.error('❌ Update failed:', error.message);
    restorePackageJson();
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
}); 