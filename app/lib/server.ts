/**
 * Server Module
 *
 * This file consolidates server-side functionality including:
 * - Secure file access
 * - Hetzner object storage integration
 */
import 'server-only';
import { promises as fs } from 'node:fs';
import { createReadStream } from 'node:fs';
import { Stats } from 'node:fs';
import path from 'node:path';
import { createLogger } from '@/lib/core';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import type { GetObjectCommandInput } from '@aws-sdk/client-s3';

// =========================================
// Secure File Access
// =========================================

const fileLogger = createLogger('security:file-access');

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
    fileLogger.warn('File path outside project directory', context);
    return false;
  }

  // Check file extension if allowedExtensions is provided
  if (allowedExtensions) {
    const ext = path.extname(filePath);
    if (!allowedExtensions.includes(ext)) {
      const context: ValidationContext = { path: filePath, extension: ext };
      fileLogger.warn('Invalid file extension', context);
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
      fileLogger.warn('File path not in required directory', context);
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
    fileLogger.error('Error reading file', err, { path: filePath });
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
    fileLogger.error('Error reading directory', err, { path: dirPath });
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
    fileLogger.error('Error creating read stream', err, { path: filePath });
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
    fileLogger.error('Error getting file stats', err, { path: filePath });
    return { success: false, error: 'Failed to get file stats' };
  }
}

// =========================================
// Hetzner Object Storage
// =========================================

// Simple logger function
const storageLog = (level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: Record<string, unknown>) => {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [hetzner-storage] ${message}`, data || '');
};

// S3 client configuration
const STORAGE_CONFIG = {
  bucket: process.env.STORAGE_BUCKET_NAME || 'website-audio',
  region: process.env.STORAGE_REGION || 'eu-central-1',
  endpoint: process.env.STORAGE_ENDPOINT || 'https://s3.eu-central-1.hetzner.com',
  accessKey: process.env.STORAGE_ACCESS_KEY || '',
  secretKey: process.env.STORAGE_SECRET_KEY || '',
};

// Initialize S3 client
const s3Client = new S3Client({
  region: STORAGE_CONFIG.region,
  endpoint: STORAGE_CONFIG.endpoint,
  credentials: {
    accessKeyId: STORAGE_CONFIG.accessKey,
    secretAccessKey: STORAGE_CONFIG.secretKey,
  },
  forcePathStyle: true, // Required for S3-compatible storage providers
});

/**
 * Get file stats from Hetzner Object Storage
 */
export async function getFileStats(key: string) {
  try {
    storageLog('debug', 'Getting file stats', { key });

    const command = new HeadObjectCommand({
      Bucket: STORAGE_CONFIG.bucket,
      Key: key,
    });

    const response = await s3Client.send(command);

    return {
      success: true,
      data: {
        size: response.ContentLength || 0,
        lastModified: response.LastModified || new Date(),
        contentType: response.ContentType || 'application/octet-stream',
      },
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    storageLog('error', 'Failed to get file stats', { key, error: err.message });
    return {
      success: false,
      error: 'Failed to get file stats',
    };
  }
}

/**
 * Get file stream from Hetzner Object Storage
 */
export async function getFileStream(key: string, range?: string) {
  try {
    storageLog('debug', 'Getting file stream', { key, range });

    const commandInput: GetObjectCommandInput = {
      Bucket: STORAGE_CONFIG.bucket,
      Key: key,
    };

    if (range) {
      commandInput.Range = range;
    }

    const command = new GetObjectCommand(commandInput);

    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error('No body returned from S3');
    }

    return {
      success: true,
      data: {
        stream: response.Body as ReadableStream,
        contentLength: response.ContentLength || 0,
        contentType: response.ContentType || 'application/octet-stream',
        contentRange: response.ContentRange,
      },
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    storageLog('error', 'Failed to stream file', { key, range, error: err.message });
    return {
      success: false,
      error: 'Failed to stream file',
    };
  }
}

/**
 * Check if a file exists in Hetzner Object Storage
 */
export async function fileExists(key: string): Promise<boolean> {
  try {
    const result = await getFileStats(key);
    return result.success;
  } catch (error) {
    return false;
  }
}

/**
 * Construct the object storage key for an audio file
 */
export function constructAudioKey(category: string, filename: string, format: string): string {
  // For piano files, the naming convention is piano_filename.m4a
  if (category === 'piano') {
    return `piano_${filename}.${format}`;
  }

  // For other categories, use a standard format
  return `${category}_${filename}.${format}`;
}
