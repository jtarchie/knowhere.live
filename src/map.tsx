import * as mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";

class Map {
  defaultBounds: mapboxgl.LngLatBoundsLike;
  defaultColor: string;
  element: Element;
  map: mapboxgl.Map;
  sourceName = "map-data";

  constructor(
    element: Element,
    defaultBounds: mapboxgl.LngLatBoundsLike,
    defaultColor: string = "#555",
  ) {
    this.defaultBounds = defaultBounds;
    this.defaultColor = defaultColor;
    this.element = element;
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      bounds: defaultBounds,
    });
    this.map.addControl(
      new mapboxgl.NavigationControl(),
      "top-right",
    );
    this.map.once("load", () => {
      this.features = [];
      this.initLayers();
      this.initEvents();
    })
  }

  set features(features: mapboxgl.MapboxGeoJSONFeature[]) {
    const source = this.map.getSource(
      this.sourceName,
    ) as mapboxgl.GeoJSONSource;
    const payload: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: "FeatureCollection",
      features: features,
    };
    if (source) {
      source.setData(payload);
    } else {
      this.map.addSource(this.sourceName, {
        type: "geojson",
        data: payload,
      });
    }
    this.map.once("idle", () => {
      this.fitBounds();
    });
  }

  onLoad(func: () => void) {
    this.map.on("load", func);
  }

  private fitBounds() {
    const bbox = turf.bbox({
      type: "FeatureCollection",
      features: this.map.querySourceFeatures("map-data"),
    });

    if (bbox.some((e) => !Number.isFinite(e))) {
      this.map.fitBounds(this.defaultBounds);
    } else {
      this.map.fitBounds(bbox as mapboxgl.LngLatBoundsLike, { padding: 20 });
    }
  }

  private initEvents() {
    this.map.on("click", `${this.sourceName}-fill`, (event) => {
      if (!event) return;

      const features = event?.features as mapboxgl.MapboxGeoJSONFeature[];

      if (features.length > 0) {
        const feature = features[0];
        const url = feature.properties?.url; // Assuming your property is named 'url'
        if (url) {
          globalThis.open(url, "_blank");
        }
      }
    });

    this.map.on("mouseover", `${this.sourceName}-fill`, (event) => {
      if (!event) return;

      const features = event?.features as mapboxgl.MapboxGeoJSONFeature[];

      if (features.length > 0) {
        const feature = features[0];
        const url = feature.properties?.url; // Assuming your property is named 'url'
        if (url) {
          this.map.getCanvas().style.cursor = "pointer";
        }
      }
    });

    this.map.on("mouseleave", `${this.sourceName}-fill`, (_) => {
      this.map.getCanvas().style.cursor = "default";
    });
  }

  private initLayers() {
    this.map.addLayer({
      id: `${this.sourceName}-fill`,
      type: "fill",
      source: this.sourceName,
      paint: {
        "fill-color": ["coalesce", ["get", "fill"], this.defaultColor],
        "fill-opacity": ["coalesce", ["get", "fill-opacity"], 0.3],
      },
      filter: ["==", ["geometry-type"], "Polygon"],
    });

    this.map.addLayer({
      id: `${this.sourceName}-fill-outline`,
      type: "line",
      source: this.sourceName,
      paint: {
        "line-color": ["coalesce", ["get", "stroke"], this.defaultColor],
        "line-width": ["coalesce", ["get", "stroke-width"], 2],
        "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
      },
      filter: ["==", ["geometry-type"], "Polygon"],
    });

    this.map.addLayer({
      id: `${this.sourceName}-marker`,
      type: "circle",
      source: this.sourceName,
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
        "circle-color": [
          "coalesce",
          ["get", "marker-color"],
          this.defaultColor,
        ],
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
      filter: ["==", ["geometry-type"], "Point"],
    });

    this.map.addLayer({
      id: `${this.sourceName}-marker-text`,
      type: "symbol",
      source: this.sourceName,
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

    this.map.addLayer({
      id: `${this.sourceName}-line`,
      type: "line",
      source: this.sourceName,
      paint: {
        "line-color": ["coalesce", ["get", "stroke"], this.defaultColor],
        "line-width": ["coalesce", ["get", "stroke-width"], 2],
        "line-opacity": ["coalesce", ["get", "stroke-opacity"], 1],
      },
      filter: ["==", ["geometry-type"], "LineString"],
    });
  }
}

export { Map };
