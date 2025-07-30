import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, date } = body;

    if (!name || !date) {
      return NextResponse.json(
        { error: 'Name and date are required' },
        { status: 400 }
      );
    }

    // Load the DOCX template
    const templatePath = path.join(process.cwd(), 'public', 'templates', 'CME_credit_certificate_template.docx');
    
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: 'Certificate template not found' },
        { status: 404 }
      );
    }

    const templateBuffer = fs.readFileSync(templatePath);

    // Create a new zip instance
    const zip = new PizZip(templateBuffer);

    // Create a new docxtemplater instance
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Replace template variables
    doc.setData({
      name: name,
      date: date,
    });

    try {
      // Render the document
      doc.render();
    } catch (error) {
      console.error('Error rendering document:', error);
      return NextResponse.json(
        { error: 'Failed to render certificate template' },
        { status: 500 }
      );
    }

    // Get the generated buffer
    const generatedBuffer = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    // For now, we'll return the DOCX directly
    // In production, you might want to convert to PDF using additional libraries
    const fileName = `CME_Certificate_${name.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;

    return new NextResponse(generatedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': generatedBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Certificate generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const date = searchParams.get('date');

  if (!name || !date) {
    return NextResponse.json(
      { error: 'Name and date parameters are required' },
      { status: 400 }
    );
  }

  // Call the POST method with the same logic
  return POST(request);
} 