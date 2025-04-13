#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import { createInterface } from 'readline';

// Load environment variables (cascade from most specific to general)
const envFiles = ['.env.local', '.env.development.local', '.env.development', '.env'];
for (const file of envFiles) {
  if (existsSync(file)) {
    console.log(`📄 Loading environment from ${file}`);
    dotenv.config({ path: file });
  }
}

// Parse command line arguments with better handling
const args = process.argv.slice(2);
const port = parseInt(args[0] || process.env.PORT || '3000', 10);

if (isNaN(port) || port < 0 || port > 65535) {
  console.error('❌ Invalid port number. Using default port 3000.');
  port = 3000;
}

console.log(`📦 Using package manager: pnpm`);

// Process handling and graceful shutdown
let childProcess = null;

// Helper function to execute commands with better error handling
const execute = (command, options = {}) => {
  try {
    console.log(`\n🚀 Executing: ${command}\n`);
    
    if (options.async) {
      childProcess = spawn(command, { 
        shell: true, 
        stdio: 'inherit',
        env: { ...process.env } 
      });
      
      return new Promise((resolve, reject) => {
        childProcess.on('close', (code) => {
          childProcess = null;
          if (code === 0 || code === null) {
            resolve(true);
          } else {
            console.error(`\n❌ Command exited with code ${code}`);
            reject(new Error(`Command exited with code ${code}`));
          }
        });
        
        childProcess.on('error', (error) => {
          childProcess = null;
          console.error(`\n❌ Error executing command: ${command}`);
          console.error(error.message);
          reject(error);
        });
      });
    } else {
      // Synchronous execution
      execSync(command, { stdio: 'inherit', env: { ...process.env } });
      return true;
    }
  } catch (error) {
    console.error(`\n❌ Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
};

// Function to check node_modules and package integrity
const checkDependencies = async () => {
  const nodeModulesPath = join(process.cwd(), 'node_modules');
  
  // Check if node_modules exists
  if (!existsSync(nodeModulesPath)) {
    console.log('\n📦 node_modules not found, installing dependencies...');
    return await execute('pnpm install');
  }
  
  // Check for next in node_modules as a simple validity check
  if (!existsSync(join(nodeModulesPath, 'next'))) {
    console.log('\n⚠️ Critical dependencies appear to be missing, reinstalling...');
    return await execute('pnpm install');
  }
  
  return true;
};

// Handle process shutdown gracefully
const cleanup = () => {
  if (childProcess) {
    console.log('\n🛑 Shutting down development server...');
    childProcess.kill('SIGTERM');
  }
  process.exit(0);
};

// Listen for termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('SIGHUP', cleanup);

// Interactive mode - allow restarting the server with 'r'
const setupInteractiveMode = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('💡 Interactive mode: Press "r" to restart the server or "q" to quit');
  
  rl.on('line', async (input) => {
    if (input.toLowerCase() === 'r') {
      console.log('\n🔄 Restarting development server...');
      if (childProcess) {
        childProcess.kill('SIGTERM');
        // The process close event will trigger a restart
      }
    } else if (input.toLowerCase() === 'q') {
      cleanup();
    }
  });
  
  return rl;
};

// Main async function to run the dev environment
const main = async () => {
  console.log(`\n🛠️ Starting Next.js development server on port ${port}`);
  
  let rl;
  
  try {
    await checkDependencies();
    rl = setupInteractiveMode();
    await execute(`next dev --port ${port}`, { async: true });
  } catch (error) {
    console.error('\n❌ Development environment failed to start properly');
    console.error(error.message);
    process.exit(1);
  } finally {
    if (rl) rl.close();
  }
};

// Run the main function
main().catch(error => {
  console.error('❌ Unhandled error in main process:', error);
  process.exit(1);
}); 