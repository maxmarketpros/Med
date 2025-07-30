export interface User {
  id: string;
  name: string;
  email: string;
  role: 'PA' | 'NP' | 'RN' | 'MD' | 'Other';
  membershipLevel: 'Basic' | 'Premium' | 'Enterprise';
  joinDate: string;
  completedCME: number;
  totalCMECredits: number;
}

export interface CheatSheet {
  id: string;
  title: string;
  slug: string;
  specialty: string;
  fileName: string;
  filePath: string;
  description: string;
  tags: string[];
  lastUpdated: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedReadTime: number;
  downloadCount: number;
  fileSize: string;
}

export interface Quiz {
  id: string;
  title: string;
  specialty: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  cmeCredits: number;
  estimatedTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isFinalExam?: boolean; // Flag to identify final exams that trigger evaluation flow
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  answers: number[];
  completedAt: string;
  passed: boolean;
  certificateGenerated: boolean;
}

export interface CMESurvey {
  id: string;
  quizAttemptId: string;
  userId: string;
  responses: {
    relevance: number;
    clarity: number;
    applicability: number;
    overallSatisfaction: number;
    additionalComments?: string;
  };
  completedAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  cmeCredits: number;
  generatedAt: string;
  downloadCount: number;
}

export interface DashboardStats {
  totalCheatSheets: number;
  completedQuizzes: number;
  availableTests: number;
  availablePatientSimulators: number;
  earnedCredits: number;
  totalAvailableCredits: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'quiz_completed' | 'cheat_sheet_viewed' | 'certificate_downloaded' | 'simulator_completed';
  title: string;
  date: string;
  details?: string;
}

export interface CMEEvaluation {
  id: string;
  quizAttemptId: string;
  userId: string;
  userName: string;
  userEmail: string;
  credentials: 'PA' | 'NP' | 'RN' | 'MD' | 'Other';
  programContent: number; // 1-5 rating
  relevancyToPractice: number; // 1-5 rating
  objectivesStated: number; // 1-5 rating
  objectivesMet: number; // 1-5 rating
  overallRating: number; // 1-5 rating
  practiceChange: 'Yes' | 'Maybe' | 'No';
  drugsProductsAwareness: 'Yes' | 'No';
  balancedViewPresented: 'Yes' | 'No';
  biasDetected: 'Yes' | 'No';
  brandMentions?: string;
  unlabeledUses: 'Yes' | 'No';
  relationshipsDisclosed: 'Yes' | 'No';
  programName: string;
  completedAt: string;
}

export interface PatientVitals {
  bloodPressure: string;
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  temperature: number;
  consciousness?: string;
  pain?: number;
}

export interface SimulatorStep {
  id: string;
  scenario: string;
  vitals?: PatientVitals;
  physicalExam?: string;
  labResults?: string;
  imaging?: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface Simulator {
  id: string;
  title: string;
  roomNumber: string;
  specialty: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number;
  learningObjectives: string[];
  steps: SimulatorStep[];
  cmeCredits?: number;
}

export interface SimulatorAttempt {
  id: string;
  simulatorId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  currentStep: number;
  answers: {
    stepId: string;
    selectedOption: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  completed: boolean;
  score?: number;
}
