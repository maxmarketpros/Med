import { NextResponse } from 'next/server';
import { scanPDFFiles } from '@/lib/pdfScanner';

export async function GET() {
  try {
    const cheatSheets = await scanPDFFiles();
    return NextResponse.json(cheatSheets);
  } catch (error) {
    console.error('Error fetching cheat sheets:', error);
    return NextResponse.json({ error: 'Failed to fetch cheat sheets' }, { status: 500 });
  }
}
