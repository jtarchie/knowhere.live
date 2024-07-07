import { render } from "preact";
import Router from "preact-router";
import { Render } from "./pages/render";

function App() {
  return (
    <Router>
      <Render path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
