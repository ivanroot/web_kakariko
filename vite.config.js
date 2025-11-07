import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  // En Electron, el HTML se carga vía file://; usar rutas relativas
  base: './',
  server: {
    port: 5175,
    strictPort: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
