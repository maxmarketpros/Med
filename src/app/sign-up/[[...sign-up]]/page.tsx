import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/Logo.png" 
              alt="Med Cheat Sheets" 
              width={200}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Med Cheat Sheets
          </h1>
          <p className="text-gray-600 mb-4">
            Create your account to access professional medical education resources
          </p>
          
          {/* Benefits list */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-emerald-100">
            <div className="text-left space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                📚 Comprehensive medical cheat sheets by specialty
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                🎓 AAPA Category 1 CME credits available
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                💻 Interactive patient simulators
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                📊 Progress tracking and analytics
              </div>
            </div>
          </div>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-sm normal-case transition-colors',
              card: 'shadow-xl border border-emerald-100 bg-white/80 backdrop-blur-sm',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              formFieldInput: 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500',
              footerActionLink: 'text-emerald-600 hover:text-emerald-700'
            }
          }}
          redirectUrl="/choose-plan"
        />
        
        {/* Terms and professional note */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
          <p className="text-sm text-gray-600 font-medium">
            🏥 Trusted by Healthcare Professionals Worldwide
          </p>
        </div>
      </div>
    </div>
  );
} 