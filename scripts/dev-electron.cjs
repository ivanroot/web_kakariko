// Robust dev script for Electron + Vite
// - Finds a free port
// - Starts Vite on that port
// - Waits until Vite is ready
// - Starts Electron pointing to the Vite URL

const detect = require('detect-port');
const waitOn = require('wait-on');
const { spawn } = require('child_process');
const path = require('path');

async function main() {
  const preferred = parseInt(process.env.VITE_DEV_SERVER_PORT || '5173', 10);
  const port = await detect(preferred);
  console.log(`[dev] Using port ${port} (preferred ${preferred})`);

  const viteBin = path.join(process.cwd(), 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
  const electronBin = path.join(process.cwd(), 'node_modules', '.bin', process.platform === 'win32' ? 'electron.cmd' : 'electron');

  const envBase = { ...process.env, VITE_DEV_SERVER_PORT: String(port) };

  console.log('[dev] Starting Vite...');
  const vite = spawn(viteBin, ['--port', String(port), '--strictPort'], {
    env: envBase,
    stdio: 'inherit',
  });

  vite.on('exit', (code) => {
    console.error(`[vite] exited with code ${code}`);
    process.exit(code || 1);
  });

  try {
    console.log(`[dev] Waiting for Vite on tcp:${port} ...`);
    await waitOn({
      resources: [`tcp:${port}`],
      timeout: 300000, // 5 minutes
      validateStatus: () => true,
      interval: 100,
    });
    console.log('[dev] Vite is ready. Launching Electron...');
  } catch (err) {
    console.error('Failed waiting for Vite dev server:', err);
    vite.kill('SIGTERM');
    process.exit(1);
  }

  const electronEnv = { ...envBase, NODE_ENV: 'development' };
  const electron = spawn(electronBin, ['.'], {
    env: electronEnv,
    stdio: 'inherit',
  });
  electron.on('error', (err) => {
    console.error('[electron] failed to start:', err);
  });

  const shutdown = () => {
    try { vite.kill('SIGTERM'); } catch {}
    try { electron.kill('SIGTERM'); } catch {}
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  electron.on('exit', (code) => {
    console.error(`[electron] exited with code ${code}`);
    shutdown();
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});