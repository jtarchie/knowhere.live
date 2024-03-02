import mapboxgl from "mapbox-gl";
import { render } from "preact";
import { SearchManager } from "./lib/managers/search_manager";
import { Content } from "./lib/content";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  bounds: [
    [-124.7844079, 24.396308],
    [-66.9513812, 49.384358],
  ],
});

map.on("load", () => {
  const manager = new SearchManager(map);
  loadMapFromParams(manager);

  render(<Content manager={manager} />, document.getElementById("content")!);
});

function loadMapFromParams(manager: SearchManager) {
  // Parse the URL search parameters
  const params = new URLSearchParams(window.location.search);
  const state = params.get("state");
  const queries = params.get("queries");

  // Set the state on the manager
  if (state) {
    manager.state(state);
  } else {
    manager.state("colorado");
  }

  // Split the queries string by commas and add each query to the manager
  if (queries) {
    queries.split(",").forEach((query) => {
      manager.add(query.trim());
    });
  } else {
    manager.add(`Costco`);
    manager.add(`high school`);
  }
}
