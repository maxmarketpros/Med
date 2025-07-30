import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Med Cheat Sheets
          </h1>
          <p className="text-gray-600">
            Create your account to access professional medical education resources
          </p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-violet-600 hover:bg-violet-700 text-sm normal-case',
              card: 'shadow-xl',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden'
            }
          }}
          redirectUrl="/choose-plan"
        />
        
        <div className="mt-6 text-center text-sm text-gray-500">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
} 