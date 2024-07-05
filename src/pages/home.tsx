import { Editor } from "../editor";
import { Map } from "../map";
import { Source } from "../source";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "preact/hooks";

import "mapbox-gl/dist/mapbox-gl.css";
import "../index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";

const defaultSource = `
const entries = geo.query("nwr[name=~Costco](prefix=colorado)");

const payload = {
  type: "FeatureCollection",
  features: entries.map((entry, index) => {
    return entry.asFeature({
      "marker-color": geo.color(index),
    });
  }),
};

return payload
`.trim();

function geoJSONfromSource(
  source: Source,
  map: Map,
  codeSource: string,
) {
  return fetch(`/proxy/api/runtime`, {
    method: "PUT",
    body: codeSource,
  }).then((response) => {
    return response.json().then((payload) => {
      if (payload.error) {
        console.error(`Could not run script: ${payload.error}`);
        payload = { features: [], type: "FeatureCollection" };
      }

      return payload.features;
    });
  }).then((features) => {
    source.toParams(codeSource);
    map.features = features;
  });
}

function Home({}: { path?: string }) {
  const map = useRef<Map>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const editorElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new Map(
      mapElement.current as Element,
      [
        [-124.7844079, 24.396308],
        [-66.9513812, 49.384358],
      ],
    );

    const editor = new Editor(editorElement.current as HTMLDivElement);
    const source = new Source(map.current, editor, "source");
    source.fromParams(defaultSource);
    map.current.onLoad(() => {
      geoJSONfromSource(source, map.current as Map, editor.source);
    });
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
        if (event.key === "f") {
          event.preventDefault();
          geoJSONfromSource(source, map.current as Map, editor.source);
        }
        if (event.key === "d") {
          event.preventDefault();
          editor.toggle();
        }
      }
    });
  });
  return (
    <>
      <div class="absolute top-0 bottom-0 w-full">
        <div id="map" ref={mapElement}></div>
      </div>
      <div
        id="content"
        class="absolute bg-white top-0 bottom-0 right-0 left-0 m-2 p-2 max-h-full overflow-y-auto"
        ref={editorElement}
      >
        <div id="editor"></div>
      </div>
    </>
  );
}

export { Home };
