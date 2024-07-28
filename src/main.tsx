import { EditorPage } from "./pages/editor";
import { FilterPage } from "./pages/filter";
import { HomePage } from "./pages/home";
import { MapPage } from "./pages/map";
import { render } from "preact";
import Router from "preact-router";

import "./index.css";

function App() {
  return (
    <Router>
      <MapPage path="/beta/map" />
      <EditorPage path="/beta/editor" />
      <FilterPage path="/beta/filter" />
      <HomePage path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
