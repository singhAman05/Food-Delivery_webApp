import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Cart from "./screens/Cart";
import MyOrder from "./screens/MyOrder";
import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import CartProvider from "./components/ContextReducer";
const React = require("react");
// const ReactDom = require("react-dom");

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/cart" Component={Cart} />
          <Route path="/myorder" Component={MyOrder} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
