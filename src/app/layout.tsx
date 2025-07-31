import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Med Cheat Sheets - Professional Medical Education Platform',
  description: 'Access comprehensive medical cheat sheets, CME courses, and patient simulators designed for hospital medicine practitioners. Earn AAPA Category 1 CME credits.',
  keywords: ['medical education', 'hospital medicine', 'cheat sheets', 'CME', 'AAPA credits', 'medical training'],
  authors: [{ name: 'Med Cheat Sheets' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen medical-gradient">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
} 