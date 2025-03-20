const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icons/icon.png')
  });

  mainWindow.loadFile('index.html');

  // Uncomment to open DevTools (for development only)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Handle IPC messages from renderer process
ipcMain.on('save-game', (event, gameData) => {
  const savePath = path.join(app.getPath('userData'), 'save.json');
  
  try {
    fs.writeFileSync(savePath, JSON.stringify(gameData, null, 2));
    event.reply('save-game-response', { success: true });
  } catch (error) {
    console.error('Error saving game:', error);
    event.reply('save-game-response', { success: false, error: error.message });
  }
});

ipcMain.on('load-game', (event) => {
  const savePath = path.join(app.getPath('userData'), 'save.json');
  
  try {
    if (fs.existsSync(savePath)) {
      const saveData = JSON.parse(fs.readFileSync(savePath, 'utf8'));
      event.reply('load-game-response', { success: true, data: saveData });
    } else {
      event.reply('load-game-response', { success: false, error: 'No save file found' });
    }
  } catch (error) {
    console.error('Error loading game:', error);
    event.reply('load-game-response', { success: false, error: error.message });
  }
});