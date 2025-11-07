# Plantilla de Módulo

Estructura base para nuevos módulos compatibles con el gestor de módulos actual.

## Estructura

- `index.js`: Punto de entrada del módulo, exporta `{ name, description, icon, init, render, destroy }`.
- `controllers/`: Lógica de orquestación, `MainController.js` de ejemplo.
- `services/`: Servicios reutilizables, `BaseService.js` de ejemplo.
- `models/`: Modelos y estado local, `State.js` de ejemplo.
- `routes/`: Punto futuro para rutas (si agregas router).

## Placeholders

- `__MODULE_NAME__`: nombre legible del módulo.
- `__MODULE_DESCRIPTION__`: breve descripción.
- `__MODULE_ICON__`: emoji o nombre de icono.

## Pasos tras generar

1. Abre `modules/<tu-modulo>/index.js` y ajusta nombre, descripción e icono.
2. Implementa tu UI dentro de `render(container)`.
3. Usa `controllers`, `services` y `models` según necesites.