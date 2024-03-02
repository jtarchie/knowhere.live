import { LayerManager } from "./layer_manager";
import { Map as SignalMap } from "../signals/map";
import { SearchQuery } from "../search_query";
import { states } from "../states";
import mapboxgl from "mapbox-gl";

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
      new LayerManager(map),
    ];
    this.map = map;
    this.queries = new SignalMap();
  }

  state(name: string) {
    this.currentState = name;
    this.map.fitBounds(states[name]);
    this.updateParams();
  }

  add(originalQuery: string) {
    if (this.queries.get(originalQuery)) {
      return;
    }

    const searchQuery = new SearchQuery(originalQuery);
    this.queries.set(originalQuery, searchQuery);

    this.map.addSource(searchQuery.source(), {
      type: "geojson",
      data: `/api/search?search=${
        encodeURIComponent(searchQuery.apiQuery({ prefix: this.currentState }))
      }`,
      cluster: true,
      clusterRadius: 10,
    });

    this.managers.forEach((manager) => manager.add(searchQuery));
    this.updateParams();
  }

  remove(originalQuery: string) {
    const searchQuery = this.queries.get(originalQuery);
    if (!searchQuery) {
      return;
    }

    this.managers.forEach((manager) => manager.remove(searchQuery));
    this.map.removeSource(searchQuery.source());
    this.updateParams();

    this.queries.delete(originalQuery);
  }

  updateParams() {
    const params = new URLSearchParams(window.location.search);
    params.set("state", this.currentState);
    params.set(
      "queries",
      this.queries.values().map((sq) => sq.query).join(","),
    );
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`,
    );
  }
}

export { SearchManager };
