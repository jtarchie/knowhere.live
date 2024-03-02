import mapboxgl from "mapbox-gl";
import { SearchQuery } from "../search_query";

class URLManager {
  currentState: string;
  queries: Set<SearchQuery>;

  constructor(_: mapboxgl.Map) {
    this.currentState = "";
    this.queries = new Set();
  }

  state(name: string) {
    this.currentState = name;
    this.update();
  }

  add(query: SearchQuery) {
    this.queries.add(query);
    this.update();
  }

  remove(query: SearchQuery) {
    this.queries.delete(query);
    this.update();
  }

  update() {
    const params = new URLSearchParams(window.location.search);
    params.set("state", this.currentState);
    params.set(
      "queries",
      [...this.queries].map((sq) => sq.query).join(","),
    );
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`,
    );
  }
}

export { URLManager };
