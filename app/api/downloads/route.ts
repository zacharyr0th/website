import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return new NextResponse('File parameter is missing', { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'content', 'audio', 'sheet-music', file);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const fileName = path.basename(filePath);
    const fileExtension = path.extname(fileName).toLowerCase();

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename=${fileName}`);

    if (fileExtension === '.pdf') {
      headers.set('Content-Type', 'application/pdf');
    } else {
      headers.set('Content-Type', 'application/octet-stream');
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Error serving file: ${error}`);
    return new NextResponse('File not found', { status: 404 });
  }
}
