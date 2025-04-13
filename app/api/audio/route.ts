import { NextRequest, NextResponse } from 'next/server';
import { constructAudioKey, getFileStats, getFileStream } from './utils';

/**
 * GET /api/audio/[category]/[filename]
 * Streams audio files with support for range requests
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { category: string; filename: string } }
) {
  const { category, filename } = params;
  const key = constructAudioKey(category, filename);
  const rangeHeader = request.headers.get('range');

  // Get file stats first
  const stats = await getFileStats(key);
  if (!stats.success || !stats.data) {
    return NextResponse.json({ error: stats.error || 'File not found' }, { status: 404 });
  }

  // Handle range request
  if (rangeHeader) {
    const result = await getFileStream(key, rangeHeader);
    if (!result.success || !result.data) {
      return NextResponse.json({ error: result.error || 'Failed to stream file' }, { status: 500 });
    }

    const { stream, contentType } = result.data;
    const headers = new Headers({
      'Content-Type': contentType || 'audio/mpeg',
      'Accept-Ranges': 'bytes',
    });

    return new NextResponse(stream as unknown as ReadableStream, {
      status: 206,
      headers,
    });
  }

  // Handle full file request
  const result = await getFileStream(key);
  if (!result.success || !result.data) {
    return NextResponse.json({ error: result.error || 'Failed to stream file' }, { status: 500 });
  }

  const { stream, contentType } = result.data;
  const headers = new Headers({
    'Content-Type': contentType || 'audio/mpeg',
    'Content-Length': stats.data.size.toString(),
    'Accept-Ranges': 'bytes',
  });

  return new NextResponse(stream as unknown as ReadableStream, {
    status: 200,
    headers,
  });
}

/**
 * HEAD /api/audio/[category]/[filename]
 * Returns metadata about the audio file
 */
export async function HEAD(
  _request: NextRequest,
  { params }: { params: { category: string; filename: string } }
) {
  const { category, filename } = params;
  const key = constructAudioKey(category, filename);

  const stats = await getFileStats(key);
  if (!stats.success || !stats.data) {
    return NextResponse.json({ error: stats.error || 'File not found' }, { status: 404 });
  }

  const headers = new Headers({
    'Content-Length': stats.data.size.toString(),
    'Content-Type': stats.data.contentType || 'audio/mpeg',
    'Last-Modified': stats.data.lastModified?.toUTCString() || new Date().toUTCString(),
  });

  return new NextResponse(null, {
    status: 200,
    headers,
  });
}
