import mapboxgl, { GeoJSONSource, LngLatBoundsLike } from "mapbox-gl";
import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import * as turf from "@turf/turf";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  bounds: [
    [-124.7844079, 24.396308],
    [-66.9513812, 49.384358],
  ],
});

map.addControl(
  new mapboxgl.NavigationControl(),
  "top-right",
);

const defaultSource = `
const entries = geo.query("nwr[name=Costco](prefix=colorado)");

const payload = {
  type: "FeatureCollection",
  features: entries.map((entry) => {
    return entry.asFeature();
  }),
};

return payload
`.trim();

const codeSource = localStorage.getItem("codeSource") || defaultSource;

const editorElement = document.querySelector("#content")!;

const editor = new EditorView({
  doc: codeSource,
  extensions: [basicSetup, javascript()],
  parent: editorElement,
});

function setSource() {
  map.once("idle", () => {
    const bounds = new mapboxgl.LngLatBounds();

    map.querySourceFeatures("map-data").forEach(function (feature) {
      bounds.extend(turf.bbox(feature) as LngLatBoundsLike);
    });

    map.fitBounds(bounds);
  });

  const codeSource = editor.state.doc.toString();

  localStorage.setItem("codeSource", codeSource);

  const uri = `/proxy/api/runtime?source=${encodeURIComponent(codeSource)}`;

  const source = map.getSource("map-data") as GeoJSONSource;
  if (source) {
    source.setData(uri);
  } else {
    map.addSource("map-data", {
      type: "geojson",
      data: uri,
    });
  }
}

map.on("load", () => {
  const defaultColor = "#555";

  setSource();

  map.addLayer({
    id: "map-data-fill",
    type: "fill",
    source: "map-data",
    paint: {
      "fill-color": ["coalesce", ["get", "fill"], defaultColor],
      "fill-opacity": ["coalesce", ["get", "fill-opacity"], 0.3],
    },
    filter: ["==", ["geometry-type"], "Polygon"],
  });

  map.addLayer({
    id: "map-data-fill-outline",
    type: "line",
    source: "map-data",
    paint: {
      "line-color": ["coalesce", ["get", "stroke"], defaultColor],
      "line-width": ["coalesce", ["get", "stroke-width"], 2],
      "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
    },
    filter: ["==", ["geometry-type"], "Polygon"],
  });

  map.addLayer({
    id: "map-data-marker",
    type: "circle",
    source: "map-data",
    paint: {
      "circle-radius": [
        "match",
        ["get", "marker-size"],
        "small",
        4,
        "medium",
        8,
        "large",
        12,
        8,
      ],
      "circle-color": ["coalesce", ["get", "marker-color"], defaultColor],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
    filter: ["==", ["geometry-type"], "Point"],
  });

  map.addLayer({
    id: "map-data-line",
    type: "line",
    source: "map-data",
    paint: {
      "line-color": ["coalesce", ["get", "stroke"], defaultColor],
      "line-width": ["coalesce", ["get", "stroke-width"], 2],
      "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
    },
    filter: ["==", ["geometry-type"], "LineString"],
  });
});

document.addEventListener("keydown", function (event) {
  if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
    if (event.key === "f") {
      event.preventDefault();
      setSource();
    }
    if (event.key === "d") {
      event.preventDefault();
      editorElement.classList.toggle("hidden");
    }
  }
});
