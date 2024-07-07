import { render } from "preact";
import Router from "preact-router";
import { Render } from "./pages/render";
import { Home } from "./pages/home";

function App() {
  return (
    <Router>
      <Render path="/beta" />
      <Home path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
