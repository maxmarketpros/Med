# Med Cheat Sheets Dashboard

A modern, professional medical education platform built with Next.js 14 and TailwindCSS, designed specifically for new clinicians (PAs, NPs, RNs, MDs) entering hospital medicine.

## 🏥 About

Med Cheat Sheets is a comprehensive web-based platform that supports healthcare professionals with:

- **Searchable Medical References**: Curated cheat sheets organized by specialty
- **AAPA-Accredited CME Quizzes**: Interactive assessments for continuing education credits
- **Certificate Generation**: Automated PDF certificates upon quiz completion
- **Progress Tracking**: Personal dashboard with learning analytics

## 🚀 Features

### Core Functionality
- ✅ **Responsive Dashboard** with medical-themed design
- ✅ **Cheat Sheets Library** with fuzzy search and specialty filtering
- ✅ **Interactive CME Quizzes** with real-time scoring
- ✅ **Certificate Management** with download tracking
- ✅ **User Profiles** with progress analytics
- ✅ **Dark Mode Support** (configurable)

### Technical Features
- 🔒 **Route Protection** with mock authentication
- 🎨 **Modern UI** with TailwindCSS and custom components
- 📱 **Mobile Responsive** design throughout
- ⚡ **Fast Search** using Fuse.js fuzzy matching
- 🎯 **TypeScript** for type safety
- 🏗️ **Component Architecture** with reusable UI elements

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS with custom medical theme
- **TypeScript**: Full type safety
- **Components**: Custom UI library with Headless UI
- **Search**: Fuse.js for fuzzy matching
- **PDF Generation**: jsPDF for certificates
- **Icons**: Heroicons
- **State Management**: React hooks

## 📂 Project Structure

```
Med Cheat Sheets/
├── src/
│   ├── app/                    # Next.js 14 App Router pages
│   │   ├── dashboard/         # Protected dashboard routes
│   │   │   ├── cheat-sheets/  # Medical reference library
│   │   │   ├── cme/          # CME quiz system
│   │   │   └── profile/      # User management
│   │   ├── globals.css       # Global styles
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable components
│   │   ├── ui/              # Base UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── cheat-sheets/    # Medical reference components
│   │   └── cme/            # Quiz and education components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── data/               # Sample data and mock content
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── tailwind.config.js     # TailwindCSS configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (`emerald-500`) - Medical trust and reliability
- **Secondary**: Sky Blue (`sky-400`) - Clean, professional feel
- **Accent**: Violet (`violet-400`) - Certificates and achievements
- **Background**: Soft gradient (lavender to pale blue)

### Components
- **Cards**: White backgrounds with subtle shadows
- **Typography**: Inter font family for readability
- **Buttons**: Multiple variants with consistent styling
- **Navigation**: Fixed sidebar with active state indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd med-cheat-sheets
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📚 Usage

### For Developers

#### Adding New Cheat Sheets
```typescript
// src/data/sampleData.ts
export const sampleCheatSheets: CheatSheet[] = [
  {
    id: 'unique-id',
    title: 'New Medical Topic',
    slug: 'new-medical-topic',
    specialty: 'Cardiology',
    tags: ['tag1', 'tag2'],
    description: 'Brief description',
    content: 'Detailed medical content...',
    // ... other properties
  }
];
```

#### Creating New Quiz Questions
```typescript
// src/data/sampleData.ts
const newQuiz: Quiz = {
  id: 'quiz-id',
  title: 'Quiz Title',
  questions: [
    {
      id: 'q1',
      question: 'Clinical question?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Detailed explanation...',
      category: 'Topic Area'
    }
  ],
  // ... other properties
};
```

#### Customizing Themes
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Custom color palette
        }
      }
    }
  }
};
```

### For Content Creators

1. **Medical Content**: Add new cheat sheets in `src/data/sampleData.ts`
2. **Quiz Questions**: Create evidence-based questions with explanations
3. **Specialties**: Add new medical specialties to the filter system
4. **Difficulty Levels**: Assign appropriate difficulty ratings

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for production settings:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=your-database-connection
```

### Authentication Integration
Replace the mock `useUser` hook with your authentication provider:
```typescript
// src/hooks/useUser.ts
// Replace mock implementation with real auth provider
// (Memberstack, Auth0, Firebase Auth, etc.)
```

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key mobile optimizations:
- Collapsible sidebar navigation
- Touch-friendly quiz interface
- Optimized card layouts
- Readable typography scaling

## 🧪 Testing

### Component Testing
```bash
# Add testing framework
npm install --save-dev @testing-library/react jest
```

### Manual Testing Checklist
- [ ] Navigation between all pages
- [ ] Search and filter functionality
- [ ] Quiz completion flow
- [ ] Mobile responsiveness
- [ ] Certificate generation

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- **Netlify**: Connect repository and deploy
- **AWS**: Use AWS Amplify for easy deployment
- **Docker**: Containerize with the included Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/medical-specialty`)
3. Commit changes (`git commit -m 'Add new cardiology content'`)
4. Push to branch (`git push origin feature/medical-specialty`)
5. Open a Pull Request

### Content Guidelines
- Medical accuracy is paramount
- Include proper citations for clinical guidelines
- Use evidence-based information only
- Follow accessibility standards

## 📋 Roadmap

### Phase 1 (Current)
- [x] Core dashboard functionality
- [x] Cheat sheets library
- [x] CME quiz system
- [x] Basic certificate generation

### Phase 2 (Future)
- [ ] Real authentication integration
- [ ] Database connectivity
- [ ] Advanced analytics
- [ ] Offline capability
- [ ] Mobile app version

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Advanced search with NLP
- [ ] Collaborative features
- [ ] Integration with EMR systems

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check this README and inline code comments
- **Issues**: Open a GitHub issue
- **Medical Content**: Consult with medical professionals for accuracy

## ⚡ Performance

### Optimization Features
- Next.js automatic code splitting
- Image optimization with Next.js Image component
- Lazy loading for large components
- Efficient search with debounced input
- Minimal JavaScript bundle size

### Performance Metrics
- Lighthouse Score: 95+ (aim)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Core Web Vitals: All green

---

Built with ❤️ for healthcare professionals by developers who care about medical education. 