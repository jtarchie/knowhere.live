import qs from "qs";
import { FormValues } from "../form/types";
import manifests, { Manifest } from "../manifests/index.ts";

class Manager {
  load(
    manifestName: string = "demo",
  ): { manifest: Manifest; values: FormValues } {
    let manifest = manifests[manifestName];

    // try local storage - overrides
    const manifestPayload = sessionStorage.getItem("manifest");
    if (manifestPayload) {
      manifest = Object.assign({}, manifest, JSON.parse(manifestPayload));
    }

    let values = JSON.parse(sessionStorage.getItem("values") || "{}");

    // try loading values from query string (via share link)
    const params = qs.parse(window.location.search.slice(1));
    if (params.values) {
      values = Object.assign({}, values, params.values);
      // save the url parameters so different tabs get the state
      this.persistFilterValues(values);
    }

    return { manifest, values };
  }

  persistFilterValues(values: FormValues) {
    sessionStorage.setItem("values", JSON.stringify(values));
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
