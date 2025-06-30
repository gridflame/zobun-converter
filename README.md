# 🎬 YouTube Converter

A beautiful, modern YouTube video and audio converter built with Next.js 15, TypeScript, and Tailwind CSS. Download YouTube videos in multiple formats and qualities instantly!

## ✨ Features

### 🎵 Audio Conversion
- **MP3** - Most popular audio format
- **WAV** - High-quality uncompressed audio
- **OGG** - Open-source audio format
- **M4A** - Apple's audio format
- **FLAC** - Lossless audio compression

### 🎬 Video Conversion
- **Quality Options**: 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 4K (2160p)
- **Format Support**: MP4, WebM, MKV, AVI, MOV

### 🚀 User Experience
- **Real-time Video Preview** - See video info before downloading
- **Auto URL Detection** - Automatically fetches video details
- **Progress Indicators** - Visual feedback during conversion
- **Error Handling** - Clear error messages and validation
- **Responsive Design** - Works perfectly on all devices
- **Modern UI** - Beautiful gradients and animations

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **YouTube Processing**: ytdl-core
- **Video Processing**: FFmpeg (for advanced conversions)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd converter
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **Paste YouTube URL**
   - Copy any YouTube video URL
   - Paste it into the input field
   - Video information will automatically load

2. **Choose Format & Quality**
   - Select **Audio** for music/audio extraction
   - Select **Video** for video downloads
   - Pick your preferred quality and format

3. **Download**
   - Click the download button
   - Your file will be processed and downloaded automatically

## 🎯 Supported URLs

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID&t=TIME`
- `https://m.youtube.com/watch?v=VIDEO_ID`

## 📁 Project Structure

```
converter/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── convert/route.ts    # Video conversion endpoint
│   │   │   └── info/route.ts       # Video info endpoint
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Main converter page
│   │   └── globals.css             # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🔧 API Endpoints

### POST `/api/info`
Get video information before conversion.

**Request Body:**
```json
{
  "url": "https://youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "title": "Video Title",
  "duration": 180,
  "thumbnail": "https://...",
  "author": "Channel Name",
  "availableQualities": ["720p", "1080p", ...],
  "hasAudio": true,
  "hasVideo": true
}
```

### POST `/api/convert`
Convert and download YouTube video/audio.

**Request Body:**
```json
{
  "url": "https://youtube.com/watch?v=VIDEO_ID",
  "format": "audio|video",
  "quality": "mp3|720p|...",
  "videoFormat": "mp4|webm|..."
}
```

## 🎨 Features in Detail

### Real-time Video Preview
- Automatic thumbnail display
- Video title and author information
- Duration display
- Available quality options

### Smart Format Detection
- Automatically suggests best quality
- Shows available formats for each video
- Optimized download sizes

### Error Handling
- Invalid URL detection
- Network error recovery
- User-friendly error messages
- Automatic retry suggestions

## 📱 Mobile Support

The converter is fully responsive and works great on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large monitors

## ⚡ Performance

- **Fast Downloads**: Optimized streaming
- **Minimal Server Load**: Efficient processing
- **Client-side Processing**: Reduced server burden
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 🔒 Privacy & Security

- **No Data Storage**: Videos are not stored on our servers
- **Direct Downloads**: Files stream directly to your device
- **No Registration**: Use completely anonymously
- **Secure Processing**: HTTPS encryption for all requests

## 🎯 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please respect YouTube's Terms of Service and copyright laws when using this tool.

## ⚠️ Disclaimer

This tool is for personal use only. Users are responsible for respecting copyright laws and YouTube's Terms of Service. We do not store or redistribute any copyrighted content.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure you have a stable internet connection
3. Verify the YouTube URL is valid and accessible
4. Try refreshing the page

## 🔮 Future Features

- [ ] Batch download support
- [ ] Playlist conversion
- [ ] Advanced quality selection
- [ ] Download history
- [ ] Custom output naming
- [ ] Video trimming options

---

**Made with ❤️ using Next.js and modern web technologies**
