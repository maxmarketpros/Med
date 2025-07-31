'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useActivityTracker } from '@/hooks/useActivityTracker';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { sampleDashboardStats } from '@/data/sampleData';
import { formatDateShort, calculateTimeAgo } from '@/lib/utils';
import { mockPDFCheatSheets } from '@/lib/pdfScanner';

import { CheatSheet } from '@/types';

export default function DashboardPage() {
  const { user } = useUser();
  const { getRecentActivities, getActivityCount, clearActivities } = useActivityTracker();
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get real activity data
  const recentActivities = getRecentActivities(6);
  
  // Use static data for other stats, but use real activity counts and cheat sheet count
  const stats = {
    ...sampleDashboardStats,
    totalCheatSheets: cheatSheets.length,
    recentActivity: recentActivities,
    // Update completed quizzes count based on real activity
    completedQuizzes: getActivityCount('quiz_completed')
  };

  useEffect(() => {
    // Use static data directly instead of API call
    const loadCheatSheets = () => {
      try {
        console.log('Loading cheat sheets from static data');
        setCheatSheets(mockPDFCheatSheets);
        console.log(`Loaded ${mockPDFCheatSheets.length} cheat sheets`);
      } catch (error) {
        console.error('Error loading cheat sheets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCheatSheets();
  }, []);

  const handleClearActivities = () => {
    if (confirm('Are you sure you want to clear all activity history?')) {
      clearActivities();
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz_completed':
        return (
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'cheat_sheet_viewed':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'certificate_downloaded':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'simulator_completed':
        return (
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'cme_credits_earned':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your medical education progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Available Cheat Sheets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCheatSheets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-sky-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Available Tests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.availableTests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Available Patient Simulators</p>
                <p className="text-2xl font-bold text-gray-900">{stats.availablePatientSimulators}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <Link href="/dashboard/cme/final-exam" className="block">
              <div className="flex items-center hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 min-w-0">
                  <p className="text-sm font-medium text-gray-500">Take Final Exam</p>
                  <p className="text-lg font-bold text-emerald-600">Start Now</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/dashboard/cheat-sheets" className="block">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900">Browse Cheat Sheets</h3>
                    <p className="text-sm text-gray-500">Access medical references</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/cme" className="block">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-sky-200 hover:bg-sky-50 transition-colors">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-sky-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900">Take CME Practice Test</h3>
                    <p className="text-sm text-gray-500">Earn continuing education credits</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/cme/certificate" className="block">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-violet-200 hover:bg-violet-50 transition-colors">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-violet-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900">CME Certificate</h3>
                    <p className="text-sm text-gray-500">View and download your certificate</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {recentActivities.length > 0 ? `${recentActivities.length} activities` : 'No activities yet'}
              </span>
              {recentActivities.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearActivities}
                  className="text-xs"
                >
                  Clear History
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {recentActivities.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No recent activities yet</p>
              <p className="text-gray-400 text-xs mt-1">
                Start by viewing cheat sheets, taking quizzes, or completing simulators!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    {activity.details && (
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-sm text-gray-500">
                      {calculateTimeAgo(activity.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 