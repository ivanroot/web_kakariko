#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const modulesDir = path.join(root, 'modules');
const templatesDir = path.join(root, 'templates', 'module_base');

function toTitleCase(str) {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1));
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyWithPlaceholders(src, dest, replacements) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    const children = fs.readdirSync(src);
    for (const c of children) {
      copyWithPlaceholders(path.join(src, c), path.join(dest, c), replacements);
    }
  } else {
    let content = fs.readFileSync(src, 'utf8');
    content = content
      .replaceAll('__MODULE_NAME__', replacements.MODULE_NAME)
      .replaceAll('__MODULE_DESCRIPTION__', replacements.MODULE_DESCRIPTION)
      .replaceAll('__MODULE_ICON__', replacements.MODULE_ICON);
    fs.writeFileSync(dest, content, 'utf8');
  }
}

function mergeTemplateDeps(modulePath) {
  const templatePkgPath = path.join(modulePath, 'template.package.json');
  if (!fs.existsSync(templatePkgPath)) return;
  const tpl = JSON.parse(fs.readFileSync(templatePkgPath, 'utf8'));
  const pkgPath = path.join(root, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.dependencies = { ...(pkg.dependencies || {}), ...(tpl.dependencies || {}) };
  pkg.devDependencies = { ...(pkg.devDependencies || {}), ...(tpl.devDependencies || {}) };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
}

function maybeUpdateMainForManualRegistration(moduleName) {
  const mainPath = path.join(root, 'src', 'main.js');
  if (!fs.existsSync(mainPath)) return;
  const content = fs.readFileSync(mainPath, 'utf8');
  const hasAutoImportGlob = content.includes('import.meta.glob');
  if (hasAutoImportGlob) {
    // Auto-carga ya está; no se requiere registro manual
    return;
  }
  const importLine = `import ${moduleName}Module from '/modules/${moduleName}/index.js';`;
  let updated = content;
  if (!updated.includes(importLine)) {
    updated = updated.replace(/(^import .*\n)+/m, (m) => m + importLine + '\n');
  }
  const registerLine = `moduleManager.register(${moduleName}Module);`;
  if (!updated.includes(registerLine)) {
    updated = updated.replace(/moduleManager\.register\([^)]*\);/m, (m) => `${m}\n${registerLine}`);
  }
  fs.writeFileSync(mainPath, updated, 'utf8');
}

function usage() {
  console.log('Uso: npm run generate:module -- <nombre-modulo> [descripcion]');
}

async function run() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    usage();
    process.exit(1);
  }
  const rawName = args[0];
  const descriptionArg = args.slice(1).join(' ').trim();
  const moduleName = rawName.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
  const prettyName = toTitleCase(rawName);
  const description = descriptionArg || `Módulo ${prettyName}`;
  const icon = '🧩';

  const targetDir = path.join(modulesDir, moduleName);
  if (fs.existsSync(targetDir)) {
    console.error(`El módulo '${moduleName}' ya existe en modules/`);
    process.exit(1);
  }

  ensureDir(modulesDir);
  ensureDir(targetDir);

  // Copiar plantilla
  copyWithPlaceholders(templatesDir, targetDir, {
    MODULE_NAME: prettyName,
    MODULE_DESCRIPTION: description,
    MODULE_ICON: icon,
  });

  // Mover index.js de plantilla a modules/<name>/index.js
  // (ya se copió con placeholders)

  // Fusionar dependencias opcionales
  mergeTemplateDeps(targetDir);

  // Ajustar main.js si no hay auto-registro
  maybeUpdateMainForManualRegistration(moduleName);

  console.log(`✔ Módulo creado en modules/${moduleName}`);
  console.log('Abre y personaliza controllers/services/models según tus necesidades.');
}

run();