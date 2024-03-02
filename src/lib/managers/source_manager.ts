import mapboxgl from "mapbox-gl";
import { SearchQuery } from "../search_query";

class SourceManager {
  map: mapboxgl.Map;
  currentState: string;

  constructor(map: mapboxgl.Map) {
    this.currentState = "";
    this.map = map;
  }

  state(name: string) {
    this.currentState = name;
  }

  add(searchQuery: SearchQuery) {
    this.map.addSource(searchQuery.source(), {
      type: "geojson",
      data: `/api/search?search=${
        encodeURIComponent(searchQuery.apiQuery({ prefix: this.currentState }))
      }`,
      cluster: true,
      clusterRadius: 10,
    });
  }

  remove(searchQuery: SearchQuery) {
    this.map.removeSource(searchQuery.source());
  }
}

export { SourceManager };
