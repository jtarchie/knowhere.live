import { Editor } from "./editor";
import { Map } from "./map";
import mapboxgl from "mapbox-gl";
import { Source } from "./source";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";

const mapElement = document.querySelector("#map")!;
const map = new Map(
  mapElement,
  [
    [-124.7844079, 24.396308],
    [-66.9513812, 49.384358],
  ],
);

const editorElement = document.querySelector("#content")!;
const editor = new Editor(editorElement);

const source = new Source(map, editor, "source");

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

source.fromParams(defaultSource);

function geoJSONfromSource(codeSource: string) {
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
    map.features = features;
  });
}

map.onLoad(() => {
  geoJSONfromSource(editor.source);
});

document.addEventListener("keydown", function (event) {
  if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
    if (event.key === "f") {
      event.preventDefault();
      geoJSONfromSource(editor.source);
    }
    if (event.key === "d") {
      event.preventDefault();
      editor.toggle();
    }
  }
});
