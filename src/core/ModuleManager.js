/**
 * ModuleManager - Sistema de gestión de módulos independientes
 * Permite cargar, descargar y gestionar módulos de forma dinámica
 */
export class ModuleManager {
  constructor() {
    this.modules = new Map();
    this.activeModule = null;
    this.container = null;
  }

  /**
   * Inicializa el gestor de módulos
   * @param {HTMLElement} container - Contenedor donde se montarán los módulos
   */
  init(container) {
    this.container = container;
  }

  /**
   * Registra un nuevo módulo en el sistema
   * @param {string} id - ID único del módulo
   * @param {Object} moduleConfig - Configuración del módulo
   */
  register(id, moduleConfig) {
    if (this.modules.has(id)) {
      console.warn(`Module ${id} is already registered`);
      return;
    }

    const module = {
      id,
      name: moduleConfig.name,
      description: moduleConfig.description,
      icon: moduleConfig.icon || '📦',
      init: moduleConfig.init,
      destroy: moduleConfig.destroy || (() => {}),
      render: moduleConfig.render,
      instance: null
    };

    this.modules.set(id, module);
    console.log(`Module ${id} registered successfully`);
  }

  /**
   * Carga y activa un módulo
   * @param {string} id - ID del módulo a cargar
   */
  async load(id) {
    const module = this.modules.get(id);

    if (!module) {
      console.error(`Module ${id} not found`);
      return;
    }

    // Descargar módulo activo si existe
    if (this.activeModule) {
      await this.unload(this.activeModule.id);
    }

    // Limpiar contenedor
    if (this.container) {
      this.container.innerHTML = '';
    }

    // Inicializar módulo
    try {
      if (module.init) {
        module.instance = await module.init();
      }

      // Renderizar módulo
      if (module.render) {
        await module.render(this.container);
      }

      this.activeModule = module;
      console.log(`Module ${id} loaded successfully`);

      // Emitir evento
      window.dispatchEvent(new CustomEvent('module-loaded', { detail: { id } }));
    } catch (error) {
      console.error(`Error loading module ${id}:`, error);
    }
  }

  /**
   * Descarga el módulo activo
   * @param {string} id - ID del módulo a descargar
   */
  async unload(id) {
    const module = this.modules.get(id);

    if (!module) {
      return;
    }

    try {
      if (module.destroy) {
        await module.destroy(module.instance);
      }

      if (this.activeModule?.id === id) {
        this.activeModule = null;
      }

      console.log(`Module ${id} unloaded successfully`);
    } catch (error) {
      console.error(`Error unloading module ${id}:`, error);
    }
  }

  /**
   * Obtiene lista de todos los módulos registrados
   */
  getModules() {
    return Array.from(this.modules.values()).map(m => ({
      id: m.id,
      name: m.name,
      description: m.description,
      icon: m.icon,
      isActive: this.activeModule?.id === m.id
    }));
  }

  /**
   * Obtiene el módulo activo
   */
  getActiveModule() {
    return this.activeModule;
  }
}

// Instancia global del gestor de módulos
export const moduleManager = new ModuleManager();
