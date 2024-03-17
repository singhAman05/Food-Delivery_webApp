import Home from "./screens/home/Home.jsx";
import Login from "./screens/login/Login.jsx";
import CheckoutPage from "./screens/checkout/CheckOut.jsx";
import { Routes, Route } from "react-router-dom";
const React = require("react");

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/login" Component={Login} />
        <Route path="/checkout" Component={CheckoutPage} />
      </Routes>
    </>
  );
}

export default App;
