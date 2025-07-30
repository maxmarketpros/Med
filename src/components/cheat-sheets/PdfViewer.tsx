'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

export default function PdfViewer({ pdfUrl, title }: PdfViewerProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Properly encode the PDF URL
  const encodedPdfUrl = pdfUrl.split('/').map(segment => encodeURIComponent(segment)).join('/');
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open(encodedPdfUrl, '_blank');
  };

  if (iframeError) {
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
              onClick={openInNewTab}
            >
              Open in New Tab
            </Button>
          </div>
        </div>
        <div className="p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">PDF Preview Unavailable</h3>
          <p className="text-gray-600 mb-4">
            Unable to display the PDF inline. You can still download or open it in a new tab.
          </p>
          <div className="space-x-4">
            <Button onClick={openInNewTab}>
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={() => {
              const link = document.createElement('a');
              link.href = encodedPdfUrl;
              link.download = title + '.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            onClick={openInNewTab}
          >
            Open in New Tab
          </Button>
        </div>
      </div>
      <div className="relative w-full h-screen">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <span className="ml-3 text-gray-600">Loading PDF...</span>
          </div>
        )}
        <iframe
          src={`${encodedPdfUrl}#view=FitH`}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title={title}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
} 