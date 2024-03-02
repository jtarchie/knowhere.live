import { Signal, signal } from "@preact/signals";

class Map<T> {
  ref: Signal<{ [key: string]: T }>;

  constructor() {
    this.ref = signal({});
  }

  get(name: string) {
    return this.ref.value[name];
  }

  set(name: string, value: T) {
    this.ref.value = { ...this.ref.value, [name]: value };
  }

  delete(name: string) {
    const { [name]: _, ...rest } = this.ref.value;
    this.ref.value = rest;
  }

  values(): T[] {
    return Object.values(this.ref.value);
  }
}

export { Map };
