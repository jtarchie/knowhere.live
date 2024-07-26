import { EditorPage } from "./pages/editor";
import { HomePage } from "./pages/home";
import { MapPage } from "./pages/map";
import { render } from "preact";
import Router from "preact-router";

function App() {
  return (
    <Router>
      <MapPage path="/beta/map" />
      <EditorPage path="/beta/editor" />
      <HomePage path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
