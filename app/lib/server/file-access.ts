import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createLogger } from '@/lib/core';
import { LogCategory } from '@/lib/core';

const logger = createLogger('security:file-access');

/* eslint-disable security/detect-non-literal-fs-filename */
// This file implements secure file access with proper validation
// All file paths are validated through validateFilePath before any fs operations
// See validateFilePath implementation for security measures:
// 1. Path traversal prevention
// 2. Project directory restriction
// 3. Extension validation
// 4. Required path validation
// 5. Size limits

/**
 * Options for secure file access
 */
export interface SecureFileOptions {
  allowedExtensions?: string[];
  requiredPath?: string;
  maxSize?: number;
}

/**
 * Result of secure file access
 */
export interface SecureFileResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Validate file path against security constraints
 */
function validateFilePath(filePath: string, options: SecureFileOptions = {}): boolean {
  const { allowedExtensions, requiredPath } = options;

  // Resolve to absolute path
  const resolvedPath = path.resolve(filePath);

  // Must be within project directory
  if (!resolvedPath.startsWith(process.cwd())) {
    logger.warn('File path outside project directory', {
      context: { path: filePath },
      category: LogCategory.SECURITY,
    });
    return false;
  }

  // Check file extension if allowedExtensions is provided
  if (allowedExtensions) {
    const ext = path.extname(filePath);
    if (!allowedExtensions.includes(ext)) {
      logger.warn('Invalid file extension', {
        context: { path: filePath, extension: ext },
        category: LogCategory.SECURITY,
      });
      return false;
    }
  }

  // Check required path if specified
  if (requiredPath && !resolvedPath.includes(requiredPath)) {
    logger.warn('File path not in required directory', {
      context: { path: filePath, required: requiredPath },
      category: LogCategory.SECURITY,
    });
    return false;
  }

  return true;
}

/**
 * Read file securely
 */
export async function readFileSecure(
  filePath: string,
  options: SecureFileOptions = {}
): Promise<SecureFileResult<string>> {
  try {
    // Validate file path
    if (!validateFilePath(filePath, options)) {
      return { success: false, error: 'Invalid file path' };
    }

    // Check file exists
    try {
      await fs.access(filePath);
    } catch {
      return { success: false, error: 'File not found' };
    }

    // Check file size if specified
    if (options.maxSize) {
      const stats = await fs.stat(filePath);
      if (stats.size > options.maxSize) {
        return { success: false, error: 'File too large' };
      }
    }

    // Read file
    const content = await fs.readFile(filePath, 'utf8');
    return { success: true, data: content };
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error reading file', {
      error: err,
      context: { path: filePath },
      category: LogCategory.SECURITY,
    });
    return { success: false, error: 'Failed to read file' };
  }
}

/**
 * Read directory securely
 */
export async function readDirSecure(
  dirPath: string,
  options: SecureFileOptions = {}
): Promise<SecureFileResult<string[]>> {
  try {
    // Validate directory path
    if (!validateFilePath(dirPath, options)) {
      return { success: false, error: 'Invalid directory path' };
    }

    // Check directory exists
    try {
      await fs.access(dirPath);
    } catch {
      return { success: false, error: 'Directory not found' };
    }

    // Read directory
    const files = await fs.readdir(dirPath);

    // Filter files by extension if specified
    const filteredFiles = options.allowedExtensions?.length
      ? files.filter((file) => options.allowedExtensions?.includes(path.extname(file)))
      : files;

    return { success: true, data: filteredFiles };
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error reading directory', {
      error: err,
      context: { path: dirPath },
      category: LogCategory.SECURITY,
    });
    return { success: false, error: 'Failed to read directory' };
  }
}
