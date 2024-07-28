import { FormValues } from "../component/form.tsx";
import manifests, { Manifest } from "../manifests/index.ts";

class Manager {
  load(manifestName: string = "demo"): Manifest {
    const manifest = manifests[manifestName];
    // const params = new URLSearchParams(window.location.search);

    // try local storage - overrides
    const manifestPayload = localStorage.getItem("manifest");
    if (manifestPayload) {
      return Object.assign({}, manifest, JSON.parse(manifestPayload));
    }

    // no overrides provided, use default
    return manifest;
  }

  persistFilterValues(values: FormValues) {
    const manifest = localStorage.getItem("manifest") || "{}";
    const payload = JSON.parse(manifest) as Manifest;
    payload.filterValues = values;
    localStorage.setItem("manifest", JSON.stringify(payload));
  }

  persistSource(source: string) {
    const manifest = localStorage.getItem("manifest") || "{}";
    const payload = JSON.parse(manifest) as Manifest;
    payload.source = source;
    localStorage.setItem("manifest", JSON.stringify(payload));
  }
}

export { Manager };
