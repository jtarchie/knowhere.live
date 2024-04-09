import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { SearchQuery } from "../search_query";

class SourceManager {
  map: mapboxgl.Map;
  currentState?: string;
  queries: Set<SearchQuery>;

  constructor(map: mapboxgl.Map) {
    this.map = map;
    this.queries = new Set<SearchQuery>();
  }

  state(name: string) {
    this.currentState = name;
    [...this.queries].forEach((searchQuery) => {
      const originalSource = this.map.getSource(
        searchQuery.sourceName(),
      ) as GeoJSONSource;
      if (originalSource) {
        originalSource.setData(
          `/api/search?search=${
            encodeURIComponent(
              searchQuery.apiQuery({ prefix: this.currentState || "" }),
            )
          }`,
        );
      }
    });
  }

  add(searchQuery: SearchQuery) {
    this.map.addSource(searchQuery.sourceName(), {
      type: "geojson",
      data: `/api/search?search=${
        encodeURIComponent(
          searchQuery.apiQuery({ prefix: this.currentState || "" }),
        )
      }`,
    });
    this.queries.add(searchQuery);
  }

  remove(searchQuery: SearchQuery) {
    this.map.removeSource(searchQuery.sourceName());
    this.queries.delete(searchQuery);
  }
}

export { SourceManager };
