import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
const React = require("react");
const ReactDom = require("react-dom");

ReactDom.render(
  <>
    <Router>
      <App />
    </Router>
  </>,
  document.getElementById("root")
);
