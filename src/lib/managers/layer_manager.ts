import mapboxgl from "mapbox-gl";
import { SearchQuery } from "../search_query";
import { groupNearest } from "../geo/nearest";
import { effect } from "@preact/signals";

class LayerManager {
  map: mapboxgl.Map;
  queries: Map<SearchQuery, () => void>;

  constructor(map: mapboxgl.Map) {
    this.map = map;
    this.queries = new Map();

    map.once("idle", () => this.draw());
    map.on("zoomend", () => this.draw());
  }

  draw() {
    const queries = [...this.queries.keys()];
    const sourceWithRadius = queries.map((searchQuery) => {
      const features = this.map.querySourceFeatures(searchQuery.sourceName());
      return {
        radius: searchQuery.radius.value,
        features: features,
      };
    });

    const results = groupNearest(sourceWithRadius);

    if (results.length === 0) {
      return;
    }

    const transposedResults = results[0].map((_, i) =>
      results.map((row) => row[i])
    );
    transposedResults.forEach((features, index) => {
      const sourceName = queries[index].sourceName("knn");
      const source = this.map.getSource(sourceName) as mapboxgl.GeoJSONSource;
      source.setData({
        type: "FeatureCollection",
        features: features,
      });
    });
  }

  state(_: string) {}

  add(searchQuery: SearchQuery) {
    this.map.addSource(searchQuery.sourceName("knn"), {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    this.map.addLayer({
      id: searchQuery.layerName("hidden"),
      type: "circle",
      source: searchQuery.sourceName(),
      paint: {
        "circle-radius": 1,
        "circle-opacity": 0,
      },
    });

    this.map.addLayer({
      id: searchQuery.layerName("knn"),
      type: "circle",
      source: searchQuery.sourceName("knn"),
      paint: {
        "circle-radius": 6,
        "circle-color": searchQuery.color,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    const dispose = effect(() => {
      if (searchQuery.radius.value) {
        this.draw();
      }
    });

    this.queries.set(searchQuery, dispose);

    this.map.once("idle", () => this.draw());
  }

  remove(searchQuery: SearchQuery) {
    const dispose = this.queries.get(searchQuery);
    if (!dispose) {
      return;
    }

    dispose();
    this.queries.delete(searchQuery);

    let layerName = searchQuery.layerName("knn");

    if (this.map.getLayer(layerName)) {
      this.map.removeLayer(layerName);
    }

    layerName = searchQuery.layerName("hidden");

    if (this.map.getLayer(layerName)) {
      this.map.removeLayer(layerName);
    }

    const sourceName = searchQuery.sourceName("knn");

    if (this.map.getSource(sourceName)) {
      this.map.removeSource(sourceName);
    }
  }
}

export { LayerManager };
