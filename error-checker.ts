import * as ts from 'typescript';
import * as eslint from 'eslint';
import * as path from 'path';
import * as fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('dir', {
    alias: 'd',
    type: 'string',
    description: 'Directory to check',
    default: process.cwd()
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Output file for results'
  })
  .help()
  .parseSync() as { dir: string; output?: string };

function getAllTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllTypeScriptFiles(fullPath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkTypeScriptErrors(files: string[]): string {
  const program = ts.createProgram(files, {
    noEmit: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.React,
  });

  const diagnostics = ts.getPreEmitDiagnostics(program);

  let output = '';
  for (const diagnostic of diagnostics) {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      output += `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}\n`;
    } else {
      output += ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    }
  }

  return output;
}

async function checkESLintErrors(files: string[]): Promise<string> {
  const eslintCLI = new eslint.ESLint();

  try {
    const results = await eslintCLI.lintFiles(files);
    const formatter = await eslintCLI.loadFormatter('stylish');
    const resultText = formatter.format(results, { 
      cwd: process.cwd(),
      rulesMeta: eslintCLI.getRulesMetaForResults(results)
    });
    return resultText;
  } catch (error) {
    console.error('Error running ESLint:', error);
    return '';
  }
}

function writeToFileOrConsole(content: string, outputFile?: string) {
  if (outputFile) {
    fs.writeFileSync(outputFile, content);
    console.log(`Results written to ${outputFile}`);
  } else {
    console.log(content);
  }
}

async function main() {
  const projectRoot = argv.dir;
  const tsFiles = getAllTypeScriptFiles(projectRoot);
  let output = '';

  output += 'Checking for TypeScript errors...\n';
  const tsDiagnostics = checkTypeScriptErrors(tsFiles);
  output += tsDiagnostics + '\n';

  output += '\nChecking for ESLint errors...\n';
  const eslintResults = await checkESLintErrors(tsFiles);
  output += eslintResults;

  writeToFileOrConsole(output, argv.output);
}

main().catch(error => console.error('An error occurred:', error));