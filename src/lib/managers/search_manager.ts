import { LayerManager } from "./layer_manager";
import { Map as SignalMap } from "../signals/map";
import { SearchQuery } from "../search_query";
import { states } from "../states";
import mapboxgl from "mapbox-gl";
import { URLManager } from "./url_manager";
import { SourceManager } from "./source_manager";

interface Manager {
  add: (query: SearchQuery) => void;
  remove: (query: SearchQuery) => void;
  state: (name: string) => void;
}

class SearchManager {
  currentState: string;
  managers: Manager[];
  map: mapboxgl.Map;
  queries: SignalMap<SearchQuery>;

  constructor(map: mapboxgl.Map) {
    this.currentState = "";
    this.managers = [
      new SourceManager(map),
      new LayerManager(map),
      new URLManager(map),
    ];
    this.map = map;
    this.queries = new SignalMap();
  }

  state(name: string) {
    this.currentState = name;
    this.map.fitBounds(states[name]);
    this.managers.forEach((manager) => manager.state(name));
  }

  add(originalQuery: string) {
    if (this.queries.get(originalQuery)) {
      return;
    }

    const searchQuery = new SearchQuery(originalQuery);
    this.queries.set(originalQuery, searchQuery);

    this.managers.forEach((manager) => manager.add(searchQuery));
  }

  remove(originalQuery: string) {
    const searchQuery = this.queries.get(originalQuery);
    if (!searchQuery) {
      return;
    }

    this.managers.slice().reverse().forEach((manager) =>
      manager.remove(searchQuery)
    );
    this.queries.delete(originalQuery);
  }
}

export { SearchManager };
