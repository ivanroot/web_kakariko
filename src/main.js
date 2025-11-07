import './style.css'
import { moduleManager } from './core/ModuleManager.js'
import { UIManager } from './core/UIManager.js'

// Import modules
import dashboardModule from '../modules/dashboard/index.js'
import calculatorModule from '../modules/calculator/index.js'
import notesModule from '../modules/notes/index.js'

/**
 * Main Application Entry Point
 */
class App {
  constructor() {
    this.uiManager = null;
  }

  async init() {
    console.log('🏔️ Initializing Kakariko App...');

    // Register modules first
    this.registerModules();

    // Initialize UI Manager (creates the HTML structure)
    this.uiManager = new UIManager(moduleManager);
    this.uiManager.render();

    // Now initialize Module Manager with the container that exists
    const container = document.querySelector('#module-container');
    moduleManager.init(container);

    console.log('✅ App initialized successfully');
  }

  registerModules() {
    // Auto‑registro: importa cualquier index.js dentro de /modules/*
    const autoModules = import.meta.glob('../modules/**/index.js', { eager: true });
    const entries = Object.entries(autoModules);

    if (entries.length > 0) {
      for (const [p, mod] of entries) {
        const segments = p.split('/');
        const idx = segments.lastIndexOf('modules');
        const id = idx !== -1 && segments[idx + 1] ? segments[idx + 1] : `mod-${Math.random().toString(36).slice(2, 8)}`;
        const config = mod.default || mod;
        moduleManager.register(id, config);
      }
    } else {
      // Fallback al registro manual existente
      moduleManager.register('dashboard', dashboardModule);
      moduleManager.register('calculator', calculatorModule);
      moduleManager.register('notes', notesModule);
    }

    console.log(`📦 Registered ${moduleManager.getModules().length} modules`);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}
