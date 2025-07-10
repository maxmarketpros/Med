'use client';

import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface QuizInterfaceProps {
  quiz: Quiz;
  onComplete: (answers: number[], score: number) => void;
}

export function QuizInterface({ quiz, onComplete }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const answeredQuestions = answers.filter(answer => answer !== -1).length;

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    setQuizScore(score);
    setShowResults(true);
    onComplete(answers, score);
  };

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
  };

  if (showResults) {
    const passed = quizScore >= quiz.passingScore;
    
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <svg className={`w-8 h-8 ${passed ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                  passed 
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M6 18L18 6M6 6l12 12"
                } />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {passed ? 'Congratulations!' : 'Quiz Complete'}
            </h2>
            
            <p className="text-gray-600 mb-4">
              You scored {quizScore}% ({answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} out of {quiz.questions.length} correct)
            </p>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              passed 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {passed ? `Passed - ${quiz.cmeCredits} CME Credits Earned` : `Failed - ${quiz.passingScore}% Required to Pass`}
            </div>
            
            {passed && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Complete the feedback survey to receive your certificate.
                </p>
                <Button>Continue to Survey</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Review Answers */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Answers</h3>
            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-600">
                        {index + 1}
                      </span>
                      <p className="font-medium text-gray-900">{question.question}</p>
                    </div>
                    
                    <div className="ml-9 space-y-2">
                      {question.options.map((option, optionIndex) => {
                        let optionClass = 'p-3 border rounded-lg ';
                        
                        if (optionIndex === question.correctAnswer) {
                          optionClass += 'border-green-300 bg-green-50 text-green-800';
                        } else if (optionIndex === userAnswer && !isCorrect) {
                          optionClass += 'border-red-300 bg-red-50 text-red-800';
                        } else {
                          optionClass += 'border-gray-200 bg-gray-50 text-gray-700';
                        }
                        
                        return (
                          <div key={optionIndex} className={optionClass}>
                            <div className="flex items-center">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs mr-3">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                              {option}
                              {optionIndex === question.correctAnswer && (
                                <svg className="w-4 h-4 ml-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <svg className="w-4 h-4 ml-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{quiz.title}</h2>
            <span className="text-sm text-gray-500 flex-shrink-0">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
            <span>{answeredQuestions} of {quiz.questions.length} answered</span>
            <span>{quiz.estimatedTime} minutes total</span>
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-medium">
                {currentQuestionIndex + 1}
              </span>
              <h3 className="text-lg font-medium text-gray-900">{currentQuestion.question}</h3>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 border rounded-lg transition-colors ${
                  answers[currentQuestionIndex] === index
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-emerald-500 text-white'
                      : answers[index] !== -1
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {isLastQuestion ? (
              <Button 
                onClick={handleSubmit}
                disabled={answers.includes(-1)}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={answers[currentQuestionIndex] === -1}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 