'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

// Mobile device detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice || (isTouchDevice && isSmallScreen));
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
}

export default function PdfViewer({ pdfUrl, title }: PdfViewerProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

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

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = encodedPdfUrl;
    link.download = title + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mobile-optimized PDF viewer
  if (isMobile) {
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
              Open PDF
            </Button>
          </div>
        </div>
        <div className="p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">View PDF on Mobile</h3>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            For the best experience on mobile devices, view or download the PDF using the buttons below.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={openInNewTab}
              className="w-full sm:w-auto"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </Button>
            <div className="text-gray-400 text-sm">or</div>
            <Button 
              variant="outline" 
              onClick={downloadPdf}
              className="w-full sm:w-auto"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </Button>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              💡 <strong>Tip:</strong> Most mobile browsers will open PDFs in a dedicated viewer for better readability.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop fallback with iframe error handling
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
            <Button variant="outline" onClick={downloadPdf}>
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop iframe viewer
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