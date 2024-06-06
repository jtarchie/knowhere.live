import mapboxgl from "mapbox-gl";
// import { basicSetup, EditorView } from 'codemirror';
// import { javascript } from '@codemirror/lang-javascript';

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

const targetElement = document.querySelector('#editor')!

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

const source = `
const entries = geo.query("nwr[name=Costco](prefix=colorado)");

const payload = {
  type: "FeatureCollection",
  features: entries.map((entry) => {
    return entry.asFeature();
  }),
};

return payload
`;

map.once("idle", () => {
  const bounds = new mapboxgl.LngLatBounds();

  map.querySourceFeatures("map-data").forEach(function (feature) {
    bounds.extend(
      (feature.geometry as GeoJSON.Point)
        .coordinates as mapboxgl.LngLatBoundsLike,
    );
  });

  map.fitBounds(bounds);
});

map.on("load", () => {
  map.addSource("map-data", {
    type: "geojson",
    data: `/proxy/api/runtime?source=${encodeURIComponent(source)}`,
  });

  const defaultColor = "#56B4E9";

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


// let editor = new EditorView({
//   extensions: [basicSetup, javascript()],
//   parent: targetElement,
// })