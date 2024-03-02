import mapboxgl from "mapbox-gl";
import { SearchQuery } from "../search_query";

class LayerManager {
  map: mapboxgl.Map;

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  state(_: string) {}

  add(searchQuery: SearchQuery) {
    this.map.addLayer({
      id: searchQuery.layerName("layer"),
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

  remove(searchQuery: SearchQuery) {
    this.map.removeLayer(searchQuery.layerName("layer"));
  }
}

export { LayerManager };
