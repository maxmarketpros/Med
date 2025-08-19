import { EvaluationForm } from '@/components/cme/EvaluationForm';

// Force dynamic rendering to avoid build-time Clerk errorss done
export const dynamic = 'force-dynamic';

export default function FinalEvaluationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          CME Final Evaluation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Congratulations on passing your final exam! Please complete this evaluation form to receive your CME certificate.
        </p>
      </div>
      
      <EvaluationForm />
    </div>
  );
} 