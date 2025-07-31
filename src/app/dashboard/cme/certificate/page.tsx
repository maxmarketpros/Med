'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUser } from '@clerk/nextjs';
import { useSubscription } from '@/hooks/useSubscription';
import { UpgradePrompt } from '@/components/ui/UpgradePrompt';
import { formatDate } from '@/lib/utils';
import { useActivityTracker } from '@/hooks/useActivityTracker';

interface ExamResults {
  completed: boolean;
  passed: boolean;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  userId: string;
}

export default function CertificatePage() {
  const { user } = useUser();
  const { hasAccess, loading } = useSubscription();
  const [examResults, setExamResults] = useState<ExamResults | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [formSubmittedName, setFormSubmittedName] = useState<string | null>(null);
  const [formSubmittedDate, setFormSubmittedDate] = useState<string | null>(null);
  const { addActivity } = useActivityTracker();

  // Move useEffect before any conditional returns to follow Rules of Hooks
  useEffect(() => {
    // First, check for URL parameters from form submission
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    const dateParam = urlParams.get('date');
    
    if (nameParam && dateParam) {
      setFormSubmittedName(decodeURIComponent(nameParam));
      setFormSubmittedDate(decodeURIComponent(dateParam));
    }

    // Check localStorage for exam completion status
    const savedResults = localStorage.getItem('finalExamResults');
    if (savedResults) {
      try {
        const results = JSON.parse(savedResults);
        setExamResults(results);
      } catch (error) {
        console.error('Error parsing exam results:', error);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!hasAccess('all_access')) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CME Certificate</h1>
          <p className="mt-2 text-gray-600">
            Download your official CME certificate after completing the final exam.
          </p>
        </div>

        <UpgradePrompt 
          title="CME Certificate - All-Access Required"
          description="Complete the CME final exam and download your official certificate with the All-Access plan."
          feature="CME Certificates"
        />
      </div>
    );
  }

  const getUserName = () => {
    // Use form-submitted name if available (from evaluation form)
    if (formSubmittedName) {
      return formSubmittedName;
    }
    
    // Fallback to Clerk user data
    if (!user) return 'Student';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses[0]?.emailAddress || 'Student';
  };

  const getCertificateDate = () => {
    // Use form-submitted date if available
    if (formSubmittedDate) {
      return formSubmittedDate;
    }
    
    // Fallback to exam completion date
    if (examResults?.completedAt) {
      return new Date(examResults.completedAt).toLocaleDateString();
    }
    
    return new Date().toLocaleDateString();
  };

  const handleDownloadCertificate = async () => {
    if (!user || !examResults) {
      setError('Missing user or exam information');
      return;
    }

    const userName = getUserName();

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generateCertificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          date: getCertificateDate(),
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
      a.download = `CME_Certificate_${userName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Track the certificate download activity
      addActivity(
        'certificate_downloaded',
        'CME Final Exam Certificate',
        `Exam Score: ${examResults.score}% - ${examResults.correctAnswers}/${examResults.totalQuestions} correct`
      );

    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // If user hasn't passed the exam, show requirement message
  if (!examResults || !examResults.completed || !examResults.passed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              CME Certificate Not Available
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              You must pass the Hospital Medicine Final Exam with a score of 70% or higher to earn your CME certificate and <strong>10 AAPA Category 1 CME credits</strong>.
            </p>
            
            {examResults && examResults.completed && !examResults.passed && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <p className="text-red-800 text-sm mb-2">
                  <strong>Previous Attempt:</strong> {examResults.score}% ({examResults.correctAnswers}/{examResults.totalQuestions} correct)
                </p>
                <p className="text-red-700 text-sm">
                  You can retake the exam to improve your score.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Link href="/dashboard/cme/final-exam">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  {examResults && examResults.completed ? 'Retake Final Exam' : 'Take Final Exam'}
                </Button>
              </Link>
              
              <div>
                <Link href="/dashboard/cme">
                  <Button variant="outline">
                    Back to CME Tests
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user has passed, show certificate options
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
            Congratulations, <strong>{getUserName()}</strong>!
          </p>
          
          <p className="text-gray-600 mb-8">
            You have successfully completed the Hospital Medicine Final Exam with a score of <strong>{examResults.score}%</strong> on {getCertificateDate()}.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Certificate Details</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Program:</strong> Hospital Medicine Final Exam</p>
              <p><strong>Recipient:</strong> {getUserName()}</p>
              <p><strong>Date Completed:</strong> {getCertificateDate()}</p>
              <p><strong>Score:</strong> {examResults.score}% ({examResults.correctAnswers}/{examResults.totalQuestions} correct)</p>
              <p><strong>CME Credits:</strong> 10 AAPA Category 1 CME Credits</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    Generating...
                  </>
                ) : (
                  <>
                    📋 Download Certificate
                  </>
                )}
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                onClick={handlePrintCertificate}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                🖨️ Print Certificate
              </Button>
            </div>
            
            <div>
              <Link href="/dashboard/cme">
                <Button variant="outline">
                  Back to CME Tests
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Keep this certificate for your CME records. You have earned 10 AAPA Category 1 CME credits.
              <br />
              If you have any issues, please contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 