'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SimulatorsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Interactive Patient Simulators</h1>
        <p className="mt-2 text-gray-600">
          Practice clinical decision-making with realistic patient scenarios.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Available Rooms</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-sky-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Completed Cases</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-violet-100 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-sm font-medium text-gray-500">Average Time</p>
                <p className="text-2xl font-bold text-gray-900">45 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Simulators */}
      <Card>
        <CardHeader>
          <CardTitle>Available Simulators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* ER Room 1 */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-emerald-200 transition-colors bg-gradient-to-r from-emerald-50/50 to-sky-50/50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Heart Failure Management</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 w-fit">
                      Room 252
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Manage a complex case of decompensated heart failure in an elderly patient with multiple comorbidities.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Cardiology
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
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-2 sm:ml-6">
                  <Link href="/dashboard/simulators/er1" className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700">
                      Start Simulation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ER Room 2 */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-emerald-200 transition-colors bg-gradient-to-r from-emerald-50/50 to-sky-50/50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">MRSA Endocarditis</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 w-fit">
                      Room 351
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Diagnose and treat a complex case of MRSA endocarditis in an IV drug user with HIV.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Infectious Disease
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Advanced
                    </span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      60 min
                    </div>
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-2 sm:ml-6">
                  <Link href="/dashboard/simulators/er2" className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700">
                      Start Simulation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ER Room 3 */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-emerald-200 transition-colors bg-gradient-to-r from-emerald-50/50 to-sky-50/50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">COPD Exacerbation with PE</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 w-fit">
                      Room 786
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Manage a patient with COPD exacerbation who develops a pulmonary embolism during hospitalization.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Pulmonology
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
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-2 sm:ml-6">
                  <Link href="/dashboard/simulators/er3" className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700">
                      Start Simulation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 