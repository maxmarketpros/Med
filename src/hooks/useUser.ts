'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';

// Mock user data - in a real app, this would come from your auth provider
const mockUser: User = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@hospital.com',
  role: 'PA',
  membershipLevel: 'Premium',
  joinDate: '2023-08-15',
  completedCME: 12,
  totalCMECredits: 24.5,
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    setUser(null);
    // In a real app, you would clear auth tokens and redirect
    window.location.href = '/';
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    updateProfile,
  };
} 