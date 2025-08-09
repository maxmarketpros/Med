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
      question: 'What is your initial diagnostic workup?',
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
      question: 'What is the most likely diagnosis?',
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
    },
    {
      id: 'step3',
      scenario: 'The patient has a COPD exacerbation with influenza. ABG shows pH 7.28, pCO2 65. BP 135/85, HR 105, RR 26, temp 38.0°C, O2 sat 88% on 4L NC.',
      question: 'What is your initial treatment plan?',
      vitals: {
        bloodPressure: '135/85',
        heartRate: 105,
        respiratoryRate: 26,
        oxygenSaturation: 88,
        temperature: 38.0
      },
      options: [
        {
          text: 'Albuterol/ipratropium nebulizer, prednisone, oseltamivir, BiPAP',
          isCorrect: true,
          feedback: 'Correct! Albuterol/ipratropium, prednisone, oseltamivir, and BiPAP address COPD exacerbation, influenza, and severe respiratory acidosis, per GOLD and ATS/IDSA guidelines.'
        },
        {
          text: 'Ceftriaxone, azithromycin, furosemide',
          isCorrect: false,
          feedback: 'Incorrect. Antibiotics are unnecessary without bacterial infection; furosemide is for heart failure, not COPD.'
        },
        {
          text: 'Intubation, amoxicillin, IV fluids',
          isCorrect: false,
          feedback: 'Incorrect. Intubation is excessive with BiPAP response; amoxicillin doesn\'t cover influenza.'
        }
      ]
    },
    {
      id: 'step4',
      scenario: 'BiPAP improves O2 sat to 94%, sputum culture grows normal flora. The patient is on albuterol/ipratropium, prednisone, and oseltamivir. BP 140/90, HR 100, RR 22.',
      question: 'Which ABG indicates the ability to wean BiPAP to nasal cannula?',
      vitals: {
        bloodPressure: '140/90',
        heartRate: 100,
        respiratoryRate: 22,
        oxygenSaturation: 94,
        temperature: 38.0
      },
      options: [
        {
          text: 'pH 7.38, pCO2 45, pO2 70',
          isCorrect: true,
          feedback: 'Correct! ABG with pH 7.38, pCO2 45, pO2 70 shows resolved respiratory acidosis, allowing weaning to nasal cannula, per GOLD guidelines.'
        },
        {
          text: 'pH 7.25, pCO2 70, pO2 55',
          isCorrect: false,
          feedback: 'Incorrect. Worsened respiratory acidosis (pH 7.25, pCO2 70) indicates BiPAP is still needed.'
        },
        {
          text: 'pH 7.20, pCO2 60, pO2 65, HCO3 18',
          isCorrect: false,
          feedback: 'Incorrect. Metabolic and respiratory acidosis (pH 7.20, pCO2 60, HCO3 18) requires BiPAP and addressing metabolic causes.'
        }
      ]
    },
    {
      id: 'step5',
      scenario: 'ABG shows pH 7.38, pCO2 45, pO2 70. The patient is weaned to nasal cannula, O2 sat 92%. He feels better, but on day 3 develops sudden worsening dyspnea and tachycardia. Vitals: BP 110/70, HR 120, RR 30, O2 sat 85% on 3L NC. Exam: clear lungs, no edema.',
      question: 'What test do you order?',
      vitals: {
        bloodPressure: '110/70',
        heartRate: 120,
        respiratoryRate: 30,
        oxygenSaturation: 85,
        temperature: 38.0
      },
      physicalExam: 'Clear lungs, no edema.',
      options: [
        {
          text: 'CT pulmonary angiogram',
          isCorrect: true,
          feedback: 'Correct! CTPA is indicated for sudden hypoxia and tachycardia to evaluate for PE, per CHEST guidelines.'
        },
        {
          text: 'Repeat chest X-ray',
          isCorrect: false,
          feedback: 'Incorrect. Repeat X-ray is non-specific for acute hypoxia.'
        },
        {
          text: 'Serum troponin',
          isCorrect: false,
          feedback: 'Incorrect. Troponin is for ACS, less likely without ischemic symptoms.'
        }
      ]
    },
    {
      id: 'step6',
      scenario: 'CTPA shows a saddle pulmonary embolism. D-dimer is elevated. BP 115/75, HR 118, O2 sat 90% on 6L NC.',
      question: 'What is your management plan, and what additional studies are needed?',
      vitals: {
        bloodPressure: '115/75',
        heartRate: 118,
        respiratoryRate: 30,
        oxygenSaturation: 90,
        temperature: 38.0
      },
      imaging: 'CTPA shows saddle pulmonary embolism.',
      labResults: 'D-dimer elevated.',
      options: [
        {
          text: 'Start heparin infusion, order echocardiogram and Doppler ultrasound',
          isCorrect: true,
          feedback: 'Correct! Heparin is first-line for non-massive saddle PE; echocardiogram assesses right heart strain, and Doppler ultrasound evaluates DVT, per CHEST guidelines.'
        },
        {
          text: 'Thrombolytics, repeat CTPA',
          isCorrect: false,
          feedback: 'Incorrect. Thrombolytics are for massive PE with instability; repeat CTPA is unnecessary.'
        },
        {
          text: 'Start aspirin, order BNP',
          isCorrect: false,
          feedback: 'Incorrect. Aspirin is ineffective for PE; BNP is for heart failure.'
        }
      ]
    },
    {
      id: 'step7',
      scenario: 'Heparin is started. Echocardiogram shows very mild right heart strain but no hemodynamic instability. The patient is on albuterol/ipratropium, prednisone, oseltamivir, heparin. BP 120/80, HR 90, O2 sat 94% on 4L NC.',
      question: 'What is your management plan?',
      vitals: {
        bloodPressure: '120/80',
        heartRate: 90,
        respiratoryRate: 24,
        oxygenSaturation: 94,
        temperature: 38.0
      },
      imaging: 'Echocardiogram shows very mild right heart strain, no hemodynamic instability.',
      options: [
        {
          text: 'Continue heparin, monitor on telemetry/pulse oximetry',
          isCorrect: true,
          feedback: 'Correct! Mild right heart strain without hemodynamic instability warrants continuing heparin with telemetry and pulse oximetry monitoring, per CHEST guidelines.'
        },
        {
          text: 'Administer tPA',
          isCorrect: false,
          feedback: 'Incorrect. tPA is for massive PE with instability, not mild strain.'
        },
        {
          text: 'Transfer to MICU for EKOS catheter',
          isCorrect: false,
          feedback: 'Incorrect. EKOS catheter is for high-risk PE, not indicated here.'
        }
      ]
    },
    {
      id: 'step8',
      scenario: 'Heparin continues, vitals and oxygen needs are stable, confirming PE stability. Doppler ultrasound is negative for DVT. BP 125/80, HR 85, O2 sat 94% on 2L NC.',
      question: 'What is your next step?',
      vitals: {
        bloodPressure: '125/80',
        heartRate: 85,
        respiratoryRate: 20,
        oxygenSaturation: 94,
        temperature: 37.8
      },
      imaging: 'Doppler ultrasound negative for DVT.',
      options: [
        {
          text: 'Continue heparin, plan for oral anticoagulation',
          isCorrect: true,
          feedback: 'Correct! Stable vitals and oxygen needs confirm PE stability, allowing planning for oral anticoagulation, per CHEST guidelines.'
        },
        {
          text: 'Order repeat CTPA',
          isCorrect: false,
          feedback: 'Incorrect. Repeat CTPA is unnecessary with clinical stability.'
        },
        {
          text: 'Check repeat D-dimer',
          isCorrect: false,
          feedback: 'Incorrect. Repeat D-dimer is non-specific post-PE diagnosis.'
        }
      ]
    },
    {
      id: 'step9',
      scenario: 'On day 5, the patient develops hematemesis and melena. Vitals: BP 90/60, HR 130, RR 24, O2 sat 92% on 4L NC. Labs: Hb 7 (from 14), INR 1.2.',
      question: 'What is your management plan?',
      vitals: {
        bloodPressure: '90/60',
        heartRate: 130,
        respiratoryRate: 24,
        oxygenSaturation: 92,
        temperature: 37.8
      },
      labResults: 'Hb 7 (from 14), INR 1.2.',
      physicalExam: 'Hematemesis and melena.',
      options: [
        {
          text: 'Transfer to MICU, stop heparin, transfuse PRBCs, start IV PPI',
          isCorrect: true,
          feedback: 'Correct! MICU transfer, stopping heparin, transfusing PRBCs, and starting IV PPI address massive GI bleed with instability and recent PE, per ACG guidelines.'
        },
        {
          text: 'Continue heparin, administer IV fluids, order EGD',
          isCorrect: false,
          feedback: 'Incorrect. Continuing heparin worsens bleeding; fluids alone are insufficient.'
        },
        {
          text: 'Stop heparin, start antibiotics, order CT abdomen',
          isCorrect: false,
          feedback: 'Incorrect. Antibiotics and CT abdomen are irrelevant for GI bleed.'
        }
      ]
    },
    {
      id: 'step10',
      scenario: 'In the MICU, EGD reveals a bleeding peptic ulcer, treated with epinephrine injection and clipping. Hb stabilizes at 9.5. BP 120/80, HR 90.',
      question: 'What test do you order?',
      vitals: {
        bloodPressure: '120/80',
        heartRate: 90,
        respiratoryRate: 20,
        oxygenSaturation: 96,
        temperature: 37.5
      },
      labResults: 'Hb stabilized at 9.5.',
      imaging: 'EGD reveals bleeding peptic ulcer, treated with epinephrine injection and clipping.',
      options: [
        {
          text: 'Serum H. pylori testing',
          isCorrect: true,
          feedback: 'Correct! H. pylori testing guides ulcer treatment and prevents recurrence, per ACG guidelines.'
        },
        {
          text: 'Repeat EGD',
          isCorrect: false,
          feedback: 'Incorrect. Repeat EGD is unnecessary without re-bleeding.'
        },
        {
          text: 'Serum gastrin level',
          isCorrect: false,
          feedback: 'Incorrect. Gastrin level is for suspected Zollinger-Ellison syndrome, not typical here.'
        }
      ]
    },
    {
      id: 'step11',
      scenario: 'H. pylori testing is positive. No re-bleeding occurs. Hb stable at 9.5. The patient is on IV PPI, albuterol/ipratropium, prednisone, oseltamivir.',
      question: 'What treatment do you initiate?',
      vitals: {
        bloodPressure: '120/80',
        heartRate: 90,
        respiratoryRate: 20,
        oxygenSaturation: 96,
        temperature: 37.5
      },
      labResults: 'H. pylori positive, Hb stable at 9.5.',
      options: [
        {
          text: 'Bismuth, tetracycline, metronidazole, PPI',
          isCorrect: true,
          feedback: 'Correct! Bismuth, tetracycline, metronidazole, and PPI (quadruple therapy) is preferred for H. pylori eradication, especially in high-resistance areas, per ACG guidelines.'
        },
        {
          text: 'Clarithromycin, amoxicillin, PPI',
          isCorrect: false,
          feedback: 'Incorrect. Clarithromycin-based therapy has lower efficacy in high-resistance areas.'
        },
        {
          text: 'Levofloxacin, metronidazole, PPI',
          isCorrect: false,
          feedback: 'Incorrect. Levofloxacin-based therapy is second-line due to resistance concerns.'
        }
      ]
    },
    {
      id: 'step12',
      scenario: 'H. pylori therapy is started. No re-bleeding occurs. Hb stable at 9.5. The patient needs anticoagulation for PE.',
      question: 'What is your anticoagulation plan?',
      vitals: {
        bloodPressure: '120/80',
        heartRate: 90,
        respiratoryRate: 20,
        oxygenSaturation: 96,
        temperature: 37.5
      },
      labResults: 'Hb stable at 9.5.',
      options: [
        {
          text: 'Restart heparin, monitor Hb',
          isCorrect: true,
          feedback: 'Correct! Restarting heparin with Hb monitoring balances PE treatment and bleed risk after H. pylori therapy and no re-bleeding, per CHEST guidelines.'
        },
        {
          text: 'Start apixaban, repeat EGD',
          isCorrect: false,
          feedback: 'Incorrect. Apixaban is less reversible than heparin; repeat EGD is unnecessary.'
        },
        {
          text: 'Switch to warfarin, check INR',
          isCorrect: false,
          feedback: 'Incorrect. Warfarin is less preferred due to bleed risk and INR monitoring complexity.'
        }
      ]
    },
    {
      id: 'step13',
      scenario: 'Heparin is restarted without bleeding. The patient is stable on heparin, IV PPI, albuterol/ipratropium, prednisone, oseltamivir. BP 130/85, HR 80, O2 sat 95% on 1L NC.',
      question: 'What is your next step?',
      vitals: {
        bloodPressure: '130/85',
        heartRate: 80,
        respiratoryRate: 18,
        oxygenSaturation: 95,
        temperature: 37.2
      },
      options: [
        {
          text: 'Switch to oral PPI, plan discharge',
          isCorrect: true,
          feedback: 'Correct! Switching to oral PPI is appropriate with no re-bleeding, planning discharge ensures stability, per ACG guidelines.'
        },
        {
          text: 'Stop PPI, start H2 blocker',
          isCorrect: false,
          feedback: 'Incorrect. Stopping PPI risks re-bleeding; H2 blockers are less effective.'
        },
        {
          text: 'Increase heparin dose, repeat Hb',
          isCorrect: false,
          feedback: 'Incorrect. Increasing heparin risks bleeding without indication.'
        }
      ]
    },
    {
      id: 'step14',
      scenario: 'The PE occurred during hospitalization with influenza.',
      question: 'Is the PE provoked or unprovoked?',
      options: [
        {
          text: 'Provoked',
          isCorrect: true,
          feedback: 'Correct! PE during hospitalization with influenza is provoked, guiding shorter anticoagulation duration, per CHEST guidelines.'
        },
        {
          text: 'Unprovoked',
          isCorrect: false,
          feedback: 'Incorrect. Unprovoked PE requires no clear trigger, unlike here.'
        },
        {
          text: 'Indeterminate',
          isCorrect: false,
          feedback: 'Incorrect. Clear triggers (hospitalization, influenza) make indeterminate unlikely.'
        }
      ]
    },
    {
      id: 'step15',
      scenario: 'The PE is provoked. The patient has severe COPD based on clinical presentation and imaging findings. Discharge planning is underway.',
      question: 'What is your COPD management plan prior to discharge?',
      vitals: {
        bloodPressure: '130/85',
        heartRate: 80,
        respiratoryRate: 18,
        oxygenSaturation: 95,
        temperature: 37.0
      },
      options: [
        {
          text: 'Start tiotropium, albuterol PRN, smoking cessation counseling',
          isCorrect: true,
          feedback: 'Correct! Tiotropium, albuterol PRN, and smoking cessation counseling are guideline-directed for severe COPD, per GOLD.'
        },
        {
          text: 'Continue prednisone, oxygen therapy',
          isCorrect: false,
          feedback: 'Incorrect. Long-term prednisone is harmful; oxygen is for chronic hypoxia.'
        },
        {
          text: 'Start fluticasone, follow-up PRN',
          isCorrect: false,
          feedback: 'Incorrect. Fluticasone is for frequent exacerbations, not initial therapy.'
        }
      ]
    },
    {
      id: 'step16',
      scenario: 'The patient is on tiotropium, albuterol PRN, and smoking cessation counseling. Bleeding risk is improved, and anticoagulation needs to transition to outpatient therapy.',
      question: 'What is your outpatient anticoagulation plan?',
      vitals: {
        bloodPressure: '130/85',
        heartRate: 80,
        respiratoryRate: 18,
        oxygenSaturation: 95,
        temperature: 37.0
      },
      options: [
        {
          text: 'Switch to apixaban, continue PPI',
          isCorrect: true,
          feedback: 'Correct! Apixaban with PPI is appropriate for outpatient PE treatment with improved bleeding risk, per CHEST guidelines.'
        },
        {
          text: 'Continue heparin, monitor INR',
          isCorrect: false,
          feedback: 'Incorrect. Heparin is not outpatient therapy; INR is for warfarin.'
        },
        {
          text: 'Switch to warfarin, check INR',
          isCorrect: false,
          feedback: 'Incorrect. Warfarin is less preferred due to bleed risk and INR monitoring complexity.'
        }
      ]
    },
    {
      id: 'step17',
      scenario: 'The patient is stable on apixaban, PPI, tiotropium, albuterol. He asks about influenza prevention.',
      question: 'What do you recommend?',
      vitals: {
        bloodPressure: '130/85',
        heartRate: 80,
        respiratoryRate: 18,
        oxygenSaturation: 95,
        temperature: 37.0
      },
      options: [
        {
          text: 'Annual influenza vaccination',
          isCorrect: true,
          feedback: 'Correct! Annual influenza vaccination prevents exacerbations in COPD, per ATS/IDSA guidelines.'
        },
        {
          text: 'Prophylactic oseltamivir',
          isCorrect: false,
          feedback: 'Incorrect. Prophylactic oseltamivir is not standard for prevention.'
        },
        {
          text: 'Pneumococcal vaccination only',
          isCorrect: false,
          feedback: 'Incorrect. Pneumococcal vaccination is important but doesn\'t address influenza.'
        }
      ]
    },
    {
      id: 'step18',
      scenario: 'The patient is ready for discharge. He has severe COPD and a recent PE.',
      question: 'What is your follow-up plan?',
      vitals: {
        bloodPressure: '130/85',
        heartRate: 80,
        respiratoryRate: 18,
        oxygenSaturation: 95,
        temperature: 37.0
      },
      options: [
        {
          text: 'Pulmonology and hematology follow-up in 1 month',
          isCorrect: true,
          feedback: 'Correct! Pulmonology and hematology follow-up ensure COPD and PE management, per GOLD and CHEST guidelines.'
        },
        {
          text: 'GI follow-up for repeat EGD',
          isCorrect: false,
          feedback: 'Incorrect. GI follow-up is unnecessary without re-bleeding.'
        },
        {
          text: 'Cardiology follow-up for echo',
          isCorrect: false,
          feedback: 'Incorrect. Cardiology follow-up is unnecessary with normal echo.'
        }
      ]
    },
    {
      id: 'step19',
      scenario: 'The patient reports ongoing smoking and difficulty quitting.',
      question: 'What is your management?',
      options: [
        {
          text: 'Refer to smoking cessation program, prescribe nicotine replacement',
          isCorrect: true,
          feedback: 'Correct! Smoking cessation program and nicotine replacement improve quit rates in COPD, per GOLD guidelines.'
        },
        {
          text: 'Prescribe bupropion, monitor mood',
          isCorrect: false,
          feedback: 'Incorrect. Bupropion requires psychiatric evaluation and isn\'t first-line.'
        },
        {
          text: 'Prescribe varenicline, follow-up in 1 week',
          isCorrect: false,
          feedback: 'Incorrect. Varenicline is effective but requires monitoring and isn\'t first-line.'
        }
      ]
    },
    {
      id: 'step20',
      scenario: 'The patient is discharged on apixaban, PPI, tiotropium, albuterol, nicotine replacement, with pulmonology and hematology follow-up. He needs a PE duration plan.',
      question: 'What is your anticoagulation duration?',
      options: [
        {
          text: 'Continue apixaban for 3 months, reassess',
          isCorrect: true,
          feedback: 'Correct! Three months of apixaban for provoked PE with reassessment is standard, per CHEST guidelines.'
        },
        {
          text: 'Lifelong apixaban',
          isCorrect: false,
          feedback: 'Incorrect. Lifelong anticoagulation is for unprovoked PE or high-risk patients.'
        },
        {
          text: 'Extend apixaban to 6 months',
          isCorrect: false,
          feedback: 'Incorrect. Six months is excessive for provoked PE without ongoing risk.'
        }
      ]
    },
    {
      id: 'step21',
      scenario: 'The patient is stable with no re-bleeding or PE recurrence. He is on apixaban for 3 months and H. pylori treatment is planned.',
      question: 'What additional test do you order?',
      options: [
        {
          text: 'H. pylori stool antigen to confirm eradication',
          isCorrect: true,
          feedback: 'Correct! H. pylori stool antigen confirms eradication post-treatment, preventing ulcer recurrence, per ACG guidelines.'
        },
        {
          text: 'Repeat EGD',
          isCorrect: false,
          feedback: 'Incorrect. Repeat EGD is unnecessary without symptoms.'
        },
        {
          text: 'Serum gastrin level',
          isCorrect: false,
          feedback: 'Incorrect. Gastrin level is for rare conditions, not H. pylori follow-up.'
        }
      ]
    },
    {
      id: 'step22',
      scenario: 'H. pylori stool antigen is ordered. The patient is stable on apixaban, PPI, tiotropium, albuterol, and nicotine replacement.',
      question: 'What additional vaccination do you recommend?',
      options: [
        {
          text: 'Pneumococcal vaccination',
          isCorrect: true,
          feedback: 'Correct! Pneumococcal vaccination prevents pneumonia in COPD patients, complementing influenza vaccination, per GOLD and CDC guidelines.'
        },
        {
          text: 'Hepatitis B vaccination',
          isCorrect: false,
          feedback: 'Incorrect. Hepatitis B vaccination is not prioritized in COPD without specific risk factors.'
        },
        {
          text: 'No additional vaccinations',
          isCorrect: false,
          feedback: 'Incorrect. Pneumococcal vaccination is recommended for COPD to prevent exacerbations.'
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