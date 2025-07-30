'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

export default function PdfViewer({ pdfUrl, title }: PdfViewerProps) {
  return (
    <div className="bg-white rounded-xl card-shadow overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {title}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(pdfUrl, '_blank')}
          >
            Open in New Tab
          </Button>
        </div>
      </div>
      <div className="w-full h-screen">
        <iframe
          src={`${pdfUrl}#view=FitH`}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title={title}
        />
      </div>
    </div>
  );
} 