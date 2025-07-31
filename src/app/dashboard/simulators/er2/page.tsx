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
  title: 'Emergency Room 2',
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
      scenario: 'A 38-year-old man presents with fever, dyspnea, chest pain, and fatigue for 4 days. He has a history of IV drug use, is homeless, and admits to recent heroin use with shared needles. Vitals: BP 100/60, HR 110, RR 24, O2 sat 92% on 2L NC, temp 39.2°C. Exam: track marks on arms, 4/6 holosystolic murmur at right sternal border, crackles in right lung.',
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
      scenario: 'Labs: CBC: WBC 15, Hb 11, platelets 120. CMP: Na 135, K 4.0, Cr 1.3, ALT 50, AST 60. HIV: positive, CD4 150, viral load 200,000. Blood cultures: MRSA. Imaging: Chest CT: multiple bilateral pulmonary nodules, some cavitating. TTE: 2 cm vegetation on tricuspid valve, severe tricuspid regurgitation, RV dilation, pulmonary artery pressure 50 mmHg. Sputum: Negative for AFB.',
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
    },
    {
      id: 'step3',
      scenario: 'The patient has MRSA bacteremia, endocarditis, and septic emboli. BP drops to 90/55, HR 115, O2 sat 90% on 4L NC.',
      options: [
        {
          text: 'Vancomycin IV, 1L NS bolus, ID and cardiology consults',
          isCorrect: true,
          feedback: 'Correct! Vancomycin targets MRSA, fluids address hypotension, and ID/cardiology consults guide endocarditis management.'
        },
        {
          text: 'Ceftriaxone IV, heparin infusion',
          isCorrect: false,
          feedback: 'Incorrect. Ceftriaxone doesn\'t cover MRSA; heparin is risky in endocarditis.'
        },
        {
          text: 'Levofloxacin PO, prednisone',
          isCorrect: false,
          feedback: 'Incorrect. Levofloxacin doesn\'t cover MRSA; prednisone is inappropriate for sepsis.'
        }
      ]
    },
    {
      id: 'step4',
      scenario: 'On day 1, the patient becomes irritable and agitated, with sweating, piloerection, diarrhea, myalgias, nausea, yawning, lacrimation, and rhinorrhea. Vitals: BP 150/95, HR 110, RR 22, O2 sat 93% on 2L NC, temp 37.8°C. Labs: WBC 14, Hb 11, Cr 1.3, ALT 55, AST 65.',
      options: [
        {
          text: 'Opioid withdrawal',
          isCorrect: true,
          feedback: 'Correct! Irritability, agitation, sweating, piloerection, diarrhea, myalgias, nausea, yawning, lacrimation, and rhinorrhea, with recent heroin use, indicate opioid withdrawal.'
        },
        {
          text: 'Sepsis progression',
          isCorrect: false,
          feedback: 'Incorrect. Stable labs and no worsening fever rule out sepsis progression.'
        },
        {
          text: 'Delirium tremens',
          isCorrect: false,
          feedback: 'Incorrect. Delirium tremens involves alcohol withdrawal, not opioids, with different symptoms (e.g., seizures, hallucinations).'
        }
      ]
    },
    {
      id: 'step5',
      scenario: 'The patient is diagnosed with opioid withdrawal. Symptoms include irritability, agitation, sweating, piloerection, diarrhea, myalgias, nausea, yawning, lacrimation, and rhinorrhea. Vitals: BP 150/95, HR 110.',
      options: [
        {
          text: 'Start methadone, consult addiction medicine',
          isCorrect: true,
          feedback: 'Correct! Methadone treats withdrawal symptoms; addiction consult supports recovery and long-term management.'
        },
        {
          text: 'Administer lorazepam, monitor symptoms',
          isCorrect: false,
          feedback: 'Incorrect. Lorazepam doesn\'t address opioid withdrawal physiology and risks sedation.'
        },
        {
          text: 'No intervention, observe',
          isCorrect: false,
          feedback: 'Incorrect. Ignoring withdrawal risks patient distress and discharge against medical advice.'
        }
      ]
    },
    {
      id: 'step6',
      scenario: 'Vancomycin trough is 10 mcg/mL (target 15-20). BP is 110/70, fever persists (38.8°C), blood cultures positive.',
      options: [
        {
          text: 'Increase vancomycin dose, add gentamicin',
          isCorrect: true,
          feedback: 'Correct! Increasing vancomycin and adding gentamicin optimize therapy for persistent bacteremia per IDSA.'
        },
        {
          text: 'Switch to daptomycin, repeat TTE',
          isCorrect: false,
          feedback: 'Incorrect. Daptomycin is an alternative, but vancomycin adjustment is first-line; TTE is premature.'
        },
        {
          text: 'Continue current dose, add rifampin',
          isCorrect: false,
          feedback: 'Incorrect. Rifampin is adjunctive later; subtherapeutic vancomycin needs adjustment.'
        }
      ]
    },
    {
      id: 'step7',
      scenario: 'Blood cultures clear on vancomycin/gentamicin. The patient was feeling okay but developed lower extremity edema, abdominal fullness, and elevated LFTs. RUQ ultrasound shows dilated IVC and hepatic veins. BP is 115/75, HR 100, O2 sat 92% on 4L NC.',
      options: [
        {
          text: 'Start furosemide IV, restrict fluids',
          isCorrect: true,
          feedback: 'Correct! Furosemide and fluid restriction reduce volume overload in RHF with congestive hepatopathy, per ACC/AHA guidelines.'
        },
        {
          text: 'Start metoprolol, continue fluids',
          isCorrect: false,
          feedback: 'Incorrect. Metoprolol is contraindicated in decompensated HF; fluids worsen overload.'
        },
        {
          text: 'No intervention, monitor symptoms',
          isCorrect: false,
          feedback: 'Incorrect. LE edema, abdominal fullness, and congestive hepatopathy require diuresis to optimize volume status.'
        }
      ]
    },
    {
      id: 'step8',
      scenario: 'Despite diuresis, TTE confirms persistent 2 cm vegetation, severe TR, and RV dysfunction. Dyspnea and edema persist.',
      options: [
        {
          text: 'Consult cardiothoracic surgery for tricuspid valve replacement',
          isCorrect: true,
          feedback: 'Correct! Severe TR and RHF warrant valve replacement per IDSA guidelines.'
        },
        {
          text: 'Continue medical therapy, defer surgery',
          isCorrect: false,
          feedback: 'Incorrect. Medical therapy alone is insufficient with severe valve dysfunction and heart failure.'
        },
        {
          text: 'Consult vascular surgery for embolectomy',
          isCorrect: false,
          feedback: 'Incorrect. Embolectomy is not indicated for septic pulmonary emboli.'
        }
      ]
    },
    {
      id: 'step9',
      scenario: 'Cardiothoracic surgery agrees to valve replacement. The patient is stable, Cr 1.4.',
      options: [
        {
          text: 'Coronary angiography to assess CAD',
          isCorrect: true,
          feedback: 'Correct! Coronary angiography assesses CAD risk before valve surgery, standard for patients >35.'
        },
        {
          text: 'Stress test for ischemia',
          isCorrect: false,
          feedback: 'Incorrect. Stress testing is less reliable pre-valve surgery; angiography is preferred.'
        },
        {
          text: 'No further cardiac workup needed',
          isCorrect: false,
          feedback: 'Incorrect. CAD assessment is critical to avoid perioperative ischemia.'
        }
      ]
    },
    {
      id: 'step10',
      scenario: 'Coronary angiography shows no significant CAD. Surgery is scheduled in 1 week.',
      options: [
        {
          text: 'Dental consult to rule out oral infection',
          isCorrect: true,
          feedback: 'Correct! Dental consult rules out oral infection, preventing prosthetic valve endocarditis.'
        },
        {
          text: 'Prophylactic amoxicillin, no consult',
          isCorrect: false,
          feedback: 'Incorrect. Prophylactic antibiotics don\'t replace infection source control.'
        },
        {
          text: 'No dental evaluation needed',
          isCorrect: false,
          feedback: 'Incorrect. Dental evaluation is mandatory before valve surgery.'
        }
      ]
    },
    {
      id: 'step11',
      scenario: 'Dental exam clears oral infection. The patient is malnourished (BMI 18, albumin 2.8).',
      options: [
        {
          text: 'Consult nutrition, start enteral supplements',
          isCorrect: true,
          feedback: 'Correct! Nutritional consult and enteral supplements optimize surgical recovery in malnutrition.'
        },
        {
          text: 'Prescribe oral multivitamins, monitor weight',
          isCorrect: false,
          feedback: 'Incorrect. Multivitamins alone don\'t address severe malnutrition.'
        },
        {
          text: 'No nutritional intervention needed',
          isCorrect: false,
          feedback: 'Incorrect. Malnutrition increases surgical risk; intervention is needed.'
        }
      ]
    },
    {
      id: 'step12',
      scenario: 'With regards to the patient\'s CD4 T-cell count of 150, what is your next step in management?',
      options: [
        {
          text: 'Consult ID, start bictegravir/tenofovir alafenamide/emtricitabine',
          isCorrect: true,
          feedback: 'Correct! CD4 count of 150 indicates advanced HIV, requiring ART (bictegravir/tenofovir alafenamide/emtricitabine) to prevent OIs; ID consult guides therapy.'
        },
        {
          text: 'Defer ART until post-surgery',
          isCorrect: false,
          feedback: 'Incorrect. Delaying ART risks OIs and HIV progression in a patient with CD4 <200.'
        },
        {
          text: 'Start fluconazole for cryptococcal prophylaxis',
          isCorrect: false,
          feedback: 'Incorrect. Fluconazole is for cryptococcal treatment or prophylaxis with specific indications, not routine for CD4 150 without symptoms.'
        }
      ]
    },
    {
      id: 'step13',
      scenario: 'ART is started. CD4 150, no cough or neurologic symptoms.',
      options: [
        {
          text: 'Trimethoprim-sulfamethoxazole for PCP',
          isCorrect: true,
          feedback: 'Correct! TMP-SMX is indicated for PCP prophylaxis with CD4 <200.'
        },
        {
          text: 'Fluconazole for cryptococcal meningitis',
          isCorrect: false,
          feedback: 'Incorrect. Fluconazole is for cryptococcal treatment, not prophylaxis, without symptoms.'
        },
        {
          text: 'No prophylaxis needed',
          isCorrect: false,
          feedback: 'Incorrect. CD4 150 requires PCP prophylaxis.'
        }
      ]
    },
    {
      id: 'step14',
      scenario: 'The patient undergoes tricuspid valve replacement (bioprosthetic). Post-op, he is stable, Cr 1.5, on vancomycin/gentamicin.',
      options: [
        {
          text: 'Continue vancomycin/gentamicin for 6 weeks from surgery',
          isCorrect: true,
          feedback: 'Correct! Post-valve replacement, 6 weeks of antibiotics from surgery ensures complete treatment.'
        },
        {
          text: 'Switch to oral antibiotics for 2 weeks',
          isCorrect: false,
          feedback: 'Incorrect. Oral antibiotics are insufficient post-surgery for endocarditis.'
        },
        {
          text: 'Stop antibiotics, monitor clinically',
          isCorrect: false,
          feedback: 'Incorrect. Stopping antibiotics risks prosthetic valve infection.'
        }
      ]
    },
    {
      id: 'step15',
      scenario: 'Five days post-op, labs show: Cr 2.9 (from 1.5), BUN 55, K 5.0, urine output 250 mL/day. FeNa 1.9%, no casts.',
      options: [
        {
          text: 'Gentamicin nephrotoxicity',
          isCorrect: true,
          feedback: 'Correct! Gentamicin is a common cause of AKI, especially in prolonged use.'
        },
        {
          text: 'Septic emboli to kidneys',
          isCorrect: false,
          feedback: 'Incorrect. Renal emboli are rare; FeNa 1.9% suggests drug toxicity.'
        },
        {
          text: 'Tenofovir alafenamide toxicity',
          isCorrect: false,
          feedback: 'Incorrect. TAF has low renal toxicity compared to TDF.'
        }
      ]
    },
    {
      id: 'step16',
      scenario: 'Two weeks into ART, labs show: ALT 220, AST 190, bilirubin 2.7. The patient is asymptomatic.',
      options: [
        {
          text: 'Continue ART, monitor LFTs weekly',
          isCorrect: true,
          feedback: 'Correct! Mild LFT elevation can be monitored without stopping ART, per DHHS guidelines.'
        },
        {
          text: 'Stop ART, consult hepatology',
          isCorrect: false,
          feedback: 'Incorrect. Stopping ART risks resistance and OIs; hepatology is premature.'
        },
        {
          text: 'Switch to dolutegravir-based regimen',
          isCorrect: false,
          feedback: 'Incorrect. Switching ART is unnecessary without severe toxicity.'
        }
      ]
    },
    {
      id: 'step17',
      scenario: 'Three weeks into ART, the patient develops fever (39°C), worsening dyspnea, and new pulmonary nodules on CT. Labs: CD4 200, viral load 500, CRP 150 mg/L, ESR 80 mm/hr. BP 120/80, HR 100, O2 sat 90% on 4L NC.',
      options: [
        {
          text: 'Blood cultures, sputum cultures, bronchoscopy',
          isCorrect: true,
          feedback: 'Correct! Fever, dyspnea, and new nodules post-ART suggest IRIS, but infections (e.g., TB, fungal) or emboli must be ruled out. Blood cultures, sputum cultures, and bronchoscopy exclude alternative causes.'
        },
        {
          text: 'Start empiric antibiotics, repeat CT',
          isCorrect: false,
          feedback: 'Incorrect. Empiric antibiotics without workup risk missing IRIS; repeat CT is non-specific.'
        },
        {
          text: 'Stop ART, monitor symptoms',
          isCorrect: false,
          feedback: 'Incorrect. Stopping ART worsens HIV; monitoring without workup risks missing infections.'
        }
      ]
    },
    {
      id: 'step18',
      scenario: 'Workup shows negative blood and sputum cultures, negative BAL for bacteria, fungi, and AFB. TTE is unchanged. Labs: CD4 200, viral load 500, CRP 150 mg/L, ESR 80 mm/hr.',
      options: [
        {
          text: 'Immune reconstitution inflammatory syndrome (IRIS)',
          isCorrect: true,
          feedback: 'Correct! IRIS is diagnosed by symptom worsening post-ART, with rising CD4 (200 from 150) and falling viral load (500 from 200,000), after excluding infections (negative cultures, BAL) and emboli (stable TTE).'
        },
        {
          text: 'New pulmonary infection',
          isCorrect: false,
          feedback: 'Incorrect. Negative cultures and BAL rule out new infections.'
        },
        {
          text: 'Recurrent septic pulmonary emboli',
          isCorrect: false,
          feedback: 'Incorrect. Stable TTE and cleared bacteremia rule out recurrent emboli.'
        }
      ]
    },
    {
      id: 'step19',
      scenario: 'The patient is diagnosed with IRIS, with fever, dyspnea, and new pulmonary nodules linked to immune recovery. Labs: CD4 200, viral load 500.',
      options: [
        {
          text: 'Continue ART, start prednisone, repeat cultures',
          isCorrect: true,
          feedback: 'Correct! Prednisone manages severe IRIS, continuing ART maintains HIV control, and repeating cultures ensures no missed infection, per DHHS guidelines.'
        },
        {
          text: 'Stop ART, start empiric antibiotics',
          isCorrect: false,
          feedback: 'Incorrect. Stopping ART worsens HIV; antibiotics are unnecessary with negative cultures.'
        },
        {
          text: 'Continue ART, no additional therapy',
          isCorrect: false,
          feedback: 'Incorrect. Severe IRIS requires steroids to manage inflammation; observation risks worsening.'
        }
      ]
    },
    {
      id: 'step20',
      scenario: 'AKI is attributed to gentamicin. BP is 115/75, HR 90.',
      options: [
        {
          text: 'Stop gentamicin, continue vancomycin, IV fluids, monitor Cr',
          isCorrect: true,
          feedback: 'Correct! Stopping gentamicin, continuing vancomycin, and giving fluids address AKI while treating MRSA.'
        },
        {
          text: 'Continue antibiotics, start dialysis',
          isCorrect: false,
          feedback: 'Incorrect. Continuing gentamicin worsens AKI; dialysis is premature.'
        },
        {
          text: 'Stop all antibiotics, consult nephrology',
          isCorrect: false,
          feedback: 'Incorrect. Stopping antibiotics risks endocarditis relapse.'
        }
      ]
    },
    {
      id: 'step21',
      scenario: 'The patient expresses concern about returning to homelessness and IVDU, fearing ART non-adherence.',
      options: [
        {
          text: 'Refer to case management for housing, link to addiction support',
          isCorrect: true,
          feedback: 'Correct! Case management and addiction support address social barriers to adherence.'
        },
        {
          text: 'Provide shelter list, discharge without referral',
          isCorrect: false,
          feedback: 'Incorrect. A shelter list alone doesn\'t ensure adherence or recovery.'
        },
        {
          text: 'Delay discharge until patient secures housing',
          isCorrect: false,
          feedback: 'Incorrect. Delaying discharge is impractical and doesn\'t solve social issues.'
        }
      ]
    },
    {
      id: 'step22',
      scenario: 'The patient reports low mood and hopelessness, linked to HIV diagnosis and IVDU history.',
      options: [
        {
          text: 'Screen for depression, consult psychiatry',
          isCorrect: true,
          feedback: 'Correct! Screening and psychiatry consult address depression, critical for adherence.'
        },
        {
          text: 'Prescribe sertraline, monitor symptoms',
          isCorrect: false,
          feedback: 'Incorrect. Starting sertraline without screening risks inappropriate therapy.'
        },
        {
          text: 'No intervention, focus on medical issues',
          isCorrect: false,
          feedback: 'Incorrect. Ignoring mental health risks non-adherence and worse outcomes.'
        }
      ]
    },
    {
      id: 'step23',
      scenario: 'The patient is stable on ART, TMP-SMX, vancomycin (5 weeks completed), methadone, and sertraline. He is linked to housing and addiction support.',
      options: [
        {
          text: 'Continue ART, TMP-SMX, vancomycin via PICC for 1 week, ID and HIV clinic follow-up in 1 week, naloxone kit',
          isCorrect: true,
          feedback: 'Correct! Continuing ART, TMP-SMX, vancomycin, with ID/HIV follow-up and naloxone ensures comprehensive care.'
        },
        {
          text: 'Stop ART, continue antibiotics, follow-up in 3 months',
          isCorrect: false,
          feedback: 'Incorrect. Stopping ART risks HIV progression; delayed follow-up is unsafe.'
        },
        {
          text: 'Continue ART, stop prophylaxis, no follow-up',
          isCorrect: false,
          feedback: 'Incorrect. Stopping prophylaxis and omitting follow-up risk OIs and relapse.'
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
              You have completed the Emergency Room 2 simulation.
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