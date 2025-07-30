'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Simulator } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SimulatorInterface } from '@/components/simulators/SimulatorInterface';
import { useActivityTracker } from '@/hooks/useActivityTracker';

const mrsaSimulator: Simulator = {
  id: 'er2',
  title: 'MRSA Endocarditis',
  roomNumber: '351',
  specialty: 'Infectious Disease',
  description: 'Diagnose and treat a complex case of MRSA endocarditis in an IV drug user with HIV.',
  difficulty: 'Advanced',
  estimatedTime: 60,
  learningObjectives: [
    'Diagnose and manage MRSA endocarditis',
    'Recognize and treat complications of endocarditis',
    'Manage concurrent HIV infection',
    'Address substance use disorder and social determinants of health'
  ],
  steps: [
    {
      id: 'step1',
      scenario: 'A 38-year-old man presents with fever, dyspnea, chest pain, and fatigue for 4 days. He has a history of IV drug use, is homeless, and admits to recent heroin use with shared needles.',
      vitals: {
        bloodPressure: '100/60',
        heartRate: 110,
        respiratoryRate: 24,
        oxygenSaturation: 92,
        temperature: 39.2
      },
      physicalExam: 'Track marks on arms, 4/6 holosystolic murmur at right sternal border, crackles in right lung.',
      options: [
        {
          text: 'Blood cultures, CBC, CMP, HIV test, TTE, chest CT, sputum culture',
          isCorrect: true,
          feedback: 'Correct! Blood cultures, CBC, CMP, HIV test, TTE, chest CT, and sputum culture target sepsis, endocarditis, and pulmonary complications in IVDU.'
        },
        {
          text: 'D-dimer, CT pulmonary angiogram, troponin, EKG',
          isCorrect: false,
          feedback: 'Incorrect. PE is less likely without DVT signs; troponin/EKG are irrelevant without ACS symptoms.'
        },
        {
          text: 'Lumbar puncture, head CT, lactate, procalcitonin',
          isCorrect: false,
          feedback: 'Incorrect. Meningitis workup is unnecessary without neurologic signs; lactate/procalcitonin are non-specific.'
        }
      ]
    },
    {
      id: 'step2',
      scenario: 'Labs show: CBC: WBC 15, Hb 11, platelets 120. CMP: Na 135, K 4.0, Cr 1.3, ALT 50, AST 60. HIV: positive, CD4 150, viral load 200,000. Blood cultures: MRSA.',
      vitals: {
        bloodPressure: '100/60',
        heartRate: 110,
        respiratoryRate: 24,
        oxygenSaturation: 92,
        temperature: 39.2
      },
      imaging: 'Chest CT: multiple bilateral pulmonary nodules, some cavitating. TTE: 2 cm vegetation on tricuspid valve, severe tricuspid regurgitation, RV dilation, pulmonary artery pressure 50 mmHg.',
      labResults: 'Sputum: Negative for AFB.',
      options: [
        {
          text: 'MRSA bacteremia with tricuspid endocarditis and septic pulmonary emboli',
          isCorrect: true,
          feedback: 'Correct! MRSA bacteremia, severe TR, vegetation, and cavitating lung nodules confirm endocarditis with septic emboli.'
        },
        {
          text: 'Pulmonary TB with miliary spread',
          isCorrect: false,
          feedback: 'Incorrect. Negative sputum and no systemic signs rule out TB.'
        },
        {
          text: 'Acute pulmonary embolism',
          isCorrect: false,
          feedback: 'Incorrect. PE is unlikely with infectious symptoms and CT findings.'
        }
      ]
    }
  ]
};

export default function ER2Page() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { addActivity } = useActivityTracker();

  const handleComplete = (answers: { stepId: string; selectedOption: number; isCorrect: boolean; }[]) => {
    setCompleted(true);
    
    // Calculate score and save progress
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / answers.length) * 100);
    
    // Track the simulator completion activity
    addActivity(
      'simulator_completed',
      mrsaSimulator.title,
      `Score: ${score}% (${correctAnswers}/${answers.length} correct)`
    );
    
    console.log('Simulation completed:', { answers, score });
  };

  if (completed) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Simulation Complete</h2>
          <Link href="/dashboard/simulators">
            <Button variant="outline">Back to Simulators</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Congratulations!</h3>
            <p className="text-gray-600 mb-6">
              You have completed the MRSA Endocarditis simulation.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/dashboard/simulators">
                <Button variant="outline">Try Another Case</Button>
              </Link>
              <Button onClick={() => setStarted(false)}>Review Case</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{mrsaSimulator.title}</h2>
          <Link href="/dashboard/simulators">
            <Button variant="outline">Back to Simulators</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Case Overview</h3>
                <p className="text-gray-600 mb-4">{mrsaSimulator.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {mrsaSimulator.specialty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {mrsaSimulator.difficulty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                    {mrsaSimulator.estimatedTime} minutes
                  </span>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">Learning Objectives:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
                  {mrsaSimulator.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>

                <Button
                  onClick={() => setStarted(true)}
                  className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700"
                >
                  Start Simulation
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Read each scenario carefully and assess the patient&apos;s condition.</p>
                  <p>• Review vital signs, physical exam findings, and test results when provided.</p>
                  <p>• Choose the most appropriate management option from the choices given.</p>
                  <p>• Receive immediate feedback on your decisions.</p>
                  <p>• Progress through the case as it evolves over time.</p>
                  <p>• Complete all steps to finish the simulation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <SimulatorInterface simulator={mrsaSimulator} onComplete={handleComplete} />;
} 