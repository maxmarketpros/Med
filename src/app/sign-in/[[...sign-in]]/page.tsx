import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your medical education dashboard
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-violet-600 hover:bg-violet-700 text-sm normal-case',
              card: 'shadow-xl',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden'
            }
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
} 