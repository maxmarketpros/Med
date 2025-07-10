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
  earnedCredits: number;
  totalAvailableCredits: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'quiz_completed' | 'cheat_sheet_viewed' | 'certificate_downloaded';
  title: string;
  date: string;
  details?: string;
}
