'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSubscription } from '@/hooks/useSubscription';
import { UpgradePrompt } from '@/components/ui/UpgradePrompt';

export default function PracticeTestPage() {
  const { hasAccess, loading } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!hasAccess('all_access')) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CME Practice Test</h1>
          <p className="mt-2 text-gray-600">
            Test your knowledge with 25 high-yield hospital medicine questions.
          </p>
        </div>

        <UpgradePrompt 
          title="Practice Test - All-Access Required"
          description="Access the CME practice test to prepare for your final exam with the All-Access plan."
          feature="CME Practice Tests"
        />
      </div>
    );
  }

  useEffect(() => {
    // Practice Test JavaScript functionality
    const scenarios = [
      {
        scenario: "A 68-year-old male with a history of PUD presents with hematemesis and melena. BP 88/50 mmHg, HR 115 bpm, Hgb 6.5 g/dL. Endoscopy: Bleeding gastric ulcer with a visible vessel. Post-endoscopic hemostasis, what additional therapy reduces rebleeding risk?",
        options: ["A. High-dose IV PPI for 72 hours", "B. Oral antibiotics", "C. Furosemide IV", "D. Tranexamic acid IV"],
        correctAnswer: "A. High-dose IV PPI for 72 hours",
        explanation: "Correct: A. High-dose IV PPI for 72 hours. Post-endoscopic hemostasis for a bleeding ulcer, high-dose IV proton pump inhibitor (PPI, e.g., pantoprazole 80 mg bolus followed by 8 mg/h infusion for 72 hours) reduces rebleeding risk by maintaining a high gastric pH to promote clot stability, per ACG 2021 guidelines. Incorrect: B. Oral antibiotics are indicated only if H. pylori is confirmed. C. Furosemide IV is inappropriate in hypotension. D. Tranexamic acid IV is not routinely recommended for non-variceal bleeding."
      },
      {
        scenario: "A 62-year-old female with decompensated cirrhosis presents with confusion, asterixis, and melena. Labs: Ammonia 150 µmol/L, INR 2.2, Hgb 7 g/dL, SCr 2.8 mg/dL (baseline 1.2). Endoscopy: Bleeding esophageal varices. What additional complication should be suspected, and how should it be managed?",
        options: ["A. Hepatorenal syndrome; midodrine + octreotide + albumin", "B. Acute tubular necrosis; IV fluids", "C. Pre-renal AKI; norepinephrine", "D. AKI; IV fluids alone"],
        correctAnswer: "A. Hepatorenal syndrome; midodrine + octreotide + albumin",
        explanation: "Correct: A. Hepatorenal syndrome; midodrine + octreotide + albumin. Hepatorenal syndrome (HRS-AKI) is suspected due to a significant rise in SCr (2.8 mg/dL) in cirrhosis with variceal bleeding, after ruling out other AKI causes (e.g., hypovolemia, nephrotoxins). Midodrine (vasoconstrictor), octreotide (splanchnic vasoconstrictor), and albumin (volume expansion) improve renal perfusion, per AASLD 2021 guidelines. Incorrect: B. Acute tubular necrosis requires evidence of tubular injury (e.g., muddy brown casts). C. Pre-renal AKI may respond to norepinephrine in shock, but HRS is more likely here. D. IV fluids alone are insufficient for HRS-AKI."
      },
      {
        scenario: "A 45-year-old male presents with fever (39.5°C), headache, and nuchal rigidity. LP: CSF WBC 1,500/µL (90% PMNs), glucose 15 mg/dL, protein 200 mg/dL, Gram stain negative. He has a history of recent sinusitis. He is started on ceftriaxone. What should be added to cover resistant organisms?",
        options: ["A. Vancomycin IV", "B. Acyclovir IV", "C. Fluconazole IV", "D. Ampicillin IV"],
        correctAnswer: "A. Vancomycin IV",
        explanation: "Correct: A. Vancomycin IV. This patient has bacterial meningitis (high CSF WBC, low glucose, high protein), likely from sinusitis (S. pneumoniae or H. influenzae). Ceftriaxone is started empirically, but vancomycin is added to cover resistant S. pneumoniae, especially with a negative Gram stain, per IDSA 2023 guidelines. Dexamethasone is also recommended for suspected pneumococcal meningitis to reduce mortality. Incorrect: B. Acyclovir IV is for viral meningitis (e.g., HSV). C. Fluconazole IV is for fungal meningitis. D. Ampicillin IV targets Listeria, typically in older patients or immunocompromised."
      },
      {
        scenario: "A 40-year-old male with IV drug use presents with fever (39°C), chills, and a new tricuspid murmur. Blood cultures grow S. aureus (MRSA) for 5 days despite vancomycin (trough 15 µg/mL). TEE: 18 mm vegetation with perforation. What should be suspected, and how should it be managed?",
        options: ["A. Drug resistance; switch to daptomycin", "B. Catheter infection; remove catheter", "C. Endocarditis; surgical consult", "D. Add rifampin"],
        correctAnswer: "C. Endocarditis; surgical consult",
        explanation: "Correct: C. Endocarditis; surgical consult. Persistent S. aureus bacteremia with a large vegetation (>10 mm) and perforation suggests complicated endocarditis requiring surgical consultation for valve repair/replacement, indicated for large vegetations, valve destruction, or persistent bacteremia (>5-7 days), per AHA/ACC 2020 guidelines. Incorrect: A. Drug resistance is unlikely with an appropriate vancomycin trough. B. No catheter is mentioned. D. Rifampin is not first-line for native valve MRSA endocarditis."
      },
      {
        scenario: "A 65-year-old female with a prosthetic aortic valve (6 months post-op) presents with fever (38.5°C) and fatigue. Blood cultures grow S. aureus (MRSA). TEE: Vegetation with perivalvular abscess. What is the most appropriate antibiotic regimen?",
        options: ["A. Ceftriaxone + gentamicin", "B. Vancomycin + gentamicin + rifampin", "C. Amoxicillin + gentamicin", "D. Daptomycin + gentamicin"],
        correctAnswer: "B. Vancomycin + gentamicin + rifampin",
        explanation: "Correct: B. Vancomycin + gentamicin + rifampin. Prosthetic valve endocarditis with MRSA requires vancomycin (for MRSA), gentamicin (synergy), and rifampin (biofilm penetration), per AHA/ACC 2020 guidelines. Surgical consultation is often needed for perivalvular abscess. Incorrect: A. Ceftriaxone + gentamicin doesn't cover MRSA. C. Amoxicillin + gentamicin is for enterococcal endocarditis. D. Daptomycin + gentamicin is an alternative but not first-line for prosthetic valves."
      },
      {
        scenario: "A 45-year-old female with HIV (CD4 30/µL) presents with headache, fever (38.5°C), and photophobia. LP: CSF opening pressure 320 mmH2O, cryptococcal antigen positive, WBC 50/µL (lymphocytic). What is the most appropriate initial management?",
        options: ["A. Ceftriaxone + vancomycin", "B. Amphotericin B + flucytosine, then fluconazole", "C. Amphotericin B alone", "D. Fluconazole alone"],
        correctAnswer: "B. Amphotericin B + flucytosine, then fluconazole",
        explanation: "Correct: B. Amphotericin B + flucytosine, then fluconazole. This patient has cryptococcal meningitis (HIV, low CD4, positive antigen, high opening pressure). Amphotericin B + flucytosine for 2 weeks, followed by fluconazole consolidation for 8 weeks, is standard induction therapy, per IDSA 2023 guidelines. Serial lumbar punctures manage elevated intracranial pressure. Incorrect: A. Ceftriaxone + vancomycin is for bacterial meningitis. C. Amphotericin B alone is less effective than combination therapy. D. Fluconazole alone is insufficient for severe disease."
      },
      {
        scenario: "A 65-year-old male presents with fever (39°C), productive cough, and dyspnea for 3 days. Chest X-ray: Right lower lobe consolidation. Sputum culture grows S. pneumoniae (penicillin MIC 0.5 µg/mL). He has a penicillin allergy (anaphylaxis). What is the most appropriate treatment?",
        options: ["A. Ceftriaxone IV", "B. Levofloxacin IV", "C. Vancomycin IV", "D. Azithromycin IV"],
        correctAnswer: "B. Levofloxacin IV",
        explanation: "Correct: B. Levofloxacin IV. This patient has pneumococcal pneumonia with a penicillin allergy (anaphylaxis). Levofloxacin, a respiratory fluoroquinolone, covers S. pneumoniae effectively and is safe in penicillin allergy, per IDSA/ATS 2019 guidelines. Incorrect: A. Ceftriaxone IV risks cross-reactivity in severe allergy. C. Vancomycin IV is suboptimal for pneumococcal pneumonia. D. Azithromycin IV is less effective for severe pneumonia due to resistance."
      },
      {
        scenario: "A 60-year-old male presents with sudden chest pain, dyspnea, and syncope. BP 80/50 mmHg, HR 120 bpm, SpO2 85%. CTA: Saddle PE with RV strain. Troponin elevated. What is the most appropriate initial treatment beyond heparin?",
        options: ["A. Continue heparin alone", "B. Systemic thrombolytics", "C. Catheter-directed thrombolysis", "D. Antibiotics"],
        correctAnswer: "B. Systemic thrombolytics",
        explanation: "Correct: B. Systemic thrombolytics. This patient has a massive PE (hypotension, RV strain, elevated troponin), warranting thrombolytics (e.g., alteplase) to restore perfusion and reduce mortality, per CHEST 2021 guidelines. Thrombolytics are contraindicated in recent stroke or bleeding. Incorrect: A. Heparin alone is insufficient for massive PE. C. Catheter-directed thrombolysis is for submassive PE or contraindications. D. Antibiotics are irrelevant."
      },
      {
        scenario: "A 65-year-old female with type 1 diabetes presents with lethargy and nausea. ABG: pH 7.15, PaCO2 20 mmHg, HCO3- 8 mEq/L, anion gap 32. Glucose 600 mg/dL, K+ 5.8 mEq/L. She is started on insulin and fluids. What electrolyte abnormality should be anticipated as DKA resolves?",
        options: ["A. Hyperkalemia", "B. Hypokalemia", "C. Hypernatremia", "D. Hypomagnesemia"],
        correctAnswer: "B. Hypokalemia",
        explanation: "Correct: B. Hypokalemia. In DKA, insulin drives potassium into cells, and diuresis can cause hypokalemia as acidosis resolves, despite initial hyperkalemia (5.8 mEq/L), per ADA 2023 guidelines. Potassium replacement is needed if K+ falls below 3.3 mEq/L. Incorrect: A. Hyperkalemia is initial but decreases with treatment. C. Hypernatremia is not typical. D. Hypomagnesemia may occur but is less common."
      },
      {
        scenario: "A 40-year-old female presents with palpitations, weight loss, and fever (39°C). Exam: HR 140 bpm, thyroid enlarged, tremor, lid lag. Labs: TSH <0.01 mIU/L, free T4 4.5 ng/dL, T3 300 ng/dL. Burch-Wartofsky score 50. What is the most appropriate initial treatment to address both thyroid hormone synthesis and peripheral conversion?",
        options: ["A. Propranolol + methimazole", "B. PTU + propranolol + hydrocortisone", "C. Methimazole", "D. PTU alone"],
        correctAnswer: "B. PTU + propranolol + hydrocortisone",
        explanation: "Correct: B. PTU + propranolol + hydrocortisone. This patient has thyroid storm (Burch-Wartofsky score 50). PTU inhibits thyroid hormone synthesis, propranolol controls adrenergic symptoms, and hydrocortisone prevents adrenal insufficiency and inhibits T4-to-T3 conversion, per ATA 2016 guidelines. Inorganic iodide (e.g., Lugol's solution) is often added after PTU to block hormone release. Incorrect: A, C. Methimazole lacks PTU's T4-to-T3 inhibition and hydrocortisone's benefits. D. PTU alone doesn't address symptoms or conversion."
      },
      {
        scenario: "A 65-year-old female with atrial fibrillation (HR 160 bpm) presents with hypotension (BP 85/50 mmHg) and signs of heart failure (EF 30%). ECG: No ST elevation. What is the most appropriate initial treatment?",
        options: ["A. Diltiazem IV", "B. Synchronized cardioversion", "C. Digoxin IV", "D. Amiodarone IV"],
        correctAnswer: "B. Synchronized cardioversion",
        explanation: "Correct: B. Synchronized cardioversion. This patient has atrial fibrillation with rapid ventricular rate (RVR) causing hemodynamic instability (hypotension, heart failure). Cardioversion restores sinus rhythm rapidly, per AHA/ACC 2023 guidelines. Anticoagulation status should be assessed post-cardioversion if AF duration >48 hours. Incorrect: A. Diltiazem IV can worsen hypotension. C. Digoxin IV is slower-acting. D. Amiodarone IV is less effective acutely."
      },
      {
        scenario: "A 65-year-old male presents with fever (39°C), hypotension (BP 85/50 mmHg), and tachycardia (HR 110 bpm). Labs: Lactate 3.5 mmol/L, SCr 2.5 mg/dL (baseline 1.0), procalcitonin 5 ng/mL. Blood cultures grow E. coli. What additional marker should guide antibiotic de-escalation?",
        options: ["A. Blood glucose", "B. Procalcitonin trend", "C. C-reactive protein trend", "D. Ammonia levels"],
        correctAnswer: "B. Procalcitonin trend",
        explanation: "Correct: B. Procalcitonin trend. Procalcitonin is elevated (5 ng/mL) in bacterial sepsis. Its downward trend can guide antibiotic de-escalation, reducing unnecessary exposure, per SCCM 2021 guidelines. However, clinical response and cultures should also guide decisions, as procalcitonin's role is controversial in ICU settings. Incorrect: A. Blood glucose is for glycemic control. C. C-reactive protein is less specific. D. Ammonia levels are irrelevant."
      },
      {
        scenario: "A 65-year-old male presents with chest pain, hypotension (BP 80/50 mmHg), and cold extremities. ECG: ST elevation in V1-V4. Echo: Severe LV dysfunction (EF 20%), anterior wall akinesis. Troponin 10 ng/mL. What is the most appropriate initial treatment to stabilize him?",
        options: ["A. 1 L NS bolus", "B. Dobutamine IV + emergent PCI", "C. Furosemide IV", "D. Norepinephrine IV"],
        correctAnswer: "B. Dobutamine IV + emergent PCI",
        explanation: "Correct: B. Dobutamine IV + emergent PCI. This patient has cardiogenic shock from an acute MI (ST elevation, troponin 10 ng/mL, EF 20%). Dobutamine improves cardiac output and is preferred over milrinone for faster onset and less vasodilation, while emergent PCI addresses coronary occlusion, per ACC/AHA 2021 guidelines. Incorrect: A. 1 L NS bolus may worsen fluid overload. C. Furosemide IV is inappropriate in shock. D. Norepinephrine IV is for distributive shock, not primary therapy here."
      },
      {
        scenario: "A 50-year-old male with diabetes presents with right leg erythema, warmth, and tenderness for 3 days. Exam: Diffuse erythema, fever (38.5°C), no fluctuance. Labs: WBC 14,000/µL, ESR 80 mm/h, SCr 2.0 mg/dL (baseline 1.2). He has a history of vancomycin-induced AKI. What is the most appropriate initial treatment?",
        options: ["A. Cefazolin IV", "B. Ceftriaxone IV + linezolid IV", "C. Meropenem IV", "D. Clindamycin IV alone"],
        correctAnswer: "B. Ceftriaxone IV + linezolid IV",
        explanation: "Correct: B. Ceftriaxone IV + linezolid IV. Severe cellulitis with systemic symptoms in diabetes requires broad-spectrum coverage for gram-positive (including MRSA) and gram-negative organisms. Linezolid avoids vancomycin's nephrotoxicity, and ceftriaxone covers gram-negatives, per IDSA 2014 guidelines. Daptomycin is an alternative for MRSA. Incorrect: A. Cefazolin IV lacks MRSA coverage. C. Meropenem IV is overly broad. D. Clindamycin IV misses gram-negative coverage."
      },
      {
        scenario: "A 65-year-old male presents with sudden right leg pain, pallor, and pulselessness for 4 hours. Exam: Cold leg, no Doppler signals, sensory loss. CTA: Femoral artery occlusion. Rutherford IIb classification. What is the most time-sensitive intervention?",
        options: ["A. IV fluids", "B. Heparin IV + emergent revascularization", "C. Amputation", "D. Catheter-directed thrombolysis"],
        correctAnswer: "B. Heparin IV + emergent revascularization",
        explanation: "Correct: B. Heparin IV + emergent revascularization. This patient has acute limb ischemia (Rutherford IIb: sensory loss, no motor deficit), requiring immediate heparin to prevent clot propagation and emergent revascularization (e.g., thrombectomy) within 6 hours to restore blood flow, per SVS 2021 guidelines. Incorrect: A. IV fluids alone don't address occlusion. C. Amputation is a last resort. D. Catheter-directed thrombolysis is for less urgent cases."
      },
      {
        scenario: "A 65-year-old male presents with a witnessed seizure—right arm twitching progressing to generalized tonic-clonic activity, lasting 2 minutes. CT head: Left frontal ischemic stroke. He has a history of CKD (eGFR 30 mL/min). What is the most appropriate long-term AED, considering his renal function?",
        options: ["A. Phenytoin PO", "B. Levetiracetam PO", "C. Valproic acid PO", "D. Lamotrigine PO"],
        correctAnswer: "B. Levetiracetam PO",
        explanation: "Correct: B. Levetiracetam PO. This patient has a seizure due to ischemic stroke. Levetiracetam is renally cleared but safe in CKD with dose adjustment (e.g., 500-1000 mg BID for eGFR 30), has minimal drug interactions, and is effective for focal-onset seizures, per AAN 2023 guidelines. Incorrect: A. Phenytoin PO risks toxicity in CKD. C. Valproic acid PO causes hepatotoxicity and interactions. D. Lamotrigine PO is effective but requires slower titration."
      },
      {
        scenario: "A 70-year-old male presents with sudden left-sided weakness and dysarthria. Symptom onset 3 hours ago. CT head: No hemorrhage. NIHSS 10. BP 190/110 mmHg. He has a history of recent MI (2 weeks ago). What is the most appropriate management?",
        options: ["A. IV tPA after BP control", "B. Mechanical thrombectomy", "C. Aspirin alone", "D. Dual antiplatelet therapy"],
        correctAnswer: "A. IV tPA after BP control",
        explanation: "Correct: A. IV tPA after BP control. This patient has an acute ischemic stroke within the tPA window (3 hours), with NIHSS 10 indicating moderate severity. BP must be lowered (<185/110 mmHg) before tPA, per AHA/ASA 2023 guidelines. Recent MI (>7 days) is not a contraindication, but tPA is contraindicated if MI was <7 days or other exclusions apply (e.g., hemorrhage). Incorrect: B. Thrombectomy requires large vessel occlusion. C, D. Aspirin or dual antiplatelets are for secondary prevention, not acute therapy."
      },
      {
        scenario: "A 65-year-old male presents with sudden headache, vomiting, and right-sided weakness. CT head: Intracerebral hemorrhage (30 mL, basal ganglia). BP 220/120 mmHg, GCS 12. What is the most appropriate BP target to prevent hematoma expansion?",
        options: ["A. <180/105 mmHg", "B. <140/90 mmHg", "C. <120/80 mmHg", "D. <160/100 mmHg"],
        correctAnswer: "B. <140/90 mmHg",
        explanation: "Correct: B. <140/90 mmHg. In acute intracerebral hemorrhage, aggressive BP lowering to <140/90 mmHg reduces hematoma expansion, especially with BP 220/120 mmHg, per AHA/ASA 2022 guidelines (INTERACT2 trial). BP should be lowered gradually (10-20% per hour) to avoid ischemia. Incorrect: A, D. <180/105 mmHg and <160/100 mmHg are too high. C. <120/80 mmHg risks cerebral hypoperfusion."
      },
      {
        scenario: "A 50-year-old female presents with fatigue, hypotension (BP 90/60 mmHg), and hyperpigmentation. Labs: Na+ 130 mEq/L, K+ 5.5 mEq/L, cortisol 2 µg/dL, ACTH 500 pg/mL. Random cortisol after ACTH stimulation: 5 µg/dL. What is the most likely diagnosis?",
        options: ["A. Secondary adrenal insufficiency", "B. Primary adrenal insufficiency", "C. Sepsis", "D. Hypopituitarism"],
        correctAnswer: "B. Primary adrenal insufficiency",
        explanation: "Correct: B. Primary adrenal insufficiency. Hyperpigmentation, hypotension, hyponatremia, hyperkalemia, low cortisol with high ACTH, and poor ACTH stimulation response confirm primary adrenal insufficiency (Addison's disease), per Endocrine Society 2023 guidelines. Treatment includes hydrocortisone and fludrocortisone. Incorrect: A, D. Secondary adrenal insufficiency and hypopituitarism have low ACTH. C. Sepsis lacks hyperpigmentation and ACTH elevation."
      },
      {
        scenario: "A 55-year-old male presents with epigastric pain radiating to the back, nausea, and vomiting. Labs: Amylase 700 U/L, lipase 900 U/L, triglycerides 1,200 mg/dL. CT: Pancreatic inflammation, no necrosis. What is the most appropriate initial management?",
        options: ["A. Antibiotics", "B. IV fluids + NPO + fenofibrate", "C. Insulin IV", "D. Plasmapheresis"],
        correctAnswer: "B. IV fluids + NPO + fenofibrate",
        explanation: "Correct: B. IV fluids + NPO + fenofibrate. This patient has acute pancreatitis due to hypertriglyceridemia (triglycerides 1,200 mg/dL). IV fluids for hydration, NPO to rest the pancreas, and fenofibrate to lower triglycerides are initial steps, per ACG 2023 guidelines. Insulin infusion is an alternative for severe hypertriglyceridemia (>1000 mg/dL). Incorrect: A. Antibiotics are for infected pancreatitis. C. Insulin IV is for severe cases with DKA. D. Plasmapheresis is reserved for refractory hypertriglyceridemia."
      },
      {
        scenario: "A 60-year-old female with type 2 diabetes presents with confusion and diaphoresis. Labs: Glucose 35 mg/dL, SCr 1.5 mg/dL. She took her sulfonylurea this morning. What is the most appropriate treatment to prevent recurrence?",
        options: ["A. D50W IV bolus", "B. D50W IV + octreotide", "C. IV fluids alone", "D. Glucagon IM"],
        correctAnswer: "B. D50W IV + octreotide",
        explanation: "Correct: B. D50W IV + octreotide. Sulfonylurea-induced hypoglycemia requires D50W IV to correct glucose and octreotide to suppress insulin release, preventing recurrence, especially with prolonged agents like glipizide, per ADA 2023 guidelines. Incorrect: A. D50W IV alone won't prevent recurrence. C. IV fluids alone don't correct hypoglycemia. D. Glucagon IM is less effective for sulfonylurea-induced hypoglycemia."
      },
      {
        scenario: "A 65-year-old male with CKD (eGFR 20 mL/min) presents with weakness and fatigue. ECG: Peaked T waves, widened QRS. Labs: K+ 7.0 mEq/L, SCr 4.0 mg/dL. What is the most appropriate initial treatment sequence?",
        options: ["A. Calcium gluconate IV, then insulin + D50W, then patiromer", "B. Insulin + D50W alone", "C. Patiromer alone", "D. Bicarbonate IV"],
        correctAnswer: "A. Calcium gluconate IV, then insulin + D50W, then patiromer",
        explanation: "Correct: A. Calcium gluconate IV, then insulin + D50W, then patiromer. Severe hyperkalemia (K+ 7.0 mEq/L) with ECG changes requires cardiac stabilization (calcium gluconate), potassium shifting (insulin + D50W), and removal (patiromer), per KDIGO 2021 guidelines. Patiromer is preferred over sodium polystyrene sulfonate for safety. Incorrect: B. Insulin + D50W alone doesn't stabilize the heart. C. Patiromer alone is too slow. D. Bicarbonate IV is adjunctive, not primary."
      },
      {
        scenario: "A 40-year-old male presents with tremors, agitation, and hallucinations 48 hours after stopping alcohol. BP 160/100 mmHg, HR 120 bpm. He has a history of seizures. What is the most appropriate treatment to prevent complications?",
        options: ["A. Lorazepam IV + thiamine IV", "B. Furosemide IV", "C. Heparin IV", "D. Albuterol nebulized"],
        correctAnswer: "A. Lorazepam IV + thiamine IV",
        explanation: "Correct: A. Lorazepam IV + thiamine IV. This patient has alcohol withdrawal with seizure risk. Lorazepam IV prevents seizures and manages agitation, while thiamine IV prevents Wernicke's encephalopathy, per ASAM 2020 guidelines. Incorrect: B. Furosemide IV is for fluid overload. C. Heparin IV is for thrombosis. D. Albuterol nebulized is for bronchospasm."
      },
      {
        scenario: "A 50-year-old female presents with wheezing, urticaria, and hypotension (BP 90/50 mmHg) after eating peanuts. She has a history of anaphylaxis. What is the most appropriate initial treatment?",
        options: ["A. IV fluids alone", "B. Epinephrine IM", "C. Albuterol nebulized", "D. Diphenhydramine IV"],
        correctAnswer: "B. Epinephrine IM",
        explanation: "Correct: B. Epinephrine IM. This patient has anaphylaxis (wheezing, urticaria, hypotension post-allergen exposure). Epinephrine IM is the first-line treatment to reverse bronchospasm and vasodilation, per WAO 2023 guidelines. Antihistamines and steroids are adjunctive. Incorrect: A. IV fluids alone don't address the allergic response. C. Albuterol nebulized helps bronchospasm but not hypotension. D. Diphenhydramine IV is not first-line."
      }
    ];

    let currentScenario = 0;
    let score = 0;
    let answered = false;

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
      const savedProgress = localStorage.getItem('practiceTestProgress');
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
      localStorage.setItem('practiceTestProgress', JSON.stringify(progress));
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
          button.className = 'w-full text-left p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-sm sm:text-base';
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
          feedbackElement.className = 'mt-4 font-bold text-green-600 transition-opacity duration-300';
        }
      } else {
        if (feedbackElement) {
          feedbackElement.textContent = 'Incorrect';
          feedbackElement.className = 'mt-4 font-bold text-red-600 transition-opacity duration-300';
        }
      }

      if (feedbackElement) feedbackElement.style.opacity = '1';
      if (explanationElement) explanationElement.textContent = scenario.explanation;

      // Create next button
      if (nextButtonContainer) {
        const nextButton = document.createElement('button');
        nextButton.textContent = currentScenario < shuffledScenarios.length - 1 ? 'Next Question' : 'View Final Score';
        nextButton.className = 'bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-emerald-700 transition-colors text-sm sm:text-base w-full sm:w-auto';
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
      const scenarioElement = document.getElementById('scenario');
      const optionsElement = document.getElementById('options');
      const feedbackElement = document.getElementById('feedback');
      const explanationElement = document.getElementById('explanation');
      const nextButtonContainer = document.getElementById('next-button-container');

      if (scenarioElement) {
        scenarioElement.innerHTML = `
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-4">Practice Test Complete!</h2>
            <p class="text-lg mb-2">Your Score: ${score}/${shuffledScenarios.length} (${percentage}%)</p>
            <p class="text-gray-600 mb-4">This was a practice test - no CME credits awarded.</p>
            <p class="text-sm text-gray-500">Review the questions to strengthen your knowledge before taking the Final Exam.</p>
          </div>
        `;
      }

      if (optionsElement) optionsElement.innerHTML = '';
      if (feedbackElement) feedbackElement.innerHTML = '';
      if (explanationElement) explanationElement.innerHTML = '';
      
      if (nextButtonContainer) {
        nextButtonContainer.innerHTML = `
          <div class="text-center space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            <button onclick="restartTest()" class="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-emerald-700 transition-colors text-sm sm:text-base w-full sm:w-auto">
              Restart Practice Test
            </button>
            <a href="/dashboard/cme/final-exam" class="inline-block bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto text-center">
              Take Final Exam
            </a>
          </div>
        `;
      }

      // Clear progress
      localStorage.removeItem('practiceTestProgress');
    }

    function updateScore() {
      const scoreElement = document.getElementById('score');
      if (scoreElement) {
        scoreElement.textContent = `Score: ${score}/${currentScenario + (answered ? 1 : 0)}`;
      }
    }

    // Global function for restart
    (window as any).restartTest = function() {
      currentScenario = 0;
      score = 0;
      answered = false;
      localStorage.removeItem('practiceTestProgress');
      displayScenario();
    };

    // Initialize
    loadProgress();
    displayScenario();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back Button */}
      <div className="px-4 sm:px-0">
        <Link href="/dashboard/cme" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to CME Tests
        </Link>
      </div>

      {/* Practice Test Container */}
      <Card className="mx-4 sm:mx-0">
        <CardContent className="p-0">
          <div 
            id="practice-test-container" 
            className="w-full min-h-[60vh] sm:min-h-[70vh] lg:h-[80vh] border-0 rounded-lg overflow-hidden"
            style={{ background: '#f4f4f9' }}
          >
            <div className="flex justify-center items-start min-h-full p-2 sm:p-4">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-xl lg:max-w-2xl">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Practice Questions</h1>
                <div id="game-content">
                  <div id="scenario" className="text-gray-700 mb-3 sm:mb-4 text-left text-sm sm:text-base leading-relaxed"></div>
                  <div className="options flex flex-col gap-2" id="options" role="form"></div>
                  <div id="feedback" className="mt-3 sm:mt-4 font-bold opacity-0 transition-opacity duration-300" role="alert"></div>
                  <div id="explanation" className="mt-2 text-gray-700 text-left overflow-wrap-break-word max-h-32 sm:max-h-36 overflow-y-auto text-sm leading-relaxed"></div>
                  <div id="next-button-container" className="mt-3 sm:mt-4"></div>
                  <div id="score" className="mt-2 text-gray-800 text-sm">Score: 0</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 