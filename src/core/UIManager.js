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
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                  <span class="hidden md:inline">Theme</span> 
                  <svg width="12px" height="12px" class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                </div>
                <ul tabindex="0" id="theme-selector" class="dropdown-content menu z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 h-96 overflow-y-auto">
                </ul>
              </div>
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
    // Theme selector
    this.renderThemeSelector();

    // Module click listeners
    this.attachModuleListeners();

    // Listen for module changes
    window.addEventListener('module-loaded', () => {
      this.updateModulesList();
    });
  }

  renderThemeSelector() {
    const themes = [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
      "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
      "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
      "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
      "night", "coffee", "winter", "dim", "nord", "sunset"
    ];

    const themeSelector = document.querySelector('#theme-selector');
    if (!themeSelector) return;

    themeSelector.innerHTML = themes.map(theme => `
      <li>
        <a data-theme-id="${theme}" class="theme-item ${this.theme === theme ? 'active' : ''}">
          ${theme}
        </a>
      </li>
    `).join('');

    const themeItems = document.querySelectorAll('.theme-item');
    themeItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const newTheme = item.getAttribute('data-theme-id');
        this.setTheme(newTheme);
      });
    });
  }

  setTheme(newTheme) {
    this.theme = newTheme;
    localStorage.setItem('theme', this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
    this.renderThemeSelector(); // Re-render to update active state
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


}
