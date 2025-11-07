export default {
  name: '__MODULE_NAME__',
  description: '__MODULE_DESCRIPTION__',
  icon: '__MODULE_ICON__',

  init: async function() {
    return {
      state: {},
    };
  },

  render: async function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold">${this.name}</h2>
          <div class="badge badge-outline">Plantilla</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Controllers</h3>
              <pre class="text-xs opacity-70">controllers/MainController.js</pre>
            </div>
          </div>

          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Services</h3>
              <pre class="text-xs opacity-70">services/*.js</pre>
            </div>
          </div>

          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Models</h3>
              <pre class="text-xs opacity-70">models/*.js</pre>
            </div>
          </div>

          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Routes</h3>
              <pre class="text-xs opacity-70">routes/index.js</pre>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  destroy: async function(instance) {
    // Limpieza si fuera necesaria
  }
};