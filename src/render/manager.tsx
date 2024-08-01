import { FormValues } from "../form/types";
import manifests, { Manifest } from "../manifests/index.ts";

class Manager {
  load(manifestName: string = "demo"): Manifest {
    const manifest = manifests[manifestName];

    // try local storage - overrides
    const manifestPayload = sessionStorage.getItem("manifest");
    if (manifestPayload) {
      return Object.assign({}, manifest, JSON.parse(manifestPayload));
    }

    // no overrides provided, use default
    return manifest;
  }

  persistFilterValues(values: FormValues) {
    this.persist((m) => m.filterValues = values);
  }

  persistSource(source: string) {
    this.persist((m) => m.source = source);
  }

  private persist(updates: (m: Manifest) => void) {
    const manifest = sessionStorage.getItem("manifest") || "{}";
    const payload = JSON.parse(manifest) as Manifest;
    updates(payload);
    sessionStorage.setItem("manifest", JSON.stringify(payload));
  }
}

export { Manager };
