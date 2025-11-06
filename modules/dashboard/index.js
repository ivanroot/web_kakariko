/**
 * Dashboard Module
 * Módulo de ejemplo que muestra un panel de control con estadísticas
 */

export default {
  name: 'Dashboard',
  description: 'Panel de control principal',
  icon: '📊',

  init: async function() {
    console.log('Dashboard module initialized');
    return {
      stats: {
        users: 1234,
        projects: 42,
        tasks: 89
      }
    };
  },

  render: async function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold">Dashboard</h2>
          <button class="btn btn-primary">Nuevo Proyecto</button>
        </div>

        <!-- Stats -->
        <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="stat-title">Usuarios Activos</div>
            <div class="stat-value text-primary">1,234</div>
            <div class="stat-desc">21% más que el mes pasado</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <div class="stat-title">Proyectos</div>
            <div class="stat-value text-secondary">42</div>
            <div class="stat-desc">↗︎ 12 nuevos esta semana</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="stat-title">Tareas Completadas</div>
            <div class="stat-value text-accent">89</div>
            <div class="stat-desc">↘︎ 14 pendientes</div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Actividad Reciente</h3>
            <div class="space-y-2">
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Nuevo proyecto "App Web" creado hace 2 horas</span>
              </div>
              <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tarea "Implementar diseño" completada</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="card bg-primary text-primary-content">
            <div class="card-body">
              <h3 class="card-title">Crear Proyecto</h3>
              <p>Inicia un nuevo proyecto</p>
              <div class="card-actions justify-end">
                <button class="btn btn-sm">Crear</button>
              </div>
            </div>
          </div>
          <div class="card bg-secondary text-secondary-content">
            <div class="card-body">
              <h3 class="card-title">Nueva Tarea</h3>
              <p>Añade una tarea pendiente</p>
              <div class="card-actions justify-end">
                <button class="btn btn-sm">Añadir</button>
              </div>
            </div>
          </div>
          <div class="card bg-accent text-accent-content">
            <div class="card-body">
              <h3 class="card-title">Reportes</h3>
              <p>Ver estadísticas detalladas</p>
              <div class="card-actions justify-end">
                <button class="btn btn-sm">Ver</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  destroy: function(instance) {
    console.log('Dashboard module destroyed');
  }
};
