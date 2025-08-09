'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Simulator } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SimulatorInterface } from '@/components/simulators/SimulatorInterface';
import { useActivityTracker } from '@/hooks/useActivityTracker';

const copdSimulator: Simulator = {
  id: 'er3',
  title: 'Emergency Room 3',
  roomNumber: '786',
  specialty: 'Pulmonology',
  description: 'Patient presents to the ER with shortness of breath, productive cough',
  difficulty: 'Intermediate',
  estimatedTime: 45,
  learningObjectives: [
    'Evaluate and prioritize differential diagnoses for acute respiratory presentations in patients with chronic lung conditions.',
    'Develop an evidence-based management plan incorporating guideline-directed therapies for acute and hospital-acquired conditions.',
    'Identify and address complications arising during hospitalization, including appropriate therapeutic interventions.',
    'Optimize long-term therapy and coordinate follow-up care to improve patient outcomes and prevent recurrence.'
  ],
  steps: [
    {
      id: 'step1',
      scenario: 'A 65-year-old male with no prior medical history presents with worsening dyspnea, productive cough, and wheezing for 3 days. He has a 50 pack-year smoking history.',
      vitals: {
        bloodPressure: '130/80',
        heartRate: 100,
        respiratoryRate: 28,
        oxygenSaturation: 88,
        temperature: 38.2
      },
      physicalExam: 'Barrel chest, diminished breath sounds, expiratory wheezes, no edema.',
      options: [
        {
          text: 'CBC, CMP, ABG, chest X-ray, influenza PCR, sputum culture',
          isCorrect: true,
          feedback: 'Correct! CBC, CMP, ABG, chest X-ray, influenza PCR, and sputum culture evaluate respiratory failure, infection, and COPD exacerbation.'
        },
        {
          text: 'D-dimer, CT pulmonary angiogram, troponin, EKG',
          isCorrect: false,
          feedback: 'Incorrect. D-dimer and CTPA are for PE, premature without risk factors. Troponin/EKG are irrelevant without ACS symptoms.'
        },
        {
          text: 'BNP, echocardiogram, lactate, blood cultures',
          isCorrect: false,
          feedback: 'Incorrect. BNP and echo are for heart failure, unlikely without edema. Lactate/blood cultures are non-specific without sepsis signs.'
        }
      ]
    },
    {
      id: 'step2',
      scenario: 'Labs show: CBC: WBC 12, Hb 14, platelets 200. CMP: Na 138, K 4.2, Cr 1.0, CO2 30. ABG: pH 7.28, pCO2 65, pO2 60 on 4L NC. Influenza A PCR positive.',
      vitals: {
        bloodPressure: '130/80',
        heartRate: 100,
        respiratoryRate: 28,
        oxygenSaturation: 88,
        temperature: 38.2
      },
      imaging: 'Chest X-ray: hyperinflation, no consolidation.',
      labResults: 'Sputum: Pending.',
      options: [
        {
          text: 'COPD exacerbation with influenza',
          isCorrect: true,
          feedback: 'Correct! Dyspnea, wheezing, hyperinflation, influenza A, and respiratory acidosis confirm COPD exacerbation triggered by influenza, per GOLD guidelines.'
        },
        {
          text: 'Community-acquired pneumonia',
          isCorrect: false,
          feedback: 'Incorrect. No consolidation on X-ray rules out pneumonia.'
        },
        {
          text: 'Acute heart failure',
          isCorrect: false,
          feedback: 'Incorrect. No edema or heart failure signs; respiratory symptoms suggest COPD.'
        }
      ]
    }
  ]
};

export default function ER3Page() {
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
      copdSimulator.title,
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
              You have completed the Emergency Room 3 simulation.
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
          <h2 className="text-2xl font-bold text-gray-900">{copdSimulator.title}</h2>
          <Link href="/dashboard/simulators">
            <Button variant="outline">Back to Simulators</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Case Overview</h3>
                <p className="text-gray-600 mb-2">Navigate a complex medical scenario involving a patient presenting with acute respiratory symptoms and developing additional complications during hospitalization, requiring comprehensive management in the inpatient setting.</p>
                <p className="text-gray-600 mb-1"><strong>Specialty:</strong> Pulmonology</p>
                <p className="text-gray-600 mb-4"><strong>Level:</strong> Intermediate</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {copdSimulator.specialty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {copdSimulator.difficulty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                    {copdSimulator.estimatedTime} minutes
                  </span>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">Learning Objectives:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
                  {copdSimulator.learningObjectives.map((objective, index) => (
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

  return <SimulatorInterface simulator={copdSimulator} onComplete={handleComplete} />;
} 