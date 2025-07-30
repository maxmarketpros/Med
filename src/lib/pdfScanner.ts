import { CheatSheet } from '@/types';
import fs from 'fs';
import path from 'path';

const CHEAT_SHEETS_DIR = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'public', 'cheat-sheets')
  : path.join(process.cwd(), 'cheat-sheets');

export interface PDFFile {
  fileName: string;
  filePath: string;
  specialty: string;
  title: string;
  slug: string;
}

// Function to generate a slug from filename
function generateSlug(filename: string): string {
  return filename
    .replace('.pdf', '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to estimate reading time based on file size
function estimateReadingTime(fileSizeKB: number): number {
  // Rough estimate: 1 page = ~50KB, 2 minutes per page
  const estimatedPages = Math.max(1, Math.round(fileSizeKB / 50));
  return Math.max(2, estimatedPages * 2);
}

// Function to format file size
function formatFileSize(sizeInBytes: number): string {
  const sizeInKB = sizeInBytes / 1024;
  if (sizeInKB < 1024) {
    return `${Math.round(sizeInKB)} KB`;
  }
  const sizeInMB = sizeInKB / 1024;
  return `${sizeInMB.toFixed(1)} MB`;
}

// Function to extract tags from filename
function extractTags(filename: string, specialty: string): string[] {
  const title = filename.replace('.pdf', '').toLowerCase();
  const tags = [specialty.toLowerCase()];
  
  // Add common medical terms as tags
  const medicalTerms = [
    'emergency', 'acute', 'chronic', 'syndrome', 'disease', 'disorder',
    'management', 'treatment', 'diagnosis', 'care', 'therapy', 'medication',
    'arrhythmia', 'heart', 'kidney', 'failure', 'injury'
  ];
  
  medicalTerms.forEach(term => {
    if (title.includes(term)) {
      tags.push(term);
    }
  });
  
  return Array.from(new Set(tags)); // Remove duplicates
}

// Server-side function to scan PDF files
export async function scanPDFFiles(): Promise<CheatSheet[]> {
  const cheatSheets: CheatSheet[] = [];
  
  try {
    if (!fs.existsSync(CHEAT_SHEETS_DIR)) {
      console.warn('Cheat sheets directory not found');
      return [];
    }

    const specialtyFolders = fs.readdirSync(CHEAT_SHEETS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const specialty of specialtyFolders) {
      const specialtyPath = path.join(CHEAT_SHEETS_DIR, specialty);
      const files = fs.readdirSync(specialtyPath);
      
      const pdfFiles = files.filter(file => 
        file.endsWith('.pdf') && !file.includes('.pdf:Zone.Identifier')
      );

      for (const fileName of pdfFiles) {
        const filePath = path.join(specialtyPath, fileName);
        const stats = fs.statSync(filePath);
        const title = fileName.replace('.pdf', '').replace(/_/g, ' ');
        
        const cheatSheet: CheatSheet = {
          id: generateSlug(fileName) + '-' + specialty.toLowerCase().replace(/\s+/g, '-'),
          title: title,
          slug: generateSlug(fileName),
          specialty: specialty,
          fileName: fileName,
          filePath: `/cheat-sheets/${specialty}/${fileName}`,
          description: `Clinical reference guide for ${title.toLowerCase()}`,
          tags: extractTags(fileName, specialty),
          lastUpdated: stats.mtime.toISOString(),
          difficulty: 'Intermediate' as const,
          estimatedReadTime: estimateReadingTime(stats.size / 1024),
          downloadCount: Math.floor(Math.random() * 200) + 50, // Mock download count
          fileSize: formatFileSize(stats.size),
        };
        
        cheatSheets.push(cheatSheet);
      }
    }
  } catch (error) {
    console.error('Error scanning PDF files:', error);
  }
  
  return cheatSheets.sort((a, b) => a.title.localeCompare(b.title));
}

// Client-side mock data (since we can't access filesystem on client)
export const mockPDFCheatSheets: CheatSheet[] = [
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
  // Nephrology
  {
    id: 'hyponatremia-nephrology',
    title: 'hyponatremia',
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
    fileName: 'Acute Kidney Injury .pdf',
    filePath: '/cheat-sheets/Nephrology/Acute Kidney Injury .pdf',
    description: 'Clinical reference guide for acute kidney injury',
    tags: ['nephrology', 'acute', 'kidney', 'injury'],
    lastUpdated: '2024-01-08T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 5,
    downloadCount: 145,
    fileSize: '36 KB',
  },
  {
    id: 'electrolyte-disturbances-nephrology',
    title: 'Electrolyte disturbances',
    slug: 'electrolyte-disturbances',
    specialty: 'Nephrology',
    fileName: 'Electrolyte disturbances.pdf',
    filePath: '/api/pdf/Nephrology/Electrolyte%20disturbances.pdf',
    description: 'Clinical reference guide for electrolyte disturbances',
    tags: ['nephrology'],
    lastUpdated: '2024-01-05T00:00:00Z',
    difficulty: 'Intermediate',
    estimatedReadTime: 8,
    downloadCount: 178,
    fileSize: '69 KB',
  },
];

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
