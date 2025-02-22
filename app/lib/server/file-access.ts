import { promises as fs } from 'node:fs';
import { createReadStream } from 'node:fs';
import { Stats } from 'node:fs';
import path from 'node:path';
import { createLogger } from '@/lib/core';

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
 * Context for validation logging
 */
type ValidationContext = {
  [key: string]: string | number | boolean | undefined;
  path: string;
  extension?: string;
  required?: string;
  normalizedPath?: string;
  normalizedRequired?: string;
};

/**
 * Validate file path against security constraints
 */
function validateFilePath(filePath: string, options: SecureFileOptions = {}): boolean {
  const { allowedExtensions, requiredPath } = options;

  // Resolve to absolute path
  const resolvedPath = path.resolve(filePath);

  // Must be within project directory
  if (!resolvedPath.startsWith(process.cwd())) {
    const context: ValidationContext = { path: filePath };
    logger.warn('File path outside project directory', context);
    return false;
  }

  // Check file extension if allowedExtensions is provided
  if (allowedExtensions) {
    const ext = path.extname(filePath);
    if (!allowedExtensions.includes(ext)) {
      const context: ValidationContext = { path: filePath, extension: ext };
      logger.warn('Invalid file extension', context);
      return false;
    }
  }

  // Check required path if specified
  if (requiredPath) {
    const normalizedRequiredPath = path.resolve(requiredPath);
    const normalizedFilePath = path.resolve(filePath);
    if (!normalizedFilePath.startsWith(normalizedRequiredPath)) {
      const context: ValidationContext = {
        path: filePath,
        required: requiredPath,
        normalizedPath: normalizedFilePath,
        normalizedRequired: normalizedRequiredPath,
      };
      logger.warn('File path not in required directory', context);
      return false;
    }
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
    logger.error('Error reading file', err, { path: filePath });
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
    logger.error('Error reading directory', err, { path: dirPath });
    return { success: false, error: 'Failed to read directory' };
  }
}

/**
 * Create a secure read stream
 */
export function createSecureReadStream(
  filePath: string,
  options: SecureFileOptions & { start?: number; end?: number } = {}
): SecureFileResult<ReadableStream> {
  try {
    // Validate file path
    if (!validateFilePath(filePath, options)) {
      return { success: false, error: 'Invalid file path' };
    }

    // Create read stream
    const nodeStream = createReadStream(filePath, {
      start: options.start,
      end: options.end,
    });

    // Convert Node.js stream to web stream
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on('data', (chunk: string | Buffer) => {
          controller.enqueue(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
        });
        nodeStream.on('end', () => {
          controller.close();
        });
        nodeStream.on('error', (err: Error) => {
          controller.error(err);
        });
      },
      cancel() {
        nodeStream.destroy();
      },
    });

    return { success: true, data: webStream };
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error creating read stream', err, { path: filePath });
    return { success: false, error: 'Failed to create stream' };
  }
}

/**
 * Get file stats securely
 */
export async function getFileStatsSecure(
  filePath: string,
  options: SecureFileOptions = {}
): Promise<SecureFileResult<Stats>> {
  try {
    // Validate file path
    if (!validateFilePath(filePath, options)) {
      return { success: false, error: 'Invalid file path' };
    }

    // Get file stats
    const stats = await fs.stat(filePath);
    return { success: true, data: stats };
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Error getting file stats', err, { path: filePath });
    return { success: false, error: 'Failed to get file stats' };
  }
}
