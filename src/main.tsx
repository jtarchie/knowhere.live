import { render } from "preact";
import Router from "preact-router";
import { Home } from "./pages/home";

function App() {
  return (
    <Router>
      <Home path="/" />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
