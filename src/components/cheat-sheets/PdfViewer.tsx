'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/Button';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker - use local worker file instead of CDN
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/_next/static/js/pdf.worker.min.mjs';
}

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

export default function PdfViewer({ pdfUrl, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadTimeout, setLoadTimeout] = useState<boolean>(false);
  const [documentLoading, setDocumentLoading] = useState<boolean>(true);

  // Memoize the encoded URL to prevent re-rendering loops
  const encodedPdfUrl = useMemo(() => {
    try {
      // Handle already encoded URLs and properly encode spaces
      const cleanUrl = decodeURIComponent(pdfUrl);
      return encodeURIComponent(cleanUrl).replace(/%2F/g, '/');
    } catch {
      // If decoding fails, just encode the original URL
      return encodeURIComponent(pdfUrl).replace(/%2F/g, '/');
    }
  }, [pdfUrl]);

  // Debug logging - only log when URL changes
  useEffect(() => {
    console.log('🔄 PdfViewer URL changed:', pdfUrl);
    console.log('🔗 Encoded URL:', encodedPdfUrl);
    console.log('⚙️  PDF.js worker src:', pdfjs.GlobalWorkerOptions.workerSrc);
  }, [pdfUrl, encodedPdfUrl]);

  // Set a timeout for loading - separate effect to avoid dependency issues
  useEffect(() => {
    if (!loading && !documentLoading) return;

    const timeout = setTimeout(() => {
      console.log('PDF loading timeout - attempting fallback');
      setLoadTimeout(true);
      setLoading(false);
      setDocumentLoading(false);
    }, 10000); // Reduced to 10 seconds

    return () => clearTimeout(timeout);
  }, [loading, documentLoading]);

  // Reset states when URL changes
  useEffect(() => {
    setLoading(true);
    setDocumentLoading(true);
    setError(null);
    setLoadTimeout(false);
    setPageNumber(1);
    setNumPages(0);
  }, [pdfUrl]); // Only depend on pdfUrl, not encodedPdfUrl

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    console.log('✅ PDF loaded successfully with', numPages, 'pages');
    setNumPages(numPages);
    setLoading(false);
    setDocumentLoading(false);
    setError(null);
    setLoadTimeout(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('❌ Error loading PDF:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
    setDocumentLoading(false);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber(page => Math.max(1, page - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber(page => Math.min(numPages, page + 1));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale(scale => Math.min(2.0, scale + 0.2));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(scale => Math.max(0.5, scale - 0.2));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1.0);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setLoadTimeout(false);
    setLoading(true);
    setDocumentLoading(true);
  }, []);

  // Show loading state
  if ((loading || documentLoading) && !loadTimeout && !error) {
    return (
      <div className="bg-white rounded-xl card-shadow overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading PDF...</p>
            <p className="text-sm text-gray-400 mt-2">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to iframe if react-pdf fails to load
  if (loadTimeout || error) {
    return (
      <div className="bg-white rounded-xl card-shadow overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {title} {error ? '(Fallback viewer - Error occurred)' : '(Fallback viewer - Loading timeout)'}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(pdfUrl, '_blank')}
              >
                Open in New Tab
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
              >
                Retry
              </Button>
            </div>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-600">
              Error: {error}
            </div>
          )}
        </div>
        <div className="w-full h-screen">
          <iframe
            src={`${pdfUrl}#view=FitH`}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title={title}
            onLoad={() => console.log('Iframe loaded successfully')}
            onError={() => console.error('Iframe failed to load')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl card-shadow overflow-hidden">
      {/* PDF Controls */}
      <div className="border-b border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:space-x-4">
            {/* Page Navigation */}
            <div className="flex items-center justify-center xs:justify-start space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              <span className="text-sm text-gray-700 min-w-0 px-2">
                Page {pageNumber} of {numPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-center xs:justify-start space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.5}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
                className="min-w-[60px]"
              >
                {Math.round(scale * 100)}%
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 2.0}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-500 text-center sm:text-left truncate">
            {title}
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="pdf-viewer-container overflow-auto" style={{ maxHeight: '80vh' }}>
        <div className="flex justify-center p-4 bg-gray-50">
          <Document
            file={{
              url: encodedPdfUrl,
            }}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading PDF content...</p>
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
              onLoadSuccess={() => console.log(`Page ${pageNumber} loaded successfully`)}
              onLoadError={(error) => console.error(`Error loading page ${pageNumber}:`, error)}
            />
          </Document>
        </div>
      </div>

      {/* Page Navigation at Bottom */}
      {numPages > 1 && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber(1)}
              disabled={pageNumber === 1}
            >
              First
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              Previous
            </Button>
            
            <span className="text-sm text-gray-700 px-4">
              {pageNumber} / {numPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              Next
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber(numPages)}
              disabled={pageNumber === numPages}
            >
              Last
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 