const { ipcRenderer, shell, clipboard } = require('electron');

let currentFormat = 'audio';
let videoInfo = null;
let isLoading = false;

// UI Elements
const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const statusMessage = document.getElementById('statusMessage');
const videoInfoDiv = document.getElementById('videoInfo');
const audioOptions = document.getElementById('audioOptions');
const videoOptions = document.getElementById('videoOptions');
const audioBtn = document.getElementById('audioBtn');
const videoBtn = document.getElementById('videoBtn');

// Format selection
function selectFormat(format) {
    currentFormat = format;
    
    if (format === 'audio') {
        audioBtn.classList.add('active');
        videoBtn.classList.remove('active');
        audioOptions.classList.remove('hidden');
        videoOptions.classList.add('hidden');
    } else {
        videoBtn.classList.add('active');
        audioBtn.classList.remove('active');
        videoOptions.classList.remove('hidden');
        audioOptions.classList.add('hidden');
    }
    
    updateDownloadButton();
}

// Update download button text
function updateDownloadButton() {
    const format = currentFormat;
    let text = 'download ';
    
    if (format === 'audio') {
        const audioFormat = document.getElementById('audioFormat').value;
        const bitrate = document.getElementById('audioBitrate').value;
        text += `${audioFormat} ${bitrate}kbps`;
    } else {
        const videoFormat = document.getElementById('videoFormat').value;
        const quality = document.getElementById('videoQuality').value;
        text += `${videoFormat} ${quality}`;
    }
    
    downloadBtn.textContent = text;
}

// Handle URL input changes
let urlTimeout;
function handleUrlChange() {
    clearTimeout(urlTimeout);
    const url = urlInput.value.trim();
    
    if (!url) {
        hideVideoInfo();
        return;
    }
    
    urlTimeout = setTimeout(() => {
        if (isValidYouTubeUrl(url)) {
            fetchVideoInfo(url);
        } else {
            hideVideoInfo();
        }
    }, 500);
}

// Validate YouTube URL
function isValidYouTubeUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
    return regex.test(url);
}

// Fetch video information
async function fetchVideoInfo(url) {
    try {
        showStatus('Fetching video info...', 'info');
        
        const info = await ipcRenderer.invoke('get-video-info', url);
        
        if (info.error) {
            showStatus(info.error, 'error');
            hideVideoInfo();
            return;
        }
        
        videoInfo = info;
        showVideoInfo(info);
        hideStatus();
        
    } catch (error) {
        console.error('Error fetching video info:', error);
        showStatus('Failed to fetch video info', 'error');
        hideVideoInfo();
    }
}

// Show video information
function showVideoInfo(info) {
    document.getElementById('videoTitle').textContent = info.title;
    document.getElementById('videoAuthor').textContent = `by ${info.author}`;
    document.getElementById('videoDuration').textContent = formatDuration(info.duration);
    document.getElementById('videoThumbnail').src = info.thumbnail;
    
    videoInfoDiv.style.display = 'block';
}

// Hide video information
function hideVideoInfo() {
    videoInfoDiv.style.display = 'none';
    videoInfo = null;
}

// Format duration
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Show status message
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`;
    statusMessage.style.display = 'block';
}

// Hide status message
function hideStatus() {
    statusMessage.style.display = 'none';
}

// Start download
async function startDownload() {
    const url = urlInput.value.trim();
    
    if (!url) {
        showStatus('Please enter a YouTube URL', 'error');
        return;
    }
    
    if (!isValidYouTubeUrl(url)) {
        showStatus('Please enter a valid YouTube URL', 'error');
        return;
    }
    
    if (isLoading) return;
    
    isLoading = true;
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Downloading...';
    hideStatus();
    
    try {
        const options = {
            url,
            format: currentFormat,
            title: videoInfo?.title || 'download'
        };
        
        if (currentFormat === 'audio') {
            options.quality = document.getElementById('audioFormat').value;
            options.audioBitrate = document.getElementById('audioBitrate').value;
        } else {
            options.videoFormat = document.getElementById('videoFormat').value;
            options.quality = document.getElementById('videoQuality').value;
        }
        
        const result = await ipcRenderer.invoke('start-download', options);
        
        if (result.success) {
            showStatus('Download completed successfully!', 'success');
        } else {
            showStatus(result.error || 'Download failed', 'error');
        }
        
    } catch (error) {
        console.error('Download error:', error);
        showStatus('Download failed. Please try again.', 'error');
    } finally {
        isLoading = false;
        downloadBtn.disabled = false;
        updateDownloadButton();
        setTimeout(() => {
            hideStatus();
        }, 3000);
    }
}

// Open support link
function openSupport() {
    shell.openExternal('https://buy.stripe.com/eVq6oHa1Q5JBcBZ8hJcwg02');
}

// Show privacy policy
function showPrivacy() {
    ipcRenderer.send('show-privacy');
}

// Show terms of service
function showTerms() {
    ipcRenderer.send('show-terms');
}

// Show ethics page
function showEthics() {
    ipcRenderer.send('show-ethics');
}

// Listen for download completion
ipcRenderer.on('download-complete', (event, success, message) => {
    if (success) {
        showStatus(message || 'Download completed successfully!', 'success');
    } else {
        showStatus(message || 'Download failed', 'error');
    }
});

// Event listeners
document.getElementById('audioFormat').addEventListener('change', updateDownloadButton);
document.getElementById('audioBitrate').addEventListener('change', updateDownloadButton);
document.getElementById('videoFormat').addEventListener('change', updateDownloadButton);
document.getElementById('videoQuality').addEventListener('change', updateDownloadButton);

// Initialize
updateDownloadButton();

// Paste URL from clipboard
function pasteUrl() {
    const text = clipboard.readText().trim();
    if (text) {
        urlInput.value = text;
        handleUrlChange();
    }
} 