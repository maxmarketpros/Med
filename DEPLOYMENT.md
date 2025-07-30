# Netlify Deployment Guide

## Quick Deploy Steps

### 1. Prepare Your PDF Files
Before deploying, add your PDF files to the correct directories:

```bash
# Copy your PDF files to these directories:
public/cheat-sheets/Cardiology/
public/cheat-sheets/Endocrinology/
public/cheat-sheets/Gastroenterology/
public/cheat-sheets/Nephrology/
public/cheat-sheets/Infectious disease/
public/cheat-sheets/Neurology/
public/cheat-sheets/Pulmonology_crit care/
```

### 2. Update the PDF List
Edit `src/lib/pdfScanner.ts` and add your PDFs to the `staticCheatSheets` array:

```typescript
{
  id: 'your-pdf-specialty',
  title: 'Your PDF Title',
  slug: 'your-pdf-slug',
  specialty: 'Specialty Name',
  fileName: 'YourFile.pdf',
  filePath: '/cheat-sheets/Specialty Name/YourFile.pdf',
  description: 'Description of the PDF',
  tags: ['specialty', 'relevant', 'tags'],
  lastUpdated: '2024-01-15T00:00:00Z',
  difficulty: 'Intermediate',
  estimatedReadTime: 5,
  downloadCount: 0,
  fileSize: '500 KB',
}
```

### 3. Deploy to Netlify

#### Option A: Direct Upload (Fastest)
1. Run: `npm install && npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `.next` folder to the deploy area
4. Your site will be live!

#### Option B: Git Integration (Recommended)
1. Push your code to GitHub/GitLab
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Select your repository
4. Build settings (auto-detected from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+
5. Click "Deploy site"

### 4. Custom Domain (Optional)
1. In Netlify dashboard → Domain settings
2. Add your custom domain
3. Configure DNS records as shown

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18+
- Check all dependencies are in package.json
- Verify no syntax errors with `npm run lint`

### PDFs Not Loading
- Check file paths in `pdfScanner.ts` match actual file locations
- Ensure files are in `public/cheat-sheets/` directory
- Verify filenames don't have special characters

### Slow Loading
- Consider optimizing PDF file sizes
- Use proper image formats for non-PDF assets
- Check Netlify analytics for performance insights

## Production Considerations

### Performance
- PDF files are cached for 24 hours
- Static assets are cached for 1 year
- Netlify CDN provides global fast access

### Security
- All API routes work as Netlify Functions
- CORS headers are properly configured
- File access is restricted to PDF files only

### Monitoring
- Use Netlify Analytics for traffic insights
- Set up error notifications in Netlify dashboard
- Monitor build logs for any issues

## Next Steps After Deployment

1. **Test all functionality**: Browse cheat sheets, test PDF viewing
2. **Add real content**: Replace sample PDFs with your actual files
3. **Customize branding**: Update colors, logos, and text
4. **Set up monitoring**: Enable Netlify notifications
5. **Configure analytics**: Add Google Analytics if needed 