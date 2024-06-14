import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import * as turf from "@turf/turf";
import * as pako from "pako";
import mapboxgl, {
  GeoJSONSource,
  LngLatBoundsLike,
  MapboxGeoJSONFeature,
} from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

const defaultBounds: LngLatBoundsLike = [
  [-124.7844079, 24.396308],
  [-66.9513812, 49.384358],
];

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  bounds: defaultBounds,
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

const editorElement = document.querySelector("#content")!;

const params = new URLSearchParams(window.location.search);
let currentSource = params.get("source");

if (currentSource) {
  const compressedData = Uint8Array.from(
    atob(currentSource),
    (c) => c.charCodeAt(0),
  );
  const decompressedData = pako.inflate(compressedData);
  currentSource = new TextDecoder().decode(decompressedData);
  editorElement.classList.toggle("hidden");
} else {
  currentSource = localStorage.getItem("codeSource") || defaultSource;
}

const editor = new EditorView({
  doc: currentSource,
  extensions: [basicSetup, javascript()],
  parent: editorElement,
});

async function setSource(codeSource: string) {
  localStorage.setItem("codeSource", codeSource);

  const uri = `/proxy/api/runtime?source=${encodeURIComponent(codeSource)}`;
  const response = await fetch(uri);
  let payload = await response.json();
  if (payload.error) {
    console.error(`Could not run script: ${payload.error}`);
    payload = { features: [], type: "FeatureCollection" };
  }

  const source = map.getSource("map-data") as GeoJSONSource;
  if (source) {
    source.setData(payload);
  } else {
    map.addSource("map-data", {
      type: "geojson",
      data: payload,
    });
  }

  map.once("idle", () => {
    const bbox = turf.bbox({
      type: "FeatureCollection",
      features: map.querySourceFeatures("map-data"),
    });

    if (bbox.some((e) => !Number.isFinite(e))) {
      map.fitBounds(defaultBounds);
    } else {
      map.fitBounds(bbox as LngLatBoundsLike, { padding: 20 });
    }
  });

  const params = new URLSearchParams(window.location.search);

  const inputData = new TextEncoder().encode(codeSource);
  const compressedData = pako.deflate(inputData);
  const base64String = btoa(String.fromCharCode(...compressedData));

  params.set("source", base64String);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params}`,
  );
}

map.on("load", () => {
  const defaultColor = "#555";

  setSource(editor.state.doc.toString()).then(() => {
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

    map.on("click", "map-data-fill", (event) => {
      if (!event) return;

      const features = event?.features as MapboxGeoJSONFeature[];

      if (features.length > 0) {
        const feature = features[0];
        const url = feature.properties?.url; // Assuming your property is named 'url'
        if (url) {
          globalThis.open(url, "_blank");
        }
      }
    });

    map.on("mouseover", "map-data-fill", (event) => {
      if (!event) return;

      const features = event?.features as MapboxGeoJSONFeature[];

      if (features.length > 0) {
        const feature = features[0];
        const url = feature.properties?.url; // Assuming your property is named 'url'
        if (url) {
          map.getCanvas().style.cursor = "pointer";
        }
      }
    });

    map.on("mouseleave", "map-data-fill", (_) => {
      map.getCanvas().style.cursor = "default";
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
      id: "map-data-marker-text",
      type: "symbol",
      source: "map-data",
      layout: {
        "text-field": ["get", "title"],
        "text-offset": [0, 1.5],
      },
      "paint": {
        "text-color": "#202",
        "text-halo-color": "#fff",
        "text-halo-width": 2,
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
});

document.addEventListener("keydown", function (event) {
  if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
    if (event.key === "f") {
      event.preventDefault();
      setSource(editor.state.doc.toString());
    }
    if (event.key === "d") {
      event.preventDefault();
      editorElement.classList.toggle("hidden");
    }
  }
});
