import { NextResponse } from 'next/server';
import { scanPDFFiles } from '@/lib/pdfScanner';

export async function GET() {
  try {
    const cheatSheets = await scanPDFFiles();
    
    return NextResponse.json(cheatSheets, {
      headers: {
        // Cache for 5 minutes in browser and at the edge
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API Error in /api/cheat-sheets:', error);
    
    // Return empty array as a fallback
    return NextResponse.json([], {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
