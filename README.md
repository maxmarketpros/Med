# Medical Cheat Sheets Dashboard

A Next.js application for viewing medical cheat sheets with CME (Continuing Medical Education) functionality.

## Features

- 📚 Medical cheat sheets organized by specialty
- 📖 PDF viewer with zoom and navigation
- 🎯 CME quizzes and practice tests
- 📊 Dashboard with progress tracking
- 🔍 Search and filter functionality
- 📱 Responsive design

## Deployment to Netlify

This application is configured for deployment to Netlify. Follow these steps:

### Prerequisites

1. A Netlify account
2. Node.js 18+ installed locally
3. Your PDF files ready to upload

### Setup Steps

1. **Prepare PDF Files**
   - Copy your PDF files to the `public/cheat-sheets/` directory
   - Organize them by specialty in subdirectories:
     - `public/cheat-sheets/Cardiology/`
     - `public/cheat-sheets/Endocrinology/`
     - `public/cheat-sheets/Gastroenterology/`
     - `public/cheat-sheets/Nephrology/`
     - `public/cheat-sheets/Infectious disease/`
     - `public/cheat-sheets/Neurology/`
     - `public/cheat-sheets/Pulmonology_crit care/`

2. **Deploy to Netlify**

   **Option A: Drag and Drop (Quick Deploy)**
   - Run `npm run build` locally
   - Drag the `.next` folder to Netlify's deploy area

   **Option B: Git Integration (Recommended)**
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository to Netlify
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
     - Node version: 18+

3. **Environment Configuration**
   - The `netlify.toml` file is already configured
   - No additional environment variables needed for basic functionality

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Project Structure

```
├── public/
│   ├── cheat-sheets/          # PDF files (organize by specialty)
│   └── ...
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API routes
│   │   └── dashboard/         # Dashboard pages
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript types
├── netlify.toml              # Netlify configuration
└── next.config.js            # Next.js configuration
```

### Adding New PDF Files

1. Add PDF files to the appropriate `public/cheat-sheets/[specialty]/` directory
2. Update `src/lib/pdfScanner.ts` to include the new files in the `staticCheatSheets` array
3. Redeploy to Netlify

### Troubleshooting

- **PDFs not loading**: Ensure files are in `public/cheat-sheets/` and paths match in `pdfScanner.ts`
- **Build failures**: Check Node.js version is 18+
- **Function errors**: API routes are configured as Netlify Functions via `netlify.toml`

### Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- React PDF
- PDF.js
- Headless UI 