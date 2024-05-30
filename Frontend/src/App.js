import Home from "./screens/home/Home.jsx";
import Login from "./screens/login/Login.jsx";
import CheckoutPage from "./screens/checkout/CheckOut.jsx";
import AboutUsPage from "./screens/aboutUs/AboutUs.jsx";
import Cart from "./screens/cart/Cart.jsx";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
const React = require("react");

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/login" Component={Login} />
          <Route path="/checkout" Component={CheckoutPage} />
          <Route path="/aboutUs" Component={AboutUsPage} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
