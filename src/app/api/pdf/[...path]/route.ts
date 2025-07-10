import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Decode URI components to handle special characters properly
    const decodedPath = params.path.map(segment => decodeURIComponent(segment));
    const filePath = path.join(process.cwd(), 'cheat-sheets', ...decodedPath);
    
    // Security: ensure the file is within the cheat-sheets directory
    const resolvedPath = path.resolve(filePath);
    const cheatSheetsDir = path.resolve(path.join(process.cwd(), 'cheat-sheets'));
    
    if (!resolvedPath.startsWith(cheatSheetsDir)) {
      console.error('Access denied for path:', resolvedPath);
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (!fs.existsSync(resolvedPath)) {
      console.error('File not found:', resolvedPath);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    if (!resolvedPath.endsWith('.pdf')) {
      console.error('Not a PDF file:', resolvedPath);
      return NextResponse.json({ error: 'Not a PDF file' }, { status: 400 });
    }

    console.log('Serving PDF:', resolvedPath);
    const fileBuffer = fs.readFileSync(resolvedPath);
    const fileName = path.basename(resolvedPath);
    const fileStats = fs.statSync(resolvedPath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': fileStats.size.toString(),
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'Accept-Ranges': 'bytes',
        // CORS headers to prevent loading issues
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Range, Content-Type',
        // Additional headers for PDF.js compatibility
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Opener-Policy': 'cross-origin',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
