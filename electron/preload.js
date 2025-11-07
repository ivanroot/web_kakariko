/**
 * Electron Preload Script
 * Este script se ejecuta antes de que se cargue la página web
 * y puede exponer APIs de Node.js al contexto del renderer de forma segura
 */

import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  isElectron: true
});
