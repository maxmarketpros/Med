import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Medical acronyms that should remain uppercase (based on the PDF collection)
const MEDICAL_ACRONYMS = new Set([
  'CHF', 'DKA', 'SJS', 'TEN', 'HLH', 'MGUS', 'MM', 'CAP', 'HCV', 'HIV', 
  'SSTIs', 'UTIs', 'AKI', 'RTA', 'CSF', 'CVA', 'COPD', 'ILD', 'HTN', 
  'ICDs', 'CRT-Ds', 'PAD', 'ALI', 'ABG', 'SBO', 'GIB', 'ACS', 'EKG', 
  'ECG', 'CXR', 'CT', 'MRI', 'ICU', 'ED', 'ER', 'IV', 'PO', 'IM', 'SC',
  'BUN', 'GFR', 'WBC', 'RBC', 'CBC', 'BMP', 'CMP', 'PT', 'PTT', 'INR',
  'TSH', 'T3', 'T4', 'LFTs', 'AST', 'ALT', 'BNP', 'CK', 'MB', 'MI',
  'PE', 'DVT', 'VTE', 'PICC', 'NG', 'PEG', 'CABG', 'PCI', 'STEMI',
  'NSTEMI', 'UA', 'SVT', 'VT', 'VF', 'A-fib', 'A-flutter'
]);

export function toTitleCase(text: string): string {
  return text
    .split(/[\s\-_]+/)
    .map(word => {
      // Check if the word (uppercase) is a medical acronym
      if (MEDICAL_ACRONYMS.has(word.toUpperCase())) {
        return word.toUpperCase();
      }
      // Regular title case for other words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  
  return formatDateShort(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function generateCertificateId(): string {
  return `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
} 