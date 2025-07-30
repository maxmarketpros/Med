'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { sampleQuizzes } from '@/data/sampleData';
import { QuizInterface } from '@/components/cme/QuizInterface';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useActivityTracker } from '@/hooks/useActivityTracker';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;
  const { addActivity } = useActivityTracker();
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const quiz = sampleQuizzes.find(q => q.id === quizId);

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
        <p className="text-gray-600 mb-6">The requested quiz could not be found.</p>
        <Link href="/dashboard/cme">
          <Button>Back to CME Quizzes</Button>
        </Link>
      </div>
    );
  }

  const handleQuizComplete = (answers: number[], score: number) => {
    setQuizCompleted(true);
    
    // Track the quiz completion activity
    addActivity(
      'quiz_completed',
      quiz.title,
      `Score: ${score}% (${answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length}/${quiz.questions.length} correct)`
    );
    
    // In a real app, you would save the quiz results to a database
    console.log('Quiz completed:', { quizId, answers, score });
  };

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

  if (quizStarted) {
    return <QuizInterface quiz={quiz} onComplete={handleQuizComplete} />;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link href="/dashboard/cme" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to CME Quizzes
        </Link>
      </div>

      {/* Quiz Information */}
      <Card>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{quiz.description}</p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                {quiz.specialty}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {quiz.estimatedTime} minutes
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                {quiz.questions.length} Questions
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {quiz.cmeCredits} CME Credits
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <h3 className="font-medium text-blue-900 mb-2">Quiz Instructions</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• You need to score {quiz.passingScore}% or higher to pass and earn CME credits</li>
                <li>• You can navigate between questions and change your answers before submitting</li>
                <li>• After passing, you'll complete a brief survey to receive your certificate</li>
                <li>• All questions must be answered before you can submit the quiz</li>
              </ul>
            </div>
            
            <Button size="lg" onClick={() => setQuizStarted(true)}>
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 