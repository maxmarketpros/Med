import React from 'react';
import Link from 'next/link';
import { CheatSheet } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { toTitleCase } from '@/lib/utils';

interface CheatSheetCardProps {
  cheatSheet: CheatSheet;
}

export function CheatSheetCard({ cheatSheet }: CheatSheetCardProps) {
  return (
    <Link href={`/dashboard/cheat-sheets/${cheatSheet.slug}`}>
      <Card hover>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {toTitleCase(cheatSheet.title)}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {toTitleCase(cheatSheet.specialty)}
                </span>
              </div>
            </div>
            <div className="ml-3 flex-shrink-0">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 sm:line-clamp-2">
            {cheatSheet.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {cheatSheet.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {toTitleCase(tag)}
              </span>
            ))}
            {cheatSheet.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                +{cheatSheet.tags.length - 3} more
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm">{cheatSheet.estimatedReadTime} min read</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
