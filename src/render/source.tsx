import * as pako from "pako";

const defaultSourceCode = `
const entries = query.execute("nwr[name=~Costco](prefix=colorado)");

const payload = {
  type: "FeatureCollection",
  features: entries.map((entry, index) => {
    return entry.asFeature({
      "marker-color": colors.pick(index),
    });
  }),
};

return payload
`.trim();

class Source {
  sourceName: string;

  constructor(sourceName: string = "source") {
    this.sourceName = sourceName;
  }

  fromParams(defaultSource: string = defaultSourceCode): string {
    const params = new URLSearchParams(window.location.search);
    let currentSource = params.get(this.sourceName);
    if (currentSource) {
      const compressedData = Uint8Array.from(
        atob(currentSource),
        (c) => c.charCodeAt(0),
      );
      const decompressedData = pako.inflate(compressedData);
      currentSource = new TextDecoder().decode(decompressedData);
    } else {
      currentSource = localStorage.getItem(this.sourceName) || defaultSource;
    }

    return currentSource;
  }

  toParams(source: string) {
    const params = new URLSearchParams(window.location.search);

    const inputData = new TextEncoder().encode(source);
    const compressedData = pako.deflate(inputData);
    const base64String = btoa(String.fromCharCode(...compressedData));

    params.set(this.sourceName, base64String);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`,
    );

    localStorage.setItem(this.sourceName, source);
  }
}

export { Source };
