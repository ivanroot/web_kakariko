/**
 * UIManager - Gestiona la interfaz principal de la aplicación
 */
export class UIManager {
  constructor(moduleManager) {
    this.moduleManager = moduleManager;
    this.theme = localStorage.getItem('theme') || 'light';
  }

  /**
   * Renderiza la interfaz principal
   */
  render() {
    const app = document.querySelector('#app');

    // Aplicar tema al elemento html
    document.documentElement.setAttribute('data-theme', this.theme);

    app.innerHTML = `
      <div class="drawer lg:drawer-open">
        <input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
          <!-- Navbar -->
          <div class="navbar bg-base-300 shadow-lg">
            <div class="flex-none lg:hidden">
              <label for="drawer-toggle" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div class="flex-1">
              <h1 class="text-xl font-bold ml-4">🏔️ Kakariko App</h1>
            </div>
            <div class="flex-none">
              <button id="theme-toggle" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Contenido principal -->
          <main id="module-container" class="flex-1 p-6 bg-base-100">
            ${this.renderWelcome()}
          </main>
        </div>

        <!-- Sidebar -->
        <div class="drawer-side">
          <label for="drawer-toggle" class="drawer-overlay"></label>
          <aside class="bg-base-200 w-80 min-h-screen">
            <div class="p-4">
              <h2 class="text-2xl font-bold mb-4">Módulos</h2>
              <ul id="modules-list" class="menu menu-lg bg-base-100 rounded-box">
                ${this.renderModulesList()}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Renderiza la pantalla de bienvenida
   */
  renderWelcome() {
    return `
      <div class="hero min-h-full">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Bienvenido 👋</h1>
            <p class="py-6">Esta es una aplicación modular construida con Vite, Vanilla JS y DaisyUI 5.</p>
            <p class="text-sm opacity-70">Selecciona un módulo del menú lateral para comenzar.</p>
            <div class="mt-8 stats stats-vertical lg:stats-horizontal shadow">
              <div class="stat">
                <div class="stat-title">Módulos Cargados</div>
                <div class="stat-value">${this.moduleManager.getModules().length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza la lista de módulos en el sidebar
   */
  renderModulesList() {
    const modules = this.moduleManager.getModules();

    if (modules.length === 0) {
      return '<li><a class="disabled">No hay módulos disponibles</a></li>';
    }

    return modules.map(module => `
      <li>
        <a data-module-id="${module.id}" class="module-item ${module.isActive ? 'active' : ''}">
          <span class="text-2xl">${module.icon}</span>
          <div class="flex flex-col items-start">
            <span class="font-semibold">${module.name}</span>
            <span class="text-xs opacity-70">${module.description}</span>
          </div>
        </a>
      </li>
    `).join('');
  }

  /**
   * Actualiza la lista de módulos
   */
  updateModulesList() {
    const list = document.querySelector('#modules-list');
    if (list) {
      list.innerHTML = this.renderModulesList();
      this.attachModuleListeners();
    }
  }

  /**
   * Adjunta event listeners
   */
  attachEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Module click listeners
    this.attachModuleListeners();

    // Listen for module changes
    window.addEventListener('module-loaded', () => {
      this.updateModulesList();
    });
  }

  /**
   * Adjunta listeners a los items de módulos
   */
  attachModuleListeners() {
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const moduleId = item.getAttribute('data-module-id');
        this.moduleManager.load(moduleId);

        // Cerrar drawer en móvil
        const drawerToggle = document.querySelector('#drawer-toggle');
        if (drawerToggle) {
          drawerToggle.checked = false;
        }
      });
    });
  }

  /**
   * Cambia el tema
   */
  toggleTheme() {
    const themes = ['light', 'dark', 'cupcake', 'cyberpunk'];
    const currentIndex = themes.indexOf(this.theme);
    this.theme = themes[(currentIndex + 1) % themes.length];
    localStorage.setItem('theme', this.theme);

    // Aplicar tema al elemento html
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}
