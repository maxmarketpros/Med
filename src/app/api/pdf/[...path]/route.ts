import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // For Netlify deployment, redirect to public static files
    const decodedPath = params.path.map(segment => decodeURIComponent(segment));
    const publicPath = `/cheat-sheets/${decodedPath.join('/')}`;
    
    // Validate PDF extension
    if (!publicPath.endsWith('.pdf')) {
      console.error('Not a PDF file:', publicPath);
      return NextResponse.json({ error: 'Not a PDF file' }, { status: 400 });
    }

    // For Netlify deployment, redirect to the static PDF file
    // The PDFs are now served as static files from /public/cheat-sheets/
    console.log('Redirecting to PDF:', publicPath);
    
    return NextResponse.redirect(new URL(publicPath, request.url), 302);
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
