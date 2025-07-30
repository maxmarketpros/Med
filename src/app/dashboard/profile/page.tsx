'use client';

import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { sampleCertificates, sampleDashboardStats } from '@/data/sampleData';
import { formatDateShort, formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useUser();
  const [downloadingCert, setDownloadingCert] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Profile...</h1>
      </div>
    );
  }

  const stats = sampleDashboardStats;

  const handleDownloadCertificate = async (cert: any) => {
    setDownloadingCert(cert.id);
    
    try {
      const response = await fetch('/api/generateCertificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          date: new Date(cert.generatedAt).toLocaleDateString(),
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
      a.download = `CME_Certificate_${user.name.replace(/[^a-zA-Z0-9]/g, '_')}_${cert.id}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download certificate. Please try again.');
    } finally {
      setDownloadingCert(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-gray-600">
          Manage your account information and view your education history.
        </p>
      </div>

      {/* User Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-700">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.role} • {user.membershipLevel} Member</p>
                    <p className="text-sm text-gray-500">Member since {formatDate(user.joinDate)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Role</label>
                    <input
                      type="text"
                      value={user.role}
                      readOnly
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Membership Level</label>
                    <input
                      type="text"
                      value={user.membershipLevel}
                      readOnly
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <input
                      type="text"
                      value={formatDate(user.joinDate)}
                      readOnly
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CME Credits Earned</span>
                  <span className="font-semibold text-gray-900">{user.totalCMECredits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quizzes Completed</span>
                  <span className="font-semibold text-gray-900">{user.completedCME}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certificates Earned</span>
                  <span className="font-semibold text-gray-900">{sampleCertificates.length}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${(user.totalCMECredits / stats.totalAvailableCredits) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {Math.round((user.totalCMECredits / stats.totalAvailableCredits) * 100)}% of available credits earned
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CME Certificates */}
      <Card>
        <CardHeader>
          <CardTitle>CME Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          {sampleCertificates.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Complete CME quizzes to earn certificates.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sampleCertificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{cert.quizTitle}</h4>
                      <p className="text-sm text-gray-500">
                        {cert.cmeCredits} CME Credits • Generated {formatDateShort(cert.generatedAt)}
                      </p>
                      <p className="text-xs text-gray-400">
                        Downloaded {cert.downloadCount} times
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`/dashboard/cme/certificate?name=${encodeURIComponent(user.name)}&date=${encodeURIComponent(new Date(cert.generatedAt).toLocaleDateString())}`, '_blank')}
                    >
                      View
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleDownloadCertificate(cert)}
                      disabled={downloadingCert === cert.id}
                    >
                      {downloadingCert === cert.id ? 'Downloading...' : 'Download'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
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
                    {formatDateShort(activity.date)}
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