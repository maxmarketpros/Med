#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Testing build for Netlify deployment...\n');

// Check if Node version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.substring(1).split('.')[0]);

console.log(`📋 Node version: ${nodeVersion}`);
if (majorVersion < 18) {
  console.error('❌ Error: Node.js 18+ is required for Netlify deployment');
  process.exit(1);
}
console.log('✅ Node version compatible\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found');
  process.exit(1);
}
console.log('✅ package.json found');

// Check if public/cheat-sheets directory exists
const cheatSheetsDir = path.join('public', 'cheat-sheets');
if (!fs.existsSync(cheatSheetsDir)) {
  console.log('⚠️  Warning: public/cheat-sheets directory not found');
  console.log('   You may want to add your PDF files there');
} else {
  console.log('✅ public/cheat-sheets directory found');
  
  // Count PDF files
  let pdfCount = 0;
  const specialties = fs.readdirSync(cheatSheetsDir);
  specialties.forEach(specialty => {
    const specialtyPath = path.join(cheatSheetsDir, specialty);
    if (fs.statSync(specialtyPath).isDirectory()) {
      const files = fs.readdirSync(specialtyPath).filter(f => f.endsWith('.pdf'));
      pdfCount += files.length;
    }
  });
  console.log(`📄 Found ${pdfCount} PDF files`);
}

// Check essential files
const essentialFiles = [
  'netlify.toml',
  'next.config.js',
  'src/lib/pdfScanner.ts',
  'src/app/api/cheat-sheets/route.ts'
];

essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} found`);
  } else {
    console.error(`❌ Error: ${file} not found`);
    process.exit(1);
  }
});

console.log('\n🔧 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('\n🏗️  Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if .next directory was created
if (fs.existsSync('.next')) {
  console.log('✅ .next directory created');
  
  // Check build size
  const buildStats = fs.statSync('.next');
  console.log(`📦 Build directory created at: ${buildStats.birthtime}`);
} else {
  console.error('❌ Error: .next directory not found after build');
  process.exit(1);
}

console.log('\n🎉 Build test completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Add your PDF files to public/cheat-sheets/');
console.log('2. Update src/lib/pdfScanner.ts with your PDF list');
console.log('3. Deploy to Netlify by:');
console.log('   - Dragging the .next folder to netlify.com, or');
console.log('   - Connecting your Git repository to Netlify');
console.log('\n🔗 See DEPLOYMENT.md for detailed instructions'); 