import { CheatSheet } from '@/types';

// Static data for cheat sheets (for Netlify deployment)
const staticCheatSheets: CheatSheet[] = [
  // Cardiology
  {
    id: 'atrial-fibrillation-cardiology',
    title: 'Atrial fibrillation',
    slug: 'atrial-fibrillation',
    specialty: 'Cardiology',
    fileName: 'Atrial fibrillation.pdf',
    filePath: '/cheat-sheets/Cardiology/Atrial fibrillation.pdf',
    description: 'Clinical reference guide for atrial fibrillation management',
    tags: ['cardiology', 'arrhythmia'],
    lastUpdated: '2024-01-15T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 8,
    downloadCount: 156,
    fileSize: '60 KB',
  },
  {
    id: 'chf-cardiology',
    title: 'CHF',
    slug: 'chf',
    specialty: 'Cardiology',
    fileName: 'CHF.pdf',
    filePath: '/cheat-sheets/Cardiology/CHF.pdf',
    description: 'Clinical reference guide for congestive heart failure',
    tags: ['cardiology', 'heart', 'failure'],
    lastUpdated: '2024-01-12T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 6,
    downloadCount: 189,
    fileSize: '57 KB',
  },
  {
    id: 'acute-coronary-syndrome-cardiology',
    title: 'Acute coronary syndrome',
    slug: 'acute-coronary-syndrome',
    specialty: 'Cardiology',
    fileName: 'Acute coronary syndrome.pdf',
    filePath: '/cheat-sheets/Cardiology/Acute coronary syndrome.pdf',
    description: 'Clinical reference guide for acute coronary syndrome',
    tags: ['cardiology', 'acute', 'syndrome'],
    lastUpdated: '2024-01-10T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 10,
    downloadCount: 201,
    fileSize: '97 KB',
  },
  {
    id: 'pericarditis-myocarditis-cardiology',
    title: 'Pericarditis myocarditis',
    slug: 'pericarditis-myocarditis',
    specialty: 'Cardiology',
    fileName: 'Pericarditis_myocarditis.pdf',
    filePath: '/cheat-sheets/Cardiology/Pericarditis_myocarditis.pdf',
    description: 'Clinical reference guide for pericarditis and myocarditis',
    tags: ['cardiology', 'pericarditis', 'myocarditis'],
    lastUpdated: '2024-01-14T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 9,
    downloadCount: 134,
    fileSize: '65 KB',
  },
  {
    id: 'bradycardia-cardiology',
    title: 'Bradycardia',
    slug: 'bradycardia',
    specialty: 'Cardiology',
    fileName: 'Bradycardia.pdf',
    filePath: '/cheat-sheets/Cardiology/Bradycardia.pdf',
    description: 'Clinical reference guide for bradycardia management',
    tags: ['cardiology', 'bradycardia', 'arrhythmia'],
    lastUpdated: '2024-01-13T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 7,
    downloadCount: 167,
    fileSize: '74 KB',
  },
  {
    id: 'cardiomyopathies-cardiology',
    title: 'Cardiomyopathies',
    slug: 'cardiomyopathies',
    specialty: 'Cardiology',
    fileName: 'cardiomyopathies.pdf',
    filePath: '/cheat-sheets/Cardiology/cardiomyopathies.pdf',
    description: 'Clinical reference guide for cardiomyopathies',
    tags: ['cardiology', 'cardiomyopathy'],
    lastUpdated: '2024-01-11T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 12,
    downloadCount: 145,
    fileSize: '183 KB',
  },
  // Nephrology
  {
    id: 'hyponatremia-nephrology',
    title: 'Hyponatremia',
    slug: 'hyponatremia',
    specialty: 'Nephrology',
    fileName: 'hyponatremia.pdf',
    filePath: '/cheat-sheets/Nephrology/hyponatremia.pdf',
    description: 'Clinical reference guide for hyponatremia management',
    tags: ['nephrology'],
    lastUpdated: '2024-01-10T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 7,
    downloadCount: 234,
    fileSize: '44 KB',
  },
  {
    id: 'acute-kidney-injury-nephrology',
    title: 'Acute Kidney Injury',
    slug: 'acute-kidney-injury',
    specialty: 'Nephrology',
    fileName: 'Acute Kidney Injury.pdf',
    filePath: '/cheat-sheets/Nephrology/Acute Kidney Injury.pdf',
    description: 'Clinical reference guide for acute kidney injury',
    tags: ['nephrology', 'acute', 'kidney', 'injury'],
    lastUpdated: '2024-01-08T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 5,
    downloadCount: 145,
    fileSize: '36 KB',
  },
  // Endocrinology
  {
    id: 'dka-endocrinology',
    title: 'DKA',
    slug: 'dka',
    specialty: 'Endocrinology',
    fileName: 'DKA.pdf',
    filePath: '/cheat-sheets/Endocrinology/DKA.pdf',
    description: 'Clinical reference guide for diabetic ketoacidosis',
    tags: ['endocrinology', 'diabetes'],
    lastUpdated: '2024-01-05T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 6,
    downloadCount: 167,
    fileSize: '52 KB',
  },
  {
    id: 'thyroid-emergencies-endocrinology',
    title: 'Thyroid emergencies',
    slug: 'thyroid-emergencies',
    specialty: 'Endocrinology',
    fileName: 'Thyroid emergencies.pdf',
    filePath: '/cheat-sheets/Endocrinology/Thyroid emergencies.pdf',
    description: 'Clinical reference guide for thyroid emergencies',
    tags: ['endocrinology', 'emergency'],
    lastUpdated: '2024-01-03T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 8,
    downloadCount: 134,
    fileSize: '67 KB',
  },
  // Gastroenterology
  {
    id: 'gib-gastroenterology',
    title: 'GIB',
    slug: 'gib',
    specialty: 'Gastroenterology',
    fileName: 'GIB.pdf',
    filePath: '/cheat-sheets/Gastroenterology/GIB.pdf',
    description: 'Clinical reference guide for gastrointestinal bleeding',
    tags: ['gastroenterology'],
    lastUpdated: '2024-01-02T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 7,
    downloadCount: 198,
    fileSize: '58 KB',
  },
  {
    id: 'acute-pancreatitis-gastroenterology',
    title: 'Acute pancreatitis',
    slug: 'acute-pancreatitis',
    specialty: 'Gastroenterology',
    fileName: 'Acute pancreatitis.pdf',
    filePath: '/cheat-sheets/Gastroenterology/Acute pancreatitis.pdf',
    description: 'Clinical reference guide for acute pancreatitis',
    tags: ['gastroenterology', 'acute'],
    lastUpdated: '2024-01-01T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 6,
    downloadCount: 143,
    fileSize: '49 KB',
  },
  // Pulmonology/Critical Care
  {
    id: 'asthma-exacerbations-pulmonology',
    title: 'Asthma exacerbations',
    slug: 'asthma-exacerbations',
    specialty: 'Pulmonology_crit care',
    fileName: 'Asthma exacercations.pdf',
    filePath: '/cheat-sheets/Pulmonology_crit care/Asthma exacercations.pdf',
    description: 'Clinical reference guide for asthma exacerbations',
    tags: ['pulmonology'],
    lastUpdated: '2023-12-30T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 5,
    downloadCount: 176,
    fileSize: '41 KB',
  },
  // Infectious Disease
  {
    id: 'cap-infectious-disease',
    title: 'CAP',
    slug: 'cap',
    specialty: 'Infectious disease',
    fileName: 'CAP.pdf',
    filePath: '/cheat-sheets/Infectious disease/CAP.pdf',
    description: 'Clinical reference guide for community-acquired pneumonia',
    tags: ['infectious disease'],
    lastUpdated: '2023-12-28T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 6,
    downloadCount: 189,
    fileSize: '55 KB',
  },
  {
    id: 'meningitis-infectious-disease',
    title: 'Meningitis',
    slug: 'meningitis',
    specialty: 'Infectious disease',
    fileName: 'Meningitis.pdf',
    filePath: '/cheat-sheets/Infectious disease/Meningitis.pdf',
    description: 'Clinical reference guide for meningitis',
    tags: ['infectious disease', 'emergency'],
    lastUpdated: '2023-12-25T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 8,
    downloadCount: 145,
    fileSize: '63 KB',
  },
  // Neurology
  {
    id: 'seizures-neurology',
    title: 'Seizures',
    slug: 'seizures',
    specialty: 'Neurology',
    fileName: 'Seizures.pdf',
    filePath: '/cheat-sheets/Neurology/Seizures.pdf',
    description: 'Clinical reference guide for seizures',
    tags: ['neurology', 'emergency'],
    lastUpdated: '2023-12-20T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 7,
    downloadCount: 167,
    fileSize: '59 KB',
  },
  {
    id: 'ischemic-cva-neurology',
    title: 'Ischemic CVA',
    slug: 'ischemic-cva',
    specialty: 'Neurology',
    fileName: 'Ischemic CVA.pdf',
    filePath: '/cheat-sheets/Neurology/Ischemic CVA.pdf',
    description: 'Clinical reference guide for ischemic cerebrovascular accident',
    tags: ['neurology', 'emergency'],
    lastUpdated: '2023-12-18T00:00:00Z',
    difficulty: 'Advanced',
    estimatedReadTime: 9,
    downloadCount: 198,
    fileSize: '71 KB',
  },
];

// Function to generate a slug from filename
function generateSlug(filename: string): string {
  return filename
    .replace('.pdf', '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Detect if we're in a serverless environment
function isServerlessEnvironment(): boolean {
  return !!(
    process.env.NETLIFY || 
    process.env.VERCEL || 
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.FUNCTION_NAME
  );
}

// Server-side function to scan PDF files
export async function scanPDFFiles(): Promise<CheatSheet[]> {
  // In serverless environments, prioritize static data for reliability
  if (isServerlessEnvironment()) {
    console.log('Serverless environment detected, using static cheat sheets data');
    return staticCheatSheets.sort((a, b) => a.title.localeCompare(b.title));
  }

  try {
    const fs = require('fs');
    const path = require('path');
    
    const cheatSheetsDir = path.join(process.cwd(), 'cheat-sheets');
    const cheatSheets: CheatSheet[] = [];
    
    // Check if cheat-sheets directory exists
    if (!fs.existsSync(cheatSheetsDir)) {
      console.log('Cheat sheets directory not found, returning static data');
      return staticCheatSheets.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    // Read all specialty directories
    const specialtyDirs = fs.readdirSync(cheatSheetsDir, { withFileTypes: true })
      .filter((dirent: any) => dirent.isDirectory())
      .map((dirent: any) => dirent.name);
    
    for (const specialty of specialtyDirs) {
      const specialtyPath = path.join(cheatSheetsDir, specialty);
      
      // Read all PDF files in this specialty directory
      const files = fs.readdirSync(specialtyPath)
        .filter((file: string) => file.toLowerCase().endsWith('.pdf') && !file.includes('Zone.Identifier'));
      
      for (const fileName of files) {
        const filePath = path.join(specialtyPath, fileName);
        const stats = fs.statSync(filePath);
        const title = fileName.replace('.pdf', '');
        const slug = generateSlug(fileName);
        const id = `${slug}-${specialty.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        cheatSheets.push({
          id,
          title,
          slug,
          specialty,
          fileName,
          filePath: `/cheat-sheets/${specialty}/${fileName}`,
          description: `Clinical reference guide for ${title.toLowerCase()}`,
          tags: [specialty.toLowerCase().replace(/[^a-z0-9]/g, '-')],
          lastUpdated: stats.mtime.toISOString(),
          difficulty: 'Intermediate', // Default difficulty
          estimatedReadTime: Math.max(5, Math.min(15, Math.floor(stats.size / 10240))), // Estimate based on file size
          downloadCount: Math.floor(Math.random() * 300) + 50, // Random download count for demo
          fileSize: `${Math.round(stats.size / 1024)} KB`,
        });
      }
    }
    
    console.log(`Scanned ${cheatSheets.length} PDF files from ${specialtyDirs.length} specialties`);
    return cheatSheets.sort((a, b) => a.title.localeCompare(b.title));
    
  } catch (error) {
    console.error('Error scanning PDF files, returning static data:', error);
    return staticCheatSheets.sort((a, b) => a.title.localeCompare(b.title));
  }
}

// Export static cheat sheets for use in components
export const mockPDFCheatSheets = staticCheatSheets;

// Get list of specialties from the folders
export const specialties = [
  'All Specialties',
  'Cardiology',
  'Dermatology', 
  'Endocrinology',
  'Gastroenterology',
  'General Hospital medicine',
  'Hematology Oncology',
  'Infectious disease',
  'Miscelaneous',
  'Nephrology',
  'Neurology',
  'Orthopedics',
  'Psych and addiction',
  'Pulmonology_crit care',
  'Rheumatology'
];
