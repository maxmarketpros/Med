# Med Cheat Sheets Dashboard

A comprehensive medical reference dashboard built with Next.js, featuring interactive PDF cheat sheets organized by specialty.

## Features

- 📚 Extensive collection of medical cheat sheets organized by specialty
- 🔍 Smart search and filtering capabilities
- 📱 Responsive design that works on all devices
- 📖 Interactive PDF viewer with zoom and navigation controls
- 🏷️ Tag-based organization and discovery
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

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd med-cheat-sheets
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Netlify

This application is configured for easy deployment to Netlify:

1. **Connect your repository to Netlify:**
   - Go to [Netlify](https://netlify.com) and sign in
   - Click "New site from Git"
   - Connect your GitHub repository
   - Netlify will automatically detect the build settings from `netlify.toml`

2. **Build settings are configured automatically:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - The build process will copy PDF files to the public directory

3. **Environment variables (if needed):**
   - No additional environment variables are required for basic functionality

4. **Deploy:**
   - Push to your main branch to trigger automatic deployment
   - Or manually deploy from the Netlify dashboard

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Adding New Cheat Sheets

To add new cheat sheets:

1. Place PDF files in the appropriate specialty folder under `cheat-sheets/`
2. Follow the existing naming conventions
3. The application will automatically scan and include new PDFs

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue in the GitHub repository. 