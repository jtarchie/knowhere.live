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
    const manifest = sessionStorage.getItem("manifest") || "{}";
    const payload = JSON.parse(manifest) as Manifest;
    payload.filterValues = values;
    sessionStorage.setItem("manifest", JSON.stringify(payload));
  }

  persistSource(source: string) {
    const manifest = sessionStorage.getItem("manifest") || "{}";
    const payload = JSON.parse(manifest) as Manifest;
    payload.source = source;
    sessionStorage.setItem("manifest", JSON.stringify(payload));
  }
}

export { Manager };
