'use client';

import { useState, useEffect, useCallback } from 'react';
import { Activity } from '@/types';

const ACTIVITIES_STORAGE_KEY = 'userActivities';
const MAX_ACTIVITIES = 50; // Keep only the 50 most recent activities

export function useActivityTracker() {
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load activities from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      if (stored) {
        const parsedActivities = JSON.parse(stored);
        setActivities(parsedActivities);
      }
    } catch (error) {
      console.error('Error loading activities from localStorage:', error);
    }
  }, []);

  // Save activities to localStorage whenever activities change (backup mechanism)
  useEffect(() => {
    if (activities.length > 0) {
      try {
        localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
      } catch (error) {
        console.error('Error saving activities to localStorage:', error);
      }
    }
  }, [activities]);

  const addActivity = useCallback((
    type: Activity['type'],
    title: string,
    details?: string
  ) => {
    const newActivity: Activity = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      title,
      date: new Date().toISOString(),
      details
    };

    setActivities(prev => {
      const updated = [newActivity, ...prev];
      // Keep only the most recent activities
      const sliced = updated.slice(0, MAX_ACTIVITIES);
      
      // Save to localStorage immediately
      try {
        localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(sliced));
      } catch (error) {
        console.error('Error saving activity to localStorage:', error);
      }
      
      return sliced;
    });
  }, []);

  const getRecentActivities = useCallback((limit: number = 10) => {
    return activities.slice(0, limit);
  }, [activities]);

  const clearActivities = useCallback(() => {
    setActivities([]);
    localStorage.removeItem(ACTIVITIES_STORAGE_KEY);
  }, []);

  const getActivityCount = useCallback((type?: Activity['type']) => {
    if (!type) return activities.length;
    return activities.filter(activity => activity.type === type).length;
  }, [activities]);

  return {
    activities,
    addActivity,
    getRecentActivities,
    clearActivities,
    getActivityCount
  };
} 