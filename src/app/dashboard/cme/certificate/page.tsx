'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const name = searchParams.get('name');
  const date = searchParams.get('date');

  useEffect(() => {
    if (name && date) {
      setCertificateGenerated(true);
    }
  }, [name, date]);

  const handleDownloadCertificate = async () => {
    if (!name || !date) {
      setError('Missing name or date information');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generateCertificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: decodeURIComponent(name),
          date: decodeURIComponent(date),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate');
      }

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CME_Certificate_${name.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!name || !date) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Certificate Information Missing
            </h1>
            <p className="text-gray-600 mb-6">
              Required information for certificate generation is missing.
            </p>
            <Link href="/dashboard/cme">
              <Button>Back to CME Quizzes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Your CME Certificate is Ready!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Congratulations, <strong>{decodeURIComponent(name)}</strong>!
          </p>
          
          <p className="text-gray-600 mb-8">
            You have successfully completed the Hospital Medicine CME program on {decodeURIComponent(date)}.
            Your certificate is ready for download.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Certificate Details</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Program:</strong> Hospital Medicine Cheat Sheets</p>
              <p><strong>Recipient:</strong> {decodeURIComponent(name)}</p>
              <p><strong>Date Completed:</strong> {decodeURIComponent(date)}</p>
              <p><strong>CME Credits:</strong> 1.0 AMA PRA Category 1 Credit™</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button 
              size="lg" 
              onClick={handleDownloadCertificate}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Certificate...
                </>
              ) : (
                <>
                  📋 Download Certificate
                </>
              )}
            </Button>
            
            <div>
              <Link href="/dashboard/cme">
                <Button variant="outline">
                  Back to CME Quizzes
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Your certificate will be saved to your profile for future access.
              <br />
              If you have any issues downloading, please contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 