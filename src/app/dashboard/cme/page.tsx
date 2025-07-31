'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSubscription } from '@/hooks/useSubscription';
import { UpgradePrompt } from '@/components/ui/UpgradePrompt';

export default function CMEPage() {
  const { hasAccess, loading } = useSubscription();

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CME Tests</h1>
          <p className="mt-2 text-gray-600">
            Take AAPA Category 1 CME hospital medicine tests to earn CME credits and certificates.
          </p>
        </div>

        <UpgradePrompt 
          title="CME Tests - All-Access Required"
          description="Access comprehensive CME tests and earn 10 AAPA Category 1 CME credits with the All-Access plan."
          feature="CME Tests and Certificates"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CME Tests</h1>
        <p className="mt-2 text-gray-600">
          Take AAPA Category 1 CME hospital medicine tests to earn CME credits and certificates.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Practice Test</p>
                <p className="text-2xl font-bold text-gray-900">25 Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-sky-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Final Exam</p>
                <p className="text-2xl font-bold text-gray-900">74 Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-violet-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">CME Credits</p>
                <p className="text-2xl font-bold text-gray-900">10 AAPA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Available Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Temporary CME Test Button */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-yellow-900 line-clamp-2">🧪 Test CME Generation (TEMPORARY)</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 w-fit">
                      DEV ONLY
                    </span>
                  </div>
                  
                  <p className="text-yellow-800 mb-4 line-clamp-3">
                    Click this button to simulate passing the final exam with 75% score and test the certificate generation flow.
                    This will skip the actual test and take you directly to the form and PDF generation.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-yellow-700">
                    <span className="px-2 py-1 bg-yellow-100 rounded">⚡ Instant Pass</span>
                    <span className="px-2 py-1 bg-yellow-100 rounded">📋 Form Test</span>
                    <span className="px-2 py-1 bg-yellow-100 rounded">📄 PDF Generation</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <button
                    onClick={() => {
                      // Create fake exam results that simulate a passing score
                      const fakeExamResults = {
                        completed: true,
                        passed: true,
                        score: 75,
                        totalQuestions: 74,
                        correctAnswers: 56,
                        completedAt: new Date().toISOString(),
                        userId: 'test-user'
                      };
                      
                      // Store in localStorage
                      localStorage.setItem('finalExamResults', JSON.stringify(fakeExamResults));
                      
                      // Track fake completion activity
                      const activityData = {
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                        type: 'quiz_completed',
                        title: 'CME Final Exam (TEST)',
                        date: new Date().toISOString(),
                        details: 'Score: 75% (56/74 correct) - PASSED (TEST MODE)'
                      };
                      
                      // Add to existing activities
                      const existingActivities = JSON.parse(localStorage.getItem('userActivities') || '[]');
                      const updatedActivities = [activityData, ...existingActivities].slice(0, 50);
                      localStorage.setItem('userActivities', JSON.stringify(updatedActivities));
                      
                      // Redirect to evaluation form (proper flow)
                      window.location.href = '/dashboard/cme/final-evaluation';
                    }}
                    className="bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-yellow-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    🚀 Test Certificate Generation
                  </button>
                </div>
              </div>
            </div>

            {/* Practice Test */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-emerald-200 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">Hospital Medicine Practice Test</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Practice
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Test your knowledge with 25 high-yield hospital medicine questions. Perfect for practicing before the final exam. 
                    No CME credits awarded - use this to identify knowledge gaps and prepare for success.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Hospital Medicine
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Intermediate
                    </span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      45 min
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      25 Questions
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 col-span-2 sm:col-span-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z" />
                      </svg>
                      No CME Credits
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Passing Score: 70% • Unlimited attempts
                  </p>
                </div>
                
                <div className="flex sm:flex-col gap-2 sm:ml-6">
                  <Link href="/dashboard/cme/practice-test" className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Start Practice Test
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Final Exam */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-emerald-200 transition-colors bg-gradient-to-r from-emerald-50 to-sky-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">Hospital Medicine Final Exam</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 w-fit">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      CME Eligible
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Comprehensive hospital medicine final exam with 74 case-based questions covering all major specialties. 
                    Pass with 70% or higher to earn 10 AAPA Category 1 CME credits possible and receive your official certificate.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Hospital Medicine
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Advanced
                    </span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      180 min
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      10 CME Credits
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 col-span-2 sm:col-span-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      74 Questions
                    </div>
                  </div>
                  
                  <div className="bg-white border border-emerald-200 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-emerald-800 mb-1">Learning Objectives:</p>
                    <ul className="text-xs text-emerald-700 space-y-0.5">
                      <li>• Apply guideline-based management for acute hospital medicine conditions</li>
                      <li>• Differentiate critical interventions in life-threatening scenarios</li>
                      <li>• Integrate diagnostic reasoning with therapeutic decision-making</li>
                    </ul>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Passing Score: 70% • 10 AAPA Category 1 CME credits possible • Certificate provided upon passing
                  </p>
                </div>
                
                <div className="flex sm:flex-col gap-2 sm:ml-6">
                  <Link href="/dashboard/cme/final-exam" className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700">
                      Take Final Exam
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>About CME Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Practice Test</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 25 practice questions</li>
                <li>• Immediate feedback and explanations</li>
                <li>• Unlimited attempts</li>
                <li>• No CME credits awarded</li>
                <li>• Perfect for exam preparation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Final Exam</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 74 comprehensive questions</li>
                <li>• 10 AAPA Category 1 CME credits possible</li>
                <li>• Official certificate upon passing</li>
                <li>• 70% passing score required</li>
                <li>• Post-test evaluation required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 