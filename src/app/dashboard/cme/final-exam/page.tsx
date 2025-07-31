'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSubscription } from '@/hooks/useSubscription';
import { UpgradePrompt } from '@/components/ui/UpgradePrompt';

export default function FinalExamPage() {
  const { hasAccess, loading } = useSubscription();

  // Move useEffect before any conditional returns to follow Rules of Hooks
  useEffect(() => {
    // Final Exam JavaScript functionality
    const scenarios = [
      {
        scenario: "A 62-year-old male with COPD presents with acute dyspnea 12 hours ago. ABG: pH 7.28, PaCO2 65 mmHg, PaO2 55 mmHg, HCO3- 30 mEq/L. He is drowsy but arousable. What is the most appropriate next step?",
        options: ["A. Intubate immediately", "B. Initiate BiPAP with FiO2 0.4", "C. Administer albuterol nebulizer alone", "D. Start IV corticosteroids"],
        correctAnswer: "B. Initiate BiPAP with FiO2 0.4",
        explanation: "The patient presents with acute on chronic hypercapnic respiratory failure from a COPD exacerbation. For arousable patients, BiPAP is the first-line intervention to improve ventilation and reduce the work of breathing."
      },
      {
        scenario: "A 58-year-old female with chest pain, BP 85/50 mmHg, and ECG showing ST elevation in V1-V4 develops pulseless ventricular tachycardia. After defibrillation, what is the most appropriate next step?",
        options: ["A. Amiodarone 150 mg IV bolus", "B. Epinephrine 1 mg IV", "C. Lidocaine 1 mg/kg IV", "D. Metoprolol 5 mg IV"],
        correctAnswer: "A. Amiodarone 150 mg IV bolus",
        explanation: "Following successful defibrillation for pulseless VT, antiarrhythmic therapy such as amiodarone is indicated to prevent recurrence, as per ACLS guidelines. Epinephrine is for active cardiac arrest, and metoprolol is contraindicated in hypotension."
      },
      {
        scenario: "A 72-year-old male hospitalized for pneumonia develops acute confusion, fever, and asterixis. Labs: Ammonia 180 µmol/L, INR 2.5, SCr 2.8 mg/dL. No known liver disease. What is the most likely cause?",
        options: ["A. Sepsis-induced encephalopathy", "B. Acute liver failure", "C. Hepatic encephalopathy from occult cirrhosis", "D. Uremic encephalopathy"],
        correctAnswer: "B. Acute liver failure",
        explanation: "The clinical picture of acute encephalopathy, elevated ammonia, and coagulopathy (INR 2.5) in a patient without a history of liver disease is characteristic of acute liver failure."
      },
      {
        scenario: "A 47-year-old female with acetaminophen overdose 12 hours ago presents with jaundice, lethargy, and asterixis. Labs: AST 1,200 U/L, ALT 1,100 U/L, bilirubin 10 mg/dL, INR 3.0. What is the most appropriate initial management?",
        options: ["A. N-acetylcysteine IV", "B. Prednisone 40 mg PO", "C. Ursodiol 300 mg PO", "D. Lactulose PO"],
        correctAnswer: "A. N-acetylcysteine IV",
        explanation: "N-acetylcysteine (NAC) is the antidote for acetaminophen toxicity and is the standard of care for acetaminophen-induced acute liver failure, even when presentation is delayed."
      },
      {
        scenario: "A 68-year-old male with ischemic stroke 3 hours ago (NIHSS 15) has BP 200/110 mmHg and recent GI bleed (1 week ago). What is the most appropriate management?",
        options: ["A. IV nitroprusside then tPA", "B. Mechanical thrombectomy", "C. Aspirin 325 mg PO", "D. Nicardipine IV alone"],
        correctAnswer: "D. Nicardipine IV alone",
        explanation: "Recent GI bleed is a contraindication to tPA. Permissive hypertension is allowed, but at this level, gentle blood pressure control with a titratable agent like nicardipine is recommended to prevent hemorrhagic transformation. Mechanical thrombectomy requires a confirmed large vessel occlusion."
      },
      {
        scenario: "A 70-year-old female with hemorrhagic stroke (30 mL, thalamic) develops seizures. She has CKD (eGFR 25 mL/min). What is the most appropriate long-term AED?",
        options: ["A. Phenytoin 100 mg TID", "B. Levetiracetam 500 mg BID", "C. Valproate 250 mg TID", "D. Carbamazepine 200 mg BID"],
        correctAnswer: "B. Levetiracetam 500 mg BID",
        explanation: "Levetiracetam is a preferred antiepileptic drug in patients with renal impairment due to its favorable safety profile and minimal drug-drug interactions. Dose adjustment is required for CKD."
      },
      {
        scenario: "A 55-year-old male with acute PE (submassive, RV strain, normotensive) has recent surgery (10 days ago). What is the most appropriate management?",
        options: ["A. Systemic thrombolytics", "B. Heparin IV with IVC filter", "C. Apixaban 10 mg BID", "D. Catheter-directed thrombolysis"],
        correctAnswer: "B. Heparin IV with IVC filter",
        explanation: "In submassive PE with a contraindication to thrombolysis (recent surgery), anticoagulation with heparin is standard. An IVC filter is indicated when there is a high risk of PE recurrence and anticoagulation is high-risk, though anticoagulation should still be initiated."
      },
      {
        scenario: "A 60-year-old male with acute pancreatitis (lipase 1,200 U/L) develops fever and hypotension on day 5. CT: Necrotizing pancreatitis with abscess. What is the most appropriate intervention?",
        options: ["A. Surgical debridement", "B. Percutaneous drainage + antibiotics", "C. IV fluids alone", "D. TPN initiation"],
        correctAnswer: "B. Percutaneous drainage + antibiotics",
        explanation: "Infected necrotizing pancreatitis is a severe complication. The standard of care is broad-spectrum antibiotics and percutaneous drainage of the abscess collection. Surgical debridement is reserved for cases where percutaneous drainage fails."
      },
      {
        scenario: "A 72-year-old female hospitalized for CHF develops anemia (Hgb 6.5 g/dL, MCV 85 fL, RDW 18%). She has melena and NSAID use history. What is the most appropriate management?",
        options: ["A. PRBC transfusion + IV PPI", "B. Iron infusion alone", "C. Vitamin B12 1,000 mcg IM", "D. Erythropoietin 40,000 units SC"],
        correctAnswer: "A. PRBC transfusion + IV PPI",
        explanation: "The patient has severe, symptomatic anemia in the setting of melena, indicating an acute upper GI bleed, likely exacerbated by NSAID use. Management includes PRBC transfusion for hemodynamic support and IV PPI to reduce the risk of rebleeding."
      },
      {
        scenario: "A 48-year-old male with alcoholism presents with jaundice, fever, and RUQ tenderness. Labs: AST 250 U/L, ALT 90 U/L, bilirubin 12 mg/dL, Maddrey's DF 40. What is the most appropriate therapy?",
        options: ["A. Prednisolone 40 mg PO", "B. Pentoxifylline 400 mg TID", "C. N-acetylcysteine IV", "D. Pentoxifylline + prednisolone"],
        correctAnswer: "A. Prednisolone 40 mg PO",
        explanation: "The presentation is classic for severe alcoholic hepatitis. A Maddrey's Discriminant Function (DF) score > 32 indicates severe disease, for which corticosteroids (prednisolone) are the first-line treatment to reduce mortality."
      },
      {
        scenario: "A 65-year-old male with AF and VT develops torsades de pointes. ECG: QTc 520 ms, K+ 3.2 mEq/L. What is the most appropriate immediate treatment?",
        options: ["A. Magnesium sulfate 2 g IV", "B. Amiodarone 150 mg IV", "C. Lidocaine 1 mg/kg IV", "D. Procainamide 20 mg/min IV"],
        correctAnswer: "A. Magnesium sulfate 2 g IV",
        explanation: "Torsades de pointes in the setting of a prolonged QTc interval is treated with IV magnesium sulfate, which stabilizes the cardiac membrane. Antiarrhythmics that prolong the QT interval (like amiodarone) should be avoided."
      },
      {
        scenario: "A 70-year-old female with DVT and recent ICH (2 weeks ago) requires anticoagulation. What is the most appropriate strategy?",
        options: ["A. IVC filter placement", "B. Apixaban 5 mg BID", "C. Enoxaparin 1 mg/kg BID", "D. Warfarin with INR 2-3"],
        correctAnswer: "A. IVC filter placement",
        explanation: "In patients with acute VTE who have an absolute contraindication to anticoagulation (such as a recent intracranial hemorrhage), placement of an IVC filter is recommended to prevent PE."
      },
      {
        scenario: "A 62-year-old male presents with syncope and HR 35 bpm. ECG: Complete heart block with wide QRS escape rhythm. He is on amiodarone for AF. What is the most appropriate next step?",
        options: ["A. Stop amiodarone and observe", "B. Temporary transvenous pacing", "C. Atropine 0.5 mg IV", "D. Isoproterenol infusion"],
        correctAnswer: "B. Temporary transvenous pacing",
        explanation: "Symptomatic complete heart block with a wide QRS escape rhythm indicates an unstable bradycardia requiring immediate electrical stabilization with temporary transvenous pacing. Atropine is unlikely to be effective for an infra-nodal block."
      },
      {
        scenario: "A 68-year-old female with HFpEF (EF 60%) presents with flash pulmonary edema, BP 180/100 mmHg, and SpO2 88%. She is on losartan. What is the most appropriate acute therapy?",
        options: ["A. Nitroglycerin IV + furosemide IV", "B. Dobutamine 5 mcg/kg/min", "C. Increase losartan to 100 mg", "D. Milrinone 0.5 mcg/kg/min"],
        correctAnswer: "A. Nitroglycerin IV + furosemide IV",
        explanation: "The patient has hypertensive acute heart failure (flash pulmonary edema). The primary goal is aggressive afterload reduction with a vasodilator like nitroglycerin, along with diuresis with furosemide to reduce preload."
      },
      {
        scenario: "A 60-year-old male with ischemic cardiomyopathy (EF 20%) develops sustained VT with BP 100/60 mmHg. He is on amiodarone. What is the most appropriate next step?",
        options: ["A. Synchronized cardioversion", "B. Increase amiodarone dose", "C. Add mexiletine", "D. Lidocaine 1 mg/kg IV"],
        correctAnswer: "A. Synchronized cardioversion",
        explanation: "Sustained ventricular tachycardia causing hemodynamic instability (even if borderline) requires immediate synchronized cardioversion to restore a sinus rhythm and prevent cardiovascular collapse."
      },
      {
        scenario: "A 65-year-old male with COPD exacerbation (SpO2 86%, PaCO2 70 mmHg) fails BiPAP after 2 hours. He is lethargic. What is the most appropriate next step?",
        options: ["A. Intubate and ventilate", "B. Increase BiPAP pressure", "C. Administer sodium bicarbonate", "D. Start high-flow nasal cannula"],
        correctAnswer: "A. Intubate and ventilate",
        explanation: "BiPAP failure, evidenced by worsening mental status (lethargy) and persistent hypercapnia, is an indication for endotracheal intubation and mechanical ventilation to protect the airway and ensure adequate ventilation."
      },
      {
        scenario: "A 50-year-old male with CAP develops septic shock (BP 80/50 mmHg, lactate 5 mmol/L). Blood cultures: MRSA. What is the most appropriate antibiotic regimen?",
        options: ["A. Vancomycin + piperacillin-tazobactam", "B. Ceftriaxone + azithromycin", "C. Meropenem alone", "D. Daptomycin + levofloxacin"],
        correctAnswer: "A. Vancomycin + piperacillin-tazobactam",
        explanation: "For community-acquired pneumonia complicated by septic shock and confirmed MRSA bacteremia, broad-spectrum coverage is essential. This includes an agent for MRSA (vancomycin) and an anti-pseudomonal beta-lactam (piperacillin-tazobactam) to cover other potential pathogens."
      },
      {
        scenario: "A 42-year-old female with fever, erythroderma, and mucosal desquamation develops hypotension. She takes carbamazepine. Labs: Eosinophilia, ALT 300 U/L. What is the most appropriate management?",
        options: ["A. Stop carbamazepine + methylprednisolone IV", "B. Epinephrine IM", "C. Vancomycin IV", "D. Hydrocortisone 100 mg IV"],
        correctAnswer: "A. Stop carbamazepine + methylprednisolone IV",
        explanation: "This patient has DRESS syndrome (Drug Reaction with Eosinophilia and Systemic Symptoms), a severe hypersensitivity reaction. Management involves immediate withdrawal of the offending agent (carbamazepine) and systemic corticosteroids."
      },
      {
        scenario: "A 55-year-old male with DKA (pH 7.05, glucose 700 mg/dL, K+ 6.0 mEq/L) develops ventricular fibrillation during insulin therapy. What is the most likely cause?",
        options: ["A. Hypokalemia", "B. Hyperkalemia", "C. Hypomagnesemia", "D. Hypocalcemia"],
        correctAnswer: "A. Hypokalemia",
        explanation: "Insulin therapy drives potassium from the extracellular to the intracellular space. Even with an initially high serum potassium, total body potassium is depleted in DKA. Rapid shifts can cause severe hypokalemia, precipitating life-threatening arrhythmias like VF."
      },
      {
        scenario: "A 62-year-old female with HHS (glucose 1,200 mg/dL, pH 7.32, Na+ 160 mEq/L) develops seizures during fluid resuscitation. What is the most appropriate management?",
        options: ["A. Lorazepam 2 mg IV", "B. 3% saline IV", "C. Mannitol 1 g/kg IV", "D. Phenytoin 15 mg/kg IV"],
        correctAnswer: "A. Lorazepam 2 mg IV",
        explanation: "Seizures in the context of a hyperglycemic hyperosmolar state (HHS) should be treated acutely with a benzodiazepine like lorazepam. The underlying metabolic disturbance should also be corrected carefully."
      },
      {
        scenario: "A 70-year-old male with AKI (SCr 4.0 mg/dL) develops hyperkalemia (K+ 7.2 mEq/L) with sine-wave ECG pattern. What is the most urgent treatment?",
        options: ["A. Calcium gluconate 1 g IV", "B. Insulin 10 units IV + D50W", "C. Kayexalate 30 g PO", "D. Sodium bicarbonate 50 mEq IV"],
        correctAnswer: "A. Calcium gluconate 1 g IV",
        explanation: "Severe hyperkalemia with ECG changes (sine-wave pattern) is a medical emergency. The most urgent step is to stabilize the cardiac membrane with IV calcium gluconate to prevent life-threatening arrhythmias."
      },
      {
        scenario: "A 58-year-old male with decompensated cirrhosis (MELD 30) presents with hematemesis and BP 90/60 mmHg. Endoscopy is delayed. What is the most appropriate initial therapy?",
        options: ["A. Octreotide IV + ceftriaxone IV + pantoprazole IV", "B. Pantoprazole 80 mg IV bolus alone", "C. Terlipressin IV", "D. Propranolol 20 mg PO"],
        correctAnswer: "A. Octreotide IV + ceftriaxone IV + pantoprazole IV",
        explanation: "In a patient with cirrhosis and an upper GI bleed, it is crucial to suspect and treat for variceal bleeding. This includes octreotide to reduce splanchnic blood flow, ceftriaxone for SBP prophylaxis, and a PPI. This combination covers both variceal and non-variceal sources."
      },
      {
        scenario: "A 65-year-old male with melena, Hgb 6.8 g/dL, and BP 85/50 mmHg has a bleeding duodenal ulcer with adherent clot on endoscopy. What is the most appropriate post-endoscopic therapy?",
        options: ["A. High-dose IV PPI for 72 hours", "B. Octreotide 50 mcg/h IV", "C. Epinephrine injection", "D. Oral sucralfate"],
        correctAnswer: "A. High-dose IV PPI for 72 hours",
        explanation: "For a high-risk ulcer (adherent clot), continuous infusion of a high-dose IV proton pump inhibitor (PPI) for 72 hours after endoscopic therapy is recommended to decrease the risk of rebleeding."
      },
      {
        scenario: "A 50-year-old female with hematuria, proteinuria, and SCr 3.2 mg/dL develops pulmonary hemorrhage. Labs: Anti-GBM positive. What is the most appropriate therapy?",
        options: ["A. Plasmapheresis + steroids + cyclophosphamide", "B. Rituximab alone", "C. IVIG 2 g/kg", "D. Azathioprine 2 mg/kg PO"],
        correctAnswer: "A. Plasmapheresis + steroids + cyclophosphamide",
        explanation: "This is Goodpasture's syndrome (anti-GBM disease) with pulmonary-renal involvement. The standard of care is aggressive triple therapy with plasmapheresis to remove circulating antibodies, corticosteroids, and cyclophosphamide to suppress antibody production."
      },
      {
        scenario: "A 72-year-old female with confusion, seizures, and Na+ 162 mEq/L has dehydration and diuretic use. Urine osmolality: 200 mOsm/kg. What is the most appropriate treatment?",
        options: ["A. D5W IV at 100 mL/h", "B. 0.45% NS IV at 200 mL/h", "C. 3% saline IV at 50 mL/h", "D. Desmopressin 2 mcg IV"],
        correctAnswer: "A. D5W IV at 100 mL/h",
        explanation: "The patient has severe hypernatremia with neurological symptoms. The goal is to correct the free water deficit. D5W provides free water to slowly and safely lower the serum sodium. The rate of correction should be monitored carefully to avoid cerebral edema."
      },
      {
        scenario: "A 68-year-old male with seizures and Na+ 122 mEq/L has SIADH from small cell lung cancer. He is euvolemic. What is the most appropriate long-term therapy?",
        options: ["A. Tolvaptan 15 mg PO daily", "B. 3% saline IV continuous", "C. Fluid restriction 1 L/day", "D. Demeclocycline 600 mg BID"],
        correctAnswer: "A. Tolvaptan 15 mg PO daily",
        explanation: "For euvolemic hyponatremia due to SIADH where fluid restriction is ineffective or not tolerated, a vasopressin receptor antagonist like tolvaptan is an effective long-term treatment option. It promotes free water excretion."
      },
      {
        scenario: "A 60-year-old female with AF (HR 170 bpm) develops hypotension (BP 80/50 mmHg) and pulmonary edema. Echo: EF 30%. What is the most appropriate immediate therapy?",
        options: ["A. Synchronized cardioversion with 100 J", "B. Amiodarone 150 mg IV bolus", "C. Diltiazem 0.25 mg/kg IV", "D. Digoxin 0.25 mg IV"],
        correctAnswer: "A. Synchronized cardioversion with 100 J",
        explanation: "Atrial fibrillation with rapid ventricular response causing hemodynamic instability (hypotension, pulmonary edema) is a medical emergency requiring immediate synchronized cardioversion to restore sinus rhythm."
      },
      {
        scenario: "A 55-year-old male with RUQ pain, fever, and jaundice has a CBD stone on MRCP. He develops hypotension and altered mental status. What is the most appropriate next step?",
        options: ["A. ERCP with sphincterotomy", "B. IV fluids + antibiotics", "C. Cholecystectomy", "D. PTC drainage"],
        correctAnswer: "A. ERCP with sphincterotomy",
        explanation: "The patient has acute cholangitis (Charcot's triad) with signs of sepsis (Reynold's pentad: hypotension, altered mental status). Urgent biliary drainage via ERCP is required to resolve the obstruction and control the infection source."
      },
      {
        scenario: "A 58-year-old male with a history of COPD, SpO2 82%, PaCO2 80 mmHg, and pH 7.20 is intubated for hypercapnic respiratory failure. Post-intubation, he develops hypotension. What is the most likely cause?",
        options: ["A. Tension pneumothorax", "B. Auto-PEEP", "C. Hypovolemia", "D. Cardiogenic shock"],
        correctAnswer: "B. Auto-PEEP",
        explanation: "Patients with severe COPD are prone to dynamic hyperinflation or 'auto-PEEP' during mechanical ventilation. This increases intrathoracic pressure, reduces venous return, and can cause hypotension, especially after sedation and positive pressure ventilation are initiated."
      },
      {
        scenario: "A 48-year-old male with fever, nuchal rigidity, and CSF: WBC 1,800/µL, glucose 15 mg/dL, protein 250 mg/dL, Gram stain negative. He has HIV (CD4 50/µL). What is the most appropriate empiric therapy?",
        options: ["A. Ceftriaxone + vancomycin + amphotericin B", "B. Acyclovir + ceftriaxone", "C. Fluconazole + vancomycin", "D. Ceftriaxone + vancomycin + rifampin"],
        correctAnswer: "A. Ceftriaxone + vancomycin + amphotericin B",
        explanation: "In a severely immunocompromised patient (CD4 < 100) with meningitis, empiric coverage must be broad. This includes standard bacterial coverage (ceftriaxone, vancomycin) plus coverage for cryptococcal meningitis (amphotericin B), which is common in this population."
      },
      {
        scenario: "A 62-year-old female with dyspnea and CT: Diffuse reticular opacities, honeycombing. PFTs: FVC 60% predicted, DLCO 50%. She has anti-Scl-70 antibodies. What is the most appropriate therapy?",
        options: ["A. Cyclophosphamide + prednisone", "B. Pirfenidone 801 mg TID", "C. Nintedanib 150 mg BID", "D. Azathioprine 2 mg/kg/day"],
        correctAnswer: "A. Cyclophosphamide + prednisone",
        explanation: "This patient has interstitial lung disease (ILD) associated with systemic sclerosis (positive anti-Scl-70). For active, inflammatory ILD in scleroderma, immunosuppressive therapy with cyclophosphamide and corticosteroids is often used as first-line treatment."
      },
      {
        scenario: "A 50-year-old female with symmetric polyarthritis, rash, and hemoptysis develops renal failure. Labs: c-ANCA positive, PR3 positive. What is the most appropriate induction therapy?",
        options: ["A. Rituximab + steroids", "B. Methotrexate + prednisone", "C. Azathioprine + steroids", "D. Cyclosporine + prednisone"],
        correctAnswer: "A. Rituximab + steroids",
        explanation: "The presentation is classic for Granulomatosis with Polyangiitis (GPA), a c-ANCA-associated vasculitis. For induction of remission in severe GPA, high-dose corticosteroids combined with either rituximab or cyclophosphamide is the standard of care."
      },
      {
        scenario: "A 68-year-old male with sudden abdominal pain, lactic acidosis, and CT: SMA occlusion with bowel wall thickening. He has AF on warfarin (INR 1.8). What is the most appropriate management?",
        options: ["A. Heparin IV + surgical consult", "B. Thrombolytic therapy", "C. Vitamin K 10 mg IV", "D. Antibiotics alone"],
        correctAnswer: "A. Heparin IV + surgical consult",
        explanation: "Acute mesenteric ischemia from an SMA occlusion is a surgical emergency. Immediate anticoagulation with a heparin infusion is crucial to prevent further clot propagation, and an urgent surgical consultation is needed for possible embolectomy or revascularization."
      },
      {
        scenario: "A 45-year-old male with alcohol withdrawal develops seizures and delirium tremens 72 hours after cessation. He is on lorazepam 2 mg IV q4h. What is the most appropriate next step?",
        options: ["A. Add phenobarbital 130 mg IV", "B. Increase lorazepam to 4 mg IV q4h", "C. Start valproate 500 mg BID", "D. Administer haloperidol 5 mg IM"],
        correctAnswer: "A. Add phenobarbital 130 mg IV",
        explanation: "This patient has severe, refractory alcohol withdrawal (delirium tremens) despite scheduled benzodiazepine dosing. Adding phenobarbital is a common and effective strategy for severe cases, as it acts on GABA receptors through a different mechanism than benzodiazepines."
      },
      {
        scenario: "A 38-year-old male with opioid use disorder develops severe agitation and diarrhea 24 hours after cessation. He is on clonidine 0.1 mg BID. What is the most appropriate additional therapy?",
        options: ["A. Buprenorphine 8 mg SL", "B. Loperamide 4 mg PO", "C. Haloperidol 2 mg IM", "D. Naloxone 0.4 mg IV"],
        correctAnswer: "A. Buprenorphine 8 mg SL",
        explanation: "The patient is in moderate to severe opioid withdrawal. After waiting for objective signs of withdrawal to appear (to avoid precipitated withdrawal), initiating buprenorphine is the most effective treatment to manage symptoms and is a cornerstone of opioid use disorder therapy."
      },
      {
        scenario: "A 60-year-old female with metastatic breast cancer presents with hypercalcemia (Ca2+ 14 mg/dL) and altered mental status. She is on denosumab. What is the most appropriate therapy?",
        options: ["A. Calcitonin 4 IU/kg IM + fluids", "B. Increase denosumab dose", "C. Zoledronic acid 4 mg IV", "D. Prednisone 40 mg PO"],
        correctAnswer: "A. Calcitonin 4 IU/kg IM + fluids",
        explanation: "For severe, symptomatic hypercalcemia of malignancy, initial management includes aggressive IV hydration and calcitonin. Calcitonin has a rapid onset of action, making it useful for acute management while waiting for the more potent but slower-acting bisphosphonates (like zoledronic acid) to take effect."
      },
      {
        scenario: "A 65-year-old male with PAD presents with acute leg pain, pulselessness, and sensory loss. CTA: Popliteal artery occlusion. He has a heparin allergy. What is the most appropriate management?",
        options: ["A. Argatroban IV + thrombectomy", "B. Aspirin 325 mg + observe", "C. Bivalirudin + catheter thrombolysis", "D. Amputation"],
        correctAnswer: "A. Argatroban IV + thrombectomy",
        explanation: "This is acute limb ischemia, a vascular emergency. The patient requires anticoagulation and revascularization. Due to the heparin allergy, a direct thrombin inhibitor like argatroban is used. Surgical thrombectomy is indicated for revascularization."
      },
      {
        scenario: "A 55-year-old female with fever, rash, and hemoptysis has c-ANCA positivity and nasal crusting. She develops saddle nose deformity. What is the most appropriate long-term therapy?",
        options: ["A. Rituximab maintenance", "B. Methotrexate 25 mg weekly", "C. Cyclophosphamide 2 mg/kg/day", "D. Prednisone 5 mg daily"],
        correctAnswer: "A. Rituximab maintenance",
        explanation: "This patient has Granulomatosis with Polyangiitis (GPA). After achieving remission with induction therapy (e.g., rituximab or cyclophosphamide), maintenance therapy is required to prevent relapse. Rituximab is a standard agent for maintenance of remission."
      },
      {
        scenario: "A 60-year-old male with vomiting, abdominal distension, and CT: Transition point with air-fluid levels. He has Crohn's disease. What is the most appropriate management?",
        options: ["A. NG tube + surgical consult", "B. Infliximab 5 mg/kg IV", "C. Metronidazole 500 mg IV", "D. Prednisone 40 mg PO"],
        correctAnswer: "A. NG tube + surgical consult",
        explanation: "The clinical and imaging findings are consistent with a high-grade small bowel obstruction. Initial management includes bowel rest, nasogastric (NG) tube decompression, and an urgent surgical consultation, especially in the context of a known stricturing disease like Crohn's."
      },
      {
        scenario: "A 68-year-old male with STEMI develops cardiogenic shock (BP 80/50 mmHg, CI 1.8 L/min/m²) post-PCI. Echo: EF 15%. What is the most appropriate therapy?",
        options: ["A. Intra-aortic balloon pump", "B. Milrinone 0.5 mcg/kg/min", "C. Dobutamine 5 mcg/kg/min", "D. ECMO"],
        correctAnswer: "A. Intra-aortic balloon pump",
        explanation: "In post-PCI cardiogenic shock, mechanical circulatory support is often required. An intra-aortic balloon pump (IABP) is a common choice to improve coronary perfusion and reduce afterload, serving as a bridge to recovery or more advanced therapies."
      },
      {
        scenario: "A 55-year-old female with dyspnea and RV strain on echo has scleroderma. CT: No PE. PFTs: DLCO 40%. What is the most appropriate diagnostic test?",
        options: ["A. Right heart catheterization", "B. Bronchoalveolar lavage", "C. V/Q scan", "D. Cardiac MRI"],
        correctAnswer: "A. Right heart catheterization",
        explanation: "Scleroderma is a major risk factor for pulmonary arterial hypertension (PAH). Given the RV strain on echo and low DLCO, a right heart catheterization is the gold standard test to confirm the diagnosis of PAH and assess its severity."
      },
      {
        scenario: "A 70-year-old male with a dual-chamber pacemaker presents with dyspnea and cannon A waves. ECG: Paced rhythm, loss of AV synchrony. What is the most appropriate next step?",
        options: ["A. Pacemaker reprogramming", "B. Amiodarone 200 mg PO", "C. Furosemide 40 mg IV", "D. Heparin 5,000 units SC"],
        correctAnswer: "A. Pacemaker reprogramming",
        explanation: "The patient is experiencing pacemaker syndrome, which occurs due to AV dyssynchrony. The cannon A waves are a classic sign. This is a device-related issue that requires interrogation and reprogramming of the pacemaker to restore AV synchrony."
      },
      {
        scenario: "A 65-year-old male with syncope and ECG: Trifascicular block with intermittent complete heart block. He is on digoxin for AF. What is the most appropriate management?",
        options: ["A. Permanent pacemaker implantation", "B. Stop digoxin and observe", "C. Atropine 0.5 mg IV", "D. Isoproterenol 2 mcg/min IV"],
        correctAnswer: "A. Permanent pacemaker implantation",
        explanation: "Trifascicular block with intermittent complete heart block is a high-risk finding for progression to persistent complete heart block. Syncope in this context is a Class I indication for permanent pacemaker implantation."
      },
      {
        scenario: "A 58-year-old female with fever, rash, and hematuria develops AKI. Labs: p-ANCA positive, MPO positive. Kidney biopsy: Pauci-immune GN. What is the most appropriate therapy?",
        options: ["A. Rituximab + steroids", "B. IVIG 2 g/kg", "C. Methotrexate 25 mg weekly", "D. Prednisone 5 mg daily"],
        correctAnswer: "A. Rituximab + steroids",
        explanation: "This patient has microscopic polyangiitis (MPA), a p-ANCA associated vasculitis, confirmed by pauci-immune glomerulonephritis on biopsy. For induction of remission in severe MPA, high-dose corticosteroids plus either rituximab or cyclophosphamide is standard."
      },
      {
        scenario: "A 55-year-old male with chest pain, troponin 1.2 ng/mL, and ECG: ST depression in V4-V6 is on heparin. He develops HIT (platelet count 50,000/µL). What is the most appropriate anticoagulant?",
        options: ["A. Argatroban IV", "B. Enoxaparin 1 mg/kg SC", "C. Fondaparinux 7.5 mg SC", "D. Bivalirudin IV"],
        correctAnswer: "A. Argatroban IV",
        explanation: "The patient has NSTEMI and has developed heparin-induced thrombocytopenia (HIT). All heparin products must be stopped. An alternative anticoagulant, such as the direct thrombin inhibitor argatroban, must be started immediately."
      },
      {
        scenario: "A 60-year-old female with fever, flank pain, and pyuria develops septic shock. Blood cultures: ESBL E. coli. What is the most appropriate antibiotic?",
        options: ["A. Meropenem 1 g IV q8h", "B. Ceftriaxone 1 g IV q24h", "C. Piperacillin-tazobactam 4.5 g IV q6h", "D. Levofloxacin 750 mg IV q24h"],
        correctAnswer: "A. Meropenem 1 g IV q8h",
        explanation: "The patient has urosepsis caused by an extended-spectrum beta-lactamase (ESBL)-producing organism. Carbapenems, such as meropenem, are the treatment of choice for severe infections with ESBL-producing bacteria."
      },
      {
        scenario: "A 50-year-old female with SLE presents with fever, rash, and proteinuria. Kidney biopsy: Diffuse lupus nephritis (Class IV). What is the most appropriate induction therapy?",
        options: ["A. Cyclophosphamide + steroids", "B. Azathioprine 2 mg/kg/day", "C. Hydroxychloroquine 400 mg/day", "D. Methotrexate 25 mg weekly"],
        correctAnswer: "A. Cyclophosphamide + steroids",
        explanation: "Class IV lupus nephritis is a severe form of kidney involvement in SLE. Induction therapy typically involves high-dose corticosteroids combined with either cyclophosphamide or mycophenolate mofetil to rapidly control inflammation and preserve kidney function."
      },
      {
        scenario: "A 65-year-old male with chest pain and hypotension has muffled heart sounds and a large pericardial effusion on echo. BP drops to 80/50 mmHg during fluid bolus. What is the most appropriate therapy?",
        options: ["A. Pericardiocentesis", "B. IV fluids 1 L NS", "C. Norepinephrine 0.1 mcg/kg/min", "D. Prednisone 40 mg PO"],
        correctAnswer: "A. Pericardiocentesis",
        explanation: "The patient has Beck's triad (hypotension, muffled heart sounds, JVD - implied by effusion size) and clinical signs of cardiac tamponade. This is a medical emergency requiring immediate pericardiocentesis to relieve the pressure on the heart."
      },
      {
        scenario: "A 55-year-old female with ARDS (PaO2/FiO2 120) develops refractory hypoxemia despite prone positioning. What is the most appropriate next step?",
        options: ["A. ECMO initiation", "B. High-dose steroids", "C. Nitric oxide inhalation", "D. Increase PEEP to 20 cmH2O"],
        correctAnswer: "A. ECMO initiation",
        explanation: "This patient has severe ARDS with refractory hypoxemia despite optimal ventilator management including prone positioning. Veno-venous extracorporeal membrane oxygenation (VV-ECMO) is a rescue therapy to consider in such cases."
      },
      {
        scenario: "A 60-year-old male with hemoptysis, weight loss, and CT: Cavitary lesion. Sputum: MTB PCR positive. He has HIV (CD4 100/µL). What is the most appropriate therapy?",
        options: ["A. RIPE therapy + ART after 2 weeks", "B. Levofloxacin + ethambutol", "C. Isoniazid + rifabutin", "D. Streptomycin + pyrazinamide"],
        correctAnswer: "A. RIPE therapy + ART after 2 weeks",
        explanation: "The patient has active tuberculosis. Standard RIPE (Rifampin, Isoniazid, Pyrazinamide, Ethambutol) therapy should be initiated immediately. In patients with HIV and a low CD4 count, antiretroviral therapy (ART) should be started within 2-8 weeks to reduce the risk of IRIS (Immune Reconstitution Inflammatory Syndrome)."
      },
      {
        scenario: "A 50-year-old female with chest pain and D-dimer 1,500 ng/mL has a negative CT but persistent tachycardia. Echo: RV strain. What is the most appropriate next step?",
        options: ["A. V/Q scan", "B. Heparin IV", "C. Reassure and discharge", "D. Repeat CT in 24 hours"],
        correctAnswer: "A. V/Q scan",
        explanation: "There is a high clinical suspicion for pulmonary embolism (PE) despite a negative CTPA. When suspicion remains high and the CTPA is negative or equivocal, a V/Q scan can be useful as a second-line imaging modality, particularly for detecting smaller, peripheral PEs."
      },
      {
        scenario: "A 65-year-old male with confusion, fever, and CSF: WBC 80/µL, lymphocytic, cryptococcal antigen positive. He has HIV (CD4 30/µL). What is the most appropriate induction therapy?",
        options: ["A. Liposomal amphotericin B + flucytosine", "B. Fluconazole 400 mg PO daily", "C. Acyclovir 10 mg/kg IV q8h", "D. Ceftriaxone 2 g IV q12h"],
        correctAnswer: "A. Liposomal amphotericin B + flucytosine",
        explanation: "This patient has cryptococcal meningitis in the setting of advanced HIV. The standard of care for induction therapy is a combination of liposomal amphotericin B and flucytosine for at least two weeks."
      },
      {
        scenario: "A 55-year-old female with asthma presents with dyspnea and SpO2 90%. PFTs: FEV1 50% predicted. She is on high-dose ICS/LABA. What is the most appropriate acute therapy?",
        options: ["A. Systemic steroids + albuterol", "B. Omalizumab 300 mg SC", "C. Montelukast 10 mg PO", "D. Theophylline 300 mg PO"],
        correctAnswer: "A. Systemic steroids + albuterol",
        explanation: "This is a moderate to severe asthma exacerbation. The cornerstones of acute management are short-acting beta-agonists (albuterol) and systemic corticosteroids to reduce airway inflammation and bronchospasm."
      },
      {
        scenario: "A 60-year-old male with abdominal pain and CT: Free air under diaphragm. He is hemodynamically stable. What is the most appropriate next step?",
        options: ["A. Emergent laparotomy", "B. Antibiotics + observation", "C. CT-guided drainage", "D. PPI 40 mg IV"],
        correctAnswer: "A. Emergent laparotomy",
        explanation: "Pneumoperitoneum (free air) indicates a perforated viscus, which is a surgical emergency. The patient requires an emergent exploratory laparotomy to identify and repair the source of the perforation, regardless of hemodynamic stability."
      },
      {
        scenario: "A 50-year-old female with fever, rash, and eosinophilia after starting allopurinol. Kidney biopsy: Eosinophilic infiltrates. What is the most appropriate therapy?",
        options: ["A. Stop allopurinol + prednisone", "B. IVIG 2 g/kg", "C. Cyclophosphamide 2 mg/kg/day", "D. Rituximab 375 mg/m²"],
        correctAnswer: "A. Stop allopurinol + prednisone",
        explanation: "This is a classic presentation of acute interstitial nephritis (AIN), a hypersensitivity reaction commonly caused by drugs like allopurinol. Management consists of stopping the offending agent and administering corticosteroids."
      },
      {
        scenario: "A 65-year-old male with chest pain and ECG: ST elevation in V1-V4, new RBBB. He is allergic to aspirin (anaphylaxis). What is the most appropriate therapy?",
        options: ["A. Emergent PCI + clopidogrel", "B. Ticagrelor + heparin", "C. Streptokinase IV", "D. Metoprolol 5 mg IV"],
        correctAnswer: "A. Emergent PCI + clopidogrel",
        explanation: "This is a STEMI equivalent. Emergent PCI is the preferred reperfusion strategy. Due to the true aspirin allergy (anaphylaxis), a P2Y12 inhibitor like clopidogrel should be given as an alternative antiplatelet agent."
      },
      {
        scenario: "A 55-year-old female with dyspnea and SpO2 90%. Echo: Severe mitral regurgitation, EF 60%. What is the most appropriate acute therapy?",
        options: ["A. Nitroprusside IV + furosemide", "B. Dobutamine 5 mcg/kg/min", "C. Milrinone 0.5 mcg/kg/min", "D. Heparin 5,000 units SC"],
        correctAnswer: "A. Nitroprusside IV + furosemide",
        explanation: "This patient has acute decompensated heart failure due to severe mitral regurgitation. Management focuses on afterload reduction with nitroprusside to decrease the regurgitant fraction, and diuresis with furosemide to reduce pulmonary congestion."
      },
      {
        scenario: "A 60-year-old male with fever and neck swelling. CT: Ludwig's angina with airway compromise. What is the most appropriate management?",
        options: ["A. Emergent surgical drainage + antibiotics", "B. Ceftriaxone 1 g IV alone", "C. Steroids 10 mg IV", "D. Observation with antibiotics"],
        correctAnswer: "A. Emergent surgical drainage + antibiotics",
        explanation: "Ludwig's angina is a rapidly progressive cellulitis of the floor of the mouth that can lead to life-threatening airway obstruction. Emergent surgical drainage to relieve pressure and broad-spectrum antibiotics are required. Airway management is also critical."
      },
      {
        scenario: "A 50-year-old female with chest pain and troponin 0.3 ng/mL. Stress test: Reversible defect in LAD territory. She has CKD (eGFR 20 mL/min). What is the most appropriate therapy?",
        options: ["A. PCI with bivalirudin", "B. Enoxaparin + CABG", "C. Fondaparinux + medical therapy", "D. Aspirin alone"],
        correctAnswer: "A. PCI with bivalirudin",
        explanation: "The patient has NSTEMI with high-risk features (positive stress test). Cardiac catheterization with intent for PCI is indicated. In patients with severe CKD, bivalirudin is often a preferred anticoagulant during PCI as it has a lower risk of bleeding compared to heparin plus a glycoprotein IIb/IIIa inhibitor."
      },
      {
        scenario: "A 55-year-old female with fever, jaundice, and confusion. Labs: AST 1,500 U/L, INR 4.0, ammonia 200 µmol/L. She takes isoniazid. What is the most appropriate therapy?",
        options: ["A. N-acetylcysteine IV", "B. Prednisone 40 mg PO", "C. Lactulose PO", "D. Vitamin K 10 mg IV"],
        correctAnswer: "A. N-acetylcysteine IV",
        explanation: "This patient has drug-induced acute liver failure (from isoniazid). While classically used for acetaminophen overdose, N-acetylcysteine (NAC) has shown benefit in non-acetaminophen acute liver failure and is recommended."
      },
      {
        scenario: "A 60-year-old male with chest pain and ECG: New LBBB, troponin 2.0 ng/mL. He is on dabigatran for AF. What is the most appropriate management?",
        options: ["A. Idarucizumab + emergent PCI", "B. Heparin + observe", "C. FFP + CABG", "D. Metoprolol 5 mg IV"],
        correctAnswer: "A. Idarucizumab + emergent PCI",
        explanation: "A new LBBB with symptoms and positive troponin is treated as a STEMI equivalent, requiring emergent PCI. Since the patient is on dabigatran, its reversal agent, idarucizumab, should be administered to reduce bleeding risk during the procedure."
      },
      {
        scenario: "A 50-year-old female with dyspnea, palpitations, and SpO2 90%. PFTs: Normal. CT: Normal. V/Q scan: Normal. She reports situational stress. What is the most appropriate next step?",
        options: ["A. Psychiatric evaluation", "B. Cardiac stress test", "C. Bronchoscopy", "D. Repeat CT in 48 hours"],
        correctAnswer: "A. Psychiatric evaluation",
        explanation: "An extensive workup for cardiopulmonary causes of dyspnea has been completed and is negative. Given the context of situational stress, a psychiatric cause, such as a panic attack or anxiety disorder, is a likely diagnosis and warrants evaluation."
      },
      {
        scenario: "A 65-year-old male with fever and cough. Sputum: Acinetobacter baumannii, MDR. What is the most appropriate antibiotic?",
        options: ["A. Colistin + meropenem + sulbactam", "B. Ceftriaxone + azithromycin", "C. Vancomycin + piperacillin-tazobactam", "D. Levofloxacin 750 mg IV"],
        correctAnswer: "A. Colistin + meropenem + sulbactam",
        explanation: "Multi-drug resistant (MDR) Acinetobacter baumannii is a difficult-to-treat pathogen. Combination therapy is often required, typically including a polymyxin (colistin), a carbapenem (even if resistant, for synergistic effects), and often sulbactam."
      },
      {
        scenario: "A 60-year-old male with dyspnea and SpO2 85%. ABG: PaO2 50 mmHg, PaCO2 45 mmHg. CT: Diffuse alveolar hemorrhage. What is the most appropriate therapy?",
        options: ["A. High-dose steroids + cyclophosphamide", "B. Heparin IV", "C. Furosemide 80 mg IV", "D. Albuterol nebulizer"],
        correctAnswer: "A. High-dose steroids + cyclophosphamide",
        explanation: "Diffuse alveolar hemorrhage (DAH) is often caused by a systemic autoimmune disease (e.g., vasculitis). The cornerstone of treatment is high-dose immunosuppression, typically with corticosteroids and often another agent like cyclophosphamide or rituximab, to control the underlying inflammation."
      },
      {
        scenario: "A 45-year-old female with fever, hemolytic anemia, and thrombocytopenia. Platelets: 30,000/µL. Labs: Shiga toxin positive, SCr 3.0 mg/dL. What is the most appropriate therapy?",
        options: ["A. Supportive care", "B. Eculizumab IV", "C. Rituximab IV", "D. IVIG 2 g/kg"],
        correctAnswer: "A. Supportive care",
        explanation: "This patient has Hemolytic Uremic Syndrome (HUS) caused by Shiga toxin-producing E. coli. The mainstay of treatment for typical (Shiga toxin-related) HUS is supportive care, including fluid management and renal replacement therapy if needed. Antibiotics and platelet transfusions are generally avoided."
      },
      {
        scenario: "A 55-year-old female with sickle cell disease presents with chest pain, fever, and SpO2 90%. CXR: New infiltrates. What is the most appropriate management?",
        options: ["A. Ceftriaxone + azithromycin + exchange transfusion", "B. Hydroxyurea 1,000 mg PO", "C. Morphine alone", "D. IV fluids + oxygen"],
        correctAnswer: "A. Ceftriaxone + azithromycin + exchange transfusion",
        explanation: "This is a classic presentation of Acute Chest Syndrome in a patient with sickle cell disease. Management is multi-faceted and includes empiric antibiotics for atypical pneumonia, supplemental oxygen, pain control, and, in severe cases with hypoxemia, exchange transfusion to reduce the percentage of sickled hemoglobin."
      },
      {
        scenario: "A 50-year-old female with palpitations, fever, and confusion. Exam: HR 150 bpm, goiter. Labs: TSH <0.01 mIU/L, free T4 5.0 ng/dL. What is the most appropriate therapy?",
        options: ["A. Propranolol + methimazole + hydrocortisone", "B. Levothyroxine 100 mcg PO", "C. Amiodarone 200 mg PO", "D. Furosemide 40 mg IV"],
        correctAnswer: "A. Propranolol + methimazole + hydrocortisone",
        explanation: "This patient is in thyroid storm, a life-threatening thyrotoxicosis. Management requires a multi-pronged approach: a beta-blocker (propranolol) for symptom control, an antithyroid drug (methimazole) to block new hormone synthesis, and corticosteroids to reduce peripheral conversion of T4 to T3."
      },
      {
        scenario: "A 60-year-old male with hypotension, hyponatremia, and hyperkalemia. Labs: Cortisol 2 µg/dL, ACTH 1,200 pg/mL. What is the most appropriate therapy?",
        options: ["A. Hydrocortisone 100 mg IV", "B. Fludrocortisone 0.1 mg PO", "C. Prednisone 5 mg PO", "D. Dexamethasone 4 mg IV"],
        correctAnswer: "A. Hydrocortisone 100 mg IV",
        explanation: "The clinical and lab findings are classic for acute adrenal crisis due to primary adrenal insufficiency (Addison's disease). The most important immediate treatment is stress-dose glucocorticoids with IV hydrocortisone."
      },
      {
        scenario: "A 55-year-old female with acute weakness and respiratory distress. Exam: Ptosis, diplopia. She has myasthenia gravis. What is the most appropriate therapy?",
        options: ["A. Pyridostigmine + plasmapheresis + steroids", "B. Azathioprine alone", "C. Methotrexate 25 mg weekly", "D. IVIG 2 g/kg"],
        correctAnswer: "A. Pyridostigmine + plasmapheresis + steroids",
        explanation: "This is a myasthenic crisis, a life-threatening exacerbation of myasthenia gravis leading to respiratory failure. Management involves acetylcholinesterase inhibitors (pyridostigmine), respiratory support, and immunomodulatory therapy like plasmapheresis or IVIG to rapidly remove or neutralize pathogenic antibodies. Steroids are also part of the regimen."
      },
      {
        scenario: "A 55-year-old female with seizures for 20 minutes despite lorazepam 4 mg IV x2. She has no known epilepsy. What is the most appropriate next step?",
        options: ["A. Midazolam 10 mg IM", "B. Phenytoin 20 mg/kg IV", "C. Valproate 30 mg/kg IV", "D. Continue lorazepam 2 mg IV"],
        correctAnswer: "A. Midazolam 10 mg IM",
        explanation: "This patient is in refractory status epilepticus. After failing first-line benzodiazepines, a second-line antiepileptic agent is needed. If IV access is an issue or for rapid administration, IM midazolam is a reasonable and effective option. Alternatively, IV fosphenytoin, valproate, or levetiracetam would be appropriate."
      },
      {
        scenario: "A 70-year-old male with end-stage COPD presents with severe dyspnea, SpO2 88%, and refuses intubation. What is the most appropriate management?",
        options: ["A. Initiate goals of care discussion for comfort care", "B. High-flow nasal cannula", "C. BiPAP with FiO2 0.5", "D. Albuterol nebulizer alone"],
        correctAnswer: "A. Initiate goals of care discussion for comfort care",
        explanation: "In a patient with end-stage terminal disease who is refusing curative or life-prolonging interventions, the priority shifts to palliative care. An urgent goals of care discussion is needed to establish a plan focused on comfort, symptom management, and respecting the patient's wishes."
      },
      {
        scenario: "A 50-year-old male with cirrhosis presents with fever, abdominal pain, and ascites. Paracentesis: PMN 300/µL. What is the most appropriate therapy?",
        options: ["A. Ceftriaxone IV + albumin IV", "B. Metronidazole 500 mg IV", "C. Vancomycin IV", "D. Diuretics alone"],
        correctAnswer: "A. Ceftriaxone IV + albumin IV",
        explanation: "An ascitic fluid PMN count > 250 cells/µL is diagnostic for spontaneous bacterial peritonitis (SBP). The standard of care is empiric treatment with a third-generation cephalosporin (e.g., ceftriaxone). Albumin administration is also recommended to reduce the risk of hepatorenal syndrome."
      },
      {
        scenario: "A 50-year-old male with gout flare, joint swelling, and CKD (eGFR 20 mL/min). He is on allopurinol. What is the most appropriate therapy?",
        options: ["A. Colchicine low-dose + prednisone", "B. Indomethacin 50 mg TID", "C. Allopurinol 300 mg PO", "D. Febuxostat 80 mg PO"],
        correctAnswer: "A. Colchicine low-dose + prednisone",
        explanation: "NSAIDs are contraindicated in severe CKD. For an acute gout flare in this patient, treatment options include corticosteroids (prednisone) and/or a low dose of colchicine (with dose adjustment for renal impairment). Allopurinol is a urate-lowering therapy and should not be initiated or dose-escalated during an acute flare."
      },
      {
        scenario: "A 65-year-old male with HHS (glucose 1,000 mg/dL, pH 7.35, SCr 3.5 mg/dL) develops oliguria. What is the most appropriate next step?",
        options: ["A. IV fluids + insulin", "B. Furosemide 40 mg IV", "C. Dopamine 2 mcg/kg/min", "D. Sodium bicarbonate 50 mEq IV"],
        correctAnswer: "A. IV fluids + insulin",
        explanation: "The oliguria is due to severe dehydration and pre-renal acute kidney injury from the hyperglycemic hyperosmolar state (HHS). The cornerstone of management is aggressive fluid resuscitation with isotonic saline and initiation of an insulin infusion to gradually correct the hyperglycemia and hyperosmolality."
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
      const passed = percentage >= 70;
      
      // Save exam completion status to localStorage
      const examResults = {
        completed: true,
        passed: passed,
        score: percentage,
        totalQuestions: shuffledScenarios.length,
        correctAnswers: score,
        completedAt: new Date().toISOString(),
        userId: 'current-user' // In a real app, this would be the actual user ID
      };
      localStorage.setItem('finalExamResults', JSON.stringify(examResults));
      
      // Track the final exam completion activity
      const activityData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'quiz_completed',
        title: 'CME Final Exam',
        date: new Date().toISOString(),
        details: `Score: ${percentage}% (${score}/${shuffledScenarios.length} correct)${passed ? ' - PASSED' : ' - FAILED'}`
      };
      
      // Add to existing activities
      const existingActivities = JSON.parse(localStorage.getItem('userActivities') || '[]');
      const updatedActivities = [activityData, ...existingActivities].slice(0, 50);
      localStorage.setItem('userActivities', JSON.stringify(updatedActivities));
      
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
                    ? 'You are eligible for 10 AAPA Category 1 CME credits' 
                    : 'A score of 70% or higher is required for CME credits'}
                </p>
              </div>
            </div>
            ${passed ? `
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p class="text-blue-800 font-semibold mb-2">🏆 Certificate Available</p>
                <p class="text-blue-700 text-sm mb-3">Your CME certificate is ready to view and download</p>
                <a href="/dashboard/cme/certificate" class="inline-block bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm w-full sm:w-auto text-center">
                  View Certificate
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
          <div class="text-center space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            <button onclick="restartExam()" class="bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-emerald-700 transition-colors text-sm sm:text-base w-full sm:w-auto">
              Retake Exam
            </button>
            <a href="/dashboard/cme" class="inline-block bg-gray-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm sm:text-base w-full sm:w-auto text-center">
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

    // Initialize with a small delay to ensure DOM is ready
    const initializeQuiz = () => {
      const scenarioElement = document.getElementById('scenario');
      if (scenarioElement) {
        loadProgress();
        displayScenario();
      } else {
        // If DOM not ready, try again after a short delay
        setTimeout(initializeQuiz, 100);
      }
    };
    
    initializeQuiz();
  }, []);

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CME Final Exam</h1>
          <p className="mt-2 text-gray-600">
            Complete the comprehensive final exam to earn 10 AAPA Category 1 CME credits.
          </p>
        </div>

        <UpgradePrompt 
          title="Final Exam - All-Access Required"
          description="Take the comprehensive CME final exam and earn 10 AAPA Category 1 CME credits with the All-Access plan."
          feature="CME Final Exam & Certificates"
        />
      </div>
    );
  }

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

      {/* Final Exam Container */}
      <Card className="mx-4 sm:mx-0">
        <CardContent className="p-0">
          <div 
            id="final-exam-container" 
            className="w-full min-h-[60vh] sm:min-h-[70vh] lg:h-[85vh] border-0 rounded-lg overflow-hidden"
            style={{ background: '#f4f4f9' }}
          >
            <div className="flex justify-center items-start min-h-full p-2 sm:p-4">
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-2xl lg:max-w-3xl">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">Hospital Medicine Test for CME</h1>
                <div className="objectives text-gray-700 mb-3 sm:mb-4 text-left text-xs sm:text-sm">
                  <p><strong>Learning Objectives:</strong></p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Apply guideline-based management for acute hospital medicine conditions.</li>
                    <li>Differentiate critical interventions in life-threatening scenarios.</li>
                    <li>Integrate diagnostic reasoning with therapeutic decision-making.</li>
                  </ul>
                </div>
                <div id="game-content">
                  <div id="question-counter" className="text-xs sm:text-sm text-gray-600 mb-2"></div>
                  <div id="progress" className="mb-3 sm:mb-4"></div>
                  <div id="scenario" className="text-gray-700 mb-3 sm:mb-4 text-left text-sm sm:text-base leading-relaxed"></div>
                  <div className="options flex flex-col gap-2" id="options"></div>
                  <div id="feedback" className="mt-3 sm:mt-4 font-bold opacity-0 transition-opacity duration-500" aria-live="polite"></div>
                  <div id="explanation" className="mt-2 text-gray-600 text-left overflow-wrap-break-word max-h-32 sm:max-h-36 overflow-y-auto text-sm leading-relaxed"></div>
                  <div id="next-button-container" className="mt-3 sm:mt-4"></div>
                  <div id="score" className="mt-2 text-gray-800 text-sm">Score: 0%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 