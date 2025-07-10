'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function FinalExamPage() {
  useEffect(() => {
    // Final Exam JavaScript functionality
    const scenarios = [
      {
        scenario: "A 62-year-old male with COPD presents with acute dyspnea 12 hours ago. ABG: pH 7.28, PaCO2 65 mmHg, PaO2 55 mmHg, HCO3- 30 mEq/L. He is drowsy but arousable. What is the most appropriate next step?",
        options: ["A. Intubate immediately", "B. Initiate BiPAP with FiO2 0.4", "C. Administer albuterol nebulizer alone", "D. Start IV corticosteroids"],
        correctAnswer: "B. Initiate BiPAP with FiO2 0.4",
        explanation: "The ABG shows acute on chronic respiratory acidosis due to COPD exacerbation. BiPAP is first-line for hypercapnic respiratory failure in arousable patients, per GOLD 2024 guidelines. FiO2 0.4 is titrated to SpO2 88-92%, monitoring PaCO2. Intubation is for unarousable patients, albuterol alone does not address CO2 retention, and corticosteroids are adjunctive."
      },
      {
        scenario: "A 58-year-old female with chest pain, BP 85/50 mmHg, and ECG showing ST elevation in V1-V4 develops pulseless ventricular tachycardia. After defibrillation, what is the most appropriate next step?",
        options: ["A. Amiodarone 150 mg IV bolus", "B. Epinephrine 1 mg IV", "C. Lidocaine 1 mg/kg IV", "D. Metoprolol 5 mg IV"],
        correctAnswer: "A. Amiodarone 150 mg IV bolus",
        explanation: "Post-defibrillation for pulseless VT in STEMI, amiodarone prevents recurrence, per AHA/ACLS 2024 guidelines. Epinephrine is for ongoing arrest, lidocaine is second-line, and metoprolol is contraindicated in shock."
      },
      {
        scenario: "A 72-year-old male hospitalized for pneumonia develops acute confusion, fever, and asterixis. Labs: Ammonia 180 μmol/L, INR 2.5, SCr 2.8 mg/dL. No known liver disease. What is the most likely cause?",
        options: ["A. Sepsis-induced encephalopathy", "B. Acute liver failure", "C. Hepatic encephalopathy from occult cirrhosis", "D. Uremic encephalopathy"],
        correctAnswer: "B. Acute liver failure",
        explanation: "Acute confusion, asterixis, elevated ammonia, and coagulopathy without known liver disease suggest acute liver failure, per AASLD 2022 guidelines. Sepsis lacks ammonia elevation, occult cirrhosis is less likely, and uremic encephalopathy lacks asterixis."
      },
      {
        scenario: "A 47-year-old female with acetaminophen overdose 12 hours ago presents with jaundice, lethargy, and asterixis. Labs: AST 1,200 U/L, ALT 1,100 U/L, bilirubin 10 mg/dL, INR 3.0. What is the most appropriate initial management?",
        options: ["A. N-acetylcysteine IV", "B. Prednisone 40 mg PO", "C. Ursodiol 300 mg PO", "D. Lactulose PO"],
        correctAnswer: "A. N-acetylcysteine IV",
        explanation: "Acetaminophen-induced acute liver failure requires N-acetylcysteine IV, effective even >8 hours post-ingestion, per AASLD 2022 guidelines. Prednisone is for autoimmune hepatitis, ursodiol for cholestasis, and lactulose for chronic liver disease."
      },
      {
        scenario: "A 68-year-old male with ischemic stroke 3 hours ago (NIHSS 15) has BP 200/110 mmHg and recent GI bleed (1 week ago). What is the most appropriate management?",
        options: ["A. IV nitroprusside then tPA", "B. Mechanical thrombectomy", "C. Aspirin 325 mg PO", "D. Nicardipine IV alone"],
        correctAnswer: "D. Nicardipine IV alone",
        explanation: "Recent GI bleed contraindicates tPA, per AHA/ASA 2024 guidelines. Thrombectomy requires large vessel occlusion confirmation. Nicardipine prevents hematoma expansion, and aspirin is delayed."
      },
      {
        scenario: "A 70-year-old female with hemorrhagic stroke (30 mL, thalamic) develops seizures. She has CKD (eGFR 25 mL/min). What is the most appropriate long-term AED?",
        options: ["A. Phenytoin 100 mg TID", "B. Levetiracetam 500 mg BID", "C. Valproate 250 mg TID", "D. Carbamazepine 200 mg BID"],
        correctAnswer: "B. Levetiracetam 500 mg BID",
        explanation: "Levetiracetam is preferred in CKD due to renal clearance, minimal interactions, and efficacy in post-stroke seizures, per AAN 2023 guidelines."
      },
      {
        scenario: "A 55-year-old male with acute PE (submassive, RV strain, normotensive) has recent surgery (10 days ago). What is the most appropriate management?",
        options: ["A. Systemic thrombolytics", "B. Heparin IV with IVC filter", "C. Apixaban 10 mg BID", "D. Catheter-directed thrombolysis"],
        correctAnswer: "B. Heparin IV with IVC filter",
        explanation: "Submassive PE with recent surgery contraindicates thrombolytics. Heparin and IVC filter are indicated, per ASH 2024 guidelines. Apixaban is for outpatient therapy."
      },
      {
        scenario: "A 60-year-old male with acute pancreatitis (lipase 1,200 U/L) develops fever and hypotension on day 5. CT: Necrotizing pancreatitis with abscess. What is the most appropriate intervention?",
        options: ["A. Surgical debridement", "B. Percutaneous drainage + antibiotics", "C. IV fluids alone", "D. TPN initiation"],
        correctAnswer: "B. Percutaneous drainage + antibiotics",
        explanation: "Necrotizing pancreatitis with abscess requires percutaneous drainage and antibiotics, per ACG 2023 guidelines. Surgical debridement is for walled-off necrosis."
      },
      {
        scenario: "A 72-year-old female hospitalized for CHF develops anemia (Hgb 6.5 g/dL, MCV 85 fL, RDW 18%). She has melena and NSAID use history. What is the most appropriate management?",
        options: ["A. PRBC transfusion + IV PPI", "B. Iron infusion alone", "C. Vitamin B12 1,000 mcg IM", "D. Erythropoietin 40,000 units SC"],
        correctAnswer: "A. PRBC transfusion + IV PPI",
        explanation: "Severe normocytic anemia with melena suggests GI bleeding. PRBC transfusion and IV PPI reduce rebleeding risk, per ACG 2024 guidelines."
      },
      {
        scenario: "A 48-year-old male with alcoholism presents with jaundice, fever, and RUQ tenderness. Labs: AST 250 U/L, ALT 90 U/L, bilirubin 12 mg/dL, Maddrey's DF 40. What is the most appropriate therapy?",
        options: ["A. Prednisolone 40 mg PO", "B. Pentoxifylline 400 mg TID", "C. N-acetylcysteine IV", "D. Pentoxifylline + prednisolone"],
        correctAnswer: "A. Prednisolone 40 mg PO",
        explanation: "Severe alcoholic hepatitis requires prednisolone, per AASLD 2022 guidelines. Pentoxifylline is less effective, N-acetylcysteine is for acute liver failure."
      },
      {
        scenario: "A 65-year-old male with AF and VT develops torsades de pointes. ECG: QTc 520 ms, K+ 3.2 mEq/L. What is the most appropriate immediate treatment?",
        options: ["A. Magnesium sulfate 2 g IV", "B. Amiodarone 150 mg IV", "C. Lidocaine 1 mg/kg IV", "D. Procainamide 20 mg/min IV"],
        correctAnswer: "A. Magnesium sulfate 2 g IV",
        explanation: "Torsades with prolonged QTc and hypokalemia requires magnesium sulfate, per AHA 2024 guidelines. Amiodarone, lidocaine, and procainamide worsen QT prolongation."
      },
      {
        scenario: "A 70-year-old female with DVT and recent ICH (2 weeks ago) requires anticoagulation. What is the most appropriate strategy?",
        options: ["A. IVC filter placement", "B. Apixaban 5 mg BID", "C. Enoxaparin 1 mg/kg BID", "D. Warfarin with INR 2-3"],
        correctAnswer: "A. IVC filter placement",
        explanation: "Recent ICH contraindicates anticoagulation. IVC filter prevents PE, per ASH 2024 guidelines."
      },
      {
        scenario: "A 62-year-old male presents with syncope and HR 35 bpm. ECG: Complete heart block with wide QRS escape rhythm. He is on amiodarone for AF. What is the most appropriate next step?",
        options: ["A. Stop amiodarone and observe", "B. Temporary transvenous pacing", "C. Atropine 0.5 mg IV", "D. Isoproterenol infusion"],
        correctAnswer: "B. Temporary transvenous pacing",
        explanation: "Complete heart block with syncope requires urgent pacing, per AHA/ACC 2024 guidelines. Atropine and isoproterenol are ineffective."
      },
      {
        scenario: "A 68-year-old female with HFpEF (EF 60%) presents with flash pulmonary edema, BP 180/100 mmHg, and SpO2 88%. She is on losartan. What is the most appropriate acute therapy?",
        options: ["A. Nitroglycerin IV + furosemide IV", "B. Dobutamine 5 mcg/kg/min", "C. Increase losartan to 100 mg", "D. Milrinone 0.5 mcg/kg/min"],
        correctAnswer: "A. Nitroglycerin IV + furosemide IV",
        explanation: "Flash pulmonary edema in HFpEF requires nitroglycerin and furosemide, per ESC 2024 HF guidelines."
      },
      {
        scenario: "A 60-year-old male with ischemic cardiomyopathy (EF 20%) develops sustained VT with BP 100/60 mmHg. He is on amiodarone. What is the most appropriate next step?",
        options: ["A. Synchronized cardioversion", "B. Increase amiodarone dose", "C. Add mexiletine", "D. Lidocaine 1 mg/kg IV"],
        correctAnswer: "A. Synchronized cardioversion",
        explanation: "Sustained VT with hypotension requires cardioversion, per AHA 2024 guidelines."
      },
      {
        scenario: "A 65-year-old male with COPD exacerbation (SpO2 86%, PaCO2 70 mmHg) fails BiPAP after 2 hours. He is lethargic. What is the most appropriate next step?",
        options: ["A. Intubate and ventilate", "B. Increase BiPAP pressure", "C. Administer sodium bicarbonate", "D. Start high-flow nasal cannula"],
        correctAnswer: "A. Intubate and ventilate",
        explanation: "COPD exacerbation with hypercapnia and lethargy failing BiPAP requires intubation, per GOLD 2024 guidelines."
      },
      {
        scenario: "A 50-year-old male with CAP develops septic shock (BP 80/50 mmHg, lactate 5 mmol/L). Blood cultures: MRSA. What is the most appropriate antibiotic regimen?",
        options: ["A. Vancomycin + piperacillin-tazobactam", "B. Ceftriaxone + azithromycin", "C. Meropenem alone", "D. Daptomycin + levofloxacin"],
        correctAnswer: "A. Vancomycin + piperacillin-tazobactam",
        explanation: "MRSA septic shock requires vancomycin and piperacillin-tazobactam, per IDSA 2024 CAP guidelines."
      },
      {
        scenario: "A 42-year-old female with fever, erythroderma, and mucosal desquamation develops hypotension. She takes carbamazepine. Labs: Eosinophilia, ALT 300 U/L. What is the most appropriate management?",
        options: ["A. Stop carbamazepine + methylprednisolone IV", "B. Epinephrine IM", "C. Vancomycin IV", "D. Hydrocortisone 100 mg IV"],
        correctAnswer: "A. Stop carbamazepine + methylprednisolone IV",
        explanation: "DRESS syndrome requires stopping carbamazepine and methylprednisolone (1-2 mg/kg IV), per EAACI 2024 guidelines."
      },
      {
        scenario: "A 55-year-old male with DKA (pH 7.05, glucose 700 mg/dL, K+ 6.0 mEq/L) develops ventricular fibrillation during insulin therapy. What is the most likely cause?",
        options: ["A. Hypokalemia", "B. Hyperkalemia", "C. Hypomagnesemia", "D. Hypocalcemia"],
        correctAnswer: "A. Hypokalemia",
        explanation: "Insulin in DKA shifts potassium, causing hypokalemia, triggering ventricular fibrillation, per ADA 2024 guidelines."
      },
      {
        scenario: "A 62-year-old female with HHS (glucose 1,200 mg/dL, pH 7.32, Na+ 160 mEq/L) develops seizures during fluid resuscitation. What is the most appropriate management?",
        options: ["A. Lorazepam 2 mg IV", "B. 3% saline IV", "C. Mannitol 1 g/kg IV", "D. Phenytoin 15 mg/kg IV"],
        correctAnswer: "A. Lorazepam 2 mg IV",
        explanation: "Seizures in HHS require lorazepam, per AAN 2023 guidelines. 3% saline is for hyponatremia, mannitol for ICP, and phenytoin for long-term control."
      },
      {
        scenario: "A 70-year-old male with AKI (SCr 4.0 mg/dL) develops hyperkalemia (K+ 7.2 mEq/L) with sine-wave ECG pattern. What is the most urgent treatment?",
        options: ["A. Calcium gluconate 1 g IV", "B. Insulin 10 units IV + D50W", "C. Kayexalate 30 g PO", "D. Sodium bicarbonate 50 mEq IV"],
        correctAnswer: "A. Calcium gluconate 1 g IV",
        explanation: "Sine-wave ECG requires calcium gluconate to stabilize membranes, per NKF 2024 guidelines."
      },
      {
        scenario: "A 58-year-old male with decompensated cirrhosis (MELD 30) presents with hematemesis and BP 90/60 mmHg. Endoscopy is delayed. What is the most appropriate initial therapy?",
        options: ["A. Octreotide IV + ceftriaxone IV + pantoprazole IV", "B. Pantoprazole 80 mg IV bolus alone", "C. Terlipressin IV", "D. Propranolol 20 mg PO"],
        correctAnswer: "A. Octreotide IV + ceftriaxone IV + pantoprazole IV",
        explanation: "Variceal bleeding requires octreotide to reduce portal pressure, ceftriaxone for prophylaxis, and pantoprazole to manage potential non-variceal bleeding, per AASLD 2024 guidelines."
      },
      {
        scenario: "A 65-year-old male with melena, Hgb 6.8 g/dL, and BP 85/50 mmHg has a bleeding duodenal ulcer with adherent clot on endoscopy. What is the most appropriate post-endoscopic therapy?",
        options: ["A. High-dose IV PPI for 72 hours", "B. Octreotide 50 mcg/h IV", "C. Epinephrine injection", "D. Oral sucralfate"],
        correctAnswer: "A. High-dose IV PPI for 72 hours",
        explanation: "A bleeding ulcer requires high-dose IV PPI (e.g., pantoprazole 8 mg/h) to prevent rebleeding, per ACG 2024 guidelines. Pantoprazole during acute management aligns with variceal protocols. Octreotide is for varices, epinephrine is intra-endoscopic."
      },
      {
        scenario: "A 67-year-old female presents with sudden onset severe abdominal pain, hypotension (BP 75/40 mmHg), and a pulsatile abdominal mass. CT angiography shows a 6.5 cm abdominal aortic aneurysm with retroperitoneal hematoma. What is the most appropriate immediate management?",
        options: ["A. Emergent open surgical repair", "B. Endovascular aneurysm repair (EVAR)", "C. IV fluids and blood pressure support", "D. Immediate laparotomy"],
        correctAnswer: "A. Emergent open surgical repair",
        explanation: "Ruptured AAA with hemodynamic instability requires emergent open surgical repair, per SVS 2022 guidelines. EVAR may be considered if patient is stable and anatomy is suitable, but open repair is preferred for unstable patients. IV fluids alone are insufficient, and exploratory laparotomy without vascular surgery consultation is inappropriate."
      }
    ];

    let currentScenario = 0;
    let score = 0;
    let answered = false;
    let totalQuestions = scenarios.length;

    // Fisher-Yates shuffle
    function shuffle(array: any[]) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    // Shuffle scenarios
    const shuffledScenarios = shuffle(scenarios);

    // Load progress from localStorage
    function loadProgress() {
      const savedProgress = localStorage.getItem('finalExamProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentScenario = progress.currentScenario || 0;
        score = progress.score || 0;
      }
    }

    // Save progress to localStorage
    function saveProgress() {
      const progress = {
        currentScenario,
        score,
        timestamp: Date.now()
      };
      localStorage.setItem('finalExamProgress', JSON.stringify(progress));
    }

    function updateQuestionCounter() {
      const counterElement = document.getElementById('question-counter');
      if (counterElement) {
        counterElement.textContent = `Question ${currentScenario + 1} of ${totalQuestions}`;
      }
    }

    function updateProgressBar() {
      const progressElement = document.getElementById('progress');
      if (progressElement) {
        const percentage = Math.round((currentScenario / totalQuestions) * 100);
        progressElement.innerHTML = `
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-emerald-500 h-2 rounded-full transition-all duration-300" style="width: ${percentage}%"></div>
          </div>
          <div class="text-sm text-gray-600 mt-1">Progress: ${percentage}%</div>
        `;
      }
    }

    function displayScenario() {
      if (currentScenario >= shuffledScenarios.length) {
        displayFinalScore();
        return;
      }

      const scenario = shuffledScenarios[currentScenario];
      const scenarioElement = document.getElementById('scenario');
      const optionsElement = document.getElementById('options');
      const feedbackElement = document.getElementById('feedback');
      const explanationElement = document.getElementById('explanation');
      const nextButtonContainer = document.getElementById('next-button-container');

      if (scenarioElement) scenarioElement.textContent = scenario.scenario;
      
      if (optionsElement) {
        optionsElement.innerHTML = '';
        scenario.options.forEach((option: string, index: number) => {
          const button = document.createElement('button');
          button.textContent = option;
          button.className = 'w-full text-left p-3 bg-gray-100 hover:bg-gray-200 rounded transition-colors';
          button.addEventListener('click', () => selectAnswer(option, button));
          optionsElement.appendChild(button);
        });
      }

      if (feedbackElement) {
        feedbackElement.textContent = '';
        feedbackElement.style.opacity = '0';
      }
      if (explanationElement) explanationElement.textContent = '';
      if (nextButtonContainer) nextButtonContainer.innerHTML = '';
      
      answered = false;
      updateQuestionCounter();
      updateProgressBar();
      updateScore();
      saveProgress();
    }

    function selectAnswer(selectedOption: string, buttonElement: HTMLButtonElement) {
      if (answered) return;
      
      const scenario = shuffledScenarios[currentScenario];
      const feedbackElement = document.getElementById('feedback');
      const explanationElement = document.getElementById('explanation');
      const nextButtonContainer = document.getElementById('next-button-container');
      const optionsElement = document.getElementById('options');

      answered = true;

      // Disable all buttons and mark selected
      if (optionsElement) {
        const buttons = optionsElement.querySelectorAll('button');
        buttons.forEach(btn => {
          btn.disabled = true;
          if (btn === buttonElement) {
            if (selectedOption === scenario.correctAnswer) {
              btn.className += ' bg-green-500 text-white';
            } else {
              btn.className += ' bg-red-500 text-white';
            }
          } else if (btn.textContent === scenario.correctAnswer) {
            btn.className += ' bg-green-200';
          }
        });
      }

      if (selectedOption === scenario.correctAnswer) {
        score++;
        if (feedbackElement) {
          feedbackElement.textContent = 'Correct!';
          feedbackElement.className = 'mt-4 font-bold text-green-600 transition-opacity duration-500';
        }
      } else {
        if (feedbackElement) {
          feedbackElement.textContent = 'Incorrect';
          feedbackElement.className = 'mt-4 font-bold text-red-600 transition-opacity duration-500';
        }
      }

      if (feedbackElement) feedbackElement.style.opacity = '1';
      if (explanationElement) explanationElement.textContent = scenario.explanation;

      // Create next button
      if (nextButtonContainer) {
        const nextButton = document.createElement('button');
        nextButton.textContent = currentScenario < shuffledScenarios.length - 1 ? 'Next Question' : 'Complete Exam';
        nextButton.className = 'bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors';
        nextButton.addEventListener('click', nextQuestion);
        nextButtonContainer.appendChild(nextButton);
      }

      updateScore();
      saveProgress();
    }

    function nextQuestion() {
      currentScenario++;
      displayScenario();
    }

    function displayFinalScore() {
      const percentage = Math.round((score / shuffledScenarios.length) * 100);
      const passed = percentage >= 70;
      const scenarioElement = document.getElementById('scenario');
      const optionsElement = document.getElementById('options');
      const feedbackElement = document.getElementById('feedback');
      const explanationElement = document.getElementById('explanation');
      const nextButtonContainer = document.getElementById('next-button-container');
      const progressElement = document.getElementById('progress');
      const counterElement = document.getElementById('question-counter');

      if (counterElement) counterElement.textContent = 'Exam Complete';
      if (progressElement) {
        progressElement.innerHTML = `
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-emerald-500 h-2 rounded-full" style="width: 100%"></div>
          </div>
          <div class="text-sm text-gray-600 mt-1">Progress: 100% Complete</div>
        `;
      }

      if (scenarioElement) {
        scenarioElement.innerHTML = `
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-4">Final Exam Complete!</h2>
            <div class="mb-6">
              <div class="text-3xl font-bold ${passed ? 'text-green-600' : 'text-red-600'} mb-2">
                ${percentage}%
              </div>
              <p class="text-lg mb-2">Your Score: ${score}/${shuffledScenarios.length}</p>
              <div class="p-4 rounded-lg ${passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                <p class="font-semibold ${passed ? 'text-green-800' : 'text-red-800'}">
                  ${passed ? '🎉 Congratulations! You passed!' : '❌ Exam not passed'}
                </p>
                <p class="text-sm ${passed ? 'text-green-700' : 'text-red-700'} mt-1">
                  ${passed 
                    ? 'You are eligible for 1.0 AMA PRA Category 1 Credit™' 
                    : 'A score of 70% or higher is required for CME credits'}
                </p>
              </div>
            </div>
            ${passed ? `
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p class="text-blue-800 font-semibold mb-2">🏆 Certificate Available</p>
                <p class="text-blue-700 text-sm mb-3">Complete the evaluation to claim your CME certificate</p>
                <a href="#" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                  Complete Evaluation & Get Certificate
                </a>
              </div>
            ` : ''}
          </div>
        `;
      }

      if (optionsElement) optionsElement.innerHTML = '';
      if (feedbackElement) feedbackElement.innerHTML = '';
      if (explanationElement) explanationElement.innerHTML = '';
      
      if (nextButtonContainer) {
        nextButtonContainer.innerHTML = `
          <div class="text-center space-x-4">
            <button onclick="restartExam()" class="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors">
              Retake Exam
            </button>
            <a href="/dashboard/cme" class="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
              Back to CME Tests
            </a>
          </div>
        `;
      }

      // Clear progress
      localStorage.removeItem('finalExamProgress');
    }

    function updateScore() {
      const scoreElement = document.getElementById('score');
      if (scoreElement) {
        const percentage = currentScenario > 0 ? Math.round((score / (currentScenario + (answered ? 1 : 0))) * 100) : 0;
        scoreElement.textContent = `Score: ${percentage}%`;
      }
    }

    // Global function for restart
    (window as any).restartExam = function() {
      currentScenario = 0;
      score = 0;
      answered = false;
      localStorage.removeItem('finalExamProgress');
      displayScenario();
    };

    // Initialize
    loadProgress();
    displayScenario();
  }, []);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link href="/dashboard/cme" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to CME Tests
        </Link>
      </div>

      {/* Final Exam Container */}
      <Card>
        <CardContent className="p-0">
          <div 
            id="final-exam-container" 
            className="w-full h-[85vh] border-0 rounded-lg overflow-hidden"
            style={{ background: '#f4f4f9' }}
          >
            <div className="flex justify-center items-start min-h-full p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
                <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">Hospital Medicine Test for CME</h1>
                <div className="objectives text-gray-700 mb-4 text-left text-sm">
                  <p><strong>Learning Objectives:</strong></p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Apply guideline-based management for acute hospital medicine conditions.</li>
                    <li>Differentiate critical interventions in life-threatening scenarios.</li>
                    <li>Integrate diagnostic reasoning with therapeutic decision-making.</li>
                  </ul>
                </div>
                <div id="game-content">
                  <div id="question-counter" className="text-sm text-gray-600 mb-2"></div>
                  <div id="progress" className="mb-4"></div>
                  <div id="scenario" className="text-gray-700 mb-4 text-left"></div>
                  <div className="options flex flex-col gap-2" id="options"></div>
                  <div id="feedback" className="mt-4 font-bold opacity-0 transition-opacity duration-500" aria-live="polite"></div>
                  <div id="explanation" className="mt-2 text-gray-600 text-left overflow-wrap-break-word max-h-36 overflow-y-auto"></div>
                  <div id="next-button-container" className="mt-4"></div>
                  <div id="score" className="mt-2 text-gray-800">Score: 0%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 