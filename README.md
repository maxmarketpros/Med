# Medical Cheat Sheets Dashboard

A comprehensive medical reference dashboard built with Next.js, featuring interactive PDF cheat sheets organized by specialty and CME (Continuing Medical Education) functionality.

## Features

- 📚 Extensive collection of medical cheat sheets organized by specialty
- 🔍 Smart search and filtering capabilities
- 📱 Responsive design that works on all devices
- 📖 Interactive PDF viewer with zoom and navigation controls
- 🏷️ Tag-based organization and discovery
- 🎯 CME quizzes and practice tests
- 📊 Dashboard with progress tracking
- ⚡ Fast, modern interface built with Next.js 14

## Specialties Included

- **Cardiology** - Arrhythmias, heart failure, acute coronary syndromes, and more
- **Nephrology** - Electrolyte disorders, AKI, hyponatremia, and kidney diseases  
- **Pulmonology** - Respiratory failure, COPD, asthma, pulmonary embolism
- **Gastroenterology** - GI bleeding, pancreatitis, hepatitis, and liver disease
- **Neurology** - Stroke, seizures, delirium, and neurological emergencies
- **Infectious Disease** - Pneumonia, bacteremia, meningitis, and hospital infections
- **Endocrinology** - DKA, thyroid emergencies, adrenal crises
- **Hematology/Oncology** - Anemia, coagulopathy, oncologic emergencies
- **And many more...** - Including psychiatry, rheumatology, orthopedics, and dermatology

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Netlify account (for deployment)

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd med-cheat-sheets
```

2. Install dependencies:
```bash
npm install
```

3. Then Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Netlify

This application is configured for deployment to Netlify. Follow these steps:

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

### Manual Build

To build the project manually:

```bash
# Install dependencies
npm install

# Copy PDFs to public directory and build
npm run build

# Start production server (for local testing)
npm start
```

## Project Structure

```
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── dashboard/       # Main dashboard pages
│   │   ├── api/            # API routes for PDF serving
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   │   ├── cheat-sheets/   # PDF viewer and card components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── ui/            # Base UI components
│   ├── lib/               # Utility functions and PDF scanner
│   └── types/             # TypeScript type definitions
├── cheat-sheets/          # PDF files organized by specialty
├── public/               # Static assets (PDFs copied here during build)
├── netlify.toml          # Netlify deployment configuration
└── package.json          # Dependencies and scripts
```

## Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **PDF Handling:** Browser native PDF viewer
- **Search:** Fuse.js for fuzzy search
- **Icons:** Heroicons
- **Deployment:** Netlify with Netlify Functions

## Features in Detail

### PDF Viewer
- Browser native PDF viewing
- Native zoom controls and page navigation
- Download and print functionality via browser

### Search and Filtering
- Real-time search across titles, specialties, and tags
- Filter by specialty
- Fuzzy search with Fuse.js

### Responsive Design
- Mobile-first design approach
- Touch-friendly interface
- Optimized for tablets and mobile devices

## Adding New Cheat Sheets

To add new cheat sheets:

1. Place PDF files in the appropriate specialty folder under `public/cheat-sheets/`
2. Update `src/lib/pdfScanner.ts` to include the new files in the `staticCheatSheets` array
3. Follow the existing naming conventions
4. Redeploy to Netlify

### Troubleshooting

- **PDFs not loading**: Ensure files are in `public/cheat-sheets/` and paths match in `pdfScanner.ts`
- **Build failures**: Check Node.js version is 18+
- **Function errors**: API routes are configured as Netlify Functions via `netlify.toml`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue in the GitHub repository.
