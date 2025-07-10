'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { CheatSheetCard } from '@/components/cheat-sheets/CheatSheetCard';
import { Button } from '@/components/ui/Button';
import { CheatSheet } from '@/types';

export default function CheatSheetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [specialties, setSpecialties] = useState<string[]>(['All Specialties']);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cheat-sheets');
        if (response.ok) {
          const data: CheatSheet[] = await response.json();
          setCheatSheets(data);
          
          // Extract unique specialties from the data
          const uniqueSpecialties = Array.from(new Set(data.map(sheet => sheet.specialty)));
          setSpecialties(['All Specialties', ...uniqueSpecialties.sort()]);
        }
      } catch (error) {
        console.error('Error fetching cheat sheets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(cheatSheets, {
      keys: ['title', 'description', 'tags', 'specialty'],
      threshold: 0.3,
    });
  }, [cheatSheets]);

  // Filter and search cheat sheets
  const filteredCheatSheets = useMemo(() => {
    let results = cheatSheets;

    // Apply specialty filter
    if (selectedSpecialty !== 'All Specialties') {
      results = results.filter(sheet => sheet.specialty === selectedSpecialty);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const fuseResults = fuse.search(searchTerm);
      const searchedIds = fuseResults.map(result => result.item.id);
      results = results.filter(sheet => searchedIds.includes(sheet.id));
    }

    return results;
  }, [searchTerm, selectedSpecialty, fuse, cheatSheets]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cheat Sheets Library</h1>
          <p className="mt-2 text-gray-600">Loading medical reference materials...</p>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cheat Sheets Library</h1>
        <p className="mt-2 text-gray-600">
          Browse our comprehensive collection of medical reference materials organized by specialty.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl card-shadow p-4 sm:p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search cheat sheets
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search by title, condition, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Specialty Filter */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
              Specialty
            </label>
            <select
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode and Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredCheatSheets.length} of {cheatSheets.length} cheat sheets
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <svg className="w-4 h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <svg className="w-4 h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="hidden sm:inline">List</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredCheatSheets.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No cheat sheets found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
            : 'space-y-4'
        }>
          {filteredCheatSheets.map((cheatSheet) => (
            <CheatSheetCard key={cheatSheet.id} cheatSheet={cheatSheet} />
          ))}
        </div>
      )}
    </div>
  );
} 