import mapboxgl from "mapbox-gl";
import { SearchPage } from "./pages/search";
import { HomePage } from "./pages/home";
import { MapPage } from "./pages/map";
import { render } from "preact";
import Router from "preact-router";
import AsyncRoute from "preact-async-route";

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";

function App() {
  return (
    <Router>
      <MapPage path="/beta/:manifestName/map" />
      <AsyncRoute
        path="/beta/:manifestName/editor"
        getComponent={() =>
          import("./pages/editor").then((module) => module.EditorPage)}
      />
      <SearchPage path="/beta/:manifestName/search" />
      <HomePage path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
