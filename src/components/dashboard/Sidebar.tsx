'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser, useClerk } from '@clerk/nextjs';
import { useSubscription } from '@/hooks/useSubscription';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
      </svg>
    ),
    // Dashboard should be available to any authenticated user
  },
  {
    name: 'Cheat Sheets',
    href: '/dashboard/cheat-sheets',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    requiredAccess: 'cheat_sheets'
  },
  {
    name: 'CME Tests',
    href: '/dashboard/cme',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    requiredAccess: 'all_access',
    upgradeFeature: 'CME Tests and Certificates'
  },
  {
    name: 'Patient Simulators',
    href: '/dashboard/simulators',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    requiredAccess: 'cheat_sheets'
  },
  {
    name: 'CME Certificate',
    href: '/dashboard/cme/certificate',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    requiredAccess: 'all_access',
    upgradeFeature: 'CME Certificates'
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { hasAccess, planType } = useSubscription();

  const handleLinkClick = () => {
    // Close mobile sidebar when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  const handleUpgradeClick = () => {
    window.location.href = '/choose-plan';
  };

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = '/';
    });
  };

  const getUserInitials = () => {
    if (!user) return '';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U';
  };

  const getUserName = () => {
    if (!user) return 'User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses[0]?.emailAddress || 'User';
  };

  const renderNavigationItem = (item: typeof navigation[0]) => {
    const isActive = pathname === item.href || 
      (item.href !== '/dashboard' && pathname.startsWith(item.href));
    
    // If no requiredAccess is specified, show the item (like Dashboard)
    if (!item.requiredAccess) {
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={handleLinkClick}
          className={cn(
            'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
            isActive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
        >
          {item.icon}
          <span className="ml-3">{item.name}</span>
        </Link>
      );
    }
    
    const userHasAccess = hasAccess(item.requiredAccess as any);
    
    if (userHasAccess) {
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={handleLinkClick}
          className={cn(
            'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
            isActive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
        >
          {item.icon}
          <span className="ml-3">{item.name}</span>
        </Link>
      );
    } else if (item.requiredAccess === 'all_access') {
      // Show upgrade prompt for restricted items
      return (
        <div
          key={item.name}
          onClick={handleUpgradeClick}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer text-gray-400 hover:text-violet-600 hover:bg-violet-50 relative"
        >
          {item.icon}
          <span className="ml-3">{item.name}</span>
          <svg className="w-4 h-4 ml-auto text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      );
    }
    
    // For cheat_sheets level items that user doesn't have access to, don't show them
    return null;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:bg-white lg:shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.415-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
              </svg>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">Med Cheat Sheets</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => renderNavigationItem(item))}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-200">
            {/* Plan Indicator */}
            {planType && (
              <div className="mb-3 p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-emerald-700">
                      {planType === 'all_access' ? 'All-Access Plan' : 'Cheat Sheets Plan'}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {planType === 'all_access' ? 'Full access to all features' : 'Cheat sheets & simulators'}
                    </p>
                  </div>
                  {planType === 'cheat_sheets' && (
                    <button
                      onClick={handleUpgradeClick}
                      className="text-xs px-2 py-1 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-700">
                  {getUserInitials()}
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getUserName()}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.emailAddresses[0]?.emailAddress || 'User'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-3 w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.415-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
                </svg>
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900">Med Cheat Sheets</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => renderNavigationItem(item))}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-200">
            {/* Plan Indicator */}
            {planType && (
              <div className="mb-3 p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-emerald-700">
                      {planType === 'all_access' ? 'All-Access Plan' : 'Cheat Sheets Plan'}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {planType === 'all_access' ? 'Full access to all features' : 'Cheat sheets & simulators'}
                    </p>
                  </div>
                  {planType === 'cheat_sheets' && (
                    <button
                      onClick={handleUpgradeClick}
                      className="text-xs px-2 py-1 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-700">
                  {getUserInitials()}
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getUserName()}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.emailAddresses[0]?.emailAddress || 'User'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-3 w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 