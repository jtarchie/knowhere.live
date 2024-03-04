import mapboxgl from "mapbox-gl";
import { SearchQuery } from "../search_query";

class LayerManager {
  map: mapboxgl.Map;
  queries: Set<SearchQuery>;

  constructor(map: mapboxgl.Map) {
    this.map = map;
    this.queries = new Set();

    map.on("idle", () => {
      this.queries.forEach((searchQuery) => {
        const layerName = searchQuery.layerName("layer");
        if (!this.map.getLayer(layerName)) {
          this.map.addLayer({
            id: layerName,
            type: "circle",
            source: searchQuery.source(),
            paint: {
              "circle-radius": 6,
              "circle-color": searchQuery.color,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            },
          });
        }
      });
    });
  }

  state(_: string) {}

  add(searchQuery: SearchQuery) {
    this.queries.add(searchQuery);
  }

  remove(searchQuery: SearchQuery) {
    this.queries.delete(searchQuery);

    const layerName = searchQuery.layerName("layer");

    if (this.map.getLayer(layerName)) {
      this.map.removeLayer(layerName);
    }
  }
}

export { LayerManager };
