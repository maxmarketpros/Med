'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { sampleQuizzes, sampleCertificates } from '@/data/sampleData';
import { formatDateShort } from '@/lib/utils';

export default function CMEPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCreditsEarned = sampleCertificates.reduce((sum, cert) => sum + cert.cmeCredits, 0);
  const totalCreditsAvailable = sampleQuizzes.reduce((sum, quiz) => sum + quiz.cmeCredits, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CME Quizzes</h1>
        <p className="mt-2 text-gray-600">
          Take AAPA-accredited continuing medical education quizzes to earn credits and certificates.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Credits Earned</p>
                <p className="text-2xl font-bold text-gray-900">{totalCreditsEarned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-sky-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Total Available</p>
                <p className="text-2xl font-bold text-gray-900">{totalCreditsAvailable}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-violet-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Quizzes Completed</p>
                <p className="text-2xl font-bold text-gray-900">{sampleCertificates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle>Available Quizzes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleQuizzes.map((quiz) => {
              const isCompleted = sampleCertificates.some(cert => cert.quizId === quiz.id);
              
              return (
                <div 
                  key={quiz.id} 
                  className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{quiz.title}</h3>
                        {isCompleted && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Completed
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{quiz.description}</p>
                      
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {quiz.specialty}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.estimatedTime} min
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.cmeCredits} CME
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 col-span-2 sm:col-span-1">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                          {quiz.questions.length} Questions
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Passing Score: {quiz.passingScore}%
                      </p>
                    </div>
                    
                    <div className="flex sm:flex-col gap-2 sm:ml-6">
                      <Link href={`/dashboard/cme/${quiz.id}`} className="flex-1 sm:flex-none">
                        <Button variant={isCompleted ? 'outline' : 'primary'} className="w-full sm:w-auto">
                          {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                        </Button>
                      </Link>
                      {isCompleted && (
                        <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                          View Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Certificates */}
      {sampleCertificates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleCertificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{cert.quizTitle}</h4>
                      <p className="text-sm text-gray-500">
                        {cert.cmeCredits} CME Credits • Generated {formatDateShort(cert.generatedAt)}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 