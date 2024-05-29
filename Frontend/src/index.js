import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
const React = require("react");
const ReactDom = require("react-dom");

ReactDom.render(
  <>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
