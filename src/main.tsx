import { render } from "preact";
import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import { Home } from "./pages/home";

function App() {
  return (
    <Router>
      <AsyncRoute
        path="/beta"
        getComponent={() =>
          import("./pages/render").then((module) => module.Render)}
      />
      <Home path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
