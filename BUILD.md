# Building Zobun Converter

This guide explains how to build Zobun Converter for all platforms.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

For cross-platform building, you may need additional tools:
- **Windows**: No additional requirements
- **macOS**: Xcode Command Line Tools
- **Linux**: No additional requirements

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd converter
```

2. Install dependencies:
```bash
npm install
```

## Development

### Web Development
```bash
npm run dev
```
Starts the Next.js development server at http://localhost:3000

### Electron Development
```bash
npm run electron-dev
```
Starts the Electron app in development mode

## Building

### Build Everything
```bash
npm run build:all
```
This will build the Next.js app and create installers for all platforms.

### Build Individual Platforms

#### Windows (.exe)
```bash
npm run dist:win
```

#### macOS (.dmg)
```bash
npm run dist:mac
```

#### Linux (.AppImage)
```bash
npm run dist:linux
```

### Build Web Only
```bash
npm run build:web
```

## Output

Built installers will be placed in the `dist/` directory:
- `Zobun Converter Setup X.X.X.exe` (Windows)
- `Zobun Converter-X.X.X.dmg` (macOS)  
- `Zobun Converter-X.X.X.AppImage` (Linux)

## Deployment

### Web Deployment
The website can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- Railway
- Self-hosted

### Desktop App Distribution
1. Build the installers using `npm run build:all`
2. Upload the installers to your web server
3. The download API endpoints will serve them automatically

## API Endpoints

The website includes API endpoints to serve the built installers:
- `/api/download/windows` - Serves the Windows .exe installer
- `/api/download/macos` - Serves the macOS .dmg installer  
- `/api/download/linux` - Serves the Linux .AppImage installer

## Configuration

### Electron Builder
The electron-builder configuration is in `package.json` under the `build` section. Key settings:

- **App ID**: `com.zobun.converter`
- **Product Name**: `Zobun Converter`
- **Icon**: `public/zobun.png`
- **Output Directory**: `dist/`

### Supported Formats
The desktop app supports:
- **Audio**: MP3, M4A, WAV, OGG, FLAC
- **Video**: MP4, WebM, MKV, AVI, MOV
- **Quality**: Up to 4K video, 320kbps audio

## Troubleshooting

### Build Issues

1. **Missing dependencies**: Run `npm install` again
2. **Permission errors**: On macOS/Linux, you may need to run with `sudo`
3. **Disk space**: Ensure you have at least 2GB free space
4. **Node version**: Use Node.js 18 or later

### Platform-specific Issues

#### Windows
- Windows Defender may flag the installer - this is normal for unsigned executables
- Users should click "More info" → "Run anyway"

#### macOS  
- Apps may be blocked by Gatekeeper (unsigned apps)
- Users need to go to System Preferences → Security → Allow the app

#### Linux
- AppImage files need execute permissions: `chmod +x *.AppImage`
- Some distributions may require additional libraries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run electron-dev`
5. Build with `npm run build:all` to ensure all platforms work
6. Submit a pull request

## License

This project is licensed under the MIT License. 