# 📚 Guía para Crear Nuevos Módulos

Esta guía te ayudará a crear módulos personalizados para la aplicación Kakariko.

## 🎯 Estructura de un Módulo

Cada módulo es un objeto JavaScript con la siguiente estructura:

```javascript
export default {
  // Metadatos
  name: 'Nombre del Módulo',
  description: 'Breve descripción',
  icon: '🎯', // Emoji para el menú

  // Ciclo de vida
  init: async function() { },
  render: async function(container) { },
  destroy: function(instance) { }
}
```

## ⚙️ Generador Automático

Para acelerar la creación, usa el generador:

```bash
npm run generate:module -- mi-modulo "Descripción opcional"
```

Esto creará `modules/mi-modulo/` con la estructura base:

- `index.js` (punto de entrada)
- `controllers/MainController.js`
- `services/BaseService.js`
- `models/State.js`
- `routes/index.js`
- `README.md` del módulo
- `template.package.json` para dependencias opcionales

Si tu `src/main.js` no tiene auto‑registro, el generador añadirá el registro manual.

## 📝 Paso a Paso

### 1. Crear la Carpeta del Módulo

```bash
mkdir modules/mi-modulo
```

### 2. Crear el Archivo index.js

Crea `modules/mi-modulo/index.js`:

```javascript
export default {
  name: 'Mi Módulo',
  description: 'Descripción de mi módulo',
  icon: '🎯',

  /**
   * init - Se ejecuta cuando se carga el módulo
   * @returns {Object} Estado inicial del módulo
   */
  init: async function() {
    console.log('Mi módulo inicializado');

    // Aquí puedes:
    // - Cargar datos del localStorage
    // - Hacer peticiones a APIs
    // - Inicializar estado

    return {
      data: [],
      count: 0
    };
  },

  /**
   * render - Renderiza la UI del módulo
   * @param {HTMLElement} container - Contenedor donde renderizar
   */
  render: async function(container) {
    // Renderizar HTML con DaisyUI
    container.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-3xl font-bold">🎯 Mi Módulo</h2>

        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Bienvenido</h3>
            <p>Contenido de mi módulo</p>
            <div class="card-actions justify-end">
              <button id="mi-boton" class="btn btn-primary">
                Acción
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Añadir event listeners
    const boton = container.querySelector('#mi-boton');
    boton.addEventListener('click', () => {
      alert('¡Botón clickeado!');
    });
  },

  /**
   * destroy - Limpieza al descargar el módulo
   * @param {Object} instance - Instancia del módulo
   */
  destroy: function(instance) {
    console.log('Mi módulo destruido');

    // Aquí puedes:
    // - Guardar estado en localStorage
    // - Cancelar peticiones pendientes
    // - Limpiar event listeners
  }
};
```

### 3. Registrar el Módulo

Si tu proyecto soporta auto‑registro, no necesitas editar `src/main.js`.

Si no, edita `src/main.js` y añade:

```javascript
// Importar
import miModulo from '../modules/mi-modulo/index.js'

// En registerModules():
moduleManager.register('mi-modulo', miModulo);
```

## 🎨 Usar DaisyUI

### Componentes Comunes

```html
<!-- Botones -->
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-accent">Acento</button>

<!-- Cards -->
<div class="card bg-base-200 shadow-xl">
  <div class="card-body">
    <h3 class="card-title">Título</h3>
    <p>Contenido</p>
  </div>
</div>

<!-- Inputs -->
<input type="text" class="input input-bordered" placeholder="Texto" />
<textarea class="textarea textarea-bordered" placeholder="Área de texto"></textarea>

<!-- Modal -->
<dialog id="mi-modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Título</h3>
    <p>Contenido</p>
    <div class="modal-action">
      <button class="btn">Cerrar</button>
    </div>
  </div>
</dialog>

<!-- Para abrir el modal -->
<button onclick="document.getElementById('mi-modal').showModal()">
  Abrir Modal
</button>

<!-- Stats -->
<div class="stats shadow">
  <div class="stat">
    <div class="stat-title">Título</div>
    <div class="stat-value">1,234</div>
    <div class="stat-desc">Descripción</div>
  </div>
</div>

<!-- Alerts -->
<div class="alert alert-info">
  <span>Mensaje informativo</span>
</div>
<div class="alert alert-success">
  <span>Mensaje de éxito</span>
</div>
<div class="alert alert-warning">
  <span>Mensaje de advertencia</span>
</div>
<div class="alert alert-error">
  <span>Mensaje de error</span>
</div>
```

## 💾 Persistencia de Datos

### Guardar Datos

```javascript
const datos = { nombre: 'Juan', edad: 30 };
localStorage.setItem('mi-modulo-datos', JSON.stringify(datos));
```

### Cargar Datos

```javascript
const datos = JSON.parse(localStorage.getItem('mi-modulo-datos') || '{}');
```

## 🔄 Gestión de Estado

```javascript
export default {
  init: async function() {
    return {
      items: [],
      contador: 0,
      activo: false
    };
  },

  render: async function(container) {
    // Acceder al estado
    const instancia = this.init();

    // Actualizar vista cuando cambie el estado
    function actualizarVista() {
      // Re-renderizar componentes
    }
  }
};
```

## 🎯 Ejemplos de Módulos

### Módulo de Lista de Tareas

```javascript
export default {
  name: 'Tareas',
  description: 'Lista de tareas',
  icon: '✅',

  init: async function() {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    return { tareas };
  },

  render: async function(container) {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');

    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex gap-2">
          <input id="nueva-tarea" type="text" class="input input-bordered flex-1"
                 placeholder="Nueva tarea..." />
          <button id="agregar" class="btn btn-primary">Agregar</button>
        </div>
        <div id="lista-tareas" class="space-y-2">
          ${tareas.map((tarea, i) => `
            <div class="flex items-center gap-2 p-2 bg-base-200 rounded">
              <input type="checkbox" class="checkbox"
                     ${tarea.completada ? 'checked' : ''}
                     data-index="${i}" />
              <span class="${tarea.completada ? 'line-through' : ''}">${tarea.texto}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Event listeners
    const input = container.querySelector('#nueva-tarea');
    const botonAgregar = container.querySelector('#agregar');

    botonAgregar.addEventListener('click', () => {
      const texto = input.value.trim();
      if (texto) {
        tareas.push({ texto, completada: false });
        localStorage.setItem('tareas', JSON.stringify(tareas));
        this.render(container);
      }
    });
  },

  destroy: function() {
    console.log('Módulo de tareas destruido');
  }
};
```

## 📚 Recursos

- [DaisyUI Components](https://daisyui.com/components/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

## 💡 Consejos

1. **Usa prefijos** para IDs y clases CSS para evitar conflictos
2. **Limpia event listeners** en el método `destroy`
3. **Valida los datos** del localStorage
4. **Usa async/await** para operaciones asíncronas
5. **Comenta tu código** para facilitar el mantenimiento
6. **Prueba en diferentes temas** de DaisyUI
7. **Haz el módulo responsive** con clases de Tailwind

## 🐛 Debugging

```javascript
// Usar console.log para debug
console.log('Estado del módulo:', state);

// Ver el módulo activo
console.log('Módulo activo:', moduleManager.getActiveModule());

// Ver todos los módulos
console.log('Todos los módulos:', moduleManager.getModules());
```
## 🔧 Auto‑registro de módulos

`src/main.js` incluye auto‑registro usando `import.meta.glob('../modules/**/index.js', { eager: true })`.
- Carga automáticamente todos los módulos dentro de `modules/*`.
- El ID del módulo es el nombre de la carpeta.
- Mantiene fallback a registro manual si no se encuentra ningún módulo.
