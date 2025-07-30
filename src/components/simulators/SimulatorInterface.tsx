'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Simulator, SimulatorStep, PatientVitals } from '@/types';

interface SimulatorInterfaceProps {
  simulator: Simulator;
  onComplete: (answers: { stepId: string; selectedOption: number; isCorrect: boolean; }[]) => void;
}

export function SimulatorInterface({ simulator, onComplete }: SimulatorInterfaceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ stepId: string; selectedOption: number; isCorrect: boolean; }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const step = simulator.steps[currentStep];

  const VitalsDisplay = ({ vitals }: { vitals: PatientVitals }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
      <div>
        <p className="text-sm font-medium text-gray-500">BP</p>
        <p className="text-lg font-bold text-gray-900">{vitals.bloodPressure}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">HR</p>
        <p className="text-lg font-bold text-gray-900">{vitals.heartRate}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">RR</p>
        <p className="text-lg font-bold text-gray-900">{vitals.respiratoryRate}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">O2 Sat</p>
        <p className="text-lg font-bold text-gray-900">{vitals.oxygenSaturation}%</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Temp</p>
        <p className="text-lg font-bold text-gray-900">{vitals.temperature}°C</p>
      </div>
      {vitals.consciousness && (
        <div>
          <p className="text-sm font-medium text-gray-500">LOC</p>
          <p className="text-lg font-bold text-gray-900">{vitals.consciousness}</p>
        </div>
      )}
    </div>
  );

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    setAnswers([...answers, {
      stepId: step.id,
      selectedOption: optionIndex,
      isCorrect: step.options[optionIndex].isCorrect
    }]);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    
    if (currentStep === simulator.steps.length - 1) {
      onComplete(answers);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {simulator.title} - Room {simulator.roomNumber}
        </h2>
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {simulator.steps.length}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {step.vitals && <VitalsDisplay vitals={step.vitals} />}

          <div className="prose max-w-none">
            <p className="text-gray-900">{step.scenario}</p>
            
            {step.physicalExam && (
              <div className="mt-4">
                <p className="font-medium text-gray-900">Physical Exam:</p>
                <p className="text-gray-700">{step.physicalExam}</p>
              </div>
            )}

            {step.labResults && (
              <div className="mt-4">
                <p className="font-medium text-gray-900">Lab Results:</p>
                <p className="text-gray-700">{step.labResults}</p>
              </div>
            )}

            {step.imaging && (
              <div className="mt-4">
                <p className="font-medium text-gray-900">Imaging:</p>
                <p className="text-gray-700">{step.imaging}</p>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-3">
            {step.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  selectedOption === index
                    ? option.isCorrect
                      ? 'bg-green-50 border-2 border-green-500'
                      : 'bg-red-50 border-2 border-red-500'
                    : 'border-2 border-gray-200 hover:border-emerald-500'
                } ${showFeedback ? 'cursor-default' : 'hover:bg-gray-50'}`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg ${
              step.options[selectedOption!].isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${
                step.options[selectedOption!].isCorrect
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}>
                {step.options[selectedOption!].feedback}
              </p>
            </div>
          )}

          {showFeedback && (
            <div className="mt-6">
              <Button
                onClick={handleNext}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {currentStep === simulator.steps.length - 1 ? 'Complete Simulation' : 'Next Step'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 