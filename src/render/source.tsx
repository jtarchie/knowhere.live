import { Editor } from "./editor";
import { Map } from "./map";
import * as pako from "pako";

class Source {
  editor: Editor;
  map: Map;
  sourceName: string;

  constructor(map: Map, editor: Editor, sourceName: string) {
    this.map = map;
    this.editor = editor;
    this.sourceName = sourceName;
  }

  fromParams(defaultSource: string) {
    const params = new URLSearchParams(window.location.search);
    let currentSource = params.get(this.sourceName);
    if (currentSource) {
      const compressedData = Uint8Array.from(
        atob(currentSource),
        (c) => c.charCodeAt(0),
      );
      const decompressedData = pako.inflate(compressedData);
      currentSource = new TextDecoder().decode(decompressedData);

      this.editor.toggle();
    } else {
      currentSource = localStorage.getItem(this.sourceName) || defaultSource;
    }

    this.editor.source = currentSource;
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
