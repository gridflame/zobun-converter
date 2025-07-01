#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building zobun converter for all platforms...\n');

// Clean dist directory
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  console.log('🧹 Cleaning dist directory...');
  fs.rmSync(distPath, { recursive: true, force: true });
}

try {
  // Build Next.js app
  console.log('📦 Building Next.js application...');
  execSync('npm run build:web', { stdio: 'inherit' });
  
  console.log('\n✅ Next.js build complete!');
  
  // Build Electron apps
  console.log('\n🔨 Building Electron applications...');
  
  console.log('Building for Windows...');
  execSync('npm run dist:win', { stdio: 'inherit' });
  
  console.log('Building for macOS...');
  execSync('npm run dist:mac', { stdio: 'inherit' });
  
  console.log('Building for Linux...');
  execSync('npm run dist:linux', { stdio: 'inherit' });
  
  console.log('\n🎉 All builds completed successfully!');
  
  // List built files
  if (fs.existsSync(distPath)) {
    console.log('\n📋 Built installers:');
    const files = fs.readdirSync(distPath);
    files.forEach(file => {
      const filePath = path.join(distPath, file);
      if (fs.statSync(filePath).isFile()) {
        const size = Math.round(fs.statSync(filePath).size / 1024 / 1024);
        console.log(`  • ${file} (${size}MB)`);
      }
    });
  }
  
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
} 