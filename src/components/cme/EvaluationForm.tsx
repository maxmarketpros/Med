'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface EvaluationFormData {
  fullName: string;
  credentials: 'PA' | 'NP' | 'RN' | 'MD' | 'Other' | '';
  email: string;
  programContent: string;
  relevancyToPractice: string;
  objectivesStated: string;
  objectivesMet: string;
  overallRating: string;
  practiceChange: 'Yes' | 'Maybe' | 'No' | '';
  drugsProductsAwareness: 'Yes' | 'No' | '';
  balancedViewPresented: 'Yes' | 'No' | '';
  biasDetected: 'Yes' | 'No' | '';
  brandMentions: string;
  unlabeledUses: 'Yes' | 'No' | '';
  relationshipsDisclosed: 'Yes' | 'No' | '';
}

export function EvaluationForm() {
  const [formData, setFormData] = useState<EvaluationFormData>({
    fullName: '',
    credentials: '',
    email: '',
    programContent: '',
    relevancyToPractice: '',
    objectivesStated: '',
    objectivesMet: '',
    overallRating: '',
    practiceChange: '',
    drugsProductsAwareness: '',
    balancedViewPresented: '',
    biasDetected: '',
    brandMentions: '',
    unlabeledUses: '',
    relationshipsDisclosed: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof EvaluationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.fullName && 
           formData.credentials && 
           formData.email && 
           formData.programContent && 
           formData.relevancyToPractice && 
           formData.objectivesStated && 
           formData.objectivesMet && 
           formData.overallRating && 
           formData.practiceChange &&
           formData.drugsProductsAwareness &&
           formData.balancedViewPresented &&
           formData.biasDetected &&
           formData.unlabeledUses &&
           formData.relationshipsDisclosed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    try {
      // Submit to Netlify forms first
      const formElement = e.target as HTMLFormElement;
      const submissionData = new FormData(formElement);
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(submissionData as any).toString()
      });
      
      // After successful Netlify submission, redirect to certificate page with user data
      const userName = encodeURIComponent(submissionData.get('full-name') as string);
      const today = new Date().toLocaleDateString();
      window.location.href = `/dashboard/cme/certificate?name=${userName}&date=${encodeURIComponent(today)}`;
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Still redirect to certificate page even if Netlify submission fails - use React state as fallback
      const userName = encodeURIComponent(formData.fullName || 'Student');
      const today = new Date().toLocaleDateString();
      window.location.href = `/dashboard/cme/certificate?name=${userName}&date=${encodeURIComponent(today)}`;
    }
  };

  const RatingScale = ({ name, value, onChange, question }: { 
    name: string; 
    value: string; 
    onChange: (value: string) => void; 
    question: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">{question}</label>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map(rating => (
          <label key={rating} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={rating.toString()}
              checked={value === rating.toString()}
              onChange={(e) => onChange(e.target.value)}
              className="mr-2"
              required
            />
            <span className="text-sm">{rating}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>1 = Poor</span>
        <span>5 = Excellent</span>
      </div>
    </div>
  );

  const YesNoQuestion = ({ name, value, onChange, question }: { 
    name: string; 
    value: string; 
    onChange: (value: string) => void; 
    question: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">{question}</label>
      <div className="flex space-x-4">
        {['Yes', 'No'].map(option => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="mr-2"
              required
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>CME Evaluation Form</CardTitle>
          <p className="text-gray-600">
            Please complete this evaluation to receive your CME certificate. Your feedback helps us improve our educational programs.
          </p>
        </CardHeader>
        <CardContent>
          <form 
            name="cme-final-evaluation" 
            method="POST" 
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden Netlify field */}
            <input type="hidden" name="form-name" value="cme-final-evaluation" />
            
            {/* Hidden program details */}
            <input type="hidden" name="program-name" value="Hospital Medicine Cheat Sheets" />
            <input type="hidden" name="date" value={new Date().toISOString()} />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full-name"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Credentials *
                </label>
                <select
                  name="credentials"
                  value={formData.credentials}
                  onChange={(e) => handleChange('credentials', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your credentials</option>
                  <option value="PA">PA</option>
                  <option value="NP">NP</option>
                  <option value="RN">RN</option>
                  <option value="MD">MD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Rating Questions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Program Evaluation</h3>
              
              <RatingScale
                name="program-content"
                value={formData.programContent}
                onChange={(value) => handleChange('programContent', value)}
                question="Rate the program content"
              />

              <RatingScale
                name="relevancy-practice"
                value={formData.relevancyToPractice}
                onChange={(value) => handleChange('relevancyToPractice', value)}
                question="Relevancy of content to your practice"
              />

              <RatingScale
                name="objectives-stated"
                value={formData.objectivesStated}
                onChange={(value) => handleChange('objectivesStated', value)}
                question="Were explicit learning objectives stated?"
              />

              <RatingScale
                name="objectives-met"
                value={formData.objectivesMet}
                onChange={(value) => handleChange('objectivesMet', value)}
                question="Were learning objectives met?"
              />

              <RatingScale
                name="overall-rating"
                value={formData.overallRating}
                onChange={(value) => handleChange('overallRating', value)}
                question="Rate the program overall"
              />
            </div>

            {/* Practice Change */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                As a result of this program, will you alter your practice? *
              </label>
              <div className="flex space-x-4">
                {['Yes', 'Maybe', 'No'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="practice-change"
                      value={option}
                      checked={formData.practiceChange === option}
                      onChange={(e) => handleChange('practiceChange', e.target.value)}
                      className="mr-2"
                      required
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Objectivity Questions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Objectivity Assessment</h3>
              
              <YesNoQuestion
                name="drugs-products-awareness"
                value={formData.drugsProductsAwareness}
                onChange={(value) => handleChange('drugsProductsAwareness', value)}
                question="Were you made aware of any related drugs/products during this program?"
              />

              <YesNoQuestion
                name="balanced-view"
                value={formData.balancedViewPresented}
                onChange={(value) => handleChange('balancedViewPresented', value)}
                question="Was a balanced view of therapeutic options presented?"
              />

              <YesNoQuestion
                name="bias-detected"
                value={formData.biasDetected}
                onChange={(value) => handleChange('biasDetected', value)}
                question="Did you detect any bias in the program content?"
              />

              <YesNoQuestion
                name="unlabeled-uses"
                value={formData.unlabeledUses}
                onChange={(value) => handleChange('unlabeledUses', value)}
                question="Were any unlabeled/off-label uses discussed?"
              />

              <YesNoQuestion
                name="relationships-disclosed"
                value={formData.relationshipsDisclosed}
                onChange={(value) => handleChange('relationshipsDisclosed', value)}
                question="Were financial relationships/conflicts of interest appropriately disclosed?"
              />
            </div>

            {/* Brand Mentions */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                If any brand names were mentioned, please list them (optional)
              </label>
              <textarea
                name="brand-mentions"
                value={formData.brandMentions}
                onChange={(e) => handleChange('brandMentions', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List any brand names mentioned during the program..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                size="lg"
                className="w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Evaluation & Generate Certificate'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 