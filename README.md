# 🏔️ Kakariko App

Aplicación web modular construida con **Vite**, **Vanilla JavaScript** y **DaisyUI 5**.

## 🚀 Características

- **Arquitectura Modular**: Sistema de módulos independientes que se pueden cargar dinámicamente
- **DaisyUI 5**: Componentes UI modernos con múltiples temas
- **Responsive**: Diseño adaptable a móvil, tablet y escritorio
- **Soporte Electron**: Preparado para compilar como aplicación de escritorio
- **Hot Module Replacement**: Desarrollo rápido con recarga en caliente

## 📦 Estructura del Proyecto

```
web_kakariko/
├── src/
│   ├── core/
│   │   ├── ModuleManager.js    # Gestor de módulos
│   │   └── UIManager.js         # Gestor de interfaz
│   ├── main.js                  # Punto de entrada
│   └── style.css                # Estilos globales
├── modules/
│   ├── dashboard/               # Módulo de dashboard
│   ├── calculator/              # Módulo de calculadora
│   └── notes/                   # Módulo de notas
├── electron/
│   ├── main.js                  # Proceso principal de Electron
│   └── preload.js               # Script preload
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Instalar Electron (cuando esté disponible)
npm install -D electron electron-builder vite-plugin-electron
```

## 💻 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🖥️ Compilar como App de Escritorio con Electron

### 1. Instalar dependencias de Electron

```bash
npm install -D electron electron-builder vite-plugin-electron vite-plugin-electron-renderer
```

### 2. Actualizar package.json

Añade estos scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "electron:dev": "vite --mode electron && electron .",
    "electron:build": "vite build && electron-builder"
  },
  "main": "electron/main.js"
}
```

### 3. Configurar electron-builder

Añade al package.json:

```json
{
  "build": {
    "appId": "com.kakariko.app",
    "productName": "Kakariko App",
    "directories": {
      "output": "dist-electron"
    },
    "files": [
      "dist/**/*",
      "electron/**/*"
    ],
    "mac": {
      "target": "dmg",
      "icon": "public/icon.png"
    },
    "win": {
      "target": "nsis",
      "icon": "public/icon.ico"
    },
    "linux": {
      "target": "AppImage",
      "icon": "public/icon.png"
    }
  }
}
```

### 4. Ejecutar en modo Electron

```bash
# Desarrollo
npm run electron:dev

# Compilar app de escritorio
npm run electron:build
```

## 🎨 Módulos

### Crear un Nuevo Módulo

1. Crea una nueva carpeta en `modules/`:

```bash
mkdir modules/mi-modulo
```

2. Crea un archivo `index.js` con la siguiente estructura:

```javascript
export default {
  name: 'Mi Módulo',
  description: 'Descripción del módulo',
  icon: '🎯',

  init: async function() {
    // Inicialización del módulo
    console.log('Módulo inicializado');
    return { /* estado inicial */ };
  },

  render: async function(container) {
    // Renderizar UI del módulo
    container.innerHTML = `
      <div>
        <h2>Mi Módulo</h2>
        <p>Contenido del módulo</p>
      </div>
    `;

    // Añadir event listeners aquí
  },

  destroy: function(instance) {
    // Limpieza al descargar el módulo
    console.log('Módulo destruido');
  }
};
```

3. Registra el módulo en `src/main.js`:

```javascript
import miModulo from '../modules/mi-modulo/index.js'

// En el método registerModules():
moduleManager.register('mi-modulo', miModulo);
```

## 🎨 Temas

La aplicación incluye múltiples temas de DaisyUI:

- Light (claro)
- Dark (oscuro)
- Cupcake (pastel)
- Cyberpunk (neón)

Cambia el tema con el botón en la barra superior.

## 📚 Componentes DaisyUI Disponibles

- Botones: `btn`, `btn-primary`, `btn-secondary`, etc.
- Cards: `card`, `card-body`, `card-title`
- Modals: `modal`, `modal-box`
- Drawers: `drawer`, `drawer-side`
- Navbar: `navbar`
- Stats: `stats`, `stat`
- Alerts: `alert`, `alert-info`, `alert-success`
- Forms: `input`, `textarea`, `select`, `checkbox`

Ver más en: https://daisyui.com/components/

## 🔧 Tecnologías

- **Vite**: Build tool ultrarrápido
- **Vanilla JavaScript**: Sin frameworks, JavaScript puro
- **TailwindCSS**: Framework CSS utility-first
- **DaisyUI 5**: Biblioteca de componentes UI
- **Electron**: Framework para apps de escritorio (opcional)

## 📝 Módulos Incluidos

### 📊 Dashboard
Panel de control con estadísticas y actividad reciente.

### 🔢 Calculadora
Calculadora funcional con operaciones básicas.

### 📝 Notas
Gestor de notas con almacenamiento local (localStorage).

## 🤝 Contribuir

Para añadir nuevos módulos:

1. Crea el módulo en la carpeta `modules/`
2. Sigue la estructura de módulos existentes
3. Registra el módulo en `main.js`
4. Documenta la funcionalidad

## 📄 Licencia

MIT
