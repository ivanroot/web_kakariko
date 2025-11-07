export class MainController {
  constructor({ services, models }) {
    this.services = services;
    this.models = models;
  }

  async init() {
    // Inicializa servicios o estado
    return { ready: true };
  }

  async handleAction(action, payload) {
    switch (action) {
      case 'example':
        return this.services.base.echo(payload);
      default:
        return { ok: true };
    }
  }
}