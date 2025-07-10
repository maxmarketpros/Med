'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { sampleDashboardStats } from '@/data/sampleData';
import { formatDateShort, calculateTimeAgo } from '@/lib/utils';
import { CheatSheet } from '@/types';

export default function DashboardPage() {
  const { user } = useUser();
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Use static data for other stats, but fetch real cheat sheet count
  const stats = {
    ...sampleDashboardStats,
    totalCheatSheets: cheatSheets.length
  };

  useEffect(() => {
    const fetchCheatSheets = async () => {
      try {
        const response = await fetch('/api/cheat-sheets');
        if (response.ok) {
          const data = await response.json();
          setCheatSheets(data);
        }
      } catch (error) {
        console.error('Error fetching cheat sheets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheatSheets();
  }, []);

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
          <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case 'certificate_downloaded':
        return (
          <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {user?.name.split(' ')[0]}!
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
                <p className="text-sm font-medium text-gray-500">Completed Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedQuizzes}</p>
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
                <p className="text-sm font-medium text-gray-500">CME Credits Earned</p>
                <p className="text-2xl font-bold text-gray-900">{stats.earnedCredits}</p>
              </div>
            </div>
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

            <Link href="/dashboard/profile" className="block">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-violet-200 hover:bg-violet-50 transition-colors">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-violet-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900">View Profile</h3>
                    <p className="text-sm text-gray-500">Manage your account</p>
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
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
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
        </CardContent>
      </Card>
    </div>
  );
} 