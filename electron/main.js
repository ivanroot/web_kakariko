/**
 * Electron Main Process
 * Este archivo se ejecutará cuando la aplicación se compile como app de escritorio
 */

import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    // icon opcional; si no existe, Electron lo ignora
    // icon: path.join(__dirname, '../public/icon.png')
  });

  // En desarrollo, cargar desde el servidor de Vite
  if (process.env.NODE_ENV === 'development') {
    const devPort = process.env.VITE_DEV_SERVER_PORT || '5173';
    mainWindow.loadURL(`http://localhost:${devPort}`);
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, cargar el HTML compilado
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
