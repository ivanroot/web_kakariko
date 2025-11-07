export class State {
  constructor(initial = {}) {
    this.data = { ...initial };
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key];
  }
}