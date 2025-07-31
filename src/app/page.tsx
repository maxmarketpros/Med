'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Redirect to dashboard if authenticated
      window.location.href = '/dashboard';
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-cyan-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          {/* Logo */}
          <div className="text-center mb-12">
            <Image 
              src="/images/Logo.png" 
              alt="Med Cheat Sheets" 
              width={300}
              height={120}
              className="mx-auto object-contain mb-8"
              priority
            />
            
            {/* Hero Headlines */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Hospital Medicine
              <span className="block text-emerald-600">With Expert Resources</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Access comprehensive cheat sheets, earn AAPA Category 1 CME credits, 
              and sharpen your skills with interactive patient simulators designed for healthcare professionals.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/sign-up" className="flex-1">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  🚀 Start Learning Free
                </button>
              </Link>
              
              <Link href="/sign-in" className="flex-1">
                <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-gray-300 hover:border-emerald-300 shadow-lg hover:shadow-xl">
                  🏥 Sign In
                </button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              ✅ No credit card required • 📱 Access anywhere • 🎓 AAPA accredited
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Medical Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of healthcare professionals advancing their knowledge with our comprehensive platform
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg">
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">📚 Expert Cheat Sheets</h3>
            <p className="text-gray-600 leading-relaxed">
              Comprehensive, evidence-based cheat sheets covering all hospital medicine specialties. 
              Quick reference guides created by practicing physicians for real-world scenarios.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100 hover:border-cyan-200 transition-all duration-300 hover:shadow-lg">
            <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">🎓 AAPA CME Credits</h3>
            <p className="text-gray-600 leading-relaxed">
              Earn Category 1 CME credits accredited by AAPA. Complete interactive courses 
              and track your continuing education progress all in one platform.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-sky-100 hover:border-sky-200 transition-all duration-300 hover:shadow-lg">
            <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">💻 Interactive Simulators</h3>
            <p className="text-gray-600 leading-relaxed">
              Practice with realistic patient scenarios in a risk-free environment. 
              Build confidence and decision-making skills with our advanced simulation technology.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600">Medical Cheat Sheets</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 mb-2">10</div>
              <div className="text-gray-600">AAPA CME Credits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sky-600 mb-2">15+</div>
              <div className="text-gray-600">Medical Specialties</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Advance Your Medical Knowledge?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the community of healthcare professionals who trust Med Cheat Sheets for their continuing education needs.
          </p>
          
          <Link href="/sign-up">
            <button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
              🏥 Join Med Cheat Sheets Today
            </button>
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">
            Trusted by healthcare professionals worldwide
          </p>
        </div>
      </div>
    </div>
  );
} 