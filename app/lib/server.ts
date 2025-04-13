// Mark this module as server-only
import 'server-only';

/**
 * Server-side utilities for audio file handling
 * Optimized for performance and type safety
 */

import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';
import { S3Client, HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

// Memoized S3 client instance
const getS3Client = (() => {
  let client: S3Client | null = null;
  return () => {
    if (!client) {
      client = new S3Client({
        region: process.env.STORAGE_REGION || 'eu-central-1',
        endpoint: process.env.STORAGE_ENDPOINT || 'https://hel1.your-objectstorage.com',
        credentials: {
          accessKeyId: process.env.STORAGE_ACCESS_KEY || '',
          secretAccessKey: process.env.STORAGE_SECRET_KEY || '',
        },
        forcePathStyle: true,
      });
    }
    return client;
  };
})();

// Constants
const BUCKET_NAME = process.env.STORAGE_BUCKET_NAME || 'website-audio';
const FALLBACK_AUDIO_PATH = path.join(process.cwd(), 'public', 'audio');

// Type definitions
export interface FileStats {
  size: number;
  lastModified?: Date | undefined;
  contentType?: string | undefined;
}

export interface FileStreamData {
  stream: Readable;
  contentType?: string | undefined;
}

export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type FileStatsResult = Result<FileStats>;
export type FileStreamResult = Result<FileStreamData>;

// Simple logger function
const log = (
  level: 'debug' | 'info' | 'warn' | 'error',
  message: string,
  data?: Record<string, unknown>
) => {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [server-utils] ${message}`, data || '');
};

/**
 * Constructs a standardized audio file key
 */
export function constructAudioKey(
  category: string,
  filename: string,
  format: string = 'm4a'
): string {
  // Remove any leading/trailing slashes and normalize path
  const normalizedCategory = category.replace(/^\/+|\/+$/g, '');
  const normalizedFilename = filename.replace(/^\/+|\/+$/g, '');

  // Add the audio/ prefix to the path
  const prefix = 'audio';

  // Ensure the filename has the instrument prefix and correct extension
  // Current format in the bucket is: piano_nocturne-1.m4a
  const filenameWithPrefix = `${normalizedCategory}_${normalizedFilename}`;
  const filenameWithExt = filenameWithPrefix.endsWith(`.${format}`)
    ? filenameWithPrefix
    : `${filenameWithPrefix}.${format}`;

  return `${prefix}/${normalizedCategory}/${filenameWithExt}`;
}

/**
 * Gets file statistics for the specified audio file
 */
export async function getFileStats(objectKey: string): Promise<FileStatsResult> {
  try {
    // Try S3 first
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
    });

    log('debug', `Checking S3 for file stats`, {
      bucket: BUCKET_NAME,
      key: objectKey,
      endpoint: process.env.STORAGE_ENDPOINT,
      region: process.env.STORAGE_REGION,
    });

    try {
      const response = await getS3Client().send(command);
      log('debug', `S3 file stats retrieved successfully`, {
        key: objectKey,
        contentLength: response.ContentLength,
        contentType: response.ContentType,
      });

      return {
        success: true,
        data: {
          size: response.ContentLength || 0,
          lastModified: response.LastModified || undefined,
          contentType: response.ContentType || undefined,
        },
      };
    } catch (s3Error) {
      log('error', `S3 HeadObject error for ${objectKey}`, {
        error: s3Error instanceof Error ? s3Error.message : 'Unknown error',
        stack: s3Error instanceof Error ? s3Error.stack : undefined,
        bucket: BUCKET_NAME,
      });

      // Fallback to local file system if S3 fails
      log('debug', `Falling back to local filesystem`, {
        path: FALLBACK_AUDIO_PATH,
        fullPath: path.join(FALLBACK_AUDIO_PATH, objectKey),
      });

      const filePath = path.join(FALLBACK_AUDIO_PATH, objectKey);

      try {
        const stats = await fs.promises.stat(filePath);
        log('debug', `Local file stats retrieved successfully`, {
          path: filePath,
          size: stats.size,
        });

        return {
          success: true,
          data: {
            size: stats.size,
            lastModified: stats.mtime,
          },
        };
      } catch (fsError) {
        log('error', `Local filesystem error for ${filePath}`, {
          error: fsError instanceof Error ? fsError.message : 'Unknown error',
        });

        return {
          success: false,
          error: `File not found in S3 or local filesystem: ${objectKey}`,
        };
      }
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: `Failed to get file stats for ${objectKey}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Parse range header string into start and end values
 */
function parseRangeHeader(
  rangeHeader: string
): { start?: number | undefined; end?: number | undefined } | null {
  // Simple string operations instead of regex
  if (!rangeHeader.startsWith('bytes=')) {
    return null;
  }

  const rangeValue = rangeHeader.substring(6); // Remove 'bytes='
  const rangeParts = rangeValue.split('-');

  if (rangeParts.length !== 2) {
    return null;
  }

  const start = rangeParts[0] ? parseInt(rangeParts[0], 10) : undefined;
  const end = rangeParts[1] ? parseInt(rangeParts[1], 10) : undefined;

  if ((start !== undefined && isNaN(start)) || (end !== undefined && isNaN(end))) {
    return null;
  }

  return { start, end };
}

/**
 * Creates a readable stream for the specified audio file
 */
export async function getFileStream(
  objectKey: string,
  rangeHeader?: string
): Promise<FileStreamResult> {
  try {
    // Parse range header if provided
    let range: { start?: number | undefined; end?: number | undefined } | undefined;
    if (rangeHeader) {
      const parsedRange = parseRangeHeader(rangeHeader);
      if (parsedRange) {
        range = parsedRange;
      }
    }

    log('debug', `Attempting to stream file from S3`, {
      bucket: BUCKET_NAME,
      key: objectKey,
      range: rangeHeader || 'none',
    });

    // Try S3 first
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
      Range: rangeHeader,
    });

    try {
      const response = await getS3Client().send(command);

      if (!response.Body) {
        throw new Error('No response body from S3');
      }

      log('debug', `S3 stream created successfully`, {
        key: objectKey,
        contentType: response.ContentType,
        contentLength: response.ContentLength,
      });

      return {
        success: true,
        data: {
          stream: response.Body as Readable,
          contentType: response.ContentType || undefined,
        },
      };
    } catch (s3Error) {
      log('error', `S3 GetObject error for ${objectKey}`, {
        error: s3Error instanceof Error ? s3Error.message : 'Unknown error',
        stack: s3Error instanceof Error ? s3Error.stack : undefined,
        bucket: BUCKET_NAME,
      });

      // Fallback to local file system if S3 fails
      log('debug', `Falling back to local filesystem for streaming`, {
        path: FALLBACK_AUDIO_PATH,
        fullPath: path.join(FALLBACK_AUDIO_PATH, objectKey),
        range: range ? JSON.stringify(range) : 'none',
      });

      const filePath = path.join(FALLBACK_AUDIO_PATH, objectKey);
      const options: { start?: number; end?: number } = {};

      if (range) {
        if (typeof range.start === 'number') options.start = range.start;
        if (typeof range.end === 'number') options.end = range.end;
      }

      try {
        const stream = createReadStream(filePath, options);

        // Add an error handler to catch file not found errors
        const streamPromise = new Promise<Readable>((resolve, reject) => {
          stream.on('error', (err) => {
            log('error', `Local file stream error`, {
              path: filePath,
              error: err.message,
            });
            reject(err);
          });

          // Once we get data, the stream is valid
          stream.on('readable', () => {
            resolve(stream);
          });

          // If the stream ends without becoming readable (empty file)
          stream.on('end', () => {
            resolve(stream);
          });
        });

        await streamPromise;

        log('debug', `Local file stream created successfully`, {
          path: filePath,
        });

        return {
          success: true,
          data: {
            stream,
          },
        };
      } catch (fsError) {
        log('error', `Failed to create local file stream`, {
          path: filePath,
          error: fsError instanceof Error ? fsError.message : 'Unknown error',
        });

        return {
          success: false,
          error: `File not found in S3 or local filesystem: ${objectKey}`,
        };
      }
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: `Failed to create file stream for ${objectKey}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Securely reads a file with path validation
 * This is a server-side only function
 */
export async function readFileSecure(filePath: string) {
  try {
    // Validate path is within project directory
    const resolvedPath = path.resolve(filePath);
    const projectRoot = process.cwd();

    if (!resolvedPath.startsWith(projectRoot)) {
      return {
        success: false,
        error: 'Path traversal attempt detected',
      };
    }

    // Read file
    return new Promise<{ success: boolean; data?: string; error?: string }>((resolve) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          resolve({
            success: false,
            error: err.message,
          });
        } else {
          resolve({
            success: true,
            data,
          });
        }
      });
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error reading file',
    };
  }
}
