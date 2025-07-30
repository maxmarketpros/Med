import { NextResponse } from 'next/server';
import { scanPDFFiles } from '@/lib/pdfScanner';

export async function GET() {
  try {
    console.log('API: Fetching cheat sheets...');
    const cheatSheets = await scanPDFFiles();
    console.log(`API: Successfully retrieved ${cheatSheets.length} cheat sheets`);
    
    return NextResponse.json(cheatSheets, {
      headers: {
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API: Error fetching cheat sheets:', error);
    
    // Return empty array as fallback instead of error
    return NextResponse.json([], {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
