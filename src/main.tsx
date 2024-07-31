import mapboxgl from "mapbox-gl";
import { EditorPage } from "./pages/editor";
import { FilterPage } from "./pages/filter";
import { HomePage } from "./pages/home";
import { MapPage } from "./pages/map";
import { render } from "preact";
import Router from "preact-router";

mapboxgl.accessToken =
  "pk.eyJ1IjoianRhcmNoaSIsImEiOiJjbHBobmx0YWQwOG01MmlxeDAydGxlN2c5In0.o3yTh6k7uo_e3CBi_32R9Q";

function App() {
  return (
    <Router>
      <MapPage path="/beta/:manifestName/map" />
      <EditorPage path="/beta/:manifestName/editor" />
      <FilterPage path="/beta/:manifestName/filter" />
      <HomePage path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
