/**
 * Server-side utilities for audio file handling
 * Optimized for performance and type safety
 */

import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';
import { S3Client, HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

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

// Simple logger function
/* const log = (
  level: 'debug' | 'info' | 'warn' | 'error',
  message: string,
  data?: Record<string, unknown>
) => {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [server-utils] ${message}`, data || '');
}; */

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

    try {
      const response = await getS3Client().send(command);
      return {
        success: true,
        data: {
          size: response.ContentLength || 0,
          lastModified: response.LastModified || undefined,
          contentType: response.ContentType || undefined,
        },
      };
    } catch (s3Error) {
      // Fallback to local file system if S3 fails
      const filePath = path.join(FALLBACK_AUDIO_PATH, objectKey);

      try {
        const stats = await fs.promises.stat(filePath);
        return {
          success: true,
          data: {
            size: stats.size,
            lastModified: stats.mtime,
          },
        };
      } catch (fsError) {
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

      return {
        success: true,
        data: {
          stream: response.Body as Readable,
          contentType: response.ContentType || undefined,
        },
      };
    } catch (s3Error) {
      // Fallback to local file system if S3 fails
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
          stream.on('error', (err) => reject(err));
          stream.on('readable', () => resolve(stream));
          stream.on('end', () => resolve(stream));
        });

        await streamPromise;

        return {
          success: true,
          data: {
            stream,
          },
        };
      } catch (fsError) {
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
