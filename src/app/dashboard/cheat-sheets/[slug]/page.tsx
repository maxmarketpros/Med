'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheatSheet } from '@/types';
import { toTitleCase } from '@/lib/utils';
import { mockPDFCheatSheets } from '@/lib/pdfScanner';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import PdfViewer from '@/components/cheat-sheets/PdfViewer';

export default function CheatSheetDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addActivity } = useActivityTracker();
  
  const [cheatSheet, setCheatSheet] = useState<CheatSheet | null>(null);
  const [relatedSheets, setRelatedSheets] = useState<CheatSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    const loadData = () => {
      try {
        console.log('Loading cheat sheet from static data for slug:', slug);
        
        // Find the specific sheet by slug
        const foundSheet = mockPDFCheatSheets.find(sheet => sheet.slug === slug);
        if (!foundSheet) {
          setError('Cheat sheet not found');
          return;
        }
        
        setCheatSheet(foundSheet);
        
        // Track the cheat sheet view activity (only once per load)
        if (!hasTrackedView) {
          addActivity('cheat_sheet_viewed', foundSheet.title);
          setHasTrackedView(true);
        }
        
        // Find related sheets (same specialty or common tags)
        const related = mockPDFCheatSheets
          .filter(sheet => 
            sheet.id !== foundSheet.id && 
            (sheet.specialty === foundSheet.specialty || 
             sheet.tags.some(tag => foundSheet.tags.includes(tag)))
          )
          .slice(0, 4);
        
        setRelatedSheets(related);
        console.log(`Loaded cheat sheet: ${foundSheet.title} with ${related.length} related sheets`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug, addActivity, hasTrackedView]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Link href="/dashboard/cheat-sheets" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Library
          </Link>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error || !cheatSheet) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cheat Sheet Not Found</h1>
        <p className="text-gray-600 mb-6">{error || 'The requested cheat sheet could not be found.'}</p>
        <Link href="/dashboard/cheat-sheets">
          <Button>Back to Library</Button>
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    if (!cheatSheet) return;
    
    // Properly encode the PDF URL
    const encodedFilePath = cheatSheet.filePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
    
    const link = document.createElement('a');
    link.href = encodedFilePath;
    link.download = cheatSheet.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!cheatSheet) return;
    
    // Properly encode the PDF URL
    const encodedFilePath = cheatSheet.filePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
    window.open(encodedFilePath, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link href="/dashboard/cheat-sheets" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl card-shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{toTitleCase(cheatSheet.title)}</h1>
            <p className="text-gray-600 mb-4">{cheatSheet.description}</p>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                {toTitleCase(cheatSheet.specialty)}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cheatSheet.estimatedReadTime} min read
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {cheatSheet.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {toTitleCase(tag)}
                </span>
              ))}
            </div>
          </div>

          <div className="ml-6 flex flex-col space-y-2">
            <Button onClick={handleDownload}>Download PDF</Button>
            <Button variant="outline" onClick={handlePrint}>Open in New Tab</Button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <PdfViewer
        pdfUrl={cheatSheet.filePath}
        title={toTitleCase(cheatSheet.title)}
      />

      {/* Related Cheat Sheets */}
      {relatedSheets.length > 0 && (
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Cheat Sheets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedSheets.map((relatedSheet) => (
                <Link 
                  key={relatedSheet.id}
                  href={`/dashboard/cheat-sheets/${relatedSheet.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{toTitleCase(relatedSheet.title)}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedSheet.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-600">{toTitleCase(relatedSheet.specialty)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
