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
    this.map.addSource(searchQuery.sourceName(), {
      type: "geojson",
      data: `/api/search?search=${
        encodeURIComponent(searchQuery.apiQuery({ prefix: this.currentState }))
      }`,
    });
  }

  remove(searchQuery: SearchQuery) {
    this.map.removeSource(searchQuery.sourceName());
  }
}

export { SourceManager };
