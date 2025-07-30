import { NextResponse } from 'next/server';
import { scanPDFFiles } from '@/lib/pdfScanner';

export async function GET() {
  console.log('=== API Route /api/cheat-sheets called ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('NETLIFY env var:', process.env.NETLIFY);
  console.log('Request timestamp:', new Date().toISOString());
  
  try {
    console.log('API: Calling scanPDFFiles...');
    const cheatSheets = await scanPDFFiles();
    console.log(`API: Successfully retrieved ${cheatSheets.length} cheat sheets`);
    
    if (cheatSheets.length > 0) {
      console.log('Sample cheat sheet titles:', cheatSheets.slice(0, 3).map(s => s.title));
    } else {
      console.error('API: WARNING - No cheat sheets returned from scanPDFFiles!');
    }
    
    const response = NextResponse.json(cheatSheets, {
      headers: {
        'Cache-Control': 'public, max-age=300',
        'Content-Type': 'application/json',
      },
    });
    
    console.log('API: Returning response with', cheatSheets.length, 'items');
    return response;
    
  } catch (error) {
    console.error('API: Critical error in /api/cheat-sheets:', error);
    console.error('API: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Return empty array as fallback instead of error
    const response = NextResponse.json([], {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('API: Returning empty array due to error');
    return response;
  }
}
