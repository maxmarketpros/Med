import { CheatSheet, Quiz, QuizQuestion, DashboardStats, Activity, Certificate, QuizAttempt } from '@/types';

// Fallback cheat sheets data (the real data comes from the API)
export const sampleCheatSheets: CheatSheet[] = [
  {
    id: 'acute-coronary-syndrome',
    title: 'Acute Coronary Syndrome',
    slug: 'acute-coronary-syndrome',
    specialty: 'Cardiology',
    fileName: 'Acute coronary syndrome.pdf',
    filePath: 'cheat-sheets/Cardiology/Acute coronary syndrome.pdf',
    description: 'Comprehensive guide to ACS diagnosis and management',
    tags: ['cardiology', 'emergency', 'chest-pain'],
    lastUpdated: '2024-01-01T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 8,
    downloadCount: 245,
    fileSize: '2048000'
  },
  {
    id: 'hyponatremia',
    title: 'Hyponatremia',
    slug: 'hyponatremia',
    specialty: 'Nephrology',
    fileName: 'hyponatremia.pdf',
    filePath: 'cheat-sheets/Nephrology/hyponatremia.pdf',
    description: 'Approach to hyponatremia diagnosis and treatment',
    tags: ['nephrology', 'electrolytes', 'emergency'],
    lastUpdated: '2024-01-01T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 6,
    downloadCount: 189,
    fileSize: '1536000'
  },
  {
    id: 'chf',
    title: 'CHF',
    slug: 'chf',
    specialty: 'Cardiology',
    fileName: 'CHF.pdf',
    filePath: 'cheat-sheets/Cardiology/CHF.pdf',
    description: 'Heart failure management and treatment protocols',
    tags: ['cardiology', 'heart-failure', 'management'],
    lastUpdated: '2024-01-01T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 10,
    downloadCount: 312,
    fileSize: '2560000'
  },
  {
    id: 'cap',
    title: 'CAP',
    slug: 'cap',
    specialty: 'Infectious Disease',
    fileName: 'CAP.pdf',
    filePath: 'cheat-sheets/Infectious disease/CAP.pdf',
    description: 'Community-acquired pneumonia diagnosis and treatment',
    tags: ['infectious-disease', 'respiratory', 'antibiotics'],
    lastUpdated: '2024-01-01T00:00:00Z',
    difficulty: 'Beginner',
    estimatedReadTime: 7,
    downloadCount: 156,
    fileSize: '1792000'
  }
];

export const sampleQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Hyponatremia Management Certification',
    specialty: 'Nephrology',
    description: 'Test your knowledge of hyponatremia diagnosis and treatment protocols.',
    passingScore: 70,
    cmeCredits: 1.0,
    estimatedTime: 15,
    difficulty: 'Intermediate',
    isFinalExam: true, // This is a final exam that triggers evaluation flow
    questions: [
      {
        id: 'q1',
        question: 'A 68-year-old patient presents with confusion and serum sodium of 118 mEq/L. What is the maximum safe correction rate for the first 24 hours?',
        options: [
          '6-8 mEq/L',
          '10-12 mEq/L',
          '12-15 mEq/L',
          '15-20 mEq/L'
        ],
        correctAnswer: 1,
        explanation: 'For chronic hyponatremia, the maximum safe correction is 10-12 mEq/L in 24 hours to prevent osmotic demyelination syndrome.',
        category: 'Treatment'
      },
      {
        id: 'q2',
        question: 'Which medication is most commonly associated with SIADH-induced hyponatremia?',
        options: [
          'Lisinopril',
          'Carbamazepine',
          'Metformin',
          'Atorvastatin'
        ],
        correctAnswer: 1,
        explanation: 'Carbamazepine is a well-known cause of SIADH, leading to euvolemic hyponatremia.',
        category: 'Etiology'
      },
      {
        id: 'q3',
        question: 'In acute symptomatic hyponatremia, what is the initial treatment of choice?',
        options: [
          'Normal saline 1L bolus',
          '3% saline 100-150mL bolus',
          'Fluid restriction',
          'Demeclocycline'
        ],
        correctAnswer: 1,
        explanation: '3% hypertonic saline is used for acute severe hyponatremia with neurologic symptoms.',
        category: 'Emergency Treatment'
      }
    ]
  },
  {
    id: 'quiz-2',
    title: 'Heart Failure Management',
    specialty: 'Cardiology',
    description: 'Comprehensive assessment of heart failure diagnosis and management.',
    passingScore: 70,
    cmeCredits: 1.5,
    estimatedTime: 20,
    difficulty: 'Advanced',
    // No isFinalExam flag - this is a regular practice quiz
    questions: [
      {
        id: 'q1',
        question: 'What is the target ejection fraction threshold for HFrEF diagnosis?',
        options: [
          '< 35%',
          '< 40%',
          '< 45%',
          '< 50%'
        ],
        correctAnswer: 1,
        explanation: 'Heart failure with reduced ejection fraction (HFrEF) is defined as EF < 40%.',
        category: 'Diagnosis'
      },
      {
        id: 'q2',
        question: 'Which diuretic combination provides synergistic effect in diuretic resistance?',
        options: [
          'Furosemide + Torsemide',
          'Furosemide + Metolazone',
          'HCTZ + Chlorthalidone',
          'Spironolactone + Amiloride'
        ],
        correctAnswer: 1,
        explanation: 'Sequential nephron blockade with loop + thiazide-type diuretic (metolazone) provides synergistic diuresis.',
        category: 'Treatment'
      }
    ]
  }
];

export const sampleDashboardStats: DashboardStats = {
  totalCheatSheets: sampleCheatSheets.length,
  completedQuizzes: 3,
  availableTests: 2,
  availablePatientSimulators: 3,
  earnedCredits: 0,
  totalAvailableCredits: 45.0,
  recentActivity: [
    {
      id: '1',
      type: 'simulator_completed',
      title: 'Advanced Cardiac Life Support Simulator',
      date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      details: 'Completed successfully - 92% score'
    },
    {
      id: '2',
      type: 'cheat_sheet_viewed',
      title: 'Acute Coronary Syndrome',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
    },
    {
      id: '3',
      type: 'quiz_completed',
      title: 'Emergency Medicine Practice Test',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      details: 'Score: 85% (17/20 correct)'
    },
    {
      id: '4',
      type: 'certificate_downloaded',
      title: 'CME Certificate - Critical Care Module',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      details: '15 CME credits earned'
    },
    {
      id: '5',
      type: 'cheat_sheet_viewed',
      title: 'DKA Management Protocol',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
    },
    {
      id: '6',
      type: 'simulator_completed',
      title: 'Sepsis Management Scenario',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      details: 'Excellent performance - 96% score'
    }
  ]
};

export const sampleCertificates: Certificate[] = [
  {
    id: 'cert-1',
    userId: '1',
    quizId: 'quiz-1',
    quizTitle: 'Hyponatremia Management Certification',
    cmeCredits: 1.0,
    generatedAt: '2024-01-15T14:35:00Z',
    downloadCount: 2
  },
  {
    id: 'cert-2',
    userId: '1',
    quizId: 'quiz-2',
    quizTitle: 'Heart Failure Management',
    cmeCredits: 1.5,
    generatedAt: '2024-01-10T10:20:00Z',
    downloadCount: 1
  }
];

// Fallback specialties data (the real data comes from the API)
export const specialties: string[] = [
  'Cardiology',
  'Nephrology',
  'Infectious Disease',
  'Pulmonology',
  'Gastroenterology',
  'Endocrinology',
  'Neurology',
  'Hematology Oncology',
  'Rheumatology',
  'Dermatology',
  'Orthopedics',
  'Psychiatry',
  'General Hospital Medicine',
  'Emergency Medicine'
];
