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

    // Initialize Module Manager
    const container = document.querySelector('#module-container');
    moduleManager.init(container);

    // Register modules
    this.registerModules();

    // Initialize UI Manager
    this.uiManager = new UIManager(moduleManager);
    this.uiManager.render();

    console.log('✅ App initialized successfully');
  }

  registerModules() {
    // Register all available modules
    moduleManager.register('dashboard', dashboardModule);
    moduleManager.register('calculator', calculatorModule);
    moduleManager.register('notes', notesModule);

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
