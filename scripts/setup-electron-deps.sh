#!/usr/bin/env bash
set -euo pipefail

echo "[setup-electron] Detectando distro..."

if command -v apt-get >/dev/null 2>&1; then
  echo "[setup-electron] Usando apt-get (Debian/Ubuntu)."
  sudo apt-get update
  sudo apt-get install -y \
    libnss3 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxtst6 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    xdg-utils \
    libfuse2 || true
  echo "[setup-electron] Instalación apt-get finalizada."
else
  echo "[setup-electron] Gestor de paquetes no soportado automáticamente."
  echo "Instala manualmente librerías equivalentes a:"
  echo "libnss3, libasound2, libatk1.0-0, libatk-bridge2.0-0, libx11-6, libxcomposite1, libxdamage1, libxext6, libxfixes3, libxrandr2, libxtst6, libcups2, libdrm2, libgbm1, libgtk-3-0, xdg-utils, libfuse2"
fi

echo "[setup-electron] Listo. Si estás en WSL, asegúrate de tener soporte gráfico (WSLg o servidor X)."