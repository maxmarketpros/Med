'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface UpgradePromptProps {
  title?: string;
  description?: string;
  feature?: string;
  className?: string;
}

export function UpgradePrompt({ 
  title = "Upgrade Required",
  description = "This feature is only available with the All-Access plan.",
  feature = "CME Tests and Certificates",
  className = ""
}: UpgradePromptProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">{description}</p>
        
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">All-Access Plan Includes:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 100+ Cheat Sheets</li>
            <li>• {feature}</li>
            <li>• Patient Simulators</li>
            <li>• 10 AAPA Category 1 CME Credits</li>
            <li>• Official CME Certificates</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link href="/choose-plan">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
              Upgrade to All-Access
            </Button>
          </Link>
          <p className="text-xs text-gray-500">
            Starting at $299 for 6 months
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 