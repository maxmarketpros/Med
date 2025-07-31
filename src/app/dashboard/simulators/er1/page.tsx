'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SimulatorInterface } from '@/components/simulators/SimulatorInterface';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Simulator } from '@/types';

const heartFailureSimulator: Simulator = {
  id: 'er1',
  title: 'Emergency Room 1',
  roomNumber: '252',
  specialty: 'Cardiology',
  description: 'Manage a complex case of decompensated heart failure in an elderly patient with multiple comorbidities.',
  difficulty: 'Intermediate',
  estimatedTime: 45,
  learningObjectives: [
    'Diagnose and manage acute decompensated heart failure',
    'Optimize guideline-directed medical therapy (GDMT)',
    'Recognize and treat complications',
    'Plan appropriate follow-up care'
  ],
  steps: [
    {
      id: 'step1',
      scenario: 'A 72-year-old man presents with shortness of breath, chest pain, and abdominal fullness for 6 days, worsening today. He reports orthopnea, paroxysmal nocturnal dyspnea, and fatigue. Past medical history includes hypertension, type 2 diabetes, remote MI (10 years ago), and smoking (30 pack-years, quit 5 years ago). He lives alone and admits to missing medication doses. He is frail (slow gait, weight loss).',
      vitals: {
        bloodPressure: '160/90',
        heartRate: 92,
        respiratoryRate: 28,
        oxygenSaturation: 89,
        temperature: 36.6
      },
      physicalExam: 'JVD at 12 cm, bibasilar crackles, S3 gallop, 3+ bilateral pitting edema, mild abdominal distension, no hepatomegaly.',
      options: [
        {
          text: 'BMP, CBC, BNP, troponin, EKG, chest X-ray, echocardiogram, iron studies',
          isCorrect: true,
          feedback: 'Correct! BMP, CBC, BNP, troponin, EKG, chest X-ray, echo, and iron studies assess heart failure, ischemia, and anemia.'
        },
        {
          text: 'D-dimer, CT pulmonary angiogram, lipase, amylase',
          isCorrect: false,
          feedback: 'Incorrect. D-dimer and CT angiogram target PE, unlikely without risk factors. Lipase/amylase are irrelevant without abdominal pain.'
        },
        {
          text: 'Lactate, blood cultures, procalcitonin, ABG',
          isCorrect: false,
          feedback: 'Incorrect. Sepsis workup (lactate, cultures, procalcitonin) is unnecessary without fever or infection signs. ABG is premature.'
        }
      ]
    },
    {
      id: 'step2',
      scenario: 'Labs show: BMP: Na 137, K 4.1, Cl 99, HCO3 23, BUN 24, Cr 1.2, glucose 145. CBC: Hb 12.0, WBC 8.5, platelets 180. BNP 1100 pg/mL. Troponin T 0.03 ng/mL (normal). Iron studies: ferritin 45 ng/mL, TSAT 14%.',
      imaging: 'Chest X-ray: pulmonary edema, cardiomegaly. Echocardiogram: EF 35%, global hypokinesis, mild MR.',
      labResults: 'EKG: Sinus rhythm, old Q waves in inferior leads, no acute ST changes.',
      options: [
        {
          text: 'Decompensated HFrEF due to ischemic cardiomyopathy',
          isCorrect: true,
          feedback: 'Correct! BNP 1100, EF 35%, and global hypokinesis confirm HFrEF from ischemic cardiomyopathy (prior MI, Q waves).'
        },
        {
          text: 'Non-ST-elevation MI',
          isCorrect: false,
          feedback: 'Incorrect. Normal troponin and no acute EKG changes rule out NSTEMI.'
        },
        {
          text: 'Exacerbation of COPD',
          isCorrect: false,
          feedback: 'Incorrect. COPD is less likely without wheezing or smoking-related exam findings.'
        }
      ]
    },
    {
      id: 'step3',
      scenario: 'The patient has decompensated HFrEF. His O2 sat drops to 87% despite 2L NC, and BP is now 145/88.',
      vitals: {
        bloodPressure: '145/88',
        heartRate: 92,
        respiratoryRate: 28,
        oxygenSaturation: 87,
        temperature: 36.6
      },
      options: [
        {
          text: 'IV furosemide 40 mg, increase oxygen to 4L NC',
          isCorrect: true,
          feedback: 'Correct! IV furosemide addresses volume overload, and higher-flow oxygen targets hypoxia in decompensated HFrEF.'
        },
        {
          text: 'IV nitroglycerin, heparin infusion, aspirin',
          isCorrect: false,
          feedback: 'Incorrect. Nitroglycerin, heparin, and aspirin are for ACS, not indicated without ischemia.'
        },
        {
          text: 'Nebulized albuterol, IV methylprednisolone',
          isCorrect: false,
          feedback: 'Incorrect. Albuterol and steroids are for COPD/asthma, not HFrEF.'
        }
      ]
    },
    {
      id: 'step4',
      scenario: 'After furosemide, urine output is 1L, but O2 sat is 85% on 4L NC. BP is 135/85, HR 95. Exam shows persistent crackles. The patient is alert but dyspneic.',
      vitals: {
        bloodPressure: '135/85',
        heartRate: 95,
        respiratoryRate: 28,
        oxygenSaturation: 85,
        temperature: 36.6
      },
      options: [
        {
          text: 'Start BiPAP',
          isCorrect: true,
          feedback: 'Correct! BiPAP improves oxygenation, reduces preload and afterload, and decreases work of breathing in HFrEF with pulmonary edema, avoiding intubation.'
        },
        {
          text: 'Switch to non-rebreather mask at 15L/min',
          isCorrect: false,
          feedback: 'Incorrect. Non-rebreather increases O2 but does not reduce afterload or work of breathing like BiPAP.'
        },
        {
          text: 'Intubate and transfer to ICU',
          isCorrect: false,
          feedback: 'Incorrect. Intubation is excessive without imminent respiratory failure; BiPAP is less invasive.'
        }
      ]
    },
    {
      id: 'step5',
      scenario: 'With BiPAP (IPAP 10, EPAP 5), O2 sat improves to 92%. BP is 130/80, edema reduced to 1+. Cardiology is consulted for HFrEF and ischemic evaluation.',
      vitals: {
        bloodPressure: '130/80',
        heartRate: 90,
        respiratoryRate: 24,
        oxygenSaturation: 92,
        temperature: 36.6
      },
      options: [
        {
          text: 'Echo findings, BNP, EKG, and plan for cath when euvolemic',
          isCorrect: true,
          feedback: 'Correct! Providing echo, BNP, EKG, and cath plan ensures cardiology has relevant data for HFrEF and ischemia.'
        },
        {
          text: 'Chest X-ray and request for immediate cath',
          isCorrect: false,
          feedback: 'Incorrect. Immediate cath is risky while volume overloaded. X-ray is less critical for consult.'
        },
        {
          text: 'Troponin trend and diabetes history',
          isCorrect: false,
          feedback: 'Incorrect. Troponin is normal; diabetes is secondary to HFrEF data.'
        }
      ]
    },
    {
      id: 'step6',
      scenario: 'Overnight, the patient develops irregular tachycardia (HR 120-140). EKG shows atrial fibrillation. BP is 125/78, O2 sat 90% on BiPAP.',
      vitals: {
        bloodPressure: '125/78',
        heartRate: 130,
        respiratoryRate: 24,
        oxygenSaturation: 90,
        temperature: 36.6
      },
      options: [
        {
          text: 'Metoprolol IV 5 mg, reassess in 15 min',
          isCorrect: true,
          feedback: 'Correct! IV metoprolol controls rate in new AF, safe with marginal BP.'
        },
        {
          text: 'Amiodarone IV bolus and infusion',
          isCorrect: false,
          feedback: 'Incorrect. Amiodarone risks toxicity and is reserved for refractory cases.'
        },
        {
          text: 'Synchronized cardioversion',
          isCorrect: false,
          feedback: 'Incorrect. Cardioversion is risky in acute HF with marginal BP and unknown AF duration.'
        }
      ]
    },
    {
      id: 'step7',
      scenario: 'HR stabilizes to 90 with metoprolol. CHA2DS2-VASc score is 4 (age, HTN, DM, prior MI). The patient is euvolemic, and heart cath is planned tomorrow.',
      vitals: {
        bloodPressure: '125/78',
        heartRate: 90,
        respiratoryRate: 20,
        oxygenSaturation: 94,
        temperature: 36.6
      },
      options: [
        {
          text: 'Defer anticoagulation until after heart cath',
          isCorrect: true,
          feedback: 'Correct! Deferring anticoagulation until after cath minimizes bleeding risk, given upcoming procedure.'
        },
        {
          text: 'Start apixaban 5 mg BID now',
          isCorrect: false,
          feedback: 'Incorrect. Starting apixaban now increases bleeding risk during cath.'
        },
        {
          text: 'Start heparin infusion now',
          isCorrect: false,
          feedback: 'Incorrect. Heparin is unnecessary and risky pre-cath without acute thrombosis.'
        }
      ]
    },
    {
      id: 'step8',
      scenario: 'Left heart catheterization reveals a culprit lesion in the mid-LAD artery with 90% stenosis. A drug-eluting stent is placed. BP is 125/80, HR 85.',
      vitals: {
        bloodPressure: '125/80',
        heartRate: 85,
        respiratoryRate: 20,
        oxygenSaturation: 94,
        temperature: 36.6
      },
      options: [
        {
          text: 'Initiate DAPT (aspirin 81 mg, clopidogrel 75 mg) and send genetic testing for clopidogrel',
          isCorrect: true,
          feedback: 'Correct! DAPT is standard post-PCI with a drug-eluting stent. Genetic testing assesses clopidogrel metabolism.'
        },
        {
          text: 'Start aspirin alone, defer clopidogrel',
          isCorrect: false,
          feedback: 'Incorrect. Aspirin alone is insufficient post-PCI; DAPT is required to reduce stent thrombosis risk.'
        },
        {
          text: 'Initiate heparin infusion and plan CABG',
          isCorrect: false,
          feedback: 'Incorrect. CABG is unnecessary for a single-vessel lesion treated with PCI.'
        }
      ]
    },
    {
      id: 'step9',
      scenario: 'Right heart catheterization is performed to assess volume status. Values: RAP 4 mmHg, PAP 28/12 mmHg (mean 18 mmHg), PCWP 10 mmHg, CO 3.2 L/min, CI 1.8 L/min/m².',
      vitals: {
        bloodPressure: '125/80',
        heartRate: 85,
        respiratoryRate: 20,
        oxygenSaturation: 94,
        temperature: 36.6
      },
      options: [
        {
          text: 'Low filling pressures from overdiuresis, with low cardiac output/index',
          isCorrect: true,
          feedback: 'Correct! Low RAP (4 mmHg), PCWP (10 mmHg), and PAP (mean 18 mmHg) indicate overdiuresis, while low CO (3.2 L/min) and CI (1.8 L/min/m²) reflect HFrEF.'
        },
        {
          text: 'Elevated filling pressures from cardiorenal syndrome',
          isCorrect: false,
          feedback: 'Incorrect. Elevated filling pressures (PCWP >15 mmHg) would suggest cardiorenal syndrome.'
        },
        {
          text: 'Normal cardiac output with euvolemia',
          isCorrect: false,
          feedback: 'Incorrect. CO and CI are low, indicating impaired cardiac function.'
        }
      ]
    },
    {
      id: 'step10',
      scenario: 'Two days post-cath, labs show: Cr 2.4 (from 1.2), BUN 42, HCO3 29, K 4.8, urine output 350 mL/day. Urine studies: FeNa 2.1%, no casts.',
      vitals: {
        bloodPressure: '120/75',
        heartRate: 85,
        respiratoryRate: 20,
        oxygenSaturation: 94,
        temperature: 36.6
      },
      options: [
        {
          text: 'AKI from contrast nephropathy and overdiuresis',
          isCorrect: true,
          feedback: 'Correct! Elevated Cr, BUN, HCO3, low urine output, and FeNa 2.1% indicate AKI from contrast and overdiuresis.'
        },
        {
          text: 'Cardiorenal syndrome type 1',
          isCorrect: false,
          feedback: 'Incorrect. Cardiorenal syndrome is less likely with low PCWP and RAP on RHC.'
        },
        {
          text: 'Post-renal AKI from obstruction',
          isCorrect: false,
          feedback: 'Incorrect. Post-renal AKI requires obstruction, not suggested here.'
        }
      ]
    },
    {
      id: 'step11',
      scenario: 'AKI is confirmed. BP is 120/75, HR 85. The patient is euvolemic but frail.',
      vitals: {
        bloodPressure: '120/75',
        heartRate: 85,
        respiratoryRate: 20,
        oxygenSaturation: 94,
        temperature: 36.6
      },
      options: [
        {
          text: 'Hold furosemide, cautious IV fluids, daily labs',
          isCorrect: true,
          feedback: 'Correct! Holding furosemide and cautious fluids address AKI, considering frailty.'
        },
        {
          text: 'Increase furosemide, consult nephrology',
          isCorrect: false,
          feedback: 'Incorrect. Increasing furosemide worsens AKI; nephrology is premature.'
        },
        {
          text: 'Start dialysis, hold lisinopril',
          isCorrect: false,
          feedback: 'Incorrect. Dialysis is excessive without severe complications; holding lisinopril is unnecessary.'
        }
      ]
    },
    {
      id: 'step12',
      scenario: 'AKI resolves (Cr 1.3). The patient is euvolemic, BP 115/70, HR 80. Cardiology recommends initiating GDMT for HFrEF (EF 35%).',
      vitals: {
        bloodPressure: '115/70',
        heartRate: 80,
        respiratoryRate: 18,
        oxygenSaturation: 96,
        temperature: 36.6
      },
      options: [
        {
          text: 'Entresto 24/26 mg BID',
          isCorrect: true,
          feedback: 'Correct! Entresto (ARNI) is prioritized first in GDMT for HFrEF (EF 35%) due to superior mortality benefit.'
        },
        {
          text: 'Metoprolol succinate 25 mg daily',
          isCorrect: false,
          feedback: 'Incorrect. Beta-blockers are critical but initiated after ARNI to ensure BP tolerance.'
        },
        {
          text: 'Empagliflozin 10 mg daily',
          isCorrect: false,
          feedback: 'Incorrect. SGLT2i is typically added after ARNI and beta-blockers in GDMT sequencing.'
        }
      ]
    },
    {
      id: 'step13',
      scenario: 'Entresto is started and tolerated. Labs show: K 4.3, Cr 1.3, BP 112/68, HR 78. The patient is asymptomatic, and GDMT optimization continues.',
      vitals: {
        bloodPressure: '112/68',
        heartRate: 78,
        respiratoryRate: 18,
        oxygenSaturation: 96,
        temperature: 36.6
      },
      options: [
        {
          text: 'Metoprolol succinate 25 mg daily',
          isCorrect: true,
          feedback: 'Correct! Metoprolol succinate is the next GDMT step to reduce mortality and control HR in HFrEF.'
        },
        {
          text: 'Spironolactone 25 mg daily',
          isCorrect: false,
          feedback: 'Incorrect. MRA is added after ARNI and beta-blockers to minimize hyperkalemia risk.'
        },
        {
          text: 'Hydralazine/isosorbide dinitrate',
          isCorrect: false,
          feedback: 'Incorrect. Hydralazine/ISDN is reserved for specific populations and not a primary GDMT choice.'
        }
      ]
    },
    {
      id: 'step14',
      scenario: 'Metoprolol succinate is added. Labs show: K 4.5, Cr 1.4, BP 110/70, HR 70. The patient remains stable. Cardiology advises continuing GDMT.',
      vitals: {
        bloodPressure: '110/70',
        heartRate: 70,
        respiratoryRate: 18,
        oxygenSaturation: 96,
        temperature: 36.6
      },
      options: [
        {
          text: 'Spironolactone 12.5 mg daily',
          isCorrect: true,
          feedback: 'Correct! Spironolactone (MRA) is added to Entresto and metoprolol to further reduce morbidity in HFrEF.'
        },
        {
          text: 'Empagliflozin 10 mg daily',
          isCorrect: false,
          feedback: 'Incorrect. SGLT2i is typically the final GDMT pillar, added after ARNI, beta-blockers, and MRA.'
        },
        {
          text: 'Amlodipine 5 mg daily',
          isCorrect: false,
          feedback: 'Incorrect. Amlodipine lacks mortality benefit in HFrEF and is not part of GDMT.'
        }
      ]
    },
    {
      id: 'step15',
      scenario: 'Iron studies confirm deficiency (ferritin 45, TSAT 14%). The patient is anemic (Hb 12.0).',
      vitals: {
        bloodPressure: '110/70',
        heartRate: 70,
        respiratoryRate: 18,
        oxygenSaturation: 96,
        temperature: 36.6
      },
      options: [
        {
          text: 'Administer IV ferric carboxymaltose, recheck iron in 4 weeks',
          isCorrect: true,
          feedback: 'Correct! IV ferric carboxymaltose effectively corrects iron deficiency in HFrEF, improving outcomes.'
        },
        {
          text: 'Start oral ferrous sulfate 325 mg TID',
          isCorrect: false,
          feedback: 'Incorrect. Oral iron is poorly absorbed in HFrEF and less effective.'
        },
        {
          text: 'Transfuse 1 unit PRBC',
          isCorrect: false,
          feedback: 'Incorrect. Transfusion is unwarranted for Hb 12.0 without symptoms.'
        }
      ]
    },
    {
      id: 'step16',
      scenario: 'The patient expresses concern about returning to homelessness and IVDU, fearing ART non-adherence.',
      vitals: {
        bloodPressure: '110/70',
        heartRate: 70,
        respiratoryRate: 18,
        oxygenSaturation: 96,
        temperature: 36.6
      },
      options: [
        {
          text: 'Counsel on pill organizers, refer to social work for cost assistance',
          isCorrect: true,
          feedback: 'Correct! Pill organizers and social work referral address adherence barriers effectively.'
        },
        {
          text: 'Reduce GDMT to one medication',
          isCorrect: false,
          feedback: 'Incorrect. Reducing GDMT compromises HFrEF outcomes.'
        },
        {
          text: 'No intervention, assume hospital education is sufficient',
          isCorrect: false,
          feedback: 'Incorrect. Ignoring adherence risks recurrent decompensation.'
        }
      ]
    },
    {
      id: 'step17',
      scenario: 'The patient has a drug-eluting stent in the LAD, placed for severe stenosis. AF persists with CHA2DS2-VASc 4, HAS-BLED 2. He is stable on Entresto, metoprolol succinate, spironolactone, empagliflozin, aspirin, clopidogrel, and apixaban. He is frail and lives alone.',
      vitals: {
        bloodPressure: '110/70',
        heartRate: 70,
        respiratoryRate: 18,
        oxygenSaturation: 96,
        temperature: 36.6
      },
      options: [
        {
          text: 'Continue triple therapy (apixaban, aspirin, clopidogrel) for 1 month, then stop aspirin and continue apixaban and clopidogrel for 12 months; arrange cardiology follow-up in 1 week and home health referral',
          isCorrect: true,
          feedback: 'Correct! Brief triple therapy followed by dual therapy balances stroke and stent risks. Early follow-up and home health support the frail patient.'
        },
        {
          text: 'Continue triple therapy indefinitely, follow-up in 3 months',
          isCorrect: false,
          feedback: 'Incorrect. Indefinite triple therapy increases bleeding risk unnecessarily.'
        },
        {
          text: 'Stop apixaban, continue DAPT for 6 months, no follow-up',
          isCorrect: false,
          feedback: 'Incorrect. Stopping apixaban risks stroke in AF with CHA2DS2-VASc 4; short DAPT and no follow-up are unsafe.'
        }
      ]
    }
  ]
};

export default function ER1Page() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleComplete = (answers: { stepId: string; selectedOption: number; isCorrect: boolean; }[]) => {
    setCompleted(true);
    // Calculate score and save progress
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = (correctAnswers / answers.length) * 100;
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
              You've completed the Emergency Room 1 simulation.
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
          <h2 className="text-2xl font-bold text-gray-900">{heartFailureSimulator.title}</h2>
          <Link href="/dashboard/simulators">
            <Button variant="outline">Back to Simulators</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Case Overview</h3>
                <p className="text-gray-600 mb-4">{heartFailureSimulator.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {heartFailureSimulator.specialty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {heartFailureSimulator.difficulty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                    {heartFailureSimulator.estimatedTime} minutes
                  </span>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">Learning Objectives:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
                  {heartFailureSimulator.learningObjectives.map((objective, index) => (
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
                  <p>• Read each scenario carefully and assess the patient's condition.</p>
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

  return <SimulatorInterface simulator={heartFailureSimulator} onComplete={handleComplete} />;
} 