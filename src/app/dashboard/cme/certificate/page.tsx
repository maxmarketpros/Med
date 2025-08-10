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
import { HtmlCertificate } from '@/components/cme/HtmlCertificate';

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
  const [error, setError] = useState<string | null>(null);
  const [formSubmittedName, setFormSubmittedName] = useState<string | null>(null);
  const [formSubmittedDate, setFormSubmittedDate] = useState<string | null>(null);
  const { addActivity } = useActivityTracker();

  // Move useEffect before any conditional returns to follow Rules of Hook
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

  const handlePrintCertificate = () => {
    // Simple print using window.print() - this will use the existing CSS print media queries
    window.print();

    // Track the certificate print activity
    addActivity(
      'certificate_downloaded',
      'CME Final Exam Certificate (Printed)',
      `Exam Score: ${examResults?.score}% - ${examResults?.correctAnswers}/${examResults?.totalQuestions} correct`
    );
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

  // If user has passed, show the HTML certificate
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Certificate Actions */}
      <div className="text-center mb-8 no-print" style={{pageBreakInside: 'avoid'}}>
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

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handlePrintCertificate}
              className="bg-green-600 hover:bg-green-700"
            >
              🖨️ Print Certificate
            </Button>
            
            <Link href="/dashboard/cme">
              <Button variant="outline">
                Back to CME Tests
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Your certificate is displayed below. Use the Print button to print in landscape mode.
            <br />
            You have earned 10 AAPA Category 1 CME credits. Keep this certificate for your records.
          </p>
        </div>
      </div>

      {/* HTML Certificate */}
      <HtmlCertificate 
        learnerName={getUserName()}
        completionDate={getCertificateDate()}
      />
    </div>
  );
} 