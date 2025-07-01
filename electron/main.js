const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const ytdl = require('@distube/ytdl-core');
const { handleDownload } = require('./download');
const isDev = process.env.ELECTRON_IS_DEV === 'true';

// Suppress common Electron warnings
app.commandLine.appendSwitch('--disable-web-security');
app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor');
app.commandLine.appendSwitch('--disable-gpu-sandbox');
app.commandLine.appendSwitch('--no-sandbox');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
    icon: path.join(__dirname, '../public/zobun.ico'),
    title: 'zobun converter',
    resizable: true,
    minWidth: 600,
    minHeight: 800,
    autoHideMenuBar: true
  });

  // Load the standalone HTML file
  mainWindow.loadFile(path.join(__dirname, 'renderer.html'));

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

// Handle video info requests
ipcMain.handle('get-video-info', async (event, url) => {
  try {
    const cleanUrl = url.split('&list=')[0].split('&start_radio=')[0];
    
    if (!ytdl.validateURL(cleanUrl)) {
      return { error: 'Invalid YouTube URL' };
    }
    
    const info = await ytdl.getInfo(cleanUrl, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    });
    
    const videoDetails = info.videoDetails;
    
    return {
      title: videoDetails.title,
      duration: parseInt(videoDetails.lengthSeconds),
      thumbnail: videoDetails.thumbnails[0]?.url,
      author: videoDetails.author.name,
      formats: info.formats
    };
    
  } catch (error) {
    console.error('Error fetching video info:', error);
    return { error: 'Failed to fetch video information' };
  }
});

// Handle download requests
ipcMain.handle('start-download', async (event, options) => {
  try {
    const result = await handleDownload(mainWindow, options);
    return { success: true };
  } catch (error) {
    console.error('Download error:', error);
    return { success: false, error: error.message };
  }
});

// Handle page navigation
ipcMain.on('show-privacy', () => {
  shell.openExternal('https://zobun.com/privacy');
});

ipcMain.on('show-terms', () => {
  shell.openExternal('https://zobun.com/terms');
});

ipcMain.on('show-ethics', () => {
  shell.openExternal('https://zobun.com/ethics');
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 